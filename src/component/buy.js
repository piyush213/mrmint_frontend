/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import axios from 'axios'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import Web3 from 'web3';
import ReactDatatable from '@ashvin27/react-datatable';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'

import { getActivePhaseAction, tokenPurchaseAction, getTokenPurchaseAction } from '../Action/user.action';

const Buy = () => {
    const [bnbAmount, setbnbAmount] = useState('');
    const [tokenAmount, settokenAmount] = useState('');
    const [toggleSet, settoggleSet] = useState(1);
    const [activePhase, setActivePhase] = useState([]);
    const [currentBNBBalance, setcurrentBNBBalance] = useState('0.000000');
    const [bnbToUsd, setbnbToUsd] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [connectWalletAddress, setConnectWalletAddress] = useState('');
    const [purchaseList, setPurchaseList] = useState([]);
    const [validatioError, setvalidatioError] = useState({ bnbAmountError: '', tokenAmountError: '' });

    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));

    useEffect(() => {
        setTimeout(async () => {
            if (window.ethereum) {
                const { ethereum } = window;
                setConnectWalletAddress(ethereum.selectedAddress);
                getBNBBalance();
            }
        }, 100);

        setInterval(() => {
            getBNBBalance();
        }, 2000);

        getActivePhaseAPI();
        getBNBToUsd();
        getTokenPurchaseAPI();

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                if (accounts[0]) {
                    setConnectWalletAddress(accounts[0]);
                    getBNBBalance();
                } else {
                    setConnectWalletAddress('');
                }
            })
        }

    }, []);

    const columnsForWallet = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "token",
            text: "Token",
            cell: (item) => {
                return (
                    `${parseFloat(item.token).toFixed(2)} MNT ~ $${parseFloat(item.token * activePhase?.price).toFixed(2)}`
                );
            }
        },
        {
            key: "amount",
            text: "Amount",
            cell: (item) => {
                return (
                    `${item.amount} BNB`
                );
            }
        },
        {
            key: "phase",
            text: "Phase",
            cell: (item) => {
                return (
                    item.phase
                );
            }
        },
        {
            key: "created_at",
            text: "Date",
            cell: (item) => {
                return (
                    item.created_at
                );
            }
        },
        {
            key: "transactionHash",
            text: "Action",
            cell: (item) => {
                return (
                    <>
                        <a target="_blank" href={`${config.blockchainUrl + item.transactionHash}`} rel="noreferrer">
                            <button className='btn-sm btn btn-primary'>Blockchain View</button>
                        </a>
                    </>
                );
            }
        },
    ];

    const configForWallet = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        button: {
            excel: false,
            print: false

        }
    }

    const getTokenPurchaseAPI = async () => {
        let res = await getTokenPurchaseAction();
        if (res.success) {
            setPurchaseList(res.data)
        }
    }    

    const connectMetasmask = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnectWalletAddress(accounts[0]);
            getBNBBalance();
        } else {
            toast.error(`Please use Dapp browser!!`);
        }
    }

    const getBNBBalance = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnectWalletAddress(accounts[0]);
            let web3 = new Web3(window.ethereum);
            let getBalace = await web3.eth.getBalance(accounts[0]) / (10 ** 18);
            let currentBal = parseFloat(getBalace).toFixed(6);
            setcurrentBNBBalance(currentBal);
        }
    }

    const inputHandler = (e) => {
        let { name, value, id } = e.target;
        let activeTokenPrice = activePhase?.price;
        let usdPrice = value * bnbToUsd;
        if (name == 'bnb_amount') {
            let tokenPrice = activeTokenPrice;
            let mntToken = parseFloat(usdPrice / tokenPrice).toFixed(2);
            setbnbAmount(value);
            settokenAmount(mntToken);
        }

        if (name == 'mnt_amount') {
            let tokenPriceInUsd = activeTokenPrice * value;
            let bnbPrice = parseFloat(tokenPriceInUsd / bnbToUsd).toFixed(6);
            setbnbAmount(bnbPrice);
            settokenAmount(value);
        }

        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, ['bnbAmountError']: '', ['tokenAmountError']: '' }
            })
        }
    }

    const maxAmount = async () => {
        let usdPrice = currentBNBBalance * bnbToUsd;
        let activeTokenPrice = activePhase?.price;
        let tokenPrice = activeTokenPrice;
        let mntToken = parseFloat(usdPrice / tokenPrice).toFixed(2);
        setbnbAmount(parseFloat(currentBNBBalance) - 0.0010);
        settokenAmount(mntToken);
    }

    const getActivePhaseAPI = async () => {
        let res = await getActivePhaseAction();
        if (res.success) {
            setActivePhase(res.data);
        }
    }

    const getBNBToUsd = async () => {
        await axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`,
        }).then(response => {
            setbnbToUsd(response.data.binancecoin.usd);
        })
    }

    function validate() {
        let bnbAmountError = "";
        let tokenAmountError = "";

        if (bnbAmount === '' || bnbAmount == '0.000000') {
            bnbAmountError = "BNB Amount is required."
        }
        if (!isNaN(bnbAmount) === false) {
            bnbAmountError = "BNB Amount is not valid please enter valid amount."
        }

        if (tokenAmount === '' || tokenAmount == '0') {
            tokenAmountError = "MNT token is required."
        }

        if (!isNaN(tokenAmount) === false) {
            tokenAmountError = "MNT Amount is not valid please enter valid amount."
        }
        if (bnbAmountError || tokenAmountError) {
            setvalidatioError({
                bnbAmountError, tokenAmountError
            })
            return false
        } else {
            return true
        }
    }

    const buy_now = async () => {
        const isValid = validate();
        if (isValid) {
            if (connectWalletAddress != '' || connectWalletAddress != null) {
                const from_address = connectWalletAddress;

                if (from_address.toString().toUpperCase() != loginData.bnb_address.toString().toUpperCase()) {
                    toast.error(`Please select your registered metamask wallet!!`);
                    return;
                }

                let activeTokenPrice = activePhase?.price;
                let usdPrice = parseFloat(activeTokenPrice * tokenAmount).toFixed(2);
                if (usdPrice < 100) {
                    toast.error(`You have to buy tokens equivalent to $100.`);
                    return false;
                }

                let web3 = '';
                web3 = new Web3(window.ethereum);
                let contractAddress = config.contractAddress;

                const contractWallet = await new web3.eth.Contract(config.abi, contractAddress);
                let tx_builder = await contractWallet.methods.buyToken();
                let encoded_tx = tx_builder.encodeABI();

                let currentNetwork = web3.currentProvider.chainId;
                try {
                    if (currentNetwork != config.chainId) {
                        toast.error(`Please select BNB smartchain!!`);
                        return false;
                    }

                    let chainId = config.chainId;
                    let trx_amount = parseInt(bnbAmount * (10 ** 18));


                    let getBalace = await web3.eth.getBalance(from_address) / (10 ** 18);
                    let currentBal = parseFloat(getBalace).toFixed(6)


                    if (currentBal < bnbAmount) {
                        toast.error(`Insufficient fund for transfer`);
                        setDialogOpen(false);
                        return false;
                    }
                    setDialogOpen(true);
                    let gasPrice = await web3.eth.getGasPrice();
                    let gasLimit = await web3.eth.estimateGas({
                        gasPrice: web3.utils.toHex(gasPrice),
                        to: contractAddress,
                        from: from_address,
                        value: web3.utils.toHex(trx_amount),
                        data: encoded_tx,
                        chainId: chainId,
                    });

                    gasPrice = parseInt(gasPrice) + (5 * (10 ** 9));

                    const txData = await web3.eth.sendTransaction({
                        gasPrice: web3.utils.toHex(gasPrice),
                        gas: web3.utils.toHex(gasLimit),
                        to: contractAddress,
                        from: from_address,
                        value: web3.utils.toHex(trx_amount),
                        data: encoded_tx,
                        chainId: chainId,
                    });

                    if (txData.transactionHash) {
                        let arr = {
                            "amount": bnbAmount,
                            "token": tokenAmount,
                            "withdrable": tokenAmount,
                            "phase": activePhase?.id,
                            "transactionHash": txData.transactionHash
                        }
                        tokenPurchaseAPI(arr);
                    }
                } catch (err) {
                    if (err.message.toString().split('insufficient funds')[1]) {
                        toast.error('Transaction reverted : ' + err.message)
                    } else {
                        if (err.toString().split('execution reverted:')[1]) {
                            toast.error('Transaction reverted : ' + (err.toString().split('execution reverted:')[1]).toString().split('{')[0])
                        } else {
                            toast.error(err.message);
                        }
                    }
                    setDialogOpen(false);
                    return false;
                }
            }
            else {
                toast.error(`Please connect your MetaMask wallet!`);
                setDialogOpen(false);
                return false;
            }
        }
    }

    const tokenPurchaseAPI = async (data) => {
        let res = await tokenPurchaseAction(data);
        if (res.success) {
            toast.success(res.msg);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            toast.error(res.msg);
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            {isDialogOpen ?
                <ReactDialogBox
                    bodyBackgroundColor='white'
                    bodyTextColor='black'
                >
                    <div className="text-center pl-3 pr-3">
                        < br />
                        <h4 style={{ color: 'rgb(45 104 149)', fontSize: '16px' }}>
                            Transaction is processing please wait for while.
                        </h4>
                        <p style={{ color: '#091f3f' }}>
                            Please do not refresh page or close tab.
                        </p>
                        <div>
                            <div class="spinner-border"></div>
                        </div>
                    </div>
                </ReactDialogBox>
                : ""}

            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                    <Dashboardheader clickToggle={toggleManage} />
                    <Toaster />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className="row justify-content-center">

                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pt-5">
                                    <div className='buyform'>
                                        <span className="text-left text-white" style={{ display: 'flex', flex: '1 1 auto', justifyContent: "center" }}>
                                            <strong style={{ fontSize: "22px" }}>BUY MNT</strong></span>
                                        <div className="sc-kcDeIU cvqsCp">
                                            Connected Wallet: <div style={{ wordBreak: "break-all" }}>{connectWalletAddress}</div>
                                            <div className="sc-iomxrj btdLQC" style={{ marginBottom: '20px', color: '#fff', fontSize: '24px', display: 'flex' }}>
                                            </div>
                                            <div id="swap-page" className="sc-gJWqzi lmKVHo">
                                                <div className="sc-ifAKCX dcxnAx" style={{ height: "90px" }}>
                                                    <div id="swap-currency-input" className="sc-ugnQR drzjNC " >
                                                        <div className="sc-eIHaNI hNuCqz">
                                                            <div className="sc-iQtOjA fLKthc">
                                                                <img src='assets/images/binance.svg' height="25px" width="25px" />
                                                                <input className="sc-iybRtq iQKTjs token-amount-input" autoComplete="off" id='bnbAmountError' autoCorrect="off" name="bnb_amount" type="text" value={bnbAmount} onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} placeholder="0.00" onChange={inputHandler} />
                                                                <span onClick={maxAmount} style={{ color: '#5b6be0', cursor: 'pointer' }}>Max</span>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <button className="open-currency-select-button">
                                                                    <span>BNB</span>
                                                                </button>
                                                            </div>
                                                            <div className="balance">
                                                                <p>${parseFloat(bnbAmount * bnbToUsd).toFixed(2)}</p>
                                                                <p>{currentBNBBalance ? currentBNBBalance : '0.000000'} BNB</p>
                                                            </div>
                                                            <span style={{ marginLeft: '30px' }} className="validationErr">{validatioError.bnbAmountError}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mb-4" style={{ position: "relative" }}>
                                                    <span className="bxUreM pulse" style={{ display: 'inline', position: "absolute", borderRadius: "50%" }}>
                                                        <a href> <span className="fa fa-exchange" style={{ transform: 'rotate(90deg)' }} /></a>
                                                    </span>
                                                </div>

                                                <div className="sc-ifAKCX dcxnAx" style={{ height: "120px" }}>
                                                    <div id="swap-currency-input" className="sc-ugnQR second-box" style={{ height: "100%" }}>
                                                        <div className="sc-eIHaNI hNuCqz">
                                                            <div className="sc-iQtOjA fLKthc">
                                                                <img src='images/favicon.png' height="25px" width="25px" />
                                                                <input className="sc-iybRtq iQKTjs token-amount-input" name="mnt_amount" type="text" id='tokenAmountError' value={tokenAmount} onKeyPress={(event) => { if (!/^\d*[]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} placeholder="0.00" onChange={inputHandler} />

                                                                <button className="open-currency-select-button">
                                                                    <span>MNT</span>
                                                                </button>
                                                            </div>
                                                            <div className="balance">
                                                                <p> 1 MNT = ${activePhase?.price}</p>
                                                            </div>
                                                            <span style={{ marginLeft: '30px' }} className="validationErr">{validatioError.tokenAmountError}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {!connectWalletAddress || connectWalletAddress == '' ?
                                            <div className="sc-CtfFt bxUreM" id="token-buy-button" onClick={connectMetasmask} style={{ margin: "0px 30px" }} >Connect Wallet</div>
                                            :
                                            <div className="sc-CtfFt bxUreM" id="token-buy-button" onClick={buy_now} style={{ margin: "0px 30px" }} >Buy Now</div>
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className='row mt-5'>
                                <div className='col-lg-12 col-12 '>
                                    <h4 class="mb-3">Token Purchase History</h4>
                                    <ReactDatatable
                                        config={configForWallet}
                                        records={purchaseList}
                                        columns={columnsForWallet}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Buy;
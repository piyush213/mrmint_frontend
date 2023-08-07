/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import { getRechargePlanAction, rechargeNFTAction, getWalletBalanceAction } from '../Action/user.action';
import { confirmAlert } from 'react-confirm-alert';
import { ReactDialogBox } from 'react-js-dialog-box'
import {  Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import config from '../coreFIles/config';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import Cookies from 'js-cookie';


const RechargePlans = () => {

    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [connectWalletAddress, setConnectWalletAddress] = useState('');
    const [toggleSet, settoggleSet] = useState(1)
    const [rechargePlan, setrechargePlan] = useState([]);
    const [rechargeDetails, setrechargeDetails] = useState([]);
    const { mystery_box_wallet_id } = useParams();
    const [show, setShow] = useState(false);
    const [walletBalance, setWalletBalance] = useState([]);

    useEffect(() => {
        setInterval(async () => {
            if (window.ethereum) {
                const { ethereum } = window;
                setConnectWalletAddress(ethereum.selectedAddress);
            }
        }, 100);

        getRechargePlanAPI();
        getWalletBalanceAPI();
    }, []);

    const handleClose = async () => {
        setShow(false);
    }

    const getWalletBalanceAPI = async () => {
        let res = await getWalletBalanceAction();
        if (res.success) {
            setWalletBalance(res.data?.main_balance)
        }
    }

    const viewPaymentMethods = async (data) => {
        setShow(true);
        setrechargeDetails(data);
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const getRechargePlanAPI = async () => {
        let res = await getRechargePlanAction();
        if (res.success) {
            setrechargePlan(res.data)
        }
    }

    const rechargeNFTMrmintWallet = async (recharge_plan_id, amount) => {
        setShow(false);
        if (parseFloat(amount) > parseFloat(walletBalance)) {
            toast.error('Insufficient tokens in your wallet');
            return;
        }
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure want to recharge?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setDialogOpen(true);
                        let res = await rechargeNFTAction({ 'mystery_box_wallet_id': mystery_box_wallet_id, 'recharge_plan_id': recharge_plan_id, 'payment_type_id': '1', 'hash': '' });
                        if (res.success) {
                            toast.success(res.msg);
                            setDialogOpen(false);
                            setTimeout(() => {
                                window.location.href = config.baseUrl + 'autopoolwallet'
                            }, 3000);
                        } else {
                            setShow(true);
                            setDialogOpen(false);
                            toast.error(res.msg);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: async () => {
                        setShow(true);
                    }
                }
            ]
        });
    }

    const rechargeNFTMetamask = async (recharge_plan_id, token, autopool_wallet) => {

        if (!window.ethereum) {
            toast.error(`Please connect your MetaMask wallet!`);
            return;
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        let connectWallet = accounts[0];
        
        if (!connectWallet || connectWallet == '' || connectWallet == 'null' || connectWallet == null) {
            toast.error(`Please connect your MetaMask wallet!`);
            setDialogOpen(false);
            return false;
        } else {
            const from_address = connectWallet;
            if (from_address.toString().toUpperCase() != loginData.bnb_address.toString().toUpperCase()) {
                toast.error(`Please select your registered metamask wallet!!`);
                return;
            }

            let tokenAmount = parseFloat(token).toFixed(2);
            if (tokenAmount <= 0) {
                toast.error(`Invalid token amount`);
                return false;
            }

            let tokenDeduct = parseFloat(tokenAmount) * 10 ** 18;
            tokenDeduct = tokenDeduct.toLocaleString('fullwide', { useGrouping: false })

            let web3 = '';
            web3 = new Web3(window.ethereum);
            let contractAddress = config.contractAddressForRecharge;
            let toAddress = autopool_wallet;

            let currentNetwork = web3.currentProvider.chainId;
            if (currentNetwork != config.chainIdForRecharge) {
                toast.error(`Please select BNB smartchain!!`);
                return false;
            }

            const contractWallet = await new web3.eth.Contract(config.abi, contractAddress);
            let getBalace = await contractWallet.methods.balanceOf(from_address).call();
            let currentBal = parseFloat(getBalace)

            if (currentBal < tokenAmount) {
                toast.error(`Insufficient fund for transfer`);
                setDialogOpen(false);
                return false;
            }

            let tx_builder = await contractWallet.methods.transfer(toAddress.toString(), tokenDeduct.toString());
            let encoded_tx = tx_builder.encodeABI();

            try {
                setShow(false);
                setDialogOpen(true);
                let chainId = config.chainIdForRecharge;
                let gasPrice = await web3.eth.getGasPrice();
                let gasLimit = await web3.eth.estimateGas({
                    gasPrice: web3.utils.toHex(gasPrice),
                    to: contractAddress,
                    from: from_address,
                    value: 0,
                    chainId: chainId,
                    data: encoded_tx
                });

                const transactionParameters = {
                    gasPrice: web3.utils.toHex(gasPrice),
                    gas: web3.utils.toHex(gasLimit),
                    to: contractAddress,
                    from: from_address,
                    value: 0,
                    chainId: chainId,
                    data: encoded_tx
                };

                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });

                if (txHash) {
                    let res = await rechargeNFTAction({ 'mystery_box_wallet_id': mystery_box_wallet_id, 'recharge_plan_id': recharge_plan_id, 'payment_type_id': '2', 'hash': txHash });
                    if (res.success) {
                        toast.success(res.msg);
                        setDialogOpen(false);
                        setTimeout(() => {
                            window.location.href = config.baseUrl + 'autopoolwallet'
                        }, 3000);
                    } else {
                        setShow(true);
                        toast.error(res.msg);
                    }
                }
            } catch (err) {
                setShow(true);
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
    }

    return (
        <>
            <div className='autopool'>
                <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                    <Dashboardsidebarnft />
                    <div className="main-container">
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

                        <Toaster />
                        <Dashboardheadernft clickToggle={toggleManage} />
                        <div className="content-wrapper-scroll">
                            <div className="content-wrapper">
                                <h4 class="mt-2 mb-3 text-right">
                                    Mintforce Auto Pool
                                </h4>
                                <div className="row mt-4 align-items-start">
                                    {rechargePlan.map(data => (
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                            <div className="card">
                                                <img src={`${config.imageUrl + data.image}`} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h5 className="card-title text-center">{data.name} <small>Auto Pool</small> </h5>
                                                    <h5 className="card-text text-center mt-2">Entry Price : {data.amount} MNT</h5>
                                                    <p className="card-text text-center mt-2">You will get : {data.nft_count}</p> &nbsp;
                                                    <a  href="javascript:void(0)" onClick={() => viewPaymentMethods(data)} className="btn btn-mint btn-primary">Recharge</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal id="myModal" show={show} className="connact_wallet " onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className='pt-0'>
                    <Modal.Title className='text-white text-center mb-3'>Recharge with</Modal.Title>
                    <div className='px-4'>
                        <a href="javascript:void(0)" onClick={() => rechargeNFTMetamask(rechargeDetails.id, rechargeDetails.amount, rechargeDetails.autopool_wallet)} className="btn btn-mint btn-primary mb-4"><img alt='' src="images/icon/metamask-icon.png" width="20px" />&nbsp;&nbsp;Metamask</a>

                        <a href="javascript:void(0)" onClick={() => rechargeNFTMetamask(rechargeDetails.id, rechargeDetails.amount, rechargeDetails.autopool_wallet)} className="btn btn-mint btn-primary mb-4"><img alt='' src="images/icon/trust-wallet.png" width="20px" />&nbsp;&nbsp;Trust Wallet</a>


                        <a href="javascript:void(0)" onClick={() => rechargeNFTMrmintWallet(rechargeDetails.id, rechargeDetails.amount)} className="btn btn-mint btn-primary mb-1"><img src="images/icon/mntcoin.png" width="20px" />&nbsp;&nbsp;Main Wallet</a>
                        <div class="pull-right mntbalance">Wallet Balance: <span id="web13Balance">{walletBalance ? walletBalance : '0'} MNT </span></div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RechargePlans;
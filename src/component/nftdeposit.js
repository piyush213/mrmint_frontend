import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config';
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import ReactDatatable from '@ashvin27/react-datatable';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { getmntdeposithistoryAction } from '../Action/user.action';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import Web3 from 'web3';
import CopyToClipboard from 'react-copy-to-clipboard';
import moment from 'moment/moment';
import { Col, Container, Modal, Row } from 'react-bootstrap';

const Nftdeposit = () => {
    const [mntdepositList, setmntdepositList] = useState([]);
    var web3 = new Web3(window.ethereum);
    let MrmintContractCall = new web3.eth.Contract(
        config.mrmintContractAbi,
        config.contractAddressForRecharge
    );
    const [toggleSet, settoggleSet] = useState(1);
    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
    const [validatioError, setvalidatioError] = useState({ usdAmount: '' });
    const [userMntBalance, setUserMntBalance] = useState(0)
    const [mntamount, setMntAmount] = useState("")
    const [approve, setApproval] = useState('')
    const [transaction, setTransaction] = useState('')
    const [errormsg, seterrormsg] = useState("");
    const [showTransactionModel, setShowTransactionModel] = useState(false);
    const [startTranaction, setStartTranaction] = useState(false)


    useEffect(() => {
        getUserMntbalance()
        getWithdrawListAPI()
    }, []);

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const getWithdrawListAPI = async () => {
        let res = await getmntdeposithistoryAction();
        if (res.success) {
            setmntdepositList(res.data);
        }
        else {
            seterrormsg(res.msg)
        }
    }

    const inputHandler = (e) => {
        let { name, value, id } = e.target;
        var getDecimalVal = value.toString().indexOf(".");
        var decimalPart = value.toString().substring(getDecimalVal + 1);
        if (decimalPart.length > 2 && getDecimalVal != "-1") {
        } else {
            setMntAmount(value);
        }
    }




    const getUserMntbalance = async () => {
        let balanceOf = await MrmintContractCall.methods.balanceOf(loginData?.bnb_address).call();
        balanceOf = (balanceOf / 10 ** 18).toLocaleString("fullwide", { useGrouping: false })
        setUserMntBalance(balanceOf)
    }

    const maxToken = async () => {
        setMntAmount(userMntBalance);
    }



    const approval = async () => {
        try {
            let value = mntamount * 10 ** 18
            value = value.toString()
            let approval = await MrmintContractCall.methods.approve(config.depositAddress, value);
            let encoded_tx = approval.encodeABI();
            let gasPrice = await web3.eth.getGasPrice();
            let gasLimit = await web3.eth.estimateGas({
                gasPrice: web3.utils.toHex(gasPrice),
                to: config.contractAddressForRecharge,
                from: loginData?.bnb_address,
                data: encoded_tx
            });
            let trx = await web3.eth.sendTransaction({
                gasPrice: web3.utils.toHex(gasPrice),
                gas: web3.utils.toHex(gasLimit),
                to: config.contractAddressForRecharge,
                from: loginData?.bnb_address,
                data: encoded_tx
            });
            if (trx.transactionHash) {
                setApproval('complete')
                return true
            } else {
                setApproval('failed')
                setTransaction('failed')
                toast.error("Something went wrong")
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                return false
            }
        } catch (error) {
            setApproval('failed')
            setTransaction('failed')
            toast.error(error.message)
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            return false

        }
    }

    const sendTransaction = async () => {
        try {
            let allowance = await MrmintContractCall.methods.allowance(loginData?.bnb_address, config.depositAddress);
            let value = mntamount -0.005 
            value = value * 10 ** 18
            if (allowance < value) {
                toast.error("Alloance is less then amount")
                setTransaction('failed')
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
                return
            }
            value = value.toString()
            let approval = await MrmintContractCall.methods.transfer(config.depositAddress, value);
            let encoded_tx = approval.encodeABI();
            let gasPrice = await web3.eth.getGasPrice();
            let gasLimit = await web3.eth.estimateGas({
                gasPrice: web3.utils.toHex(gasPrice),
                to: config.contractAddressForRecharge,
                from: loginData?.bnb_address,
                data: encoded_tx
            });
            let trx = await web3.eth.sendTransaction({
                gasPrice: web3.utils.toHex(gasPrice),
                gas: web3.utils.toHex(gasLimit),
                to: config.contractAddressForRecharge,
                from: loginData?.bnb_address,
                data: encoded_tx
            });
            if (trx.transactionHash) {
                let data = {
                    "wallet": loginData?.bnb_address,
                    "amount": parseFloat(mntamount),
                    "tx_hash": trx.transactionHash
                }                
                toast.success(`${trx.transactionHash.toString().substring(0, 4)}.....${trx.transactionHash.toString().substring(trx.transactionHash.length - 4, trx.transactionHash.length)}`)
                setTransaction('complete')
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setTransaction('failed')
                toast.error("Something went wrong")
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            toast.error(error.message)
            setTransaction('failed')
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }


    function validate() {
        let balanceError = "";

        if (mntamount === '' || mntamount == '0.00' || mntamount == '0.0' || mntamount == '0' || mntamount == '0.') {
            balanceError = "Amount is required."
        } else if (!isNaN(mntamount) === false) {
            balanceError = "Amount is not valid please enter valid amount."
        } else if (mntamount > userMntBalance) {
            balanceError = "You don't have sufficient balance."
        }
        if (balanceError) {
            setvalidatioError({
                balanceError
            })
            return false
        } else {
            return true
        }
    }

    const depositNow = async () => {
        const isValid = validate();
        if (isValid) {

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts[0].length <= 0) {
                toast.error('Please Install metamask')
                return
            }

            if (accounts[0].toUpperCase() != loginData?.bnb_address.toUpperCase()) {
                toast.error('Please connect with registered wallet')
                return
            }
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure want to deposit?.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            setStartTranaction(true)
                            setApproval('pending')
                            setTransaction('pending')
                            try {
                                let allowance = await MrmintContractCall.methods.allowance(loginData?.bnb_address, config.depositAddress);

                                let value = mntamount * 10 ** 18
                                if (allowance < value) {
                                    let app = await approval()
                                    if (app) {
                                        await sendTransaction()
                                    }
                                } else {
                                    setApproval('complete')

                                    await sendTransaction()
                                }
                            } catch (error) {
                                
                            }
                        }
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }
    }
    const copieBtn = async () => {
        toast.success(`Copied!!`);
    }

    const handleChange = (e) => {
        e.preventDefault();
    };


    const columnsForDeposit = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "amount",
            text: "Amount (MNT)",
            cell: (item) => {
                return (
                    <> {item.amount}&nbsp;MNT</>);
            }
        },
        {
            key: "wallet_address",
            text: "Wallet Address",
            cell: (item) => {
                return (
                    <><div>{item.wallet_address.slice(0, 4) + "....." + item.wallet_address.slice(-4)}&nbsp;
                        <CopyToClipboard text={item.wallet_address}>
                            <span title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: 'rgb(157 81 255)' }}>
                                <i class="fa fa-clone "></i></span></CopyToClipboard>
                    </div></>
                );
            }
        },
        {
            key: "tx_hash",
            text: "Hash",
            cell: (item) => {
                return (
                    <><div>{item.tx_hash.slice(0, 4) + "....." + item.tx_hash.slice(-4)}&nbsp;
                        <CopyToClipboard text={item.tx_hash}>
                            <span title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: 'rgb(157 81 255)' }}>
                                <i class="fa fa-clone "></i></span></CopyToClipboard>
                    </div></>
                );
            }
        },
        {
            key: "timestamp",
            text: "Date",
            cell: (item) => {
                return (
                    <span className='time'>
                        {moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
                );
            }
        },
    ];

    const configForDeposit = {
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

    const handleClose = () => {
        window.location.reload()
    };

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Toaster />
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='container'>
                                <div className="row justify-content-center">

                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pt-5">
                                        <div className='buyform withdraw'>
                                            <span className="text-white" style={{ display: 'flex', flex: '1 1 auto', justifyContent: "center" }}>
                                                <strong style={{ fontSize: "22px" }}>Deposit</strong></span>
                                            <div className='text-center pb-2'>
                                                <p>Deposit your MNT from metamask account</p>
                                            </div>
                                            <div className="sc-kcDeIU cvqsCp">
                                                <div className=''>
                                                    <div className='form-group mb-3'>
                                                        <label>Owner Address</label>
                                                        <input type="text" class="form-control text-white" disabled aria-describedby="basic-addon2" value={config.depositAddress} />
                                                    </div>
                                                    <div className='form-group mb-3'>
                                                        <label>Connected Address</label>
                                                        <input type="text" class="form-control text-white" disabled aria-describedby="basic-addon2" value={loginData?.bnb_address} />
                                                    </div>



                                                    <div class="form-group ">
                                                        <label>Amount</label>
                                                        <div class="pull-right mntbalance">Balance: <span id="web13Balance">

                                                            {parseFloat(userMntBalance).toFixed(2)} MNT
                                                        </span></div>

                                                        <div class="input-group ">
                                                            <input onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} onPaste={handleChange} onChange={inputHandler} type="text" class="form-control text-white" decimals="2" value={mntamount} aria-label="Enter Amount (MNT)" aria-describedby="basic-addon2" placeholder="Enter Amount" id="fixed2" />

                                                            <div class="input-group-append">
                                                                <button onClick={maxToken} class="btn btn-outline-secondary copybtn" type="button">MAX</button>
                                                            </div>
                                                        </div>
                                                        <span className="validationErr">{validatioError.balanceError}</span>
                                                    </div>
                                                </div>
                                            </div>


                                            {startTranaction ?
                                                <>
                                                    <div className=" mt-3 w-100"><span
                                                    >Approval <br />{approve} </span></div>
                                                    <div className=" mt-3 w-100"><span
                                                    >Transaction <br />{transaction} </span></div>
                                                </>
                                                : <div className="sc-CtfFt bxUreM mt-3 w-100" id="token-buy-button" onClick={depositNow} >Deposit Now</div>
                                            }
                                        </div>
                                    </div>

                                </div>
                                <div className='row mt-5'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 class="mb-3">Deposit history</h4>
                                        {
                                            <ReactDatatable
                                                config={configForDeposit}
                                                records={mntdepositList}
                                                columns={columnsForDeposit}
                                            /> 

                                        }

                                    </div>
                                </div>
                            </div>
                            {/* -----------Add Liquidity transaction modal---------- */}
                            <Modal
                                show={showTransactionModel}
                                className="transaction_modal"
                                onHide={handleClose}
                                backdrop="static"
                            >
                                <Modal.Header className="text-center" closeButton>
                                    <Modal.Title className="text-white">
                                        <h5 className="mb-0">
                                            Transaction
                                        </h5>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="text-white">
                                    <Container>
                                        <Row className="mb-3">
                                            <Col lg={10}>
                                                {startTranaction ?
                                                    <>
                                                        <div className="sc-CtfFt bxUreM mt-3 w-100"><span
                                                        >Approval <br />{approve} </span></div></>:""}
                                            </Col>
                                            <Col> {startTranaction ?
                                                    <>
                                                <div className="sc-CtfFt bxUreM mt-3 w-100"><span
                                                >Transaction <br />{transaction} </span></div></>:""}
                                            </Col>
                                        </Row>

                                    </Container>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}
export default Nftdeposit;
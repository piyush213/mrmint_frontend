import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { userWithdrawMNTAction, getMntWalletDetailsAction, getActivePhaseAction, userMNTWithdrawAction } from '../Action/user.action';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Withdraw = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [tokenAmount, setTokenAmount] = useState('');
    const [BnbtoUsdPrice, setBNBtoUsdPrice] = useState('');
    const [bnbAmount, setBnbAmount] = useState('0.000000');
    const [mntAmount, setMntAmount] = useState('0.00');
    const [activePhase, setActivePhase] = useState([]);
    const [mntWalletDetails, setmntWalletDetails] = useState([]);
    const [withdrawList, setWithdrawList] = useState([]);
    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
    const [validatioError, setvalidatioError] = useState({ tokenAmount: '' });

    useEffect(() => {
        getMntWalletDetailsAPI();
        getBNBToUsdAPI();
        getActivePhaseAPI();
        getWithdrawListAPI();
    }, []);

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const inputHandler = (e) => {
        let { name, value, id } = e.target;
        let mntPrice = parseFloat(parseFloat(value) - parseFloat(value) * parseFloat(mntWalletDetails.staking_reward_withdraw_percent) / 100).toFixed(2)

        let usdTokenToPrice = activePhase?.price;
        let tokenTousd = parseFloat(parseFloat(usdTokenToPrice) * parseFloat(value)).toFixed(6);
        let bnbPrice = parseFloat(parseFloat(tokenTousd) / parseFloat(BnbtoUsdPrice)).toFixed(6);
        setTokenAmount(value);
        setBnbAmount(bnbPrice);
        setMntAmount(mntPrice)

        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, ['tokenAmountError']: '' }
            })
        }
    }

    const getMntWalletDetailsAPI = async () => {
        let res = await getMntWalletDetailsAction();
        if (res.success) {
            setmntWalletDetails(res.data)
        }
    }

    const getActivePhaseAPI = async () => {
        let res = await getActivePhaseAction();
        if (res.success) {
            setActivePhase(res.data);
        }
    }

    const getWithdrawListAPI = async () => {
        let res = await userMNTWithdrawAction();
        if (res.success) {
            setWithdrawList(res.data);
        }
    }

    const maxToken = async () => {
        setTokenAmount(mntWalletDetails?.withdrawable)
        let token = (mntWalletDetails?.totalMntBalance > mntWalletDetails?.withdrawable)? mntWalletDetails?.withdrawable : mntWalletDetails?.totalMntBalance;
        let usdTokenToPrice = activePhase?.price;
        let tokenTousd = parseFloat(usdTokenToPrice * token).toFixed(6);
        let bnbPrice = parseFloat(tokenTousd / BnbtoUsdPrice).toFixed(6);
        let mntPrice = parseFloat(parseFloat(token) - parseFloat(token) * parseFloat(mntWalletDetails.staking_reward_withdraw_percent) / 100).toFixed(2)
        setBnbAmount(bnbPrice);
        setMntAmount(mntPrice)
    }

    function validate() {
        let tokenAmountError = "";

        if (tokenAmount === '' || tokenAmount == '0.00') {
            tokenAmountError = "Token amount is required."
        } else if (!isNaN(tokenAmount) === false) {
            tokenAmountError = "Token amount is not valid please enter valid amount."
        } else if (tokenAmount < 100) {
            tokenAmountError = "Token should be greater than or equal to 100."
        } else if (tokenAmount > mntWalletDetails?.totalMntBalance) {
            tokenAmountError = "You don't have sufficient balance."
        }
        if (tokenAmountError) {
            setvalidatioError({
                tokenAmountError
            })
            return false
        } else {
            return true
        }
    }

    const withdrawNow = async () => {
        const isValid = validate();
        if (isValid) {

            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure want to withdraw?.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            let res = await userWithdrawMNTAction({ 'tokenAmount': tokenAmount, 'bnbAmount': bnbAmount });
                            if (res.success) {
                                toast.success(res.msg);
                                setTimeout(() => {
                                    window.location.reload();
                                }, 5000);
                            } else {
                                toast.error(res.msg);
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

    const getBNBToUsdAPI = async () => {
        await axios({
            method: 'get',
            url: `https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`,
        }).then(response => {
            console.log("api response=> ",response.data.binancecoin.usd)
            setBNBtoUsdPrice(response.data.binancecoin.usd);
        })
    }

    const columnsForWithdraw = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "amount",
            text: "Token",
            cell: (item) => {
                return (
                    `${parseFloat(item.amount).toFixed(2)} MNT ~ $${parseFloat(item.amount*activePhase?.price).toFixed(2)} `
                );
            }
        },
     
        {
            key: "status",
            text: "Status",
            cell: (item) => {
                return (
                    item.status == 0 ? 'Pending' : item.status == 1 ? 'Completed' : 'Rejected'
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
            key: "approveDate",
            text: "Approve Date",
            cell: (item) => {
                return (
                    item.status == 1 ? item.approveDate : '-'
                );
            }
        },
    ];

    const configForWithdraw = {
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
    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                    <Toaster />
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='container'>
                                <div className="row justify-content-center">
                                    
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pt-5">
                                        <div className='buyform withdraw'>
                                            <span className="text-white" style={{ display: 'flex', flex: '1 1 auto', justifyContent: "center" }}>
                                                <strong style={{ fontSize: "22px" }}>Withdraw MNT Token</strong></span>
                                            <div className='text-center pb-2'>
                                                <p>Get Your MNT Token in your BNB Address</p>
                                            </div>
                                            <div className="sc-kcDeIU cvqsCp">
                                                <div className=''>
                                                    <div className='form-group mb-3'>
                                                        <label>Withdrawal Address</label>
                                                        <input type="text" class="form-control text-white" disabled aria-describedby="basic-addon2" value={loginData?.bnb_address} />

                                                    </div>
                                                    <div class="form-group ">
                                                        <label>Amount</label>
                                                        <div class="pull-right mntbalance">MNT Balance: <span id="web13Balance">{parseFloat(mntWalletDetails?.totalMntBalance).toFixed(2)} ~ ${parseFloat(mntWalletDetails?.totalMntBalance * activePhase?.price).toFixed(2)}</span></div>
                                                        <div class="input-group ">
                                                            <input onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} onChange={inputHandler} type="text" class="form-control text-white" value={tokenAmount} name='tokenAmount' aria-label="Enter Amount (MNT)" aria-describedby="basic-addon2" placeholder="Enter Amount (MNT)" />

                                                            <div class="input-group-append">
                                                                <button onClick={maxToken} class="btn btn-outline-secondary copybtn" type="button">MAX</button>
                                                            </div>
                                                        </div>
                                                        <span className="validationErr">{validatioError.tokenAmountError}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="text-green"> Max withdraw limit {mntWalletDetails.mntBalanceWithdrawDailyLimit} MNT/Day </small><br></br>
                                            
                                            <small class="text-white"> Withdrawal Fee: {mntWalletDetails.staking_reward_withdraw_percent} % </small><br></br>
                                            <small class="text-white"> You will get: {mntAmount==0|| mntAmount== "NaN"?0:mntAmount} MNT </small>
                                            <small class="text-white" style={{ float: 'right' }}> Minimum Withdraw = 100 MNT</small>
                                            <div className="sc-CtfFt bxUreM mt-3" id="token-buy-button" onClick={withdrawNow} >Withdraw Now</div>
                                            <span style={{fontSize : '12px'}}>Note: Please allow us 8-12 working hours to process your withdraw request.</span>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className='row mt-5'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 class="mb-3">Withdraw history</h4>
                                       
                                            <ReactDatatable
                                                config={configForWithdraw}
                                                records={withdrawList}
                                                columns={columnsForWithdraw}
                                            />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}
export default Withdraw;
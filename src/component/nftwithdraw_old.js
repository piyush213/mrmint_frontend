import React, {  useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import ReactDatatable from '@ashvin27/react-datatable';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { userWithdrawAction, getWalletBalanceAction, getWithdrawListAction } from '../Action/user.action';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const Nftwithdraw = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [usdAmount, setusdAmount] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [miningWalletBalance, setMiningWalletBalance] = useState(0);
    const [withdrawType, setwithdrawType] = useState(1);
    const [referralMinimumAmount, setreferralMinimumAmount] = useState(1);
    const [miningRewardMinimumAmount, setminingRewardMinimumAmount] = useState(1);
    const [withdrawList, setWithdrawList] = useState([]);
    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
    const [validatioError, setvalidatioError] = useState({ usdAmount: '' });

    useEffect(() => {
        getWalletBalanceAPI();
        getWithdrawListAPI();
    }, []);

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const inputHandler = (e) => {
        let { name, value, id } = e.target;
        setusdAmount(value);
        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, ['balanceError']: '' }
            })
        }
    }

    const inputHandlerForType = (e) => {
        let { name, value, id } = e.target;
        setwithdrawType(value);
    }

    const getWalletBalanceAPI = async () => {
        let res = await getWalletBalanceAction();
        if (res.success) {
            setWalletBalance(res.data?.nft_usd_balance);
            setMiningWalletBalance(res.data?.mining_balance);
            setreferralMinimumAmount(res.data?.nft_referral_reward_min_usd_withdraw);
            setminingRewardMinimumAmount(res.data?.mining_reward_min__mnt_withdraw);
        }
    }

    const getWithdrawListAPI = async () => {
        let res = await getWithdrawListAction();
        if (res.success) {
            setWithdrawList(res.data);
        }
    }

    const maxToken = async () => {
        if (withdrawType == 1) {
            setusdAmount(walletBalance);
        } else {
            setusdAmount(miningWalletBalance);
        }
    }

    function validate() {
        let balanceError = "";

        if (usdAmount === '' || usdAmount == '0.00') {
            balanceError = "Amount is required."
        } else if (!isNaN(usdAmount) === false) {
            balanceError = "Amount is not valid please enter valid amount."
        } else if (withdrawType == 1 && parseFloat(usdAmount) < referralMinimumAmount) {
            balanceError = `Amount should be greater than or equal to ${referralMinimumAmount}.`
        } else if (withdrawType == 2 && parseFloat(usdAmount) < miningRewardMinimumAmount) {
            balanceError = `Amount should be greater than or equal to ${miningRewardMinimumAmount}.`
        } else if (parseFloat(usdAmount) > parseFloat(walletBalance) && withdrawType == 1 ) {
            balanceError = "You don't have sufficient balance."
        } else if (parseFloat(usdAmount) > parseFloat(miningWalletBalance) && withdrawType == 2 ) {
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
                            let res = await userWithdrawAction({ 'usd_amount': usdAmount, 'withdraw_type' : withdrawType });
                            if (res.success) {
                                toast.success(res.msg);
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
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

    const columnsForWithdraw = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "usd_amount",
            text: "Amount",
            cell: (item) => {
                return (
                    item.withdraw_type == 1? `$${item.usd_amount}` : `${item.usd_amount} MNT`
                );
            }
        },
        {
            key: "usd_amount",
            text: "Withdrawal Type",
            cell: (item) => {
                return (
                    item.withdraw_name
                );
            }
        },        
        {
            key: "status",
            text: "Status",
            cell: (item) => {
                return (
                    item.status
                );
            }
        },
        {
            key: "created_at",
            text: "Date",
            cell: (item) => {
                return (
                    item.requestDate
                );
            }
        },
        {
            key: "approveDate",
            text: "Approve Date",
            cell: (item) => {
                return (
                    item.approvedDate
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
                                                <strong style={{ fontSize: "22px" }}>Withdraw</strong></span>
                                            <div className='text-center pb-2'>
                                                <p>Get Your balance in your wallet</p>
                                            </div>
                                            <div className="sc-kcDeIU cvqsCp">
                                                <div className=''>
                                                    <div className='form-group mb-3'>
                                                        <label>Withdrawal Address</label>
                                                        <input type="text" class="form-control text-white" disabled aria-describedby="basic-addon2" value={loginData?.bnb_address} />
                                                    </div>

                                                    <div className='form-group mb-3'>
                                                        <label>Withdrawal Type</label>
                                                        <select class="form-control" onChange={inputHandlerForType} name='withdraw_type'>
                                                            <option className='withdrawType' value={1}>Referral</option>
                                                            <option className='withdrawType' value={2}>Mining Reward</option>
                                                        </select>
                                                    </div>

                                                    <div class="form-group ">
                                                        <label>Amount</label>
                                                        <div class="pull-right mntbalance">Balance: <span id="web13Balance">
                                                            {withdrawType == 1 ?
                                                                `$` + parseFloat(walletBalance ? parseFloat(walletBalance).toFixed(2) : '0.00').toFixed(2)
                                                                :
                                                                parseFloat(miningWalletBalance ? parseFloat(miningWalletBalance).toFixed(2) : '0.00').toFixed(2) + ` MNT`
                                                            } </span></div>

                                                        <div class="input-group ">
                                                            <input onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} onChange={inputHandler} type="text" class="form-control text-white" value={usdAmount} name='usdAmount' aria-label="Enter Amount (MNT)" aria-describedby="basic-addon2" placeholder="Enter Amount" />

                                                            <div class="input-group-append">
                                                                <button onClick={maxToken} class="btn btn-outline-secondary copybtn" type="button">MAX</button>
                                                            </div>
                                                        </div>
                                                        <span className="validationErr">{validatioError.balanceError}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="text-white mb-3" style={{ float: 'right' }}> Minimum Withdraw = {withdrawType == 1 ? `$${referralMinimumAmount}` : `${miningRewardMinimumAmount} MNT`}</small>
                                            <div className="sc-CtfFt bxUreM mt-3 w-100" id="token-buy-button" onClick={withdrawNow} >Withdraw Now</div>
                                            <span style={{ fontSize: '12px' }}>Note: Please allow us 12-24 working hours to process your withdraw request.</span>
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
export default Nftwithdraw;
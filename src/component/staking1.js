import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import ReactDatatable from '@ashvin27/react-datatable'

import { getProfileAction, stackingSubmitAction, getUserStackingHistoryAction, getActivePhaseAction, stackingPriceAction } from '../Action/user.action';

const Staking = () => {

    const [toggleSet, settoggleSet] = useState(1)
    const [userDetails, setuserDetails] = useState({});
    const [stackHistory, setStackHistory] = useState([]);
    const [activePhase, setActivePhase] = useState([]);
    const [stakingPrice, setstakingPrice] = useState([]);
    const [form, setForm] = useState({ wallet: 'mnt', amount: '', period: '' });
    const [errors, setErrors] = useState({ wallet: '', amount: '', period: '', valid: false });

    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));

    useEffect(() => {
        getProfileAPI();
        getUserStackingHistoryAPI();
        getActivePhaseAPI();
        getStackingPriceAPI();
    }, [])

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const getProfileAPI = async () => {
        let res = await getProfileAction();
        if (res.success) {
            setuserDetails(res.data)
        }
    }
    const getUserStackingHistoryAPI = async () => {
        let res = await getUserStackingHistoryAction({ email: loginData.email, bnb_address: loginData.bnb_address });
        if (res.success) {
            setStackHistory(res.data)
        }
    }
    const getActivePhaseAPI = async () => {
        let res = await getActivePhaseAction();
        if (res.success) {
            setActivePhase(res.data);
        }
    }
    const getStackingPriceAPI = async () => {
        let res = await stackingPriceAction();
        if (res.success) {
            setstakingPrice(res.data);
        }
    }

    const maxAmountSet = async () => {
        let maxAmount = 0;
        if (form.wallet === 'mnt') maxAmount = userDetails.mnt_balance;
        else maxAmount = userDetails.vesting_balance;
        setForm((old) => {
            return { ...old, 'amount': maxAmount }
        })
    }
    const inputHandler = async (e) => {
        const { name, value } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })
        if (name === 'wallet') {
            setForm((old) => {
                return { ...old, 'amount': '' }
            })
        }
    }

    const SubmitForm = async (e) => {
        e.preventDefault()
        let maxAmount = 0;
        let apy = 0;
        if (form.wallet === 'mnt') maxAmount = userDetails.mnt_balance;
        else maxAmount = userDetails.vesting_balance;
        if (parseFloat(maxAmount) < parseFloat(form.amount)) {
            toast.error("Token Amout should be less then or equals to " + maxAmount);
            return;
        }
        if (parseFloat(form.amount) < parseFloat(stakingPrice.minimum)) {
            toast.error("Token Amout should be greater then " + stakingPrice.minimum);
            return;
        }
        if (form.period == 6) apy = stakingPrice.six * 12;
        else if (form.period == 9) apy = stakingPrice.nine * 12;
        else if (form.period == 12) apy = stakingPrice.twelve * 12;
        else if (form.period == 18) apy = stakingPrice.eighteen * 12;
        else if (form.period == 24) apy = stakingPrice.twentyfour * 12;
        form.email = userDetails.email;
        form.bnb_address = loginData.bnb_address;
        form.user_id = loginData.id;
        form.phase_id = activePhase.id;
        form.usd_amount = activePhase.price * form.amount;
        form.apy = apy;
        let res = await stackingSubmitAction(form);
        if (res.success) {
            toast.success(res.msg);
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } else {
            toast.error(res.msg);
        }
    }

    const columns = [
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
                    `${item.amount} MNT`
                );
            }
        },
        {
            key: "usd_amount",
            text: "Amount ($)",
            cell: (item) => {
                return (
                    '$' + `${item.usd_amount}`
                );
            }
        },
        {
            key: "period",
            text: "Period",
            cell: (item) => {
                return (
                    `${item.period} Monhts`
                );
            }
        },
        {
            key: "apy",
            text: "Staking APY",
            cell: (item) => {
                return (
                    `${item.apy}%`
                );
            }
        },
        {
            key: "remaining",
            text: "Month Passed",
            cell: (item) => {
                return (
                    `${item.period - item.remaining} Monhts`
                );
            }
        },
        {
            key: "status",
            text: "Status",
            cell: (item) => {
                return (
                    <>
                        <kbd className="bg-success">Active</kbd>
                    </>
                );
            }
        },
    ];

    const configForSale = {
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
            <div className={`page-wrapper${toggleSet === 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                    <Dashboardheader clickToggle={toggleManage} />
                    <Toaster />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='container'>
                                <div className="row">
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">

                                    </div>

                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pt-5">
                                        <div className='buyform staking'>
                                            <span className="text-left text-white" style={{ display: 'flex', flex: '1 1 auto', justifyContent: "center" }}>
                                                <strong style={{ fontSize: "22px" }}>Staking With Us</strong></span>
                                            <div className="sc-kcDeIU cvqsCp">


                                                <div className=''>
                                                    <div className='form-group'>
                                                        <select className='form-control' onChange={inputHandler} name="wallet">
                                                            <option value="" disabled>Select Wallet</option>
                                                            <option value="mnt">MNT Wallet</option>
                                                            <option value="vesting">Vesting Wallet</option>
                                                        </select>
                                                        <span className='validationError'>{errors.wallet}</span>
                                                    </div>
                                                    <div class="form-group ">
                                                        <div class="input-group ">
                                                            <input type="text" class="form-control text-white stkamt" aria-label="Enter Amount" name="amount" onChange={inputHandler} value={form.amount} aria-describedby="basic-addon2" placeholder="Enter stacking amount" autoComplete='off' onKeyPress={(event) => { if (!/^\d*[.]?\d{0,1}$/.test(event.key)) { event.preventDefault(); } }} />
                                                            <div class="input-group-append">
                                                                <button class="btn btn-outline-secondary copybtn" onClick={maxAmountSet} type="button">MAX</button>
                                                            </div>
                                                        </div>
                                                        <span className='validationError'>{errors.amount}</span>
                                                    </div>
                                                    <div className='form-group'>
                                                        <select className='form-control' onChange={inputHandler} name="period">
                                                            <option value="" disabled selected>Select Staking Period</option>
                                                            <option value={9}>9 Month - {stakingPrice.nine * 12}% APY</option>
                                                            <option value={12}>12 Month - {stakingPrice.twelve * 12}% APY</option>
                                                            <option value={18}>18 Month - {stakingPrice.eighteen * 12}% APY</option>
                                                            <option value={24}>24 Month - {stakingPrice.twentyfour * 12}% APY</option>
                                                        </select>
                                                        <span className='validationError'>{errors.period}</span>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="sc-CtfFt bxUreM" id="token-buy-button" onClick={SubmitForm} >Stake Now</div>
                                            <br />
                                            <small class="text-white"> Note : Staking rewards will be distributed monthly</small>
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                                    </div>
                                </div>
                                <div className='row mt-5'>
                                    <div className='col-lg-12 col-12 '>
                                            <ReactDatatable
                                                config={configForSale}
                                                records={stackHistory}
                                                columns={columns}
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
export default Staking;
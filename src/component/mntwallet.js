/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import toast, { Toaster } from 'react-hot-toast';
import { ReactDialogBox } from 'react-js-dialog-box'
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios'
import { getMntWalletDetailsAction, getActivePhaseAction, transferMNTAction } from '../Action/user.action';

const Mntwallet = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [mntWalletDetails, setmntWalletDetails] = useState([]);
    const [activePhase, setActivePhase] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [liveprice, setliveprice] = useState(0);


    useEffect(() => {
        getMntWalletDetailsAPI();
        getActivePhaseAPI();
        getliveprice()
    }, []);

    const getliveprice = async ()=>{
        await axios({
            method: 'get',
            url: `https://api.coinstore.com/api/v1/market/trade/MNTUSDT?size=1`,
        }).then(response => {
            setliveprice(response.data.data[0].price);
        })  
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

    const transferMNT = async (balance) => {
        if (parseFloat(balance) <= 0) {
            toast.error("You don't have sufficient balance!");
            return;
        }
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure want to transfer MNTs from MNT wallet to main wallet?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setDialogOpen(true);
                        let res = await transferMNTAction();
                        if (res.success) {
                            getMntWalletDetailsAPI();
                            toast.success(res.msg);
                            setDialogOpen(false);
                        } else {
                            setDialogOpen(false);
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

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <Toaster />

                {isDialogOpen ?
                    <ReactDialogBox
                        bodyBackgroundColor='white'
                        bodyTextColor='black'
                    >
                        <div className="text-center pl-3 pr-3">
                            < br />
                            <p style={{ color: '#091f3f' }}>
                                Please do not refresh page or close tab.
                            </p>
                            <div>
                                <div class="spinner-border"></div>
                            </div>
                        </div>
                    </ReactDialogBox>
                    : ""}

                <div className="main-container">
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className='col-md-12 pt-4'>
                                    <div className=' p-3'>
                                        <span className='mb-2'> Your MNT Breakdown</span>
                                        <div className='form-body'>
                                            <div className='boxcolor banner_blue mb-4 mt-2 '>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <h3>{mntWalletDetails?.totalMntBalance ? parseFloat(mntWalletDetails?.totalMntBalance).toFixed(2) : '0.00'} MNT ~
                                                            ${mntWalletDetails?.totalMntBalance ? parseFloat(mntWalletDetails?.totalMntBalance * activePhase?.price).toFixed(2) : '0.00'}</h3>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                    <a href={`${config.baseUrl}withdraw`} class="sc-CtfFt bxUreM" id="token-buy-button" ><i className='bi bi-wallet'></i>&nbsp;&nbsp;Withdraw</a>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <a href="javascript:void(0)" onClick={()=> transferMNT(mntWalletDetails?.totalMntBalance)} class="sc-CtfFt bxUreM" id="token-buy-button" ><i className='bi bi-safe2'></i>&nbsp;&nbsp;Transfer</a>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className='col-md-12'>
                                                        <div className='card p-3'>
                                                            <table class="text-white" width="100%">
                                                                <tbody><tr>
                                                                    <td class="text-left">Total Buying</td>
                                                                    <td class="text-right"><strong>{mntWalletDetails?.totalTokenBuy ? mntWalletDetails?.totalTokenBuy : '0'} MNT </strong>

                                                                        ~ ${mntWalletDetails?.totalTokenBuy ? parseFloat(mntWalletDetails?.totalTokenBuy * activePhase?.price).toFixed(2) : '0.00'}
                                                                    </td>
                                                                </tr>
                                                                    <tr>
                                                                        <td class="text-left">Total Staking</td>
                                                                        <td class="text-right"><strong>{mntWalletDetails?.totalTokenStack ? mntWalletDetails?.totalTokenStack : '0'} MNT </strong>
                                                                        
                                                                        ~ ${mntWalletDetails?.totalTokenStack ? parseFloat(mntWalletDetails?.totalTokenStack * activePhase?.price).toFixed(2) : '0.00'}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <hr class="bg-white"></hr>
                                                            <table class="text-white" width="100%">
                                                                <tbody><tr>
                                                                    <td class="text-left">Total Staking Earnings</td>
                                                                    <td class="text-right"><strong> {mntWalletDetails?.tokenStackEarning ? mntWalletDetails?.tokenStackEarning : '0'} MNT </strong>
                                                                    
                                                                    ~ ${mntWalletDetails?.tokenStackEarning ? parseFloat(mntWalletDetails?.tokenStackEarning * activePhase?.price).toFixed(2) : '0.00'}
                                                                    </td>
                                                                </tr>
                                                                    <tr>
                                                                        <td class="text-left">Total Referral Earnings</td>
                                                                        <td class="text-right"><strong>{mntWalletDetails?.totalReferralEarning ? mntWalletDetails?.totalReferralEarning : '0'} MNT </strong>
                                                                        
                                                                        ~ ${mntWalletDetails?.totalReferralEarning ? parseFloat(mntWalletDetails?.totalReferralEarning * activePhase?.price).toFixed(2) : '0.00'}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <hr class="bg-white"></hr>
                                                            <table class="text-white" width="100%">
                                                                <tbody><tr>
                                                                    <td class="text-left">Current MNT Price</td>
                                                                    <td class="text-right"><strong>USD ${liveprice ? liveprice : '0.00'}</strong></td>
                                                                </tr>
                                                                    <tr>
                                                                        <td class="text-left">Total Supply in public sale</td>
                                                                        <td class="text-right"><strong>{activePhase?.quantity ? activePhase?.quantity : '0.00'}</strong></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-6 text-center'>
                                                    <img src='images/wall-gif.gif' alt=''/>
                                                </div>
                                            </div>
                                        </div>
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
export default Mntwallet;
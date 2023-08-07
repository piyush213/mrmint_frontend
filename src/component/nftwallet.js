import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import { getNFTstatisticsListAction, getWalletBalanceAction, getWithdrawListAction, getRewardHistoryAction } from '../Action/user.action';

const Nftwallet = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [walletBalance, setWalletBalance] = useState([]);
    const [statisticsList, setstatisticsList] = useState({});
    const [withdrawList, setWithdrawList] = useState([]);
    const [rewardList, setRewardList] = useState([]);

    useEffect(() => {
        getstatisticsListAPI();
        getWalletBalanceAPI();
        getWithdrawListAPI();
        getRewardHistoryAPI();
    }, []);

    const getRewardHistoryAPI = async () => {
        let res = await getRewardHistoryAction();
        if (res.success) {
            setRewardList(res.data);
        }
    }

    const getstatisticsListAPI = async () => {
        let res = await getNFTstatisticsListAction();
        if (res.success) {
            setstatisticsList(res.data[0])
        }
    }

    const getWalletBalanceAPI = async () => {
        let res = await getWalletBalanceAction();
        if (res.success) {
            setWalletBalance(res.data)
        }
    }

    const getWithdrawListAPI = async () => {
        let res = await getWithdrawListAction();
        if (res.success) {
            setWithdrawList(res.data);
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll ">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className='col-md-12 pt-4'>
                                    <div className=' p-3'>
                                        <span className='mb-2'> Main Wallet</span>
                                        <div className='form-body'>
                                            <div className='boxcolor banner_blue mb-4 mt-2 '>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <h3>{walletBalance ? parseFloat(walletBalance?.main_balance).toFixed(2) : '0.00'} MNT</h3>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <a href={`${config.baseUrl}mntdeposit`} class="sc-CtfFt bxUreM" id="token-buy-button" ><i className='bi bi-wallet'></i>&nbsp;&nbsp;Deposit</a>
                                                    </div>
                                                    <div className='col-lg-3'>
                                                        <a href={`${config.baseUrl}nftwithdraw`} class="sc-CtfFt bxUreM" id="token-buy-button" ><i className='bi bi-wallet'></i>&nbsp;&nbsp;Withdraw</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-12'>
                                                    <div className='col-md-6'>
                                                        <div className='card p-3 nftwalletbox'>
                                                            <table class="text-white" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="text-left">Referral Wallet</td>
                                                                        <td class="text-right"><strong>${walletBalance ? parseFloat(walletBalance?.nft_usd_balance).toFixed(2) : '0.00'}  </strong>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <h4 class="mt-2 mb-3">
                                                            Recent Withdrawal Deposit Requests
                                                        </h4>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <div className='card  mt-2 p-4'>
                                                            <div className='table-responsive'>
                                                                <table width="100%" className='table'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Amount</th>
                                                                            <th>Status</th>
                                                                            <th>Date</th>
                                                                            <th>Approve Date</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {withdrawList.map((data, i) => (
                                                                            i < 5?
                                                                            <>
                                                                                <tr>
                                                                                    <td>{i+1}</td>
                                                                                    <td>{data.withdraw_type == 1 ? `$${data.usd_amount}` : `${data.usd_amount} MNT`}</td>
                                                                                    <td>{data.status}</td>
                                                                                    <td>{data.requestDate}</td>
                                                                                    <td>{data.approvedDate}</td>
                                                                                </tr>
                                                                            </>
                                                                            :""
                                                                        ))}
                                                                    </tbody>
                                                                </table>
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default Nftwallet;
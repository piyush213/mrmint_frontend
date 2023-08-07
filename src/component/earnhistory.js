/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getEarningHistoryAction, getActivePhaseAction, getstatisticsListAction } from '../Action/user.action';

const Earnhistory = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [activePhase, setActivePhase] = useState([]);
    const [refferralEarning, setRefferralEarning] = useState([]);
    const [stackingEarning, setStackingEarning] = useState([]);
    const [statisticsList, setstatisticsList] = useState([]);
    const [stakingTab, setstakingTab] = useState(1);

    useEffect(() => {
        getActivePhaseAPI();
        setTimeout(() => {
            getstatisticsListAPI();
            getStackEarningHistoryAPI(1);  // 1-Stacking reward
            getReferralEarningHistoryAPI(2); // Type 2 for referral            
        }, 500);
    }, []);

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const stakingTabClick = (type) => {
        setstakingTab(type)
    }    

    const getActivePhaseAPI = async () => {
        let res = await getActivePhaseAction();
        if (res.success) {
            setActivePhase(res.data);
        }
    }

    const getstatisticsListAPI = async () => {
        let res = await getstatisticsListAction();
        if (res.success) {
            setstatisticsList(res.data);
        }
    }

    const getStackEarningHistoryAPI = async (type) => {
        let res = await getEarningHistoryAction({ 'type': type });
        if (res.success) {
            setStackingEarning(res.data);
        }
    }

    const getReferralEarningHistoryAPI = async (type) => {
        let res = await getEarningHistoryAction({ 'type': type });
        if (res.success) {
            setRefferralEarning(res.data);
        }
    }

    const columnsForRefferralEarning = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "type",
            text: "Type",
            cell: (item) => {
                return (
                    `${item.type == 1 ? 'ROI Token Credited' : 'Referral Token Credited'}`
                );
            }
        },
        {
            key: "amount",
            text: "Token",
            cell: (item) => {
                return (
                    `${parseFloat(item.amount).toFixed(2)} MNT ~ $${parseFloat(item.amount * activePhase?.price).toFixed(2)}`
                );
            }
        },
        {
            key: "_from",
            text: "Referral From",
            cell: (item) => {
                return (
                    `${item.email}`
                );
            }
        },
        {
            key: "referral_percent",
            text: "Referral Percent",
            cell: (item) => {
                return (
                    `${item.referral_percent}%`
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
        }
    ];

    const configForRefferralEarning = {
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

    const columnsForStackingEarning = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "type",
            text: "Type",
            cell: (item) => {
                return (
                    `${item.type == 1 ? 'ROI Token Credited' : 'Referral Token Credited'}`
                );
            }
        },
        {
            key: "amount",
            text: "Token",
            cell: (item) => {
                return (
                    `${parseFloat(item.amount).toFixed(2)} MNT ~ $${parseFloat(item.amount * activePhase?.price).toFixed(2)}`
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
        }
    ];

    const configForStackingEarning = {
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
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className='col-md-12'>
                                    <div className="card boxHeight p-2 mt-2">
                                        <div className="card-body">
                                            <div className="custom-tabs-container">
                                                <ul className="nav nav-tabs" id="customTab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <a
                                                            onClick={()=> stakingTabClick(1)}
                                                            className={stakingTab==1?'nav-link active' : 'nav-link'}
                                                            data-bs-toggle="tab"
                                                            href="javascript:void(0)"
                                                            role="tab"
                                                            aria-controls="one"
                                                            aria-selected="true"
                                                        >
                                                            Referral Earning
                                                        </a>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <a
                                                            onClick={()=> stakingTabClick(2)}
                                                            className={stakingTab==2?'nav-link active' : 'nav-link'}
                                                            data-bs-toggle="tab"
                                                            href="javascript:void(0)"
                                                            role="tab"
                                                            aria-controls="two"
                                                            aria-selected="false"
                                                        >
                                                            Staking Earning
                                                        </a>
                                                    </li>

                                                </ul>
                                                <div className="tab-content" id="customTabContent">
                                                    {stakingTab == 1?
                                                    <div>
                                                        <h4 className='mb-3'>Referral Earning History</h4>
                                                        <h5 className='mb-3'>Total Referral Earning: {statisticsList?.totalReferralEarning ? parseFloat(statisticsList?.totalReferralEarning).toFixed(2) : '0.00'} MNT ~ 
                                                        
                                                        ${statisticsList?.totalReferralEarning ? parseFloat(statisticsList?.totalReferralEarning * activePhase?.price).toFixed(2) : '0.00'}</h5>
                                                        <ReactDatatable
                                                            config={configForRefferralEarning}
                                                            records={refferralEarning}
                                                            columns={columnsForRefferralEarning}
                                                        />
                                                    </div>
                                                    :
                                                    stakingTab == 2?
                                                    <div >
                                                        <h4 className='mb-3'>Staking Earning History</h4>
                                                        <h5 className='mb-3'>Total Staking Earning: {statisticsList?.totalStakingEarning ? parseFloat(statisticsList?.totalStakingEarning).toFixed(2) : '0.00'} MNT ~ 
                                                        
                                                        ${statisticsList?.totalStakingEarning ? parseFloat(statisticsList?.totalStakingEarning * activePhase?.price).toFixed(2) : '0.00'}</h5>                                                        
                                                        <ReactDatatable
                                                            config={configForStackingEarning}
                                                            records={stackingEarning}
                                                            columns={columnsForStackingEarning}
                                                        />
                                                    </div>
                                                    :""}
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
export default Earnhistory;
import React, {  useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import ReactDatatable from '@ashvin27/react-datatable';
import { getEarningHistoryAction, getActivePhaseAction, getstatisticsListAction } from '../Action/user.action';

const Nftearnhistory = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [activePhase, setActivePhase] = useState([]);
    const [refferralEarning, setRefferralEarning] = useState([]);
    const [stackingEarning, setStackingEarning] = useState([]);
    const [statisticsList, setstatisticsList] = useState([]);

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
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
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
                                                            className="nav-link active"
                                                            id="tab-one"
                                                            data-bs-toggle="tab"
                                                            href="#one"
                                                            role="tab"
                                                            aria-controls="one"
                                                            aria-selected="true"
                                                        >
                                                            Referral Earning
                                                        </a>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <a
                                                            className="nav-link"
                                                            id="tab-two"
                                                            data-bs-toggle="tab"
                                                            href="#two"
                                                            role="tab"
                                                            aria-controls="two"
                                                            aria-selected="false"
                                                        >
                                                            Staking Earning
                                                        </a>
                                                    </li>

                                                </ul>
                                                <div className="tab-content" id="customTabContent">
                                                    <div className="tab-pane fade show active" id="one" role="tabpanel">
                                                        <h4 className='mb-3'>Referral Earning History</h4>
                                                        <h5 className='mb-3'>Total Referral Earning: {statisticsList?.totalReferralEarning ? parseFloat(statisticsList?.totalReferralEarning).toFixed(2) : '0.00'} MNT ~ 
                                                        
                                                        ${statisticsList?.totalReferralEarning ? parseFloat(statisticsList?.totalReferralEarning * activePhase?.price).toFixed(2) : '0.00'}</h5>
                                                        <ReactDatatable
                                                            config={configForRefferralEarning}
                                                            records={refferralEarning}
                                                            columns={columnsForRefferralEarning}
                                                        />
                                                    </div>
                                                    <div className="tab-pane fade" id="two" role="tabpanel">
                                                        <h4 className='mb-3'>Staking Earning History</h4>
                                                        <h5 className='mb-3'>Total Staking Earning: {statisticsList?.totalStakingEarning ? parseFloat(statisticsList?.totalStakingEarning).toFixed(2) : '0.00'} MNT ~ 
                                                        
                                                        ${statisticsList?.totalStakingEarning ? parseFloat(statisticsList?.totalStakingEarning * activePhase?.price).toFixed(2) : '0.00'}</h5>                                                        
                                                        <ReactDatatable
                                                            config={configForStackingEarning}
                                                            records={stackingEarning}
                                                            columns={columnsForStackingEarning}
                                                        />
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
export default Nftearnhistory;
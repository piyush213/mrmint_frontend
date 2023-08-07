import React, {  useEffect, useState } from 'react';
import config from '../coreFIles/config';
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getTokenPurchaseAction, getMntWalletDetailsAction, getActivePhaseAction } from '../Action/user.action';

const Buyhistory = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [mntWalletDetails, setmntWalletDetails] = useState([]);
    const [activePhase, setActivePhase] = useState([]);
    const [phaseList, setPhaseList] = useState([]);

    useEffect(() => {
        getMntWalletDetailsAPI();
        getTokenPurchaseAPI();
        getActivePhaseAPI();
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
                    `${parseFloat(item.token).toFixed(2)} MNT ~ $${item.token? parseFloat(item.token*activePhase?.price).toFixed(2) : '0.00'}`
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

    const getActivePhaseAPI = async () => {
        let res = await getActivePhaseAction();
        if (res.success) {
            setActivePhase(res.data);
        }
    }    

    const getTokenPurchaseAPI = async () => {
        let res = await getTokenPurchaseAction();
        if (res.success) {
            setPhaseList(res.data)
        }
    }

    const getMntWalletDetailsAPI = async () => {
        let res = await getMntWalletDetailsAction();
        if (res.success) {
            setmntWalletDetails(res.data)
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }


    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper"> <br />

                            <span className='mb-2'> Your Vesting Balance</span>
                            <div className='boxcolor banner_blue mb-4 mt-2 '>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <h3>{mntWalletDetails.vesting_balance? parseInt(mntWalletDetails.vesting_balance).toFixed(2) : '0' } MNT

                                        ~ ${mntWalletDetails.vesting_balance ? parseFloat(mntWalletDetails.vesting_balance * activePhase?.price).toFixed(2) : '0.00'}

                                        </h3>
                                    </div>
                                    <div className='col-lg-3'></div>
                                    <div className='col-lg-3'> </div>
                                </div>
                            </div>

                            <div className='card  mt-4 p-4'>
                                <div className='row'>
                                    <div className='col-lg-12 col-12 '>


                                        <h4 className='mb-3 heading'>Vesting Wallet(Token Purchase History)</h4>
                                        <ul>
                                            <li>1. You can withdraw the vesting balance after 9 months from the date of purchase</li>
                                            <li>2. Meanwhile you can stake the vested balance to earn more MNT token</li>
                                        </ul>
                                        <br />
                                        
                                            <ReactDatatable
                                                config={configForWallet}
                                                records={phaseList}
                                                columns={columnsForWallet}
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
export default Buyhistory;
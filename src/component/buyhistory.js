import React, {  useEffect, useState } from 'react';
import config from '../coreFIles/config';
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import ReactDatatable from '@ashvin27/react-datatable';
import { getTokenPurchaseAction, getMntWalletDetailsAction, getActivePhaseAction } from '../Action/user.action';

const Buyhistory = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [activePhase, setActivePhase] = useState([]);
    const [mntWalletDetails, setmntWalletDetails] = useState([]);
    const [phaseList, setPhaseList] = useState([]);

    useEffect(() => {
        getActivePhaseAPI();
        getMntWalletDetailsAPI();
        setTimeout(() => {
            getTokenPurchaseAPI();
        }, 500);
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
                    `${parseFloat(item.token).toFixed(2)} MNT ~ $${parseFloat(item.token*activePhase?.price).toFixed(2)}`
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
                            <div className='card  mt-4 p-4'>
                                <div className='row'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 className='mb-4'>Token Purchase History</h4>
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
import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { getTeamReferralListAction,getActivePhaseAction } from '../Action/user.action';
import { useParams } from 'react-router-dom';
import ReactDatatable from '@ashvin27/react-datatable';

const Teamrefer = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [activePhase, setActivePhase] = useState([]);
    const [teamReferral, setTeamReferral] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        getActivePhaseAPI();
        getTeamReferralAPI();
    }, []);

    const getActivePhaseAPI = async () => {
        let res = await getActivePhaseAction();
        if (res.success) {
            setActivePhase(res.data);
        }
    }

    const getTeamReferralAPI = async () => {
        let res = await getTeamReferralListAction({ 'uid': id });
        if (res.success) {
            setTeamReferral(res.data)
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const columnsForWallet = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "email",
            text: "Email",
            cell: (item) => {
                return (
                    `${item.email}`
                );
            }
        },
        {
            key: "referred_by",
            text: "Referred By",
            cell: (item) => {
                return (
                    `${item.referred_by}`
                );
            }
        },
        {
            key: "totalPurchase",
            text: "Token Purchased",
            cell: (item) => {
                return (
                    `${item.totalPurchase} MNT ~ $${parseFloat(activePhase?.price * item.totalPurchase).toFixed(2) }`
                );
            }
        },        
        {
            key: "created_at",
            text: "Joining Date",
            cell: (item) => {
                return (
                    item.created_at
                );
            }
        }
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

    return (

        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container dashboard">
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='card  mt-4 p-4'>
                                <div className='row'>
                                    <div className='col-lg-12 col-12 '>
                                        <h4 className='mb-4 heading'>Team List</h4>
                                        <div className='table-responsive'>
                                            <ReactDatatable
                                                config={configForWallet}
                                                records={teamReferral}
                                                columns={columnsForWallet}
                                            />
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
export default Teamrefer;
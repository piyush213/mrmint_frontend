/* eslint-disable jsx-a11y/alt-text */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie';
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import ReactDatatable from '@ashvin27/react-datatable'
import { getTotalIncomeAction, getDirectReferralAction, getReferralUsersListAction, getActivePhaseAction, getstatisticsListAction } from '../Action/user.action';

const Directrefer = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [activePhase, setActivePhase] = useState([]);
    const [getTotalIncome, setgetTotalIncome] = useState('');
    const [getTotalRefCount, setgetTotalRefCount] = useState('');
    const [referralUsersList, setReferralUsersList] = useState('');
    const [statisticsList, setstatisticsList] = useState([]);

    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
    useEffect(() => {
        getActivePhaseAPI();
        getTotalIncomeAPI();
        getDirectReferralAPI();
        getReferralUsersListAPI();
        getstatisticsListAPI();
    }, []);

    const getTotalIncomeAPI = async () => {
        let res = await getTotalIncomeAction();
        if (res.success) {
            setgetTotalIncome(res.data);
        }
    }

    const getstatisticsListAPI = async () => {
        let res = await getstatisticsListAction();
        if (res.success) {
            setstatisticsList(res.data);
        }
    }

    const getDirectReferralAPI = async () => {
        let res = await getDirectReferralAction();
        if (res.success) {
            setgetTotalRefCount(res.data);
        }
    }

    const getActivePhaseAPI = async () => {
        let res = await getActivePhaseAction();
        if (res.success) {
            setActivePhase(res.data);
        }
    }

    const getReferralUsersListAPI = async () => {
        let res = await getReferralUsersListAction();
        if (res.success) {
            setReferralUsersList(res.data);
        }
    }

    const copieBtn = async () => {
        toast.success(`Copied!`);
    }

    const columnsRef = [
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
            key: "bnb_address",
            text: "Address",
            cell: (item) => {
                return (
                    <>
                        <a style={{ color: '#5b6be0', fontWeight: "500" }} target="_blank" href={`https://bscscan.com/address/${item.bnb_address}`} rel="noreferrer"> {item.bnb_address.toString().substring(0, 5) + '...' + item.bnb_address.toString().substr(item.bnb_address.length - 5)} </a>
                    </>
                );
            }
        },
        {
            key: "created_at",
            text: "Joining Date",
            cell: (item) => {
                return (
                    `${item.created_at}`
                );
            }
        },
    ];

    const configRef = {
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

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            <Toaster />
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                    <Dashboardheader clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='container referral'>
                                <div className='mr-referral-content'>
                                    <div className='mr-referral-block'>
                                        <div className='row'>
                                            <div className='col-lg-7 col-md-12 col-sm-12 mb-1 '>
                                                <div className='card p-4'>
                                                    <div className='row'>
                                                        <div className='col-sm-12 text-center'>
                                                            <img src="images/7.png" style={{ height: "319px" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-5 col-md-12 col-sm-12 '>
                                                <div className='mr-referral-carditem mr-referralref-item buyform'>
                                                    <div className='mr-referral-inner'>
                                                        <div className='mr-contant-block'>
                                                            <h4>
                                                                Direct Refers
                                                                <span className="seprator"> : </span>
                                                                <span className="text">{getTotalRefCount ? getTotalRefCount : '0'}</span>
                                                            </h4>
                                                            <h4>
                                                                Total Income
                                                                <span className="seprator"> : </span>
                                                                <span className="text">{getTotalIncome ? parseFloat(getTotalIncome).toFixed(2) : '0.00'} MNT ~ ${getTotalIncome ? parseFloat(getTotalIncome * activePhase.price).toFixed(2) : '0.00'}</span>
                                                            </h4>
                                                            <h4>
                                                                Email
                                                                <span className="seprator"> : </span>
                                                                <span className="text text-white">{loginData?.email}</span>
                                                            </h4>
                                                            <div className="form-group">
                                                                <label className="form-label">
                                                                    Referral Link
                                                                </label>
                                                                <div className='input-group mr-custome-inputgroup'>
                                                                    <input class="form-control mr-textbox" type="text" readonly value={config.refLink + loginData?.bnb_address} />
                                                                    <span className='input-group-addon'>
                                                                        <CopyToClipboard text={config.refLink + loginData?.bnb_address}>
                                                                            <sapn className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer" }}>
                                                                                <i class="bi bi-link"></i>
                                                                            </sapn>
                                                                        </CopyToClipboard>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row '>
                                    <div className='col-lg-12 col-12 '>
                                        <div className='card  mt-2
                                             p-4'>
                                            <h4 className='mb-4'>Referral Users List</h4>

                                            <ReactDatatable
                                                config={configRef}
                                                records={referralUsersList}
                                                columns={columnsRef}
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
export default Directrefer;
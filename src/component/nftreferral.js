import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie';
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import ReactDatatable from '@ashvin27/react-datatable'

import { getTotalIncomeAction, getDirectReferralAction, getReferralUsersListAction, getActivePhaseAction } from '../Action/user.action';

const Nftreferral = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [activePhase, setActivePhase] = useState([]);
    const [getTotalIncome, setgetTotalIncome] = useState('');
    const [getTotalRefCount, setgetTotalRefCount] = useState('');
    const [referralUsersList, setReferralUsersList] = useState([]);

    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
    useEffect(() => {
        getActivePhaseAPI();
        getTotalIncomeAPI();
        getDirectReferralAPI();
        getReferralUsersListAPI();
    }, []);

    const getTotalIncomeAPI = async () => {
        let res = await getTotalIncomeAction();
        if (res.success) {
            setgetTotalIncome(res.data);
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
                    `${item.bnb_address}`
                );
            }
        },
        {
            key: "purchaseToken",
            text: "Mysterybox",
            cell: (item) => {
                return (
                    `${item.mbCount? item.mbCount : 0} ~ ${item.mbAmount? item.mbAmount : 0}`
                );
            }
        },
        {
            key: "created_at",
            text: "Joining Date",
            cell: (item) => {
                return (
                    `${item.joiningDate}`
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
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper pt-4">
                            <div className='container referral'>
                                <div className='mr-referral-content'>
                                    <div className='mr-referral-block'>
                                        <div className='row'>
                                            <div className='col-lg-7 col-md-12 col-sm-12'>
                                                <div className='mr-referral-carditem mr-referral-item buyform mb-4'>
                                                    <div className='mr-contant-block'>
                                                        <h4>Referral System</h4>

                                                        <ul className='mr-referralsteps'>
                                                            <li class="mr-referralsteps-item mr-referral-item1">
                                                                <div class="mr-stepsinfo">
                                                                    <div className='mr-inner-stepinfo'>
                                                                        <div class="mr-iconbox">
                                                                            <i class="bi bi-person-plus"></i>
                                                                        </div>
                                                                        <h4>Refer your Friends</h4>
                                                                    </div>
                                                                    <span className='mr-step-counter'>
                                                                        <span className='mr-step-counter-inner'>1</span>
                                                                    </span>
                                                                </div>
                                                            </li>

                                                            <li class="mr-referralsteps-item mr-referral-item2">
                                                                <div class="mr-stepsinfo">
                                                                    <div className='mr-inner-stepinfo'>
                                                                        <div class="mr-iconbox">
                                                                            <i class="bi bi-person-bounding-box"></i>
                                                                        </div>
                                                                        <h4>They Start Processing</h4>
                                                                    </div>
                                                                    <span className='mr-step-counter'>
                                                                        <span className='mr-step-counter-inner'>2</span>
                                                                    </span>
                                                                </div>
                                                            </li>

                                                            <li class="mr-referralsteps-item mr-referral-item3">
                                                                <div class="mr-stepsinfo">
                                                                    <div className='mr-inner-stepinfo'>
                                                                        <div class="mr-iconbox">
                                                                            <i class="bi bi-piggy-bank"></i>
                                                                        </div>
                                                                        <h4>You start Earning</h4>
                                                                    </div>
                                                                    <span className='mr-step-counter'>
                                                                        <span className='mr-step-counter-inner'>3</span>
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <p>
                                                            Welcome to the Referral System. By becoming a referrer and inviting friends, you will receive BNB worth 5% of their deposit amount each time they make a deposit.
                                                        </p>
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
                                                                <span className="text">{referralUsersList.length > 0 ? referralUsersList[0].nftReferralCount : '0'}</span>
                                                            </h4>
                                                            <h4>
                                                                Total Income
                                                                <span className="seprator"> : </span>
                                                                <span className="text">${referralUsersList.length > 0 ? parseFloat(referralUsersList[0].nftReferralAmount).toFixed(2) : '0.00'}</span>
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
                                                                    <input class="form-control mr-textbox" type="text" readonly value={config.refLinkForNFT + loginData?.bnb_address} />
                                                                    <span className='input-group-addon'>
                                                                        <CopyToClipboard text={config.refLinkForNFT + loginData?.bnb_address}>
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
export default Nftreferral;
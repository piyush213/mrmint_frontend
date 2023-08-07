/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import ReactDatatable from '@ashvin27/react-datatable'
import { confirmAlert } from 'react-confirm-alert';
import toast, { Toaster } from 'react-hot-toast';
import { ReactDialogBox } from 'react-js-dialog-box'
import { getRewardHistoryAction, miningWalletTransferAction, getMiningTransferHistoryAction, getRigDetailsOfUserAction } from '../Action/user.action';

const MintingReward = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [rewardList, setRewardList] = useState([]);
    const [transferHistory, settransferHistory] = useState([]);
    const [rigHistory, setrigHistory] = useState([]);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [tabActive, settabActive] = useState(1);

    useEffect(() => {
        getRewardHistoryAPI();
        getTransferHistoryAPI();
        getrigHistoryAPI();
    }, []);


    const changeTab = (type) => {
        settabActive(type)
    }

    const getRewardHistoryAPI = async () => {
        let res = await getRewardHistoryAction();
        if (res.success) {
            setRewardList(res.data);
        }
    }

    const getTransferHistoryAPI = async () => {
        let res = await getMiningTransferHistoryAction();
        if (res.success) {
            settransferHistory(res.data);
        }
    }

    const getrigHistoryAPI = async () => {
        let res = await getRigDetailsOfUserAction();
        if (res.success) {
            setrigHistory(res.data);
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const columnsForReward = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "name",
            text: "Minting Card",
            cell: (item) => {
                return (
                    `${item.name}`
                );
            }
        },
        {
            key: "category",
            text: "Category",
            cell: (item) => {
                return (
                    `${item.category}`
                );
            }
        },
        {
            key: "amount",
            text: "Amount",
            cell: (item) => {
                return (
                    `${item.amount} MNT`
                );
            }
        },
        {
            key: "date",
            text: "Date",
            cell: (item) => {
                return (
                    `${item.date}`
                );
            }
        },
    ];

    const configForReward = {
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

    const columnsForTransferHis = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "amount",
            text: "Amount",
            cell: (item) => {
                return (
                    `${item.amount} MNT`
                );
            }
        },
        {
            key: "from",
            text: "From",
            cell: (item) => {
                return (
                    `Mining Wallet`
                );
            }
        },
        {
            key: "from",
            text: "To",
            cell: (item) => {
                return (
                    `Main Wallet`
                );
            }
        },
        {
            key: "date",
            text: "Date",
            cell: (item) => {
                return (
                    `${item.datetime}`
                );
            }
        },
    ];

    const configForTransferHis = {
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

    const columnsForRigHis = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },

        {
            key: "date",
            text: "Date",
            cell: (item) => {
                return (
                    `${item.datetime.slice()}`
                );
            }
        },

        {
            key: "name",
            text: "Generation",
            cell: (item) => {
                return (
                    `${item.name}`
                );
            }
        },

        {
            key: "rig_hash",
            text: "Hash",
            cell: (item) => {
                return (
                    <div class="">
                        <span>{item.rig_hash}</span>
                    </div>

                );
            }
        },

        {
            key: "rig_hash_power",
            text: "Hash Power",
            cell: (item) => {
                return (
                    `${item.rig_hash_power}`
                );
            }
        },

        {
            key: "amount",
            text: "Amount",
            cell: (item) => {
                return (
                    `${item.amount} MNT`
                );
            }
        },

       

        
       
    ];

    const configForRigHis = {
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



    const transferWallet = async (miningReward) => {
        if (parseFloat(miningReward) <= 0) {
            toast.error("You don't have sufficient balance!");
            return;
        }
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure want to transfer MNTs from mining wallet to main wallet?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setDialogOpen(true);
                        let res = await miningWalletTransferAction();
                        if (res.success) {
                            getRewardHistoryAPI();
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

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Toaster />
                <Dashboardsidebarnft />
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
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll ">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className='col-md-12 pt-4'>
                                    <div className=' p-3'>
                                        <span className='mb-2'> Total Reward</span>
                                        <div className='form-body'>
                                            <div className='boxcolor banner_blue mb-4 mt-2 '>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <h3>{rewardList.length > 0 ? parseInt(rewardList[0].miningReward) : '0'} MNT</h3>
                                                    </div>
                                                    <div className='col-lg-2'></div>
                                                    <div className='col-lg-4'>
                                                        <a href="javascript:void(0)" onClick={() => transferWallet(rewardList.length > 0 ? parseInt(rewardList[0].miningReward) : 0)} class="sc-CtfFt bxUreM" id="token-buy-button" ><i className='bi bi-wallet'></i>&nbsp;&nbsp;Transfer to main wallet</a>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col-md-12'>

                                                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3">
                                                        <div className='row'>
                                                            <div className='col-lg-12 text-left mb-2'>
                                                                <div className="custom-tabs-container">
                                                                    <ul className="nav nav-tabs m-0" id="customTab" role="tablist">
                                                                        <li className="nav-item" role="presentation">
                                                                            <a className={tabActive == 1 ? "nav-link active" : "nav-link"} id="tab-two" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="two" aria-selected="false" onClick={() => changeTab(1)}>Reward History</a>
                                                                        </li>
                                                                        <li className="nav-item" role="presentation">
                                                                            <a className={tabActive == 2 ? "nav-link active" : "nav-link"} id="tab-one" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="one" aria-selected="true" onClick={() => changeTab(2)}>Transfer History</a>
                                                                        </li>
                                                                        <li className="nav-item" role="presentation">
                                                                            <a className={tabActive == 3 ? "nav-link active" : "nav-link"} id="tab-one" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="one" aria-selected="true" onClick={() => changeTab(3)}>Rig History</a>
                                                                        </li>
                                                                    </ul>

                                                                    <div className="tab-content" id="customTabContent">
                                                                        {tabActive == 1 ?
                                                                            <ReactDatatable
                                                                                config={configForReward}
                                                                                records={rewardList}
                                                                                columns={columnsForReward}
                                                                            />
                                                                            : ""}

                                                                    </div>

                                                                    {tabActive == 2 ?
                                                                        <ReactDatatable
                                                                            config={configForTransferHis}
                                                                            records={transferHistory}
                                                                            columns={columnsForTransferHis}
                                                                        />
                                                                        : ""}


                                                                    {tabActive == 3 ?
                                                                        <ReactDatatable
                                                                            config={configForRigHis}
                                                                            records={rigHistory}
                                                                            columns={columnsForRigHis}
                                                                        />
                                                                        : ""}
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
            </div>
        </>
    )
}
export default MintingReward;
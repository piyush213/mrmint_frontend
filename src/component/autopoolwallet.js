/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import ReactDatatable from '@ashvin27/react-datatable'
import toast, { Toaster } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import { ReactDialogBox } from 'react-js-dialog-box'
import { getnftNodesListAction, getTransferHistoryAction, autopoolTransferAction, getRechargeHistoryAction, getPoolEarningHistoryAction, getLevelAction } from '../Action/user.action';
import { Link } from 'react-router-dom';

const AutopoolWallet = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [walletBalance, setWalletBalance] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [tokenTransferHistory, settokenTransferHistory] = useState([]);
    const [levelList, setlevelList] = useState([]);
    const [tabActive, settabActive] = useState(1);
    const [rechargeHistory, setrechargeHistory] = useState([]);
    const [poolEarning, setpoolEarning] = useState([]);
    const [isViewLevel, setisViewLevel] = useState(0);

    useEffect(() => {
        getlevelListAPI();

        getTransferHistoryAPI();
        getRechargeHistoryAPI();
        getPoolEarningHistoryAPI();
    }, []);

    const closeModel = async () => {
        setisViewLevel(0);
    }

    const viewLevel = async (rechargeId) => {
        setisViewLevel(1);
        let res = await getLevelAction({'recharge_id' : rechargeId});
        if (res.success) {
            setlevelList(res.data);
        }        
    }

    const getTransferHistoryAPI = async () => {
        let res = await getTransferHistoryAction();
        if (res.success) {
            settokenTransferHistory(res.data);
            setWalletBalance(res.autopoolDetail[0]);
        } else {
            setWalletBalance(res.autopoolDetail[0]);
        }
    }

    const getRechargeHistoryAPI = async () => {
        let res = await getRechargeHistoryAction();
        if (res.success) {
            setrechargeHistory(res.data);
        }
    }

    const getPoolEarningHistoryAPI = async () => {
        let res = await getPoolEarningHistoryAction();
        if (res.success) {
            setpoolEarning(res.data);
        }
    }

    const getlevelListAPI = async () => {
        let res = await getnftNodesListAction();
        if (res.success) {
            setlevelList(res.data);
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const changeTab = (type) => {
        settabActive(type)
    }

    const transferWallet = async () => {
        if (parseFloat(walletBalance?.withdrawable) <= 0) {
            toast.error("You don't have sufficient balance!");
            return;
        }
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure want to transfer MNTs from autopool wallet to main wallet?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setDialogOpen(true);
                        let res = await autopoolTransferAction();
                        if (res.success) {
                            toast.success(res.msg);
                            setDialogOpen(false);
                            getTransferHistoryAPI();
                        } else {
                            setDialogOpen(false);
                            toast.error(res.msg);
                            getTransferHistoryAPI();
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const columnsForTransfer = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => `${index + 1}`
        },
        {
            key: "token",
            text: "Token",
            cell: (item) => {
                return (
                    <>
                        {item.amount ? item.amount : 0} MNT
                    </>
                );
            }
        },
        {
            key: "Type",
            text: "From",
            cell: (item) => {
                return (
                    <>
                        Autopool Wallet
                    </>
                );
            }
        },
        {
            key: "Type",
            text: "To",
            cell: (item) => {
                return (
                    <>
                        Main Wallet
                    </>
                );
            }
        },
        {
            key: "created_at",
            text: "Date",
            cell: (item) => {
                return (
                    item.datetime
                );
            }
        }
    ];

    const configForTransfer = {
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

    const columnsLevel = [
        {
            key: "sn",
            text: "Level",
            cell: (row, index) => `${index + 1}`
        },
        {
            key: "total_member",
            text: "Total Node Members",
            cell: (item) => {
                return (
                    <>
                        ${item.totalBusiness ? item.totalBusiness : 0}
                    </>
                );
            }
        },
        {
            key: "available_member",
            text: "Feel nodes",
            cell: (item) => {
                return (
                    <>
                        Transfer from autopool wallet to mining wallet
                    </>
                );
            }
        },
        {
            key: "created_at",
            text: "Date",
            cell: (item) => {
                return (
                    `${item.created_at}`
                );
            }
        },
    ];

    const configLevel = {
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

    const columnsRecharge = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => `${index + 1}`
        },
        {
            key: "plan_name",
            text: "Plan name",
            cell: (item) => {
                return (
                    <>
                        {item.plan_name}
                    </>
                );
            }
        },
        {
            key: "amount",
            text: "Amount",
            cell: (item) => {
                return (
                    <>
                        {item.amount ? item.amount : '0.00'} MNT
                    </>
                );
            }
        },
        {
            key: "nft_count",
            text: "Revealed NFTs",
            cell: (item) => {
                return (
                    <>
                        {item.nft_count}
                    </>
                );
            }
        },
        {
            key: "payment_type",
            text: "Payment Type",
            cell: (item) => {
                return (
                    <>
                        {item.payment_type}
                    </>
                );
            }
        },
        {
            key: "created_at",
            text: "Date",
            cell: (item) => {
                return (
                    `${item.datetime}`
                );
            }
        },
        {
            key: "viewdetails",
            text: "Action",
            cell: (item) => {
                return (
                    <>
                        <Link to={`${config.baseUrl}mintingcard/` + item.mystery_box_wallet_id} >
                            <button className='btn-sm btn-primary'>View Details</button>
                        </Link> &nbsp;

                        <button onClick={() => viewLevel(item.recharge_id)} className='btn-sm btn-primary'>View Level</button>
                    </>
                );
            }
        },
    ];

    const configRecharge = {
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

    const columnsForPoolHistory = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => `${index + 1}`
        },
        {
            key: "amount",
            text: "Amount",
            cell: (item) => {
                return (
                    <>
                        {item.amount ? parseFloat(item.amount).toFixed(2) : '0.00'} MNT
                    </>
                );
            }
        },
        {
            key: "referral_percent",
            text: "Percentage",
            cell: (item) => {
                return (
                    <>
                        {item.referral_percent}%
                    </>
                );
            }
        },
        {
            key: "referral_level",
            text: "Level",
            cell: (item) => {
                return (
                    <>
                        {item.referral_level}
                    </>
                );
            }
        },
        {
            key: "created_at",
            text: "Date",
            cell: (item) => {
                return (
                    `${item.date}`
                );
            }
        }
    ];

    const configForPoolHistory = {
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

    const columnsForLevel = [
        {
            key: "level",
            text: "Level",
            cell: (item) => {
                return (
                    <>
                        {item.level}
                    </>
                );
            }
        },        
        {
            key: "nodeCount",
            text: "Total Node",
            cell: (item) => {
                return (
                    `${item.nodeCount}`
                );
            }
        },        
        {
            key: "node",
            text: "Node Filled",
            cell: (item) => {
                return (
                    <>
                        {item.node}
                    </>
                );
            }
        },
        {
            key: "amount",
            text: "Total Reward",
            cell: (item) => {
                return (
                    <>
                        {item.Reward ? parseFloat(item.Reward).toFixed(2) : '0.00'} MNT
                    </>
                );
            }
        }        
    ];

    const configForLevel = {
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
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll ">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className='col-md-12 pt-4'>
                                    <div className=' p-3'>
                                        <span className='mb-2'>Autopool Wallet Available Balance</span>
                                        <div className='form-body'>
                                            <div className='boxcolor banner_blue mb-4 mt-2 '>
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        <h3>{walletBalance ? parseFloat(walletBalance?.withdrawable).toFixed(2) : '0.00'} MNT</h3>
                                                    </div>
                                                    <div className='col-lg-2'>

                                                    </div>
                                                    <div className='col-lg-4'>
                                                        <a href="javascript:void(0)" onClick={transferWallet} class="sc-CtfFt bxUreM" id="token-buy-button" ><i className='bi bi-wallet'></i>&nbsp;&nbsp;Transfer to main wallet</a>
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
                                                                        <td class="text-left"><span className='autopoolTxt'>Total Earnings </span></td>
                                                                        <td class="text-right"><span className='autopoolTxt'>{walletBalance ? parseFloat(walletBalance.totalEarning).toFixed(2) : '0.00'} MNT  </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <div className='card p-3 nftwalletbox'>
                                                            <table class="text-white" width="100%">
                                                                <tbody>
                                                                    <tr>

                                                                        <td class="text-left"><span className='autopoolTxt'>Wallet Balance</span></td>
                                                                        <td class="text-right"><span className='autopoolTxt'>{walletBalance ? parseFloat(walletBalance.wallet_balance).toFixed(2) : '0.00'} MNT  </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3">
                                                        <div className='row'>
                                                            <div className='col-lg-12 text-left mb-2'>
                                                                <div className="custom-tabs-container">
                                                                    <ul className="nav nav-tabs m-0" id="customTab" role="tablist">
                                                                        <li className="nav-item" role="presentation">
                                                                            <a className={tabActive == 1 ? "nav-link active" : "nav-link"} id="tab-two" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="two" aria-selected="false" onClick={() => changeTab(1)}>Recharge History</a>
                                                                        </li>
                                                                        {/* <li className="nav-item" role="presentation">
                                                                            <a className={tabActive == 2 ? "nav-link active" : "nav-link"} id="tab-one" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="one" aria-selected="true" onClick={() => changeTab(2)}>Level</a>
                                                                        </li> */}
                                                                        <li className="nav-item" role="presentation">
                                                                            <a className={tabActive == 3 ? "nav-link active" : "nav-link"} id="tab-two" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="two" aria-selected="false" onClick={() => changeTab(3)}>Transfer History</a>
                                                                        </li>

                                                                        <li className="nav-item" role="presentation">
                                                                            <a className={tabActive == 4 ? "nav-link active" : "nav-link"} id="tab-two" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="two" aria-selected="false" onClick={() => changeTab(4)}>Pool Earning</a>
                                                                        </li>

                                                                    </ul>

                                                                    <div className="tab-content" id="customTabContent">
                                                                        {tabActive == 1 ?
                                                                            <ReactDatatable
                                                                                config={configRecharge}
                                                                                records={rechargeHistory}
                                                                                columns={columnsRecharge}
                                                                            />
                                                                            : ""}

                                                                    </div>

                                                                    {/* {tabActive == 2 ?
                                                                        <ReactDatatable
                                                                            config={configLevel}
                                                                            records={levelList}
                                                                            columns={columnsLevel}
                                                                        />
                                                                        : ""} */}


                                                                    {tabActive == 3 ?
                                                                        <ReactDatatable
                                                                            config={configForTransfer}
                                                                            records={tokenTransferHistory}
                                                                            columns={columnsForTransfer}
                                                                        />
                                                                        : ""}

                                                                    {tabActive == 4 ?
                                                                        <ReactDatatable
                                                                            config={configForPoolHistory}
                                                                            records={poolEarning}
                                                                            columns={columnsForPoolHistory}
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

            <div className={isViewLevel === 0 ? "modal fade" : "modal fade show"} id="putOnSale" style={{ display: isViewLevel === 0 ? 'none' : 'block' }} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
                <div className="modal-dialog" role="document">

                    <div className="modal-content" style={{ background: '#000', border: '1px solid'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: '#fff' }}> View Level </h5>
                            <a type="button" className="close" data-dismiss="modal" style={{
                                fontSize: '26px'
                            }} aria-label="Close" onClick={closeModel} >
                                <span aria-hidden="true">&times;</span>
                            </a>
                        </div>

                        <div className="modal-body autopoolLevel">
                            <ReactDatatable
                                config={configForLevel}
                                records={levelList} 
                                columns={columnsForLevel}
                            />
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default AutopoolWallet;
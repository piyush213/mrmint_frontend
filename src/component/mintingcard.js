/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react'
import { Player } from 'video-react';


import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import { getMintingCardDetailsAction, nftMintAction, getMintedNFTsListAction,  getMintingCardRechargeHistoryAction } from '../Action/user.action';
import config from '../coreFIles/config';
import { Link, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import toast, { Toaster } from 'react-hot-toast';
import ReactDatatable from '@ashvin27/react-datatable';
import Countdown from 'react-countdown';
import Cookies from 'js-cookie';
import Confetti from 'react-confetti';
import {  Modal } from 'react-bootstrap';




const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
const Mintingcard = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [mysteryBox, setMysteryBox] = useState('');
    const [mintedNfts, setMintedNfts] = useState('');
    const [isModel, setisModel] = useState(0);
    const [isModelForImg, setisModelForImg] = useState(0);
    const [cardImage, setcardImage] = useState(0);
    const [tabActive, settabActive] = useState(1);
    const [expirationtime, setexpirationtime] = useState(0);
    const [rechargeHistory, setrechargeHistory] = useState([]);
    const [minted, setminted] = useState("");
    const { id } = useParams();
    const [isRunning, setIsRunning] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (!id || id == undefined || id == 'undefined') {
            window.location.href = `${config.baseUrl}mymysterybox`
        }
        getMintingCardDetailsAPI();
        getMintedNFTsListAPI();
        getRechargeHistoryAPI();
    }, []);




    const getMintingCardDetailsAPI = async () => {
        let res = await getMintingCardDetailsAction({ 'box_id': id });
        if (res.success) {
            setMysteryBox(res.data)
            setexpirationtime(parseInt(res.time?.remainingSeconds) * parseInt(1000))
            setminted(res.data.minted)
            let expTime = res.time?.remainingSeconds;
            setInterval(() => {
                expTime = parseInt(expTime) - 1;
                if (expTime == 0) {
                    setexpirationtime(0);
                }
            }, 1000);
        }

    }

    const getMintedNFTsListAPI = async () => {
        let res = await getMintedNFTsListAction({ 'mystery_box_wallet_id': id, "user_id": loginData?.id });
        if (res.success) {
            setMintedNfts(res.data)
        }
    }

    const getRechargeHistoryAPI = async () => {
        let res = await getMintingCardRechargeHistoryAction({ 'mystery_box_wallet_id': id });
        if (res.success) {
            setrechargeHistory(res.data)
        }
    }


    const openImageModel = async (image) => {
            setisModelForImg(1);
            setcardImage(image);
    }

    const mintNFT = async () => {
        if (minted == 0) {


        }
        confirmAlert({
            title: 'Confirm to submit',

            message: 'Are you sure want to mint?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {


                        let res = await nftMintAction(
                            {
                                "id": id,
                                "mintingCardId": mysteryBox?.mintingCardId,
                                "user_id": loginData?.id
                            }
                        );
                        if (res.success) {

                            toast.success(res.msg);
                            setIsRunning(true)
                            getMintingCardDetailsAPI();
                            getMintedNFTsListAPI();
                            setTimeout(() => {
                                window.location.reload();
                            }, 4000);


                        } else {
                            toast.error(res.msg);

                        }
                    }
                },
                {
                    label: 'No',
                }

            ]

        });
        setIsRunning(false)

    }

    const columnsForList = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "image",
            text: "NFTs",
            cell: (item) => {
                return (
                    <>
                        <video width="100%" autoPlay muted playsInline loop onClick={() => openImageModel(item.image)}>
                            <source src={`${config.ipfsurl + item.image}`} type="video/mp4" />
                            <source src={`${config.ipfsurl + item.image}`} type="video/ogg" />
                            Your browser does not support the video tag.
                        </video>
                    </>
                )
            }
        },
        {
            key: "nftname",
            text: "Name",
            cell: (item) => {
                return (
                    item.nftname
                )
            }
        },
        {
            key: "hash_power",
            text: "Hash power",
            cell: (item) => {
                return (
                    item.hash_power
                )
            }
        },
        {
            key: "category_name",
            text: "NFT Category",
            cell: (item) => {
                return (
                    item.category_name
                )
            }
        },
        {
            key: "nft_type",
            text: "Type",
            cell: (item) => {
                return (
                    item.nft_type
                )
            }
        },
        {
            key: "datetime",
            text: "Date",
            cell: (item) => {
                return (
                    item.datetime
                )
            }
        },
    ];

    const configForList = {
        page_size: 5,
        length_menu: [5, 10, 20, 50],
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
        }
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

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const closeModel = async () => {
        setisModel(0);
        setisModelForImg(0)
    }

    const changeTab = (type) => {
        settabActive(type)
    }


    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Toaster />
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">

                        <div className="content-wrapper container mintingcard">
                            <div className="row">
                                <div className='col-lg-12 '>
                                    <h4 class="mt-4">Minting card </h4>
                                    <Confetti
                                        width={500}
                                        height={500}
                                        run={isRunning}
                                    />
                                </div>

                                <div className='col-lg-4 mt-3'>
                                    {mysteryBox ?
                                        <video width="100%" muted autoPlay loop playsInline className='btn-rounded '>
                                            <source src={`${config.ipfsurl + mysteryBox.cardImage}`} type="video/mp4" />
                                            <source src={`${config.ipfsurl + mysteryBox.cardImage}`} type="video/ogg" />
                                            Your browser does not support the video tag.
                                        </video>
                                        :
                                        ""}

                                </div>
                                <div className='col-lg-8 mt-3'>
                                    <h4 className='mb-3'>{mysteryBox ? mysteryBox.cardName : ''}</h4>
                                    <div className='row'>
                                        <div className='col-lg-4 col-6'>
                                            <div class="social-tile">

                                                <div class="social-details">
                                                    <h1>{mysteryBox ? mysteryBox.cardCategory : '-'}</h1>
                                                    <h5>Category</h5>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-lg-4 col-6'>
                                            <div class="social-tile">

                                                <div class="social-details">
                                                    <h1>{mysteryBox ? mysteryBox.quantity : '0'}</h1>
                                                    <h5>Number Of NFTs</h5>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-lg-4 col-6'>
                                            <div class="social-tile">

                                                <div class="social-details">
                                                    <h1>{mysteryBox ? mysteryBox.minted : '0'}</h1>
                                                    <h5>Minted NFTs</h5>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-lg-4 col-6'>
                                            <div class="social-tile">

                                                <div class="social-details">
                                                    <h1>{mysteryBox ? parseInt(mysteryBox.quantity) - parseInt(mysteryBox.minted) : '0'}</h1>
                                                    <h5>Remaining NFTs</h5>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-lg-4 col-6'>
                                            <div class="social-tile">

                                                <div class="social-details">
                                                    <h1>{mysteryBox ? mysteryBox.hash_power : '0'}</h1>
                                                    <h5>Total Hash Power</h5>

                                                </div>
                                            </div>

                                        </div>
                                        <div className='col-lg-4 col-6'>
                                            <div class="social-tile">

                                                <div class="social-details">
                                                    <h1>{mysteryBox ? mysteryBox.reward : '0'} MNT</h1>
                                                    <h5>Mining Reward</h5>

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <button disabled={expirationtime && mysteryBox.minted > 0 ? 'disabled' : '' || (parseInt(mysteryBox.quantity) - parseInt(mysteryBox.minted)) == 0 ? 'disabled' : '' || (mysteryBox.auto_minting) == 1 ? 'disabled' : ''} onClick={mintNFT} className='btn btn-primary mint mr-1 col-lg-3'>Mint</button>

                                    <Link to={`${config.baseUrl}rechargePlans/` + id} >
                                        <button className='btn btn-primary mint  col-lg-3'>Recharge</button>
                                    </Link>


                                    <br />
                                    <button className='col-lg-6'></button>
                                    {mysteryBox.auto_minting == 1 ?
                                        <>
                                            <div className='col-lg-12   mt-1 mintingCounter'>
                                                Auto-minting : ON
                                            </div>
                                        </>

                                        : expirationtime && mysteryBox.minted > 0 ? (parseInt(mysteryBox.quantity) - parseInt(mysteryBox.minted)) > 0 ?
                                            <>
                                                <div className='col-lg-12   mt-1 mintingCounter'>
                                                    Next Minting : <Countdown date={Date.now() + expirationtime} />
                                                </div>
                                            </>

                                            : <div className='col-lg-12   mt-1 mintingCounter'>Nothing to Mint</div> : ""}
                                </div>
                            </div>

                            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3">
                                <div className='row'>
                                    <div className='col-lg-12 text-left mb-2'>
                                        <div className="custom-tabs-container">
                                            <ul className="nav nav-tabs m-0" id="customTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <a className={tabActive == 1 ? "nav-link active" : "nav-link"} id="tab-two" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="two" aria-selected="false" onClick={() => changeTab(1)}>NFTs</a>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <a className={tabActive == 2 ? "nav-link active" : "nav-link"} id="tab-one" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="one" aria-selected="true" onClick={() => changeTab(2)}>Recharge History</a>
                                                </li>

                                            </ul>

                                            <div className="tab-content" id="customTabContent">
                                                {tabActive == 1 ?
                                                    <ReactDatatable
                                                        config={configForList}
                                                        records={mintedNfts}
                                                        columns={columnsForList}
                                                    />
                                                    : ""}

                                            </div>

                                            <div className="tab-content" id="customTabContent">
                                                {tabActive == 2 ?
                                                    <ReactDatatable
                                                        config={configRecharge}
                                                        records={rechargeHistory}
                                                        columns={columnsRecharge}
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

            <div className={isModelForImg === 0 ? "modal fade" : "modal fade show"} id="putOnSale" style={{ display: isModelForImg === 0 ? 'none' : 'block' }} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
                <div className="modal-dialog" role="document">

                    <div className="modal-content" style={{ background: '#000', border: '1px solid' }}>
                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: '#fff' }}> Image </h5>
                            <a type="button" className="close" data-dismiss="modal" style={{
                                fontSize: '26px'
                            }} aria-label="Close" onClick={closeModel} >
                                <span aria-hidden="true">&times;</span>
                            </a>
                        </div>

                        <div className="modal-body">
                            <Player loop={true} autoPlay={true}  className="marketNftcss" src={`${config.ipfsurl}${cardImage}`} />
                        </div>
                    </div>

                </div>
            </div>
            <Modal show={show} onHide={handleClose} className='connact_wallet' centered>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body class="p-4 pb-5 -mt-30 ">
                    <div className='text-center'>

                        <div className=' mb-3'>Do you want to put your NFT on Sale ?</div>
                        <a href="#" className='btn btn-sm btn-primary'>Confirm</a>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )

}
export default Mintingcard;
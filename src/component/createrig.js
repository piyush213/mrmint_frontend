/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';

import {  displayNftUsedinRigAction,  showRigsForUserAction, deleteRigMasterAction, displayNftUsedinRig2Action, displayNftUsedinRig3Action } from '../Action/user.action';
import config from '../coreFIles/config';
import {  Row, Col, Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import CopyToClipboard from 'react-copy-to-clipboard';

const CreateRig = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [rigBox, setRigBox] = useState([]);
    const [rigBoxX, setRigBoxX] = useState([]);
    const [rigBoxY, setRigBoxY] = useState([]);
    const [rigBoxZ, setRigBoxZ] = useState([]);

    const [isProcess, setisProcess] = useState(1);
    const [EmptyRig, setEmptyRig] = useState(false)
    const [showEmptyRig, setShowEmptyRig] = useState(false)

    const [showData, setShowData] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async (data) => {
        // setTimeout( async () => {
        setShow(true);
        let res = await displayNftUsedinRigAction(data);
        setShowData(res.data)
        // }, 1000);
    }
    useEffect(() => {
        getRigHistoryForUsersAPI();
        showRigsForUserAPI();
    }, []);

    const getRigHistoryForUsersAPI = async () => {
        let res = await showRigsForUserAction();
        if (res.success) {
            setRigBox(res.data)
        } else {
            setisProcess(0);
        }
    }

    const showRigsForUserAPI = async () => {
        let res = await showRigsForUserAction();
        if (res.success) {
            setEmptyRig(false)
            setRigBoxX(res.data.filter(item => item.nft_category_id == 1))
            setRigBoxY(res.data.filter(item => item.nft_category_id == 2))
            setRigBoxZ((res.data.filter(item => item.nft_category_id == 3)))
        } else if (res.success === false) {
            setEmptyRig(true)
            setShowEmptyRig(res.msg);
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }


    const copieBtn = async () => {
        toast.success(`Copied!!`);
    }
    const deleteRig = async (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Dis-Assemble this Rig!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Dis-Assemble it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await deleteRigMasterAction({ rig_master_id: data });
                if (res.success) {
                    Swal.fire("Dis-Assembled!", res.msg, "success");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    Swal.fire("Failed to Dis-Assemble Rig!", res.msg, "error");
                }
            }
        });
    }

    return (
        <>
            <div className={`page-wrapper${toggleSet === 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">


                        <div className="content-wrapper container mymysterybox">

                            <div className='Nftlist'>
                                <Row className='mt-4'>
                                    <Col lg={12} className='mt-2  pl-2 pr-2'>
                                        <Row className='align-items-center '>
                                            <Col lg={8} className='mt-2'>
                                                <h4 className='mb-0'> {EmptyRig == true ? "Create Rig" : "My Rig"}</h4>
                                                {/* <h4 className='mb-0'>Create a Rig</h4> */}
                                            </Col>
                                            <Col lg={4} className='mt-2 mb-2 text-right'>
                                                {EmptyRig == true ? "" : <button className='btn btn-rounded btn-primary' onClick={() => window.location.href = `${config.baseUrl}rig`}>Assemble Rig</button>
                                                }
                                            </Col>
                                            <Col lg={12}>
                                                <hr className='m-0' />
                                            </Col>

                                        </Row>
                                    </Col>
                                    <Col lg={12} className='mt-2 pl-2 pr-2'>
                                        <Row>
                                            {EmptyRig == true ? <p className='mt-5 d-flex justify-content-center'><button className='btn btn-rounded btn-primary' onClick={() => window.location.href = `${config.baseUrl}rig`}>Assemble Rig</button></p> : ""}
                                            {
                                                rigBoxX.length > 0 ? <>
                                                    {
                                                        rigBoxX.map((item) =>
                                                        (
                                                            <Col lg={4}>
                                                                <div class="cardlist2" >
                                                                    <a onClick={() => handleShow(1)}>
                                                                        <div className='text-center cardimg'>
                                                                            <video width="100%" autoPlay muted playsInline loop >
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/mp4" />
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/ogg" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        </div>
                                                                    </a>
                                                                    <div class="cardlistbox">
                                                                        <div class="card-body pb-0">
                                                                            <div class="row  justify-content-center">
                                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center ">
                                                                                    <h4 class="card-title">{item.name}</h4>
                                                                                </div>
                                                                            </div>
                                                                            <div className='row pt-3 pb-1' style={{ background: "" }}>

                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-5 mb-2 ">
                                                                                    <small className='text-uppercase'>HASH</small>
                                                                                </div>
                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-7 mb-2 text-right">
                                                                                    <small>{item.rig_hash.slice(0, 3) + "....." + item.rig_hash.slice(-3)}&nbsp;
                                                                                        <CopyToClipboard text={item.rig_hash}>
                                                                                            <span title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: 'rgb(157 81 255)' }}>
                                                                                                <i class="fa fa-clone "></i></span></CopyToClipboard>
                                                                                    </small>
                                                                                </div>

                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-5  mb-2">
                                                                                    <small className='text-uppercase'>Date</small>
                                                                                </div>
                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-7 text-right mb-2">
                                                                                    <small>{item.datetime.slice(0, 10)}</small>
                                                                                </div>
                                                                            </div>
                                                                            <button className='btn btn-outline-secondary btn-rounded w-100 mt-1 mb-3' onClick={() => deleteRig(item.rig_master_id)}>Dis-Assemble Rig</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </> : ""
                                            }

                                            {
                                                rigBoxY.length > 0 ? <>
                                                    {
                                                        rigBoxY.map((item) =>
                                                        (
                                                            <Col lg={4}>
                                                                <div class="cardlist2" >
                                                                    <a onClick={() => handleShow(2)}>
                                                                        <div className='text-center cardimg'>
                                                                            <video width="100%" autoPlay muted playsInline loop >
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/mp4" />
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/mp4" />
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/mp4" />
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/ogg" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        </div>
                                                                    </a>
                                                                    <div class="cardlistbox">
                                                                        <div class="card-body pb-0">
                                                                            <div class="row  justify-content-center">
                                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center ">
                                                                                    <h4 class="card-title">{item.name}</h4>
                                                                                </div>
                                                                            </div>
                                                                            <div className='row pt-3 pb-1' style={{ background: "" }}>

                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-5 mb-2 ">
                                                                                    <small className='text-uppercase'>HASH</small>
                                                                                </div>
                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-7 mb-2 text-right">
                                                                                    <small>{item.rig_hash.slice(0, 3) + "....." + item.rig_hash.slice(-3)}&nbsp;
                                                                                        <CopyToClipboard text={item.rig_hash}>
                                                                                            <span title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: 'rgb(157 81 255)' }}>
                                                                                                <i class="fa fa-clone "></i></span></CopyToClipboard>
                                                                                    </small>
                                                                                </div>

                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-5  mb-2">
                                                                                    <small className='text-uppercase'>Date</small>
                                                                                </div>
                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-7 text-right mb-2">
                                                                                    <small>{item.datetime.slice(0, 10)}</small>
                                                                                </div>
                                                                            </div>
                                                                            <button className='btn btn-outline-secondary btn-rounded w-100 mt-1 mb-3' onClick={() => deleteRig(item.rig_master_id)}>Dis-Assemble Rig</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </> : ""
                                            }

                                            {
                                                rigBoxZ.length > 0 ? <>
                                                    {
                                                        rigBoxZ.map((item) =>
                                                        (
                                                            <Col lg={4}>
                                                                <div class="cardlist2" >
                                                                    <a onClick={() => handleShow(3)}>
                                                                        <div className='text-center cardimg'>
                                                                            <video width="100%" autoPlay muted playsInline loop >
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/mp4" />
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/mp4" />
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/mp4" />
                                                                                <source src={`${config.ipfsurl +
                                                                                    item.rig_image
                                                                                    }`} type="video/ogg" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        </div>
                                                                    </a>
                                                                    <div class="cardlistbox">
                                                                        <div class="card-body pb-0">
                                                                            <div class="row  justify-content-center">
                                                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center ">
                                                                                    <h4 class="card-title">{item.name}</h4>
                                                                                </div>
                                                                            </div>
                                                                            <div className='row pt-3 pb-1' style={{ background: "" }}>

                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-5 mb-2 ">
                                                                                    <small className='text-uppercase'>HASH</small>
                                                                                </div>
                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-7 mb-2 text-right">
                                                                                    <small>{item.rig_hash.slice(0, 3) + "....." + item.rig_hash.slice(-3)}&nbsp;
                                                                                        <CopyToClipboard text={item.rig_hash}>
                                                                                            <span title="Click to Copy" className="mr-copylink" id="token-buy-button" onClick={copieBtn} style={{ cursor: "pointer", color: 'rgb(157 81 255)' }}>
                                                                                                <i class="fa fa-clone "></i></span></CopyToClipboard>
                                                                                    </small>
                                                                                </div>

                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-5  mb-2">
                                                                                    <small className='text-uppercase'>Date</small>
                                                                                </div>
                                                                                <div class="col-lg-6 col-md-6 col-sm-6 col-7 text-right mb-2">
                                                                                    <small>{item.datetime.slice(0, 10)}</small>
                                                                                </div>
                                                                            </div>
                                                                            <button className='btn btn-outline-secondary btn-rounded w-100 mt-1 mb-3' onClick={() => deleteRig(item.rig_master_id)}>Dis-Assemble Rig</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ))
                                                    }
                                                </> : ""
                                            }
                                        </Row>
                                    </Col>


                                    <Modal show={show} className='Nftmodal' onHide={handleClose} size="lg">
                                        <Modal.Header closeButton>
                                            <Modal.Title className='text-white'>Rig Detail</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='pb-2'>
                                            <Row>
                                                {showData.map((item) => (
                                                    <Col lg={4} md={6} className='mb-3'>
                                                        <div className='nft_list'>

                                                            <h5 className="mb-0 pt-1">{item.type_name} ({item.name})</h5>
                                                            <video
                                                                width="100%"
                                                                autoPlay
                                                                muted
                                                                playsInline
                                                                loop
                                                            >
                                                                <source
                                                                    src={`${config.ipfsurl +
                                                                        item.image
                                                                        }`}
                                                                    type="video/mp4"
                                                                />
                                                                <source
                                                                    src={`${config.ipfsurl +
                                                                        item.image
                                                                        }`}
                                                                    type="video/ogg"
                                                                />
                                                                Your browser does not support the
                                                                video tag.
                                                            </video>
                                                            <ul>
                                                                <li>Quantity</li>
                                                                <li><p>{item.rig_quantity}</p></li>
                                                            </ul>

                                                        </div>

                                                    </Col>
                                                ))}
                                            </Row>
                                        </Modal.Body>

                                    </Modal>


                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default CreateRig;
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';

import { getRigNftDetailsForUsersAction, insertRigAction, showRigsForUserAction, deleteRigMasterAction } from '../Action/user.action';
import config from '../coreFIles/config';
import {  Row, Col,  Tab, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Rig = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [rigBox, setRigBox] = useState([]);
    const [ShowXRig, setShowXRig] = useState(1)
    const [ShowYRig, setShowYRig] = useState(false)

    useEffect(() => {
        getRigHistoryForUsersAPI(1);
        showRigsForUserAPI();
    }, []);

    const getRigHistoryForUsersAPI = async (data) => {
        if (data == 1) {
            let res = await getRigNftDetailsForUsersAction({ nft_category_id: data });
            if (res.success) {
                setRigBox(res.data)
                let element = res.data.filter(item => item.categoryId === 1 && item.nftCount >= item.rig_quantity)
                if (element.length == 9) {
                    setShowYRig(true)
                }
                else {
                    setShowYRig(false)
                }
            } else {
            }
            setShowXRig(1)
        }
        if (data == 2) {
            let res = await getRigNftDetailsForUsersAction({ nft_category_id: data });
            if (res.success) {
                setRigBox(res.data)
                let element = res.data.filter(item => item.categoryId === 2 && item.nftCount >= item.rig_quantity)
                if (element.length == 9) {
                    setShowYRig(true)
                }
                else {
                    setShowYRig(false)
                }
            } else {
            }
            setShowXRig(2)
        }
        if (data == 3) {
            let res = await getRigNftDetailsForUsersAction({ nft_category_id: data });
            if (res.success) {
                setRigBox(res.data)
                let element = res.data.filter(item => item.categoryId === 3 && item.nftCount >= item.rig_quantity)
                if (element.length == 9) {
                    setShowYRig(true)
                }
                else {
                    setShowYRig(false)
                }
            } else {
            }
            setShowXRig(3)
        }
    }

    const showRigsForUserAPI = async () => {
        let res = await showRigsForUserAction();
        if (res.success) {
        } else {
        }
    }

    const newFunc = (data) => {
        window.location.href= `${config.nfthomeurl}nftmarketplace`
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }
    const createRig = async (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Assemble this rig!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Assemble it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await insertRigAction({ nft_category_id: data });;
                if (res.success) {
                    Swal.fire({
                        title: 'Creating Rig',
                           html: `<img src='https://ipfs.io/ipfs/QmQLXRUGTuDofQknthYfBnxuKKhi4SW631PZ5Aaq88429S' alt=''></img>`,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        className: 'creatingrigmodal',
                        customClass: {
                            container: 'custom-modal-container',
                            popup: 'custom-modal-popup',
                            title: 'custom-modal-title',
                            image: 'custom-modal-image',
                        },
                        timer: 10000,
                    });
                    setTimeout(() => {
                        Swal.fire("Assembled!", res.msg, "success");
                    }, 11000);
                    setTimeout(() => {
                        window.location.href = `${config.baseUrl}myrig`
                    }, 13000);
                } else {
                    Swal.fire("Failed to Assemble rig!", res.msg, "error");
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
                                  
                                    <Col lg={12}>
                                        <Tab.Container id="left-tabs-example" defaultActiveKey="genx">
                                            <Row>
                                                <Col sm={12} className='pl-2 pr-2'>
                                                    <Row className='align-items-center btn-rounded bg-grey' >
                                                        <Col lg={8}>
                                                            <Nav variant="pills" >

                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="genx" onClick={() => getRigHistoryForUsersAPI(1)}>GEN X</Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="geny" onClick={() => getRigHistoryForUsersAPI(2)}>GEN Y</Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="genz" onClick={() => getRigHistoryForUsersAPI(3)}>GEN Z</Nav.Link>
                                                                </Nav.Item>
                                                            </Nav>
                                                        </Col>
                                                        <Col lg={4} className='text-right btnassamble'>
                                                            {ShowXRig == 1 ? ShowYRig == true ?
                                                                <button className='btn btn-primary btn-rounded ' onClick={() => createRig(1)}>Assemble X Rig</button> : <button className='btn btn-primary btn-rounded disable' disabled>Assemble X Rig</button>:""}
                                                                {ShowXRig == 2 ? ShowYRig == true ?
                                                                    <button className='btn btn-primary btn-rounded ' onClick={() => createRig(2)}>Assemble Y Rig</button> : <button className='btn btn-primary btn-rounded disable' disabled>Assemble Y Rig</button>:""}
                                                                    {ShowXRig == 3 ? ShowYRig == true ?
                                                                        <button className='btn btn-primary btn-rounded ' onClick={() => createRig(3)}>Assemble Z Rig</button> : <button className='btn btn-primary btn-rounded disable' disabled>Assemble Z Rig</button>:""
                                                                        }
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={12}>
                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="genx">
                                                            <Col lg={12} className='mt-2'>

                                                                <Row>
                                                                    {rigBox.filter(item => item.categoryId === 1).map(filteredItem =>
                                                                    (<Col lg={4}>
                                                                        <div class="cardlist">
                                                                            <div className='text-center nftvideo'>
                                                                                <video
                                                                                    width="100%"
                                                                                    autoPlay
                                                                                    muted
                                                                                    playsInline
                                                                                    loop
                                                                                >
                                                                                    <source
                                                                                        src={`${config.ipfsurl +
                                                                                            filteredItem.image
                                                                                            }`}
                                                                                        type="video/mp4"
                                                                                    />
                                                                                    <source
                                                                                        src={`${config.ipfsurl +
                                                                                            filteredItem.image
                                                                                            }`}
                                                                                        type="video/ogg"
                                                                                    />
                                                                                    Your browser does not support the
                                                                                    video tag.
                                                                                </video>

                                                                            </div>

                                                                            <div class="card-body">
                                                                                <div class="row mb-3 justify-content-center">
                                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center mb-2">
                                                                                        <div className=''>
                                                                                            <h4 class="card-title mb-1">{filteredItem.type} <span>({filteredItem.nftName})</span></h4>


                                                                                        </div>

                                                                                    </div>

                                                                                    <small class="col-lg-6 col-md-6 col-sm-6 col-6 mb-2 text-center"><div className='text-uppercase'>Required</div>
                                                                                        <div>{filteredItem.rig_quantity}</div></small>

                                                                                    <small class="col-lg-6 col-md-6 col-sm-6 col-6 text-center mb-2"><div className='text-uppercase'>Available</div>
                                                                                        <div>{filteredItem.nftCount == null ? 0 : filteredItem.nftCount}</div></small>
                                                                                    {parseInt(filteredItem.nftCount == null ? 0 : filteredItem.nftCount) < parseInt(filteredItem.rig_quantity) ? <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                                                                        <button className='btn btn-primary btn-rounded ' onClick={()=>newFunc()}>Buy Now</button>

                                                                                    </div> : <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                                                                        <button disabled="" className="btn btn-default btn-rounded "><i className="fa fa-check text-blue"></i></button>

                                                                                    </div>}

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    ))}                                    
                                                                    <Col lg={4}>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="geny">
                                                            <Col lg={12} className='mt-2'>
                                                                <Row>
                                                                    {rigBox.filter(item => item.categoryId === 2).map(filteredItem =>
                                                                    (<Col lg={4}>
                                                                        <div class="cardlist">
                                                                            <div className='text-center nftvideo'>
                                                                                <video
                                                                                    width="100%"
                                                                                    autoPlay
                                                                                    muted
                                                                                    playsInline
                                                                                    loop
                                                                                >
                                                                                    <source
                                                                                        src={`${config.ipfsurl +
                                                                                            filteredItem.image
                                                                                            }`}
                                                                                        type="video/mp4"
                                                                                    />
                                                                                    <source
                                                                                        src={`${config.ipfsurl +
                                                                                            filteredItem.image
                                                                                            }`}
                                                                                        type="video/ogg"
                                                                                    />
                                                                                    Your browser does not support the
                                                                                    video tag.
                                                                                </video>
                                                                            </div>

                                                                            <div class="card-body">
                                                                                <div class="row mb-3 justify-content-center">
                                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center mb-2">
                                                                                        <div className=''>
                                                                                            <h4 class="card-title mb-1">{filteredItem.type} <span>({filteredItem.nftName})</span></h4>
                                                                                        </div>
                                                                                    </div>

                                                                                    <small class="col-lg-6 col-md-6 col-sm-6 col-6 mb-2 text-center"><div className='text-uppercase'>Required</div>
                                                                                        <div>{filteredItem.rig_quantity}</div></small>

                                                                                    <small class="col-lg-6 col-md-6 col-sm-6 col-6 text-center mb-2"><div className='text-uppercase'>Available</div>
                                                                                        <div>{filteredItem.nftCount == null ? 0 : filteredItem.nftCount}</div></small>
                                                                                    {parseInt(filteredItem.nftCount == null ? 0 : filteredItem.nftCount) < parseInt(filteredItem.rig_quantity) ? <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                                                                        <button className='btn btn-primary btn-rounded ' onClick={newFunc}>Buy Now</button>

                                                                                    </div> : <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                                                                        <button disabled="" className="btn btn-default btn-rounded "><i className="fa fa-check text-blue"></i></button>
                                                                                    </div>}

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>

                                                                    ))}

                                                                   



                                                                </Row>


                                                            </Col>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="genz">
                                                            <Col lg={12} className='mt-2'>
                                                                <Row>
                                                                    {rigBox.filter(item => item.categoryId === 3).map(filteredItem =>
                                                                    (<Col lg={4}>
                                                                        <div class="cardlist">
                                                                            <div className='text-center nftvideo'>
                                                                                <video
                                                                                    width="100%"
                                                                                    autoPlay
                                                                                    muted
                                                                                    playsInline
                                                                                    loop
                                                                                >
                                                                                    <source
                                                                                        src={`${config.ipfsurl +
                                                                                            filteredItem.image
                                                                                            }`}
                                                                                        type="video/mp4"
                                                                                    />
                                                                                    <source
                                                                                        src={`${config.ipfsurl +
                                                                                            filteredItem.image
                                                                                            }`}
                                                                                        type="video/ogg"
                                                                                    />
                                                                                    Your browser does not support the
                                                                                    video tag.
                                                                                </video>
                                                                            </div>

                                                                            <div class="card-body">
                                                                                <div class="row mb-3 justify-content-center">
                                                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center mb-2">
                                                                                        <div className=''>
                                                                                            <h4 class="card-title mb-1">{filteredItem.type} <span>({filteredItem.nftName})</span></h4>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-2 text-center"><div className='text-uppercase'>Required</div>
                                                                                        <div>{filteredItem.rig_quantity}</div></div>

                                                                                    <div class="col-lg-6 col-md-6 col-sm-6 col-6 text-center mb-2"><div className='text-uppercase'>Available</div>
                                                                                        <div>{filteredItem.nftCount == null ? 0 : filteredItem.nftCount}</div></div>
                                                                                    {parseInt(filteredItem.nftCount == null ? 0 : filteredItem.nftCount) < parseInt(filteredItem.rig_quantity) ? <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                                                                        <button className='btn btn-primary btn-rounded ' onClick={newFunc}>Buy Now</button>

                                                                                    </div> : <div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                                                                                        <button disabled="" className="btn btn-default btn-rounded "><i className="fa fa-check text-blue"></i></button>

                                                                                    </div>}

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    ))}
                                                                </Row>
                                                            </Col>
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Rig;
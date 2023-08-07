/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect,  useState } from "react";
import Dashboardheadernft from "../directives/dashboardheadernft";
import Dashboardsidebarnft from "../directives/dashboardsidebarnft";

import {
  getNftDetailsOfUserAction,
  showRigsForUserAction,
  nftPutOnSaleAction,
} from "../Action/user.action";
import config from "../coreFIles/config";
import {
  Row,
  Col,
  Tab,
  Nav,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";

const MyNft = () => {
  const [toggleSet, settoggleSet] = useState(1);
  const [rigBox, setRigBox] = useState([]);
  const [isProcess, setisProcess] = useState(1);
  const [quantity, setquantity] = useState(1);
  const [IdData, setIdData] = useState(1);
  const [price, setPrice] = useState({
    price: "",
    quantity: "",
  });
  const [available, setavailable] = useState("");
  const [error, seterror] = useState("");
  const [show, setShow] = useState(false);
  const [quantityError, setquantityError] = useState("");
  const handleClose = () => {
    setShow(false);
    setquantity(1);
    seterror("");
    setquantityError("");
  };
  const handleShow = (data) => {
    if (data.nftId !== IdData) {
      setquantity(1);
    }
    setPrice(data);
    setIdData(data.nftId);
    setavailable(
      parseInt(data.totalNFT) -
        (parseInt(data.putOnSale) + parseInt(data.usedInRig))
    );
    setShow(true);
  };

  useEffect(() => {
    getRigHistoryForUsersAPI();
    showRigsForUserAPI();
  }, []);

  const getRigHistoryForUsersAPI = async () => {
    let res = await getNftDetailsOfUserAction();
    if (res.success) {
      setRigBox(res.data);
      let element = res.data.filter((item) => item.categoryId === 1);
      if (element.length == 9) {
      } else {
      }
      let element1 = res.data.filter((item) => item.categoryId === 2);
      if (element.length == 9) {
      } else {
      }
      let element2 = res.data.filter((item) => item.categoryId === 3);
      if (element.length == 9) {
      } else {
      }
    } else {
      setisProcess(0);
    }
  };

  const showRigsForUserAPI = async () => {
    let res = await showRigsForUserAction();
    if (res.success) {
    } else {
    }
  };


  const putOnSellFunc = async (data) => {
    if (price.price == "" || price.price == undefined || price.price == null || price.price == 0 || price.price == 0.0 || price.price == 0.00) {
      seterror("Enter the Valid Amount");
      return;
    }
 
    else {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to sell your NFT?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let res = await nftPutOnSaleAction({
            quantity: quantity,
            price: parseFloat(price.price),
            nftId: parseInt(price.nftId),
          });
          if (res.success) {
            Swal.fire("Done!", res.msg, "success");
            getRigHistoryForUsersAPI();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            Swal.fire("Failed to put on sell!", res.msg, "error");
          }
        }
      });
    }
  };

  const toggleManage = (data) => {
    settoggleSet(data);
  };

  const decreaseQuantity = async (data) => {
    setquantityError("");
    if (quantity <= 1) {
      setquantity(1);
    } else if (data.nftId !== IdData) {
      setquantity(1);
      setIdData(data.nftId);
    } else {
      setIdData(data.nftId);
      setquantity(parseInt(quantity) - 1);
    }
  };

  const increaseQuantity = async (data, index) => {
    setquantityError("");

    if (quantity < 1) {
      setquantity(1);
    }
    if (data.nftId !== IdData) {
      setquantity(2);
      setIdData(data.nftId);
    } else {
      setIdData(data.nftId);
      setquantity(parseInt(quantity) + 1);
    }
    if (
      quantity >=
      parseInt(data.totalNFT) -
        (parseInt(data.putOnSale) + parseInt(data.usedInRig))
    ) {
      setquantity(
        parseInt(data.totalNFT) -
          (parseInt(data.putOnSale) + parseInt(data.usedInRig))
      );
      setquantityError("Exceeded quantity");
    }
  };

  const inputHandler = (e) => {
    let previousValue = price.price;
    const { name, value } = e.target;
    let regex = /^(?:0|[1-9]\d{0,6}|)(?:\.\d{1,2})?$/;
    if (regex.test(value)) {
      setPrice((old) => {
        return { ...old, [name]: value };
      });
    } else {
      e.target.value = previousValue;
    }
    
  };

  return (
    <>
      <div className={`page-wrapper${toggleSet === 1 ? "" : " toggled"}`}>
        <Dashboardsidebarnft />
        <div className="main-container">
          <Dashboardheadernft clickToggle={toggleManage} />
          <div className="content-wrapper-scroll">
            <div className="content-wrapper container mynfts">
              <div className="Nftlist">
                <Row className="mt-4">
                  <Col lg={12}>
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="genx"
                    >
                      <Row>
                        <Col sm={12}>
                          <Nav variant="pills" className="bg-grey">
                            <Nav.Item>
                              <Nav.Link eventKey="genx">Gen X</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="geny">Gen Y</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="genz">Gen Z</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                        <Col sm={12}>
                          <Tab.Content>
                            <Tab.Pane eventKey="genx">
                              <Col lg={12} className="mt-4">
                                <Row>
                                {rigBox
                                    .filter((item) => item.categoryId === 1)
                                    .length ==0 ? <p className="text-center">No NFTs Available</p>:""}
                                  {rigBox
                                    .filter((item) => item.categoryId === 1)
                                    .map((filteredItem, index) => (
                                      <Col lg={4}>
                                        <div class="cardlist gradient-border ">
                                          <div className="text-center nftvideo">
                                            <video
                                              width="100%"
                                              autoPlay
                                              muted
                                              playsInline
                                              loop
                                            >
                                              <source
                                                src={`${
                                                  config.ipfsurl +
                                                  filteredItem.image
                                                }`}
                                                type="video/mp4"
                                              />
                                              <source
                                                src={`${
                                                  config.ipfsurl +
                                                  filteredItem.image
                                                }`}
                                                type="video/ogg"
                                              />
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          </div>

                                          <div class="card-body">
                                            <div class="row  justify-content-center">
                                              <div class="col-lg-12 col-md-12 col-sm-12 col-12  mb-1">
                                                <div className="">
                                                  <h4 class="card-title mb-1">
                                                    {filteredItem.type}{" "}
                                                    <span>
                                                      ({filteredItem.nftName})
                                                    </span>
                                                  </h4>
                                                  <hr className="mb-2" />
                                                </div>
                                              </div>

                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 ">
                                                <small className="text-uppercase">
                                                  Total{" "}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.totalNFT}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 ">
                                                <small className="text-uppercase">
                                                  Used in Rig
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.usedInRig}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6  mb-0">
                                                <small className="text-uppercase">
                                                  On Sell
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.putOnSale}
                                                </small>
                                              </div>

                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6  mb-0">
                                                <small className="text-uppercase">
                                                  Available
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {parseInt(
                                                    filteredItem.totalNFT
                                                  ) -
                                                    (parseInt(
                                                      filteredItem.putOnSale
                                                    ) +
                                                      parseInt(
                                                        filteredItem.usedInRig
                                                      ))}
                                                </small>
                                              </div>

                                              {parseInt(filteredItem.totalNFT) -
                                                (parseInt(
                                                  filteredItem.putOnSale
                                                ) +
                                                  parseInt(
                                                    filteredItem.usedInRig
                                                  )) >
                                              0 ? (
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 text-center">
                                                  <button
                                                    className="btn btn-primary btn-rounded "
                                                    onClick={() =>
                                                      handleShow(filteredItem)
                                                    }
                                                  >
                                                    Put On Sell
                                                  </button>
                                                </div>
                                              ) : (
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 text-center buynownft"></div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </Col>
                                    ))}
                                </Row>
                              </Col>
                            </Tab.Pane>
                            <Tab.Pane eventKey="geny">
                              <Col lg={12} className="mt-4">
                                <Row>
                                  {rigBox
                                    .filter((item) => item.categoryId === 2)
                                    .length ==0 ? <p className="text-center">No NFTs Available</p>:""}
                                  {rigBox
                                    .filter((item) => item.categoryId === 2)
                                    .map((filteredItem, index) => (
                                      <Col lg={4}>
                                        <div class="cardlist gradient-border ">
                                          <div className="text-center nftvideo">
                                            <video
                                              width="100%"
                                              autoPlay
                                              muted
                                              playsInline
                                              loop
                                            >
                                              <source
                                                src={`${
                                                  config.ipfsurl +
                                                  filteredItem.image
                                                }`}
                                                type="video/mp4"
                                              />
                                              <source
                                                src={`${
                                                  config.ipfsurl +
                                                  filteredItem.image
                                                }`}
                                                type="video/ogg"
                                              />
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          </div>

                                          <div class="card-body">
                                            <div class="row  justify-content-center">
                                              <div class="col-lg-12 col-md-12 col-sm-12 col-12  mb-1">
                                                <div className="">
                                                  <h4 class="card-title mb-1">
                                                    {filteredItem.type}{" "}
                                                    <span>
                                                      ({filteredItem.nftName})
                                                    </span>
                                                  </h4>
                                                  <hr className="mb-2" />
                                                </div>
                                              </div>

                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 ">
                                                <small className="text-uppercase">
                                                  Total{" "}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.totalNFT}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 ">
                                                <small className="text-uppercase">
                                                  Used in Rig
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.usedInRig}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6  mb-0">
                                                <small className="text-uppercase">
                                                  On Sell
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.putOnSale}
                                                </small>
                                              </div>

                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6  mb-0">
                                                <small className="text-uppercase">
                                                  Available
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {parseInt(
                                                    filteredItem.totalNFT
                                                  ) -
                                                    (parseInt(
                                                      filteredItem.putOnSale
                                                    ) +
                                                      parseInt(
                                                        filteredItem.usedInRig
                                                      ))}
                                                </small>
                                              </div>
                                              {parseInt(filteredItem.totalNFT) -
                                                (parseInt(
                                                  filteredItem.putOnSale
                                                ) +
                                                  parseInt(
                                                    filteredItem.usedInRig
                                                  )) >
                                              0 ? (
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 text-center">
                                                  <button
                                                    className="btn btn-primary btn-rounded "
                                                    onClick={() =>
                                                      handleShow(filteredItem)
                                                    }
                                                  >
                                                    Put On Sell
                                                  </button>
                                                </div>
                                              ) : (
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 text-center">
                                                
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </Col>
                                    ))}
                                </Row>
                              </Col>
                            </Tab.Pane>
                            <Tab.Pane eventKey="genz">
                              <Col lg={12} className="mt-4">
                                <Row>
                                  {rigBox
                                    .filter((item) => item.categoryId === 3)
                                    .length ==0 ? <p className="text-center">No NFTs Available</p>:""}
                                  {rigBox
                                    .filter((item) => item.categoryId === 3)
                                    .map((filteredItem, index) => (
                                      <Col lg={4}>
                                        <div class="cardlist gradient-border ">
                                          <div className="text-center nftvideo">
                                            <video
                                              width="100%"
                                              autoPlay
                                              muted
                                              playsInline
                                              loop
                                            >
                                              <source
                                                src={`${
                                                  config.ipfsurl +
                                                  filteredItem.image
                                                }`}
                                                type="video/mp4"
                                              />
                                              <source
                                                src={`${
                                                  config.ipfsurl +
                                                  filteredItem.image
                                                }`}
                                                type="video/ogg"
                                              />
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          </div>

                                          <div class="card-body">
                                            <div class="row  justify-content-center">
                                              <div class="col-lg-12 col-md-12 col-sm-12 col-12  mb-1">
                                                <div className="">
                                                  <h4 class="card-title mb-1">
                                                    {filteredItem.type}{" "}
                                                    <span>
                                                      ({filteredItem.nftName})
                                                    </span>
                                                  </h4>
                                                  <hr className="mb-2" />
                                                </div>
                                              </div>

                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 ">
                                                <small className="text-uppercase">
                                                  Total{" "}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.totalNFT}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 ">
                                                <small className="text-uppercase">
                                                  Used in Rig
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.usedInRig}
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6  mb-0">
                                                <small className="text-uppercase">
                                                  On Sell
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {filteredItem.putOnSale}
                                                </small>
                                              </div>

                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6  mb-0">
                                                <small className="text-uppercase">
                                                  Available
                                                </small>
                                              </div>
                                              <div class="col-lg-6 col-md-6 col-sm-6 col-6 mb-0 text-right">
                                                <small>
                                                  {parseInt(
                                                    filteredItem.totalNFT
                                                  ) -
                                                    (parseInt(
                                                      filteredItem.putOnSale
                                                    ) +
                                                      parseInt(
                                                        filteredItem.usedInRig
                                                      ))}
                                                </small>
                                              </div>

                                              {parseInt(filteredItem.totalNFT) -
                                                (parseInt(
                                                  filteredItem.putOnSale
                                                ) +
                                                  parseInt(
                                                    filteredItem.usedInRig
                                                  )) >
                                              0 ? (
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 text-center">
                                                  <button
                                                    className="btn btn-primary btn-rounded "
                                                    onClick={() =>
                                                      handleShow(filteredItem)
                                                    }
                                                  >
                                                    Put On Sell
                                                  </button>
                                                </div>
                                              ) : (
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 text-center">
                                                  
                                                </div>
                                              )}
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
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          className="Nftmodal"
                        >
                          <Modal.Header closeButton></Modal.Header>
                          <Modal.Body className="btn-rounded">
                            <Row className="justify-content-center">
                              <Col lg={8}>
                                <div className="text-center mb-3">
                                  <div
                                    className="text-uppercase"
                                    style={{ fontSize: "1.25rem" }}
                                  >
                                    Quantity available: {available} <br /> NFT:&nbsp;
                                    {price.type} ({price.nftName})
                                  </div>
                                  <Row>
                                    <Col lg={12} className="mt-3">
                                      <div className="form-group">
                                        <label htmlFor="">
                                          Set Price For Single NFT in (MNT)
                                        </label>
                                        <br />
                                        <br />
                                        <input
                                          type="number"
                                          name="price"
                                          min={1}
                                          max={9999999}
                                          onChange={inputHandler}
                                          placeholder="Enter Price (MNT)"
                                          onKeyPress={(event) => {
                                            if (
                                              !/^\d*[.]?\d{0,1}$/.test(
                                                event.key
                                              )
                                            ) {
                                              event.preventDefault();
                                            }
                                          }}
                                          className="form-control btn-rounded text-center"
                                        />
                                        <span className="text-danger">
                                          {error}
                                        </span>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row className="align-items-center mt-4 mb-1">
                                    <Col lg={6} xs={6}>
                                      <label>Select Quantity</label>
                                    </Col>
                                    <Col lg={6} xs={6}>
                                      <div class="centerPlus ">
                                        <div
                                          class="input-group"
                                          style={{
                                            borderRadius: "3px",
                                            overflow: "hidden",
                                          }}
                                        >
                                          <span class="input-group-btn">
                                            <button
                                              type="button"
                                              class="btn btn-number"
                                              data-type="minus"
                                              onClick={() =>
                                                decreaseQuantity(price)
                                              }
                                            >
                                              <span class="fa fa-minus"></span>
                                            </button>
                                          </span>
                                          <input
                                            type="number"
                                            readonly=""
                                            disabled=""
                                            class="form-control input-number text-center"
                                            value={
                                              IdData == price.nftId
                                                ? quantity
                                                : 1
                                            }
                                          />
                                          <span class="input-group-btn">
                                            <button
                                              type="button"
                                              class="btn btn-number"
                                              data-type="plus"
                                              onClick={() =>
                                                increaseQuantity(price)
                                              }
                                            >
                                              <span class="fa fa-plus"></span>
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <span className="text-danger">
                                        {quantityError}
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg={12} className="mt-4">
                                      <button
                                        className="btn btn-primary btn-rounded pr-2 pl-2 "
                                        onClick={() => putOnSellFunc(price)}
                                      >
                                        Confirm
                                      </button>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </Modal.Body>
                        </Modal>
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
  );
};
export default MyNft;

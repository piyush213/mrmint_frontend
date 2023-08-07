
import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import config from '../coreFIles/config';
import ReactDatatable from '@ashvin27/react-datatable'
import { Form,  Row, Button, Modal, Col } from 'react-bootstrap';
import { generatenewticketAction, getlistofmyticketsAction } from '../Action/user.action';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";


const Support = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [image_file1, setimage_file1] = useState("");
    const [image_preview1, setimage_preview1] = useState("");
    const [msg, setmsg] = useState("");
    const [error, setError] = useState()
    const [error1, setError1] = useState()

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setimage_preview1('')
        setimage_file1('')
        setError("")
        setError1("")
        setvalidatioError({
            titleError: "",
            descriptionError: ""
        })
        setticket('')
    }

    const handleShow = () => setShow(true);
    const [ticket, setticket] = useState({
        title: "",
        description: "",
        image: ""
    })
    const [ticketlist, setticketlist] = useState([])
    const [validatioError, setvalidatioError] = useState({});
    let navigate = useNavigate();


    useEffect(() => {
        getpartner()
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
    };

    const partnerPic1 = async (e) => {
        e.preventDefault();
        let image_as_base64 = URL.createObjectURL(e.target.files[0]);
        let image_as_files = e.target.files[0];
        setimage_file1(image_as_files);
        setimage_preview1(image_as_base64);
        setticket((old) => {
            // eslint-disable-next-line no-useless-computed-key
            return { ...old, ["image"]: image_as_files };
        });
    };

    function validate() {
        let titleError = "";
        let descriptionError = "";
        if (ticket.title == "") {
            titleError = "Title is required.";
        }

        if (ticket.description == "") {
            descriptionError = "Description is required.";
        }


        if (titleError || descriptionError) {
            setvalidatioError({
                titleError,
                descriptionError
            });
            return false;
        } else {
            return true;
        }
    }

    const SubmitForm = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
        }
        let regex = ticket.title.trim()
        if (regex == "") {
            setError("Title or Description cannot be blank")
            return
        }
        let regex1 = ticket.description.trim()
        if (regex1 == "") {
            setError1("Title or Description cannot be blank")
            return
        }
        else {
            let res = await generatenewticketAction(ticket);
            if (res.success) {
                handleClose()
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else {
                toast.error(res.msg);
            }
        }
    }

    const getpartner = async () => {
        let res = await getlistofmyticketsAction();
        if (res) {
            setticketlist(res.data)
        }
        if (res.data == null) {
            setticketlist([])
        }
    };

    const inputHandler = (e) => {
        const { name, value } = e.target
        setticket((old) => {
            return { ...old, [name]: value }
        })
    }

    const showmore = (item) => {
        setmsg(item);
    };

    const showless = () => {
        setmsg("");
    };


    const handleClick = async (item) => {
        navigate(`${config.baseUrl}chat`, {
            state: {
                ticket_number: item.ticket_number,
                user_id: item.user_id,
                status: item.status
            }
        })
    }


    const toggleManage = (data) => {
        settoggleSet(data)
    }

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
    const columnsForReward = [
        {
            key: "sn",
            text: "#",
            cell: (row, index) => index + 1
        },
        {
            key: "ticket_number",
            text: "Ticket Number",
            cell: (item) => {
                return (
                    `${item.ticket_number}`
                );
            }
        },
        {
            key: "action",
            text: "Title",
            cell: (item) => {
                return (
                    <>
                        {item.title.length >= 100 ? (
                            <>
                                <>
                                    <span>
                                        <span>
                                            {msg != "" && item.ticket_number == msg.ticket_number
                                                ? msg.title
                                                : item.title.slice(0, 100) + "....."}
                                        </span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span></span>
                                    {msg != "" && item.ticket_number == msg.ticket_number ? (
                                        ""
                                    ) : (
                                        <span style={{
                                            fontSize: "smaller",
                                            color: "#08c8ff", cursor: "pointer"
                                        }} onClick={() => showmore(item)}>view more</span>
                                    )}
                                    <span onClick={() => showless(item)}>
                                        {msg != "" && item.ticket_number == msg.ticket_number ? (
                                            <span style={{
                                                fontSize: "smaller",
                                                color: "#08c8ff", cursor: "pointer"
                                            }} onClick={() => showless(item)}>view less</span>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </>
                                <></>
                            </>
                        ) : (
                            item.title
                        )}
                    </>
                );
            },
        },


        {
            key: "action",
            text: "Description",
            cell: (item) => {
                return (
                    <>
                        {item.description.length >= 100 ? (
                            <>
                                <>
                                    <span>
                                        <span>
                                            {msg != "" && item.ticket_number == msg.ticket_number
                                                ? msg.description
                                                : item.description.slice(0, 100) + "....."}
                                        </span>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span></span>
                                    {msg != "" && item.ticket_number == msg.ticket_number ? (
                                        ""
                                    ) : (
                                        <span style={{
                                            fontSize: "smaller",
                                            color: "#08c8ff", cursor: "pointer"
                                        }} onClick={() => showmore(item)}>view more</span>
                                    )}
                                    <span onClick={() => showless(item)}>
                                        {msg != "" && item.ticket_number == msg.ticket_number ? (
                                            <span style={{
                                                fontSize: "smaller",
                                                color: "#08c8ff", cursor: "pointer"
                                            }} onClick={() => showless(item)}>view less</span>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </>
                                <></>
                            </>
                        ) : (
                            item.description
                        )}

                    </>
                );
            },
        },
        {
            key: "image",
            text: "Image",
            cell: (item) => {
                return (
                    <>
                        <a target="__blank" href={`${config.imageUrl}` + item.image}>
                            <img
                                src={`${config.imageUrl}` + item.image}
                                width="70px"
                                height="70px"
                                alt=''
                            ></img>
                        </a>
                        <br />
                    </>
                );
            },
        },

        {
            key: "timestamp",
            text: "Date Created ",
            cell: (item) => {
                return (
                    item.timestamp.slice(0, 11)
                );
            }
        },
        {
            key: "action",
            text: "Status",
            cell: (item) => {
                return (
                    <>
                        {item.status == 0 ? <span
                            className=""
                        >
                            Open
                        </span>
                            : <span
                                className=""
                            >
                                Closed
                            </span>
                        }


                    </>
                );
            },
        },

        {
            key: "action",
            text: "Action",
            cell: (item) => {
                return (
                    <>
                        {item.status == 0 ? <button
                            className="btn btn-succcess"
                            onClick={() => handleClick(item)}
                        >
                            Message
                        </button>
                            : <button
                                className="text-danger"
                                onClick={() => handleClick(item)}
                            >
                                Message
                            </button>
                        }
                    </>
                );
            },
        },
    ];



    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll pt-2 support">
                        <div className="content-wrapper">
                            <Row>
                                <Col lg={12}>
                                    <div className='p-3'>

                                        <Row className='align-items-center justify-content-center mb-4'>

                                            <Col lg={12} className='text-end mb-3'>
                                                <Button className='btn-rounded btn-lg' onClick={handleShow}><h5 className='mb-0'>Generate Ticket</h5></Button>
                                            </Col>
                                            <Modal show={show} onHide={handleClose} className='ticketmodal p-3'>
                                                <Modal.Header closeButton>
                                                    <Modal.Title className='text-white'><h4 className='mb-0'>Ticket</h4></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className='ticket-main-form'>
                                                        <Form onSubmit={SubmitForm}>
                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                <Form.Label>Title</Form.Label>
                                                                <Form.Control type="text" name="title" placeholder="Title" onChange={inputHandler} onPaste={handleChange} onKeyPress={(event) => {
                                                                    if (
                                                                        /[!^*`()=\\[\]\/{}|:'";<>]/.test(
                                                                            event.key
                                                                        )
                                                                    ) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                />
                                                                <span className="validationErr">
                                                                    {validatioError.titleError}
                                                                </span>
                                                            </Form.Group>

                                                            <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                                                <Form.Label>Query</Form.Label>
                                                                <Form.Control as="textarea" name="description" placeholder='Description' rows={3} onChange={inputHandler} onPaste={handleChange} onKeyPress={(event) => {
                                                                    if (
                                                                        /[!^*`()=\\[\]\/{}|:'";<>]/.test(
                                                                            event.key
                                                                        )
                                                                    ) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}/>
                                                                <span className="validationErr">
                                                                    {validatioError.descriptionError}
                                                                    {error1}
                                                                    {error}
                                                                </span>
                                                            </Form.Group>

                                                            <Form.Group controlId="formFile" className=" profile">
                                                                <Form.Label>Select Image</Form.Label>
                                                                <div className="mb-3 choose_img" >
                                                                    {image_preview1 == "" ? (
                                                                        setticket?.image === null ||
                                                                            setticket?.image === "null" ||
                                                                            setticket?.image == "" ? (
                                                                            ""
                                                                        ) : (
                                                                            <img
                                                                                style={{ height: "150px", width: "150px" }}
                                                                                className="object-cover w-full h-32"
                                                                                src='images/support_ticket.png'
                                                                                alt=""
                                                                            />
                                                                        )
                                                                    ) : (
                                                                        <img
                                                                            style={{ height: "150px", width: "150px" }}
                                                                            id="image"
                                                                            className="object-cover w-full h-32"
                                                                            src={image_preview1}
                                                                            alt=''
                                                                        />
                                                                    )}

                                                                    <input
                                                                        name="image"
                                                                        onChange={partnerPic1}
                                                                        id="upload_profile_img"
                                                                        accept="image/*"
                                                                        className="form-control mt-5"
                                                                        type="file"
                                                                    />
                                                                </div>
                                                            </Form.Group>

                                                            <Button variant="primary" className='w-100 btn-rounded' type="submit">
                                                                Submit
                                                            </Button>
                                                        </Form>

                                                    </div>



                                                </Modal.Body>

                                            </Modal>
                                            <Col lg={12}>

                                                <div className=''>

                                                    <ReactDatatable
                                                        config={configForReward}
                                                        records={ticketlist}
                                                        columns={columnsForReward}
                                                    />
                                                </div>

                                            </Col>


                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Support;
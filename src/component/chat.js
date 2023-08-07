/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import {  Row, Col } from 'react-bootstrap';
import { getchatofmyticketsAction, userreplyonticketAction } from '../Action/user.action';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';


const Chat = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [chat, setchat] = useState([])
    const [sendmessage, setSendMessage] = useState('')
    const [error, setError] = useState()
    const [chatscroller, setChatscroller] = useState(false)


    useEffect(() => {
        getpartner()
         window.scrollTo(0, document.body.scrollHeight);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            handleClickScroll()
        }, 700);

    }, [chatscroller]);

    const handleClickScroll = () => {
        const element = document.getElementById('alwayscometothisid');
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setChatscroller(true) 
    };

    const handleChange = (e) => {
        e.preventDefault();
    };

    const location = useLocation();

    const getpartner = async () => {
        let res = await getchatofmyticketsAction({ ticket_number: location.state.ticket_number });
        if (res) {
            setchat(res.data)
        }
    };

    const toggleManage = (data) => {
        settoggleSet(data)
    }


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setSendMessage(value);
    };

    const userChat = async (e) => {
        e.preventDefault();
        let regex = sendmessage.trim()
        if (regex == "") {
            setError("")
            return
        }
        let res = await userreplyonticketAction({ message: sendmessage, ticket_id: location.state.ticket_number });
        if (res.success) {
            toast.success(res.msg);
            setSendMessage("")
            document.getElementsByClassName("write_msg")[0].value = ""
            setError("")


            setTimeout(() => {
                getpartner()
                setChatscroller(false)
            }, 500);
        } else {
            toast.error(res.msg);
        }
    };

    window.setInterval(function () {
        var elem = document.getElementById('messaging');
        elem.scrollTop = elem.scrollHeight;
    }, 100);

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll pt-5 support">
                        <div className="">
                            <Row>
                                <Col lg={12}>
                                    <div className="messaging" id="messaging">
                                        <div className="inbox_msg">
                                            <div className="mesgs">
                                                <div className="msg_history">
                                                    {chat.map((item) =>
                                                        item.sender == 0 ? (
                                                            <div className="incoming_msg">
                                                                <div className="received_msg">
                                                                    <div className="received_withd_msg">
                                                                        <p>{item.message}</p>
                                                                        <span className="time_date"> {item.timestamp.slice(0, 11)}    | {item.timestamp.slice(11, 20)}</span></div>
                                                                </div>
                                                            </div>
                                                        ) : (<div className="outgoing_msg">
                                                            <div className="sent_msg">
                                                                <p>{item.message}</p>
                                                                <span className="time_date text-right">  {item.timestamp.slice(0, 11)}    | {item.timestamp.slice(11, 20)}</span> </div>
                                                        </div>))}
                                                    <p id='alwayscometothisid' ></p>
                                                </div>
                                                <p>{error}</p>
                                                {location.state.status == 0 ? <div className="type_msg">
                                                    <form onSubmit={userChat}>
                                                        <div className="input_msg_write">
                                                            <input type="text" className="write_msg" autocomplete="off" placeholder="Type a message" name='message' onChange={inputHandler} onPaste={handleChange} onKeyPress={(event) => {
                                                                    if (
                                                                        /[!^*`()=\\[\]\/{}|:'";<>]/.test(
                                                                            event.key
                                                                        )
                                                                    ) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                />
                                                            <button className="msg_send_btn" type="submit" ><i className="fa fa-paper-plane-o" aria-hidden="true" /></button>
                                                        </div>
                                                    </form>
                                                </div>
                                                    : "Ticket Closed"}
                                            </div>
                                        </div>
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

export default Chat;
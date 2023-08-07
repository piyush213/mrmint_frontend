/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import 'react-accessible-accordion/dist/fancy-example.css';
import { allnotificationlistAction } from '../Action/user.action';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import Dashboardheadernft from '../directives/dashboardheadernft';


const Notification = () => {
    const [allnotification, setallnotification] = useState([])
    const [toggleSet, settoggleSet] = useState(1)
    const [notificationmsg, setnotificationmsg] = useState('')

    useEffect(() => {
        getallnotification()
    }, [])

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    const getallnotification = async () => {
        let res = await allnotificationlistAction();
        if (res.status) {
            setallnotification(res.data)
        }
        setnotificationmsg(res.msg)
    }

    const handleLocation = async (item) => {
        setTimeout(() => {
            window.location.href = `${config.baseUrl}${item.url}`
        }, 500);
    }


    return (

        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll  support">
                        <div id="content" className=" content-wrapper">

                            <div className='container'>

                                <br />
                                <h4 className='text-uppercase mt-4 mb-4'>Notification</h4>


                                <div className='notification_detail mb-5 pb-4'>
                                    <ul>
                                        {allnotification.map((item) => (
                                            <li>
                                                <div class="row ">
                                                    <div className='col-lg-12 col-sm-12'>
                                                        <div className='row align-items-center'>
                                                            <div class=" col-lg-8 col-7">
                                                                <p onClick={() => handleLocation(item)} style={{ cursor: "pointer" }}>{item.title} </p>
                                                                <a ><p onClick={() => handleLocation(item)} style={{ cursor: "pointer" }}>{item.detail} </p></a>
                                                            </div>
                                                            <div className='col-lg-4 col-5 text-right'>

                                                                <div className=''>
                                                                    <small className='text-grey'>{item.datetime.slice(0, 11)}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='d-flex justify-content-center align-center-items'>
                                            <div></div>
                                            <div>{notificationmsg}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </>

    )

}
export default Notification;
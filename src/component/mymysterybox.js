import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import { getMysteryBoxAction } from '../Action/user.action';
import config from '../coreFIles/config';
import { Link } from 'react-router-dom';

const Mymysterybox = () => {
    const [toggleSet, settoggleSet] = useState(1);
    const [mysteryBox, setMysteryBox] = useState([]);
    const [isProcess, setisProcess] = useState(1);

    useEffect(() => {
        getTokenPurchaseAPI();
    }, []);

    const getTokenPurchaseAPI = async () => {
        let res = await getMysteryBoxAction();
        if (res.success) {
            setMysteryBox(res.data);
            setisProcess(0);
        }else{
            setisProcess(0);
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper container mymysterybox">
                            <div className="row">
                                <div className='col-lg-12'>
                                    <h4 class="mt-4 mb-0">My Mystery box</h4>
                                </div>

                                {isProcess ?
                                    <img className='loaderImg' src="images/loader.gif" alt=''/>
                                    :
                                    mysteryBox.length == 0 ?
                                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-4">
                                            <div className="card ">
                                                <div className="card-body">
                                                    <div className='row mb-2'>
                                                        <div className='col-lg-12'>
                                                            <div className="card-title text-center">You haven't purchase any mystery box yet. Click to purchase now </div>
                                                            <div className='form-group mt-20 text-center'>
                                                                <a className='btn btn-primary' href={`${config.nftFront}`}>Buy Now</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        :
                                        mysteryBox.map(data => (
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 pt-4">
                                                <Link to={`${config.baseUrl}mintingcard/` + data.id}>
                                                    <div className="card ">
                                                        <video width="100%" muted autoPlay loop playsInline>
                                                            <source src={`${config.ipfsurl + data.boxImage}`} type="video/mp4" />
                                                            <source src={`${config.ipfsurl + data.boxImage}`} type="video/ogg" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                        <div className="card-body">
                                                            <div className='row mb-2'>
                                                                <div className='col-lg-12'>
                                                                    <div className="card-title">{data.mysteryBoxName}</div>
                                                                </div>

                                                            </div>
                                                            <div className='row mb-2'>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                                    <p>Price</p>
                                                                </div>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 col-6 text-right'>
                                                                    <p>${data.price}</p>
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 col-6'>
                                                                    <p>Date</p>
                                                                </div>
                                                                <div className='col-lg-6 col-md-6 col-sm-6 col-6 text-right'>
                                                                    <p>{data.date}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Mymysterybox;
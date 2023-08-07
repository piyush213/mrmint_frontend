/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import { getNFTstatisticsListAction, getstatisticsListNFTAction } from '../Action/user.action';

const Autopool = () => {
    const [toggleSet, settoggleSet] = useState(1)
    // const [statisticsList, setstatisticsList] = useState({});
    // const [matchingBonus, setmatchingBonus] = useState({});
    const [isProcess, setisProcess] = useState(0);

    useEffect(() => {
        // getNFTstatisticsListAPI();
        // getMatchingBonusAPI();
    }, []);

    const toggleManage = (data) => {
        settoggleSet(data)
    }

    // const getNFTstatisticsListAPI = async () => {
    //     let res = await getNFTstatisticsListAction();
    //     if (res.success) {
    //         setstatisticsList(res.data[0])
    //         setisProcess(0);
    //     }
    // }

    // const getMatchingBonusAPI = async () => {
    //     let res = await getstatisticsListNFTAction();
    //     if (res.success) {
    //         setmatchingBonus(res.data)
    //     }
    // }

    return (
        <>
        <div className='autopool'>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebarnft />
                <div className="main-container">
                    <Dashboardheadernft clickToggle={toggleManage} />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">

                            {isProcess ?
                                <img className='loaderImg' src="images/loader.gif" />
                                :
                                <div className="row mt-4 align-items-start">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <div className="card">
                                            <img src="images/mastercard.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Nexus</h5>
                                                <h5 className="card-text text-center mt-2">Unti Price : 500 MNT</h5>
                                                <p className="card-text text-center mt-2">Total:5 NFT</p>
                                                <div className='px-4 mt-4'>
                                                    <a href="#" className="btn btn-mint btn-primary">ENTER</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <div className="card ">
                                             <img src="images/mastercard.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Mesh</h5>
                                                <h5 className="card-text text-center mt-2">Unti Price : 1000 MNT</h5>
                                                <p className="card-text text-center mt-2">Total:10 NFT</p>
                                                <div className='px-4 mt-4'>
                                                    <a href="#" className="btn btn-mint btn-primary">ENTER</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <div className="card ">
                                            <img src="images/mastercard.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Prism</h5>
                                                <h5 className="card-text text-center mt-2">Unti Price : 2000 MNT</h5>
                                                <p className="card-text text-center mt-2">Total:20 NFT</p>
                                                <div className='px-4 mt-4'>
                                                    <a href="#" className="btn btn-mint btn-primary">ENTER </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <div className="card ">
                                            <img src="images/mastercard.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Sync</h5>
                                                <h5 className="card-text text-center mt-2">Unti Price : 5000 MNT</h5>
                                                <p className="card-text text-center mt-2">Total:50 NFT</p>
                                                <div className='px-4 mt-4'>
                                                    <a href="#" className="btn btn-mint btn-primary">ENTER</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <div className="card ">
                                           <img src="images/mastercard.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Quantum</h5>
                                                <h5 className="card-text text-center mt-2">Unti Price : 10000 MNT</h5>
                                                <p className="card-text text-center mt-2">Total : 100 NFT</p>
                                                <div className='px-4 mt-4'>
                                                    <a href="#" className="btn btn-mint btn-primary">ENTER </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                                        <div className="card ">
                                             <img src="images/mastercard.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Transact</h5>
                                                <h5 className="card-text text-center mt-2">Unti Price : 20000 MNT </h5>
                                                <p className="card-text text-center mt-2">Total : 200 NFT</p>
                                                <div className='px-4 mt-4'>
                                                    <a href="#" className="btn btn-mint btn-primary">ENTER </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 ">
                                        <div className="card ">
                                             <img src="images/mastercard.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title text-center">Synergy</h5>
                                                <h5 className="card-text text-center mt-2">Unti Price : 50000 MNT</h5>
                                                <p className="card-text text-center mt-2">Total : 500 NFT</p>
                                                <div className='px-4 mt-4'>
                                                    <a href="#" className="btn btn-mint btn-primary">ENTER</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            }

                        </div>

                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Autopool;
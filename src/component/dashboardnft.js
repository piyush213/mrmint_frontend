/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Dashboardheadernft from '../directives/dashboardheadernft';
import Dashboardsidebarnft from '../directives/dashboardsidebarnft';
import { getNFTstatisticsListAction, getstatisticsListNFTAction } from '../Action/user.action';
import { Link } from 'react-router-dom';
import config from '../coreFIles/config';

const Dashboardnft = () => {
  const [toggleSet, settoggleSet] = useState(1)
  const [statisticsList, setstatisticsList] = useState({});
  const [matchingBonus, setmatchingBonus] = useState({});
  const [isProcess, setisProcess] = useState(1);

  useEffect(() => {
    getNFTstatisticsListAPI();
    getMatchingBonusAPI();
  }, []);

  const toggleManage = (data) => {
    settoggleSet(data)
  }

  const getNFTstatisticsListAPI = async () => {
    let res = await getNFTstatisticsListAction();
    if (res.success) {
      setstatisticsList(res.data[0])
      setisProcess(0);
    }
  }

  const getMatchingBonusAPI = async () => {
    let res = await getstatisticsListNFTAction();
    if (res.success) {
      setmatchingBonus(res.data)
    }
  }

  return (
    <>
      <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
        <Dashboardsidebarnft />
        <div className="main-container">
          <Dashboardheadernft clickToggle={toggleManage} />
          <div className="content-wrapper-scroll">
            <div className="content-wrapper">

              {isProcess ?
                <img className='loaderImg' src="images/loader.gif" />
                :
                <div className="row mt-4">

                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <Link to={`${config.baseUrl}mymysterybox`} >
                      <div className="stats-tile">
                        <p></p>
                        <div className='d-flex'>
                          <div className="sale-icon shade-blue">
                            <i className="bi bi-box" />
                          </div>
                          <div className="sale-details">
                            <h3 className="text-white">{statisticsList ? parseInt(statisticsList.boxCount) : '0'} </h3>
                            <p>My Mystery Box</p>
                          </div>
                          <div className="sale-graph">
                            <div id="sparklineLine2" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>


                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <Link to={`${config.baseUrl}nftreferral`} >
                      <div className="stats-tile">
                        <p></p>
                        <div className='d-flex'>
                          <div className="sale-icon shade-green">
                            <i className="fa fa-users" />
                          </div>
                          <div className="sale-details">
                            <h3>${statisticsList ? parseFloat(statisticsList.nftReferral).toFixed(2) : '0.00'} </h3>
                            <p>Referral Earning</p>
                          </div>
                          <div className="sale-graph">
                            <div id="sparklineLine4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <Link to={`${config.baseUrl}mintingreward`} >
                      <div className="stats-tile">
                        <div className='d-flex'>
                          <div className="sale-icon shade-pink">
                            <i className="fa fa-database" />
                          </div>
                          <div className="sale-details">
                            <h3>{statisticsList ? parseFloat(statisticsList.mintingReward).toFixed(2) : '0.00'} MNT</h3>
                            <p>Mining Reward</p>
                          </div>
                          <div className="sale-graph">
                            <div id="sparklineLine1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <Link to={`${config.baseUrl}nftteamrefer`} >
                      <div className="stats-tile">
                        <p></p>
                        <div className='d-flex'>
                          <div className="sale-icon shade-green">
                            <i className="fa fa-users" />
                          </div>
                          <div className="sale-details">
                            <h3>${matchingBonus ? parseFloat(matchingBonus.totalEarning).toFixed(2) : '0.00'} </h3>
                            <p>Matching Bonus</p>
                          </div>
                          <div className="sale-graph">
                            <div id="sparklineLine4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <div className='d-flex'>
                        <div className="sale-icon shade-pink">
                          <i className="fa fa-database" />
                        </div>
                        <div className="sale-details">
                          <h3>{statisticsList ? parseInt(statisticsList.totalHashPower) : '0.00'}</h3>
                          <p>Total Hash Power</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <p></p>
                      <Link to={`${config.baseUrl}mynfts`} >
                      <div className='d-flex'>
                        <div className="sale-icon shade-green">
                          <i className="fa fa-file" />
                        </div>
                        <div className="sale-details">
                          <h3>{statisticsList ? parseInt(statisticsList.nftCount) : '0.00'} </h3>
                          <p>My NFTs</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine4" />
                        </div>
                      </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <p></p>
                      <div className='d-flex'>
                        <div className="sale-icon shade-pink">
                          <i className="fa fa-file" />
                        </div>
                        <div className="sale-details">
                          <h3>{statisticsList ? parseInt(statisticsList.autopool_balance) : '0.00'} MNT </h3>
                          <p>Autopool Earning</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <p></p>
                      <div className='d-flex'>
                        <div className="sale-icon shade-pink">
                          <i className="fa fa-database" />
                        </div>
                        <div className="sale-details">
                          <h3>{statisticsList ? parseInt(statisticsList.main_balance) : '0.00'} MNT </h3>
                          <p>Main Wallet</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine4" />
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
    </>
  )
}

export default Dashboardnft;
/* eslint-disable jsx-a11y/alt-text */

import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { getstatisticsListAction, getActivePhaseAction, getUpcomingEventsListAction, getAchieversAction } from '../Action/user.action';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper";

const Dashboard = () => {
  const [toggleSet, settoggleSet] = useState(1)
  const [activePhase, setActivePhase] = useState([]);
  const [statisticsList, setstatisticsList] = useState([]);
  const [upcomingEvents, setUpcomingEventsList] = useState([]);
  const [achievers, setAchieversList] = useState([]);

  useEffect(() => {
    getstatisticsListAPI();
    getUpcomingEventsListAPI();
    getActivePhaseAPI();
    getAchieversAPI();
  }, []);

  const getActivePhaseAPI = async () => {
    let res = await getActivePhaseAction();
    if (res.success) {
      setActivePhase(res.data);
    }
  }

  const getAchieversAPI = async () => {
    let res = await getAchieversAction();
    if (res.success) {
      setAchieversList(res.data);
    }
  }

  const toggleManage = (data) => {
    settoggleSet(data)
  }

  const getstatisticsListAPI = async () => {
    let res = await getstatisticsListAction();
    if (res.success) {
      setstatisticsList(res.data)
    }
  }

  const getUpcomingEventsListAPI = async () => {
    let res = await getUpcomingEventsListAction();
    if (res.success) {
      setUpcomingEventsList(res.data)
    }
  }

  return (
    <>
      <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
        <Dashboardsidebar />
        <div className="main-container mlmdashboard">
          <Dashboardheader clickToggle={toggleManage} />
          <div className="content-wrapper-scroll">
            <div className="content-wrapper">
              <div className="row mt-4">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="stats-tile">
                    <div className='d-flex'>
                      <div className="sale-icon shade-pink">
                        <i className="fa fa-database" />
                      </div>
                      <div className="sale-details">
                        <h3 className="text-white">{statisticsList.totalReferralEarning ? statisticsList.totalReferralEarning : '0.00'} MNT ~ </h3>
                        ${statisticsList ? parseFloat(statisticsList.totalReferralEarning * activePhase?.price).toFixed(2) : '0.00'}
                        <p>Direct Referral Earning</p>
                      </div>
                      <div className="sale-graph">
                        <div id="sparklineLine1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="stats-tile">
                    <div className='d-flex'>
                      <div className="sale-icon shade-blue">
                        <i className="fa fa-database" />
                      </div>
                      <div className="sale-details">
                        <h3 className="text-white">{statisticsList.totalEarning ? statisticsList.totalEarning : '0.00'} MNT ~ </h3>
                        ${statisticsList ? parseFloat(statisticsList.totalEarning * activePhase?.price).toFixed(2) : '0.00'}
                        <p>Block Expansion Earning</p>
                      </div>
                      <div className="sale-graph">
                        <div id="sparklineLine1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="stats-tile">
                    <div className='d-flex'>
                      <div className="sale-icon shade-red">
                        <i className="fa fa-database" />
                      </div>
                      <div className="sale-details">
                        <h3 className="text-white">{statisticsList.totalIncome ? parseFloat(statisticsList.totalIncome).toFixed(2) : '0.00'} MNT ~ </h3>
                        ${statisticsList ? parseFloat(statisticsList.totalIncome * activePhase?.price).toFixed(2) : '0.00'}
                        <p>Total Earning</p>
                      </div>
                      <div className="sale-graph">
                        <div id="sparklineLine1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="stats-tile">
                    <p></p>
                    <div className='d-flex'>
                      <div className="sale-icon shade-green">
                        <i className="fa fa-users" />
                      </div>
                      <div className="sale-details">
                        <h3>Block</h3>
                        <div className=''>
                          <p>Completed Block : {statisticsList.block ? statisticsList.block : '0'}</p>
                          <p>Active Block : {statisticsList.block ? statisticsList.block + 1 : '1'}</p>
                          <p>Level : {statisticsList.stage ? statisticsList.stage : '0'}</p>
                        </div>
                      </div>
                      <div className="sale-graph">
                        <div id="sparklineLine4" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className='row mt-2'>
                <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='card p-4'>
                    <h4 class="mb-4 heading">Upcomming Event List</h4>

                    <div className='upcomming-list'>
                      {upcomingEvents.map(data => (
                        <div class="card-container">
                          <div class="photo-container">
                            <div class="date">
                              <div class="day">{data.created_at_date}</div>
                              <div class="month">{data.created_at_month}</div>
                            </div>
                            <div class="image"></div>
                          </div>
                          <div class="info-container">
                            <div class="event-name">
                              <a target="_blank" href={`${config.baseUrl}Blogdetail/` + data.title_url} rel="noreferrer">
                                {data.title.length > 30 ?
                                  data.title.substring(0, 30) + `....`
                                  :
                                  data.title
                                }
                              </a>
                            </div>
                            <div class="event-location">
                              {data.description.length > 80 ?
                                <>
                                  <div dangerouslySetInnerHTML={{ __html: data.description.substring(0, 80) + `....` }} />
                                </>
                                :
                                <>
                                  <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                </>
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
                <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='card p-4 '>
                    <h4 class="mb-4 heading">Achiever</h4>
                    <Swiper autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                      navigation={true}
                      modules={[Navigation]}
                      className="mySwiper">

                      {achievers.map(data => (
                        <SwiperSlide>
                          <div class="row align-items-center pl-3 pr-3">
                            <div class="col-sm-4">
                               <img className='achImg' src={`${config.imageUrl + data.images}`} />
                               <h5 className='mt-2 mb-0'>{data.name}</h5>
                            </div>
                            <div class="col-sm-8 text-left">
                               <p>Rank: #{data.designation}</p>
                              <div class="para mt-1">
                                 <div dangerouslySetInnerHTML={{ __html: data.bio }} />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;
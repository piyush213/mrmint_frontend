import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { getTeamReferralAction, getstatisticsListAction, getActivePhaseAction, getNodesListAction } from '../Action/user.action';
import ReactDatatable from '@ashvin27/react-datatable';

const Teamrefer = () => {
  const [toggleSet, settoggleSet] = useState(1)
  const [activePhase, setActivePhase] = useState([]);
  const [teamReferral, setTeamReferral] = useState([]);
  const [statisticsList, setstatisticsList] = useState([]);
  const [isload, setisload] = useState(1);
  const [nodesList, setNodesList] = useState('');

  useEffect(() => {
    getstatisticsListAPI();
    getTeamReferralAPI();
    getActivePhaseAPI();
    getNodesListAPI();
  }, []);

  const getActivePhaseAPI = async () => {
    let res = await getActivePhaseAction();
    if (res.success) {
      setActivePhase(res.data);
    }
  }

  const getNodesListAPI = async () => {
    let res = await getNodesListAction();
    if (res.success) {
      setNodesList(res.data);
    }
  }

  const getstatisticsListAPI = async () => {
    let res = await getstatisticsListAction();
    if (res.success) {
      setstatisticsList(res.data)
    }
  }

  const getTeamReferralAPI = async () => {
    let res = await getTeamReferralAction();
    if (res.success) {
      setisload(0);
      setTeamReferral(res.data)
    }
  }

  const toggleManage = (data) => {
    settoggleSet(data)
  }

  const columnsForWallet = [
    {
      key: "sn",
      text: "#",
      cell: (row, index) => index + 1
    },
    {
      key: "email",
      text: "Email",
      cell: (item) => {
        return (
          `${item.email}`
        );
      }
    },
    {
      key: "referred_by",
      text: "Referred By",
      cell: (item) => {
        return (
          `${item.referred_by}`
        );
      }
    },
    {
      key: "created_at",
      text: "Joining Date",
      cell: (item) => {
        return (
          item.created_at
        );
      }
    }
  ];

  const configForWallet = {
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

  const columnsRef = [
    {
      key: "sn",
      text: "#",
      cell: (row, index) => `${index + 1}`
    },
    {
      key: "email",
      text: "Email",
      cell: (item) => {
        return (
          `${item.email}`
        );
      }
    },
    {
      key: "bnb_address",
      text: "Address",
      cell: (item) => {
        return (
          <>
            <a style={{ color: '#5b6be0', fontWeight: "500" }} target="_blank" href={`https://bscscan.com/address/${item.bnb_address}`} rel="noreferrer"> {item.bnb_address.toString().substring(0, 5) + '...' + item.bnb_address.toString().substr(item.bnb_address.length - 5)} </a>
          </>
        );
      }
    },
    {
      key: "Business",
      text: "Business",
      cell: (item) => {
        return (
          <>
            {item.totalBusiness ? item.totalBusiness : 0} MNT ( { item.totalBusiness && teamReferral.length > 0 ? parseFloat( 100 * item.totalBusiness / teamReferral[0].totalDeposit).toFixed(2) + '%' : '0%'} ) 
          </>
        );
      }
    },
    {
      key: "created_at",
      text: "Joining Date",
      cell: (item) => {
        return (
          `${item.created_at}`
        );
      }
    },
    {
      key: "view",
      text: "Team List",
      cell: (item) => {
        return (
          <>
            <a href={`${config.baseUrl}teamList/`+item.id}>
              <button className='btn btn-primary btn-sm'>View</button>
            </a>
          </>
        );
      }
    },

  ];

  const configRef = {
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

  return (

    <>
      <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
        <Dashboardsidebar />
        <div className="main-container">
          <Dashboardheader clickToggle={toggleManage} />
          <div className="content-wrapper-scroll">
            <div className="content-wrapper">
              <div className='container referral'>
                <div className="row mt-4">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <div className='d-flex'>
                        <div className="sale-icon shade-pink">
                          <i className="fa fa-align-justify" />
                        </div>
                        <div className="sale-details">
                          <p>{statisticsList.currentPlan ? statisticsList?.currentPlan : 'No Plan Activated'}</p>
                          <h3>Active Plan</h3>
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
                      <div className='d-flex'>
                        <div className="sale-icon shade-yellow">
                          <i className="fa fa-dollar" />
                        </div>
                        <div className="sale-details">
                          <h3 className="text-white">{isload ?
                            <div class="spinner-border spinner-border-sm"></div>
                            :
                            teamReferral ? parseFloat(teamReferral[0].totalDeposit).toFixed(2) + ' MNT ~ $' + parseFloat(teamReferral[0].totalDeposit * activePhase?.price).toFixed(2) : '0.00 MNT ~ $0.00'
                          }</h3>
                          <p className='teamRefBlog'>Total Business</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine3" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <p></p>
                      <div className='d-flex'>
                        <div className="sale-icon shade-blue">
                          <i className="bi bi-wallet" />
                        </div>
                        <div className="sale-details">
                          <h3 className="text-white">{isload ?
                            <div class="spinner-border spinner-border-sm"></div>
                            :
                            statisticsList.totalEarning ? parseFloat(statisticsList.totalEarning).toFixed(2) + ' MNT ~ $' + parseFloat(statisticsList.totalEarning * activePhase?.price).toFixed(2) : '0.00 MNT ~ $0.00'}</h3>
                          <p className='teamRefBlog'>Total Block Expansion Income</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <div className='d-flex'>
                        <div className="sale-icon shade-pink">
                          <i className="fa fa-th-large" />
                        </div>
                        <div className="sale-details">
                          <h3 className="text-white">{isload ?
                            <div class="spinner-border spinner-border-sm"></div>
                            :
                            statisticsList.block ? statisticsList.block : '0'}</h3>
                          <p className='teamRefBlog'>Total Block Completed</p>
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
                      <div className='d-flex'>
                        <div className="sale-icon shade-blue">
                          <i className="bi bi-wallet" />
                        </div>
                        <div className="sale-details">
                          <h3>Current</h3>
                          <div className=''>
                            <p className='teamRefBlog'>Block : &nbsp;
                              {isload ?
                                <div class="spinner-border spinner-border-sm"></div>
                                :
                                statisticsList.block ? parseInt(statisticsList.block)+1 : '1'}
                            </p>
                            <p className='teamRefBlog'>Level : &nbsp;
                              {isload ?
                                <div class="spinner-border spinner-border-sm"></div>
                                :
                                statisticsList.stage ? statisticsList.stage : '0'}
                            </p>
                          </div>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                    <div className="stats-tile">
                      <p></p>
                      <div className='d-flex'>
                        <div className="sale-icon shade-yellow">
                          <i className="fa fa-users" />
                        </div>
                        <div className="sale-details">
                          <h3 className="text-white">{isload ?
                            <div class="spinner-border spinner-border-sm"></div>
                            :
                            teamReferral.length > 0? teamReferral.length : '0' 
                            } </h3>
                          <p className='teamRefBlog'>Total Team Members</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pt-3">
                    <div className='row'>
                      <div className='col-lg-12 text-left mb-2'>
                        <div className="custom-tabs-container">
                          <ul className="nav nav-tabs m-0" id="customTab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <a className="nav-link active" id="tab-one" data-bs-toggle="tab" href="#one" role="tab" aria-controls="one" aria-selected="true">Team Refer</a>
                            </li>
                            <li className="nav-item" role="presentation">
                              <a className="nav-link" id="tab-two" data-bs-toggle="tab" href="#two" role="tab" aria-controls="two" aria-selected="false">Nodes</a>
                            </li>
                          </ul>
                          <div className="tab-content" id="customTabContent">
                            <div className="tab-pane fade active show" id="one" role="tabpanel">

                              <ReactDatatable
                                config={configForWallet}
                                records={teamReferral}
                                columns={columnsForWallet}
                              />

                            </div>
                            <div className="tab-pane fade" id="two" role="tabpanel">
                              <ReactDatatable
                                config={configRef}
                                records={nodesList}
                                columns={columnsRef}
                              />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
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
export default Teamrefer;
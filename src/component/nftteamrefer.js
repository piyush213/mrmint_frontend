/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheader from '../directives/dashboardheadernft';
import Dashboardsidebar from '../directives/dashboardsidebarnft';
import { getnftTeamReferralAction, getstatisticsListNFTAction, getActivePhaseAction, getnftNodesListAction, getDailyRewardAction } from '../Action/user.action';
import ReactDatatable from '@ashvin27/react-datatable';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Teamrefer = () => {
  const [toggleSet, settoggleSet] = useState(1)
  const [activePhase, setActivePhase] = useState([]);
  const [teamReferral, setTeamReferral] = useState([]);
  const [statisticsList, setstatisticsList] = useState([]);
  const [isload, setisload] = useState(1);
  const [nodesList, setNodesList] = useState('');
  const [dailyBonus, setdailyBonus] = useState([]);
  const [flitereddailyBonus, setflitereddailyBonus] = useState([]);
  const [search, setsearch] = useState(true);
  const [tabActive, settabActive] = useState(1);
  const [form, setForm] = useState({ from_date: '', to_date: '' });
  const [dateError, setDateError] = useState()
  useEffect(() => {
    getnftstatisticsListAPI();
    getTeamReferralAPI();
    getActivePhaseAPI();
    getNodesListAPI();
    getDailyRewardAPI();
  }, []);

  const getActivePhaseAPI = async () => {
    let res = await getActivePhaseAction();
    if (res.success) {
      setActivePhase(res.data);
    }
  }

  const inputHandler = async (e) => {
    const { name, value } = e.target
    if (name == "from_date" || name == "to_date") {
      setDateError("")
    }
    setForm((old) => {
      return { ...old, [name]: value }
    })
  }

  const getNodesListAPI = async () => {
    let res = await getnftNodesListAction();
    if (res.success) {
      setNodesList(res.data);
    }
  }

  const getDailyRewardAPI = async () => {
    let res = await getDailyRewardAction();
    if (res.success) {
      setdailyBonus(res.data);
      setflitereddailyBonus(res.data)
    }
  }

  const getnftstatisticsListAPI = async () => {
    let res = await getstatisticsListNFTAction();
    if (res.success) {
      setstatisticsList(res.data)
    }
  }

  const getTeamReferralAPI = async () => {
    let res = await getnftTeamReferralAction();
    if (res.success) {
      setisload(0);
      setTeamReferral(res.data)
    } else {
      setisload(0)
    }
  }

  const toggleManage = (data) => {
    settoggleSet(data)
  }

  const changeTab = (type) => {
    settabActive(type)
  }

  const resetButton = (e) => {
    e.preventDefault();
    setForm({
      from_date:"",
      to_date:""
    })
    setsearch(true)

    setflitereddailyBonus(dailyBonus)
  }

  const getUsersList = async (e) => {
    e.preventDefault();
    if (form.to_date == "" || form.from_date == "") {
      setDateError("Selected date cannot be empty")
      return
    }
  
    const filteredBonus = dailyBonus.filter((obj) => {
      return obj.onlydate >= form.from_date && obj.onlydate <= form.to_date;
    });
    setflitereddailyBonus(filteredBonus)
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
      text: "Total Business",
      cell: (item) => {
        return (
          <>
            ${item.totalBusiness ? item.totalBusiness : 0}
          </>
        );
      }
    },
    {
      key: "Business",
      text: "Remaining Amount",
      cell: (item) => {
        return (
          <>
            ${item.remaining_balance ? item.remaining_balance : 0}
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
            <a href={`${config.baseUrl}nftteamList/` + item.id}>
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

  const columnsBonus = [
    {
      key: "sn",
      text: "#",
      cell: (row, index) => `${index + 1}`
    },
    {
      key: "Type",
      text: "Type",
      cell: (item) => {
        return (
          <>
            {item.description ? item.description : 0}
          </>
        );
      }
    },

    {
      key: "Amount",
      text: "Amount",
      cell: (item) => {
        return (
          <>
            ${item.usd_amount ? item.usd_amount : 0}
          </>
        );
      }
    },
    {
      key: "created_at",
      text: "Date",
      cell: (item) => {
        return (
          `${item.date}`
        );
      }
    },

  ];

  const configBonus = {
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
                            nodesList.length > 0 ? '$' + parseFloat(nodesList[0].teamBusiness).toFixed(2) : '$0.00'
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
                            statisticsList.totalEarning ? '$' + parseFloat(statisticsList.totalEarning).toFixed(2) : '$0.00'}</h3>
                          <p className='teamRefBlog'>Matching Bonus</p>
                        </div>
                        <div className="sale-graph">
                          <div id="sparklineLine2" />
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
                          <div className='container'>
                            <div className='nav-tabs'>
                              <div className='row'>
                                <div className='col-lg-5'>
                                  <ul className="nav  m-0 mt-2" id="customTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                      <a  className={tabActive == 1 ? "nav-link active" : "nav-link"} id="tab-one" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="one" aria-selected="true" onClick={() => changeTab(1)} >Team List</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                      <a className={tabActive == 2 ? "nav-link active" : "nav-link"} id="tab-two" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="two" aria-selected="false" onClick={() => changeTab(2)}>Nodes</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                      <a className={tabActive == 3 ? "nav-link active" : "nav-link"} id="tab-two" data-bs-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="two" aria-selected="false" onClick={() => changeTab(3)}>Bonus History</a>


                                    </li>
                                  </ul>



                                </div>
                                {tabActive == 3 ?
                                  <div className='col-lg-7'>
                                    <div className='datalistbox text-right mt-2' id='datalistboxid'>
                                      <div className='forminner-left'>
                                        <form action="/action_page.php" method="get" id="dataformid" className=''>
                                          <Row className='d-flex align-items-center mb-1'>
                                            <Col>
                                              <div className='d-flex align-items-center'>
                                                <label className="form-label">
                                                  From
                                                </label>&nbsp;&nbsp;
                                                <input type="date" id="datepickerone1" className='form-control' name='from_date' value={form.from_date} onChange={inputHandler} placeholder='dd/mm/yy' required />
                                              </div>
                                            </Col>
                                            <Col>
                                              <div className='d-flex align-items-center'>
                                                <label className="form-label">
                                                  To
                                                </label>&nbsp;&nbsp;
                                                <input type="date" id="datepickertwo2" className='form-control' name='to_date' value={form.to_date} onChange={inputHandler} placeholder='dd/mm/yy' required />
                                              </div>
                                            </Col>
                                            <Col>
                                              <div className='d-flex align-items-center'>
                                                <button
                                                  onClick={resetButton}
                                                  className='btn btn-primary'
                                                >Reset</button>&nbsp;&nbsp;

                                                <button className='btn btn-primary' onClick={getUsersList}>Search</button>
                                              </div>
                                            </Col>

                                          </Row>


                                        </form>
                                        <span className='text-danger'>{dateError}</span>
                                      </div>
                                    </div>

                                  </div>
                                  : ""}


                              </div>

                            </div>
                          </div>


                          <div>

                          </div>

                          <div className="tab-content" id="customTabContent">
                            {tabActive == 1 ?
                              <ReactDatatable
                                config={configForWallet}
                                records={teamReferral}
                                columns={columnsForWallet}
                              />
                              : ""}
                          </div>
                          {tabActive == 2 ?
                            <ReactDatatable
                              config={configRef}
                              records={nodesList}
                              columns={columnsRef}
                            />
                            : ""}
                          {tabActive == 3 ? <>

                            <div className=''>
                              <ReactDatatable
                                config={configBonus}
                                records={flitereddailyBonus}
                                columns={columnsBonus}
                              />
                            </div>
                          </>
                            : ""}
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
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import { getstatisticsListAction, getActivePhaseAction } from '../Action/user.action';
import { Chart } from "react-google-charts";

const TokenomicsData = [
  ["Task", "Hours per Day"],
  ["Private Sale", 5],
  ["Pre-sale", 15],
  ["Public Sale", 20],
  ["Marketing", 10],
  ["Referral", 2],
  ["R & D", 1],
  ["Airdrop", 1],
  ["Liquidity Staking", 12],
  ["Ecosystem", 7],
  ["Reserve", 4],
  ["Team", 18],
  ["Charity", 1],
  ["Advisory", 4],

];

const Dashboard = () => {
  const [toggleSet, settoggleSet] = useState(1)
  const [activePhase, setActivePhase] = useState([]);
  const [statisticsList, setstatisticsList] = useState([]);

  useEffect(() => {
    getstatisticsListAPI();
    getActivePhaseAPI();
  }, []);

  const getActivePhaseAPI = async () => {
    let res = await getActivePhaseAction();
    if (res.success) {
      setActivePhase(res.data);
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
  return (
    <>
      <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
        <Dashboardsidebar />
        <div className="main-container">
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
                        <h3 className="text-white">{statisticsList.totalStakingEarning ? statisticsList.totalStakingEarning : '0.00'} MNT ~ </h3>
                        ${statisticsList ? parseFloat(statisticsList.totalStakingEarning * activePhase?.price).toFixed(2) : '0.00'}
                        <p>Staking Earning</p>
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
                      <div className="sale-icon shade-blue">
                        <i className="bi bi-wallet" />
                      </div>
                      <div className="sale-details">
                        <h3 className="text-white">{statisticsList.totalWithdraw ? statisticsList.totalWithdraw : '0.00'} MNT ~ </h3>
                        ${statisticsList ? parseFloat(statisticsList.totalWithdraw * activePhase?.price).toFixed(2) : '0.00'}
                        <p>Total Withdraw</p>
                      </div>
                      <div className="sale-graph">
                        <div id="sparklineLine2" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <div className="stats-tile">
                    <p></p>
                    <div className='d-flex'>
                      <div className="sale-icon shade-yellow">
                        <i className="fa fa-credit-card-alt" />
                      </div>
                      <div className="sale-details">
                        <h3 className="text-white">{statisticsList.totalBuy ? statisticsList.totalBuy : '0.00'} MNT ~ </h3>
                        ${statisticsList ? parseFloat(statisticsList.totalBuy * activePhase?.price).toFixed(2) : '0.00'}
                        <p>Purchased Token</p>
                      </div>
                      <div className="sale-graph">
                        <div id="sparklineLine3" />
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
                        <h3 className="text-white">{statisticsList.totalReferralEarning ? statisticsList.totalReferralEarning : '0.00'} MNT ~ </h3>
                        ${statisticsList ? parseFloat(statisticsList.totalReferralEarning * activePhase?.price).toFixed(2) : '0.00'}
                        <p>Referral Income</p>
                      </div>
                      <div className="sale-graph">
                        <div id="sparklineLine4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-4 col-md-6 col-sm-6 col-12">
                  <div className="card boxHeight">
                    <div className="card-header">
                      <div className="card-title">MrMint Tokenomics</div>
                    </div>
                    <div className='tokenChart'>
                      <Chart
                        chartType="PieChart"
                        data={TokenomicsData}
                        width={"100%"}
                        height={"100%"}

                      />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-8 col-md-6 col-sm-6 col-12">
                  <div className="card pt-0 pb-2 boxHeight">
                    <div className="card-header">
                      <div className="card-title mb-2">Token Information</div>
                    </div>

                    <div className="card-body">
                      <div className="content last-box-content">
                        <dl>
                          <dt>Decimal</dt>
                          <dd>
                            <a target="blank">
                              <span className="account-balance">18</span>
                            </a>
                          </dd>
                          <dt>Total Supply</dt>
                          <dd style={{ color: "rgb(108, 114, 147)" }}>
                            <span className="account-balance">1,000,000,000</span>
                          </dd>
                          <dt>Private Sale Price</dt>
                          <dd style={{ color: "rgb(108, 114, 147)" }}>
                            <span className="account-balance">$0.054</span>
                          </dd>
                          <dt>Pre- Sale price</dt>
                          <dd style={{ color: "rgb(108, 114, 147)" }}>
                            <span className="account-balance">$0.094</span>
                          </dd>
                          <dt>Public Sale Price</dt>
                          <dd style={{ color: "rgb(108, 114, 147)" }}>
                            <span className="account-balance">$0.15</span>
                          </dd>
                          <dt>Accepted Currency</dt>
                          <dd style={{ color: "rgb(108, 114, 147)" }}>
                            <span className="account-balance">BNB</span>
                          </dd>
                          <dt>Website URL</dt>
                          <dd style={{ color: "rgb(108, 114, 147)" }}>
                            <span className="account-balance">https://mrmint.io/</span>
                          </dd>
                        </dl>
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

export default Dashboard;
import React from 'react'
import config from '../coreFIles/config'

const Dashboardsidebar = (props) => {

  let url = window.location.href;
  let result = url.split('/');
  let Param = result[result.length - 1];
  let Param2 = result[result.length - 2];
  return (

    <>

      <nav className="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href={`${config.homeurl}`} className="logo">
            <img src="dashboardFolder/img/logo.png" alt="Mrmint Dashboard" />
          </a>
        </div>
        <div className="sidebar-menu">
          <div className="sidebarMenuScroll">
            <ul>

              {Param == 'mlmdashboard' || Param == 'directrefer' || Param == 'teamrefer' || Param == 'reward' || Param2 == 'teamList' ?
                <>
                  <li className=" active">
                    <a href={`${config.baseUrl}mlmdashboard`} className="menuLink">
                      <i className="bi bi-house" />
                      <span className="menu-text">Dashboard</span>
                    </a>

                  </li>
                  <li className="">
                    <a href={`${config.baseUrl}directrefer`} className="menuLink">
                      <i className="fa fa-users" />
                      <span className="menu-text">Direct Refferal</span>
                    </a>

                  </li>
                  <li className="">
                    <a href={`${config.baseUrl}teamrefer`} className="menuLink">
                      <i className="fa fa-th-large" />
                      <span className="menu-text">Block Expansion</span>
                    </a>

                  </li>
                  <li className="">
                    <a href={`${config.baseUrl}reward`} className="menuLink">
                      <i className="fa fa-align-justify" />
                      <span className="menu-text">Reward & Allocation</span>
                    </a>
                  </li>
                </>
                :
                <>
                  <li className=" ">
                    <a href={`${config.baseUrl}dashboard`} className="menuLink">
                      <i className="bi bi-house" />
                      <span className="menu-text">Dashboard</span>
                    </a>

                  </li>

                  <li>
                    <a href={config.coinstoreurl} target="_blank" className="menuLink" rel="noreferrer">
                      <i className="bi bi-wallet" />
                      <span className="menu-text">Buy MNT</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}mntwallet`} className="menuLink">
                      <i className="bi bi-wallet" />
                      <span className="menu-text">MNT Wallet</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}vestingwallet`} className="menuLink">
                      <i className="bi bi-wallet" />
                      <span className="menu-text">Vesting Wallet</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}staking`} className="menuLink">
                      <i className="fa fa-database" />
                      <span className="menu-text">Staking</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}withdraw`} className="menuLink">
                      <i className="fa fa-credit-card-alt" />
                      <span className="menu-text">Withdraw</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}phase`} className="menuLink">
                      <i className="fa fa-exchange" />
                      <span className="menu-text">Phase</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}referral`} className="menuLink">
                      <i className="fa fa-users" />
                      <span className="menu-text">Referral</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}earnhistory`} className="menuLink">
                      <i className="fa fa-align-justify" />
                      <span className="menu-text">Earning History</span>
                    </a>
                  </li>

                
                
                  <li>
                    <a href={`${config.baseUrl}support`} className="menuLink">
                      <i className="bi bi-headset" />
                      <span className="menu-text">Support</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}changepassword`} className="menuLink">
                      <i className="fa fa-lock" />
                      <span className="menu-text">Change Password</span>
                    </a>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>
    </>

  )

}
export default Dashboardsidebar;
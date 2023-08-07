import React, { Component, useEffect, useState } from 'react'
import config from '../coreFIles/config'
import $ from 'jquery'
const Dashboardsidebarnft = (props) => {

  let url = window.location.href;
  let result = url.split('/');
  let Param = result[result.length - 1];
  let Param2 = result[result.length - 2];

  $("body").addClass("dashboardsidebarnft");




  return (

    <>

      <nav className="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href={config.nfthomeurl} className="logo">
            <img src="dashboardFolder/img/nftlogo.png" alt="Mrmint Nft Dashboard" />
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
                    <a href={`${config.baseUrl}dashboardnft`} className="menuLink">
                      <i className="bi bi-house" />
                      <span className="menu-text">Dashboard</span>
                    </a>

                  </li>

                  <li>
                    <a href={`${config.baseUrl}mining`} className="menuLink">
                      <i className="bi bi-hammer" />
                      <span className="menu-text">Mining</span>
                    </a>
                  </li>


                  <li>
                    <a href={`${config.baseUrl}mymysterybox`} className="menuLink">
                      <i className="bi bi-box" />
                      <span className="menu-text">My mystery box</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}mynfts`} className="menuLink">
                      <i className="bi bi-image-alt" />
                      <span className="menu-text">My Nfts</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}myrig`} className="menuLink">
                      <i className="bi bi-motherboard" />
                      <span className="menu-text">My Rig</span>
                    </a>
                  </li>

                  <li>
                    <a href={`${config.nfthomeurl}nftmarketplace`} className="menuLink">
                    <i class="bi bi-shop"></i>
                      <span className="menu-text">NFT Marketplace</span>
                    </a>
                  </li>

                  <li>
                    <a href={`${config.baseUrl}nftwallet`} className="menuLink">
                      <i className="bi bi-wallet" />
                      <span className="menu-text">Wallet</span>
                    </a>
                  </li>
                  
                  <li>
                    <a href={`${config.baseUrl}mntdeposit`} className="menuLink">
                    <i className="bi bi-credit-card-2-back-fill"></i>
                      <span className="menu-text">Deposit MNT</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}autopoolwallet`} className="menuLink">
                      <i className="bi bi-wallet" />
                      <span className="menu-text">Autopool</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.nftFront}#buynfts`} className="menuLink">
                      <i className="bi bi-wallet" />
                      <span className="menu-text">Buy Now</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${config.baseUrl}mintingreward`} className="menuLink">
                      <i className="bi bi-wallet" />
                      <span className="menu-text">Minting Reward</span>
                    </a>
                  </li>

                  <li>
                    <a href={`${config.baseUrl}nftreferral`} className="menuLink">
                      <i className="fa fa-users" />
                      <span className="menu-text">Referral</span>
                    </a>
                  </li>

                  <li className="">
                    <a href={`${config.baseUrl}nftteamrefer`} className="menuLink">
                      <i className="fa fa-th-large" />
                      <span className="menu-text">Matching Bonus</span>
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
export default Dashboardsidebarnft;
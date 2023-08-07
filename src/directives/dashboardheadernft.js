/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie'
import { allnotificationlistAction, getProfileAction, getcountofunreadnotificationAction, getlatestnotificationAction, marknotificationasreadAction } from '../Action/user.action';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
var Web3 = require('web3');


const Dashboardheadernft = (props) => {
  const [userDetails, setuserDetails] = useState([]);
  const [toogleData, settoogleData] = useState(1);
  const [menuname, setmenuname] = useState(1);
  const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
  const [livePrice, setLivePrice] = useState(0);
  const [latestnotification, setlatestnotification] = useState([]);
  const [notificationcount, setnotificationcount] = useState([]);
  const [notificationmsg, setnotificationmsg] = useState('')

  let url = window.location.href;
  let result = url.split('/');
  let Param = result[result.length - 1];

  useEffect(() => {
    
    if (!loginData || loginData == '') {
      window.location.href = `${config.nftFront}`;
    }

    setInterval(async () => {
      await axios({
        method: 'get',
        url: `https://api.coinstore.com/api/v1/market/trade/MNTUSDT?size=1`,
      }).then(response => {
        setLivePrice(response.data.data[0].price);
      })
    }, 1000);

    getProfileAPI()

    let menuName = '';
    if (Param == 'dashboard') { menuName = 'Dashboard' }
    else if (Param == 'mlmdashboard') { menuName = 'Dashboard' }
    else if (Param == 'buy') { menuName = 'Buy' }
    else if (Param == 'mntwallet') { menuName = 'MNT Wallet' }
    else if (Param == 'vestingwallet') { menuName = 'Vesting Wallet' }
    else if (Param == 'staking') { menuName = 'Staking' }
    else if (Param == 'withdraw') { menuName = 'Withdraw' }
    else if (Param == 'phase') { menuName = 'Phase' }
    else if (Param == 'referral') { menuName = 'Referral' }
    else if (Param == 'depositmnt') { menuName = 'Deposit MNT' }
    else if (Param == 'buyhistory') { menuName = 'Buy History' }
    else if (Param == 'earnhistory') { menuName = 'Earning History' }
    else if (Param == 'changepassword') { menuName = 'Change Password' }
    else if (Param == 'profile') { menuName = 'Profile' }
    else if (Param == 'teamrefer') { menuName = 'Block Expansion' }
    else if (Param == 'mintingreward') { menuName = 'Minting Reward' }
    else if (Param == 'autopoolwallet') { menuName = 'Autopool Wallet' }

    setmenuname(menuName);
    getlatestnotification()
    getnotificationcount()
  }, [])

  const getallnotification = async () => {
    let res = await allnotificationlistAction();
    if (res.status === false) {
      setnotificationmsg(res.msg)
    }
  }

  window.onload = function () {
    var today = new Date();
    var tod = today.setMinutes(today.getMinutes());
    var todayby1 = today.setMinutes(today.getMinutes() + 60 // in minutes
    );
    var todayby2 = tod
    setInterval(() => {
      todayby2 += 1000
      if (todayby2 > todayby1) {
        Cookies.remove('loginType');
        Cookies.remove('loginType');

        Cookies.remove('loginType', { domain: 'mrmint.io' });
        Cookies.remove('loginType', { domain: 'nft.mrmint.io' });
        Cookies.remove('loginSuccessMrMint');
        Cookies.remove('loginSuccessMrMint');

        Cookies.remove('loginSuccessMrMint', { domain: 'mrmint.io' });
        Cookies.remove('loginSuccessMrMint', { domain: 'nft.mrmint.io' });
        window.localStorage.clear();
        setTimeout(() => {
          window.location.href = `${config.baseUrl}`
        });
      }
    }, 1000);
  }

  const getProfileAPI = async () => {
    let res = await getProfileAction();
    if (res.success) {
      setuserDetails(res.data)
    }
  }

  const getlatestnotification = async () => {
    let res = await getlatestnotificationAction();
    if (res.status) {
      setlatestnotification(res.data)
    }
  }

  const handleRead = async (item) => {
    let res = await marknotificationasreadAction({ notification_id: item.id});
    if (res.status) {
        setTimeout(() => {
          window.location.href = `${config.baseUrl}${item.url}`
      }, 500);
    } else {
        toast.error(res.msg);
    }
};

  const getnotificationcount = async () => {
    let res = await getcountofunreadnotificationAction();
    if (res.status) {
      setnotificationcount(res.data)
    }
  }

  const toggledClick = async (e) => {
    if (e == 1) {
      settoogleData(2)
      props.clickToggle(2)
    }
    else if (e == 2) {
      settoogleData(1)
      props.clickToggle(1)
    }
  }

  const logout = async () => {
    Cookies.remove('loginType');
    Cookies.remove('loginType', { domain: 'mrmint.io' });
    Cookies.remove('loginType', { domain: 'nft.mrmint.io' });

    Cookies.remove('loginSuccessMrMint');
    Cookies.remove('loginSuccessMrMint', { domain: 'mrmint.io' });
    Cookies.remove('loginSuccessMrMint', { domain: 'nft.mrmint.io' });

    window.localStorage.clear();
    setTimeout(() => {
      window.location.href = `${config.nftFront}`
    });
  }

 

  const importToken = async () => {
    const tokenAddress = '0x3e81Aa8d6813Ec9D7E6ddB4e523fb1601a0e86F3';
    const tokenSymbol = 'MNT';
    const tokenDecimals = 18;
    const tokenImage = 'https://mrmint.io/images/coin_banner_big.png';

    try {
      let web3 = '';
      web3 = new Web3(window.ethereum);
      let currentNetwork = web3.currentProvider.chainId;
      if (currentNetwork != config.chainId) {
        toast.error(`Please select BNB smartchain!!`);
        return false;
      }
      if (window.ethereum) {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
        });
        if (wasAdded) {
        } else {
        }
      }
    } catch (error) {
    }
  }

  return (
    <>
      <Toaster />
      <div className="page-header">
        <div className="toggle-sidebar" id="toggle-sidebar" onClick={e => toggledClick(toogleData)}>
          <i className="bi bi-list" />
        </div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <i className="bi bi-house" />
            <a href={`${config.baseUrl}dashboardnft`}>Home</a>
          </li>
          <li className="breadcrumb-item breadcrumb-active" aria-current="page">
            {menuname}
          </li>
        </ol>
        <div className='mt-2 mb-2'>
          <a href={`${config.baseUrl}dashboard`} className='btn btn-mint btn-primary '>MNT Dashboard </a> &nbsp;
          <button onClick={importToken} className='btn btn-mint btn-primary '> Import MNT</button>
          <span>          Live Price <a target="_blank" href={config.coinstoreurl} rel="noreferrer"><img src='https://mrmint.io/images/coin_banner_big.png' height="32px" width="32px"  alt='coin_banner_big'/> <b> ${livePrice ? livePrice : '0'} </b> </a>
          </span>
        </div>

        <div className="header-actions-container">


          {Param == 'mlmdashboard' || Param == 'directrefer' || Param == 'teamrefer' || Param == 'reward' ?
            <div>Rank : {userDetails?.rank_name ?
              <>&nbsp;
                {userDetails?.rank_name}&nbsp;
                <img alt='' src={`assets/images/${userDetails?.badge}`} width="18px" />
              </>
              :

              <>
                Beginner &nbsp;
                <img alt='' src={`assets/images/beginner.png`} width="18px" />
              </>
            } </div>
            : ""}
          Registered Wallet :&nbsp; <a style={{ fontWeight: "500" }} target="_blank" href={`https://bscscan.com/address/${loginData?.bnb_address}`} rel="noreferrer"> {loginData?.bnb_address.toString().substring(0, 5) + '...' + loginData?.bnb_address.toString().substr(loginData?.bnb_address.length - 5)} </a>
          <div>
            <Dropdown className="d-inline mx-2 notification_dropdown">
              <Dropdown.Toggle id="dropdown-autoclose-true" className='btn btn-transparent p-0'>
                <a href="javascript:void(0); " class="leads">
                  <span class="lead-icon">
                    <i class="bi bi-bell-fill animate__animated  animate__infinite infinite"></i>
                    {notificationcount.map((item)=>(
                    item.count==0?"":<b class="dot animate__animated  animate__infinite">{item.count}</b> 
                    ))}
                  </span>
                </a>

              </Dropdown.Toggle>

              <Dropdown.Menu className='notify-drop'>

                <div class="notify-drop-title">
                  <div class="row">
                    {notificationcount.map((item)=>(
                    <div class="col-md-6 col-sm-6 col-xs-6">Notifications (<b>{item.count}</b>)</div>
                    ))}
                  </div>
                </div>

                <div class="drop-content">
                {notificationmsg == "" ? ""
                    : <li style={{ cursor: "auto" }}>
                      <span >
                        {notificationmsg}
                      </span>
                    </li>}
                  {latestnotification.map((item)=> (
                  <li  >
                     <div class="col-md-12 col-sm-12 col-xs-12 pd-l0"
                     
                     onClick={()=>handleRead(item)}>  {item.detail} <a onClick={()=>handleRead(item)}  className={item.is_read == 0?"text-pink rIcon":"rIcon"}><i  class="fa fa-dot-circle-o"></i></a>
                    </div>
                  </li>
                    ))}
                </div>
                <div class="notify-drop-footer text-center">
                  <a href={`${config.baseUrl}notification`}><i class="fa fa-eye"></i> View more</a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <ul className="header-actions">
            <li className="dropdown">
              <a
                href="javascript:void(0)"
                id="userSettings"
                className="user-settings"
                data-toggle="dropdown"
                aria-haspopup="true"
              >
                <span className="avatar">

                  {!userDetails?.profile_pic || userDetails?.profile_pic == undefined || userDetails?.profile_pic == 'undefined' ?
                    <img alt='' src="images/default-user-icon.jpg" />
                    :
                    <img alt='' src={`${config.imageUrl + userDetails?.profile_pic}`} />
                  }
                  <span className="status online" />
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userSettings"
              >
                <div className="header-profile-actions">
                  <a href="nftprofile">Profile</a>
                  <a href="notification">Notification</a>
                  <a href={`${config.nfthomeurl}nftdashboard`}>My Portfolio</a>
                  <a href={`${config.baseUrl}support`}>Support</a>
                  <a href={`${config.baseUrl}changepassword`}>Change Password</a>

                  <a href="javascript:void(0)" onClick={logout}>Logout</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="area">
        <ul className="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </>

  )

}
export default Dashboardheadernft;
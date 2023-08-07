import logo from './logo.svg';
import './App.css';
//==================================  Import all dependencies  ============================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import config from './coreFIles/config'

import Home from './component/home'
import Tos from './component/tos'
import Privacypolicy from './component/privacypolicy'
import Cookies from './component/cookies'
import Contactus from './component/contactus'
import Buyhistory from './component/buyhistory'
import Login from './component/login'
import VerifyAccount from './component/login'
import Forgetpassword from './component/forgetpassword'
import Changepassword from './component/changepassword'
import Signup from './component/signup'
import Dashboard from './component/dashboard';
import Dashboard2 from './component/dashboard2';
import Directrefer from './component/directrefer';
import Teamrefer from './component/teamrefer';
import Nftteamrefer from './component/nftteamrefer';
import TeamList from './component/teamList';
import NftteamList from './component/nftteamList';
import Reward from './component/reward';
import Nftreward from './component/nftreward';
import Projection from './component/projection';
import Plan from './component/plan';
import Buy from './component/buy';
import Mntwallet from './component/mntwallet';
import Vestingwallet from './component/vestingwallet';
import Earnhistory from './component/earnhistory';
import Depositmnt from './component/depositmnt';
import Referral from './component/referral';
import Staking from './component/staking';
import Phase from './component/phase';
import Withdraw from './component/withdraw';
import Blog from './component/blog';
import Blogdetail from './component/blogdetail';
import Faq from './component/faq';
import Academy from './component/academy';
import Academyall from './component/academyall';
import Videos from './component/videos';
import Academydetails from './component/academydetails';
import Articledetails from './component/articledetails';
import Profile from './component/profile';
import Resetpassword from './component/resetpassword';
import Gallery from './component/gallery';
//  ------NFT Dashboard--------
import Dashboardnft from './component/dashboardnft'
import Mymysterybox from './component/mymysterybox'
import Nftwallet from './component/nftwallet'
import Nftreferral from './component/nftreferral'
import Nftearnhistory from './component/nftearnhistory'
import Nftprofile from './component/nftprofile'
import Nftwithdraw from './component/nftwithdraw'
import Nftdeposit from './component/nftdeposit';
import Mintingcard from './component/mintingcard'
import Mintingreward from './component/mintingreward'
import Comming_soon from './component/comming_soon'
import Autopool from './component/autopool'
import LaunchMnt from './component/launchmnt'
import RechargePlans from './component/rechargePlans'
import Autopoolwallet from './component/autopoolwallet';
import Miningcamp from './component/miningcamp';
import Support from './component/support';
import Chat from './component/chat';
import Kycverification from './component/kycverification';
import Notification from './component/notification';
import Rig from './component/rig';
import CreateRig from './component/createrig';
import { Helmet } from 'react-helmet';
import MyNft from './component/MyNft';

function App() {
  return (
    <BrowserRouter>
      <div>

        <Helmet>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> */}
          <title>Mr Mint - The World's First Crypto Token Backed by Crypto Mining</title>
          <meta name="description" content="Introducing Mr Mint, the world's first Currency/token backed by crypto mining. Experience the power of blockchain and secure your financial future. Invest now!" />
          <meta name="author" content="" />
          <meta name="revisit-after" content="7 days" />
          <meta name="robots" content="index,follow" />
          <meta name="rating" content="general" />
          <meta name="site" content="Mr Mint" />
          <meta name="geo.region" content="India" />
          <meta name="geo.placename" content="Indore" />
          <meta name="YahooSeeker" content="index,follow" />
          <meta name="msnbot" content="index,follow" />
          <meta name="googlebot" content="index,follow" />
          <meta name="googlerank" content="all" />
          <meta name="editors-url" content="https://mrmint.io/" />
          <meta name="Distribution" content="Global" />
          <meta name="Rating" content="General" />
          <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
        </Helmet>

        <Routes>
          <Route path={`${config.baseUrl}`} element={<Home />} />
          <Route path={`${config.baseUrl}tos`} element={<Tos />} />
          <Route path={`${config.baseUrl}privacypolicy`} element={<Privacypolicy />} />
          <Route path={`${config.baseUrl}cookies`} element={<Cookies />} />
          <Route path={`${config.baseUrl}contactus`} element={<Contactus />} />
          <Route path={`${config.baseUrl}buyhistory`} element={<Buyhistory />} />
          <Route path={`${config.baseUrl}login`} element={<Login />} />
          <Route path={`${config.baseUrl}mnt_business`} element={<Login />} />
          <Route path={`${config.baseUrl}signup/:referral_address`} element={<Signup />} />
          <Route path={`${config.baseUrl}app`} element={<Signup />} />
          <Route path={`${config.baseUrl}verifyAccount/:token`} element={<VerifyAccount />} />
          <Route path={`${config.baseUrl}forgetpassword`} element={<Forgetpassword />} />
          <Route path={`${config.baseUrl}changepassword`} element={<Changepassword />} />
          <Route path={`${config.baseUrl}signup`} element={<Signup />} />
          <Route path={`${config.baseUrl}dashboard`} element={<Dashboard />} />
          <Route path={`${config.baseUrl}mlmdashboard`} element={<Dashboard2 />} />
          <Route path={`${config.baseUrl}directrefer`} element={<Directrefer />} />
          <Route path={`${config.baseUrl}teamrefer`} element={<Teamrefer />} />
          <Route path={`${config.baseUrl}nftteamrefer`} element={<Nftteamrefer />} />
          <Route path={`${config.baseUrl}teamList/:id`} element={<TeamList />} />
          <Route path={`${config.baseUrl}nftteamList/:id`} element={<NftteamList />} />
          <Route path={`${config.baseUrl}reward`} element={<Reward />} />
          <Route path={`${config.baseUrl}nftreward`} element={<Nftreward />} />
          <Route path={`${config.baseUrl}projection`} element={<Projection />} />
          <Route path={`${config.baseUrl}plan`} element={<Plan />} />
          <Route path={`${config.baseUrl}profile`} element={<Profile />} />
          <Route path={`${config.baseUrl}Buy`} element={<Buy />} />
          <Route path={`${config.baseUrl}mntwallet`} element={<Mntwallet />} />
          <Route path={`${config.baseUrl}vestingwallet`} element={<Vestingwallet />} />
          <Route path={`${config.baseUrl}earnhistory`} element={<Earnhistory />} />
          <Route path={`${config.baseUrl}depositmnt`} element={<Depositmnt />} />
          <Route path={`${config.baseUrl}referral`} element={<Referral />} />
          <Route path={`${config.baseUrl}staking`} element={<Staking />} />
          <Route path={`${config.baseUrl}phase`} element={<Phase />} />
          <Route path={`${config.baseUrl}withdraw`} element={<Withdraw />} />
          <Route path={`${config.baseUrl}Blog`} element={<Blog />} />
          <Route path={`${config.baseUrl}Blogdetail/:id`} element={<Blogdetail />} />
          <Route path={`${config.baseUrl}faq`} element={<Faq />} />
          <Route path={`${config.baseUrl}academy`} element={<Academy />} />
          <Route path={`${config.baseUrl}articles/:id`} element={<Academyall />} />
          <Route path={`${config.baseUrl}articles`} element={<Academyall />} />
          <Route path={`${config.baseUrl}videos`} element={<Videos />} />
          <Route path={`${config.baseUrl}academydetails/:id`} element={<Academydetails />} />
          <Route path={`${config.baseUrl}articledetails/:id`} element={<Articledetails />} />
          <Route path={`${config.baseUrl}resetpassword/:token`} element={<Resetpassword />} />
          <Route path={`${config.baseUrl}gallery`} element={<Gallery />} />
          {/* -----NFT Dashboard------- */}
          <Route path={`${config.baseUrl}dashboardnft`} element={<Dashboardnft />} />
          <Route path={`${config.baseUrl}mymysterybox`} element={<Mymysterybox />} />
          <Route path={`${config.baseUrl}nftwallet`} element={<Nftwallet />} />
          <Route path={`${config.baseUrl}nftreferral`} element={<Nftreferral />} />
          <Route path={`${config.baseUrl}nftearnhistory`} element={<Nftearnhistory />} />
          <Route path={`${config.baseUrl}nftprofile`} element={<Nftprofile />} />
          <Route path={`${config.baseUrl}nftwithdraw`} element={<Nftwithdraw />} />
          <Route path={`${config.baseUrl}mntdeposit`} element={<Nftdeposit />} />
          <Route path={`${config.baseUrl}mintingcard/:id`} element={<Mintingcard />} />
          <Route path={`${config.baseUrl}mintingreward`} element={<Mintingreward />} />
          <Route path={`${config.baseUrl}comming_soon`} element={<Comming_soon />} />
          <Route path={`${config.baseUrl}autopool`} element={<Autopool />} />
          <Route path={`${config.baseUrl}launch-mnt`} element={<LaunchMnt />} />
          <Route path={`${config.baseUrl}rechargePlans/:mystery_box_wallet_id`} element={<RechargePlans />} />
          <Route path={`${config.baseUrl}autopoolwallet`} element={<Autopoolwallet />} />
          <Route path={`${config.baseUrl}mining`} element={<Miningcamp />} />
          <Route path={`${config.baseUrl}support`} element={<Support />} />
          <Route path={`${config.baseUrl}chat/:ticket_number`} element={<Chat />} />
          <Route path={`${config.baseUrl}chat/`} element={<Chat />} />
          <Route path={`${config.baseUrl}kycverification`} element={<Kycverification />} />
          <Route path={`${config.baseUrl}notification`} element={<Notification />} />
          <Route path={`${config.baseUrl}rig`} element={<Rig />} />
          <Route path={`${config.baseUrl}myrig`} element={<CreateRig />} />
          <Route path={`${config.baseUrl}mynfts`} element={<MyNft />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;

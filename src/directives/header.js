import React, {  useEffect } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie';
import $ from 'jquery';
import ScrollToTop from "react-scroll-to-top";

const Header = () => {


    useEffect(() => {

     
        let url = window.location.href;
        let result = url.split('/');
        let Param = result[result.length - 1];

        if(url == 'https://mrmint.biz/' || url == 'https://mrmint.biz' || url == 'http://mrmint.biz/' || url == 'http://mrmint.biz' || url == 'mrmint.biz/' || url == 'mrmint.biz/'){
            window.location.href = 'https://mrmint.biz/mnt_business'
        }

        if (Param == 'blog' ) {
            $('#headerBackground').css({ 'box-shadow': 'rgb(164 166 166) 0px 0px 6px 0px', 'background-color': '#000' });
        }
        
        if (Param == 'notification' ) {
            $('#headerBackground').css({ 'box-shadow': 'rgb(164 166 166) 0px 0px 6px 0px', 'background-color': '#000' });
        }
   
        if (Param == 'academy' ) {
            $('body').addClass('lighttheme');
        } 
        if (Param == 'academy1' ) {
            $('body').addClass('lighttheme');
        }         

        let getUrl = url.split('#');
        if (getUrl[1]) {
            if (getUrl[1]) {
                $("#" + getUrl[1] + '1')[0].click();
            }
        }

    }, [])

    const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));


    return (

        <>
            <div id="__nuxt" className='homepage' >
            <ScrollToTop />

                <div id="__layout">
                    <div id="wrapper">
                        <div data-v-6ff2c65a className="nav-container" id='headerBackground'>
                            <div data-v-6ff2c65a className="navs z-2 container">
                                <nav data-v-6ff2c65a role="navigation" className="nav nav-primary tm-container mobile-header" >
                                    <header data-v-6ff2c65a className="vsm-menu vsm-no-transition tm-wrapper mr-headers">
                                        <nav>
                                            <ul className="vsm-root">
                                                <li data-v-6ff2c65a className="vsm-section vsm-logo-section z-1"><a data-v-6ff2c65a href="./" aria-current="page" className="logo tm-title nuxt-link-exact-active nuxt-link-active">
                                                    <img className="atom" src="assets/images/logo.png" width="125px" alt='mrmint logo'/></a>
                                                </li>
                                                
                                                <li className="vsm-section vsm-section_menu vsm-mob-hide">
                                                    <a href="#the-concept" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='the-concept1'><span>The Concept</span></a>
                                                    <a href="#our-projects" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='our-projects1'><span>Our Projects</span></a>
                                                    <a href="#tokenomics" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='tokenomics1'><span>Tokenomics</span></a>
                                                    <a href="#gallery" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='gallery1'><span>Gallery</span></a>
                                                    <a href="#roadmap" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='roadmap1'><span>Roadmap</span></a>
                                                    <a href="#faq" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='faq1'><span>FAQs</span></a>
                                                    <a
                                                    href={`${config.baseUrl}academy`} className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='faq1'><span>Academy</span></a>
                                                    &nbsp;&nbsp;
                                                </li>
                                                    <li data-v-6ff2c65a className="vsm-section vsm-mob-hide">
                                                        <a data-v-706ceafa data-v-6ff2c65a href={loginData.email ? 'dashboard' : 'login'} className="btn btn-primary tm-rf-2 tm-link">
                                                            Buy MNT</a>&nbsp;&nbsp;
                                                            <a data-v-706ceafa data-v-6ff2c65a href={'https://nft.mrmint.io/'} className="btn btn-primary tm-rf-2 tm-link">
                                                            Buy NFT</a>
                                                    </li>
                                                <li data-v-6ff2c65a className="vsm-section vsm-section_mob">
                                                    <div className="vsm-mob" id="menuToggle">
                                                        <input type="checkbox" />
                                                        <div className="vsm-mob__hamburger">
                                                            <div className="vsm-mob-line" />
                                                            <div className="vsm-mob-line" />
                                                            <div className="vsm-mob-line" />
                                                        </div>
                                                        <ul id="menu">
                                                            <a href="#the-concept" className="tm-lh-title tm-medium"><span>The Concept</span></a><br /><br />
                                                            <a href="#our-projects" className="tm-lh-title tm-medium"><span>Our Projects</span></a><br /><br />
                                                            <a href="#tokenomics" className="tm-lh-title tm-medium"><span>Tokenomics</span></a><br /><br />
                                                            <a href="#gallery" className="tm-lh-title tm-medium"><span>Gallery</span></a><br /><br />
                                                            <a href="#roadmap" className="tm-lh-title tm-medium"><span>Roadmap</span></a><br /><br />
                                                            <a href="#faq" className="tm-lh-title tm-medium"><span>FAQs</span></a><br /><br />
                                                            <a href={`${config.baseUrl}blog`} className="tm-lh-title tm-medium"><span>Blog</span></a><br /><br />
                                                            <a href={loginData.email ? 'buy' : 'login'} className="tm-lh-title tm-medium"> Buy MNT →</a><br/><br/>
                                                            <a 
                                                            href={'https://nft.mrmint.io/'} 
                                                            className="tm-lh-title tm-medium"> Buy NFT →</a>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </header>
                                </nav>
                            </div>
                        </div>
                    </div></div></div>
        </>

    )

}
export default Header;
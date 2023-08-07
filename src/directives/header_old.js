import React, {  useEffect } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie';
import $ from 'jquery';

const Header = () => {

    useEffect(() => {
        let url = window.location.href;
        let result = url.split('/');
        let Param = result[result.length - 1];

        if(url == 'https://mrmint.biz/' || url == 'https://mrmint.biz' || url == 'http://mrmint.biz/' || url == 'http://mrmint.biz' || url == 'mrmint.biz/' || url == 'mrmint.biz/'){
            window.location.href = 'https://mrmint.biz/mnt_business'
        }

        if (Param == 'blog') {
            $('#headerBackground').css({ 'box-shadow': 'rgb(164 166 166) 0px 0px 6px 0px', 'background-color': '#000' });
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
                <div id="__layout">
                    <div id="wrapper">
                        <div data-v-6ff2c65a className="nav-container">
                            <div data-v-6ff2c65a className="navs z-2">
                                <nav data-v-6ff2c65a role="navigation" className="nav nav-primary tm-container mobile-header" >
                                    <header data-v-6ff2c65a className="vsm-menu vsm-no-transition tm-wrapper" id='headerBackground'>
                                        <nav>
                                            <ul className="vsm-root">
                                                <li data-v-6ff2c65a className="vsm-section vsm-logo-section z-1"><a data-v-6ff2c65a href="./" aria-current="page" className="logo tm-title nuxt-link-exact-active nuxt-link-active">
                                                    <img alt='' className="atom" src="assets/images/logo.png" width="125px" /></a>
                                                </li>
                                                <li className="vsm-section vsm-section_menu vsm-mob-hide">
                                                    <a href="#about" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='about1'><span>About Us</span></a>
                                                    <a href="#mission" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='mission1'><span>Vision &amp; Mission</span></a>
                                                    <a href="#tokenomics" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='tokenomics1'><span>Tokenomics</span></a>
                                                    <a href="#beliefs" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='beliefs1'><span>Our Beliefs</span></a>
                                                    <a href="#roadmap" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='roadmap1'><span>Roadmap</span></a>
                                                    <a href="#faq" className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='faq1'><span>FAQs</span></a>
                                                    <a href={`${config.baseUrl}blog`} className="vsm-link tm-rf-2 tm-lh-title tm-medium" id='faq1'><span>Blog</span></a>
                                                </li>
                                                <li data-v-6ff2c65a className="vsm-section vsm-mob-hide">
                                                    <a data-v-706ceafa data-v-6ff2c65a href={loginData.email ? 'buy' : 'login'} className="btn tm-rf-2 tm-link">
                                                        Buy MNT</a>
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
                                                            <a href="#about" className="tm-lh-title tm-medium"><span>About Us</span></a><br /><br />
                                                            <a href="#mission" className="tm-lh-title tm-medium"><span>Vision &amp; Mission</span></a><br /><br />
                                                            <a href="#tokenomics" className="tm-lh-title tm-medium"><span>Tokenomics</span></a><br /><br />
                                                            <a href="#beliefs" className="tm-lh-title tm-medium"><span>Our Beliefs</span></a><br /><br />
                                                            <a href="#roadmap" className="tm-lh-title tm-medium"><span>Roadmap</span></a><br /><br />
                                                            <a href="#faq" className="tm-lh-title tm-medium"><span>FAQs</span></a><br /><br />
                                                            <a href={`${config.baseUrl}blog`} className="tm-lh-title tm-medium"><span>Blog</span></a><br /><br />
                                                            <a href={loginData.email ? 'buy' : 'login'} className="tm-lh-title tm-medium"> Get MNT →</a>
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
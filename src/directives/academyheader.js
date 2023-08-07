import React, {  useEffect } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie';
import $ from 'jquery';
import ScrollToTop from "react-scroll-to-top";

const Academyheader = () => {

    useEffect(() => {
        let url = window.location.href;
        let result = url.split('/');
        let Param = result[result.length - 1];

        if (url == 'https://mrmint.biz/' || url == 'https://mrmint.biz' || url == 'http://mrmint.biz/' || url == 'http://mrmint.biz' || url == 'mrmint.biz/' || url == 'mrmint.biz/') {
            window.location.href = 'https://mrmint.biz/mnt_business'
        }

        if (Param == 'blog') {
            $('#headerBackground').css({ 'box-shadow': 'rgb(164 166 166) 0px 0px 6px 0px', 'background-color': '#000' });
        }

        if (Param == 'academy') {
            $('body').addClass('lighttheme');
        }
        if (Param == 'academy1') {
            $('body').addClass('lighttheme');
        }

        let getUrl = url.split('#');
        if (getUrl[1]) {
            if (getUrl[1]) {
                $("#" + getUrl[1] + '1')[0].click();
            }
        }

    }, [])

    
 const scrollvideos = async() =>{
    $('#videoBlock')[0].scrollIntoView();
  }
  
 const scrollartical = async() =>{
    $('#articlesBlock')[0].scrollIntoView();
  }

    return (

        <>
            <div id="__nuxt" className='homepage' >
                <ScrollToTop />
                <div id="__layout">
                    <div className='academyheader'>
                        <div className='container'>
                            <nav className="navbar navbar-expand-md">
                                <a className="navbar-brand" href={`${config.baseUrl}academy`}>
                                    <img src="images/academylogo.png" alt='Academy Logo' className="img-fluid" />
                                </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <ul className="navbar-nav"> 
                                        <li className="nav-item">
                                            <a className="nav-link" href={`${config.baseUrl}articles`} onClick={scrollartical}>Articles </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={`${config.baseUrl}videos`} onClick={scrollvideos}>Videos </a>
                                        </li> 
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )

}
export default Academyheader;
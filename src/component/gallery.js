/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState, useEffect } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import $ from 'jquery';

const Gallery = () => {

    const [activeTabStatus, setActiveTabStatus] = useState(1);

    useEffect(() => {
        setTimeout(() => {
            $(".galleryBtn")[0].click();
        }, 500);
    });

    const activeTab = async (val) => {
        setActiveTabStatus(val)
    }

    return (

        <>
            <Header />
            <div id="content" className="loginpage">
                <div className="breadcrumb-wrap bg-f br-4" style={{ background: "url(assets/images/pink-elegant-geometrical-texture.png)", backgroundSize: "cover" }}>
                    <div className="container">
                        <div className="breadcrumb-title text-center">
                            <h2>Gallery</h2>
                        </div>
                    </div>
                </div>
                <section className='gallery-tabs'>

                    <div class="container">



                        <div class="row no-gutters">
                            <div class="filtering col-sm-12 text-center">
                                <span data-filter="*" className={activeTabStatus == 1 ? 'active galleryBtn' : ''} onClick={() => activeTab(1)} >All</span>
                                <span data-filter=".event" className={activeTabStatus == 2 ? 'active' : ''} onClick={() => activeTab(2)}>Event</span>
                                <span data-filter=".brand" className={activeTabStatus == 3 ? 'active' : ''} onClick={() => activeTab(3)}>Brand promotion</span>
                                <span data-filter=".mining" className={activeTabStatus == 4 ? 'active' : ''} onClick={() => activeTab(4)}>Mining</span>
                            </div>
                            <div class="col-12 text-center w-100">
                                <div class="grid form-row gallery text-center">
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/1.jpeg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item  brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/2.jpeg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item mining">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/World Blockchain Summit, SIngapore.png" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item .brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/4.JPEG" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/5.jpeg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/6.jpeg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-lg-0 grid-item brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/7.jpeg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-sm-0 grid-item brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/8.jpeg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 grid-item mining">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/9.jpeg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/10.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item  ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/11.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/12.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/13.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/14.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/15.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-lg-0 grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/16.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-sm-0 grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/17.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/18.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/19.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item  ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/20.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/21.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/22.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/23.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                   </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/24.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-lg-0 grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/25.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-sm-0 grid-item brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/26.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/27.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/28.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item  ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/29.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/30.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/31.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/32.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/33.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-lg-0 grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/34.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-sm-0 grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/35.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                   </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/36.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/37.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item  ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/38.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item brand">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/39.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/40.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/40.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/41.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-lg-0 grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/42.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6  mb-sm-0 grid-item ">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/43.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 grid-item event">
                                        <div class="portfolio-wrapper">
                                            <div class="portfolio-image">
                                                <img src="images/gallery/44.jpg" alt="..." />
                                            </div>
                                            <div class="portfolio-overlay">
                                                <div class="portfolio-content">
                                                    <a class="popimg ml-0" href="#">
                                                        <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>

    )

}
export default Gallery;
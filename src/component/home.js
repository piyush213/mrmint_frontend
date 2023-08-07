/* eslint-disable jsx-a11y/alt-text */
import React, {  useEffect, useState } from 'react';
import config from '../coreFIles/config';
import Header from '../directives/header';
import Footer from '../directives/footer';
import $ from 'jquery';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { Carousel, Modal} from 'react-bootstrap';
import Chart from "react-apexcharts";
import axios from 'axios';
import { Helmet } from 'react-helmet';





const Home = () => {
    const [livePrice, setLivePrice] = useState(0);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [stdudentSubject, setStudentsubject] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setDialogOpen(true)
        }, 1500);
        setInterval(async () => {
            await axios({
                method: 'get',
                url: `https://api.coinstore.com/api/v1/market/trade/MNTUSDT?size=1`,
            }).then(response => {
                setLivePrice(response.data.data[0].price);
            })
        }, 1000);

        const sSubject = [];
        const sMarks = [];
        const getStudentdata = async () => {
            const reqData = await fetch("http://localhost/reactgraphtutorial/marks");
            const resData = await reqData.json();
            for (let i = 0; i < resData.length; i++) {
                sSubject.push(resData[i].subject);
                sMarks.push(parseInt(resData[i].marks));
            }
            setStudentsubject(sSubject);
            setStudentMarks(sMarks);
        }

        getStudentdata();



        setTimeout(() => {
            $(".galleryBtn")[0].click();
        }, 500);

        setInterval(() => {

            const newYears = "31 Dec 2022 18:30:00";
            const newYearsDate = new Date(newYears);
            const currentDate = new Date();
            const totalSeconds = (newYearsDate - currentDate) / 1000;
            const days = Math.floor(totalSeconds / 3600 / 24);
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const mins = Math.floor(totalSeconds / 60) % 60;
            const seconds = Math.floor(totalSeconds) % 60;
            setDays(days); setHours(hours); setMins(mins); setSeconds(seconds);
        }, 1000);
    }, []);

 
    const [announce, setShowAnnounce] = useState(true);
    const handleCloseAnnounce = async () => {
        setShowAnnounce(false);
    }

    return (

        <>
            <Header />
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags --> */}
                <title>Mr. Mint - The World's First Crypto Token Backed by Crypto Mining</title>
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
            <div id="content">
                <main data-v-34f0d9a0>
                    <section data-v-71fd3f9c data-v-34f0d9a0 tag="section" className="section-hero section-first">
                        <div data-v-71fd3f9c className="tm-wrapper  tm-container">
                            <div className="container">
                                <div className="row  justify-content-center align-items-center">
                                    <div className="col-md-6 text-left">
                                        <h1>
                                            WORLD'S 1st TOKEN BACKED BY CRYPTO MINING
                                        </h1>
                                        <div>
                                            <p>Mr. Mint is an asset-backed token that integrates aspects of:</p>
                                            <ul>
                                                <li>•	Cutting-edge cryptocurrency mining technologies</li>
                                                <li>•	Multi-utility NFTs</li>
                                                <li>•	P2E gaming in the Metaverse</li>
                                                <li>•	Web 3.0</li>
                                            </ul>
                                        </div>
                                        <br />
                                        <div class="">
                                            <a target="_blank" href="images/mnt_litepaper.pdf"><button class="btn btn-primary btn-round download_litepaper">Litepaper</button></a>
                                            &nbsp;&nbsp;
                                            <a target="_blank" href="images/WhitepaperUpdated.pdf"><button class="btn btn-primary btn-round download_litepaper">Whitepaper</button></a>
                                        </div>
                                        <div className='audit-partner'>
                                            <a href='REP-final-20230425T051956Z.pdf' target='_blank'>
                                                AUDIT PARTNER BY CERTIK
                                                <img src='images/icon/certik.png' alt='certik logo' />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="coin_ellipse">
                                            <img src="images/coin_banner_big.png" alt='coin_banner_big' loading="lazy" />
                                            <div class="price">
                                                <div class="icon">
                                                    <img src='https://mrmint.io/images/coin_banner_big.png' alt='coin_banner_big' />
                                                </div>
                                                <div class="content">
                                                    <a target="_blank" href={config.coinstoreurl} rel="noreferrer" > <p>Live Price</p>
                                                        <h5>${livePrice ? livePrice : '0'}</h5></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="counter-section">
                        <div className="container">
                            <div className="row align-items-center .justify-content-between">
                                <div className="col-md-12 col-sm-12 text-center">
                                   
                                    <h2 className='mb-4'>LISTING PARTNER</h2>

                                    <div className='d-flex align-items-center justify-content-between listnig-partners'>

                                        <a href='https://www.coinstore.com/#/' target='_blank' className='ms-md-5' rel="noreferrer">  <img src='images/icon/coinstor.png' alt='coinstor' /> <p>COINSTORE</p></a>

                                        <a href='https://bscscan.com/' target='_blank' rel="noreferrer">      <img src='images/icon/bsc.png' className='' alt='bsc logo' /><p>BSC Scan</p></a>

                                        <a href='https://www.bnbchain.org/en/smartChain' target='_blank' rel="noreferrer"> <img src='images/icon/binance.png' alt='binance logo' /> <p>Binance Smart Chain</p></a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="about-us" id="the-concept">
                        <div className="container">
                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-6">
                                    <h1>THE CONCEPT </h1>
                                    <br />
                                    <p>Wondering how Mining can thrive with an entire ecosystem? The possibilities are limitless. By virtue of holding the MNT token, individuals can become part of the Global Mining Community. Mr. Mint's project solves the ongoing challenge of increasing costs and higher difficulty levels associated with cryptocurrency mining. Therefore, indirect benefits are extended to a community that solely holds the MNT token. Here's a sneak peek into our multiple revenue streams.
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <div className="coin">
                                        <img src="images/coin_banner_big.png" alt='coin_banner_big' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="bg_image">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1" />
                                <div className=" col-md-10 text-center">
                                    <h2>HERE’S YOUR CHANCE TO BECOME A PART OF THE TECHNOLOGY REVOLUTION FOR JUST $100.<br />
                                        TAKE A HINT, BUY MR. MINT
                                    </h2>
                                </div>
                                <div className="col-md-1" />
                            </div>
                        </div>
                    </section>
                    <section className="bg-world_mining">
                        <div className="container ">
                        </div>
                    </section>
                    <section className="bg-world">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-8 text-center">
                                    <div className="row" style={{ "margin-top": "-175px" }}>
                                        <div className="col-md-4">
                                            <div className="circle-box">
                                                <p>Mining
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="circle-box">
                                                <p>NFTs & Metaverse
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="circle-box">
                                                <p>P2E Gaming
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                </div>
                                <div className='col-md-2 '>

                                </div>
                                <div className='col-md-10 mt-5'>
                                    <div>

                                        <p>•	Global state-of-the-art crypto mining, with the aim to mine 1 BTC per day using green energy.</p>
                                        <p className='mt-0'>•	An expansive NFT ecosystem that includes never-before-seen assets to HODL and utilize.</p>
                                        <p className='mt-0'>•	Exciting developments & integrations in the Metaverse in the form of P2E games.</p>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <section id="mnt-ecosystem" className='info-graphic bg-grey pt-5  pb-5 mb-5'>
                        <div className="container">
                            <div class="row ">
                                <div class="col-md-12 text-center">
                                    <h1>$MNT ECOSYSTEM </h1>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <img src="images/info-graphic.png" width='100%' alt='info-graphic' />

                                </div>

                            </div>
                        </div>

                    </section>
                    <section id="our-projects" className='upcomming-projects pt-5 mt-3 pb-5 mb-5'>
                        <div className="container">
                            <div class="row ">
                                <div class="col-md-12 text-center">
                                    <h1>OUR PROJECTS </h1>
                                </div>
                            </div>
                            <br /><br />
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Carousel variant="dark">
                                        <Carousel.Item>
                                            <div className="row ">
                                                <div className="col-md-6 ">
                                                </div>
                                                <div className="col-md-6">
                                                </div>

                                                <div className='bg_color p-4'>
                                                    <div className="row">


                                                        <div className="col-md-6 mb-2">
                                                            <div className="upimg" >
                                                                <img src="images/Miningoption.png" alt='Miningoption' />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <div>
                                                                <h3>Mining</h3>
                                                                <p>Mr. Mint's fundamental project, or its genesis block, began with cryptocurrency mining. Mining farms are set up across the globe to help sustain the $MNT token and also serve as real-world assets. These mining operations use green energy specific to their locations and support the Mr. Mint ecosystem, as mining rewards are pumped back into the token’s liquidity. </p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <div className="row">
                                                <div className='bg_color p-4'>
                                                    <div className="row">

                                                        <div className="col-md-6 mb-2">

                                                            <h3>Mr. Mint’s NFTs </h3>


                                                            <p>Mr. Mint's NFTs - MINTFORCE is a collection of 40,000 digital collectibles residing on the Binance blockchain. 4 Mystery Boxes open up to reveal one of the 4 Master Cards, enabling our community to mint crypto mining NFTs and earn mining rewards. We are bringing crypto mining to the metaverse. Have you already joined?  </p>

                                                            <a target="_blank" href={config.nftFront} rel="noreferrer">
                                                                <button className="btn">BUY NFT</button>
                                                            </a>

                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <div className=" " >
                                                                <video width="100%" autoPlay loop muted playsInline>
                                                                    <source src="images/mrmint_riginal1.mp4" type="video/mp4" />
                                                                    <source src="images/mrmint_riginal1.mp4" type="video/ogg" />
                                                                    Your browser does not support HTML video.
                                                                </video>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <div className="row ">

                                                <div className="col-md-12">

                                                </div>
                                                <div className='bg_color p-4'>
                                                    <div className="row">

                                                        <div className="col-md-6 mb-2">
                                                            <div >
                                                                <h3>The Metaverse Integration</h3>
                                                                <p>One of the most awaited projects is a P2E game that allows users to play and feel like real cryptocurrency miners, all within the metaverse. Elements from real-world cryptocurrency mining are fused together within the virtual realm, providing an experience of a lifetime. The game enhances the utility of NFTs and allows for a variety of ecosystem-wide use cases.</p>

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <div className="upimg" >
                                                                <img src="images/metavers.png" alt='' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <div className="row">
                                                <div className="col-md-6">

                                                </div>
                                                <div className="col-md-6">
                                                </div>

                                                <div className='bg_color p-4'>
                                                    <div className="row ">


                                                        <div className="col-md-6 mb-2">
                                                            <div className="upimg" >
                                                                <img src="images/Blockchain.png" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-2">
                                                            <h3>Blockchain </h3>
                                                            <p>Upcoming…</p>
                                                            <p>In the long term, users will see Mr. Mint's own blockchain aiming to fulfill certain key requirements of the time and allowing the addition of several unique features that further differentiate Mr. Mint.</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <div className="row ">

                                                <div className="col-md-12">

                                                </div>
                                                <div className='bg_color p-4'>
                                                    <div className="row">

                                                        <div className="col-md-6 mb-2">
                                                            <div >
                                                                <h3>Cross-chain</h3>
                                                                <p>Upcoming…</p>
                                                                <p>Having our own cross-chain bridge means greater interoperability, security, fluidity, and multiple features for our users. Mr. Mint envisions playing an integral part in the free flow of processes across multiple blockchains. </p>

                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="upimg mb-2" >
                                                                <img src="images/crosschain.png" alt=''/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Carousel.Item>


                                    </Carousel>

                                </div>

                            </div>
                        </div>
                    </section>
                    <section className="tokenomics" id="tokenomics">
                        <div className="container">
                            <div className="row ">
                                <div className="col-md-12 text-center">
                                    <h1>Tokenomics</h1>
                                </div>
                            </div>
                            <br /><br /><br />
                            <div className="row bg-color_head">
                                <div className="col-md-2">
                                </div>
                                <div className="col-md-8 text-center">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="btn-img">
                                                <span className>Token Name : MrMint </span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="btn-img">
                                                <span className>Ticker : MNT</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="btn-img">
                                                <span className>Chain : BSC </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                </div>
                            </div>
                            <br /><br /><br />
                            <div className="row">
                                <div className="col-lg-4 col-md-2">
                                </div>
                                <div className="col-lg-4 col-md-8 text-center">
                                    <div className="bg-color text-center">
                                        <table className="table table-striped" width="100%">
                                            <tbody><tr>
                                                <td>Decimal</td>
                                                <td>8 </td>
                                            </tr>
                                                <tr>
                                                    <td>Total Supply</td>
                                                    <td>1,000,000,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Private Sale Price</td>
                                                    <td>$0.054 </td>
                                                </tr>
                                                <tr>
                                                    <td>Pre- Sale price</td>
                                                    <td>$0.094 </td>
                                                </tr>
                                                <tr>
                                                    <td>Public Sale Price</td>
                                                    <td>$0.15 </td>
                                                </tr>
                                                <tr>
                                                    <td>Accepted Currency </td>
                                                    <td>BNB</td>
                                                </tr>
                                            </tbody></table>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-2">
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="bg-world">
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-md-4">
                                </div>
                                <div className="col-md-4">
                                    <div className="coin_table_up">
                                    </div>
                                </div>
                                <div className="col-md-4">
                                </div>
                            </div>
                            <br />
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12 mb-sm-5">
                                    <div className=''>
                                        <Chart
                                            type="pie"

                                            series={[5, 15, 20, 10, 2, 1, 1, 12, 7, 4, 18, 1, 4]}
                                            className="PieChart"

                                            options={{

                                                noData: { text: "Empty Data" },
                                                labels: ['Private Sale', 'Pre-sale', 'Public Sale', 'Marketing', 'Referral', 'R & D', 'Airdrop', 'Liquidity Staking', 'Ecosystem', 'Reserve', 'Team', 'Charity', 'Advisory']

                                            }}
                                        >
                                        </Chart>
                                      
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 ">
                                    <div className="text-center tokenomics_table">
                                        <table className="table table-striped" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>DETAILS</th>
                                                    <th>%(Ptg.)</th>
                                                    <th>TOKEN QTY</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> Private Sale </td>
                                                    <td>5% </td>
                                                    <td> 50,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Pre-sale </td>
                                                    <td>15% </td>
                                                    <td>150,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Public Sale </td>
                                                    <td>20% </td>
                                                    <td>200,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Marketing</td>
                                                    <td>10% </td>
                                                    <td>100,000,000</td>
                                                </tr>
                                                <tr>
                                                    <td>Referral</td>
                                                    <td>2% </td>
                                                    <td>20,000,000</td>
                                                </tr>
                                                <tr>
                                                    <td>R &amp; D </td>
                                                    <td>1% </td>
                                                    <td>10,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Airdrop </td>
                                                    <td>1% </td>
                                                    <td>10,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Liquidity Staking </td>
                                                    <td>12% </td>
                                                    <td>120,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Ecosystem</td>
                                                    <td>7% </td>
                                                    <td>70,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Reserve</td>
                                                    <td>4% </td>
                                                    <td>40,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Team</td>
                                                    <td>18% </td>
                                                    <td>180,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Charity</td>
                                                    <td>1% </td>
                                                    <td>10,000,000 </td>
                                                </tr>
                                                <tr>
                                                    <td>Advisory</td>
                                                    <td>4% </td>
                                                    <td>40,000,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                            <br /><br /><br /><br />
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="sale-box-black">
                                        <h2>PRIVATE SALE</h2>
                                        <p>Start Date: 02-04-2022</p>
                                        <p>End Date: 15-05-2022</p>
                                        <p>Token Pricing: $0.054</p>
                                        <p>Minimum Investment: $100 </p>
                                        <button className="btn btn-primary" style={{ cursor: 'inherit' }}>SOLD</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="sale-box-black">
                                        <h2>PRE SALE</h2>
                                        <p>Start Date: 16-05-2022</p>
                                        <p>End Date: 30-06-2022</p>
                                        <p>Token Pricing: $0.094</p>
                                        <p>Minimum Investment: $100</p>
                                        <button className="btn btn-primary" style={{ cursor: 'inherit' }}>SOLD</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="sale-box-black">
                                        <h2>PUBLIC SALE</h2>
                                        <p>Start Date: 01-07-2022</p>
                                        <p>End Date: 31-12-2022</p>
                                        <p>Token Pricing: $0.15</p>
                                        <p>Minimum Investment: $100</p>
                                        <button className="btn btn-primary" style={{ cursor: 'inherit' }}>SOLD</button>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                    </section>
                    <section className='partners bg-grey'>
                        <div className='container'>
                            <div class="col-md-12 text-center mb-5"><h1 style={{ fontSize: "2.5em" }}>IN THE NEWS</h1></div>
                            <div className='row justify-content-between'>

                                <div className='col-lg-2 col-md-3 col-6 text-center innerbox d-flex align-items-center'>
                                    <a href="https://coinpedia.org/guest-post/top-5-coins-to-watch-out-for-in-2022/" target="_blank" rel="noreferrer" >
                                        <div className='partner-logo'>
                                            <img src='images/cp-logo.webp' alt='cp-logo' />
                                        </div>
                                    </a>
                                </div>
                                <div className='col-lg-2 col-md-3 col-6 text-center innerbox d-flex align-items-center'>
                                    <a href="https://www.bloomberg.com/press-releases/2022-11-17/mintforce-mr-mint-s-freshly-launched-nft-collection-transforms-mining-on-the-web" target="_blank" rel="noreferrer" >
                                        <div className='partner-logo'>
                                            <img src='images/bloomberg.png' alt='bloomberg' />
                                        </div>
                                    </a>
                                </div>
                                <div className='col-lg-2 col-md-3 col-6 text-center innerbox d-flex align-items-center'>
                                    <a href="https://finance.yahoo.com/news/mr-mint-token-launches-token-193000141.html" target="_blank" rel="noreferrer" >
                                        <div className='partner-logo'>
                                            <img src='images/yahoo-logo.png' alt='yahoo-logo' />
                                        </div>
                                    </a>
                                </div>

                                <div className='col-lg-2 col-md-3 col-6 text-center innerbox d-flex align-items-center'>
                                    <a href="https://u.today/press-releases/mr-mint-mnt-public-sale-goes-live-on-july-1st-2022" target="_blank" className='partner-logo' rel="noreferrer">
                                        <div className='partner-logo'>
                                            <img src='images/u-today.png' alt='u-today' />
                                        </div>

                                    </a>

                                </div>
                                <div className='col-lg-2 col-md-3 col-6 text-center innerbox d-flex align-items-center'>
                                    <a href="https://zycrypto.com/a-six-month-public-sale-begins-for-mr-mints-mnt-token/" target="_blank" rel="noreferrer">
                                        <div className='partner-logo'>
                                            <img src='images/zycrypto.png' alt='zycrypto' />
                                        </div>

                                    </a>

                                </div>
                                <div className='col-lg-2 col-md-3 col-6 text-center innerbox d-flex align-items-center'>
                                    <a href="https://cryptoslate.com/press-releases/why-mnt-is-worth-investing-in-nfts-metaverse-p2e-and-much-more" target="_blank" rel="noreferrer" >
                                        <div className='partner-logo'>
                                            <img src='images/c-icon-cryptoslate.png' height="37px" alt='c-icon-cryptoslate' />
                                        </div>

                                    </a>

                                </div>

                            </div>
                        </div>



                    </section>


                    <section className='gallery-tabs home-gallery' id="gallery">
                        <div className='container'>
                            <div className='row'>
                                <div className="col-md-12 text-center mb-5">
                                    <h1 style={{ fontSize: "2.5em" }}>GALLERY</h1>
                                </div>
                            </div>

                        </div>
                        <div class="container">
                            <div className='row'>
                                <div className='col-sm-4 p-2'>
                                    <div class="portfolio-wrapper">
                                        <div class="portfolio-image">
                                            <img src="images/gallery/2.jpeg" alt="..." />
                                        </div>

                                    </div>

                                </div>
                                <div className='col-sm-4 p-2'>
                                    <div class="portfolio-wrapper">
                                        <div class="portfolio-image">
                                            <img src="images/gallery/1.jpeg" alt="..." />
                                        </div>

                                    </div>

                                </div>
                                <div className='col-sm-4 p-2'>
                                    <div class="portfolio-wrapper">
                                        <div class="portfolio-image">
                                            <img src="images/gallery/40.jpg" alt="..." />
                                        </div>

                                    </div>

                                </div>
                                <div className='col-sm-4 p-2'>
                                    <div class="portfolio-wrapper">
                                        <div class="portfolio-image">
                                            <img src="images/gallery/6.jpeg" alt="..." />
                                        </div>

                                    </div>

                                </div>
                                <div className='col-sm-4 p-2'>
                                    <div class="portfolio-wrapper">
                                        <div class="portfolio-image">
                                            <img src="images/gallery/19.jpg" alt="..." />
                                        </div>

                                    </div>

                                </div>
                                <div className='col-sm-4 p-2'>
                                    <div class="portfolio-wrapper">
                                        <div class="portfolio-image">
                                            <img src="images/gallery/5.jpeg" alt="..." />
                                        </div>

                                    </div>

                                </div>
                                <div className='row  mt-4'>
                                    <div className='col-md-12 text-center'>
                                        <a href={`${config.baseUrl}gallery`} target="_blank" class="btn btn-primary pl-4 pr-4" rel="noreferrer">View more</a>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>


                    <section className="roadmap" id="roadmap">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1>Roadmap</h1>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col">
                                            <div className="timeline-steps aos-init aos-animate" data-aos="fade-up">
                                                <div className="timeline-step one_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2003}>
                                                        <p className="h6 mt-2 mb-3">Q1-2021 </p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Initiation of Mr. Mint Project </li>
                                                                <li>- Operation Team Formation </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step two_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2004}>
                                                        <p className="h6 mt-2 mb-3">Q2-2021 </p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Mr. Mint Ecosystem Development Initiated </li>
                                                                <li>- Approval of Various Upcoming Products Completed </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step three_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2005}>
                                                        <p className="h6 mt-2 mb-3">Q3-2021 </p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Smart Contract Creation on Testnet</li>
                                                                <li>- Blueprint of the Ecosystem Approved </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step four_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2010}>
                                                        <p className="h6 mt-2 mb-3">Q4-2021 </p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Offline Marketing Initiated </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step mb-0 five_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2020}>
                                                        <p className="h6 mt-2 mb-3">Q1-2022</p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Mr. Mint Ecosystem: Crypto dashboard launched </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step six_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2004}>
                                                        <p className="h6 mt-2 mb-3">Q2-2022</p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Private &amp; Pre-sale Initiation </li>
                                                                <li>- Social Media Campaign Initiation </li>
                                                                <li>- Staking Platform Go-live </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step seven_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2005}>
                                                        <p className="h6 mt-2 mb-3">Q3-2022</p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Infrastructure Development </li>
                                                                <li>- Beginning of Cryptocurrency Mining </li>
                                                                <li>- Public Sale Begins
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step eight_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2010}>
                                                        <p className="h6 mt-2 mb-3">Q4-2022</p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Expansion of Infrastructure </li>
                                                                <li>- NFT launch </li>
                                                                <li>- Adding Mining Rewards to the Token Liquidity</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step mb-0 nine_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2020}>
                                                        <p className="h6 mt-2 mb-3">Q1-2023</p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Partial unlock of Private &
                                                                    Presale tokens
                                                                </li>
                                                                <li>- Mining Reward Distributed</li>
                                                                
                                                                <li>- Audit Smart Contract by Certik.  </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step tenth_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2004}>
                                                        <p className="h6 mt-2 mb-3">Q2-2023</p>
                                                        <div className="inner-circle bg_green" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Partial unlock of Public sale</li>
                                                                <li>- Listed on Centralized Exchange Coinstore</li>
                                                                <li>- Introduced Swapping Module</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step eleven_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2005}>
                                                        <p className="h6 mt-2 mb-3">Q3-2023</p>
                                                        <div className="inner-circle" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Launching of NFT Marketplace</li>
                                                                <li>- Listing on Decentralized Exchange</li>
                                                                <li> - Listing on Coin Market Cap </li>
                                                                <li>- Listing on Coin Gecko</li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-step Twelve_line">
                                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title data-content="And here's some amazing content. It's very engaging. Right?" data-original-title={2005}>
                                                        <p className="h6 mt-2 mb-3">Q4-2023 Onwards</p>
                                                        <div className="inner-circle" />
                                                        <div className="para-fixed">
                                                            <ul>
                                                                <li>- Development of Decentralized Products</li>
                                                                <li>- Launching of Mr.Mint NFT's second collection.</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="faq" id="faq">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h2>Frequently Asked Questions</h2>
                                    <br />
                                </div>
                                <div className="col-md-12">


                                    <Accordion>
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    What is Mr. Mint ($MNT)?
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                MNT is a BSC token designed to make investing in crypto mining super simple, even without any knowledge or expensive equipment. We collaborate with strategic mining partners in Australia, the United Kingdom, Iceland, and India who utilize 100% hydroelectric and solar power for mining $BTC and other cryptocurrencies.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    What is the Official Contract Address?
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                    The contract address is: <b>0x3e81Aa8d6813Ec9D7E6ddB4e523fb1601a0e86F3</b>
                                                    
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>




                                        
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    Who are the people behind Mr. Mint?
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                <p>
                                                The Team behind the Mr. Mint Project comes with expertise in the domain of over a decade. They have been active investors, traders, miners, and also have a technical background that grew hand-in-hand with the growth of the domain. <br />Keeping in line with the culture of crypto and blockchain, the team has chosen to be pseudonymous. The project's potential is backed by extensive research, experience, and learnings of the team. They envision the project shining in the light of its own progress, standing on its own merits. This allows Mr. Mint to be its authentic self.
                                                </p>
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                        
                                    </Accordion>
                                    <br></br> If you have questions about MINTFORCE NFTs, <a href={`${config.baseUrl}faq`} target="_blank" style={{color:'#01a9fa'}}> follow this link </a>
                                </div>
                            </div>
                            <div className='row  mt-4'>
                                <div className='col-md-12 text-center'>
                                    <a href={`${config.baseUrl}faq`} target="_blank" class="btn btn-primary pl-4 pr-4" rel="noreferrer">View more</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            {/* ---------Singapore Modal---------- */}
            {isDialogOpen== true ?  <Modal id="myModal" size='lg' show={announce} className="singapore_modal" dialogClassName="modal-90w" onHide={handleCloseAnnounce}
                    aria-labelledby="example-custom-modal-styling-title" centered>
                    <Modal.Header closeButton>

                    </Modal.Header>

                    <Modal.Body className="p-0">
                        <div className='singaporeContent'>
                            <div className='singapore-box'>
                                <a href='https://www.mrmint.io/wbs_singapore_2023/' target='_blank' rel="noreferrer">
                                    <img src="images/singapore_post.jpg"/>
                                </a>
                            </div>
                        </div >
                    </Modal.Body>
                </Modal> :""}
            {/* -------------------- */}
            <Footer />
        </>

    )

}
export default Home;
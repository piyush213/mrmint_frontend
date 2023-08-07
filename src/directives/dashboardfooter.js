/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import config from '../coreFIles/config'
import { Link } from 'react-router-dom';

const Dashboardfooter = () => {


    return (

        <>
            <footer data-v-cf1a95c2 className="footer tm-wrapper tm-container tm-grid-base">
                <div data-v-cf1a95c2 className="row">
                    <div className="col-md-12 mb-5">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <img src="assets/images/logo.png" width="200px" alt=''/>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-12">
                        <br /><br /><br />
                        <div className="row">
                            <div className="col-md-5">
                                <br />
                                <div className="social-icon ">
                                    <ul>
                                        <li><a href="https://t.me/+I3LTxrzVXVhlOThl"><img src="images/telegram.png" alt='telegram'/></a></li>
                                        <li><a href="https://twitter.com/MrMint_Official"><img src="images/twiiter.png" alt='twitter'/></a></li>
                                        <li><a href="#"><img src="images/youtube.png" alt='youtube'/></a></li>
                                        <li><a href="#"><img src="images/medium.png" alt='medium'/></a></li>
                                        <li><a href="https://www.facebook.com/officialmrmint/"><img src="images/facebook.png" alt='facebook' /></a></li>
                                        <li><a href="https://instagram.com/mrmint_official?igshid=YmMyMTA2M2Y="><img src="images/instagram.png" alt='instagram' /></a></li>
                                        <li><a href="#"><img src="images/pinterest.png" alt='pinterest'/></a></li>
                                        <li><a href="#"><img src="images/reddit.png" alt='reddit'/></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-2">
                                <h2>MR MINT</h2>
                                <div className="footer-box">
                                    <ul>
                                        <li><a href="login.php">Buy Token</a></li>
                                        <li><a href="login.php">Wallet</a></li>
                                        <li><a href="login.php">Staking</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <h2>SUPPORT</h2>
                                <div className="footer-box">
                                    <ul>
                                        <li><a href="tos.php">Terms of Use</a></li>
                                        <li><a href="privacy.php">Privacy Policy</a></li>
                                        <li><a href="cookies.php">Cookie policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <h2>CONTACT</h2>
                                <div className="footer-box">
                                    <ul>
                                        <li><a href="contact.php">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <p className="Copyright">
                                    Copyright © 2022 <a href="#">mrmint.io</a>&nbsp;&nbsp;&nbsp;Created by <a href="#"> ESP Softtech Pvt Ltd</a>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </footer>
        </>

    )

}
export default Dashboardfooter;
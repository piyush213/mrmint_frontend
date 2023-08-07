/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { addNewsLetterAction } from '../Action/user.action';

const loginData = (!Cookies.get('loginSuccessMrMint')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMint'));
const Footer = () => {
    const [email, setEmail] = useState("");
    const inputHandler = (e) => {
        setEmail(e.target.value)
    }

    const addSubscriberAPI = async(e)=>{
        e.preventDefault();
        let res = await addNewsLetterAction({'email' : email});
        if (res.success) {
            toast.success(res.msg);
            setEmail('')
        } else {
            toast.error(res.msg);
        }
    }

    return (

        <>
        <Toaster/>
            <footer data-v-cf1a95c2 className="footer tm-wrapper tm-container tm-grid-base">
                <div data-v-cf1a95c2 className="row">
                    <div className="col-md-12 mb-5">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <img alt='' src="assets/images/logo.png" width="200px" />
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
                                        <li><a target="_blank" href="https://t.me/MrMint_Official" rel="noreferrer"><img src="images/telegram.png" alt='telegram'/></a></li>
                                        <li><a target="_blank"  rel="noreferrer" href="https://twitter.com/MrMint_Official"><img src="images/twiiter.png" alt='twitter'/></a></li>
                                        <li><a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UC--xdmFcnf_AKlZM6TRQSSQ?sub_confirmation=1"><img src="images/youtube.png" alt='youtube'/></a></li>
                                        <li><a target="_blank" rel="noreferrer" href="https://mrmintofficial.medium.com/"><img src="images/medium.png" alt='medium'/></a></li>
                                        <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/officialmrmint/"><img src="images/facebook.png" alt="facebook"/></a></li>
                                        <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/mrmint_official/?igshid=YmMyMTA2M2Y%3D"><img src="images/instagram.png" alt='instagram'/></a></li>
                                        {/* <li><a target="_blank" href="https://in.pinterest.com/MrMintOfficial/"><img src="images/pinterest.png" /></a></li> */}
                                        <li><a target="_blank" rel="noreferrer" href="https://www.reddit.com/r/MrMint_Official/"><img src="images/reddit.png" alt='reddit' /></a></li>
                                        <li><a target="_blank" rel="noreferrer" href="https://discord.gg/VqHnXe2EJ9"><img src="images/discord.png" alt='discord' /></a></li>
                                    </ul>
                                    <br />
                                    <h6>
                                        Stay updated with behind the scenes information, and engage your mind with
                                        the best content in blockchain.
                                    </h6>
                                    <br />
                                    <div className="pt-2">
                                        <h5 className="mb-2">Sign up to our Newsletter!</h5>
                                        <div className='row'>
                                            <div className='col-md-8 col-8 pr-0'>
                                                <input id="newsletterEmail" type="email" name="email" value={email} onChange={inputHandler} placeholder="Enter your email" 
                                                />
                                            </div>
                                            <div className='col-md-4 col-4 pl-0'>
                                                <button onClick={addSubscriberAPI} className=" btn-submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-2 mb-2">
                                <h2>MR. MINT</h2>
                                <div className="footer-box">
                                    <ul>
                                        {loginData.email ?
                                            <li><a href={`${config.baseUrl}buy`}>Buy Token</a></li>
                                            :
                                            <li><a href={`${config.baseUrl}login`}>Buy Token</a></li>
                                        }

                                        {loginData.email ?
                                            <li><a href={`${config.baseUrl}vestingwallet`}>Wallet</a></li>
                                            :
                                            <li><a href={`${config.baseUrl}login`}>Wallet</a></li>
                                        }

                                        {loginData.email ?
                                            <li><a href={`${config.baseUrl}staking`}>Staking</a></li>
                                            :
                                            <li><a href={`${config.baseUrl}login`}>Staking</a></li>
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2 mb-2">
                                <h2>SUPPORT</h2>
                                <div className="footer-box">
                                    <ul>
                                        <li><a href="tos">Terms of Use</a></li>
                                        <li><a href="privacypolicy">Privacy Policy</a></li>
                                        <li><a href="cookies">Cookie policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2 mb-2">
                                <h2>RESOURCES</h2>
                                <div className="footer-box">
                                    <ul>
                                        <li><a href="contactus">Contact Us</a></li>
                                        <li><a href={`${config.baseUrl}faq`}>FAQs</a></li>
                                        <li><a href={`${config.baseUrl}blog`}>Blog</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="d-inline-block">
                                    <p className="Copyright">
                                        Copyright © 2023 <a href="">mrmint.io.</a>&nbsp;Developed by{" "}
                                        <a target="_blank"  rel="noreferrer" href="https://espsofttech.com/"> ESP Softtech Pvt Ltd</a>
                                    </p>
                                </div>
                                <div
                                    className="d-inline-block pull-right text-right"
                                    style={{ marginTop: 27, fontSize: 15 }}
                                >
                                    <strong>Contract Address</strong> &nbsp;:&nbsp;
                                    <a  rel="noreferrer"
                                        target="_blank"
                                        style={{ color: "#c64eff" }}
                                        href="https://bscscan.com/token/0x3e81Aa8d6813Ec9D7E6ddB4e523fb1601a0e86F3"
                                    >
                                        0x3e81Aa8.......0e86F3
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </footer>
        </>

    )

}
export default Footer;
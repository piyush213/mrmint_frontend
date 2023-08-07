/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import config from '../coreFIles/config'
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { addNewsLetterAction } from '../Action/user.action';

const Academyfooter = () => {
    const [email, setEmail] = useState("");
    const inputHandler = (e) => {
        setEmail(e.target.value)
    }

    const addSubscriberAPI = async (e) => {
        e.preventDefault();
        let res = await addNewsLetterAction({ 'email': email });
        if (res.success) {
            toast.success(res.msg);
            setEmail('')
        } else {
            toast.error(res.msg);
        }
    }

    return (

        <>
            <Toaster />
            <footer className='academy-footer'>
                <div className='academy-footertop'>
                    <div className='container'>
                        <div className='mrlogo-block'>
                            <a className="navbar-brand" href={`${config.baseUrl}`}>
                                <img src="assets/images/logo.png" alt=''/>
                            </a>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                                <div className='academy-socialinfo'>
                                    <ul className='navbar'>
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://t.me/MrMint_Official" rel="noreferrer">
                                                <img src="images/telegram.png" alt='telegram'/>
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://twitter.com/MrMint_Official" rel="noreferrer">
                                                <img src="images/twiiter.png" alt='twitter'/>
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://www.youtube.com/channel/UC--xdmFcnf_AKlZM6TRQSSQ?sub_confirmation=1" rel="noreferrer">
                                                <img src="images/youtube.png" alt='youtube'/>
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://mrmintofficial.medium.com/" rel="noreferrer">
                                                <img src="images/medium.png" alt='medium'/>
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://www.facebook.com/officialmrmint/" rel="noreferrer">
                                                <img src="images/facebook.png" alt='facebook' />
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://www.instagram.com/mrmint_official/?igshid=YmMyMTA2M2Y%3D" rel="noreferrer">
                                                <img src="images/instagram.png" alt='instagram' />
                                            </a>
                                        </li>
                                        {/* <li><a target="_blank" href="https://in.pinterest.com/MrMintOfficial/"><img src="images/pinterest.png" /></a></li> */}
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://www.reddit.com/r/MrMint_Official/" rel="noreferrer">
                                                <img src="images/reddit.png"  alt='reddit'/>
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a target="_blank" className='nav-link' href="https://discord.gg/VqHnXe2EJ9" rel="noreferrer">
                                                <img src="images/discord.png"  alt='discord'/>
                                            </a>
                                        </li>
                                    </ul>
                                    <h4>
                                        Stay updated with behind the scenes information, and engage your mind with
                                        the best content in blockchain.
                                    </h4>
                                    <div className="aceday-subscribe pt-2">
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
                            <div className='col-md-3 col-sm-12'>
                                <div className='academy-footer-custome'>
                                    <h2 className='academy-footer-title'>
                                        Support
                                    </h2>
                                    <ul className='navbar'>
                                        <li className='nav-item'><a className='nav-link' href="tos">Terms of Use</a></li>
                                        <li className='nav-item'><a className='nav-link' href="privacypolicy">Privacy Policy</a></li>
                                        <li className='nav-item'><a className='nav-link' href="cookies">Cookie policy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-md-3 col-sm-12'>
                                <div className='academy-footer-custome'>
                                    <h2 className='academy-footer-title'>
                                        Contact
                                    </h2>
                                    <ul className='navbar'>
                                        <li className='nav-item'>
                                            <a className='nav-link' href="contactus">
                                                Contact Us
                                            </a>
                                        </li>
                                        <li className='nav-item'>
                                            <a className='nav-link' href="academy">
                                                Academy
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='academy-footerbottom'>
                    <div className='container'>
                        <p className="copyrighttext">
                            Copyright © 2022 <a href="" rel="noreferrer">mrmint.io.</a>&nbsp;Developed by{" "}
                            <a target="_blank" href="https://espsofttech.com/" rel="noreferrer"> ESP Softtech Pvt Ltd</a>
                        </p>
                    </div>
                </div>
            </footer>
        </>

    )

}
export default Academyfooter;
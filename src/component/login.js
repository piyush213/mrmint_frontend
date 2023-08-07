/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import toast, { Toaster } from 'react-hot-toast';
import {  useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
// import ReCAPTCHA from "react-google-recaptcha";
import Web3 from 'web3';

import { LoginAction, verifyAccountAction, LoginWithAddressAction } from '../Action/user.action';
import config from '../coreFIles/config';

const Login = () => {


    const [form, setForm] = useState({ email: '', password: '' })
    const [validatioError, setvalidatioError] = useState({});
    const [loginType, setloginType] = useState('');
    // const [isCaptcha, setisCaptcha] = useState(0);
    const [islogin, setislogin] = useState(false);
    let { token } = useParams();

    // let captchaKey =  config.TEST_SITE_KEY;
    let url1 = window.location.href;
    // if(url1 == 'https://mrmint.biz/mnt_business/' || url1 == 'https://mrmint.biz/mnt_business' || url1 == 'http://mrmint.biz/mnt_business/' || url1 == 'http://mrmint.biz/mnt_business' || url1 == 'mrmint.biz/mnt_business' || url1 == 'mrmint.biz/mnt_business/'){
    //     captchaKey =  config.TEST_SITE_KEY_BIZ;
    // }

    useEffect(() => {
        if (token) {
            verifyAccountAPI()
        }

        let url = window.location.href;
        let result = url.split('/');
        let Param = result[result.length - 1];
        let loginType = '';
        if (Param == 'mnt_business') {
            loginType = 'MLM';
        } else {
            loginType = 'login';
        }
        setloginType(loginType);

    }, []);

    const verifyAccountAPI = async () => {
        let res = await verifyAccountAction({ 'token': token });
        if (res.success) {
            toast.success(res.msg);
            setTimeout(() => {
                window.location.href = `${config.baseUrl}login`;
            }, 1000);
        } else {
            toast.error(res.msg);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
    };

    const inputHandler = (e) => {
        const { name, value, id } = e.target;
        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, [id]: '' }
            })
        }
        setForm((old) => {
            return { ...old, [name]: value }
        })
    }

    // const captcha = async => {
    //     setisCaptcha(1);
    //     setvalidatioError((old) => {
    //         return { ...old, ['isCaptchaError']: '' }
    //     })
    // }    

    function validate() {
        let emailError = "";
        let passwordError = "";
        // let isCaptchaError = "";

        if (form.email === '') {
            emailError = "Email is required."
        }
        if (form.password === '') {
            passwordError = "Password is required."
        }
        // if (isCaptcha == 0) {
        //     isCaptchaError = "Captcha required."
        // }

        if (emailError || passwordError
            // || isCaptchaError
        ) {
            setvalidatioError({
                emailError, passwordError
                // , isCaptchaError
            })
            return false
        } else {
            return true
        }
    }

    const SubmitForm = async (e) => {
        e.preventDefault();

        toast.error('Please connect your registered wallet first!');
        const isValid = validate();
        if (!isValid) {

        }
        else {
            let res = await LoginAction(form);
            if (res.success) {
                toast.success(res.msg);
                Cookies.set('loginSuccessMrMint', JSON.stringify(res.data));
                Cookies.set('loginType', loginType);
                setTimeout(() => {
                    window.location.href = loginType == 'MLM' ? `${config.baseUrl}mlmdashboard` : `${config.baseUrl}dashboard`;
                }, 2000);

            } else {
                toast.error(res.msg);
            }
        }
    }

    const connectMetasmaskForAddress = async (e) => {
        e.preventDefault()
        if (window.ethereum) {
            setislogin(true);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts[0]) {
                var web3 = new Web3(window.ethereum);

                let publicAddress = accounts[0];
                const { signature } = await new Promise((resolve, reject) =>
                    web3.eth.personal.sign(
                        web3.utils.fromUtf8(`Login Mrmint`),
                        publicAddress,
                        (err, signature) => {
                            if (err) return reject(err);
                            return resolve({ publicAddress, signature });
                        }
                    )
                );

                let res = await LoginWithAddressAction({ 'address': accounts[0], 'signature': signature });
                if (res.success) {
                    toast.success(res.msg);
                    // Cookies.set('loginSuccessMrMint', JSON.stringify(res.data), { domain: '.mrmint.io' });
                    // Cookies.set('loginType', loginType, { domain: '.mrmint.io' });
                    Cookies.set('loginSuccessMrMint', JSON.stringify(res.data));
                    Cookies.set('loginType', loginType);
                    setTimeout(() => {
                        window.location.href = loginType == 'MLM' ? `${config.baseUrl}mlmdashboard` : `${config.baseUrl}dashboard`;
                    }, 2000);
                } else {
                    setislogin(false);
                    toast.error(res.msg);
                }
            }
        } else {
            setislogin(false);
            toast.error('Please use Dapp browser!!');
        }
    }

    return (
        <>
            <Header />
            <Toaster />



            <div id="content" className="loginpage">
                <section data-v-71fd3f9c data-v-34f0d9a0 tag="section" className="login">
                    <div className='login-container'>
                        <div className="login-box">
                            <div className="login-form">
                                <div className='text-center'>
                                    <a href="#" className="login-logo" rel="noreferrer">
                                        <img src="assets/images/logo.png" alt="" />
                                    </a>
                                </div>
                                <div className="mb-2 text-center">
                                    Welcome back, <br />
                                    Please login to your account.
                                </div>

                                <form className="form-border" onSubmit={SubmitForm}>
                                    <div className="field-set mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="text" autoComplete="off" name="email" onChange={inputHandler} className="form-control" placeholder="Email" onPaste={handleChange} onKeyPress={(event) => {
                                            if (
                                                /[!^*()+=\-\[\]\/{}|:'`";<>?]/.test(
                                                    event.key
                                                )
                                            ) {
                                                event.preventDefault();
                                            }
                                        }} 
                                        id='emailError' />
                                        <span className="validationErr">{validatioError.emailError}</span>
                                    </div>

                                    <div className="field-set mb-3">
                                        <label className="form-label">Password</label>
                                        <a href={`${config.baseUrl}forgetpassword`} className="btn-link ml-auto pull-right">
                                            Forgot password?
                                        </a>
                                        <input type="password" name="password" className="form-control" autoComplete="off" onChange={inputHandler} placeholder="Password" id='passwordError' onPaste={handleChange} onKeyPress={(event) => {
                                            if (
                                                /[!^*`()+=\-\[\]\/{}|:'";<>?]/.test(
                                                    event.key
                                                )
                                            ) {
                                                event.preventDefault();
                                            }
                                        }}  />
                                        <span className="validationErr">{validatioError.passwordError}</span>
                                    </div>

                                    <div className="form-check d-flex  pl-2" style={{ position: "relative" }}>
                                        <div className="field-set ">
                                            {/* <ReCAPTCHA
                                            style={{ display: "inline-block" }}
                                            theme="dark"
                                            sitekey={captchaKey}
                                            onChange={captcha}
                                        /> */}
                                            <br />
                                            <span style={{ marginLeft: '-30px' }} className="validationErr">{validatioError.isCaptchaError}</span>
                                        </div>
                                    </div>


                                    <div className="login-form-actions">
                                        <div className='row align-center-items'>
                                            <div className='col-lg-12'>
                                                <div className="additional-link">
                                                    Don't have an account? <a href={`${config.baseUrl}signup`}>Signup</a>
                                                </div>

                                            </div>
                                            <div className='col-lg-12 mt-3'>
                                                <button type="submit" onClick={SubmitForm} className="btn w-100" style={{ height: "40px" }}>
                                                    Login
                                                </button>
                                            </div>
                                            <div className='col-lg-12 mt-3'>
                                                {islogin ?
                                                    <button disabled className="btn w-100" style={{ height: "40px" }}>
                                                        Processing...
                                                    </button>
                                                    :
                                                    <button onClick={connectMetasmaskForAddress} className="btn w-100" style={{ height: "40px" }}>
                                                        Connect wallet
                                                    </button>
                                                }

                                                <div className="login-form mt-5">
                                                    <div className="mb-1  notemsg">

                                                        <div className='mb-1' style={{ fontWeight: "bold", fontSize: "15px" }}>NOTE : </div>
                                                        As per our new security norms, You Must Connect your Registered Wallet to access the platform.
                                                        Please use Dapp Browser to Login

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
export default Login;
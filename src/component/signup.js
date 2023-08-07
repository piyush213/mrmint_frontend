import React, {  useState, useEffect } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import {  useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { RegisterAction } from '../Action/user.action';
import { Base64 } from 'js-base64';
import ReCAPTCHA from "react-google-recaptcha";
const Signup = () => {

    const [connectWalletAddress, setConnectWalletAddress] = useState('');
    const [form, setForm] = useState({ email: '', password: '', confirm_password: '', referral_address: '', termscondition: false })
    const [isCaptcha, setisCaptcha] = useState(0);
    const [validatioError, setvalidatioError] = useState({ firstNameError: '', lastNameError: '', emailError: '' });
    let { referral_address } = useParams();

    let captchaKey =  config.TEST_SITE_KEY;
    let url1 = window.location.href;
    if(url1 == 'https://mrmint.biz/signup/' || url1 == 'https://mrmint.biz/signup' || url1 == 'http://mrmint.biz/signup/' || url1 == 'http://mrmint.biz/signup' || url1 == 'mrmint.biz/signup/' || url1 == 'mrmint.biz/signup/'){
        captchaKey =  config.TEST_SITE_KEY_BIZ;
    }

    let url = window.location.href;
    let result = url.split('ref=');
    let Param = result[1];

    if (!referral_address && Param) {
        let decodeAddress = Base64.decode(Param);
        referral_address = decodeAddress
    } else if (!Param) {
        referral_address = referral_address;
    }

    useEffect(() => {

        if (referral_address) {
            setForm((old) => {
                return { ...old, 'referral_address': referral_address }
            })
        }

        setTimeout(async () => {
            if (window.ethereum) {
                const { ethereum } = window;
                setConnectWalletAddress(ethereum.selectedAddress);
            }
        }, 200);

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                setConnectWalletAddress(accounts[0]);
            })
        }

    }, []);

    const captcha = async => {
        setisCaptcha(1);
        setvalidatioError((old) => {
            return { ...old, ['isCaptchaError']: '' }
        })
    }

    const connectMetasmask = async() => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnectWalletAddress(accounts[0]);
        } else {
            toast.error('Please use Dapp browser!!');
        }
    }

    const inputHandler = (e) => {
        const { name, value, id } = e.target
        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, [id]: '' }
            })
        }

        setForm((old) => {
            return { ...old, [name]: value }
        })
    }

    function validate() {
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";
        let termsconditionError = "";
        let isCaptchaError = "";

        if (form.email === '') {
            emailError = "Email is required."
        }
        if (form.password === '') {
            passwordError = "Password is required."
        }
        if (form.confirm_password === '') {
            confirmPasswordError = "Confirm password is required."
        }
        if (form.password != form.confirm_password && (form.password && form.confirm_password)) {
            confirmPasswordError = "Password and confirm password does not match."
        }
        if (form.termscondition === false) {
            termsconditionError = "Terms and conditions checkbox required."
        }
        if (isCaptcha == 0) {
            isCaptchaError = "Captcha required."
        }

        if (emailError || passwordError || confirmPasswordError || termsconditionError, isCaptchaError) {
            setvalidatioError({
                emailError, passwordError, confirmPasswordError, termsconditionError, isCaptchaError
            })
            return false
        } else {
            return true
        }
    }

    const SubmitForm = async (e) => {
        e.preventDefault()
        const isValid = validate();
        if (!isValid) {

        }
        else {
            if (!connectWalletAddress || connectWalletAddress == '') {
                toast.error('Please connect your metamask wallet!!');
                return false;
            } else {
                form.bnb_address = connectWalletAddress;
                form.referral_address = form.referral_address ? form.referral_address : referral_address ? referral_address : config.adminAddress;
                let res = await RegisterAction(form);
                if (res.success) {
                    toast.success(res.msg);
                    setTimeout(() => {
                        window.location.href = `${config.baseUrl}login`
                    }, 2000);
                } else {
                    toast.error(res.msg);
                }
            }
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
                                <div className="login-welcome">
                                    Register With Us
                                </div>
                                <div className='mt-3 mb-3'>
                                    <img alt='' src="assets/images/metamask-2728406-2261817.png" style={{ width: 20, float: "left", paddingTop: 5 }} />
                                    <small className="text-white" style={{ fontSize: 12, padding: "0px 10px", fontWeight: "bold" }} >
                                        {connectWalletAddress ? connectWalletAddress :
                                            <span onClick={connectMetasmask} style={{ cursor: 'pointer' }}>Please connect metamask</span>}
                                    </small>
                                </div>
                                <form className="form-border" onSubmit={SubmitForm}>
                                    <div className="field-set mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="text" autoComplete="off" name="email" onChange={inputHandler} className="form-control" placeholder="Email" id='emailError' />
                                        <span className="validationErr">{validatioError.emailError}</span>
                                    </div>

                                    <div className="field-set mb-3">
                                        <label className="form-label">Password</label>
                                        <input type="password" name="password" className="form-control" autoComplete="off" onChange={inputHandler} placeholder="Password" id='passwordError' />
                                        <span className="validationErr">{validatioError.passwordError}</span>
                                    </div>

                                    <div className="field-set mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <input type="password" name="confirm_password" className="form-control" onChange={inputHandler} placeholder="Confirm Password" id='confirmPasswordError' />
                                        <span className="validationErr">{validatioError.confirmPasswordError}</span>
                                    </div>

                                    <div className="field-set mb-3">
                                        <label className="form-label">Referral id(optional)</label>
                                        <input type="text" name="referral_address" className="form-control" onChange={inputHandler} value={form.referral_address} placeholder="Eg. 0x0000000000000000000" />
                                        <span className="validationErr">{validatioError.walletAddressError}</span>
                                    </div>

                                    <div className="form-check d-flex mb-3 pl-2" style={{position:"relative"}}>
                                    <div className="field-set mb-3">
                                        <ReCAPTCHA
                                            style={{ display: "inline-block" }}
                                            theme="dark"
                                            sitekey={captchaKey}
                                            onChange={captcha}
                                        /><br />
                                        <span style={{marginLeft : '-30px'}} className="validationErr">{validatioError.isCaptchaError}</span>
                                        </div>
                                    </div>

                                    <div className="form-check d-flex mb-3 pl-2">
                                        <input className="form-check-input me-2" id='termsconditionError' onChange={inputHandler} type="checkbox" name="termscondition" />
                                        <label className="form-check-label" htmlFor="form2Example3g">
                                            I agree to the <a href={`${config.baseUrl}tos`}> terms &amp; conditions </a> and <a href={`${config.baseUrl}privacypolicy`}> privacy policy </a>
                                        </label>
                                    </div>
                                    <span className="validationErr">{validatioError.termsconditionError}</span>

                                    <div className="field-set mb-1 ">
                                        {connectWalletAddress ?
                                            <button type="submit" className="btn w-100">
                                                <span className="icon"> </span> Register Now
                                            </button>
                                            :
                                            <button type="button" onClick={connectMetasmask} className="btn w-100">
                                                <span className="icon"> </span> Connect Wallet
                                            </button>
                                        }

                                        <div className="text-center">
                                            Already have an account? <a className="hoverColor" href={`${config.baseUrl}login`}>Login</a>
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
export default Signup;
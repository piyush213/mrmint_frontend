import React, {  useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import toast, { Toaster } from 'react-hot-toast';
import {  useParams } from 'react-router-dom';

import { ResetPasswordAction } from '../Action/user.action';
import config from '../coreFIles/config';

const Resetpassword = () => {
    let { token } = useParams();
    const [form, setForm] = useState({ password: '', confirm_password: '', token: token })
    const [validatioError, setvalidatioError] = useState({});

    const inputHandler = (e) => {
        const { name, value, id } = e.target
        setForm((old) => {
            return { ...old, [name]: value }
        })

        if (value != '') {
            setvalidatioError((old) => {
                return { ...old, [id]: '' }
            })
        }        
    }

    function validate() {
        let passwordError = "";
        let confirmPasswordError = "";

        if (form.password === '') {
            passwordError = "Password is required."
        }
        if (form.confirm_password === '') {
            confirmPasswordError = "Confirm password is required."
        }
        if (form.password != form.confirm_password && (form.password && form.confirm_password)) {
            confirmPasswordError = "Password and confirm password does not match."
        }
        if (passwordError || confirmPasswordError) {
            setvalidatioError({
                passwordError, confirmPasswordError
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
            let res = await ResetPasswordAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}login`;
                }, 2000);
            } else {
                toast.error(res.msg);
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
                            <div className="login-form text-center">
                                <p className="mb-2 ">
                                    Generate Your Password
                                </p>
                                <small>Enter your email address below. If we have it on file, we will <br />send you a reset email.</small> <br />

                                <form className="form-border" onSubmit={SubmitForm}>
                                    <div className="field-set mt-4 mb-3">
                                        <input type="password" name="password" className="form-control" autoComplete="off" onChange={inputHandler} placeholder="Password" id='passwordError' />
                                        <span className="validationErr">{validatioError.passwordError}</span>
                                    </div>

                                    <div className="field-set mb-3">
                                        <input type="password" name="confirm_password" className="form-control" onChange={inputHandler} placeholder="Confirm Password" id='confirmPasswordError' />
                                        <span className="validationErr">{validatioError.confirmPasswordError}</span>
                                    </div>

                                    <div className="login-form-actions">
                                        <div className='row align-center-items'>
                                            <div className='col-lg-12 mt-3'>
                                                <button type="submit" className="btn w-100" style={{ height: "40px" }}>
                                                    Submit
                                                </button>
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
export default Resetpassword;
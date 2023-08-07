import React, { useState } from 'react';
import Header from '../directives/header';
import Footer from '../directives/footer';
import toast, { Toaster } from 'react-hot-toast';
import { ForgotPasswordAction } from '../Action/user.action';

const Forgetpassword = () => {

    const [form, setForm] = useState({ email: '' })
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
        let emailError = "";
        let passwordError = "";

        if (form.email === '') {
            emailError = "Email is required."
        }
        if (form.password === '') {
            passwordError = "Password is required."
        }
        if (emailError || passwordError) {
            setvalidatioError({
                emailError, passwordError
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
            let res = await ForgotPasswordAction(form);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.reload();
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
                                <small>Enter your email address below. If we have it on file, we will <br />send you a reset email.</small>

                                <form className="form-border" onSubmit={SubmitForm}>
                                    <div className="mt-4 mb-3">
                                        <input type="email" name="email" onChange={inputHandler} className="form-control text-white" placeholder='dummy@gmail.com' id='emailError' />
                                    </div>
                                    <span className="validationErr">{validatioError.emailError}</span>

                                    <div className="login-form-actions">
                                        <div className='row align-center-items'>
                                            <div className='col-lg-12 mt-3'>
                                                <button type="submit" className="btn w-100" style={{ height: "40px" }}>
                                                    Request Resent Link
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
export default Forgetpassword;
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState, useEffect } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import {  useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { ContactFormAction } from '../Action/user.action';

const Contactus = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [validatioError, setvalidatioError] = useState({ nameError: '', emailError: '', phoneError: '', subjectError: '', messageError: '' });
    let { referral_address } = useParams();

    useEffect(() => {

    }, []);

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
        let nameError = "";
        let emailError = "";
        let phoneError = "";
        let subjectError = "";
        let messageError = "";

        if (form.name === '') {
            nameError = "Name is required."
        }
        if (form.email === '') {
            emailError = "Email is required."
        }
        if (form.phone === '') {
            phoneError = "Phone is required."
        }
        if (form.subject === '') {
            subjectError = "Subject is required."
        }
        if (form.message === '') {
            messageError = "Message is required."
        }
        if (nameError || emailError || phoneError || subjectError || messageError) {
            setvalidatioError({
                nameError ,emailError, phoneError, subjectError, messageError
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
            let res = await ContactFormAction(form);
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
            <Toaster/>
            <div id="content" className="loginpage">
                <div className="breadcrumb-wrap bg-f br-4">
                    <div className="overlay bg-black op-7" />
                    <div className="container">
                        <div className="breadcrumb-title">
                            <h2>Contact Us</h2>
                            <ul className="breadcrumb-menu list-style">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='contactus'>
                    <div className='container'>
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="contact-img mb-4">
                                    <img src="images/contact-img.png" alt="Image" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contact-form">
                                    <form className="form-wrap" id="contactForm" onSubmit={SubmitForm}>
                                        <div className="content-title mb-20">
                                            <h2>Contact Us</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        onChange={inputHandler} type="text"
                                                        name="name"
                                                        placeholder="Name*"
                                                        id="nameError"
                                                        required=""
                                                        data-error="Please enter your name"
                                                    />
                                                    <span className="validationErr">{validatioError.nameError}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        onChange={inputHandler} type="email"
                                                        name="email"
                                                        id="emailError"
                                                        required=""
                                                        placeholder="Email*"
                                                        data-error="Please enter your email"
                                                    />
                                                    <span className="validationErr">{validatioError.emailError}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        onChange={inputHandler} type="text"
                                                        name="phone"
                                                        placeholder="Phone*"
                                                        id="phoneError"
                                                        required=""
                                                        data-error="Please enter your phone number"
                                                    />
                                                    <span className="validationErr">{validatioError.phoneError}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <input
                                                        onChange={inputHandler} type="text"
                                                        name="subject"
                                                        placeholder="Subject*"
                                                        id="subjectError"
                                                        required=""
                                                        data-error="Please enter your subject"
                                                    />
                                                    <span className="validationErr">{validatioError.subjectError}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group v1">
                                                    <textarea
                                                        name="message"
                                                        onChange={inputHandler}
                                                        id="messageError"
                                                        placeholder="Your Messages.."
                                                        cols={30}
                                                        rows={10}
                                                        required=""
                                                        data-error="Please enter your message"
                                                        defaultValue={""}
                                                    />
                                                    <span className="validationErr">{validatioError.messageError}</span>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <button type="submit" className="btn style1">
                                                    Submit
                                                </button>
                                                <div id="msgSubmit" className="h3 text-center hidden" />
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>



            </div>
            <Footer />
        </>

    )

}
export default Contactus;
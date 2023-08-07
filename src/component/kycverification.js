/* eslint-disable jsx-a11y/alt-text */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import toast, { Toaster } from 'react-hot-toast';
import { getProfileAction, getListofKycDocument, checkemailandOtp, sendOtp, getVerificationStatus, uploadKYCdocument } from '../Action/user.action';

const Kycverification = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [userDetails, setuserDetails] = useState({});
    const [image_preview, setimage_preview] = useState('');
    const [image_preview2, setimage_preview2] = useState('');
    const [image_file, setimage_file] = useState('');
    const [image_file2, setimage_file2] = useState('');
    const [email, setemail] = useState('')
    const [emailotpmsg, setemailotpmsg] = useState('')
    const [verificationstatus, setverificationstatus] = useState(0)
    const [listofacceptedId, setlistofacceptedId] = useState([])
    const [Idselected, setIdselected] = useState('')
    const [Idnumber, setIdnumber] = useState('')
    const [validatioError, setvalidatioError] = useState({ idtype:'', idcard:'', selfidoc:'', idnumber:'', myotp:''});


    useEffect(() => {
        getProfileAPI()
    }, []);

    const getProfileAPI = async () => {
        let res = await getProfileAction();
        if (res.success) {
            setuserDetails(res.data)
            setemail(res.data.email)
            getverificationstatus(res.data.email)
        }
    }

    const getverificationstatus = async (emaildata) => {
        let data = { email: `${emaildata}` }
        let res = await getVerificationStatus(data);
        if (res.success) {
            setverificationstatus(res.msg.verification_status)
            if (res.msg.verification_status == 1 || res.msg.verification_status == 9) {
                let namedata = await getListofKycDocument();
                setlistofacceptedId(namedata.data)
            } else if (res.msg.verification_status == 0) {
                setuserDetails((old) => {
                    return { ...old, OTPvalue: '' }
                })
            }
        }
    }

    function validate(data) {
        let myotp;
        let idtype;
        let idcard;
        let selfidoc;
        let idnumber;

        if (data.OTPvalue == '') {
            myotp = "Otp is required."
        }


        if (data.idtype === '') {
            idtype = "Select any one Id type."
        }
        if (data.idcard === '') {
            idcard = "Photo of Idcard is required."
        }
        if (data.selfidoc === '') {
            selfidoc = "Selfie with Id is required."
        }
        if (data.idnumber === '') {
            idnumber = "Id number is required."
        }

        if (idtype || idcard || selfidoc || idnumber || myotp) {
            setvalidatioError({
                idtype:idtype, idcard:idcard, selfidoc:selfidoc, idnumber:idnumber, myotp:myotp
            })
            return false
        } else {
            return true
        }
    }

    const sendOtptomail = async () => {
        setemailotpmsg('Sending OTP to your email . . .')

        let otpdata = { email: `${email}` }
        let res = await sendOtp(otpdata);
        if (res.success) {
            setemailotpmsg(res.msg)
        }
    }

    const inputHandler = (e) => {
        const { name, value } = e.target
        setuserDetails((old) => {
            return { ...old, [name]: value }
        })
        setvalidatioError((old)=>{
            return{...old, myotp:''}
        })
    }



    const otpsubmit = async () => {
        let verifingotpdata = { email: `${email}`, otp: `${userDetails.OTPvalue}` }

        const isValid = validate(userDetails);
        if (!isValid) {

        }
        else {
            let res = await checkemailandOtp(verifingotpdata);
            if (res.success) {
                toast.success(res.msg)
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}kycverification`
                }, 500);
            } else {
                toast.error(res.msg)
            }
        }
    }

    const toggleManage = (data) => {
        settoggleSet(data)
    }
    ///-------------------------5555555555555555555555555--document upload code

    const gettypeofId = async (e) => {
        setIdselected(e.target.value)
        setvalidatioError((old)=>{
            return{...old, idtype:''}
        })
    }

    const setidnumber = async (e) => {
        setIdnumber(e.target.value)
        setvalidatioError((old)=>{
            return{...old, idnumber:''}
        })
    }

    const documentpic = async (e) => {
        setvalidatioError((old)=>{
            return{...old, idcard:''}
        })
        e.preventDefault()
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        setimage_file(image_as_files);
        setimage_preview(image_as_base64);
    }
    const documentselfie = async (e) => {
        setvalidatioError((old)=>{
            return{...old, selfidoc:''}
        })
        e.preventDefault()
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        setimage_file2(image_as_files);
        setimage_preview2(image_as_base64);
    }

    const upload = async (e) => {
        e.preventDefault()
        let userDocument = {

            'email': userDetails.email,
            'idtype': Idselected,
            'idcard': image_file,
            'selfidoc': image_file2,
            'idnumber': Idnumber

        }
        const isValid = validate(userDocument);
        if (!isValid) {

        }
        else {


            let res = await uploadKYCdocument(userDocument);
            if (res.success) {
                toast.success(res.msg);
                setTimeout(() => {
                    window.location.href = `${config.baseUrl}kycverification`
                }, 500);
            } else {
                toast.error(res.msg);
            }
        }
    }


    return (
        <>
            <div className={`page-wrapper${toggleSet == 1 ? '' : ' toggled'}`}>
                <Dashboardsidebar />
                <div className="main-container">
                    <Dashboardheader clickToggle={toggleManage} />
                    <Toaster />
                    <div className="content-wrapper-scroll">
                        <div className="content-wrapper">
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='card profile_box p-4 pt-5 pb-5'>
                                            <div className='row'>

                                                <div className='col-lg-9'>

                                                    <h4>Step : 1</h4><hr></hr>
                                                    {verificationstatus == 0 ? <>
                                                        <div className='form-group mb-3'>
                                                            <label className='mb-1'>Email</label>
                                                            <input type="text" name='email' placeholder='Enter email' disabled value={userDetails?.email ? userDetails?.email : ''} className='form-control' />

                                                        </div>
                                                        <button className='btn btn-primary' onClick={sendOtptomail} >Send OTP</button>
                                                        <small>     {emailotpmsg}</small>

                                                        <br></br><br></br>

                                                        <div className='form-group mb-3'>
                                                            <label className='mb-1'>Enter your OTP here</label>
                                                            <input type="text" name='OTPvalue' onChange={inputHandler} value={userDetails.OTPvalue} placeholder='Enter your otp here' className='form-control' min="4" max="4" />
                                                        <span className="validationErr">{validatioError.myotp}</span>
                                                        </div>

                                                        <button className='btn btn-primary' onClick={otpsubmit}>Verify OTP</button>
                                                    </> : <div className='form-group mb-3'>  Email verification complete. </div>}
                                                </div>
                                                {/* //step 2 */}
                                                <div className='col-lg-9'>
                                                    <br></br>
                                                    <h4>Step : 2</h4><hr></hr>

                                                    {verificationstatus == 9 ? <>
                                                    <p class='text-danger'>Your document are rejected by admin.Please re-submit with a clear photos.</p>
                                                
                                                    </>:<></>}

                                                    {verificationstatus == 1 || verificationstatus == 9 ? <>
                                                        {/* upload document */}
                                                        <form onSubmit={upload} >
                                                            <div className='row'>
                                                            <div className='col-md-3 form-group mb-3'>
                                                                <label for="formFileSm" className="form">Select the ID type</label>
                                                                <select class="form-select" onClick={gettypeofId} aria-label="Default select example"  >
                                                                    <option ></option>
                                                                    {listofacceptedId.map((i) => {
                                                                        return <option value={i.name} key={i.name} >{i.name}</option>
                                                                    })}

                                                                </select>
                                                                <span className="validationErr">{validatioError.idtype}</span>
                                                            </div>
                                                                <div className='col-md-9 form-group'>
                                                                <label for="formFileSm" className="form">Enter unique Id number</label>
                                                            <input type="text" class="form-control" placeholder="Enter unique id number " aria-label="Username" onChange={setidnumber} />
                                                            
                                                            <span className="validationErr">{validatioError.idnumber}</span>
                                                            </div>
                                                            </div>
                                                                <div className='row'>
                                                                    <div className='step_box pt-4'>
                                                                    <div className='col-md-6 form-group'>
                                                                <label for="formFileSm" className="form">Upload Proof Identity</label>

                                                                <div className='profile'>

                                                                    <div className='choose_img'>
                                                                    {image_preview ?
                                                                        <img style={{ height: '190px', width: '190px', objectFit: 'cover' }} src={image_preview} className='d-profile-img-edit img-fluid' alt=''/>
                                                                        :
                                                                        <img style={{ height: '190px', width: '190px', objectFit: 'cover' }} src="images/idcard.png" className='d-profile-img-edit img-fluid' alt=''/>

                                                                    }
                                                                </div>

                                                                    <input onChange={documentpic} type="file" placeholder='qwertgy' id='upload_profile_img'/>
                                                                <span className="validationErr">{validatioError.idcard}</span>
                                                                </div>
                                                                </div>
                                                                <div className='col-md-6 form-group text-end'>
                                                                <label for="formFileLg" className="form">Take Selfie With Identity</label>
                                                                <div className='profile '>

                                                                    {image_preview2 ?
                                                                        <img style={{ height: '190px', width: '190px', objectFit: 'cover' }} src={image_preview2} className='d-profile-img-edit img-fluid' />
                                                                        :

                                                                        <img style={{ height: '190px', width: '190px', objectFit: 'cover' }} src="images/selfiwithidentity.png" className='d-profile-img-edit img-fluid' />

                                                                    }
                                                                    <input onChange={documentselfie} type="file" id='upload_profile_img'/>
                                                                </div>
                                                                <span className="validationErr">{validatioError.selfidoc}</span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className='text-center'>
                                                            <button type='submit' className='btn btn-primary mt-4'>Upload</button>
                                                            </div>
                                                        </form>
                                                    </>
                                                        : verificationstatus == 2 ? <div className='form-group mb-3'>  Document is send to admin for verification. </div> : verificationstatus == 3 ? <>Document verification complete.</> : <></>}

                                                    <br></br> <br></br>
                                                    {/* step3 */}
                                                    <h4>Step : 3</h4><hr></hr>
                                                    {verificationstatus == 3 ? <>Kyc complete</> : <></>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Kycverification;
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Dashboardheader from '../directives/dashboardheader';
import Dashboardsidebar from '../directives/dashboardsidebar';
import toast, { Toaster } from 'react-hot-toast';
import { getProfileAction, UpdateProfileAction } from '../Action/user.action';
import Cookies from 'js-cookie'

const Profile = () => {
    const [toggleSet, settoggleSet] = useState(1)
    const [userDetails, setuserDetails] = useState({});
    const [image_preview, setimage_preview] = useState('');
    const [image_file, setimage_file] = useState('');
    const[email,setemail] = useState('')

    useEffect(() => {
        getProfileAPI()
    }, []);

    const getProfileAPI = async () => {
        let res = await getProfileAction();
        if (res.success) {
            setuserDetails(res.data)
            setemail(res.data.email)
        }
    }

    const profilePicChange = async (e) => {
        e.preventDefault()
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        setimage_file(image_as_files);
        setimage_preview(image_as_base64);
    }

    const handleChange = (e) => {
        e.preventDefault();
    };

    const inputHandler = (e) => {
        const { name, value } = e.target
        setuserDetails((old) => {
            return { ...old, [name]: value }
        })
    }

    const SubmitForm = async (e) => {
        e.preventDefault()
        let old_profile_pic = '';
        if (!image_file) {
            old_profile_pic = userDetails?.profile_pic ? userDetails?.profile_pic : ''
        }

        let userDatawithoutemail = {
            'first_name': userDetails?.first_name ? userDetails?.first_name : '',
            'last_name': userDetails?.last_name ? userDetails?.last_name : '',
            
            'bio': userDetails?.bio ? userDetails?.bio : '',
            'profile_pic': image_file,
            'old_profile_pic': old_profile_pic,
            'whichquerytorun' : "updateuser_without_email"
        }
        let userDatawithemail = {
            'first_name': userDetails?.first_name ? userDetails?.first_name : '',
            'last_name': userDetails?.last_name ? userDetails?.last_name : '',
            'email': userDetails.email,
            'bio': userDetails?.bio ? userDetails?.bio : '',
            'profile_pic': image_file,
            'old_profile_pic': old_profile_pic,
            'whichquerytorun' : "updateuser_with_email"
        }
        let userData;
        if (email == userDetails.email){
            userData = userDatawithoutemail
        }else{
            userData = userDatawithemail
        }

        let res = await UpdateProfileAction(userData);
        if (res.success) {
            toast.success(res.msg);
            setTimeout(() => {
                email == userDetails.email? window.location.href = `${config.baseUrl}profile`:logout()
            }, 2000);
        } else {
            toast.error(res.msg);
        }
    }
    const logout = async () => {
        Cookies.remove('loginType', { domain: '.mrmint.io' });
    
        Cookies.remove('loginSuccessMrMint', { domain: '.mrmint.io' });
    
        window.localStorage.clear();
        setTimeout(() => {
          window.location.href = `${config.baseUrl}`
        });
      }

    const toggleManage = (data) => {
        settoggleSet(data)
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
                                                <div className='col-lg-3'>
                                                    <h4>Profile image</h4>
                                                    <div className='profile'>

                                                        {image_preview ?
                                                            <img style={{ height: '190px', width: '190px', objectFit: 'cover' }} alt='' src={image_preview} className='d-profile-img-edit img-fluid' />
                                                            :
                                                            !userDetails?.profile_pic || userDetails?.profile_pic == undefined || userDetails?.profile_pic == 'undefined' ?
                                                                <img alt='' style={{ height: '190px', width: '190px', objectFit: 'cover' }} src="images/default-user-icon.jpg" className='d-profile-img-edit img-fluid' />
                                                                :
                                                                <img alt='' style={{ height: '190px', width: '190px', objectFit: 'cover' }} src={`${config.imageUrl + userDetails?.profile_pic}`} className='d-profile-img-edit img-fluid' />
                                                        }
                                                        <input onChange={profilePicChange} type="file" id="upload_profile_img" />
                                                    </div>
                                                </div>
                                                <div className='col-lg-9'>
                                                    <div className='form-group mb-3'>
                                                        <label className='mb-1'>First Name</label>
                                                        <input type="text" name='first_name' onChange={inputHandler} onPaste={handleChange} onKeyPress={(event) => {
                                            if (
                                                /[!^*()+=\-\[\]\/{}|:'`";<>?]/.test(
                                                    event.key
                                                )
                                            ) {
                                                event.preventDefault();
                                            }
                                        }}  placeholder='Enter first name' value={userDetails?.first_name ? userDetails?.first_name : ''} className='form-control' />
                                                    </div>

                                                    <div className='form-group mb-3'>
                                                        <label className='mb-1'>Last Name</label>
                                                        <input type="text" name='last_name' onPaste={handleChange} onKeyPress={(event) => {
                                            if (
                                                /[!^*()+=\-\[\]\/{}|:'`";<>?]/.test(
                                                    event.key
                                                )
                                            ) {
                                                event.preventDefault();
                                            }
                                        }}  onChange={inputHandler} placeholder='Enter last name' value={userDetails?.last_name ? userDetails?.last_name : ''} className='form-control' />
                                                    </div>

                                                    <div className='form-group mb-3'>
                                                        <label className='mb-1'>Email</label>
                                                        <input type="text" name='email' onPaste={handleChange} onKeyPress={(event) => {
                                            if (
                                                /[!^*()+=\-\[\]\/{}|:'`";<>?]/.test(
                                                    event.key
                                                )
                                            ) {
                                                event.preventDefault();
                                            }
                                        }}  onChange={inputHandler} placeholder='Enter email' disabled={userDetails.old_email == null ? false : true} value={userDetails?.email ? userDetails?.email : ''} className='form-control' />
                                                        {userDetails.old_email == null ? <small>You can edit your email only once</small> : ''}
                                                    </div>

                                                    <div className='form-group mb-3'>
                                                        <label className='mb-1'>Bio (Max 255 words)</label>
                                                        <textarea type="text" onPaste={handleChange} onKeyPress={(event) => {
                                            if (
                                                /[!^*()+=\-\[\]\/{}|:'`";<>?]/.test(
                                                    event.key
                                                )
                                            ) {
                                                event.preventDefault();
                                            }
                                        }}  name='bio' onChange={inputHandler} placeholder='Tell the world who you are!' className='form-control' value={userDetails?.bio ? userDetails?.bio : ''} />
                                                    </div>

                                                    <button className='btn btn-primary' onClick={SubmitForm}>Update profile</button>
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
export default Profile;
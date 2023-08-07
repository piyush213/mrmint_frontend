/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, TelegramShareButton, TelegramIcon, RedditShareButton, RedditIcon } from 'react-share';
import 'react-accessible-accordion/dist/fancy-example.css';
import moment from 'moment';
import { getuserBlogidAction, getRecentuserBlogidAction } from '../Action/user.action';
const Blogdetail = () => {
    const [getblogidlist, setBlogid] = useState({});
    const [getRecntuserbloglist, setuserRecentBlogList] = useState([]);
    const [form, setForm] = useState({ id: '', image: '', previewImage: '', title: '', description: '' });
    useEffect(() => {
        getblogid();
        getRecentuserBlog();
    }, []);

    const getblogid = async () => {
        const id = window.location.href.split("/").pop();
        let res = await getuserBlogidAction({ 'id': id });
        if (res.success) {
            setBlogid(res.data)
            let data = res.data[0];
            setForm((old) => {
                return { ...old, "id": id, 'previewImage': config.imageUrl + data.image, 'title': data.title, 'description': data.description, 'created_at': data.created_at }
            })
        }
    }
    const getRecentuserBlog = async () => {
        let res = await getRecentuserBlogidAction();
        if (res.success) {
            setuserRecentBlogList(res.data)
        }
    }
    return (
        <>
            <Header />
            <div id="content">

                <div className='banner-blog'>

                    <img src='assets/images/pink-elegant-geometrical-texture.png' className='img-responsive' />
                    <div className='blog-head'>
                        <h2>{form.title}</h2>
                        <p>Written By Mr Mint {form.created_at}</p>
                    </div>
                </div>

                <section className="mr-blog-details">
                    <div className="container">
                        <div className="row gx-5">
                            <div className="col-sm-8 col-md-8">
                                <div className='mr-blog-informations'>
                                    <div className='mr-imgboxs-block'>
                                        <div className='mr-imgbox-inner'>
                                            <img src={form.previewImage} alt="Image" />
                                        </div>
                                    </div>
                                    <div className='mr-blog-contents mb-2'>
                                        <h4>{form.title}?</h4>
                                        <p>
                                            <div dangerouslySetInnerHTML={{ __html: form.description }} />

                                        </p>
                                        <br />
                                    </div>


                                    <div className="mr-post-meta-option">
                                        <span>
                                            Share this post on social networks
                                        </span>
                                        <ul className="mr-social-profile">

                                            <TwitterShareButton
                                                url={window.location.href}
                                                title={form.title}
                                                className="Demo__some-network__share-button">
                                                <TwitterIcon
                                                    size={32}
                                                    round />
                                            </TwitterShareButton> &nbsp;

                                            <TelegramShareButton
                                                url={window.location.href}
                                                title={form.title}
                                                className="Demo__some-network__share-button">
                                                <TelegramIcon
                                                    size={32}
                                                    round />
                                            </TelegramShareButton> &nbsp;

                                            <FacebookShareButton
                                                url={window.location.href}
                                                title={form.title}
                                                className="Demo__some-network__share-button">
                                                <FacebookIcon
                                                    size={32}
                                                    round />
                                            </FacebookShareButton> &nbsp;

                                            <RedditShareButton
                                                url={window.location.href}
                                                title={form.title}
                                                className="Demo__some-network__share-button">
                                                <RedditIcon
                                                    size={32}
                                                    round />
                                            </RedditShareButton>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <div className="mr-blogrecent-block">
                                    <h4 className='mr-recent-title'>
                                        Recent Posts
                                    </h4>

                                    <div className='mr-blogrecent-list'>
                                        {getRecntuserbloglist.map(data => (
                                            <div className='media mr-blogrecent-item'>
                                                <div className='mr-imgboxs-block'>
                                                    <img src={`${config.imageUrl + data.image}`} alt="Image" />
                                                </div>
                                                <div className="mr-blogrecent-content">
                                                    <h6>
                                                        <a href={`${config.baseUrl}Blogdetail/` + data.id} className='links'>
                                                            {data.title} 
                                                        </a>
                                                    </h6>
                                                    <span className='time'>
                                                        {moment(data.datetime).format('DD/MM/YYYY')}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )

}
export default Blogdetail;
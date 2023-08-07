/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react'
import Academyheader from '../directives/academyheader'
import Academyfooter from '../directives/academyfooter'
import 'react-accessible-accordion/dist/fancy-example.css';
import { getVideosAction } from '../Action/user.action';
import moment from 'moment';
import { Helmet } from 'react-helmet';

const Videos = () => {
    const [videosList, setVideos] = useState([]);

    useEffect(() => {
        getVideosList();
    }, []);

    const getVideosList = async () => {
        let res = await getVideosAction();
        if (res.success) {
            setVideos(res.data)
        }
    }

    return (
        <>
            <Academyheader />
            <Helmet>
                <title>Exploring the Fascinating World of Crypto and Blockchain: A Range of Video Series
                </title>
                <meta title="Exploring the Fascinating World of Crypto and Blockchain: A Range of Video Series			
" content="IE=edge" />
                <meta name="description" content="Dive into the captivating realm of crypto and blockchain through our engaging videos. Discover the latest trends, insightful discussions, and expert perspectives on Crypto and blockchain."
                />
                <meta property="og:url" content="https://mrmint.io/videos			
"/>

                <meta name="keywords" content="Blockchain Videos, Crypto Currency Videos, Web 3.0 videos			
"/>

            </Helmet>
            <div className='academy-contant academy-contant1' id="content">
                <div class="mrpage-title-block">
                    <div class="container">
                        <h4>Videos</h4>
                    </div>
                </div>

                <section className='mr-academytrades-block' id="articlesBlock">
                    <div className='container'>
                        <div className='row mt-5'>
                            {videosList.length > 0 ?
                                videosList.map((articleData, i) => (
                                    <div className='col-lg-4 col-md-6 col-sm-12'>
                                        <div class="mr-academytrades-item">
                                            <div class="mr-imgbox-block">
                                                {articleData.vedio_link ?
                                                    <>
                                                        <iframe width="100%" height="100%"
                                                            src={articleData.vedio_link}>
                                                        </iframe>
                                                    </>
                                                    :
                                                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                                    <img src="images/no-image.png" alt="Image" />
                                                }
                                            </div>
                                            <div class="mr-content-block">
                                                <h4>
                                                    {parseInt(articleData.title.split(' ').filter(word => word !== '').length) > 8 ? articleData.title.split(/\s+/).slice(0, 8).join(" ") + '...' : articleData.title}
                                                </h4>
                                                <p className='mr-datetime'>
                                                    <span className='date'> {moment(articleData.datetime).format('DD-MM-YYYY')}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <p style={{ textAlign: 'center' }}>
                                    No Data Found!!
                                </p>

                            }
                        </div>
                    </div>
                </section>

            </div >
            <Academyfooter />
        </>
    )
}
export default Videos;
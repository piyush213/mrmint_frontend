import React, {  useState, useEffect } from 'react'
import Header from '../directives/header'
import Footer from '../directives/footer'
import $ from 'jquery';
import { getGalleryAction } from '../Action/user.action';
import config from '../coreFIles/config';

const Gallery = () => {

    const [activeTabStatus, setActiveTabStatus] = useState(1);
    const [galleryList, setGalleryList] = useState([]);
    const [allgalleryList, setAllGalleryList] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            $(".galleryBtn")[0].click();
        }, 500);
    });

    const activeTab = async (val) => {
        if(val == 1){
            setGalleryList(allgalleryList);
        }else if(val == 2){
            const result = allgalleryList.filter(data => data.category_id == 1);
            setGalleryList(result);
        }else if(val == 3){
            const result = allgalleryList.filter(data => data.category_id == 2);
            setGalleryList(result);
        }else if(val == 4){
            const result = allgalleryList.filter(data => data.category_id == 3);
            setGalleryList(result);
        }
        setActiveTabStatus(val)
    }

    useEffect(() => {
        getGalleryAPI();
    }, []);

    const getGalleryAPI = async () => {
        let res = await getGalleryAction();
        if (res.success) {
            setGalleryList(res.data);
            setAllGalleryList(res.data);
        }
    }

    return (

        <>
            <Header />
            <div id="content" className="loginpage">
                <div className="breadcrumb-wrap bg-f br-4" style={{ background: "url(assets/images/pink-elegant-geometrical-texture.png)", backgroundSize: "cover" }}>
                    <div className="container">
                        <div className="breadcrumb-title text-center">
                            <h2>Gallery</h2>
                        </div>
                    </div>
                </div>
                <section className='gallery-tabs'>
                    <div class="container">
                        <div class="row no-gutters">
                            <div class="filtering col-sm-12 text-center">
                                <span className={activeTabStatus == 1 ? 'active galleryBtn' : ''} onClick={() => activeTab(1)} >All</span>
                                <span className={activeTabStatus == 2 ? 'active' : ''} onClick={() => activeTab(2)}>Event</span>
                                <span className={activeTabStatus == 3 ? 'active' : ''} onClick={() => activeTab(3)}>Brand promotion</span>
                                <span className={activeTabStatus == 4 ? 'active' : ''} onClick={() => activeTab(4)}>Mining</span>
                            </div>
                            <div class="col-12 text-center w-100">
                                <div class="grid form-row gallery text-center">

                                    {galleryList.map(item => (
                                        <div class="col-lg-4 col-sm-6 grid-item">
                                            <div class="portfolio-wrapper">
                                                <div class="portfolio-image">
                                                    <img src={`${config.imageUrl+item.images}`} alt="..." />
                                                </div>
                                                <div class="portfolio-overlay">
                                                    <div class="portfolio-content">
                                                        <a class="popimg ml-0" href="#">
                                                            <i class="ti-zoom-in display-24 display-md-23 display-lg-22 display-xl-20"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

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
export default Gallery;
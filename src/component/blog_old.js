/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {  useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Header from '../directives/header'
import Footer from '../directives/footer'
import 'react-accessible-accordion/dist/fancy-example.css';
import Carousel from 'react-bootstrap/Carousel';
import { getuserBlogAction, getUserBlogSliderAction } from '../Action/user.action';
const Blognew = () => {
  const [getuserbloglist, setuserBlogList] = useState([]);
  const [getuserblogsliderlist, setuserBlogSliderList] = useState([]);

  useEffect(() => {
    getuserBlog();
    getuserBlogslider();
  }, []);

  const getuserBlog = async () => {
    let res = await getuserBlogAction();
    if (res.success) {
      setuserBlogList(res.data)
    }
  }
  const getuserBlogslider = async () => {
    let res = await getUserBlogSliderAction();
    if (res.success) {
      setuserBlogSliderList(res.data)
    }
  }
  return (

    <>
      <Header />
      <div id="content">
        <section className='blog-info-title'>
          <div className='container'>
            <h4> Blog </h4>
            <p>
              Stay up to date with the latest stories and commentary brought to you by Mr Mint, the World's 1st Token Backed By Crypto Mining Ecosystem.
            </p>
          </div>
        </section>

        <br />
        <section className='carousel-blog pt-0 pb-0'>
          <div className='container'>
            <Carousel>
              {getuserblogsliderlist.map(item => (
                <Carousel.Item>
                  <div className='row'>
                    <div className="col-lg-6">
                      <img className="d-block w-100" src={`${config.imageUrl + item.image}`} alt="First slide" />
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <h3> {parseInt(item.title.split(' ').filter(word => word !== '').length) > 8 ? item.title.split(/\s+/).slice(0, 8).join(" ") + '...' : item.title}</h3>
                        <p>

                          {parseInt(item.description.split(' ').filter(word => word !== '').length) > 30 ?
                            <>
                              <div dangerouslySetInnerHTML={{ __html: item.description.split(/\s+/).slice(0, 30).join(" ")+ '...' }} />
                            </>
                            :
                            <div dangerouslySetInnerHTML={{ __html: item.description }} />
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </section>

        <section className="mr-blog-block pt-5">
          <div className="container">
            <div className='mr-blog-list'>
              <div className="row">
                {getuserbloglist.map(data => (
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div className="mr-blog-item">
                      <div className="mr-item-inner">
                        <div className="mr-imgbox-block">
                          <img src={`${config.imageUrl + data.image}`} alt="Image" />
                        </div>
                      </div>
                      <div className="mr-blog-description">
                        <div className='mr-bog-top'>
                          <span className="mr-blog-cat">
                            <>
                              {data.blog_type == 1 ?
                                <span>Blog</span>
                                :
                                <span>Upcoming Events</span>
                              }
                            </>

                          </span>
                          <h4>
                            {data.title.length > 60 ?
                              data.title.substring(0, 60) + `....`
                              :
                              data.title
                            }
                          </h4>
                          <p>
                            <a href={`${config.baseUrl}Blogdetail/` + data.id} className='mr-read-more'>
                              Read More
                              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>
      </div >
      <Footer />
    </>
  )
}
export default Blognew;
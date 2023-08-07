/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Academyheader from '../directives/academyheader'
import Academyfooter from '../directives/academyfooter'
import { getArticleDetailsAction, getRecentArticleAction } from '../Action/user.action';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Articledetails = () => {

  const [articleDetails, setArticleDetails] = useState([]);
  const [recentArticleDetails, setRecentArticleDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getArticleDetailsAPI();
    getRecentArticleAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArticleDetailsAPI = async () => {
    let res = await getArticleDetailsAction({ 'title': id.replace(/_/g, ' ')});
    if (res.success) {
      setArticleDetails(res.data)
    }
  }

  const getRecentArticleAPI = async () => {
    let res = await getRecentArticleAction();
    if (res.success) {
      setRecentArticleDetails(res.data)
    }
  }

  return (

    <>
      <Academyheader />
      <Helmet>
      <title>{articleDetails?.title}</title>
      <meta title={articleDetails?.article_title} content="IE=edge" />
      <meta name="description" content= {articleDetails?.description?.replace(/<[^>]*>?/gm, '').substring(0,170)}/>
      </Helmet>

      <div className='articaldetails-block' id="content">
        <div className='mrpage-title-block'>
          <div className='container'>
            <h4>{articleDetails?.title}</h4>
          </div>
        </div>

        <section className='academydetails-item'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-9 col-md-8 col-sm-12'>
                <div className='academydetails-conatnt'>
                  <h2>
                    {articleDetails?.article_title}
                  </h2>
                  <div className='imgbox-block'>
                    {articleDetails.images ?
                      <img src={`${config.imageUrl + articleDetails.images}`} alt="Image" />
                      :
                      <img src="images/no-image.png" alt="Image" />
                    }
                  </div>

                  <p>
                    <div
                      dangerouslySetInnerHTML={{ __html: articleDetails?.description }}
                    />
                  </p>

                </div>
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12'>
                <div className='academydetails-reartical'>
                  <h2 className='rarticaltitle'>Recent Articles</h2>
                  <div className='rarticaltitle-list'>

                    {recentArticleDetails.map(data => (
                      <div className='rarticaltitle-item'>
                        <a href={`${config.baseUrl}articledetails/` + data.title.replace(/ /g,"_")}>
                          <div className='imgbox-block'>
                            {data.images ?
                              <img src={`${config.imageUrl + data.images}`} alt="Image" />
                              :
                              <img src="images/no-image.png" alt="Image" />
                            }
                          </div>
                        </a>
                        <h4>
                          <a href={`${config.baseUrl}articledetails/` + data.title.replace(/ /g,"_")}>
                            <span style={{ color: '#3f4b52' }}>{data?.title}</span>
                          </a>
                        </h4>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Academyfooter />
    </>
  )
}
export default Articledetails;
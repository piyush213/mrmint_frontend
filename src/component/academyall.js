/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import config from '../coreFIles/config'
import Academyheader from '../directives/academyheader'
import Academyfooter from '../directives/academyfooter'
import 'react-accessible-accordion/dist/fancy-example.css';
import { getArticlesByCategoryAction, getArticleCategoryAction } from '../Action/user.action';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Helmet } from 'react-helmet';
var categoryIds = [];

const Academyall = () => {

  const [allArticleList, setArticlesList] = useState([]);
  const [allArticleCategoryList, setArticleCategoryList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getArticlesAPI();
    getArticleCategoryAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getArticlesAPI = async () => {
    let articleId = [];
    if (id) {
      articleId = [id];
      categoryIds.push(parseInt(id))
    }
    let res = await getArticlesByCategoryAction({ 'ids': articleId });
    if (res.success) {
      setArticlesList(res.data)
    }
  }

  const getArticleCategoryAPI = async () => {
    let res = await getArticleCategoryAction();
    if (res.success) {
      setArticleCategoryList(res.data)
    }
  }

  const categoryFilter = async (val) => {

    if (categoryIds.indexOf(val) !== -1) {
      let myIndex = categoryIds.indexOf(val);
      categoryIds.splice(myIndex, 1);
    }
    else {
      categoryIds.push(val);
    }

    let res = await getArticlesByCategoryAction({ 'ids': categoryIds });
    if (res.success) {
      setArticlesList(res.data)
    } else {
      setArticlesList([])
    }
  }

  return (
    <>
      <Academyheader />
      <Helmet>
        <title>Exploring Blockchain, Crypto, and Web 3.0: Informative Articles and Insights
        </title>
        <meta title='Exploring Blockchain, Crypto, and Web 3.0: Informative Articles and Insights' content="IE=edge" />
        <meta name="description" content="Dive into the world of blockchain, crypto,NFTs and Web 3.0 with our comprehensive articles. Stay informed with our insightful articles covering the latest trends, innovations!" />
        <meta property="og:url" content="https://mrmint.io/articles"/><meta name="keywords" content="Article  on Blockchain, Article on Crypto"/>
      </Helmet>
      <div className='academy-contant academy-contant1' id="content">
        <div class="mrpage-title-block">
          <div class="container">
            <h4>Articles</h4>
          </div>
        </div>

        <section className='mr-academyfilter-block'>
          <div className='mr-academyfilter-inner'>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-7'>
                  <h4>Topics at Blockchain Academy </h4>
                  <ul className='navbar list-info'>

                    {allArticleCategoryList.map(item => (
                      <li className='nav-item'>
                        <a href='javascript:;' onClick={() => categoryFilter(item.id)} className='nav-link'>
                          {item.article_name}
                          <i class={categoryIds.indexOf(item.id) !== -1 ? 'fa fa-plus d-none' : 'fa fa-plus'}></i>
                          <i class={categoryIds.indexOf(item.id) !== -1 ? 'fa fa-check' : 'fa fa-check d-none'}></i>
                        </a>
                      </li>
                    ))}

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='mr-academytrades-block' id="articlesBlock">
          <div className='container'>
            <div className='mr-academy-heading'>
              <div className='row'>
                <div className='col-sm-9'>
                </div>
              </div>
            </div>
            <div className='row'>
              {allArticleList.length > 0 ?
                allArticleList.map((articleData, i) => (
                  <div className='col-lg-4 col-md-6 col-sm-12'>
                    <div class="mr-academytrades-item">
                      <a href={`${config.baseUrl}articledetails/` + articleData.title.replace(/ /g,"_")} className='links'>
                        <div class="mr-imgbox-block">
                          {articleData.images ?
                            <img src={`${config.imageUrl + articleData.images}`} alt="Image" />
                            :
                            <img src="images/no-image.png" alt="Image" />
                          }
                          <span className='mr-trendnshort'>
                            {articleData?.article_name}
                          </span>
                        </div>
                      </a>
                      <div class="mr-content-block">
                        <h4>
                          <a href={`${config.baseUrl}articledetails/` + articleData.title.replace(/ /g,"_")} className='links'>
                            {parseInt(articleData.title.split(' ').filter(word => word !== '').length) > 8 ? articleData.title.split(/\s+/).slice(0, 8).join(" ") + '...' : articleData.title}
                          </a>
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
export default Academyall;
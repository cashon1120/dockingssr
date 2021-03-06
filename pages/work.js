import React, {Component, Fragment} from 'react';
import intl from '../utils/intl'
import LazyLoadComponent from '../components/LazyLoad'
import {Row, Col} from 'antd'
import Footer from '../components/footer'

class Work extends Component {

  render() {
    const data = intl.get('case.data')
    const type = intl.get('case.type')
    console.log(data)
    return (
      <Fragment>
        <div className="main page-work">
          <div className="main-container">
            <h1>{intl.get('work.title')}</h1>
            <div className="category-list">
              {(type || []).map(item => <div key={item.value}>
                <a href="/work">{item.value}</a>
              </div>)}
            </div>
            <div className="work-list-container">
              <Row gutter={[30, 50]}>
                {(data || []).map(item => <Col sm={24} md={12} key={item.title}>
                  <div className="work-item">
                    <div className="img-wrapper">
                      <a href="#work">{item.content}</a>
                      <LazyLoadComponent src={item.listImgSrc} alt={item.title}/>
                    </div>
                    <div className="works-landing__description">
                      <h5>
                        <a href="#work">{item.title}</a>
                      </h5>
                      <div className="hidden-xxs">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </Col>)}
              </Row>
            </div>
          </div>
        </div>
        <Footer/>
      </Fragment>
    );
  }
}

export default Work;
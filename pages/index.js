import React, {Component, Fragment} from 'react';
import Link from 'next/link';
import Swiper from '../components/swiper'
import intl from '../utils/intl'
import Footer from '../components/footer'
import Intrduce from '../components/intrduce'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="black-bg">
          <Swiper/>
        </div>
        <div className="card-container index-service">
          <div className="card-container_content content-wrapper">
            <h1>{intl.get('index.sevices.title1')}
              <br/> {intl.get('index.sevices.title2')}</h1>
            <div className="container-grid flex-stretch">
              <div className="col-xs-sm">
                <div className="content">

                  <Link href="/services">
                    <article>
                    <h3>{intl.get('index.sevices.mobile.title')}</h3>
                    <div className="flex-container flex-end">
                      <div className="flex-1">
                        {(intl
                          .get('index.sevices.mobile.list')  || [])
                          .map(item => <span key={item}>{item}<br/></span>)}
                      </div>
                      <div>
                        <i className="iconfont">&#xe619;</i>
                      </div>
                    </div>
                    </article>
                  </Link>

                </div>
              </div>
              <div className="space-30"></div>
              <div className="col-xs-sm">
                <div className="content">
                  <Link href="/services">
                  <article>
                    <h3>{intl.get('index.sevices.webapp.title')}</h3>
                    <div className="flex-container flex-start">
                      <div className="flex-1">
                      {(intl
                          .get('index.sevices.webapp.list') || [])
                          .map(item => <span key={item}>{item}<br/></span>)}
                      </div>
                      <div>
                        <i
                          className="iconfont"
                          style={{
                          fontSize: 40
                        }}>&#xe61b;</i>
                      </div>
                    </div>
                    </article>
                  </Link>
                </div>
              </div>
            </div>

            <div className="service-btn">
              <Link href="/services" className="btn btn-lg"><a>{intl.get('global.showmore')}</a></Link>
            </div>
          </div>

        </div>
        <Intrduce/>
        <Footer/>
      </Fragment>
    );
  }
}

export default Home;

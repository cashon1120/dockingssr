import React, {Component, Fragment} from 'react';
import {Row, Col} from 'antd'
import $ from 'jquery'
import LazyLoadComponent from '../components/LazyLoad'
import intl from '../utils/intl'
import {throttle} from '../utils/util'
class Intrduce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHeight: 'auto'
    }

  }

  componentDidMount() {
    window.addEventListener('resize', throttle(this.handlerSetHight, 300))
    this.handlerSetHight()
  }

  handlerSetHight = () => {
    this.setState({
      itemHeight: 'auto'
    }, () => {
      setTimeout(() => {
        let itemHeight = 0
        $.each($('.item-list'), (index, item) => {
          if (item.offsetHeight > itemHeight) {
            itemHeight = item.offsetHeight
          }
        })
        this.setState({itemHeight})
      }, 0);
    })

  }

  render() {
    const {itemHeight} = this.state
    return (
      <Fragment>
        <div className="black-bg intrduce">
          <div className="main-container">
            <h1 className="process-h1 text-align-center">{intl.get('index.weDo').title}</h1>
            <Row gutter={[80, 50]}>
              {(intl.get('index.weDo').list || []).map(item => (
                <Col
                  sm={24}
                  md={12}
                  lg={8}
                  className="item-list"
                  key={item.title}
                  style={{
                  height: itemHeight
                }}>
                  <LazyLoadComponent src={item.imgSrc} alt={item.title} />
                  <h2>{item.title}</h2>
                  {item.text}
                </Col>
              ))}
            </Row>
            <h1 className="process-h1 text-align-center">{intl.get('index.scheme').title}</h1>
            <Row gutter={[80, 50]}>
              {(intl.get('index.scheme').list || []).map(item => (
                <Col
                  sm={24}
                  md={12}
                  lg={8}
                  className="item-list"
                  key={item.title}
                  style={{
                  height: itemHeight
                }}>
                  <LazyLoadComponent src={item.imgSrc} alt={item.title} />
                  <h2>{item.title}</h2>
                  {item.text}
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Intrduce;
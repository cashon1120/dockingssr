import React, {Component} from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Modal,
  message
} from 'antd';
import intl from '../utils/intl'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title1: '',
        title2: '',
        content: [],
        img: '',
        loading: false,
        visible: true,
        modalWidth: 500
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          this.setState({loading: true})
        }
      });
  };

  showModal = () => {
    this.setState({visible: true});
  };

  handleOk = e => {
    this.setState({visible: false});
  };

  handleCancel = e => {
    this.setState({visible: false});
  };

  handleSubmit = e => {
    const {validateFields, resetFields} = this.props.form
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const {nikename, desc, email} = values
        const img = new Image()
        img.src=`${intl.get('global.api')}/park/app/home/add_customer?nikename=${nikename}&desc=${desc}&email=${email}`
        message.success({content: intl.get('global.responsemsg'), icon: <i></i>})
        resetFields()
      }
    })
  }

  render() {
    const data = intl.get('contact')
    const language = intl.currentLocale
    const {loading, visible, modalWidth} = this.state
    const {getFieldDecorator} = this.props.form;
    return (
      <footer className="footer">
        <div className="card-container" id="contact">
          <h1 className="title">{data.title1}
            <br/>{data.title2}</h1>
          <div className="footer-container">
            <Form
              onSubmit={this.handleSubmit}
              className="formContainer"
              style={{
              paddingBottom: 40
            }}>
              <Row gutter={[12, 12]}>
                <Col md={12} xs={24}>
                  <Form.Item>
                    {getFieldDecorator('nikename', {
                      rules: [
                        {
                          required: true,
                          message: data.form.nikename.message
                        }
                      ]
                    })(
                      <Input
                        size="large"
                        placeholder={data.form.nikename.label}
                        prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)', fontSize: 17 }}/>}/>
                    )}
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item>
                    {getFieldDecorator(`email`, {
                      rules: [
                        {
                          required: true,
                          message: data.form.email.message
                        }
                      ]
                    })(
                      <Input
                        size="large"
                        prefix={< Icon type = "mail" style = {{ color: 'rgba(0,0,0,.25)', fontSize: 17 }}/>}
                        placeholder={data.form.email.label}/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{
                paddingTop: 12
              }}>
                <Col md={24}>
                  <Form.Item>
                    {getFieldDecorator(`desc`, {
                      rules: [
                        {
                          required: true,
                          message: data.form.desc.message
                        }
                      ]
                    })(<Input.TextArea size="large" rows={4} placeholder={data.form.desc.label}/>)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col
                  span={24}
                  style={{
                  textAlign: 'center'
                }}>
                  <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    {language === 'zh'
                      ? '提交'
                      : 'submit'}
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="container-grid flex-center address-container">
              <div className="col-xs-sm address">
                {language === 'zh'
                  ? '中国大陆地区'
                  : 'China Mainland Tel'}:
                <br/>
                <span>
                  <a href={"tel:" + data.content.phone}>{data.content.phone}</a>
                </span>
                {language === 'zh'
                  ? '北美分公司电话'
                  : 'North American Tel'}:
                <br/>
                <span>
                  <a href={"tel:" + data.content.naphone}>{data.content.naphone}</a>
                </span>
                {language === 'zh'
                  ? '微信'
                  : 'Wechat'}:
                <br/>
                <span>{data.content.wechat}</span>
                {language === 'zh'
                  ? '邮箱'
                  : 'E-mail'}:<br/>
                <span>
                  <a href={'mailto:' + data.content.email}>{data.content.email}</a>
                </span>
                {data.content.address
                  ? <div>
                      {language === 'zh'
                        ? '地址'
                        : 'Address'}:<br/>
                      <span>{data.content.address}</span>
                    </div>
                  : null}

              </div>
              <div className="col-xs-sm code">
                <img src={data.img} alt="" onClick={() => this.showModal()}/>
                <Modal
                  width={modalWidth}
                  visible={visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}footer={false}>
                  <div className="modal-img">
                    <img src={data.img} alt=""/>
                    <a href={data.img} download="docking-QRcode">{data.downLoadTxt}</a>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className="copyright">
            Copyright©2020 DOCKING LTD. All Right Reserved 版权所有：成都入坞科技有限公司 <a href="http://www.beian.miit.gov.cn">蜀ICP备20006007号</a> <a target="_blank" href=" " style={{textDecoration: 'none', display: 'inline-block'}}>< img src="/images/icp.png" />川公网安备 51010702002132号</a > <br/>
            成都入坞科技有限公司是一家专业软件咨询公司, 长期专注于移动端APP, 小程序和PC端各类定制化软件开发，我们为iOS，Android和混合移动平台开发解决方案，每种解决方案都能满足不同的细分市场和特定的客户需求。
          </div>
          
        </div>

      </footer>

    );
  }
}

export default Form.create()(Footer);
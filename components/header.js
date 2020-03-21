import React, {Component} from 'react';
import Link from 'next/link';
import intl from '../utils/intl'
import $ from 'jquery'
import {throttle, getOs, bodyScrollTo} from '../utils/util'
const Logo = '/images/xm-logo.png';
const LogoBlack = '/images/xm-logo-black.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windhowHeight: null,
      scrollEle: null,
      isOpen: false,
      showHeader: true,
      lastScrollTop: null,
      logo: Logo,
      pathName: ''
    };
  }

  componentDidMount() {
    this.setIndexHead(window.location.href)
    window.addEventListener('load', () => {
      document.addEventListener('scroll', throttle(this.headerToggleShow, 200))
      this.setState({
        windhowHeight: window.innerHeight,
        scrollEle: document.getElementById('scrollDom')
      }, () => {
        const {scrollEle} = this.state
        if (scrollEle) {
          this.handlerBindEvent(this.state.scrollEle, throttle(this.handlerScroll, 200), {passive: false})
        }
      })
    })
  }
  changeLang = (lang) => {
    localStorage.setItem('lang', lang)
    window
      .location
      .reload()
  }

  handlerScroll = (e) => {
    const {windhowHeight} = this.state
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    if (scrollTop < windhowHeight) {
      return
    }
    e.preventDefault();
    e.stopPropagation();
    const direction = (e.detail > 0 || e.wheelDelta < 0)
      ? false
      : false
    this.setState({showHeader: direction})
  }

  headerToggleShow = () => {
    const {lastScrollTop} = this.state
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    let direction = scrollTop > lastScrollTop
      ? false
      : true
    this.setState({
      showHeader: direction,
      lastScrollTop: scrollTop.scrollTop()
    })
  }

  // 绑定滚动事件
  handlerBindEvent(dom, fn, params) {
    this.handlerUnbindEvent(dom, fn)
    const eventName = getOs() === 'Firefox'
      ? 'DOMMouseScroll'
      : 'mousewheel'
    dom.addEventListener(eventName, fn, params)
  }

  // 解触滚动事件
  handlerUnbindEvent(dom, fn) {
    const eventName = getOs() === 'Firefox'
      ? 'DOMMouseScroll'
      : 'mousewheel'
    dom.removeEventListener(eventName, fn)
  }

  headerToggleShow = () => {
    const {lastScrollTop, showHeader} = this.state
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (scrollTop < 80 && !showHeader) {
      this.setState({showHeader: true})
      return
    }
    let direction = scrollTop > lastScrollTop
      ? false
      : true
    this.setState({
      showHeader: direction,
      lastScrollTop: scrollTop
    })
  }

  setIndexHead = pathname => {
    if(pathname.indexOf('#') > 0){
      return
    }
    pathname = pathname.split('/')[3]
    const isHome = pathname === '' || pathname === 'services'
    const pathName = isHome ? 'index' : 'sub'
    const logo = isHome ? Logo : LogoBlack
    this.setState({pathName, logo})
  }

  handlerOpen(e) {
    const {isOpen} = this.state
    if(e && e.target.tagName === 'A'){
      this.setIndexHead(e.target.href)
    }
    this.setState({
      isOpen: !isOpen
    })
  }

  handlerShowContact = () => {
    const contactDom = $('#contact')
    bodyScrollTo('html,body', contactDom.offset().top, () => {})
  }

  render() {
    const {isOpen, pathName, showHeader, logo} = this.state
    const address = intl.get('contact.content')
    const nav = intl.get('header.nav')
    const language = intl.currentLocale
    const {changeLang} = this.props
    return (
      <header className={showHeader
        ? 'show'
        : 'hide'}>
        <div
          className={`container ${pathName}-header`}>
          <div className="flex-container header-container">
            <div className="flex-1">
              <img src={logo} className="logo" alt="logo"/>
            </div>
            <div style={{
              paddingRight: 25
            }}>
              {intl.currentLocale === 'zh'
                ? <a href="#" onClick={() => changeLang('en')}>English</a>
                : <a href="#" onClick={() => changeLang('zh')}>Chinese</a>}
            </div>
            <div>
              <span className="btn nav-contact" onClick={() => this.handlerShowContact()}>
                {intl.get('header.contact')}
              </span>
            </div>
            <div>
              <span
                className={isOpen
                ? 'nav-icon open'
                : 'nav-icon'}
                onClick={() => this.handlerOpen()}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        </div>
        <nav
          className={isOpen
          ? 'open'
          : null}
          onClick={e => this.handlerOpen(e)}>
          <ul>
            <li>
              <Link href='/'><a>{nav[0]}</a></Link>
            </li>
            <li>
              <Link href='/work'><a>{nav[1]}</a></Link>
            </li>
            <li>
              <a href='/services'>{nav[2]}</a>
            </li>
            <li>
              <a href='/blog'>{nav[3]}</a>
            </li>
            <li>
              <a href='#contact'>{nav[4]}</a>
            </li>
          </ul>
          <div className="address">
          <p>{language === 'zh' ? '中国大陆地区' : 'China Mainland Tel'}: <br/>{address.phone}</p>
          <p>{language === 'zh' ? '北美电话' : 'North American Tel'}: {address.naphone}</p>
            <p>{language === 'zh' ? '微信' : 'Wechat'}: {address.wechat}</p>
            <p>{language === 'zh' ? '邮箱' : 'E-mail'}: {address.email}</p>
            <p>{language === 'zh' ? '地址' : 'Address'}: {address.address}</p>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
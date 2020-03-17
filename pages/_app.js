import App from 'next/app'
import 'antd/dist/antd.css'
import React from 'react'
import Layout from '../components/layout'
import '../style.scss'

import zh from '../language/zh_CN'
import en from '../language/en_US'
import intl from '../utils/intl'

intl.init({
  currentLocale: 'zh',
  locales: {
    zh,
    en
  }
})
class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  changeLang = (lang) => {
    intl.currentLocale = lang
    this.setState({
      lang
    })
  }

  render() {
    const { Component, pageProps } = this.props
  
    return (
      <Layout changeLang={this.changeLang}>
          <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp

/*
 * @Author: your name
 * @Date: 2019-08-19 01:38:20
 * @LastEditTime: 2020-03-12 22:53:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nextssr/pages/_app.js
 */
import App, { Container } from 'next/app'
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
  // App组件的getInitialProps比较特殊
  // 能拿到一些额外的参数
  // Component: 被包裹的组件
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}

    // 拿到Component上定义的getInitialProps
    if (Component.getInitialProps) {
      // 执行拿到返回结果`
      pageProps = await Component.getInitialProps(ctx)
    }

    // 返回给组件
    return {
      pageProps,
    }
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

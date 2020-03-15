/*
 * @Author: your name
 * @Date: 2019-08-19 01:38:20
 * @LastEditTime: 2020-03-12 22:55:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /nextssr/pages/_document.js
 */
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  // 如果要重写render 就必须按照这个结构来写
  render() {
    return (
      <Html>
        <Head />
        <title>入坞科技 docking</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

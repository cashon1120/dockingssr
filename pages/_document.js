import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  // 如果要重写render 就必须按照这个结构来写
  render() {
    return (
      <Html>
        <Head />
        <title>入坞科技 ｜软件资讯,TOP-Class设计师团队一站式服务,APP开发,小程序开发,电子商务,十年经验,来和我们聊聊吧</title>
          <meta name="keywords" content="软件咨询,APP开发,小程序开发,一站式服务,电子商务"/>
          <meta name="keywords" content="数字体验栩栩如生,我们是一家软件咨询公司"/>
        <body>
          <Main />
          <NextScript />
          {/* <script src="chart.js"></script> */}
          <script src="baidu.js"></script>
          {/* <script src="53kf.js"></script> */}
        </body>
      </Html>
    )
  }
}

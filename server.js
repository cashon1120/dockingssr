/*
 * @Author: your name
 * @Date: 2019-08-19 01:38:20
 * @LastEditTime: 2020-03-12 22:57:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nextssr/server.js
 */
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = 3000
// 等到pages目录编译完成后启动服务响应请求
app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/blogdetail/:id', async ctx => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/blogdetail',
      query: {
        id,
      },
    })
    ctx.respond = false
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(PORT, () => {
    console.log(`koa server listening on ${PORT}`)
  })
})

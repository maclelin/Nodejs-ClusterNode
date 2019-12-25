/*
 * @Author: linjian
 * @Date: 2019-12-25 14:42:03
 * @LastEditors  : linjian
 * @Description: file content
 * @email: linjian@szkingdom.com
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cluster = require("cluster");
const chalk = require('chalk');

const index = require('./routes/index')
const users = require('./routes/users')
const redisUtil = require('./utils/redisTool');

const redis = redisUtil.connectRedis();
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  redis.set('sessionId','测试数据')
  await next()
})
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  console.log(chalk.green(`访问进程${process.pid}`))
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

if (cluster.isMaster) {
  // 循环 fork 任务 CPU i5-7300HQ 四核四进程
  for (let i = 0; i < 6; i++) {
    cluster.fork()
  }
  console.log(chalk.green(`主进程运行在${process.pid}`))
} else {
  app.listen(3000) // export app 一个 Koa 服务器的实例
  console.log(chalk.green(`子进程运行在${process.pid}`))
}

module.exports = app

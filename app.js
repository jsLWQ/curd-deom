const express = require('express')
const fs = require('fs')
const router = require('./router/index')
const bodyParser = require('body-parser')
const app = express()

app.engine('html',require('express-art-template'))
app.use('/public',express.static('./public'))
app.use('/node_modules',express.static('./node_modules'))

// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置路由
app.use(router)

app.listen(3000,() => {
  console.log('服务开启....')
})
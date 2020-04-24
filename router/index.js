
 const express = require('express')
 const fs = require('fs')
 const stu = require('../student')

 const router = express.Router()
// 获取首页
router.get('/',(req,res) => {
  stu.find((err,data) => {
    if(err) return res.status(500).send('滚')
    res.render('index.html',{
      students: data
    })
  })
})

// 获取新增页
router.get('/new',(req,res) => {
  res.render('new.html')
})

// 添加
router.post('/new',(req,res) => {
  console.log(req.body)
  stu.add(req.body,(err) => {
    if(err) return res.status(500).send('滚')
    res.redirect('/')
  })
})

// 查询数据，渲染
router.get('/edit',(req,res) => {
  console.log(req.query)
  stu.seek(req.query.id,(err,data) => {
    // console.log(data)
    if(err) return res.status(500).send('滚')
    res.render('edit.html',{
      student: data[0]
    })
  })
})
// 编辑数据
router.post('/edit',(req,res) => {
  console.log(req.body)
  stu.edit(req.body,(err) => {
    if(err) return res.status(500).send('滚')
    res.redirect('/')
  })
})

// 删除
router.get('/delete',(req,res) => {
  console.log(req.query)
  stu.delete(req.query.index,(err) => {
    if(err) return res.status(500).send('滚')
    res.redirect('/')
  })
})
module.exports = router

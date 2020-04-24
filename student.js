const fs = require('fs')

let uPath = './db.json'
// 获取数据
exports.find = (callback) => {
  fs.readFile(uPath,(err,data) => {
    if(err) return callback(err)
    callback(null,JSON.parse(data).students)
  })
}
// 添加数据
exports.add = (body,callback) => {
  fs.readFile(uPath,(err,data) => {
    if(err) return callback(err)
    let stu = JSON.parse(data).students
    console.log(stu)
    body.id = stu.length>1?stu[0].id * 1+1:0
    stu.unshift(body)
    fs.writeFile(uPath,JSON.stringify({students:stu}),(err) => {
      if(err) return callback(err)
      callback(null)
    })
  })
}
// 查找数据
exports.seek = (id,callback) => {
  fs.readFile(uPath,(err,data) => {
    if(err) return callback(err)
    let stu = JSON.parse(data).students
    let seekList = stu.filter(item => item.id == id)
    callback(null,seekList)
  })
}
// 编辑数据
exports.edit = (body,callback) => {
  fs.readFile(uPath,(err,data) => {
    if(err) return callback(err)
    let stu = JSON.parse(data).students
    let index = stu.findIndex(item => item.id == body.id)
    console.log(index)
    if(index !== -1) {
      stu[index] = body
      console.log(stu,body)
      fs.writeFile(uPath,JSON.stringify({students:stu}),(err) => {
        if(err) return callback(err)
        callback(null)
      })
    }
  })
}
// 删除数据
exports.delete = (index,callback) => {
  fs.readFile(uPath,(err,data) => {
    if(err) return callback(err)
    let stu = JSON.parse(data).students
    stu.splice(index,1)
    fs.writeFile(uPath,JSON.stringify({students:stu}),(err) => {
      if(err) return callback(err)
      callback(null)
    })
  })
}

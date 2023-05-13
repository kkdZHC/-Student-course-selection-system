let db = require('../db/index')

exports.loginstudent = (req, res) => {
  var sql = 'select * from student where student_id = ? and password = ?'
  db.query(sql, [req.query.id, req.query.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }      
      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功"
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}
exports.loginteacher = (req, res) => {
  var sql = 'select * from teacher where staff_id = ? and password = ?'
  db.query(sql, [req.query.id, req.query.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }      
      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功"
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}
exports.loginmanager = (req, res) => {
  var sql = 'select * from manager where manager_id = ? and password = ?'
  db.query(sql, [req.query.id, req.query.password], (err, data) => {
      if(err) {
          return res.send({
            status: 400,
            message: "登录失败"
          })
      }      
      if(data.length > 0) {
        res.send({
          status: 200,
          message: "登录成功"
        })
      }else{
        res.send({
          status: 202,
          message: '用户名或密码错误'
        })
      }
  })
}
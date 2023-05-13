let db = require('../db/index')

exports.getclass = (req, res) => {        //查询课程信息
  var sql = 'select * from course natural join class where semester=? and staff_id=?'
  db.query(sql, [req.query.semester,req.query.staffid], (err, data) => {
      if(err) {
          return res.send('错误：' + err.message)        
      }
      res.send(data)
  })
}
exports.getstudent = (req, res) => {        //查询学生信息
  var sql = 'select distinct * from student natural join course_selection where semester=? and staff_id=? and course_id=?'
  db.query(sql, [req.query.semester,req.query.staffid,req.query.classid], (err, data) => {
      if(err) {
          return res.send('错误：' + err.message)        
      }
      res.send(data)
  })
}
exports.addclass = (req, res) => {        //向class表添加数据
  var sql = 'insert into class (semester,course_id,staff_id,class_time) values (?,?,?,?)'
  db.query(sql,[req.query.semester,req.query.courseid,req.query.staffid,req.query.classtime],(err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      if(data.affectedRows > 0) {
          res.send({
            status: 200,
            message: 'success'
          })
      }else{
          res.send({
            status: 202,
            message: 'error'
          })
      }
  })
}
exports.updatescore = (req, res) => {        //通过id更新数据
  var sql = 'update course_selection set normal_score=?,test_score=? where student_id = ? and semester=? and course_id=? and staff_id=?'
  db.query(sql, [req.query.normal,req.query.test,req.query.studentid,req.query.semester,req.query.courseid,req.query.staffid], (err, data) => {
      if(err) {
          return res.send('错误：' + err.message)
      }
      if(data.changedRows > 0) {
        res.send({
          status: 200,
          message: 'success'
        })
      }else{
        res.send({
          status: 202,
          message: 'error'
        })
      }
  })
}
exports.gettotal = (req, res) => {        //查询学生信息
  var sql = 'call settotal()'
  db.query(sql, (err, data) => {
      if(err) {
          return res.send('错误：' + err.message)        
      }
      res.send(data)
  })
}


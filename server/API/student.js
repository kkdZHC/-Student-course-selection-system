let db = require('../db/index')

exports.getsemester = (req, res) => {    //查询有多少学期    
    var sql = 'select distinct semester from class'
    db.query(sql, (err, data) => {  
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.getallclass = (req, res) => {    //查询某学生某学期课表
    var sql = 'select * from course_selection natural join class natural join course where student_id=? and semester=?'    //？用于占位
    db.query(sql,[req.query.id,req.query.semester], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.getoneclass = (req, res) => {        //查询课程信息
    var sql = 'select * from class  where course_id=? and staff_id=?'
    db.query(sql, [req.query.classid,req.query.staffid], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)        
        }
        res.send(data)
    })
}
exports.getcourse = (req, res) => {        //查询课程信息
    var sql = 'select * from course natural join class where semester=?'
    db.query(sql, [req.query.semester], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)        
        }
        res.send(data)
    })
}
exports.addclass = (req, res) => {        //选课
    var sql = 'insert into course_selection (student_id,semester,course_id,staff_id) values (?,?,?,?)'
    db.query(sql,[req.query.student_id,req.query.semester,req.query.course_id,req.query.staff_id],(err, data) => {
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
exports.delclass = (req, res) => {        //退课
    var sql = 'delete from course_selection where student_id = ? and semester=? and course_id=? and staff_id=?'
    db.query(sql, [req.query.student_id,req.query.semester,req.query.course_id,req.query.staff_id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        if(data.affectedRows > 0) {
            res.send({
              status: 200,
              message: '删除成功'
            })
        }else{
            res.send({
              status: 202,
              message: '删除失败'
            })
        }
    })
}






let db = require('../db/index')
//查整表
exports.getstudent = (req, res) => {
    var sql = 'select * from student'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.getteacher = (req, res) => {
    var sql = 'select * from teacher'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.getclass = (req, res) => {
    var sql = 'select * from class'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.getcourse = (req, res) => {
    var sql = 'select * from course'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.getdepartment = (req, res) => {
    var sql = 'select * from department'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.getselection = (req, res) => {
    var sql = 'select * from course_selection'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
//对学生表操作
exports.getonestudent = (req, res) => {        //通过id查询数据
    var sql = 'select * from student where student_id = ?'    //？用于占位
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.delonestudent = (req, res) => {        //通过id删除数据
    var sql = 'delete from student where student_id = ?'
    db.query(sql, [req.query.id], (err, data) => {
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
exports.addonestudent = (req, res) => {        //向info表添加数据
    var sql = 'insert into student (student_id,name,sex,date_of_birth,native_place,mobile_phone,dept_id,password) values (?,?,?,?,?,?,?,?)'
    db.query(sql,[req.query.id,req.query.name,req.query.sex,req.query.date,req.query.address,req.query.phone,req.query.dept,req.query.password],(err, data) => {
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
exports.updatestudent = (req, res) => {        //通过id更新数据
    var sql = 'update student set name=?,sex=?,date_of_birth=?,native_place=?,mobile_phone=?,dept_id=? where student_id = ?'
    db.query(sql, [req.query.name,req.query.sex,req.query.date,req.query.address,req.query.phone,req.query.dept,req.query.id], (err, data) => {
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

//对教师表操作
exports.getoneteacher = (req, res) => {        //通过id查询数据
    var sql = 'select * from teacher where staff_id = ?'    //？用于占位
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.deloneteacher = (req, res) => {        //通过id删除数据
    var sql = 'delete from teacher where staff_id = ?'
    db.query(sql, [req.query.id], (err, data) => {
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
exports.addoneteacher = (req, res) => {        //向info表添加数据
    var sql = 'insert into teacher (staff_id,name,sex,date_of_birth,professional_ranks,salary,dept_id,password) values (?,?,?,?,?,?,?,?)'
    db.query(sql,[req.query.id,req.query.name,req.query.sex,req.query.date,req.query.ranks,req.query.salary,req.query.dept,req.query.password],(err, data) => {
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
exports.updateteacher = (req, res) => {        //通过id更新数据
    var sql = 'update teacher set name=?,sex=?,date_of_birth=?,professional_ranks=?,salary=?,dept_id=? where staff_id = ?'
    db.query(sql, [req.query.name,req.query.sex,req.query.date,req.query.ranks,req.query.salary,req.query.dept,req.query.id], (err, data) => {
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
//对课程信息表操作
exports.addcourseinfo = (req, res) => {        //向info表添加数据
    var sql = 'insert into course (course_id,course_name,credit,credit_hours,dept_id) values (?,?,?,?,?)'
    db.query(sql,[req.query.id,req.query.name,req.query.credit,req.query.chours,req.query.dept],(err, data) => {
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
exports.delcourseinfo = (req, res) => {        //通过id删除数据
    var sql = 'delete from course where course_id = ?'
    db.query(sql, [req.query.id], (err, data) => {
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
//对教师开课表操作
exports.addclassinfo = (req, res) => {        //向info表添加数据
    var sql = 'insert into class (semester,course_id,staff_id,class_time) values (?,?,?,?)'
    db.query(sql,[req.query.semester,req.query.cid,req.query.sid,req.query.time],(err, data) => {
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
exports.delclassinfo = (req, res) => {        //通过id删除数据
    var sql = 'delete from class where course_id = ? and staff_id = ?'
    db.query(sql, [req.query.id,req.query.sid], (err, data) => {
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
//对选课表操作
exports.addcsinfo = (req, res) => {        //向info表添加数据
    var sql = 'insert into class (student_id,semester,course_id,staff_id,normal_score,test_score) values (?,?,?,?,?,?,?)'
    db.query(sql,[req.query.studentid,req.query.semester,req.query.cid,req.query.sid,req.query.normalscore,req.query.testscore],(err, data) => {
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
exports.delcsinfo = (req, res) => {        //通过id删除数据
    var sql = 'delete from class where student_id = ? and course_id = ?'
    db.query(sql, [req.query.sid,req.query.cid], (err, data) => {
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
exports.updatecsinfo = (req, res) => {        //通过id更新数据
    var sql = 'update course_selection set normal_score=?,test_score=? where student_id = ? and course_id = ?'
    db.query(sql, [req.query.normalscore,req.query.testscore,req.query.studentid,req.query.courseid], (err, data) => {
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
//修改密码
exports.changestudentkey = (req, res) => {        //
    var sql = 'update student set password = ? where student_id = ?;'
    db.query(sql, [req.query.newkey,req.query.id], (err, data) => {
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
exports.changeteacherkey = (req, res) => {        //
    var sql = 'update teacher set password = ? where staff_id = ?;'
    db.query(sql, [req.query.newkey,req.query.id], (err, data) => {
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
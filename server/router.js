let express = require('express')
let router = express.Router()
let manager = require('./API/manager')
let student = require('./API/student')
let teacher = require('./API/teacher')
let login = require('./API/login')

router.get('/manager/getstudent', manager.getstudent)
router.get('/manager/getteacher', manager.getteacher)
router.get('/manager/getclass', manager.getclass)
router.get('/manager/getcourse', manager.getcourse)
router.get('/manager/getdepartment', manager.getdepartment)
router.get('/manager/getselection', manager.getselection)
router.get('/manager/getonestudent', manager.getonestudent)
router.get('/manager/delonestudent', manager.delonestudent)
router.get('/manager/addonestudent', manager.addonestudent)
router.get('/manager/updatestudent', manager.updatestudent)

router.get('/manager/getoneteacher', manager.getoneteacher)
router.get('/manager/deloneteacher', manager.deloneteacher)
router.get('/manager/addoneteacher', manager.addoneteacher)
router.get('/manager/updateteacher', manager.updateteacher)

router.get('/manager/addcourseinfo', manager.addcourseinfo)
router.get('/manager/delcourseinfo', manager.delcourseinfo)

router.get('/manager/addclassinfo', manager.addclassinfo)
router.get('/manager/delclassinfo', manager.delclassinfo)

router.get('/manager/addcsinfo', manager.addcsinfo)
router.get('/manager/delcsinfo', manager.delcsinfo)
router.get('/manager/updatecsinfo', manager.updatecsinfo)

router.get('/manager/changestudentkey', manager.changestudentkey)
router.get('/manager/changeteacherkey', manager.changeteacherkey)


router.get('/student/getsemester', student.getsemester)
router.get('/student/getallclass', student.getallclass)
router.get('/student/getoneclass', student.getoneclass)
router.get('/student/addclass', student.addclass)
router.get('/student/delclass', student.delclass)
router.get('/student/getcourse', student.getcourse)


router.get('/teacher/getclass', teacher.getclass)
router.get('/teacher/getstudent', teacher.getstudent)
router.get('/teacher/addclass', teacher.addclass)
router.get('/teacher/updatescore', teacher.updatescore)
router.get('/teacher/gettotal', teacher.gettotal)


router.get('/login/loginstudent', login.loginstudent)
router.get('/login/loginteacher', login.loginteacher)
router.get('/login/loginmanager', login.loginmanager)




module.exports = router





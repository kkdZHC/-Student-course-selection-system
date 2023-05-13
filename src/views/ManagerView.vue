<template>
  <div id="manager">
    
    <el-container>
      <el-aside>
        <h1>管理员菜单</h1>
        <p>请选择要查询的表</p>
        <el-select v-model="selectedValue" placeholder="请选择要查询的表">
          <el-option v-for="table in tables" :label="table.label" :value="table.value" :key="table.id"></el-option>
        </el-select>
        <span><el-button type="primary" @click="getall()">查询</el-button></span>
        <P>--------------------------------------------------</P>
        <el-form v-if="selectedValue=='student'">
          <p>对学生表进行操作</p>
          <el-select v-model="studentselect" placeholder="请选择要进行的操作" @change="setnull()">
            <el-option label="通过id对学生表进行查操作" value="select"/>
            <el-option label="通过id对学生表进行删除操作" value="delete"/>
            <el-option label="对学生表进行改动操作" value="update"/>
            <el-option label="对学生表进行增加操作" value="add"/>          
          </el-select>
          <p>
            
          </p>
          <el-form v-if="studentselect == 'select'||studentselect == 'delete'">
            <el-input class="inpu" v-model="studentid" placeholder="请输入学生学号"></el-input>
            <el-button  type="primary" @click="getstudent()">查询</el-button>
            <el-button  type="danger" @click="deletestudent()">删除</el-button>
          </el-form>
          
          <el-form v-if="studentselect == 'update'||studentselect == 'add'">
            <el-input class="inpu" v-model="studentid" placeholder="请输入学生学号"></el-input>
            <el-input class="inpu" v-model="studentname" placeholder="请输入学生姓名"></el-input>
            <el-input class="inpu" v-model="studentsex" placeholder="请输入学生性别"></el-input>
            <el-input class="inpu" v-model="studentdate" placeholder="请输入学生出生日" type="date"></el-input>
            <el-input class="inpu" v-model="studentaddress" placeholder="请输入学生户籍地址"></el-input>
            <el-input class="inpu" v-model="studentphone" placeholder="请输入学生手机号"></el-input>
            <el-input class="inpu" v-model="studentdept" placeholder="请输入学生院系号"></el-input> 
            <el-button v-if="studentselect == 'add'" type="primary" @click="addstudent()">新增</el-button>
            <el-button v-if="studentselect == 'update'" type="primary" @click="updatestudent()">改动</el-button>
          </el-form>
        </el-form>
        <el-form v-if="selectedValue=='teacher'">
          <p>对教师表进行操作</p>
          <el-select v-model="select" placeholder="请选择要进行的操作" @change="setnull()">
            <el-option label="通过id对教师表进行查操作" value="select"/>
            <el-option label="通过id对教师表进行删除操作" value="delete"/>
            <el-option label="对教师表进行改动操作" value="update"/>
            <el-option label="对教师表进行增加操作" value="add"/>          
          </el-select>
          <p>
            
          </p>
          <el-form v-if="select == 'select'||select == 'delete'">
            <el-input class="inpu" v-model="staffid" placeholder="请输入教师号"></el-input>
            <el-button  type="primary" @click="getteacher()">查询</el-button>
            <el-button  type="danger" @click="deleteteacher()">删除</el-button>
          </el-form>
          
          <el-form v-if="select == 'update'||select == 'add'">
            <el-input class="inpu" v-model="staffid" placeholder="请输入教师工号"></el-input>
            <el-input class="inpu" v-model="teachername" placeholder="请输入教师姓名"></el-input>
            <el-input class="inpu" v-model="teachersex" placeholder="请输入教师性别"></el-input>
            <el-input class="inpu" v-model="teacherdate" placeholder="请输入教师出生日" type="date"></el-input>
            <el-input class="inpu" v-model="teacherranks" placeholder="请输入教师职称"></el-input>
            <el-input class="inpu" v-model="teachersalary" placeholder="请输入教师薪资"></el-input>
            <el-input class="inpu" v-model="teacherdept" placeholder="请输入教师院系号"></el-input> 
            <el-button v-if="select == 'add'" type="primary" @click="addteacher()">新增</el-button>
            <el-button v-if="select == 'update'" type="primary" @click="updateteacher()">改动</el-button>
          </el-form>

        </el-form>
        <el-form v-if="selectedValue=='course'">
          <p>对课程信息表进行操作</p>
          <el-select v-model="select" placeholder="请选择要进行的操作" @change="setnull()">
            <el-option label="通过id对课程信息表进行删除操作" value="delete"/>

            <el-option label="对课程信息表进行增加操作" value="add"/>          
          </el-select>
          <p>
            
          </p>
          <el-form v-if="select == 'select'||select == 'delete'">
            <el-input class="inpu" v-model="courseid" placeholder="请输入课程号"></el-input>
            <!-- <el-button  type="primary" @click="getteacher()">查询</el-button> -->
            <el-button  type="danger" @click="deletecourseinfo()">删除</el-button>
          </el-form>
          
          <el-form v-if="select == 'update'||select == 'add'">
            <el-input class="inpu" v-model="courseid" placeholder="请输入课程号"></el-input>
            <el-input class="inpu" v-model="coursename" placeholder="请输入课程名"></el-input>
            <el-input class="inpu" v-model="coursecredit" placeholder="请输入课程学分"></el-input>
            <el-input class="inpu" v-model="coursehours" placeholder="请输入课时" ></el-input>
            <el-input class="inpu" v-model="coursedept" placeholder="请输入学院号"></el-input>
             
            <el-button v-if="select == 'add'" type="primary" @click="addcourseinfo()">新增</el-button>
            <!-- <el-button v-if="select == 'update'" type="primary" @click="updateteacher()">改动</el-button> -->
          </el-form>

        </el-form>
        <el-form v-if="selectedValue=='class'">
          <p>对教师开课表进行操作</p>
          <el-select v-model="select" placeholder="请选择要进行的操作" @change="setnull()">
            <!-- <el-option label="通过id对教师表进行查操作" value="select"/> -->
            <el-option label="通过id对教师开课表进行删除操作" value="delete"/>
            <!-- <el-option label="对教师表进行改动操作" value="update"/> -->
            <el-option label="对教师开课表进行增加操作" value="add"/>          
          </el-select>
          <p>
            
          </p>
          <el-form v-if="select == 'select'||select == 'delete'">
            <el-input class="inpu" v-model="courseid" placeholder="请输入课程号"></el-input>
            <el-input class="inpu" v-model="staffid" placeholder="请输入教师号"></el-input>
            <!-- <el-button  type="primary" @click="getteacher()">查询</el-button> -->
            <el-button  type="danger" @click="deleteclassinfo()">删除</el-button>
          </el-form>
          
          <el-form v-if="select == 'update'||select == 'add'">
            <el-input class="inpu" v-model="classsemester" placeholder="请输入开设学期"></el-input>
            <el-input class="inpu" v-model="courseid" placeholder="请输入课程号"></el-input>
            <el-input class="inpu" v-model="staffid" placeholder="请输入教师工号"></el-input>
            <el-input class="inpu" v-model="classtime" placeholder="请输入上课时间"></el-input>
           
            <el-button v-if="select == 'add'" type="primary" @click="addclassinfo()">新增</el-button>
            <!-- <el-button v-if="select == 'update'" type="primary" @click="updateteacher()">改动</el-button> -->
          </el-form>

        </el-form>
        <el-form v-if="selectedValue=='selection'">
          <p>对选课表进行操作</p>
          <el-select v-model="select" placeholder="请选择要进行的操作" @change="setnull()">
            <!-- <el-option label="通过id对教师表进行查操作" value="select"/> -->
            <el-option label="通过id对选课表进行删除操作" value="delete"/>
            <el-option label="对选课表进行改动操作" value="update"/>
            <el-option label="对选课表进行增加操作" value="add"/>          
          </el-select>
          <p>
            
          </p>
          <el-form v-if="select == 'select'||select == 'delete'">
            <el-input class="inpu" v-model="courseid" placeholder="请输入课程号"></el-input>
            <el-input class="inpu" v-model="studentid" placeholder="请输入学生学号"></el-input>
            <!-- <el-button  type="primary" @click="getteacher()">查询</el-button> -->
            <el-button  type="danger" @click="deletecsinfo()">删除</el-button>
          </el-form>
          
          <el-form v-if="select == 'add'">
            <el-input class="inpu" v-model="studentid" placeholder="请输入学生学号"></el-input>
            <el-input class="inpu" v-model="classsemester" placeholder="请输入开设学期"></el-input>
            <el-input class="inpu" v-model="courseid" placeholder="请输入课程号"></el-input>
            <el-input class="inpu" v-model="staffid" placeholder="请输入教师工号"></el-input>
            <el-input class="inpu" v-model="normalscore" placeholder="请输入平时成绩"></el-input>
            <el-input class="inpu" v-model="testscore" placeholder="请输入考试成绩"></el-input>
           
            <el-button v-if="select == 'add'" type="primary" @click="addcsinfo()">新增</el-button>
          </el-form>
          <el-form v-if="select == 'update'">
            <el-input class="inpu" v-model="studentid" placeholder="请输入学号"></el-input>
            <el-input class="inpu" v-model="courseid" placeholder="请输入课程号"></el-input>
            <el-input class="inpu" v-model="normalscore" placeholder="请输入平时成绩"></el-input>
            <el-input class="inpu" v-model="testscore" placeholder="请输入考试成绩"></el-input>
            
           
            
            <el-button v-if="select == 'update'" type="primary" @click="updatecsinfo()">改动</el-button>
          </el-form>

        </el-form>
        <P>--------------------------------------------------</P>
        <el-button type="primary" @click="changekey='student'">更改学生密码</el-button>
        <el-button type="primary" @click="changekey='teacher'">更改老师密码</el-button>
        <el-form v-if="changekey=='student'">
          <p>请输入学生学号</p>
          <el-input class="inpu" v-model="studentid" placeholder="请输入学生学号"></el-input>
          <el-input class="inpu" v-model="tempkey" placeholder="请输入新密码"></el-input>
          <el-button  type="danger" @click="changestudentkey()">确认</el-button>
        </el-form>
        <p>
       
        </p>
        <el-form v-if="changekey == 'teacher'">
          <p>请输入老师学号</p>
          <el-input class="inpu" v-model="staffid" placeholder="请输入老师学号"></el-input>
          <el-input class="inpu" v-model="tempkey" placeholder="请输入新密码"></el-input>
          <el-button  type="danger" @click="changeteacherkey()">确认</el-button>
        </el-form>
          
          
      </el-aside>
      <el-container>
        <el-main>
          <el-table :data="info" height="500" style="width: 100%">
            <template v-for="item in tableForList">
              <el-table-column                 
                :prop="item.value" 
                :label="item.label"
                sortable 
                v-if="item.isshow">
              </el-table-column>
            </template>           
          </el-table>
       </el-main>
       <el-footer>    
        <el-button  type="primary" @click="logout()">退出登陆</el-button>
       </el-footer>
      
      </el-container>   
    </el-container>
    
    
      
  </div>
  
  
</template>


<script>
import axios from "axios";
//import Dialog from './dialog'
export default {
  
  data () {
    return {
      dialogVisible: true,
      id:'',
      password:'',
      defaultpassword:'111111',
      changekey:'',
      selectedValue:'',
      studentselect:'',
      select:'',
      studentid:'',
      studentname:'',
      studentsex:'',
      studentdate:'',
      studentaddress:'',
      studentphone:'',
      studentdept:'',
      staffid:'',
      teachername:'',
      teachersex:'',
      techerdate:'',
      teacherranks:'',
      teachersalary:'',
      teacherdept:'',
      courseid:'',
      coursename:'',
      coursedept:'',
      coursecredit:'',
      coursehours:'',
      classsemester:'',
      classtime:'',
      normalscore:'',
      testscore:'',
      totalscore:'',
      tempkey:'',
      info: [],
      tables:[
        {id:0,label:"学生表",value:"student"},
        {id:1,label:"教师表",value:"teacher"},
        {id:2,label:"课程信息表",value:"course"},
        {id:3,label:"院系表",value:"department"},
        {id:4,label:"选课表",value:"selection"},
        {id:5,label:"教师开课表",value:"class"},
      ],     
      tableForList:[
        {id:0,label:"学生学号",value:"student_id",isshow:false},
        {id:1,label:"课程学期",value:"semester",isshow:false},
        {id:2,label:"课程号",value:"course_id",isshow:false},
        {id:3,label:"教师号",value:"staff_id",isshow:false},
        {id:4,label:"姓名",value:"name",isshow:false},
        {id:5,label:"性别",value:"sex",isshow:false},
        {id:6,label:"出生日",value:"date_of_birth",isshow:false},
        {id:7,label:"户籍地址",value:"native_place",isshow:false},
        {id:8,label:"手机号",value:"mobile_phone",isshow:false},
        {id:9,label:"教师级别",value:"professional ranks",isshow:false},
        {id:10,label:"薪水",value:"salary",isshow:false},
        {id:11,label:"课程名",value:"course_name",isshow:false},        
        {id:12,label:"学分",value:"credit",isshow:false},
        {id:13,label:"学时",value:"credit_hours",isshow:false},  
        {id:14,label:"院系号",value:"dept_id",isshow:false},  
        {id:15,label:"学院名",value:"dept_name",isshow:false},
        {id:16,label:"学院地址",value:"address",isshow:false},
        {id:17,label:"学院座机",value:"phone_code",isshow:false},
        {id:18,label:"平时分",value:"normal_score",isshow:false},
        {id:19,label:"考试分",value:"test_score",isshow:false},
        {id:20,label:"总分",value:"total_score",isshow:false},
        {id:21,label:"上课时间",value:"class_time",isshow:false},
      ],
      tableForGet:[
        {url:'http://localhost:3000/manager/getstudent',list:[0,4,5,6,7,8,14]},
        {url:'http://localhost:3000/manager/getteacher',list:[3,4,5,6,9,10,14]},
        {url:'http://localhost:3000/manager/getcourse',list:[2,11,12,13,14]},
        {url:'http://localhost:3000/manager/getdepartment',list:[14,15,16,17]},
        {url:'http://localhost:3000/manager/getselection',list:[0,1,2,3,18,19,20]},
        {url:'http://localhost:3000/manager/getclass',list:[1,2,3,21]},
      ],

    }
  },
  methods: {
    setnull(){
      this.studentid='',
      this.studentname='',
      this.studentsex='',
      this.studentdate='',
      this.studentaddress='',
      this.studentphone='',
      this.studentdept='',
      this.staffid='',
      this.teachername='',
      this.teachersex='',
      this.techerdate='',
      this.teacherranks='',
      this.teachersalary='',
      this.teacherdept='',
      this.courseid='',
      this.coursename='',
      this.coursedept='',
      this.coursecredit='',
      this.coursehours='',
      this.classsemester='',
      this.classtime='',
      this.normalscore='',
      this.testscore='',
      this.totalscore=''
    },
    getall(){
      for(let item of this.tableForList){
        item.isshow=false;
      }
      if(this.selectedValue=="student"){this.getdata(this.tableForGet[0].url,this.tableForGet[0].list)}
      else if(this.selectedValue=="teacher"){this.getdata(this.tableForGet[1].url,this.tableForGet[1].list)}
      else if(this.selectedValue=="course"){this.getdata(this.tableForGet[2].url,this.tableForGet[2].list)}
      else if(this.selectedValue=="department"){this.getdata(this.tableForGet[3].url,this.tableForGet[3].list)}
      else if(this.selectedValue=="selection"){this.getdata(this.tableForGet[4].url,this.tableForGet[4].list)}
      else if(this.selectedValue=="class"){this.getdata(this.tableForGet[5].url,this.tableForGet[5].list)}
      //console.log(this.info)
    },
    changestudentkey(){
      console.log(this.studentdate)
        axios.get('http://localhost:3000/manager/changestudentkey',{
          params: {
            id: this.studentid,
            newkey:this.tempkey,  
          }
        }).then(res=>{
          if(res.data.status == 200) {
          	this.getall()
            alert('修改成功')
          }else{
          	this.$message({
	          message: '失败',
	          type: 'error'
	        });
          }
        }).catch(err=>{
            console.log("操作失败" + err);
        })   
    },
    changeteacherkey(){
      console.log(this.studentdate)
        axios.get('http://localhost:3000/manager/changeteacherkey',{
          params: {
            id: this.staffid,
            newkey:this.tempkey,  
          }
        }).then(res=>{
          if(res.data.status == 200) {
          	this.getall()
            alert('修改成功')
          }else{
          	this.$message({
	          message: '失败',
	          type: 'error'
	        });
          }
        }).catch(err=>{
            console.log("操作失败" + err);
        })   
    },
    getdata(url,list){
      axios.get(url).then(res=>{
        this.info = res.data;
        for(let i of list){
          this.tableForList[i].isshow=true;
        }
      }).catch(err=>{
          console.log("获取数据失败" + err);
      })
    },
    getstudent(){//查询单个学生
      axios.get('http://localhost:3000/manager/getonestudent',{
        params: {id: this.studentid}
      }).then(res=>{
          console.log(res.data);
          this.info = res.data
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    deletestudent(){    //删除单个学生操作
      axios.get('http://localhost:3000/manager/delonestudent',{
        params: {id: this.studentid}
      }).then(res=>{
          console.log(res.data);
          if(res.data.status == 200) {
          	this.getall()           
          }else{
          	this.$message({
	          message: '删除失败',
	          type: 'error'
	        });
          }
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    addstudent() {   //添加学生操作
      if(this.studentid==""||this.studentname==""||this.studentsex==""||this.studentdept==""){
        alert('学生的姓名学号，学院号和性别不能为空')
        return 
      }
      else{
        console.log(this.studentdate)
        axios.get('http://localhost:3000/manager/addonestudent',{
          params: {
            id: this.studentid,
            sex:this.studentsex,
            name: this.studentname,
            date:this.studentdate,
            address: this.studentaddress,
            phone: this.studentphone,
            dept:this.studentdept,
            password:this.defaultpassword,
          }
        }).then(res=>{
          if(res.data.status == 200) {
          	this.getall()
          }else{
          	this.$message({
	          message: '添加失败',
	          type: 'error'
	        });
          }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      }
    },
    updatestudent() {     //修改学生操作
      axios.get('http://localhost:3000/manager/updatestudent',{
        params: {
          id: this.studentid,
          sex:this.studentsex,
          name: this.studentname,
          date:this.studentdate,
          address: this.studentaddress,
          phone: this.studentphone,           
          dept:this.studentdept,
        }         
      }).then(res=>{
          if(res.data.status == 200) {
        	  this.getall()
          }else{
         	  this.$message({
            message: '修改失败',
            type: 'error'
          });
           }
       }).catch(err=>{
           console.log("操作失败" + err);
       })
    },
    getteacher(){//查询单个老师
      axios.get('http://localhost:3000/manager/getoneteacher',{
        params: {id: this.staffid}
      }).then(res=>{
          console.log(res.data);
          this.info = res.data
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    deleteteacher(){    //删除单个老师操作
      axios.get('http://localhost:3000/manager/deloneteacher',{
        params: {id: this.staffid}
      }).then(res=>{
          console.log(res.data);
          if(res.data.status == 200) {
          	this.getall()           
          }else{
          	this.$message({
	          message: '删除失败',
	          type: 'error'
	        });
          }
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    addteacher() {   //添加教师操作
      if(this.staffid==""||this.teachername==""||this.teachersex==""||this.teacherdept==""){
        alert('教师的姓名学号，学院号和性别不能为空')
        return 
      }
      else{
       
        axios.get('http://localhost:3000/manager/addoneteacher',{
          params: {
            id: this.staffid,
            sex:this.teachersex,
            name: this.teachername,
            date:this.teacherdate,
            ranks: this.teacherranks,
            salary: this.teachersalary,
            dept:this.teacherdept,
            password:this.defaultpassword,
          }
        }).then(res=>{
          if(res.data.status == 200) {
          	this.getall()
          }else{
          	this.$message({
	          message: '添加失败',
	          type: 'error'
	        });
          }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      }
    },
    updateteacher() {     //修改教师操作
      axios.get('http://localhost:3000/manager/updateteacher',{
        params: {
          id: this.staffid,
          sex:this.teachersex,
          name: this.teachername,
          date:this.teacherdate,
          ranks: this.teacherranks,
          salary: this.teachersalary,           
          dept:this.studentdept,
        }         
      }).then(res=>{
          if(res.data.status == 200) {
        	  this.getall()
          }else{
         	  this.$message({
            message: '修改失败',
            type: 'error'
          });
           }
       }).catch(err=>{
           console.log("操作失败" + err);
       })
    },
    addcourseinfo() {   //添加课程信息表操作
      if(this.courseid==""||this.coursename==""||this.coursecredit==""||this.coursehours==""){
        alert('教师的姓名学号，学院号和性别不能为空')
        return 
      }
      else{
       
        axios.get('http://localhost:3000/manager/addcourseinfo',{
          params: {
            id: this.courseid,           
            name: this.coursename,
            credit:this.coursecredit,
            chours: this.coursehours,
            dept:this.coursedept,
          }
        }).then(res=>{
          if(res.data.status == 200) {
          	this.getall()
          }else{
          	this.$message({
	          message: '添加失败',
	          type: 'error'
	        });
          }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      }
    },
    deletecourseinfo(){    //删除课程信息表操作
      axios.get('http://localhost:3000/manager/delcourseinfo',{
        params: {id: this.courseid}
      }).then(res=>{
          console.log(res.data);
          if(res.data.status == 200) {
          	this.getall()           
          }else{
          	this.$message({
	          message: '删除失败',
	          type: 'error'
	        });
          }
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    addclassinfo() {   //添加教师开课表操作
      if(this.courseid==""||this.classsemester==""||this.classtime==""||this.staffid==""){
        alert('教师的工号，上课时间和课程号不能为空')
        return 
      }
      else{
        
        axios.get('http://localhost:3000/manager/addclassinfo',{
          params: {
            semester: this.classsemester,           
            cid: this.courseid,
            sid:this.staffid,
            time: this.classtime,
            
          }
        }).then(res=>{
          if(res.data.status == 200) {
          	this.getall()
          }else{
          	this.$message({
	          message: '添加失败',
	          type: 'error'
	        });
          }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      }
    },
    deleteclassinfo(){    //删除教师开课表操作
      axios.get('http://localhost:3000/manager/delclassinfo',{
        params: {
          id: this.courseid,
          sid:this.staffid
        }
      }).then(res=>{
          console.log(res.data);
          if(res.data.status == 200) {
          	this.getall()           
          }else{
          	this.$message({
	          message: '删除失败',
	          type: 'error'
	        });
          }
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    addcsinfo() {   //添加选课信息操作
      if(this.studentid==""||this.classsemester==""||this.courseid==""||this.staffid==""){
        alert('教师的工号，学生学号，上课时间和课程号不能为空')
        return 
      }
      else{
        
        axios.get('http://localhost:3000/manager/addcsinfo',{
          params: {
            studentid: this.studentid,
            semester:this.classsemester,
            cid: this.courseid,
            sid:this.staffid,
            normalscore: this.normalscore,
            testscore: this.testscore,
            //totalscore:this.totalscore,
          }
        }).then(res=>{
          if(res.data.status == 200) {
          	this.getall()
            this.gettotal()
          }else{
          	this.$message({
	          message: '添加失败',
	          type: 'error'
	        });
          }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      }
    },
    deletecsinfo(){    //删除选课信息操作
      axios.get('http://localhost:3000/manager/delcsinfo',{
        params: {
          sid: this.studentid,
          cid: this.courseid,
        }
      }).then(res=>{
          console.log(res.data);
          if(res.data.status == 200) {
          	this.getall()           
          }else{
          	this.$message({
	          message: '删除失败',
	          type: 'error'
	        });
          }
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    updatecsinfo() {     //修改选课表操作
      axios.get('http://localhost:3000/manager/updatecsinfo',{
        params: {
          normalscore: this.normalscore,
          testscore:this.testscore,
          //totalscore: this.teachername,
          studentid: this.studentid,
          courseid: this.courseid,
        }         
      }).then(res=>{
          if(res.data.status == 200) {
        	  this.getall()
            this.gettotal()
          }else{
         	  this.$message({
            message: '修改失败',
            type: 'error'
          });
           }
       }).catch(err=>{
           console.log("操作失败" + err);
       })
    },
   
    gettotal(){
      axios.get('http://localhost:3000/teacher/gettotal').then(res=>{
          //this.info = res.data;
      }).catch(err=>{
          console.log("操作失败" + err);
      }) 
    },
    getParams() {//获取参数
      this.id=this.$route.query.id;
      this.password=this.$route.query.password;
    },
    logout(){
      this.$router.push({
        path: '/login'    
      })
    }
  },
  created() {
    this.getParams();
    
  },
  mounted() {
      this.selectedValue = "student"
      this.studentselect = "select"
  },


}
</script>
<style>
body{
  background-color: whitesmoke;
  background-size: cover;
  background-attachment: fixed;
}
h1{
  font-size: 32px;
  font-weight: 600;
}
.inpu{
  background-color: whitesmoke;
  width: 88%;
  height: 30px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid silver;
  outline: none;
  font-size: 22px;
  
}

</style>
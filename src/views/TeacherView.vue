<template>
  <div id="teacher">
    <el-container>
      <el-aside>      
        <h2>操作菜单</h2>
        <h3>-----------------------------------</h3>      
        <P>可以查询本学期开设的课程</P>
        <el-button type="primary" @click="getclass()">查询课程信息</el-button>
        <h4>-----------------------------------</h4>
        <el-button type="primary" @click="this.addornot=!this.addornot">开设新课</el-button>
        <el-form v-if="addornot">
          <el-form-item  label="选择要开设的课程">
            <el-select v-model="courseid" placeholder="请选择">
              <el-option v-for="item in this.course" :key="item.course_name" :label="item.course_name" :value="item.course_id"/>              
            </el-select>
          </el-form-item>
        <el-form-item  label="课程时间:">
          <el-input  v-model="classtime" placeholder="请输入课程时间"/>
          </el-form-item>
          <el-button type="primary" @click="addclass()">开设新课</el-button>
          <el-button type="danger" @click="this.addornot=false">取消</el-button>         
        </el-form>
        <h4>-----------------------------------</h4>
        <P>可以查询选课学生信息</P>
        <el-form-item  label="课程号:">                        
          <el-input  v-model="classid" placeholder="请输入课程号"/>
        </el-form-item>
        <el-button type="primary" @click="getstudent()">查询选课学生清单</el-button>     
        <h4>-----------------------------------</h4>               
        <P>在表格中选择一个学生以登分</P>
        <el-form v-if="this.changeornot">  
          <el-form-item  label="平时分:">
            <el-input  v-model="normal_score" placeholder="请输入平时分"/>
          </el-form-item>
          <el-form-item  label="考试分:">
            <el-input  v-model="test_score" placeholder="请输入考试分"/>
          </el-form-item>
          <el-button type="primary" @click="this.updatescore()">确定</el-button>
          <el-button type="danger" @click="this.changeornot=false">取消</el-button>         
        </el-form>
      </el-aside>
      <el-container>
      <el-header>
        <h1>{{this.selectsemester+"教师菜单"}}</h1>
      </el-header>
      <el-main>
        <h1 v-if="this.currenttable!=''" >{{this.currenttable+"表格"}}</h1>       
        <el-table :data="info" height="500" style="width: 100%" 
        border 
        highlight-current-row
        @current-change="handleCurrentChange">
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
import axios from "axios"
export default {
  data () {
    return {
      staffid:'',
      password:'',
      selectsemester:'',
      classid:'',
      addornot:false,
      courseid:'',
      classtime:'',

      changeornot:false,     
      normal_score:'',
      test_score:'',
      total_score:0,
         
      tableForList:[
        {id:0,label:"课程学期",value:"semester",isshow:false},
        {id:1,label:"课程号",value:"course_id",isshow:false},
        {id:2,label:"课程名",value:"course_name",isshow:false},
        {id:3,label:"教师号",value:"staff_id",isshow:false},
        {id:4,label:"学分",value:"credit",isshow:false},
        {id:5,label:"学时",value:"credit_hours",isshow:false},
        {id:6,label:"上课时间",value:"class_time",isshow:false},
        {id:7,label:"院系号",value:"dept_id",isshow:false},
        {id:8,label:"姓名",value:"name",isshow:false},
        {id:9,label:"性别",value:"sex",isshow:false},
        {id:10,label:"学生学号",value:"student_id",isshow:false},
        {id:11,label:"平时分",value:"normal_score",isshow:false},
        {id:12,label:"考试分",value:"test_score",isshow:false},
        {id:13,label:"总分",value:"total_score",isshow:false},  
      ],
      info:[],
      course:[],
      currentRow: null,
      selectstudent:[],
      currenttable:'',
    }
  },
  methods: {
    getclass(){//获取开了什么课
      this.currenttable='课程';
      let temp=[0,1,2,3,4,5,6,7];
      for(let item of this.tableForList){item.isshow=false;}               
      for(let i of temp){this.tableForList[i].isshow=true;}
      axios.get('http://localhost:3000/teacher/getclass',{
        params: {
          semester:this.selectsemester,
          staffid:this.staffid,
        }
      }).then(res=>{
          this.info = res.data;
      }).catch(err=>{
          console.log("操作失败" + err);
      }) 
    },
    getstudent(){//通过课程号获取选课学生
      this.currenttable='学生';
      let temp=[8,9,10,11,12,13];
      for(let item of this.tableForList){item.isshow=false;}               
      for(let i of temp){this.tableForList[i].isshow=true;}
      axios.get('http://localhost:3000/teacher/getstudent',{
        params: {
          semester:this.selectsemester,
          staffid:this.staffid,
          classid:this.classid,
        }
      }).then(res=>{
          this.info = res.data;          
      }).catch(err=>{
          console.log("操作失败" + err);
      }) 
    },
    addclass(){
      if(this.courseid==""||this.classtime==""){
        alert('输入不能为空', '操作失败')      
      }
      else{     
        axios.get('http://localhost:3000/teacher/addclass',{
          params: {
            semester:this.selectsemester,
            courseid:this.courseid,
            staffid:this.staffid,
            classtime:this.classtime,
          }
        }).then(res=>{
          if(res.data.status == 200) {
            this.addornot=false;
          	this.getclass()
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
    updatescore(){
      console.log(this.total_score)
      axios.get('http://localhost:3000/teacher/updatescore',{
        params: {
          normal:this.normal_score,
          test:this.test_score,
          //total:this.total_score,
          studentid:this.selectstudent.student_id,
          semester:this.selectsemester,
          courseid:this.selectstudent.course_id,
          staffid:this.staffid,
        }         
      }).then(res=>{
          if(res.data.status == 200) {
        	  this.gettotal();
            this.getstudent();
            this.changeornot=false;     
            this.normal_score='';
            this.test_score='';
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
    handleCurrentChange(val){
      if(this.currenttable=='学生')
      {       
        this.selectstudent=val;
        this.changeornot=true;
        console.log(this.selectstudent)
      }      
    },
    gettotal(){
      axios.get('http://localhost:3000/teacher/gettotal').then(res=>{
          //this.info = res.data;
      }).catch(err=>{
          console.log("操作失败" + err);
      }) 
    },
    getcourse(){//获取课程信息
      axios.get('http://localhost:3000/manager/getcourse').then(res=>{
          this.course = res.data;
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    getParams() {//获取参数
      this.staffid=this.$route.query.id;
      this.password=this.$route.query.password;
      this.selectsemester=this.$route.query.semester;
    },
    logout(){
      this.$router.push({
        path: '/login'    
      })
    }   
  },
  created() {
    this.getParams();
    this.getcourse();
  },
}
</script>



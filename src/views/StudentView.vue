<template>
  <div id="student">
    <el-container>
      <el-aside>      
        <h2>操作菜单</h2>
        <h3>-----------------------------------</h3>
        <P>可以查询本学期开设的课程</P>
        <el-button type="primary" @click="getcourse()">查询课程信息</el-button>               
        <h4>-----------------------------------</h4>
        <el-button type="primary" @click="getallclass()">查询选课清单</el-button>     
        <h4>-----------------------------------</h4>
        <P>可以进行选课或是退课</P>
        <el-select v-model="studentselect" placeholder="请选择要进行的操作" @change="setnull()">
          <el-option label="选课" value='chooseclass' />
          <el-option label="退课" value='deleteclass' />
        </el-select>
        <el-form-item v-if="studentselect !=''" label="课程号:">                        
          <el-input  v-model="classid" placeholder="请输入课程号"/>
        </el-form-item>
        <el-form-item v-if="studentselect !=''" label="教师号:">
          <el-input  v-model="staffid" placeholder="请输入教师号"/>
        </el-form-item>
        <el-button v-if="studentselect=='chooseclass'" type="primary" @click="addclass()">确定选课</el-button>
        <el-button v-if="studentselect=='deleteclass'" type="primary" @click="delclass()">确定退课</el-button>
      </el-aside>
      <el-container>
      <el-header>
        <h1>{{this.selectsemester+"学生选课菜单"}}</h1>
      </el-header>
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
        <p>{{this.selectsemester+"学期,你的总学分为:"+this.totalcredit+"分"}}</p>
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
      studentid:'',//传参
      selectsemester:'',
      password:'',

      studentselect:'', //学生选择要选课还是退课
      classid: '',staffid:'',
      classid1: '',staffid1:'',
      classsemester:'',     
      classtime:'',
      classname:'',
      
      semester:[],
      totalcredit:'0',//学期总学分
      tableForList:[
        {id:0,label:"学生学号",value:"student_id",isshow:false},
        {id:1,label:"课程学期",value:"semester",isshow:false},
        {id:2,label:"课程号",value:"course_id",isshow:false},
        {id:3,label:"课程名",value:"course_name",isshow:false},
        {id:4,label:"教师号",value:"staff_id",isshow:false},
        {id:5,label:"学分",value:"credit",isshow:false},
        {id:6,label:"学时",value:"credit_hours",isshow:false},
        {id:7,label:"上课时间",value:"class_time",isshow:false},
        {id:8,label:"院系号",value:"dept_id",isshow:false},      
        {id:9,label:"平时分",value:"normal_score",isshow:false},
        {id:10,label:"考试分",value:"test_score",isshow:false},
        {id:11,label:"总分",value:"total_score",isshow:false},  
      ],
      info: [],    
    };
  },
  methods: {
    setnull(){
      this.classid='';
      this.staffid='';
    },
    getcredit(){ //计算学分
      let a=0;
      for(let item of this.info){
        a=a+item.credit;
        console.log(item.credit)
      }
      this.totalcredit=a;
    },
    showtable(){
      for(let item of this.tableForList){
        item.isshow=true;
      } 
    },
    getallclass(){    //查询选课清单
      this.totalcredit='';
      this.showtable();     
      axios.get('http://localhost:3000/student/getallclass',{
        params: {
          id: this.studentid,
          semester:this.selectsemester
        }
      }).then(res=>{
          console.log(res.data);
          this.info = res.data;
          this.getcredit();
      }).catch(err=>{
          console.log("操作失败" + err);
      })      
    },
    getoneclass(){  //通过输入的课程号和教师号唯一确定一门课程
      axios.get('http://localhost:3000/student/getoneclass',{
        params: {
          classid:this.classid,
          staffid:this.staffid
        }         
      }).then(res=>{
          let temp=res.data;
          this.classsemester = temp[0].semester;//获取他的学期信息
      }).catch(err=>{
          console.log("操作失败" + err);          
      })
    },
    addclass(){ //选课
      this.getoneclass(); 
      if(this.selectsemester==this.classsemester)
      {
        axios.get('http://localhost:3000/student/addclass',{
          params: {
            student_id: this.studentid,
            semester:this.selectsemester,
            course_id:this.classid,
            staff_id:this.staffid,
          }
        }).then(res=>{
            console.log(res.data);
            this.getallclass();
        }).catch(err=>{
            console.log("操作失败" + err);
        })/**/
      }
      else{
        this.$alert('请选择正确的课程', '选课失败', {
          confirmButtonText: '确定',
          callback: action => {           
            this.staffid = '',
            this.classid = ''
          }
        });
      }    
    },
    delclass(){//退课
      this.getoneclass(); 
      axios.get('http://localhost:3000/student/delclass',{
        params: {
          student_id:this.studentid,
          semester:this.classsemester,
          course_id:this.classid,
          staff_id:this.staffid,
        }
      }).then(res=>{
          //console.log(res.data);
          if(res.data.status == 200) {
          	this.getallclass();
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
    getcourse(){
      let temp=[1,2,3,4,5,6,7,8];
      for(let item of this.tableForList){item.isshow=false;}               
      for(let i of temp){this.tableForList[i].isshow=true;}
      axios.get('http://localhost:3000/student/getcourse',{
        params: {
          semester:this.selectsemester,
        }
      }).then(res=>{
          console.log(res.data);
          this.info = res.data;
      }).catch(err=>{
          console.log("操作失败" + err);
      }) 
    },
    getParams() {//获取参数
      this.studentid=this.$route.query.id;
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
  },
}
</script>

<template>
  <div class="bg" >
    <div id="selectseason" >
        <h2>选择选课学期</h2>
        <el-form ref="form" label-width="20%">      
          <el-row v-for="item in this.semesters" justify="center" align="middle">
            <el-radio v-model="radio" :label="item.semester">{{item.semester+"学期"}}</el-radio>    
          </el-row>
        </el-form>     
        <el-button type="primary" round @click="semester()" class="btn">确定</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
      identity:'',
      id:'',
      password:'',
      radio:'',
      semesters:'',
    };
  },
  methods: {
    getsemester(){ //获取学期
      axios.get('http://localhost:3000/student/getsemester').then(res=>{
          this.semesters = res.data         
          //console.log(this.semesters)
      }).catch(err=>{
          console.log("操作失败" + err);
      })
    },
    semester(){
      if(this.identity=='student'){
        this.$router.push({
        path: '/student',
        query: {         
          id: this.id,
          semester:this.radio,
          password:this.password,
        }
      })
      }
      else if(this.identity=='teacher'){
        this.$router.push({
        path: '/teacher',
        query: {         
          id: this.id,
          semester:this.radio,
          password:this.password,
        }
      })
      }     
    },
    getParams() {
      this.id=this.$route.query.id;
      this.password=this.$route.query.password;
      this.identity=this.$route.query.identity;
    }    
  },
  created() {
    this.getsemester();
    this.getParams()
  },

  
}
</script>
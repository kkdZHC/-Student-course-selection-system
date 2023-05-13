<template>
  <div class="bg" >
    <div id="login" >
        <h2>登录页面</h2>
        <el-form ref="form" :model="form" label-width="20%">

        <el-radio v-model="radio" label="student">学生</el-radio>
        <el-radio v-model="radio" label="teacher">老师</el-radio>
        <el-radio v-model="radio" label="manager">管理员</el-radio>
        
        <el-form-item label="用户名:">
        <el-input class="inpu" v-model="form.username" style="width:100%"></el-input>
        </el-form-item>

        <el-form-item label="密  码:">
        <el-input class="inpu" v-model="form.password" type="password" style="width:100%"></el-input>
        </el-form-item>
        </el-form>
        <el-button  type="primary" round @click="login" class="btn">登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
      radio:'',
      form: {
        username: '',
        password: ''  
      }
    };
  },
  methods: {
    login() {
      if(this.form.username == '') {
        this.$message.error('用户名不能为空');
      }else if(this.form.password == '') {
        this.$message.error('密码不能为空');
      }else{
        if(this.radio=="student"){this.loginstudent()}
        else if(this.radio=="teacher"){this.loginteacher()}
        else if(this.radio=="manager"){this.loginmanager()}
        else(alert('必须选择一个身份登陆'))
      }
    },
    loginstudent(){
      axios.get('http://localhost:3000/login/loginstudent', {
          params: {
            id: this.form.username,
            password: this.form.password
          }
        }).then(res=>{
          if(res.data.status == 200) {
            this.$router.push({
              path: '/semester',
              query: {
                id: this.form.username,
                password:this.form.password,
                identity:this.radio,
              }
            })
          }else{
            this.$alert('用户名或密码错误', '登录失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.form.username = '',
                this.form.password = ''
              }
            });
          }
        }).catch(err=>{
            console.log("登录失败" + err);
        })
    },
    loginteacher(){
      axios.get('http://localhost:3000/login/loginteacher', {
          params: {
            id: this.form.username,
            password: this.form.password
          }
        }).then(res=>{
          if(res.data.status == 200) {
            this.$router.push({
              path: '/semester',
              query: {
                id: this.form.username,
                password:this.form.password,
                identity:this.radio,
              }
            })
          }else{
            this.$alert('用户名或密码错误', '登录失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.form.username = '',
                this.form.password = ''
              }
            });
          }
        }).catch(err=>{
            console.log("登录失败" + err);
        })
      
    },
    loginmanager(){
      axios.get('http://localhost:3000/login/loginmanager', {
          params: {
            id: this.form.username,
            password: this.form.password
          }
        }).then(res=>{
          if(res.data.status == 200) {
            this.$router.push({
              path: '/manager',
              query: {
                id: this.form.username,
                password:this.form.password,
              }
            })
          }else{
            this.$alert('用户名或密码错误', '登录失败', {
              confirmButtonText: '确定',
              callback: action => {
                this.form.username = '',
                this.form.password = ''
              }
            });
          }
        }).catch(err=>{
            console.log("登录失败" + err);
        })
      
    }
  },
  
}

</script>
<style>
body{
  margin: 0;
  padding: 0;
  background: url(./wallpaper.png);
  background-size: cover;
  background-attachment: fixed;
}
h2{
  font-size: 32px;
  font-weight: 600;
}
.inpu{
  background-color: transparent;
  width: 200px;
  border: none;
  margin-bottom: 32px;
  font-size: 22px;
  padding: 10px;
  border-radius: 16px;
  
  backdrop-filter: blur(3px);
  border-left: 2px solid rgba(255,255,255, .3);
  border-top: 2px solid rgba(255,255,255, .3);
  box-shadow: 2px 2px 10px rgba(0, 0, 0,  .2);

  text-shadow: 2px 2px 2px rgba(0, 0, 0,  .2);
  font-family: "Berlin Sans FB";
  color: whitesmoke;

}
.btn{
  background-color: transparent;
  width: 240px;
  height: 48px;
  border-radius: 8px;
  margin-top: 25px;
  cursor: pointer;
  font-size: 34px;
  font-weight: bold;
  color: white;
  backdrop-filter: blur(3px);
  border-left: 2px solid rgba(255,255,255, .3);
  border-top: 2px solid rgba(255,255,255, .3);
  box-shadow: 2px 2px 10px rgba(0, 0, 0,  .2);

  text-shadow: 2px 2px 2px rgba(0, 0, 0,  .2);
  font-family: "Berlin Sans FB";
  color: whitesmoke;
}
.btn:hover{
  background-color: rgb(189, 232, 88);
}
#login{
  background-color: rgba(255,255,255, .3);
  width: 400px;
  height: 450px;
  border-radius: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  backdrop-filter: blur(3px);
  border-left: 2px solid rgba(255,255,255, .3);
  border-top: 2px solid rgba(255,255,255, .3);
  box-shadow: 2px 2px 10px rgba(0, 0, 0,  .2);
  text-align: center;
 
}



</style>
<template>
  <div class="bg">
    <div id="login">
      <h2 class="title">登录页面</h2>
      <el-form ref="form" :model="form" label-width="20%" class="bform">

        <el-radio v-model="radio" label="student">学生</el-radio>
        <el-radio v-model="radio" label="teacher">老师</el-radio>
        <el-radio v-model="radio" label="manager">管理员</el-radio>

        <el-form-item label="用户名:">
          <el-input class="inpu" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密  码:">
          <el-input class="inpu" v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" round @click="login" class="btn">登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      radio: '',
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      if (this.form.username == '') {
        this.$message.error('用户名不能为空');
      } else if (this.form.password == '') {
        this.$message.error('密码不能为空');
      } else {
        if (this.radio == "student") { this.loginstudent() }
        else if (this.radio == "teacher") { this.loginteacher() }
        else if (this.radio == "manager") { this.loginmanager() }
        else (alert('必须选择一个身份登陆'))
      }
    },
    loginstudent() {
      axios.get('http://localhost:3000/login/loginstudent', {
        params: {
          id: this.form.username,
          password: this.form.password
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.$router.push({
            path: '/semester',
            query: {
              id: this.form.username,
              password: this.form.password,
              identity: this.radio,
            }
          })
        } else {
          this.$alert('用户名或密码错误', '登录失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.form.username = '',
                this.form.password = ''
            }
          });
        }
      }).catch(err => {
        console.log("登录失败" + err);
      })
    },
    loginteacher() {
      axios.get('http://localhost:3000/login/loginteacher', {
        params: {
          id: this.form.username,
          password: this.form.password
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.$router.push({
            path: '/semester',
            query: {
              id: this.form.username,
              password: this.form.password,
              identity: this.radio,
            }
          })
        } else {
          this.$alert('用户名或密码错误', '登录失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.form.username = '',
                this.form.password = ''
            }
          });
        }
      }).catch(err => {
        console.log("登录失败" + err);
      })

    },
    loginmanager() {
      axios.get('http://localhost:3000/login/loginmanager', {
        params: {
          id: this.form.username,
          password: this.form.password
        }
      }).then(res => {
        if (res.data.status == 200) {
          this.$router.push({
            path: '/manager',
            query: {
              id: this.form.username,
              password: this.form.password,
            }
          })
        } else {
          this.$alert('用户名或密码错误', '登录失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.form.username = '',
                this.form.password = ''
            }
          });
        }
      }).catch(err => {
        console.log("登录失败" + err);
      })

    }
  },

}

</script>
<style scoped="scoped">
.bg {
  width: revert;
  height: 80%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
}

#login {
  width: 35%;
  height: 60%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
    0 0 6px #f0f0f0;
  padding-top: 1%;
  padding-bottom: 1%;
  top: 50%;
}
.inpu {
  width: auto;
}
</style>
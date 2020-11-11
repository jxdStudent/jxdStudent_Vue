<template>
  <div class="login">
        <!--<el-row>
     <el-col :span="16">-->
        <div style="margin-left: -90%;margin-top: -50px;">
          <img src="../assets/imgs/logo.png" alt="" style="display: inline-block">
          <div style="margin-left: 490px;margin-top: -65px;font-size: 40px;">金桥学员成长跟踪系统</div>
        </div>
        <!--</el-col>
        <el-col :span="8">-->
        <!--<img src="../assets/imgs/login.png" width="300" style="margin-top: -40px" alt="">-->
        <el-form ref="loginForm" :model="form" label-width="80px" class="login-box">
          <el-form-item label="账号" prop="uname">
            <el-input type="text" placeholder="请输入账号" @keyup.enter.native="submitForm" v-model="form.name"/>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" placeholder="请输入密码" @keyup.enter.native="submitForm" v-model="form.pwd"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" class="login-btn">登录</el-button>
          </el-form-item>
        </el-form>
        <!-- </el-col>
       </el-row>-->
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "login",
    data: function () {
      return {
        form: {
          name: '',
          pwd: ''
        }
      }
    },
    methods: {

      submitForm: function () {
        localStorage.setItem("uname",this.form.name)
        //提交操作
        axios.get("login/" + this.form.name + "/" + this.form.pwd).then(res => {
          //登录是否成功
          if (res.data != null && res.data != "") {
            //将用户名存储到store仓库中
            //commit属于固定用法，用于调用mutation中的方法
            //第一个参数是变量名，第二个参数是方法名
            //this.$store.commit("setUname",this.form.name);

            //调用actions中的方法
            this.$store.dispatch("setUserName", res.data.uname);
            this.$store.dispatch("setUserRole", res.data.role);
            this.$store.dispatch("setUserUid", this.form.name);

            //页面跳转
            //this.$router.push({path: "/adminIndex"});

            if (res.data.role == 4) {//30001
              this.$message({type :"success", message :"登录成功"})
              this.$router.push({path: "/adminIndex"});
            } else if (res.data.role == 1) {//20001
              this.$message({type :"success", message :"登录成功"})
              this.$router.push({path: "/TeacherIndex"});
            } else if(res.data.role == 3){
              this.$message({type :"success", message :"登录成功"})
            this.$router.push({path: "/mgrIndex"});
          }else if (res.data.role == 2){
              this.$message({type :"success", message :"登录成功"})
              this.$store.dispatch("setUserUid", this.form.name);
              this.$store.dispatch("setSelectStuNo", this.form.name);
              //通过员工号获取学生号
              this.axios.get("getStudentnoByEmpno/" + this.form.name).then(res => {
                //存储学号
                this.$store.dispatch("setUserUid", res.data.sno);
                //存储员工号
                this.$store.dispatch("setSno", this.form.name);
                this.$router.push({path: "/InfoIndex"});
              });
            } else if (res.data.role == 0){  //10001
              this.$message({type :"success", message :"登录成功"})
              this.$store.dispatch("setSelectStuNo", this.form.name);
            this.$router.push({path: "/InfoIndex"});
          } else if(res.data.role == -1){
              this.$message.error("用户名或密码错误")
            }
          else {
              this.$message.error("用户名或密码错误")
            };
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 100px auto;
    padding: 35px 35px 15px 30px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

/*  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }*/

  .login{
    background-image: url("../assets/imgs/6.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login-btn{
    margin-left: -200px;
  }
</style>

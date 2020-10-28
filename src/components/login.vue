<template>
  <div><!--唯一根标签-->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
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
        //提交操作
        axios.get("http://localhost:8081/login/" + this.form.name + "/" + this.form.pwd).then(res => {
          //登录是否成功
          if ("success" == res.data) {
            //将用户名存储到store仓库中
            //commit属于固定用法，用于调用mutation中的方法
            //第一个参数是变量名，第二个参数是方法名
            //this.$store.commit("setUname",this.form.name);

            //调用actions中的方法
            this.$store.dispatch("setUser",this.form.name);
            //页面跳转
            this.$router.push({path: "/adminIndex"})
          } else {
            this.$message("用户名或密码错误");
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

<template>
    <!--添加横向导航栏-->
  <div>
  <div class="navMenu">
    <el-row>
      <el-col>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-submenu index="1">
            <template slot="title">
              <span v-if="isShow"> <!--添加头像-->
                  <el-avatar :size="50">
                    <img src="../assets/imgs/title.png" alt="">
                  </el-avatar>
              </span>
              <span v-else> <!--添加头像-->
                  <el-avatar :size="50">
                    <img :src="img" alt="">
                  </el-avatar>
              </span>

            </template>
            <el-menu-item index="1-1" @click="change_pwd">修改密码</el-menu-item>
            <el-menu-item index="1-2" @click="edit">编辑资料</el-menu-item>
            <el-menu-item index="1-3" @click="exit">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>

    <div>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-row>
          <el-col :span="8" :offset="6">
            <el-form :model="form" label-suffix="：" :label-position="labelPosition"
                     label-width="120px" :rules="rules" ref="form" status-icon class="demo-ruleForm">
              <el-form-item label="旧密码" prop="pwd_old">
                <el-input type="password" v-model="form.pwd_old" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="新密码" prop="pwd_new">
                <el-input type="password" v-model="form.pwd_new" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="pwd_check">
                <el-input type="password" v-model="form.pwd_check" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit_change_pwd('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
  <div style="float: right;font-size: 18px;padding: 15px 15px;margin-top: 3px"><span>欢迎你,{{$store.state.uname}}</span></div>
      <img src="../assets/imgs/logo.png" style="float: left;margin-top: 5px" width="45" alt="">
    <div style="float: left;font-size: 25px;margin-top:5px;padding: 2px 10px;font-weight: bold;font-family: 'Microsoft YaHei'">
      <span>金桥学员成长跟踪系统</span>
    </div><!--那啊啊-->
  </div>
</template>
<script>
    export default {
        name: "navMenu",
      props:{
        edit_student:{
          type:Function,
          required:true
        },
        img:{
          type:String,
          required: true
        },
        uid:{
          type:String,
          required:true
        }
      },
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入新密码'));
          } else if (value.length < 3 || value.length > 18){
            callback(new Error('密码长度3~18位'));
          } else {
            if (this.form.pwd_new !== '') {
              this.$refs.form.validateField('pwd_check');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.pwd_new) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return{
          dialogFormVisible: false,
          labelPosition:"right",
          isShow:false,
          imgUrl:null,

          form: {
            pwd_old:null,
            pwd_new:null,
            pwd_check:null
          },
          rules: {
            pwd_old:[
              {required: true, message: '请填写旧密码',trigger:'blur'},
            ],
            pwd_new: [
              {required: true, message: '请填写新密码'},
              {validator: validatePass, trigger: 'blur'}
            ],
            pwd_check: [
              {required: true, message: '请再次输入新密码'},
              {validator: validatePass2, trigger: 'blur'}
            ],
          }
        }
      },
      methods:{
          getImgUrl(){
            if (this.img == undefined){
              this.isShow = !this.isShow
            }
          },
        change_pwd(){
          this.dialogFormVisible = true;
        },
        submit_change_pwd(form){
          this.axios.get("login/" + this.uid + "/" + this.form.pwd_old).then(res => {

            //判断旧密码是否正确
              if (res.data.uname != this.$store.getters.uname) {
                this.$message({
                  message: '旧密码输入错误',
                  type: 'error'
                });
                return false;
              }else if (this.form.pwd_old == this.form.pwd_new) {  //新密码与旧密码相同
                this.$message({
                  message: '新密码不能与旧密码相同',
                  type: 'warning'
                });
                return false;
              } else{
              this.$refs[form].validate((valid) => {
                if (valid) {
                  this.axios.post("editPwd/" + this.form.pwd_new + "/" + this.uid).then(res =>{
                    if (res.data == "success"){
                      this.$message.success("修改密码成功")
                    }
                  });
                  this.$refs[form].resetFields();
                  this.dialogFormVisible = false;
                } else {
                  this.$message.error("请按要求填写")
                  return false;
                }
              });
            }

          });

        },
        edit(){
          this.edit_student()
        },
        exit(){
          //TODO
          sessionStorage.clear()    //点击退出清除sessionStorage的数据   还是无法实现
          this.$store.dispatch("setSno", "");
          this.$router.push('/');
          //想清空vuex中的数据，让页面重新加载就行了
          //window.location.reload();
        }
      },
      mounted() {
        this.getImgUrl()
      }
    }
</script>

<style scoped>
.el-input{
  width:160px;
}
</style>

<template>
    <!--添加横向导航栏-->
  <div>
  <div class="navMenu">
    <el-row>
      <el-col>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">
                <div class="block"><!--添加头像-->
                  <el-avatar :size="50">
                    <img src="../assets/imgs/test.jpg" alt="">
                  </el-avatar>
                </div>
            </template>
            <el-menu-item index="1-1">修改密码</el-menu-item>
            <el-menu-item index="1-2" @click="edit">编辑资料</el-menu-item>
            <el-menu-item index="1-3" @click="exit">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
  <div style="float: right;font-size: 20px;padding: 15px 15px"><span>欢迎你,{{$store.state.uname}}</span></div>
  </div>
</template>

<script>
    export default {
        name: "navMenu",
      props:{
        edit_student:{
          type:Function,
          required:true
        }
      },
      methods:{
        edit(){
          this.edit_student()
        },
          exit(){
            //TODO
            sessionStorage.clear()    //点击退出清除vuex的数据， 不能实现？？
            this.$store.dispatch("setSno", "");
            this.$router.push('/');
            //想清空vuex中的数据，让页面重新加载就行了
            window.location.reload()
          }
      }
    }
</script>

<style scoped>

</style>

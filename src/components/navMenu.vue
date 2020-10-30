<template>
  <!--添加横向导航栏-->
  <div >
    <div style="float: right;">
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
              <el-menu-item index="1-2">编辑资料</el-menu-item>
              <el-menu-item index="1-3">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div style="float: right;font-size: 20px"><span>欢迎你,{{$store.state.uname}}</span></div>
  </div>
</template>

<script>
export default {
  name: "navMenu"
}
</script>

<style scoped>
</style>

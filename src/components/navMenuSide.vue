<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      :unique-opened="true"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="studentInfoInAdmin">
        <i class="el-icon-location"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="teacherInfoInAdmin">
        <i class="el-icon-menu"></i>
        <span slot="title">老师管理</span>
      </el-menu-item>
      <el-menu-item index="deptInfoInAdmin">
        <i class="el-icon-document"></i>
        <span slot="title">部门管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>学期管理</span>
        </template>
        <el-menu-item index="classInfoInAdmin">
          <i class="el-icon-document"></i>
          <span slot="title">学期管理</span>
        </el-menu-item>
        <el-menu-item index="courseInfoInAdmin">
          <i class="el-icon-document"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="accountInfoInAdmin">
        <i class="el-icon-setting"></i>
        <span slot="title">账号管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "navMenuSide",
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(path){
        this.$router.push(path)
      },
    },
  }
</script>

<style scoped>

</style>

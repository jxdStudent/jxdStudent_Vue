<template>
  <div>
    <el-container>
      <el-header>
        <nav-menu></nav-menu>
      </el-header>
      <el-container class="el-container">
        <el-aside width="15%">
          <el-menu>
          <navMenuSide v-for="(menu,i) in adminMenus" :key="i" :item="menu"></navMenuSide>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
            <!--            <student-info-in-admin></student-info-in-admin>-->
          </el-main>
          <el-footer class="el-footer-style">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  import navMenu from '../navMenu.vue';/*引入navMenu导航栏组件*/
  import navMenuSide from '../navMenuSide.vue'
  import studentInfoInAdmin from "./studentInfoInAdmin";

  export default {
    name: "adminIndex",
    components: {navMenu, navMenuSide, studentInfoInAdmin},
    data() {
      return {
        tableData: [],   //从后台获取数据
        adminMenus: [],
      }
    },
    methods: {
      getMenu() {
        axios.get('http://localhost:8081/getMenu').then(res => {
          this.adminMenus = res.data;
        })
      },
      getAllDept: function () {   //获取全部部门
        //通过getters属性获取仓库的值
        var name = this.$store.getters.uname;

        axios.get("http://localhost:8081/getStudentInAdmin").then(res => {
          this.tableData = res.data;
        })
      },
    },
    //生命周期钩子
    mounted() {
      this.getAllDept();
      this.getMenu();
    }
  }
</script>

<style scoped>
  .el-footer-style {
    position: absolute;
    bottom: 0;
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 84%;
  }
</style>

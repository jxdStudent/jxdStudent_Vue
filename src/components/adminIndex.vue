<template>
  <div>
    <el-container>
      <el-header>
        <div style="float: left;background-color: #42b983;width: 100%;margin-top: -60px;">
          <navMenu style="float: right;"></navMenu>
          <div style="float: right;padding: 15px 10px;font-size: 20px"><span>欢迎你,{{$store.state.uname}}</span></div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px"><navMenuSide></navMenuSide></el-aside>
        <el-container>
          <el-main>
            <el-table
              :data="tableData"
              border
              style="width: 100%;float: left">
              <el-table-column
                prop="uid"
                label="部门编号"
                width="300">
              </el-table-column>
              <el-table-column
                prop="uname"
                label="部门名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="pwd"
                label="地址">
              </el-table-column>
            </el-table></el-main>
          <el-footer class="el-footer-style">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <!--<navMenu></navMenu>
    <navMenuSide></navMenuSide>
    &lt;!&ndash;显示欢迎信息&ndash;&gt;
    <div>欢迎你,{{$store.state.uname}}</div>
    <el-table
      :data="tableData"
      border
      style="width: 60%;float: left">
      <el-table-column
        prop="uid"
        label="部门编号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="uname"
        label="部门名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="地址">
      </el-table-column>
    </el-table>-->
  </div>
</template>

<script>
  import axios from 'axios';
  import navMenu from './navMenu.vue';/*引入navMenu导航栏组件*/
  import navMenuSide from './navMenuSide.vue'

  export default {
    name: "adminIndex",
    components:{navMenu,navMenuSide},
    data() {
      return {
        tableData: []   //从后台获取数据
      }
    },
    methods: {
      getAllDept: function () {   //获取全部部门
        //通过getters属性获取仓库的值
        var name = this.$store.getters.name;

        axios.get("http://localhost:8081/getDept").then(res => {
          this.tableData = res.data;
        })
      }
    },
    //生命周期钩子
    mounted() {
      this.getAllDept()
    }
  }
</script>

<style scoped>
  .el-footer-style{
    margin-bottom: 0;
  }
</style>

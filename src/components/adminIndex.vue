<template>
  <div>
    <navMenu></navMenu>
    <!--显示欢迎信息-->
    <div>欢迎你,{{$store.state.uname}}</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
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
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';
  import navMenu from './navMenu.vue';/*引入navMenu导航栏组件*/

  export default {
    name: "adminIndex",
    components:{navMenu},
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

</style>

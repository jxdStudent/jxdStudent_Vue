<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      height="100%"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column
        prop="sno"
        label="学号"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="sname"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nation"
        label="汉族"
        width="100">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="出生日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="marriage"
        label="已婚"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="identity"
        label="身份证号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="graduate"
        label="毕业院校"
        width="120">
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "studentInfoInAdmin",
    data() {
      return {
        tableData: []   //从后台获取数据
      }
    },
    methods: {
      getAllDept: function () {   //获取全部部门
        //通过getters属性获取仓库的值
        var name = this.$store.getters.uname;

        axios.get("http://localhost:8081/getStudent").then(res => {
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

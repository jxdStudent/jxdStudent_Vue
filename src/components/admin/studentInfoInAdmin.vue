<template>
  <div class="Terminal" v-loading="loading">
    <!-- 查询操作 -->
    <div class="select">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-input v-model="formInline.adduser" placeholder="请输入学生姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addStudent">添加学生</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学生姓名">
              <el-input v-model="formInline.user" placeholder="请输入学生姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelect">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学期">
              <el-select v-model="formInline.region" placeholder="请选择学期">
                <el-option label="47期" value="shanghai"></el-option>
                <el-option label="48期" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="store-table">
      <el-table
        :data="tableData"
        border
        stripe="stripe"
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
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">允许编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.query.page"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="this.query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.query.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "studentInfoInAdmin",
    data() {
      return {
        tableData: [],   //从后台获取数据
        query: {
          total: 1,
          page: 1,
          pageSize: 5,
        },
        formInline: {
          user: '',
          region: '',
          adduser:''
        }
      }
    },
    methods: {
      getAllDept: function () {   //获取全部部门
        //通过getters属性获取仓库的值
        var name = this.$store.getters.uname;

        axios.get("http://localhost:8081/getAllStudent").then(res => {
          this.tableData = res.data;
        })
      },
      getAllByPage: function () {
        axios.get("http://localhost:8081/getAllByPage/" + this.query.page + "/" + this.query.pageSize).then(res => {
          this.tableData = res.data;
        })
      },
      handleSizeChange(val) {
        this.page = 1;
        this.query.pageSize = val;
        this.getAllByPage()
      },
      handleCurrentChange(val) {
        this.query.page = val;
        this.getAllByPage()
      },
      onSubmit() {
        console.log('submit!');
      },
      onSelect() {
        console.log('select!');
      },
      addStudent() {
        console.log('addStudent!');
        var data = this.from;

        axios.post("http://localhost:8081/addStudentInUser/" + this.formInline.adduser + "/" + this.query.pageSize).then(res => {
          this.tableData = res.data;
        })
      }
    },
    //声明生命周期钩子
    created() {//编译后直接获取数据
      this.getAllByPage();
    },
    //生命周期钩子
    mounted() {
      this.getAllDept()
      //this.handleUserList()
    }
  }
</script>

<style scoped>

</style>

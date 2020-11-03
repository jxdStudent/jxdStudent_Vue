<template>
  <div>
    <el-container>
      <el-header>
        <nav-menu></nav-menu>
      </el-header>
      <el-container class="el-container">
        <el-aside width="15%">
          <navMenuSide></navMenuSide>
        </el-aside>
        <el-container>
          <el-main>
            <div class="select">
              <el-form :inline="true" :model="selectEmp" class="demo-form-inline">
                <el-row>
                  <el-col :span="8" offset="4">
                    <el-form-item label="员工编号">
                      <el-input v-model="selectEmp.empno" placeholder="请输入员工编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSelect">查询</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item>
                      <el-button type="primary" @click="dialogFormVisible = true">添加员工</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div class="store-table">
              <el-table
                :data="tableData"
                border
                fit="fit"
                stripe="stripe"
                style="width: 100%"
                :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column
                  prop="empno"
                  label="员工编号"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="ename"
                  label="员工姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="job"
                  label="员工工作"
                >
                </el-table-column>
                <el-table-column prop="officaldate" label="入职日期">
                </el-table-column>
                <el-table-column prop="student.sno" label="学号">
                </el-table-column>
                <el-table-column prop="dept.dname" label="部门名称">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="allEmp(scope.row.deptno)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.query.current"
                :page-sizes="[2, 5, 10, 15]"
                :page-size="this.query.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.query.total">
              </el-pagination>
            </div>
            <!--            <student-info-in-admin></student-info-in-admin>-->
          </el-main>
          <el-footer class="el-footer-style">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import navMenu from '../navMenu.vue';/*引入navMenu导航栏组件*/
  import navMenuSide from '../navMenuSide.vue'
  import axios from "axios";

  export default {
    name: "empInfoInAdmin",
    components: {navMenu, navMenuSide},
    data() {
      return {
        tableData: [],   //从后台获取数据
        query: {
          total: 1,
          current: 1,
          size: 2,
        },
        selectEmp: {
          empno: ''
        }
        /*formInline: {
          user: '',
        }*/
      }
    },
    methods: {
      getAllEmpSize: function () {
        let deptno = this.$route.query.deptno;
        axios.get("http://localhost:8081/selectAllEmpByPage/" + deptno).then(res => {
          this.query.total = res.data.length;
        })
      },
      getAllByPage: function () {
        let deptno = this.$route.query.deptno;
        axios.get("http://localhost:8081/selectEmpWithDeptByPage/" + this.query.current + "/" +
          this.query.size + "/" + deptno).then(res => {
          this.tableData = res.data;
        })
      },
      handleSizeChange(val) {
        this.page = 1;
        this.query.size = val;
        this.getAllByPage()
      },
      handleCurrentChange(val) {
        this.query.current = val;
        this.getAllByPage()
      },
      onSelect() {
        console.log('select!');
      }
    },
    mounted() {
      //this.getAllEmp();
      //this.handleUserList()
      this.getAllEmpSize();
      this.getAllByPage();
    }
  }
</script>

<style scoped>

</style>

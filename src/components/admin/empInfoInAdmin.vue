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

            <el-row>
              <el-col :span="8" offset="4">
                <div class="select">
                  <el-form :inline="true" :model="selectEmp" class="demo-form-inline">
                    <el-form-item label="员工编号">
                      <el-input v-model="selectEmp.empno" placeholder="请输入员工编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSelect">查询</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>

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
              <!--<el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.query.page"
                :page-sizes="[1, 5, 10, 15]"
                :page-size="this.query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.query.total">
              </el-pagination>-->
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
      components:{navMenu,navMenuSide},
      data() {
        return {
          tableData: [],   //从后台获取数据
          query:{
            total:1,
            page:1,
            pageSize:5,
          },
          selectEmp:{
            empno: ''
          }
          /*formInline: {
            user: '',
          }*/
        }
      },
      methods:{
        getAllEmp: function () {   //获取全部部门
          //通过getters属性获取仓库的值
          var name = this.$store.getters.uname;

          let deptno = this.$route.query.deptno;
          axios.get("http://localhost:8081/selectEmpByNo/" + deptno).then(res => {
            this.tableData = res.data;
          })
        },
        /*getAllByPage:function(){
          axios.get("http://localhost:8081/getAllByPage/"+this.query.page+"/"+this.query.pageSize).then(res=>{
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
        },*/
        onSelect(){
          console.log('select!');
        }
      },
      mounted() {
        this.getAllEmp();
        //this.handleUserList()
        //this.getAllByPage();
      }
    }
</script>

<style scoped>

</style>

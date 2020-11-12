<template>
  <div style="margin: auto">
    <el-container>
      <el-header>
        <NavMenu :uid="this.$store.getters.uid"></NavMenu>
      </el-header>
    </el-container>

        <el-main>

          <!-- 模糊查询 -->
          <el-row>
            <el-col :span="8">
              <el-form :inline="true" :model="selectForm" ref="selectForm">
                <el-form-item>
                  <el-input  type="text" v-model="selectForm.ename" placeholder="请输入员工姓名"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="selectByEname(selectForm.ename)">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>

          <el-table
            :data="tableData"
            @row-click="getDeptEvaluate"
            border
            stripe
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">

            <el-table-column
              v-if="false"
              prop="sno"
              label="学号"
              sortable
              width="50"
              align="right">
            </el-table-column>

            <el-table-column
              prop="empno"
              label="工号"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sname"
              label="姓名"
              width="50"
              align="center"
              cell-click="getScore(scope.row.empno)">
            </el-table-column>
            <el-table-column
              prop="dname"
              label="员工部门"
              width="80"
              align="center"
              cell-click="getScore(scope.row.empno)">
            </el-table-column>
            <el-table-column
              prop="job"
              label="员工职务"
              width="60"
              align="center"
              cell-click="getScore(scope.row.empno)">
            </el-table-column>
            <el-table-column
              prop="nation"
              label="籍贯"
              width="50"
              align="center">
            </el-table-column>

            <el-table-column
              prop="graduate"
              label="毕业学校"
              width="100"
              align="center">
            </el-table-column>

            <el-table-column
              v-if="false"
              prop="officialdate"
              label="转正时间"
              width="100"
              align="center">
            </el-table-column>

            <el-table-column
              header-align="center"
              align="center"
              show-overflow-tooltip
              label="培训期间测试成绩">

              <template
                v-for="(head,index) in table_course_head">
                <!--拼接''：格式转换--课程编号head.cno是number类型的，从后台接收的成绩json里cno是字符串，-->
                <el-table-column
                  :prop="head.cno + ''"
                  :label="head.cname"
                  align="center">
                </el-table-column>
              </template>

            </el-table-column>

            <el-table-column
              prop="school"
              header-align="center"
              align="left"
              show-overflow-tooltip
              label="学校评价">
            </el-table-column>

            <el-table-column
              prop="type0"
              header-align="center"
              align="left"
              show-overflow-tooltip
              label="转正评价">
            </el-table-column>

            <el-table-column
              prop="type1"
              header-align="center"
              align="left"
              show-overflow-tooltip
              label="一年评价">
            </el-table-column>

            <el-table-column
              prop="type2"
              header-align="center"
              align="left"
              show-overflow-tooltip
              label="两年评价">
            </el-table-column>

            <el-table-column
              prop="type3"
              header-align="center"
              align="left"
              show-overflow-tooltip
              label="三年评价">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.query.page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="this.query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.query.total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from "axios";
  import NavMenu from "./navMenu";
  export default {
    components: {NavMenu},
    data() {
      return {
        query:{
          total:1,
          page:1,
          pageSize:5,
        },
        tableData: [],
        table_course_head: [],
        selectForm:{
          ename:null
        }
      }
    },
    methods: {
      //获取经理管理的员工总数量
      getStudentBymgr: function (ename) {
        //通过getters属性获取仓库中的值
        var mgr = this.$store.getters.uid;

        this.axios.get("getStudentBymgr/"+mgr+"/"+ename).then(res => {
          this.query.total = res.data.length;
        })
      },
      //获取经理管理的员工（分页显示）
      getAllByPage:function(ename){
        //通过getters属性获取仓库中的值
        var mgr = this.$store.getters.uid;

        this.axios.get("getAllByPage/"+this.query.page+"/"+this.query.pageSize+"/"+mgr+"/"+ename).then(res=>{
          debugger
          this.tableData = res.data;
        })

      },
      handleSizeChange(val) {
        this.query.page = 1;
        this.query.pageSize = val;
        this.getAllByPage()
      },
      handleCurrentChange(val) {
        this.query.page = val;
        this.getAllByPage()
      },
      //跳转到跟踪表
      getDeptEvaluate(val){
        debugger
        console.log(val.sno)

        this.$router.push({
          path: '/getDeptEvaluate',
          query: {
            empno: val.empno,
            ename: val.sname,
            dname: val.dname,
            job: val.job,
            sno: val.sno,
            officialdate:val.officialdate

          }
        })
      },
      //模糊查询
      selectByEname(ename){
        console.log(ename);
        this.query.page = 1;
        if(ename == "" || ename == undefined){
          ename = null;
        }
        this.getStudentBymgr(ename);
        this.getAllByPage(ename);
      },
      getTableHead() {
        //获取课程信息
          axios.get("/getAllCourse").then(res => {
            this.table_course_head = res.data;
          })
      },


    },
    //声明生命周期钩子
    created() {//创建实例后直接获取数据
      this.getAllByPage();
      this.getStudentBymgr();
      this.getTableHead();
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #409EFF;
    color: #333;


  }

  .el-aside {
    color: #C0C4CC;
  }

  .el-footer {
    background-color: #d9ecff;
  }
</style>

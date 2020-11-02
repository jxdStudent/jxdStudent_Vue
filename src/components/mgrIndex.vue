<template>
  <div>
    <el-container>
      <el-header>
        <NavMenu></NavMenu>
      </el-header>
      <el-container>
        <el-main>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
              prop="sno"
              label="学号"
              sortable
              width="100"
              align="right"
            v-if="false">
            </el-table-column>

            <el-table-column
              prop="empno"
              label="工号"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sname"
              label="姓名"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="nation"
              label="籍贯"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生年月"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="graduate"
              label="毕业学校"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="major"
              label="所学专业"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="officialdate"
              label="转正时间"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row.empno,0)">转正评价</el-button>
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row.empno,1)">工作一年评价</el-button>
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row.empno,2)">工作二年评价</el-button>
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row.empno,3)">工作三年评价</el-button>
              </template>
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
  import NavMenu from "./navMenu";
  export default {
    name: "TeacherIndex",
    components: {NavMenu},
    data() {
      return {
        query:{
          total:1,
          page:1,
          pageSize:5,
        },
        tableData: []
      }
    },
    methods: {
      getEvaluate(val1,val2) {//val1为员工编号，val2为评价类型
        console.log(val1,val2);
        this.axios.get("getDeptEvaluate/"+val1+"/"+val2).then(res => {
          console.log(res.data);
          debugger
              if(res.data == ""|| res.data == null){
                //页面跳转
                //路由传值
                this.$router.push({
                  path: "/addDeptEvaluate",
                  query: {
                    empno: val1,
                    type:val2
                  }
                });
              }else {
                //页面跳转
                //路由传值
                debugger
                let accountInfoJson = res.data;
                var accountJson = JSON.stringify(accountInfoJson);//传递json字符串能避免刷新参数丢失
                this.$router.push({
                  path: '/getDeptEvaluate',
                  query: {
                    dataObj: accountJson
                  }
                })
              }
        })
      },
      getStudentBymgr: function () {
        //通过getters属性获取仓库中的值
        var mgr = this.$store.getters.uid;

        this.axios.get("getStudentBymgr/"+mgr).then(res => {
          this.query.total = res.data.length;
        })
      },
      getAllByPage:function(){
        //通过getters属性获取仓库中的值
        var mgr = 2;/*this.$store.getters.uname;*/

        this.axios.get("getAllByPage/"+this.query.page+"/"+this.query.pageSize+"/"+mgr).then(res=>{
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
      }
    },
    //声明生命周期钩子
    created() {//编译后直接获取数据
      this.getAllByPage();
      this.getStudentBymgr();
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #409EFF;
    color: #333;
    line-height: 90px;
    margin-top: -50px;
  }

  .el-aside {
    color: #C0C4CC;
  }

  .el-footer {
    background-color: #d9ecff;
  }
</style>

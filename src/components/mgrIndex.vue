<template>
  <div>
    <el-container>
      <el-header>
        <NavMenu></NavMenu>
      </el-header>
    </el-container>
    <el-container>
      <el-container>
        <el-main>

          <!-- 模糊查询 -->
          <el-row>
            <el-col :span="8" :offset="5">
              <el-form :inline="true" :model="selectForm" ref="selectForm">
                <el-form-item label="员工姓名">
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
            @row-dblclick="getScore"
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
              prop="birthday"
              label="出生年月"
              width="80"
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
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="allow(scope.row)">允许转正</el-button>
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row,0)">转正评价</el-button>
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row,1)">工作一年评价</el-button>
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row,2)">工作二年评价</el-button>
                <el-button
                  size="mini"
                  @click="getEvaluate(scope.row,3)">工作三年评价</el-button>
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
    components: {NavMenu},
    data() {
      return {
        query:{
          total:1,
          page:1,
          pageSize:5,
        },
        tableData: [],
        selectForm:{
          ename:null
        }
      }
    },
    methods: {
      //跳转到评价界面，并传值
      getEvaluate(val1,val2) {//val1为员工编号，val2为评价类型
        console.log(val1, val2);
        // 获取工作满一，二，三年的日期，格式以YYYY-MM-DD显示
        let nextYear = this.$moment(val1.officialdate).add(1, 'years').format('YYYY-MM-DD');
        let secondYear = this.$moment(val1.officialdate).add(2, 'years').format('YYYY-MM-DD');
        let thirdYear = this.$moment(val1.officialdate).add(3, 'years').format('YYYY-MM-DD');
        //获取当前日期
        let nowTime = this.$moment().format('YYYY-MM-DD');
        console.log(nowTime+""+nextYear+""+secondYear+""+thirdYear)

        let time,msg;
        if(val2 == 1){
          time = nextYear;
          msg = "未满工作一年，不允许评价";
        }else if(val2 == 2){
          time = secondYear;
          msg = "未满工作两年，不允许评价";
        }else if(val2 == 3){
          time = thirdYear;
          msg = "未满工作三年，不允许评价";
        }

        if(val1.officialdate == null || val1.officialdate == ""){
          this.$message("请添加转正时间");
        }else {
          //不满足工作年限，不允许评价
          if (nowTime < time) {
            this.$message(msg);
          } else {
            this.axios.get("getDeptEvaluate/" + val1.empno + "/" + val2).then(res => {
              console.log(res.data);
              debugger
              if (res.data == "" || res.data == null) {
                this.$message("评价信息为空，请增加评价信息");
                //页面跳转
                //路由传值
                this.$router.push({
                  path: "/addDeptEvaluate",
                  query: {
                    empno: val1.empno,
                    ename: val1.sname,
                    type: val2
                  }
                });
              } else {
                //页面跳转
                //路由传值
                debugger
                let accountInfoJson = res.data;
                var accountJson = JSON.stringify(accountInfoJson);//传递json字符串能避免刷新参数丢失
                this.$router.push({
                  path: '/getDeptEvaluate',
                  query: {
                    dataObj: accountJson,
                    empno: val1.empno,
                    ename: val1.sname,
                    dname: val1.dname,
                    job: val1.job
                  }
                })
              }
            })
          }
        }
      },
      //获取经理管理的员工总数量
      getStudentBymgr: function (ename) {
        debugger
        //通过getters属性获取仓库中的值
        var mgr = this.$store.getters.uid;

        this.axios.get("getStudentBymgr/"+mgr+"/"+ename).then(res => {
          this.query.total = res.data.length;
        })
      },
      //获取经理管理的员工（分页显示）
      getAllByPage:function(ename){
        debugger
        //通过getters属性获取仓库中的值
        var mgr = this.$store.getters.uid;

        this.axios.get("getAllByPage/"+this.query.page+"/"+this.query.pageSize+"/"+mgr+"/"+ename).then(res=>{
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
      //跳转到学生成绩页面
      getScore(val){
      console.log(val.sno);
        //页面跳转
        //路由传值
        this.$router.push({
          path: '/getDeptStudentScore',
          query: {
            sno: val.sno
          }
        })
      },
      //允许转正
      allow(val){
        if(val.officialdate == null || val.officialdate == ""){
          //页面跳转
          //路由传值
          this.$router.push({
            path: '/addOfficialDate',
            query: {
              empno: val.empno,
              ename:val.sname
            }
          })
        }else{
          this.$message("转正时间已经存在");
        }
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


    },
    //声明生命周期钩子
    created() {//创建实例后直接获取数据
      this.getAllByPage();
      this.getStudentBymgr();
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

<template>
  <div>
    <el-container>

      <el-header>
        <navMenu></navMenu>
      </el-header>

      <el-main>
        <el-row>
          <el-col :span="12" :offset="8">
            <h1 style="color: #42b983">{{this.msg}}<i class="header-icon el-icon-info"/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <el-link type="primary" @click="editDeptEvaluate" icon="el-icon-edit"style="font-size: 20px">编辑</el-link> &nbsp; &nbsp; &nbsp;
              <el-link type="primary" @click="returnMgrIndex" icon="el-icon-s-home"style="font-size: 20px">返回首页</el-link></h1>
          </el-col>
        </el-row>

        <el-table
          :data="table_emp"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="empno"
            label="工号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ename"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="dname"
            label="员工部门"
            align="center">
          </el-table-column>
          <el-table-column
            prop="job"
            label="员工职务"
            align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_evaluate"
          border
          stripe
          style="width: 100%">
            <el-table-column
              prop="ability"
              label="能力分数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="initiative"
              label="积极性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="communicate"
              label="沟通能力"
              align="center">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="品质"
              align="center">
            </el-table-column>
            <el-table-column
              prop="characterc"
              label="性格"
              align="center">
            </el-table-column>
            <el-table-column
              prop="mark"
              label="整体评分"
              align="center">
            </el-table-column>
        </el-table>

        <el-table
          :data="table_evaluate"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="commentc"
            label="评价（包括主要优点及缺陷）"
            header-align="center">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import navMenu from "./navMenu";
  export default{
    components:{navMenu},
    data(){
      return {
        table_emp: [{empno:'',ename:'',dname:'',job:''}],
        table_evaluate: [],
        //标题信息
        msg:'',
      }
    },
    methods: {
      //返回首页
      returnMgrIndex(){
        this.$router.push({path: "/mgrIndex"});
      },
      getQuery() {
        debugger
        //获取个人信息
        // 取到路由带过来的参数
        this.table_emp[0].empno = this.$route.query.empno;
        this.table_emp[0].ename = this.$route.query.ename;
        this.table_emp[0].dname = this.$route.query.dname;
        this.table_emp[0].job = this.$route.query.job;

        let routerQuery = this.$route.query.dataObj;
        debugger
        // 将数据放在当前组件的数据内（需要将json字符串转为json对象）
        this.table_evaluate = JSON.parse(routerQuery);
      },
      //标题显示
      getMsg(){
        if(this.table_evaluate[0].type == 0){
          this.msg = "员工转正评价信息"
        }else if(this.table_evaluate[0].type == 1){
          this.msg = "工作一年评价信息"
        }else if(this.table_evaluate[0].type == 2){
          this.msg = "工作二年评价信息"
        }else if(this.table_evaluate[0].type == 3){
          this.msg = "工作三年评价信息"
        }
      },
      //编辑操作
      //跳转页面并传值
      editDeptEvaluate(){
        let routerQuery = this.$route.query.dataObj;
        this.$router.push({
          path: '/editDeptEvaluate',
          query: {
            dataObj:routerQuery,
          }
        })
      }

    },
    //加载执行
    mounted() {
      this.getQuery();
      this.getMsg();
    },
    watch: {
      //监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getQuery'
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

</style>

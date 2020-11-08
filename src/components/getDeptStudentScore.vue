<template>
  <div>
    <el-container>

      <el-header>
        <navMenu></navMenu>
      </el-header>

      <el-main>
        <el-row>
          <el-col :span="13" :offset="7">
            <h1 style="color: #42b983">培训学校评价信息<i class="header-icon el-icon-info"></i>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   <el-link type="primary" @click="returnMgrIndex" icon="el-icon-s-home"style="font-size: 20px">返回首页</el-link></h1>
          </el-col>
        </el-row>

        <el-table
          :data="table_data"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="sno"
            label="学号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="classno"
            label="班期"
            align="center">
          </el-table-column>
        </el-table>
        <el-table
          :data="table_course_score"
          border
          stripe
          style="width: 100%">
          <!--动态遍历字段-->
          <template
            v-for="(head,index) in table_course_head">
            <!--拼接''：格式转换--课程编号head.cno是number类型的，从后台接收的成绩json里cno是字符串，-->
            <el-table-column
            :prop="head.cno + ''"
              :label="head.cname"
            align="center">
            </el-table-column>
          </template>
          <el-table-column
            prop="score_total"
            label="总成绩"
            width="200"
            align="center">
          </el-table-column>
        </el-table>
        <el-table
          :data="table_evaluate"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="sevaluate"
            label="评价"
            header-align="center">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios"
import navMenu from "./navMenu";

export default {
  name: "StudentScore",
  components: {navMenu},
  data() {
    return {
      table_data: [],
      table_course_head: [],
      table_course_score: [],
      table_evaluate: []
    }
  },
  methods: {
    getStudent() {
      var sno = this.$route.query.sno;
      axios.get("/getStudentById/" + sno).then(res => {
        this.table_data = res.data;
        debugger
      })
    },
    //获取课程信息
    getAllCourse() {
      axios.get("/getAllCourse/").then(res => {
        this.table_course_head = res.data;
      })
    },
    //获取该学生的课程成绩
    getAllScore() {
      var sno = this.$route.query.sno;
      axios.get("/getAllScore/" + sno).then(res => {
        this.table_course_score = res.data;
      })
    },
    //返回首页
    returnMgrIndex(){
      this.$router.push({path: "/mgrIndex"});
    },
  },
  mounted() {
    this.getStudent();
    this.getAllCourse();
    this.getAllScore();
  }
}
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
}

</style>

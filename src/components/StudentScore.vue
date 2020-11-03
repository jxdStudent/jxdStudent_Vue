<template>
  <div>
    <el-container>
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
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
            prop="score_tatal"
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
      tableData: [],
      table_course_head: [],
      table_course_score: [],
      table_evaluate: []
    }
  },
  methods: {
    getStudent() {
      var name = this.$store.getters.uname;
      axios.get("/getStudent/" + this.$store.getters.sno).then(res => {
        this.tableData = res.data;
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
      axios.get("/getAllScore/" + this.$store.getters.sno).then(res => {
        this.table_course_score = res.data;
      })
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
  line-height: 90px;
  margin-top: -50px;
}

.el-footer {
  background-color: #d9ecff;
}

.el-table .warning-row {
  background: oldlace;
}
</style>

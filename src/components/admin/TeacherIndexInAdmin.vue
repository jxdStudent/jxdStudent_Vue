<template>
  <div>
        <el-table
          :data="tableData"
          border
          stripe
          fit="fit"
          style="width: 100%"
          :default-sort="{prop: 'sno'}">
          <el-table-column
            prop="sno"
            label="学号"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="姓名"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="classno"
            label="班期"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="graduate"
            label="毕业院校"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="major"
            label="所学专业"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="officialdate"
            label="转正时间"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="综合评价"
            width="320"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="toStudentScore(scope.row.sno)">学校
              </el-button>
              <el-button
                size="mini"
                @click="">工作1
              </el-button>
              <el-button
                size="mini"
                @click="">工作2
              </el-button>
              <el-button
                size="mini"
                @click="">工作3
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherIndexInAdmin",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    //获取学生基本信息渲染到表格中
    getAllStudent() {
      var name = this.$store.getters.uname;
      axios.get("/getAllStudents").then(res => {
        this.tableData = res.data;
      })
    },
    toStudentScore(sno) {
      this.$store.dispatch("setSno", sno);
      this.$router.push({path: "/StudentScoreInAdmin"});
    }
  },
  mounted() {
    //html渲染完成后调用方法获取学生信息
    this.getAllStudent();
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
</style>

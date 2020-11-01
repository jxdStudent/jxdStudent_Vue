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
            label="成绩"
            align="center">
            <el-table-column
              prop="java"
              label="Java"
              width="200"
              align="center">
            </el-table-column>
            <el-table-column
              prop="html"
              label="HTML"
              width="200"
              align="center">
            </el-table-column>
            <el-table-column
              prop=""
              label="Oracle"
              width="200"
              align="center">
            </el-table-column>
            <el-table-column
              prop=""
              label="Web"
              width="200"
              align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop=""
            label="总分"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="">打分
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="sevaluate"
            label="评价"
            align="left">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="">评价
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import navMenu from "./navMenu";

export default {
  name: "StudentScore",
  components: {navMenu},
  data() {
    return {
      tableData: [
        {
          sno: 10001,
          sname: "张三",
          sevaluate: "1111111111111111",
          java: 50,
          html: 90

        }
      ]
    }
  },
  methods: {
    getStudentScore() {
      var name = this.$store.getters.uname;
      axios.get("http://localhost:8081/getStudentScore").then(res => {
        this.tableData = res.data;
      })
    }
  },
  mounted() {
    this.getStudentScore();
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

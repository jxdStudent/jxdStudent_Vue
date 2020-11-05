<template>
  <div>
    <el-container>
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">学生信息表</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">学生成绩表</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            :default-sort="{prop: 'sno'}">
            <el-table-column
              prop="sno"
              label="学号"
              sortable
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sname"
              label="姓名"
              sortable
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              sortable
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="nation"
              label="民族"
              sortable
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="生日"
              sortable
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="classno"
              label="班期"
              sortable
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="手机号"
              sortable
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="graduate"
              label="毕业院校"
              sortable
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="major"
              label="所学专业"
              sortable
              width="180"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="常住地址"
              sortable
              width="240"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import navMenu from "./navMenu";

export default {
  name: "TeacherIndex",
  components: {navMenu},
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
      this.$router.push({path: "/studentScore"});
    },
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
}

.el-footer {
  background-color: #d9ecff;
}
</style>

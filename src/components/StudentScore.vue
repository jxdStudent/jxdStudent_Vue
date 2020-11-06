<template>
  <div>
    <el-container>
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-main>
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
          <template
            v-for="(head,index) in table_course_head">
            <el-table-column
              :prop="head.cno + ''"
              :label="head.cname"
              align="center">
            </el-table-column>
          </template>
          <el-table-column
            prop="score_total"
            label="总成绩"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            width="180"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="dialogVisible = true">编辑
              </el-button>
              <el-dialog
                title="打分页面"
                :visible.sync="dialogVisible"
                width="40%"
                @close='closeDialog'>
                <iframe
                  src="http://localhost:8080/#/scoreScore"
                  frameborder="0"
                  width="100%"
                  height="300px">
                </iframe>
                <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="table_evaluate"
          border
          stripe
          class="tb-edit"
          highlight-current-row
          style="width: 100%"
          @row-click="handleCurrentChange">
          <el-table-column
            prop="sevaluate"
            label="评价"
            header-align="center">
            <template scope="scope">
              <el-input
                maxlength="255"
                show-word-limit
                v-model="scope.row.sevaluate"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)">
              </el-input>
              <span>{{ scope.row.sevaluate }}</span>
            </template>
          </el-table-column>
        </el-table>
        <br><br>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="info" @click="reload">刷新</el-button>
        <el-button @click="back">返回</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios"
import navMenu from "./navMenu";
import qs from "qs";

export default {
  name: "StudentScore",
  components: {navMenu},
  inject: ['reload'],
  data() {
    return {
      table_data: [],
      table_course_head: [],
      table_course_score: [],
      table_evaluate: [],
      dialogVisible: false,
      form: [
        {
          num1: 5,
          num2: 3,
          num3: 4
        }
      ]
    }
  },
  methods: {
    getStudent() {
      var name = this.$store.getters.uname;
      axios.get("/getStudentById/" + this.$store.getters.studentNo).then(res => {
        this.table_data = res.data;
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
      axios.get("/getAllScore/" + this.$store.getters.studentNo).then(res => {
        this.table_course_score = res.data;
      })
    },
    //获取学校评价
    getSchoolEvaluate() {
      axios.get("/getSchoolEvaluate/" + this.$store.getters.studentNo +
        "/" + this.$store.getters.uid).then(res => {
        this.table_evaluate = res.data;
      })
    },
    handleCurrentChange(row, event, column) {
      console.log('改变', row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
      console.log('修改', index, row);
    },
    handleChange(value) {
      console.log(value);
    },
    submit() {
      var table_evaluate_obj = {};
      table_evaluate_obj = this.table_evaluate[0];
      this.axios.post("/editSchoolEvaluate", qs.stringify(table_evaluate_obj)).then(res => {
        if (res.data == "success") {
          this.$router.go(0);
        //   this.$message({
        //     message: '修改成功',
        //   })
        // } else {
        //   this.$message({
        //     message: '服务器错误',
        //   })
        }
      })
    },
    reload() {
      this.$router.go(0);
    }
    ,
    back() {
      this.$router.go(-1);
    }
    ,
    closeDialog() {
      this.$router.go(0);
    }
  },
  mounted() {
    this.getStudent();
    this.getAllCourse();
    this.getAllScore();
    this.getSchoolEvaluate();
  }
}
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
}

.tb-edit .el-input {
  display: none
}

.tb-edit .current-row .el-input {
  display: block
}

.tb-edit .current-row .el-input + span {
  display: none;
}

</style>

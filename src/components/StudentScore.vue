<template>
  <div>
    <el-container>
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            :unique-opened="true"
            @select="handleSelect"
            class="el-menu-vertical-demo">
            <el-menu-item index="teacherIndex">
              <i class="el-icon-user"></i>
              <span slot="title">学生信息表</span>
            </el-menu-item>
            <el-menu-item index="teacherIndex2">
              <i class="el-icon-s-unfold"></i>
              <span slot="title">学生成绩表</span>
            </el-menu-item>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>工作追踪表</span>
              </template>
              <el-menu-item
                index="teacherIndex3_1">
                <i class="el-icon-s-custom"></i>工作1年
              </el-menu-item>
              <el-menu-item
                index="teacherIndex3_2">
                <i class="el-icon-s-custom"></i>工作2年
              </el-menu-item>
              <el-menu-item
                index="teacherIndex3_3">
                <i class="el-icon-s-custom"></i>工作3年
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="teacherAllStudent">
              <i class="el-icon-s-grid"></i>
              <span slot="title">学生总览表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
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
                :prop="head.cno+''"
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
                  icon="el-icon-edit"
                  @click="dialogVisible = true">编辑
                </el-button>
                <el-dialog
                  title="打分页面"
                  :visible.sync="dialogVisible"
                  width="40%">
                  <el-row>
                    <el-col :span="6" :offset="4">
                      <el-form
                        :model="dynamicForm"
                        :label-position="labelPosition"
                        label-width="80px"
                        ref="dynamicForm">
                        <el-form-item
                          v-for="dynamic in dynamicForm.dynamics"
                          :key="dynamic.cno+''"
                          :label="dynamic.cname"
                          :prop="dynamic.cno+''"
                          width="100px">
                          <!--不知道为什么,反正这儿的cno和grade都要从int转成string才能用-->
                          <el-input-number
                            v-model="dynamic.grade"
                            controls-position="right"
                            :min="0" :max="5">
                          </el-input-number>
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitCourse">确 定</el-button>
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
              <template slot-scope="scope">
                <el-input
                  @keyup.enter.native="submit"
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
          <el-button type="primary" @click="submit">提交
          </el-button>
          &nbsp
          <el-button @click="back">返回</el-button>
        </el-main>
      </el-container>
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
  data() {
    return {
      table_data: [
        {
          sno: this.$store.getters.studentNo,
          sname: this.$store.getters.sname,
          classno: this.$store.getters.classNo
        }
      ],
      table_course_head: [],
      table_course_score: [],
      table_evaluate: [],
      dialogVisible: false,
      labelPosition: 'right',
      dynamicForm: {
        dynamics: [],
      }
    }
  },
  created() {
    this.getTeacherForLogin();
  },
  mounted() {
    this.getAllCourse();
    this.getAllScore();
    this.getSchoolEvaluate();
    this.getStudentScore();
  },
  methods: {
    getTeacherForLogin:function() {
      axios.get("getUserForLogin/" + this.$store.getters.uid).then(res => {
        if (res.data.role != 1) {
          this.$router.go(-1)
        }
      })
    },
    //获取课程信息
    getAllCourse() {
      axios.get("getAllCourse/" + this.$store.getters.classNo).then(res => {
        this.table_course_head = res.data;
      })
    },
    //获取该学生的课程成绩
    getAllScore() {
      axios.get("getAllScore/" + this.$store.getters.studentNo).then(res => {
        this.table_course_score = res.data;
      })
    },
    //获取学校评价
    getSchoolEvaluate() {
      axios.get("getSchoolEvaluate/" + this.$store.getters.studentNo +
        "/" + this.$store.getters.uid).then(res => {
        this.table_evaluate = res.data;
      })
    },
    getStudentScore() {
      axios.get("getStudentScore/" + this.$store.getters.studentNo).then(res => {
        this.dynamicForm.dynamics = res.data;
      })
    },
    handleChange(value) {
      console.log(value);
    },
    handleCurrentChange(row, event, column) {
      console.log('改变', row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
      console.log('修改', index, row);
    },
    handleSelect(path){
      this.$router.push(path)
    },
    submit() {
      var table_evaluate_obj = {};
      table_evaluate_obj = this.table_evaluate[0];
      this.axios.post("editSchoolEvaluate", qs.stringify(table_evaluate_obj)).then(res => {
        if (res.data == "success") {
          this.$router.go(0);
        }
      })
    },
    submitCourse() {
      var dynamic_with_sno = this.dynamicForm.dynamics;
      var dynamic_with_sno_str = '';
      for (var i = 0; i < dynamic_with_sno.length; i++) {
        dynamic_with_sno[i].sno = this.$store.getters.studentNo;
        dynamic_with_sno_str += dynamic_with_sno[i].sno;
        dynamic_with_sno_str += "_";
        dynamic_with_sno_str += dynamic_with_sno[i].cno;
        dynamic_with_sno_str += "_";
        dynamic_with_sno_str += dynamic_with_sno[i].grade;
        dynamic_with_sno_str += "_";
      }
      dynamic_with_sno_str = dynamic_with_sno_str.substr(0, dynamic_with_sno_str.length - 1);
      this.axios.get("updateStudentScore/" + dynamic_with_sno_str).then(res => {
        if (res.data == "success") {
          this.dialogVisible = false;
          this.$router.go(0);
        } else {
          this.$message("服务错误");
        }
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    back() {
      this.$router.go(-1);
    },
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

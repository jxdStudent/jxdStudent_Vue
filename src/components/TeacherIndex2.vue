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
            default-active="teacherIndex2"
            :unique-opened="true"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-vertical-demo">
            <el-menu-item index="teacherIndex">
              <i class="el-icon-user"></i>
              <span slot="title">学生信息表</span>
            </el-menu-item>
            <el-menu-item index="teacherIndex2">
              <i class="el-icon-document"></i>
              <span slot="title">学生成绩表</span>
            </el-menu-item>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-s-unfold"></i>
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
          </el-menu>
        </el-aside>
        <el-main>
          <div>
            <el-form
              :inline="true"
              ref="SelectForm"
              :model="SelectForm"
              class="demo-form-inline">
              <el-col :span="8">
                <el-form-item
                  label="学生ID"
                  prop="sno">
                  <el-input
                    v-model="SelectForm.sno"
                    @keyup.enter.native="onSelectID(SelectForm.sno,'SelectForm')"
                    placeholder="请输入学生ID">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="onSelectID(SelectForm.sno,'SelectForm')">查询
                  </el-button>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="学期"
                  prop="classno">
                  <el-select
                    v-model="SelectForm.classno"
                    @change="onSelectClass(SelectForm.classno,'SelectForm')"
                    filterable placeholder="请选择学期">
                    <el-option
                      v-for="item in options"
                      :key="item.classno"
                      :label="item.classname"
                      :value="item.classno">
                      <span style="float: left">
                        {{ item.classno }}
                      </span>
                      <span
                        style="float: right;color: #8492a6; font-size: 13px">
                        {{item.classname}}
                      </span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              stripe
              style="width: 100%"
              :default-sort="{prop: 'sno'}">

              <template
                v-for="(item,index) in tableHead">
                <el-table-column
                  align="center"
                  sortable
                  :prop="item.column_name"
                  :label="item.column_comment"
                  :key="index"
                  v-if="item.column_name != 'id'">
                </el-table-column>
              </template>
              <el-table-column
                fixed="right"
                label="操作"
                width="180"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="toStudentScore(scope.row.sno, scope.row.classno, scope.row.sname)">评价
                  </el-button>
                  <el-button
                    size="mini"
                    @click="dialogOpen(scope.row.sno, scope.row.sname)">毕业
                  </el-button>
                  <el-dialog
                    :modal-append-to-body='false'
                    title="毕业页面"
                    :visible.sync="dialogVisible"
                    width="40%">
                    <el-row>
                      <el-col :span="18" :offset="4">
                        <el-form :model="form">
                          <el-form-item label="是否毕业">
                            <el-select v-model="form.graduated">
                              <el-option label="已毕业" value="1"></el-option>
                              <el-option label="未毕业" value="0"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="setGraduated" :disabled="form.graduate">确 定</el-button>
                </span>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="this.query.current"
              :page-sizes="[2, 5, 10, 15]"
              :page-size="this.query.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="this.query.total">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navMenu from "./navMenu";
import axios from "axios";

export default {
  name: "TeacherIndex2",
  components: {navMenu},
  data() {
    return {
      tableHead: [],
      tableData: [],
      dialogVisible: false,
      dialogSno: '',
      dialogSname: '',
      form: {
        graduated: '',
        graduate: 0,
      },
      options: [],
      query: {
        total: 1,
        current: 1,
        size: 5,
      },
      SelectForm: {
        sno: '',
        classno: '',
        classname: ''
      },
    }
  },
  created() {
    this.getTeacherForLogin();
  },
  mounted() {
    this.getTableSize("undefined", "undefined");
    this.getTableHead();
    this.getAllByPage("undefined", "undefined");
    this.getClass();
  },
  methods: {
    getTeacherForLogin:function() {
      axios.get("getUserForLogin/" + this.$store.getters.uid).then(res => {
        if (res.data.role != 1) {
          this.$router.go(-1)
        }
      })
    },
    getTableSize: function (sno, classno) {
      axios.get("getStudentTableSize/" + this.$store.getters.uid +
        "/" + sno +
        "/" + classno).then(res=>{
        this.query.total = res.data;
      })
    },
    getTableHead() {
      var table_head = [
        {
          column_name: "sno", column_comment: "学号"
        },
        {
          column_name: "sname", column_comment: "姓名"
        },
        {
          column_name: "classno", column_comment: "班期"
        }
      ];
      axios.get("getAllCourse/" + this.SelectForm.classno).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          var table_head_obj = {};
          table_head_obj.column_name = res.data[i].cno + "";
          table_head_obj.column_comment = res.data[i].cname;
          table_head.push(table_head_obj);
        }
      })
      this.tableHead = table_head;
    },
    getAllByPage: function (sno, classno) {
      axios.get("getAllStudentScoreWithInfoByPage/" + this.$store.getters.uid +
        "/" + this.query.current +
        "/" + this.query.size +
        "/" + sno +
        "/" + classno).then(res => {
        this.tableData = res.data;
      })
    },
    getClass() {
      axios.get("getClassByTeacher/" + this.$store.getters.uid).then(res => {
        this.options = res.data;
      })
    },
    onSelectID(sno, SelectForm) {
      console.log('submit!');
      this.getAllByPage(sno, "undefined");
    }
    ,
    onSelectClass(classno, SelectForm) {
      console.log('select!');
      this.getAllByPage("undefined", classno);
    },
    handleSizeChange(val) {
      this.page = 1;
      this.query.size = val;
      this.getAllByPage()
    },
    handleCurrentChange(val) {
      this.query.current = val;
      this.getAllByPage()
    },

    handleSelect(path) {
      this.$router.push(path)
    },
    toStudentScore(sno, classno, sname) {
      this.$store.dispatch("setSno", sno);
      this.$store.dispatch("setClassNo", classno);
      this.$store.dispatch("setSname", sname);
      this.$router.push({path: "/studentScore"});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    dialogOpen(sno, sname) {
      this.isGraduated(sno);
      this.dialogVisible = true;
      this.dialogSno = sno;
      this.dialogSname = sname;
    },
    isGraduated(sno) {
      axios.get("isGraduated/" + sno).then(res => {
        if(res.data == 1) {
          this.form.graduated = "已毕业";
          this.form.graduate = 1;
        } else {
          this.form.graduated = "未毕业";
          this.form.graduate = 0;
        }
      })
    },
    setGraduated() {
      if (this.form.graduated == "1") {
        axios.get("setGraduated/" + this.dialogSno + "/" + this.dialogSname).then(res => {
          if (res.data == "success") {
            this.$message({
              message: '该同学已成功毕业!',
              type: 'success'
            });
            this.dialogVisible = false;
          } else {
            this.$message.error('服务器错误,请联系管理员解决!');
          }
        })
      }
    }
  },
}
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
}

</style>

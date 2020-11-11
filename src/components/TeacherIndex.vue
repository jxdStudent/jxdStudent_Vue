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
            default-active="teacherIndex"
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
              <el-col :span="16">
                <el-form-item
                  label="姓名"
                  prop="sname">
                  <el-input
                    style="width: 160px"
                    v-model="SelectForm.sname"
                    placeholder="请输入姓名">
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="毕业学校"
                  prop="graduate">
                  <el-input
                    style="width: 160px"
                    v-model="SelectForm.graduate"
                    placeholder="请输入学校名">
                  </el-input>
                </el-form-item>
                  <el-form-item
                    label="班期"
                    prop="classno">
                    <el-select
                      style="width: 160px"
                      v-model="SelectForm.classno"
                      filterable placeholder="请选择班期">
                      <el-option
                      :key="SelectForm.classno">全部
                      </el-option>
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
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="onSelect(SelectForm.sname, SelectForm.graduate, SelectForm.classno)">查询
                  </el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              stripe
              height="500px"
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
                label="操作"
                width="120"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="toStudentScore(scope.row.sno, scope.row.classno, scope.row.sname)">评价
                  </el-button>
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
import axios from "axios";
import navMenu from "./navMenu";

export default {
  name: "TeacherIndex",
  components: {navMenu},
  data() {
    return {
      tableData: [],
      options: [],
      query: {
        total: 1,
        current: 1,
        size: 5,
      },
      SelectForm: {
        sname: '',
        graduate: '',
        classno: '',
        classname: ''
      },
    }
  },
  created() {
    this.getTeacherForLogin();
  },
  mounted() {
    this.getAllByPage("undefined", "undefined", "undefined");
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
    getAllByPage: function (sname, graduate, classno) {
      axios.get("getAllStudentByPage/" + this.$store.getters.uid +
        "/" + this.query.current +
        "/" + this.query.size +
        "/" + sname +
        "/" + graduate +
        "/" + classno).then(res => {
        this.tableData = res.data.records;
        this.query.current = res.data.current;
        this.query.size = res.data.size;
        this.query.total = res.data.total;
      })
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
    getClass() {
      axios.get("getClassByTeacher/" + this.$store.getters.uid).then(res => {
        this.options = res.data;
      })
    },
    onSelect(sname, graduate, classno) {
      console.log('submit!');
      if (sname == "") {
        sname = "undefined";
      }
      if (graduate == "") {
        graduate = "undefined";
      }
      if (classno == "") {
        classno = "undefined";
      }
      this.getAllByPage(sname, graduate, classno);
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
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

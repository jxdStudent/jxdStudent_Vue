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
            default-active="teacherIndex3_2"
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
            <el-submenu index="submenu">
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
              <el-col :span="12">
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
                  label="班期"
                  prop="classno">
                  <el-select
                    style="width: 160px"
                    v-model="SelectForm.classno"
                    filterable placeholder="请选择班期">
                    <el-option>全部
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
                    @click="onSelect(SelectForm.sname, SelectForm.classno)">查询
                  </el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              height="500px"
              stripe
              style="width: 100%"
              :default-sort="{prop: 'sno'}">
              <el-table-column
                prop="sno"
                label="学号"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="empno"
                label="工号"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="ename"
                label="姓名"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="dname"
                label="部门"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="ability"
                label="能力"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="initiative"
                label="积极性"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="communicate"
                label="沟通交流"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="quality"
                label="人品"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="characterc"
                label="性格"
                sortable
                width="120"
                align="center">
              </el-table-column>
              <el-table-column
                prop="mark"
                label="整体分数"
                sortable
                width="120"
                align="center">
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
  name: "TeacherIndex3_2",
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
    getTableSize: function (sname, classno) {
      var year = 2;
      axios.get("getEmpTableSize/" + this.$store.getters.uid +
        "/" + sname +
        "/" + classno +
        "/" + year).then(res=>{
        this.query.total = res.data;
      })
    },
    getAllByPage: function (sname, classno) {
      var year = 2;//第二年
      axios.get("getAllDeptEvaluateWithInfoByPage/" + this.$store.getters.uid +
        "/" + this.query.current +
        "/" + this.query.size +
        "/" + sname +
        "/" + classno +
        "/" + year).then(res => {
        this.tableData = res.data;
      })
    },
    getClass() {
      axios.get("getClassByTeacher/" + this.$store.getters.uid).then(res => {
        this.options = res.data;
      })
    },
    onSelect(sname, classno) {
      console.log('submit!');
      if (sname == "") {
        sname = "undefined";
      }
      if (classno == "") {
        classno = "undefined";
      }
      this.getAllByPage(sname,classno);
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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

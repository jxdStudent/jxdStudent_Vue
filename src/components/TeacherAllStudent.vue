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
            default-active="teacherAllStudent"
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
            <el-menu-item index="teacherAllStudent">
              <i class="el-icon-s-grid"></i>
              <span slot="title">学生总览表</span>
            </el-menu-item>
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
                    @click="onSelect(SelectForm.sname, SelectForm.isgraduated, SelectForm.classno)">查询
                  </el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
          <div>
            <el-table
              :data="tableData"
              height="500px"
              border
              stripe
              style="width: 100%"
              :default-sort="{prop: 'sno'}">

              <el-table-column
                label="序号"
                type='index' :index='(index)=>{return (index+1) + (this.query.current-1)*this.query.size}'
                align="center"
                width="70px"
              ></el-table-column>
              <el-table-column
                prop="sno"
                label="学号"
                align="center"
                sortable>
              </el-table-column>
              <el-table-column
                prop="classno"
                label="学期"
                align="center"
                sortable>
              </el-table-column>
              <el-table-column
                prop="sname"
                align="center"
                label="姓名">
                <template slot-scope="scope">
            <span
              class="buttonText"
              style="cursor:pointer;color: #409EFF;text-decoration: underline"
              @click="handleEdit(scope.row)">{{ scope.row.sname }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="sex"
                align="center"
                label="性别">
              </el-table-column>
              <el-table-column
                prop="address"
                header-align="center"
                align="left"
                show-overflow-tooltip
                label="籍贯">
              </el-table-column>

              <el-table-column
                header-align="center"
                align="center"
                show-overflow-tooltip
                label="培训期间测试成绩">
                <template v-for="(item,index) in tableHead">
                  <el-table-column
                    align="center"
                    sortable
                    :prop="item.column_name"
                    :label="item.column_comment"
                    :key="index"
                    v-if="item.column_name != 'id'">
                  </el-table-column>
                </template>

              </el-table-column>

              <el-table-column
                prop="school"
                header-align="center"
                align="left"
                show-overflow-tooltip
                label="学校评价">
              </el-table-column>

              <el-table-column
                prop="type0"
                header-align="center"
                align="left"
                show-overflow-tooltip
                label="转正评价">
              </el-table-column>

              <el-table-column
                prop="type1"
                header-align="center"
                align="left"
                show-overflow-tooltip
                label="一年评价">
              </el-table-column>

              <el-table-column
                prop="type2"
                header-align="center"
                align="left"
                show-overflow-tooltip
                label="两年评价">
              </el-table-column>

              <el-table-column
                prop="type3"
                header-align="center"
                align="left"
                show-overflow-tooltip
                label="三年评价">
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
    name: "teacherAllStudent",
    components: {navMenu},
    data() {
      return {
        tableHead: [],
        tableData: [],
        options: [],
        isGraduatedOption: [
          {
            value: "已毕业",
            label: "已毕业"
          },
          {
            value: "未毕业",
            label: "未毕业"
          }
        ],
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
      this.getTableSize("undefined","undefined", "undefined");
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
      getTableSize: function (sname, isgraduated, classno) {
        axios.get("getStudentTableSize/" + this.$store.getters.uid +
          "/" + sname +
          "/" + isgraduated +
          "/" + classno).then(res=>{
          this.query.total = res.data;
        })
      },
      getTableHead() {
        var table_head = [];
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
      getAllByPage: function (sname, classno) {
        axios.get("getAllStudentWithAllInfoByPage/" + this.$store.getters.uid +
          "/" + this.query.current +
          "/" + this.query.size +
          "/" + sname +
          "/" + classno).then(res => {
          this.tableData = res.data;
        })
      },
      getClass() {
        axios.get("getClassByTeacher/" + this.$store.getters.uid).then(res => {
          this.options = res.data;
        })
      },
      onSelect(sname, isgraduated, classno) {
        console.log('submit!');
        if (sname == "") {
          sname = "undefined";
        }
        if (classno == "") {
          classno = "undefined";
        }
        this.getTableHead();
        this.getTableSize(sname,"undefined",  classno);
        this.getAllByPage(sname, classno);
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
      },
      handleEdit(row) {
        this.$message.error("此处跳转至" + row.sname + "学生信息页面")
      },
    },
  }
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
}

</style>

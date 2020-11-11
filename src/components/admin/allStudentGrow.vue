<template>
  <div>
    <div style="margin-top: -20px;padding-bottom: 20px;margin-left: -20px">
      <el-row>
        <el-col :span="4">
          <span style="font-family: 'Microsoft YaHei';font-weight: bold;font-size: 20px">学员成长跟踪表</span>
        </el-col>
      </el-row>
    </div>
    <div class="select">
      <el-form :inline="true" ref="SelectForm" :model="SelectForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="2">
            <el-form-item label="学生姓名" prop="sno">
              <el-input v-model="SelectForm.sno" placeholder="请输入学生姓名"
                        @keyup.enter.native="onSelectID(SelectForm.sno,'SelectForm')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(SelectForm.sno,'SelectForm')">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学期" prop="classno">
              <el-select v-model="SelectForm.classno" @change="onSelectClass(SelectForm.classno,'SelectForm')"
                         filterable placeholder="请选择学期">
                <el-option v-for="item in options" :key="item.classno" :label="item.classname" :value="item.classno">
                  <span style="float: left">{{ item.classno }}</span>
                  <span style="float: right;color: #8492a6; font-size: 13px">{{item.classname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item>
              <el-button type="primary" @click="onSelectClass(SelectForm.classno,'SelectForm')">查询</el-button>
            </el-form-item>-->
          </el-col>
          <!--<el-col :span="3" offset="1">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
              </el-form-item>
            </el-form>
          </el-col>-->
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">添加学生</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData"
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


        <!--<el-table-column
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
        </el-table-column>-->
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
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "allStudentGrow",
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
      this.getUserForLogin();
    },
    mounted() {
      this.getTableHead();
      this.getAllByPage("undefined", "undefined");
      this.getTableSize("undefined", "undefined");
      this.getClass();
    },
    methods: {
      getTeacherForLogin: function () {
        axios.get("getUserForLogin/" + this.$store.getters.uid).then(res => {
          if (res.data.role != 1) {
            this.$router.go(-1)
          }
        })
      },
      getTableSize: function (sno, classno) {
        if (sno == "") {
          sno = "undefined";
        }
        axios.get("getStudentTableSizeInAdmin/" + sno + "/" + classno).then(res => {
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
      handleEdit(row) {
        this.$message.error("此处跳转至" + row.sname + "学生信息页面")
      },
      getAllByPage: function (sno, classno) {
        if (sno == "") {
          sno = "undefined";
        }
        axios.get("getAllStudentScoreWithInfoByPageInAdmin/" + this.query.current + "/" + this.query.size +
          "/" + sno +
          "/" + classno).then(res => {
          this.tableData = res.data;
        })
      },
      getClass() {
        axios.get("http://localhost:8081/getAllClass").then(res => {
          this.options = res.data;
        })
      },
      onSelectID(sno, SelectForm) {
        console.log('submit!');
        this.SelectForm.classno = ""
        this.getTableHead();  /*你好*/
        this.getAllByPage(sno, "undefined");
        this.getTableSize(sno, "undefined");
      }
      ,
      onSelectClass(classno, SelectForm) {
        console.log('select!');
        this.getTableHead();
        this.getAllByPage("undefined", classno);
        this.getTableSize("undefined", classno);
      },
      handleSizeChange(val) {
        this.page = 1;
        this.query.size = val;
        this.getAllByPage("undefined", "undefined")
      },
      handleCurrentChange(val) {
        this.query.current = val;
        this.getAllByPage("undefined", "undefined")
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
          if (res.data == 1) {
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
      },

      getUserForLogin: function () {
        axios.get("getUserForLogin/" + this.$store.getters.uid).then(res => {
          if (res.data.role != 4) {
            this.$router.go(-1)
          }
        })
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

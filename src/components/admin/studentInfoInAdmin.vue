<template>
  <div class="Terminal" v-loading="loading">
    <!-- 查询操作 -->
    <div class="select">
      <el-form :inline="true" ref="SelectForm" :model="SelectForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="学生ID" prop="sno">
              <el-input v-model="SelectForm.sno" placeholder="请输入学生ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(SelectForm.sno,'SelectForm')">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学期" prop="classno">
              <el-select v-model="SelectForm.classno" filterable placeholder="请选择学期">
                <el-option v-for="item in options" :key="item.classno" :value="item.classno">
                  <span style="float: left">{{ item.classno }}</span>
                  <span style="float: right;color: #8492a6; font-size: 13px">{{item.classname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectClass(SelectForm.classno,'SelectForm')">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3" offset="1">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">添加学生</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="store-table">
      <el-table
        :data="tableData"
        border
        lazy
        load="load"
        stripe="stripe"
        style="width: 100%;overflow:auto"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="sno"
          label="学号"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="nation"
          label="汉族"
          width="100">
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="出生日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="marriage"
          label="已婚"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="identity"
          label="身份证号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="graduate"
          label="毕业院校"
          width="120">
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业"
          width="120">
        </el-table-column>
        <el-table-column
          prop="classno"
          label="学期"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">允许编辑</el-button>
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

    <!--添加学生-->
    <el-dialog title="添加学生" :visible.sync="dialogFormVisible">
      <el-form :model="addStudentForm" :rules="rules2" @close='closeDialog'>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="stuname">
              <el-input v-model="addStudentForm.stuname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="所在学期" :label-width="formLabelWidth" prop="classno">
              <!--<el-input v-model="addStudentForm.classno" autocomplete="off"></el-input>-->
              <el-select v-model="addStudentForm.classno" filterable placeholder="请选择学期">
                <el-option v-for="item in options" :key="item.classno" :value="item.classno">
                  <span style="float: left">{{ item.classno }}</span>
                  <span style="float: right;color: #8492a6; font-size: 13px">{{item.classname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="学生性别" :label-width="formLabelWidth" prop="sex">
              <el-radio-group v-model="addStudentForm.sex">
                <el-radio label="男" value="1"></el-radio>
                <el-radio label="女" value="0"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addStudent">确 定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "studentInfoInAdmin",
    inject: ["reload"],
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入学生姓名'));
        } else {
          callback();
        }
      };

      var validateClassNo = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入学期编号'));
        } else if (isNaN(value)) {
          alert(isNaN(value))
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      };
      var validateSex = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入性别'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],   //从后台获取数据
        options: [],
        query: {
          total: 1,
          current: 1,
          size: 2,
        },
        SelectForm: {
          sno: '',
          classno: '',
          classname: ''
        },
        addStudentForm: {
          stuname: '',
          sex: '',
          classno: '',
        },
        rules2: {
          stuname: [
            {validator: validateName, trigger: 'blur'}
          ],
          classno: [
            {validator: validateClassNo, trigger: 'blur'}
          ],
          sex: [
            {validator: validateSex, trigger: 'blur'}
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      getAllByPage: function (sno, classno) {
        axios.get("http://localhost:8081/getAllStudentInAdminByPage/" + this.query.current + "/" + this.query.size +
          "/" + sno + "/" + classno).then(res => {
          for (let i = 0; i < res.data.records.length; i++) {
            var marriage = res.data.records[i].marriage
            if (marriage == 0) {
              res.data.records[i].marriage = "未婚";
            } else if (marriage == 1) {
              res.data.records[i].marriage = "已婚";
            }
          }
          this.tableData = res.data.records;
          this.query.current = res.data.current;
          this.query.size = res.data.size;
          this.query.total = res.data.total;
        })
      },
      addStudent: function () {
        axios.post("addStudentInUser/" + this.addStudentForm.stuname +
          "/" + this.addStudentForm.sex + "/" + this.addStudentForm.classno).then(res => {
          if (res.data == "success") {//添加成功
            this.reload();/*动态刷新表格*/
            this.dialogFormVisible = false;/*关闭弹出层*/
            this.$message({
              type: 'success',
              message: '添加成功！'
            });
            //location.reload();
          } else {
            this.$message.error('添加成功！');
          }
        })
      },
      closeDialog() {
        this.addStudentForm = '';//清空数据
      },
      getClass() {
        axios.get("http://localhost:8081/getAllClass").then(res => {
          this.options = res.data;
        })
      },
      handleSizeChange(val) {
        this.page = 1;
        this.query.size = val;
        this.getAllByPage()
      }
      ,
      handleCurrentChange(val) {
        this.query.current = val;
        this.getAllByPage()
      }
      ,
      onSelectID(sno, SelectForm) {
        console.log('submit!');
        this.getAllByPage(sno, "undefined");
        this.$refs[SelectForm].resetFields()
      }
      ,
      onSelectClass(classno, SelectForm) {
        console.log('select!');
        this.getAllByPage("undefined", classno);
        this.$refs[SelectForm].resetFields()
      },
      onSelectAll() {
        this.getAllByPage("undefined", "undefined");
      },
    }
    ,
    //生命周期钩子
    mounted() {
      //this.getAllDept()
      this.getAllByPage("undefined", "undefined");
      this.getClass();
      //this.handleUserList()
    }
  }
</script>

<style scoped>

</style>

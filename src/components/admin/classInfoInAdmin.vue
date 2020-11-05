<template>
  <div class="Terminal" v-loading="loading">
    <div class="select">
      <el-form :inline="true" :model="selectClassForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="4">
            <el-form-item label="学期类型">
              <el-input v-model="selectClassForm.classname" placeholder="请输入学期类型"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(selectClassForm.classname)">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">添加学期</el-button>
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
        fit="fit"
        stripe="stripe"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="classno"
          label="学期编号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="classname"
          label="学期类型">
        </el-table-column>
        <el-table-column
          prop="teacher.tname"
          label="授课教师">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
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

    <!--添加学期-->
    <el-dialog title="添加学期" :visible.sync="dialogFormVisible">
      <el-form :model="addClassForm" :rules="rules2" @close='closeDialog'>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="学期名称" :label-width="formLabelWidth" prop="classname">
              <el-input v-model="addClassForm.classname" autocomplete="off" class="addClassFormInput"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="授课老师" :label-width="formLabelWidth">
              <el-select v-model="addClassForm.tno" placeholder="请选择授课老师" class="addClassFormInput">
                <el-option v-for="item in options" :key="item.tno" :label="item.tname" :value="item.tno">
                  <span style="float: left">{{ item.tno }}</span>
                  <span style="float: right">{{item.tname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="教授课程" :label-width="formLabelWidth">
              <el-select v-model="addClassForm.course" multiple placeholder="请选择" class="addClassFormInput">
                <el-option
                  v-for="item in optionsForCourse"
                  :key="item.cno"
                  :label="item.cname"
                  :value="item.cno">
                  <span style="float: left">{{ item.cno }}</span>
                  <span style="float: right">{{item.cname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addClass">确 定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import axios from "axios";
  import Qs from "qs";
  export default {
    name: "classInfoInAdmin",
    inject:['reload'],
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入学期类型'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],   //从后台获取数据
        options:[],
        query: {
          total: 1,
          current: 1,
          size: 2,
        },
        selectClassForm: {
          classname: "",
        },
        addClassForm:{
          classname:"",
          cno:"",
          tno:"",
          course:""
        },
        rules2: {
          classname: [
            {validator: validateName, trigger: 'blur'}
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        optionsForCourse: [],
        course: [],
      }
    },
    methods: {
      getAllClassSize: function (classname) {
        axios.get("http://localhost:8081/getAllClassByPage/" + classname).then(res => {
          this.query.total = res.data.length;
        })
      },
      getAllByPage: function (classname) {
        axios.get("http://localhost:8081/getClassWithDeptByPage/" + this.query.current + "/" +
          this.query.size + "/" + classname).then(res => {
          this.tableData = res.data;
        })
      },
      addClass:function () {
        axios.post("/addClass/" + this.addClassForm.classname + "/" + this.addClassForm.tno +
                  "/" + this.addClassForm.course).then(res => {
          if (res.data == "success") {//添加成功
            this.reload();/*动态刷新表格*/
            this.dialogFormVisible = false;/*关闭弹出层*/
            this.$message({
              type: 'success',
              message: '添加成功！'
            });
          } else {
            this.$message.error('添加成功！');
          }
        })
      },
      getTeacherForOptions : function() {
        axios.get("getAllTeacher").then(res => {
          this.options = res.data;
        })
      },
      getCourseForOptions:function() {
        axios.get("getAllCourse").then(res => {
          this.optionsForCourse = res.data;
        })
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
      onSelectID(classname) {
        console.log('select!');
        this.getAllClassSize(classname)
        this.getAllByPage(classname)
      },
    },
    mounted() {
      //this.getAllCourse();
      //this.handleUserList()
      this.getAllClassSize();
      this.getAllByPage();
      this.getTeacherForOptions();
      this.getCourseForOptions();
    }
  }
</script>

<style scoped>
  .addClassFormInput{
    width: 180px;
  }
</style>

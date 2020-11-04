<template>
  <div class="Terminal" v-loading="loading">
    <div class="select">
      <el-form :inline="true" :model="selectTeacherForm" ref="selectTeacherForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="4">
            <el-form-item label="教师ID" prop="tno">
              <el-input v-model="selectTeacherForm.tno" placeholder="请输入教师ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(selectTeacherForm.tno,'selectTeacherForm')">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" offset="1">
            <el-form-item>
              <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">添加老师</el-button>
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
        lazy
        load="load"
        stripe="stripe"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="tno"
          label="教师编号"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="tname"
          label="教师姓名"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
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

    <!--添加老师-->
    <el-dialog title="添加老师" :visible.sync="dialogFormVisible">
      <el-form :model="addTeacherForm" :rules="rules2" @close='closeDialog'>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="老师姓名" :label-width="formLabelWidth" prop="tname">
              <el-input v-model="addTeacherForm.tname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addTeacher">确 定</el-button>
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
    name: "teacherInfoInAdmin",
    inject: ['reload'],
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入老师姓名'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],   //从后台获取数据
        query: {
          total: 1,
          current: 1,
          size: 2,
        },
        selectTeacherForm: {
          tno: '',
        },
        addTeacherForm: {
          tname: ''
        },
        rules2: {
          tname: [
            {validator: validateName, trigger: 'blur'}
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      getAllByPage: function (tno) {
        axios.get("http://localhost:8081/getAllTeacherInAdminByPage/" + this.query.current + "/" + this.query.size +
          "/" + tno).then(res => {
          this.tableData = res.data.records;
          this.query.current = res.data.current;
          this.query.size = res.data.size;
          this.query.total = res.data.total;
        })
      },
      addTeacher: function () {
        let data = this.addTeacherForm;
        axios.post("/addTeacherInUser", Qs.stringify(data)).then(res => {
          if (res.data == "success") {//添加成功
            this.reload();/*动态刷新表格*/
            this.dialogFormVisible = false;/*关闭弹出层*/
            this.$message({
              type: 'success',
              message: '添加成功！'
            });
            //location.reload();
          } else {
            this.$message.error('添加失败！');
          }
        })
      },
      closeDialog() {
        this.addTeacherForm = '';//清空数据
      },
      onSelectID(tno, selectTeacherForm) {
        console.log("onSelectID!!")
        this.getAllByPage(tno);
        this.$refs[selectTeacherForm].resetFields();
      },
      onSelectAll() {
        this.getAllByPage('undefined');
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
    },
    mounted() {
      //this.getAllTeacher();
      //this.handleUserList()
      this.getAllByPage();
    }
  }
</script>

<style scoped>

</style>

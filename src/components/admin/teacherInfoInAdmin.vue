<template>
  <div class="Terminal" v-loading="loading">
    <div style="margin-top: -20px;padding-bottom: 20px">
      <el-row>
        <el-col :span="2">
          <span style="font-family: 'Microsoft YaHei';font-weight: bold;font-size: 20px">老师管理</span>
        </el-col>
      </el-row>
    </div>
    <div class="select">
      <el-form :inline="true" :model="selectTeacherForm" ref="selectTeacherForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="1">
            <el-form-item label="教师ID" prop="tno">
              <el-input v-model="selectTeacherForm.tno"
                        @keyup.enter.native="onSelectID(selectTeacherForm.tno,'selectTeacherForm')"
                        placeholder="请输入教师ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(selectTeacherForm.tno,'selectTeacherForm')">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3" offset="1">
            <el-form-item>
              <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">添加老师</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button @click="delArray()" type="danger">批量删除</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button @click="toggleSelection()">取消选择</el-button>
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
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column
          prop="tno"
          label="教师编号"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="tname"
          label="教师姓名" align="center">
        </el-table-column>
        <el-table-column
          label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="deleteObject(scope.row.tno)"
                       type="danger" size="mini">删除
            </el-button>
            <el-button type="primary" size="mini">编辑</el-button>
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
        multipleSelection: [],
        delarr: [], //存放删除的数据
        query: {
          total: 1,
          current: 1,
          size: 5,
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
        //this.$refs[selectTeacherForm].resetFields();
      },
      onSelectAll() {
        this.getAllByPage('undefined');
        this.$refs['selectTeacherForm'].resetFields();
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
      //取消选择
      toggleSelection() {
        this.$refs.multipleTable.clearSelection();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 多选删除
      delArray() {
        //var _this = this;
        const length = this.multipleSelection.length;

        for (let i = 0; i < length; i++) {
          // console.log(this.multipleSelection[i])
          this.delarr.push(this.multipleSelection[i].tno);
          console.log(this.delarr[i])
        }
        if (this.delarr == null  || this.delarr == ""){
          this.$message.error("请选择教师")
        }else {
          this.$confirm('此操作将永久删除选中的教师, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            axios.get("http://localhost:8081/deleteTeacherBatch/" + this.delarr).then(res => {
              if (res.data == "success") {
                this.reload();/*动态刷新表格*/
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                })
              } else {
                this.$message.error("删除失败！")
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },

      //单行删除
      deleteObject(row) {
        this.$confirm('此操作将永久删除选中的老师, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          axios.get("http://localhost:8081/deleteTeacherBatch/" + row).then(res => {
            if (res.data == "success"){
              this.reload();/*动态刷新表格*/
              this.$message({
                type: 'success',
                message : '删除成功！'
              })
            }else {
              this.$message.error("删除失败！")
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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

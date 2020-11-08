<template>
  <div class="Terminal" v-loading="loading">
    <div style="margin-top: -20px;padding-bottom: 20px">
    <el-row>
      <el-col :span="2">
        <span style="font-family: 'Microsoft YaHei';font-weight: bold;font-size: 20px">部门管理</span>
      </el-col>
    </el-row>
    </div>
    <div class="select">
      <el-form :inline="true" :model="selectDeptForm" ref="selectDeptForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="1">
            <el-form-item label="部门名称" prop="dname">
              <el-input v-model="selectDeptForm.dname" @keyup.enter.native="onSelectID(selectDeptForm.dname,'selectDeptForm')" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(selectDeptForm.dname,'selectDeptForm')">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3" offset="1">
            <el-form-item>
              <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">添加部门</el-button>
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
        ref="multipleTable"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <!--<el-table-column type="selection" width="55">
        </el-table-column>-->
        <el-table-column
          prop="deptno"
          label="部门编号"
          align="center"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="dname"
          label="部门名称"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="emp.ename"
          align="center"
          label="部门经理"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          >
          <template slot-scope="scope">
            <el-button @click="allEmp(scope.row.deptno)" size="mini">查看员工</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
            <!--<el-button @click="deleteObject(scope.row.deptno)"
                       type="danger" size="mini">删除
            </el-button>-->
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

    <!--添加部门-->
    <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
      <el-form :model="addDeptForm" :rules="rules2" @close='closeDialog'>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="部门名称" :label-width="formLabelWidth" prop="dname">
              <el-input v-model="addDeptForm.dname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="经理编号" :label-width="formLabelWidth" prop="deptno">
              <el-input v-model="addDeptForm.empno" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="经理姓名" :label-width="formLabelWidth" prop="ename">
              <el-input v-model="addDeptForm.ename" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addDept">确 定</el-button>
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
        name: "deptInfoInAdmin",
      inject:['reload'],
      data() {
        var validateName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入部门名称'));
          } else {
            callback();
          }
        };
        return {
          tableData: [],   //从后台获取数据
          multipleSelection: [],
          delarr: [], //存放删除的数据
          query:{
            total:1,
            current:1,
            size:5,
          },
          selectDeptForm: {
            deptno: '',
          },
          addDeptForm : {
            dname: '',
            empno: '',
            ename: ''

          },
          rules2: {
            dname: [
              {validator: validateName, trigger: 'blur'}
            ]
          },
          dialogFormVisible: false,
          formLabelWidth: '120px'
        }
      },
      methods:{
        getAllDeptSize: function (dname) {
          axios.get("http://localhost:8081/getAllDeptInAdmin/" + dname).then(res => {
            this.query.total = res.data.length;
          })
        },
        getAllByPage: function (dname) {
          axios.get("http://localhost:8081/getAllDeptInAdminByPage/" + this.query.current + "/" +
            this.query.size + "/" + dname).then(res => {
            this.tableData = res.data;
          })
        },
        allEmp: function(deptno) {
          this.$router.push({
            path:"/empInfoInAdmin",
            query : {
                deptno: deptno
            }
          });
        },
        addDept:function(){
          axios.post("addDeptByAdmin/" + this.addDeptForm.dname + "/" + this.addDeptForm.empno + "/" +
                      this.addDeptForm.ename).then(res => {
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
        handleSizeChange(val) {
          this.page = 1;
          this.query.size = val;
          this.getAllByPage()
        },
        handleCurrentChange(val) {
          this.query.current = val;
          this.getAllByPage()
        },
        onSelectID(dname,selectDeptForm){
          console.log('select!');
          this.getAllByPage(dname);
          this.getAllDeptSize(dname);
          //this.$refs[selectDeptForm].resetFields();
        },
        onSelectAll(){
          this.getAllByPage('undefined');
          this.getAllDeptSize('undefined');
          this.$refs['selectDeptForm'].resetFields();
        },
        //取消选择
        /*toggleSelection() {
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
            this.delarr.push(this.multipleSelection[i].deptno);
            console.log(this.delarr[i])
          }
          if (this.delarr == null  || this.delarr == ""){
            this.$message.error("请选择部门")
          }else {
            this.$confirm('此操作将永久删除选中的教师, 是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            }).then(() => {
              axios.get("http://localhost:8081/deleteDeptBatch/" + this.delarr).then(res => {
                if (res.data == "success") {
                  this.reload();/!*动态刷新表格*!/
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
            axios.get("http://localhost:8081/deleteDeptBatch/" + row).then(res => {
              if (res.data == "success"){
                this.reload();/!*动态刷新表格*!/
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
        },*/
      },
      mounted() {
        //this.handleUserList()
        this.getAllByPage();
        this.getAllDeptSize();
      }
    }
</script>

<style scoped>

</style>

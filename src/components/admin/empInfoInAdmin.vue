<template>
  <div>
    <el-container>
      <el-header>
        <nav-menu></nav-menu>
      </el-header>
      <el-container class="el-container">
        <el-aside width="15%">
          <el-menu>
            <navMenuSide v-for="(menu,i) in adminMenus" :key="i" :item="menu"></navMenuSide>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <div style="margin-top: -20px;padding-bottom: 20px">
            <el-row>
              <el-col :span="2">
                <span style="font-family: 'Microsoft YaHei';font-weight: bold;font-size: 20px">员工管理</span>
              </el-col>
            </el-row>
            </div>
            <div class="select">
              <el-form :inline="true" :model="selectEmp" ref="selectEmp" class="demo-form-inline">
                <el-row>
                  <el-col :span="8" offset="4">
                    <el-form-item label="员工编号" prop="empno">
                      <el-input v-model="selectEmp.empno" @keyup.enter.native="onSelect(selectEmp.empno,'selectEmp')" placeholder="请输入员工编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSelect(selectEmp.empno,'selectEmp')">查询</el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" offset="1">
                    <el-form :inline="true" :model="selectByName" ref="selectByName" class="demo-form-inline">
                      <el-form-item>
                        <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <!--<el-col :span="4">
                    <el-form-item>
                      <el-button type="primary" @click="dialogFormVisible = true">添加员工</el-button>
                    </el-form-item>
                  </el-col>-->
                </el-row>
              </el-form>
            </div>
            <div class="store-table">
              <el-table
                :data="tableData"
                border
                fit="fit"
                stripe="stripe"
                style="width: 100%"
                :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column
                  prop="empno"
                  label="员工编号"
                  align="center"
                  sortable
                >
                </el-table-column>
                <el-table-column
                  prop="ename"
                  label="员工姓名"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="job"
                  label="员工工作"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="officialdate" align="center" label="入职日期">
                </el-table-column>
                <el-table-column prop="student.sno" align="center" label="学号">
                </el-table-column>
                <el-table-column prop="dept.dname" align="center" label="部门名称">
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteObject(scope.$index,scope.row.empno,tableData)"
                               type="danger" size="mini">删除
                    </el-button>
                    <el-button type="primary" size="mini" @click="openEmp(scope.row)">编辑</el-button>
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
            <!--            <student-info-in-admin></student-info-in-admin>-->
          </el-main>
          <el-footer class="el-footer-style">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <!--添加员工-->
    <el-dialog title="编辑员工" :visible.sync="dialogFormVisible">
      <el-form :model="editEmpForm" :rules="rules2" @close='closeDialog'>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="员工编号" :label-width="formLabelWidth" prop="cname">
              <el-input v-model="editEmpForm.empno" disabled autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="员工姓名" :label-width="formLabelWidth" prop="cname">
              <el-input v-model="editEmpForm.ename" disabled autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="所在部门" :label-width="formLabelWidth" prop="cname">
              <!--<el-input v-model="editEmpForm.deptno" autocomplete="off"></el-input>-->
              <el-select v-model="editEmpForm.deptno" filterable placeholder="请选择学期">
                <el-option v-for="item in options" :key="item.deptno" :label="item.dname" :value="item.deptno">
                  <span style="float: left">{{ item.deptno }}</span>
                  <span style="float: right;color: #8492a6; font-size: 13px">{{item.dname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editEmp">确 定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import navMenu from '../navMenu.vue';/*引入navMenu导航栏组件*/
  import navMenuSide from '../navMenuSide.vue'
  import axios from "axios";

  export default {
    name: "empInfoInAdmin",
    components: {navMenu, navMenuSide},
    inject: ["reload"],
    data() {
      return {
        tableData: [],   //从后台获取数据
        adminMenus: [],
        options: [],
        query: {
          total: 1,
          current: 1,
          size: 5,
        },
        selectEmp: {
          empno: ''
        },
        editEmpForm:{
          empno: '',
          ename:'',
          deptno:''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      getMenu() {
        axios.get('http://localhost:8081/getMenu').then(res => {
          this.adminMenus = res.data;
        })
      },
      getAllEmpSize: function (empno) {
        let deptno = this.$route.query.deptno;
        axios.get("http://localhost:8081/selectAllEmpByPage/" + deptno + "/" + empno).then(res => {
          this.query.total = res.data.length;
        })
      },
      getAllByPage: function (empno) {
        let deptno = this.$route.query.deptno;
        axios.get("http://localhost:8081/selectEmpWithDeptByPage/" + this.query.current + "/" +
          this.query.size + "/" + deptno + "/" + empno).then(res => {
          this.tableData = res.data;
        })
      },
      openEmp:function(row){
        if (row.job == "经理"){
          this.$message.error("经理不可编辑");
        }else {
          this.dialogFormVisible = true;
          this.editEmpForm.empno = row.empno;
          this.editEmpForm.deptno = row.deptno;
          this.editEmpForm.ename = row.ename;
        }
      },
      editEmp:function() {
        axios.get("editEmp/" + this.editEmpForm.empno + "/" + this.editEmpForm.deptno).then(res => {
          if (res.data == "success") {//添加成功
            this.reload();/*动态刷新表格*/
            this.dialogFormVisible = false;/*关闭弹出层*/
            this.$message({
              type: 'success',
              message: "编辑成功"
            });
            //location.reload();
          } else {
            this.$message.error('操作失败！');
          }
        })
      },
      getEmp() {
        axios.get("getAllDept").then(res => {
          this.options = res.data;
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
      onSelect(empno,selectEmp) {
        console.log('select!');
        this.getAllByPage(empno);
        this.getAllEmpSize(empno);
        //this.$refs[selectEmp].resetFields()
      },
      onSelectAll(){
        this.getAllEmpSize("undefined");
        this.getAllByPage("undefined");
        this.$refs['selectEmp'].resetFields()
      },
      //单行删除
      deleteObject(index,row,tableData) {
        this.$confirm('此操作将永久删除选中的学期, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          axios.get("http://localhost:8081/deleteEmp/" + row).then(res => {
            if (res.data == "success"){
              //this.reload();/*动态刷新表格*/
              tableData.splice(index, 1)
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
      //this.getAllEmp();
      //this.handleUserList()
      this.getMenu();
      this.getEmp();
      this.getAllEmpSize();
      this.getAllByPage();
    }
  }
</script>

<style scoped>

</style>

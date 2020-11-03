<template>
  <div class="Terminal" v-loading="loading">
    <div class="select">
      <el-form :inline="true" :model="selectDeptForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="4">
            <el-form-item label="部门名称">
              <el-input v-model="selectDeptForm.deptno" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
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
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="deptno"
          label="部门编号"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="dname"
          label="部门名称"
          >
        </el-table-column>
        <el-table-column
          prop="count"
          label="部门人数"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button @click="allEmp(scope.row.deptno)" type="text" size="small">查看</el-button>
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
          query:{
            total:1,
            current:1,
            size:2,
          },
          selectDeptForm: {
            deptno: '',
          },
          addDeptForm : {
            dname: ''
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
        getAllByPage:function(){
          axios.get("http://localhost:8081/getAllDeptInAdminByPage/" + this.query.current + "/" + this.query.size).then(res=>{
            this.tableData = res.data.records;
            this.query.current = res.data.current;
            this.query.size = res.data.size;
            this.query.total = res.data.total;
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
          axios.post("addDeptByAdmin/" + this.addDeptForm.dname).then(res => {
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
        /*addTeacher:function () {
          let data = this.addTeacherForm;
          axios.post("/addTeacherInUser",Qs.stringify(data)).then(res => {
            if (res.data == "success") {//添加成功
              this.reload();/!*动态刷新表格*!/
              this.dialogFormVisible = false;/!*关闭弹出层*!/
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
            } else {
              this.$message.error('添加成功！');
            }
          })
        },*/
        onSelectID(){
          console.log('select!');
        }
      },
      mounted() {
        //this.handleUserList()
        this.getAllByPage();
      }
    }
</script>

<style scoped>

</style>

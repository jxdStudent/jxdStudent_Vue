<template>
  <div class="Terminal" v-loading="loading">
    <!-- 查询操作 -->
    <div style="margin-top: -20px;padding-bottom: 20px">
      <el-row>
        <el-col :span="2">
          <span style="font-family: 'Microsoft YaHei';font-weight: bold;font-size: 20px">账号管理</span>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="8" offset="1">
        <el-form :inline="true" :model="selectById" ref="selectById" class="demo-form-inline">
          <el-form-item label="用户ID" prop="id">
            <el-input v-model="selectById.id" @keyup.enter.native="onSelectId(selectById.id,'selectById')"
                      placeholder="请输入用户ID"></el-input>
          </el-form-item>
          <el-form-item prop="selectById_btn">
            <el-button type="primary" @click="onSelectId(selectById.id,'selectById')">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <el-form :inline="true" :model="selectByRole" ref="selectByRole" class="demo-form-inline">
          <el-form-item label="用户角色" :label-width="formLabelWidth" prop="id">
            <!--<el-input v-model="addStudentForm.classno" autocomplete="off"></el-input>-->
            <el-select v-model="selectByRole.id" @change="selectByRoleId(selectByRole.id,'selectByRole')" filterable
                       placeholder="请选择用户角色">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">{{ item.id }}</span>
                <span style="float: right;color: #8492a6; font-size: 13px">{{item.name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item prop="selectByName_btn">
            <el-button type="primary" @click="selectByRoleId(selectByRole.id,'selectByRole')">查询</el-button>
          </el-form-item>-->
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-form :inline="true" :model="selectByName" ref="selectByName" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div class="store-table">
      <el-table
        :data="tableData"
        border
        fit="fit"
        stripe="stripe"
        v-infinite-scroll="load"
        style="width: 100%;overflow:auto"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="uid"
          label="用户id"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteObject(scope.$index,scope.row.uid,tableData)"
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
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "accountInfoInAdmin",
    data() {
      return {
        tableData: [],   //从后台获取数据
        query: {
          total: 1,
          current: 1,
          size: 5,
        },
        selectById: {
          id: '',
        },
        selectByRole: {
          id: ''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      getAllByPage: function (uid, role) {
        axios.get("/getAllAccountInAdminByPage/" + this.query.current + "/" + this.query.size +
          "/" + uid + "/" + role).then(res => {
          for (let i = 0; i < res.data.records.length; i++) {
            var role = res.data.records[i].role
            if (role == 0) {
              res.data.records[i].role = "学生";
            } else if (role == 1) {
              res.data.records[i].role = "老师";
            } else if (role == 2) {
              res.data.records[i].role = "员工";
            } else if (role == 3) {
              res.data.records[i].role = "部门经理";
            } else if (role == 4) {
              res.data.records[i].role = "管理员";
            }
          }
          this.tableData = res.data.records;
          this.query.current = res.data.current;
          this.query.size = res.data.size;
          this.query.total = res.data.total;
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
      onSelectId(id, selectById) {
        console.log('onSelectId!');
        this.getAllByPage(id, "undefined")
        //this.$refs[selectById].resetFields()
      },
      selectByRoleId(id, selectByRole) {
        console.log('onSelectName!');
        this.getAllByPage("undefined", id)
        //this.$refs[selectByRole].resetFields()
      },
      onSelectAll() {
        this.getAllByPage("undefined", "undefined");
        this.$refs['selectById'].resetFields()
        this.$refs['selectByRole'].resetFields()
      },
      getRole() {
        axios.get("http://localhost:8081/getRole").then(res => {
          this.options = res.data;
        })
      },
      //单行删除
      deleteObject(index,row,tableData) {
        this.$confirm('此操作将永久删除选中的账号, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          alert(row)
          axios.get("http://localhost:8081/deleteAccount/" + row).then(res => {
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
      //this.getAllAccount();
      //this.handleUserList()
      this.getAllByPage();
      this.getRole();
    },
    /*created() {
      this.getRole();
    }*/
  }
</script>

<style scoped>

</style>

<template>
  <div class="Terminal" v-loading="loading">
    <!-- 查询操作 -->
    <el-row>
      <el-col :span="8" offset="2">
          <el-form :inline="true" :model="selectById" ref="selectById" class="demo-form-inline">
            <el-form-item label="用户ID" prop="id">
              <el-input v-model="selectById.id" placeholder="请输入用户ID"></el-input>
            </el-form-item>
            <el-form-item prop="selectById_btn">
              <el-button type="primary" @click="onSelectId(selectById.id,'selectById')">查询</el-button>
            </el-form-item>
          </el-form>
      </el-col>
      <el-col :span="8">
          <el-form :inline="true" :model="selectByName" ref="selectByName" class="demo-form-inline">
            <el-form-item label="用户姓名" prop="uname">
              <el-input v-model="selectByName.uname" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item prop="selectByName_btn">
              <el-button type="primary" @click="onSelectName(selectByName.uname,'selectByName')">查询</el-button>
            </el-form-item>
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
          >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户姓名"
          >
        </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
          >
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
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
  </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "accountInfoInAdmin",
      data() {
        return {
          tableData: [],   //从后台获取数据
          query:{
            total:1,
            current:1,
            size:2,
          },
          selectById: {
            id: '',
          },
          selectByName:{
            uname : ''
          }
        }
      },
      methods:{
        getAllByPage:function(uid,uname){
          axios.get("/getAllAccountInAdminByPage/" + this.query.current + "/" + this.query.size +
                      "/" + uid + "/" + uname).then(res=>{
            for (let i = 0; i < res.data.records.length; i++) {
              var role = res.data.records[i].role
              if (role == 0){
                res.data.records[i].role = "学生";
              }else if (role == 1){
                res.data.records[i].role = "老师";
              }else if (role == 2){
                res.data.records[i].role = "员工";
              }else if (role == 3){
                res.data.records[i].role = "部门经理";
              }else if (role == 4){
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
        onSelectId(id,selectById){
          console.log('onSelectId!');
          this.getAllByPage(id,"undefined")
          this.$refs[selectById].resetFields()
        },
        onSelectName(uname,selectByName){
          console.log('onSelectName!');
          this.getAllByPage("undefined",uname)
          this.$refs[selectByName].resetFields()
        },
        onSelectAll(){
          this.getAllByPage("undefined","undefined");
        }
      },
      mounted() {
        //this.getAllAccount();
        //this.handleUserList()
        this.getAllByPage();
      }
    }
</script>

<style scoped>

</style>

<template>
  <div class="Terminal" v-loading="loading">
    <!-- 查询操作 -->
    <add-account></add-account>
    <div class="select">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学生姓名">
          <el-input v-model="formInline.user" placeholder="请输入用户id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="store-table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column
          prop="uid"
          label="用户id"
          sortable
          width="300px">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户姓名"
          width="300px">
        </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
          width="300px">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
          width="300px">
        </el-table-column>
        <el-table-column
          label="操作"
          width="149">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.query.page"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="this.query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.query.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import addAccount from './addAccount'
  import axios from "axios";
    export default {
        name: "accountInfoInAdmin",
      components:{addAccount},
      data() {
        return {
          tableData: [],   //从后台获取数据
          query:{
            total:1,
            page:1,
            pageSize:5,
          },
          formInline: {
            user: '',
          }
        }
      },
      methods:{
        getAllAccount: function () {   //获取全部部门
          //通过getters属性获取仓库的值
          var name = this.$store.getters.uname;

          axios.get("http://localhost:8081/getAccountInAdmin").then(res => {
            this.tableData = res.data;
          })
        },
        getAllByPage:function(){
          axios.get("http://localhost:8081/getAllByPage/"+this.query.page+"/"+this.query.pageSize).then(res=>{
            this.tableData = res.data;
          })
        },
        handleSizeChange(val) {
          this.page = 1;
          this.query.pageSize = val;
          this.getAllByPage()
        },
        handleCurrentChange(val) {
          this.query.page = val;
          this.getAllByPage()
        },
        onSelect(){
          console.log('select!');
        }
      },
      mounted() {
        this.getAllAccount();
        //this.handleUserList()
        this.getAllByPage();
      }
    }
</script>

<style scoped>

</style>

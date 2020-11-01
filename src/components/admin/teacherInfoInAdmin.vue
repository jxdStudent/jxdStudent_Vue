<template>
  <div class="Terminal" v-loading="loading">
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
    import axios from "axios";

    export default {
        name: "teacherInfoInAdmin",
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
        getAllTeacher: function () {   //获取全部部门
          //通过getters属性获取仓库的值
          var name = this.$store.getters.uname;

          axios.get("http://localhost:8081/getAllTeacher").then(res => {
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
        this.getAllTeacher();
        //this.handleUserList()
        this.getAllByPage();
      }
    }
</script>

<style scoped>

</style>

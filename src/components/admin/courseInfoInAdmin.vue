<template>
  <div class="Terminal" v-loading="loading">
    <div style="margin-top: -20px;padding-bottom: 20px">
    <el-row>
      <el-col :span="2">
        <span style="font-family: 'Microsoft YaHei';font-weight: bold;font-size: 20px">课程管理</span>
      </el-col>
    </el-row>
    </div>
    <div class="select">
      <el-form :inline="true" :model="selectCourseForm" ref="selectCourseForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="4">
            <el-form-item label="课程名称" prop="cname">
              <el-input v-model="selectCourseForm.cname" @keyup.enter.native="onSelectID(selectCourseForm.cname,'selectCourseForm')" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(selectCourseForm.cname,'selectCourseForm')">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" offset="1">
            <el-form :inline="true" :model="selectByName" ref="selectByName" class="demo-form-inline">
              <el-form-item>
                <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="openCourse(null,'添加课程')">添加课程</el-button>
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
          prop="cno"
          label="课程编号"
          align="center"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="cname"
          label="课程名称"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="操作" align="center"
          >
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteObject(scope.$index, scope.row.cno,tableData)"
                       type="danger" size="mini">删除
            </el-button>
            <el-button type="primary" size="mini" @click="openCourse(scope.row,'编辑课程')">编辑</el-button>
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

    <!--添加课程-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addCourseForm" :rules="rules2" @close='closeDialog'>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="课程名称" :label-width="formLabelWidth" prop="cname">
              <el-input v-model="addCourseForm.cname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCourse">确 定</el-button>
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
        name: "courseInfoInAdmin",
      inject:['reload'],
      data() {
        var validateName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入课程名称'));
          } else {
            callback();
          }
        };
        return {
          tableData: [],   //从后台获取数据
          title:'',
          query:{
            total:1,
            current:1,
            size:5,
          },
          selectCourseForm: {
            cname: '',
          },
          addCourseForm:{
            cname:'',
          },
          editCourseForm:{
            cno:'',
            cname:''
          },
          rules2: {
            cname: [
              {required: true, validator: validateName, trigger: 'blur'}
            ]
          },
          dialogFormVisible: false,
          formLabelWidth: '120px'
        }
      },
      methods:{
        getAllByPage:function(cname){
          axios.get("http://localhost:8081/getAllCourseInAdminByPage/" + this.query.current + "/" + this.query.size +
                        "/" + cname).then(res=>{
            this.tableData = res.data.records;
            this.query.current = res.data.current;
            this.query.size = res.data.size;
            this.query.total = res.data.total;
          })
        },
        openCourse:function(row,title) {
          this.title = title;
          this.dialogFormVisible = true;
          if (title == "编辑课程"){
            this.editCourseForm.cno = row.cno;
            this.addCourseForm.cname = row.cname;
          }else {
            this.addCourseForm.cname = "";
          }

        },
        addCourse:function () {
          let data = this.addCourseForm;
          var url = "/addCourse";
          var message = "添加成功";
          if (this.title == "编辑课程"){
            url = "/editCourse";
            this.editCourseForm.cname = this.addCourseForm.cname;
            data = this.editCourseForm;
            message = "编辑成功";
          }

          axios.post(url,Qs.stringify(data)).then(res => {
            if (res.data == "success") {//添加成功
              this.reload();/*动态刷新表格*/
              this.dialogFormVisible = false;/*关闭弹出层*/
              this.$message({
                type: 'success',
                message: message
              });
            } else {
              this.$message.error('编辑失败');
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
        onSelectID(cname,selectCourseForm){
          console.log('select!');
          this.getAllByPage(cname);
          //this.$refs[selectCourseForm].resetFields()
        },
        onSelectAll(){
          this.getAllByPage("undefined");
          this.$refs['selectCourseForm'].resetFields()
        },
        deleteObject(index,row,tableData) {
          this.$confirm('此操作将永久删除选中的课程, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            axios.get("http://localhost:8081/deleteCourse/" + row).then(res => {
              if (res.data == "success"){
                tableData.splice(index, 1)
                //this.reload();/*动态刷新表格*/
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
        getAdminForLogin: function () {
          if (4 == this.$store.state.role) {
            this.$router.push("/courseInfoInAdmin")
          } else {
            this.$router.go(-1)
          }
        },
        getUserForLogin:function() {
          axios.get("getUserForLogin/" + this.$store.getters.uid).then(res => {
            if (res.data.role != 4) {
              this.$router.go(-1)
            }
          })
        },
      },
      created() {
        this.getUserForLogin();
      },
      mounted() {
        //this.getAllCourse();
        //this.handleUserList()
        this.getAllByPage();
        this.getTeacherForOptions();
      }
    }
</script>

<style scoped>

</style>

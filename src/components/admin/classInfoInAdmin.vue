<template>
  <div class="Terminal" v-loading="loading">
    <div style="margin-top: -20px;padding-bottom: 20px">
    <el-row>
      <el-col :span="2">
        <span style="font-family: 'Microsoft YaHei';font-weight: bold;font-size: 20px">学期管理</span>
      </el-col>
    </el-row>
    </div>
    <div class="select">
      <el-form :inline="true" :model="selectClassForm" ref="selectClassForm" class="demo-form-inline">
        <el-row>
          <el-col :span="8" offset="5">
            <el-form-item label="学期类型" prop="classname">
              <el-input v-model="selectClassForm.classname" @keyup.enter.native="onSelectID(selectClassForm.classname)" placeholder="请输入学期类型"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSelectID(selectClassForm.classname)">查询</el-button>
            </el-form-item>
          </el-col>
          <!--<el-col :span="3" offset="1">
            <el-form-item>
              <el-button type="primary" @click="onSelectAll()">显示全部</el-button>
            </el-form-item>
          </el-col>-->
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="openClass(null,'添加学期')">添加学期</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
                <el-button @click="delArray()" type="danger">批量删除</el-button>
            </el-form-item>
          </el-col>
          <!--<el-col :span="3">
            <el-form-item>
              <el-button @click="toggleSelection()">取消选择</el-button>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="store-table">
      <el-table
        :data="tableData.slice((query.current-1)*query.size,query.current*query.size)"
        border
        fit="fit"
        stripe="stripe"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          type='index' :index='(index)=>{return (index+1) + (this.query.current-1)*this.query.size}'
          align="center"
          width="70px"
        ></el-table-column>
        <el-table-column
          prop="classno"
          label="学期编号"
          v-if="showClose"
          align="center"
          sortable>
        </el-table-column>
        <el-table-column
          prop="classname"
          align="center"
          label="学期类型">
        </el-table-column>
        <el-table-column
          prop="teacher.tname"
          align="center"
          label="授课教师">
        </el-table-column>
        <el-table-column
          prop="courseString"
          header-align="center"
          align="left"
          show-overflow-tooltip
          label="所授课程">
        </el-table-column>
        <el-table-column
          prop="courseno"
          header-align="center"
          align="left"
          v-if="show"
          show-overflow-tooltip
          label="课程编号">
        </el-table-column>
        <el-table-column
          label="操作" align="center">
          <template slot-scope="scope">
            <!--<el-button @click.native.prevent="deleteObject(scope.$index,scope.row.classno,tableData)"
                       type="danger" size="mini">删除
            </el-button>-->
            <el-button type="primary" size="mini" @click="openClass(scope.row,'编辑学期')">编辑</el-button>
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
<!--      style="position:fixed; bottom:15%;margin-left: 20%"-->
    </div>

    <!--添加学期-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close='closeDialog("addClassForm")'>
      <el-form :model="addClassForm" ref="addClassForm" :rules="rules2">
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="学期名称" :label-width="formLabelWidth" prop="classname">
              <el-input v-model="addClassForm.classname" placeholder="请输入学期名称" autocomplete="off" class="addClassFormInput"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="授课老师" prop="tno" :label-width="formLabelWidth">
              <el-select v-model="addClassForm.tno" placeholder="请选择授课老师" class="addClassFormInput">
                <el-option v-for="item in options" :key="item.tno" :label="item.tname" :value="item.tno">
                  <span style="float: left">{{ item.tno }}</span>
                  <span style="float: right">{{item.tname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item label="教授课程" prop="cno" :label-width="formLabelWidth">
              <el-select v-model="addClassForm.course" multiple collapse-tags placeholder="请选择" class="addClassFormInput">
                <el-option
                  v-for="item in optionsForCourse"
                  :key="item.cno"
                  :label="item.cname"
                  :value="item.cno">
                  <!--<span style="float: left">{{ item.cno }}</span>-->
                  <span style="float: left">{{item.cname}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" offset="5">
            <el-form-item>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addClass">确 定</el-button>
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
    name: "classInfoInAdmin",
    inject:['reload'],
    //show:true,
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入学期类型'));
        } else {
          callback();
        }
      };
      var validateCno = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择课程类型'));
        } else {
          callback();
        }
      };
      var validateTno = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择教师'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],   //从后台获取数据
        options:[],
        title:'',
        show:false,
        query: {
          total: 1,
          current: 1,
          size: 5,
        },
        multipleSelection: [],
        delarr: [], //存放删除的数据
        selectClassForm: {
          classname: "",
        },
        addClassForm:{
          classname:"",
          cno:"",
          tno:"",
          course:[],
          courseno:''
        },
        editClassForm : {
          classno: '',
          classname:"",
          cno:"",
          tno:"",
          course:[],
          courseno:''
        },
        rules2: {
          classname: [
            {required: true, validator: validateName, trigger: 'blur'}
          ],
          cno: [
            {required: true, validator: validateCno, trigger: 'blur'}
          ],
          tno: [
            {required: true, validator: validateTno, trigger: 'blur'}
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        optionsForCourse: [],
        course: [],
      }
    },
    methods: {
      getAllClassSize: function (classname) {
        if (classname == ""){
          classname = "undefined";
        }
        axios.get("http://localhost:8081/getAllClassByPage/" + classname).then(res => {
          this.query.total = res.data.length;
          this.tableData = res.data;
        })
      },
      /*getAllByPage: function (classname) {
        axios.get("http://localhost:8081/getClassWithDeptByPage/" + this.query.current + "/" +
          this.query.size + "/" + classname).then(res => {
          this.tableData = res.data;
          //this.courseShow = res.data.course;
          /!*for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].course.length; j++) {
              this.courseShow[i] = res.data[i].course[j].cname;
            }
          }*!/
        })
      },*/
      openClass:function(row,title) {
        this.title = title;
        this.dialogFormVisible = true;
        this.editClassForm.classno = row.classno;
        //this.editClassForm.courseno = row.courseno;
        this.addClassForm.classname = row.classname;
        this.addClassForm.tno = row.tno;
        var courseno = row.courseno.split(",");
        var courseno_int = [];
        courseno_int=courseno.map(function(data){
          return +data;
        });
        for (var i = 0; i < courseno_int.length; i++) {
          this.addClassForm.course.push(courseno_int[i]);//可解决readonly状态问题
        }
        /*this.addClassForm.course.push(row.course);

        axios.get("getCourseByClass/" + row.classno).then(res => {
          //this.addClassForm.course = res.data;
          //this.addClassForm.course.push(res.data);
          for (let i = 0; i < res.data.length; i++) {
            this.addClassForm.course.push(res.data[i]);
          }
        })*///option不可编辑
        //this.addClassForm.course.push(row.course);
        //this.addClassForm.course = row.course;
      },
      addClass:function () {
        var url = "addClass";
        var message = "添加成功";

        if (this.title == "编辑学期"){
          url = "editClass";
          message = "编辑成功";
        }else {
          alert(this.addClassForm.course)
          this.editClassForm.classno = "undifinde";
        }
        axios.post(url + "/" + this.addClassForm.classname + "/" + this.addClassForm.tno +
                  "/" + this.addClassForm.course + "/" + this.editClassForm.classno).then(res => {
          if (res.data == "success") {//添加成功
            this.reload();/*动态刷新表格*/
            this.dialogFormVisible = false;/*关闭弹出层*/
            this.$message({
              type: 'success',
              message: message
            });
          } else {
            this.$message.error('操作失败！');
          }
        })
      },
      getTeacherForOptions : function() {
        axios.get("getAllTeacher").then(res => {
          this.options = res.data;
        })
      },
      getCourseForOptions:function() {
        axios.get("getAllCourse").then(res => {
          this.optionsForCourse = res.data;
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
      onSelectID(classname) {
        console.log('select!');
        this.getAllClassSize(classname)
        this.getAllByPage(classname)
      },
      onSelectAll(){
        this.getAllClassSize()
        this.getAllByPage()
        this.$refs['selectClassForm'].resetFields()
        //this.$refs.selectClassForm.resetFields()
      },
      toggleSelection() {
        this.$refs.multipleTable.clearSelection();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      closeDialog:function(addClassForm){
        //this.addClassForm = '';   //下次编辑打开也没有
        this.addClassForm.classname = '';
        this.addClassForm.tno = '';
        this.addClassForm.course = [];
        this.$refs[addClassForm].resetFields()  //下次添加打开还有
      },
      // 多选删除
      delArray() {
        //var _this = this;
        const length = this.multipleSelection.length;

        for (let i = 0; i < length; i++) {
          // console.log(this.multipleSelection[i])
          this.delarr.push(this.multipleSelection[i].classno);
          console.log(this.delarr[i])
        }
        if (this.delarr == null  || this.delarr == ""){
          this.$message.error("请选择学期")
        }else {
          this.$confirm('此操作将永久删除选中的学期, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            axios.get("http://localhost:8081/deleteClassBatch/" + this.delarr).then(res => {
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
      deleteObject(index,row,tableData) {
        this.$confirm('此操作将永久删除选中的学期, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          axios.get("http://localhost:8081/deleteClassBatch/" + row).then(res => {
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
      getAdminForLogin: function () {
        if (4 == this.$store.state.role) {
          this.$router.push("/classInfoInAdmin")
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
      this.getAllClassSize();
      this.getTeacherForOptions();
      this.getCourseForOptions();
      this.getAllByPage();
    }
  }
</script>

<style scoped>
  .addClassFormInput{
    width: 180px;
  }
</style>

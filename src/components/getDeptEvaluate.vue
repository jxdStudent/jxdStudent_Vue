<template>
  <div>
    <el-container>

      <el-header>
        <navMenu :uid="this.$store.getters.uid"></navMenu>
      </el-header>

      <el-container>
        <el-aside width="250px">
          <el-menu >
              <el-menu-item-group>
                <el-menu-item >转正时间：<el-input  class="el-input" v-model="this.officialdate" placeholder="请添加转正时间"  :disabled="true"></el-input></el-menu-item>
                <el-menu-item ><i class="el-icon-edit"></i><el-link type="primary" @click="allow" >允许转正</el-link></el-menu-item>
                <el-menu-item ><i class="el-icon-edit"></i><el-link type="primary" @click="editDeptEvaluate(0)" >编辑转正工作评价</el-link></el-menu-item>
                <el-menu-item ><i class="el-icon-edit"></i> <el-link type="primary" @click="editDeptEvaluate(1)" >编辑一年工作评价</el-link></el-menu-item>
                <el-menu-item ><i class="el-icon-edit"></i><el-link type="primary" @click="editDeptEvaluate(2)" >编辑二年工作评价</el-link></el-menu-item>
                <el-menu-item ><i class="el-icon-edit"></i><el-link type="primary" @click="editDeptEvaluate(3)" >编辑三年工作评价</el-link></el-menu-item>
              </el-menu-item-group>
          </el-menu>

        </el-aside>
      <el-main>
        <el-row>
          <el-col :span="12" :offset="6">
            <h1 style="color: #42b983">金桥学员成长跟踪表<i class="header-icon el-icon-info"/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;
              <el-link type="primary" @click="returnMgrIndex" icon="el-icon-s-home" style="font-size: 20px">返回首页</el-link></h1>
          </el-col>
        </el-row>

        <!--表单-->  <!--:span控制区域长度-->
        <div style="width: 80%">
          <table style="width: 100%">
            <tr>
              <td class="col_1">姓名</td>
              <td class="col_2">
                {{form.sname}}
              </td>

              <td class="col_3">性别</td>
              <td class="col_2">
                {{form.sex}}
              </td>
              <td class="col_3">民族</td>
              <td class="col_2">
               {{form.nation}}
              </td>
              <td rowspan="4"><!--头像-->
                <div style="height: auto">
                  <div v-if="imgUrl">
                    <el-image style="width: 130px;margin-top: 60px;margin-bottom: 10px" :src="imgUrl"></el-image>
                  </div>
                  <div v-else style="margin-top: 60px;font-size:60px">
                    <i class="el-icon-picture"></i>
                    <p style="font-size: 20px">请上传图片</p>
                  </div>


                </div>
              </td>
            </tr>

            <tr>
              <td class="col_1">出生年月</td>
              <td class="col_2">{{form.birthday}}</td>
              <td class="col_3">籍贯</td>
              <td class="col_2">{{form.address}}</td>
              <td class="col_3">婚否</td>
              <td class="col_2">{{form.marriage}}</td>
            </tr>

            <tr>
              <td class="col_1">联系电话</td>
              <td colspan="2" class="col_4">{{form.tel}}</td>
              <td class="col_2">身份证号码</td>
              <td colspan="2" class="col_4">{{form.identity}}</td>
            </tr>

            <tr>
              <td class="col_1">毕业学校</td>
              <td colspan="2" class="col_4">{{form.graduate}}</td>
              <td class="col_1">专业</td>
              <td colspan="2" class="col_4">{{form.major}}</td>
            </tr>

            <tr>
              <td class="col_1">备注</td>
              <td colspan="6" class="col_5"><el-input v-model="form.remark" readonly class="input_show_large"></el-input></td>
            </tr>
          </table>


        <el-table
          :data="table_data"
          border
          stripe
          style="width: 100%">
          <el-table-column label="培训学校评价信息"  align="center">
            <el-table-column
              prop="sno"
              label="学号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="sname"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="classno"
              label="班期"
              align="center">
            </el-table-column>
            <el-table-column
              v-if="false"
              prop="tno"
              label="老师编号"
              align="center">
            </el-table-column>
          </el-table-column >
        </el-table>
        <el-table
          :data="table_course_score"
          border
          stripe
          style="width: 100%">
          <!--动态遍历字段-->
          <template
            v-for="(head,index) in table_course_head">
            <!--拼接''：格式转换--课程编号head.cno是number类型的，从后台接收的成绩json里cno是字符串，-->
            <el-table-column
              :prop="head.cno + ''"
              :label="head.cname"
              align="center">
            </el-table-column>
          </template>
          <el-table-column
            prop="score_total"
            label="总成绩"
            width="200"
            align="center">
          </el-table-column>
        </el-table>
        <el-table
          :data="table_evaluate"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="sevaluate"
            label="评价"
            header-align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_emp"
          border
          stripe
          style="width: 100%">
          <el-table-column label="员工转正评价信息"  align="center">
          <el-table-column
            prop="empno"
            label="工号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ename"
            label="姓名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="dname"
            label="员工部门"
            align="center">
          </el-table-column>
          <el-table-column
            prop="job"
            label="员工职务"
            align="center">
          </el-table-column>
            </el-table-column >
        </el-table>

        <el-table
          :data="table_evaluate0"
          border
          stripe
          style="width: 100%">
            <el-table-column
              prop="ability"
              label="能力分数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="initiative"
              label="积极性"
              align="center">
            </el-table-column>
            <el-table-column
              prop="communicate"
              label="沟通能力"
              align="center">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="品质"
              align="center">
            </el-table-column>
            <el-table-column
              prop="characterc"
              label="性格"
              align="center">
            </el-table-column>
            <el-table-column
              prop="mark"
              label="整体评分"
              align="center">
            </el-table-column>
        </el-table>

        <el-table
          :data="table_evaluate0"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="commentc"
            label="评价（包括主要优点及缺陷）"
            header-align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_emp"
          border
          stripe
          style="width: 100%">
          <el-table-column label="员工工作一年评价信息"  align="center">
            <el-table-column
              prop="empno"
              label="工号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="ename"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dname"
              label="员工部门"
              align="center">
            </el-table-column>
            <el-table-column
              prop="job"
              label="员工职务"
              align="center">
            </el-table-column>
          </el-table-column >
        </el-table>

        <el-table
          :data="table_evaluate1"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="ability"
            label="能力分数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="initiative"
            label="积极性"
            align="center">
          </el-table-column>
          <el-table-column
            prop="communicate"
            label="沟通能力"
            align="center">
          </el-table-column>
          <el-table-column
            prop="quality"
            label="品质"
            align="center">
          </el-table-column>
          <el-table-column
            prop="characterc"
            label="性格"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mark"
            label="整体评分"
            align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_evaluate1"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="commentc"
            label="评价（包括主要优点及缺陷）"
            header-align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_emp"
          border
          stripe
          style="width: 100%">
          <el-table-column label="员工工作二年评价信息"  align="center">
            <el-table-column
              prop="empno"
              label="工号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="ename"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dname"
              label="员工部门"
              align="center">
            </el-table-column>
            <el-table-column
              prop="job"
              label="员工职务"
              align="center">
            </el-table-column>
          </el-table-column >
        </el-table>

        <el-table
          :data="table_evaluate2"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="ability"
            label="能力分数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="initiative"
            label="积极性"
            align="center">
          </el-table-column>
          <el-table-column
            prop="communicate"
            label="沟通能力"
            align="center">
          </el-table-column>
          <el-table-column
            prop="quality"
            label="品质"
            align="center">
          </el-table-column>
          <el-table-column
            prop="characterc"
            label="性格"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mark"
            label="整体评分"
            align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_evaluate2"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="commentc"
            label="评价（包括主要优点及缺陷）"
            header-align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_emp"
          border
          stripe
          style="width: 100%">
          <el-table-column label="员工工作三年评价信息"  align="center">
            <el-table-column
              prop="empno"
              label="工号"
              align="center">
            </el-table-column>
            <el-table-column
              prop="ename"
              label="姓名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="dname"
              label="员工部门"
              align="center">
            </el-table-column>
            <el-table-column
              prop="job"
              label="员工职务"
              align="center">
            </el-table-column>
          </el-table-column >
        </el-table>

        <el-table
          :data="table_evaluate3"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="ability"
            label="能力分数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="initiative"
            label="积极性"
            align="center">
          </el-table-column>
          <el-table-column
            prop="communicate"
            label="沟通能力"
            align="center">
          </el-table-column>
          <el-table-column
            prop="quality"
            label="品质"
            align="center">
          </el-table-column>
          <el-table-column
            prop="characterc"
            label="性格"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mark"
            label="整体评分"
            align="center">
          </el-table-column>
        </el-table>

        <el-table
          :data="table_evaluate3"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="commentc"
            label="评价（包括主要优点及缺陷）"
            header-align="center">
          </el-table-column>
        </el-table>
        </div>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import navMenu from "./navMenu";
  import axios from "axios"
  export default{
    components:{navMenu},
    data(){
      return {
        table_emp: [{empno:'',ename:'',dname:'',job:''}],
        table_evaluate0: [],
        table_evaluate1: [],
        table_evaluate2: [],
        table_evaluate3: [],
        //学校评价相关
        table_data: [],
        table_course_head: [],
        table_course_score: [],
        table_evaluate: [],
        //学生个人数据
        form: {},
        //显示的图片
        imgUrl:null,
        officialdate:''
      }
    },
    methods: {
      //返回首页
      returnMgrIndex(){
        this.$router.push({path: "/mgrIndex"});
      },
      //允许转正
      allow(){
        if(this.officialdate == null || this.officialdate == ""){
          //页面跳转
          //路由传值
          this.$router.push({
            path: '/addOfficialDate',
            query: {
              empno:this.$route.query.empno,
              ename:this.$route.query.ename,
            }
          })
        }else{
          this.$message("转正时间已经存在");
        }
      },

      //获取个人信息
      getAllInfo() {
        //获取基本信息
        this.axios.get("getStudent/" + this.$route.query.sno).then(res => {
          if (res.data.marriage == 0) {
            res.data.marriage = "未婚";
          } else {
            res.data.marriage = "已婚";
          }
          if (this.$store.getters.studentNo){
            this.isStudent = false;
          }
          this.form = res.data;

          //获取员工图片信息
            this.axios.get("getEmpPhotoByEmpno/" + this.$route.query.empno).then(res =>{
              this.imgUrl = res.data.photo
            })


        })
      },
      getQuery() {
        // 取到路由带过来的参数
        this.table_emp[0].empno = this.$route.query.empno;
        this.table_emp[0].ename = this.$route.query.ename;
        this.table_emp[0].dname = this.$route.query.dname;
        this.table_emp[0].job = this.$route.query.job;
        this.officialdate = this.$route.query.officialdate;
        this.axios.get("getDeptEvaluate/" + this.$route.query.empno + "/" + 0).then(res => {
          this.table_evaluate0 = res.data;
        })

        this.axios.get("getDeptEvaluate/" + this.$route.query.empno + "/" + 1).then(res => {
          this.table_evaluate1 = res.data;
        })

        this.axios.get("getDeptEvaluate/" + this.$route.query.empno + "/" + 2).then(res => {
          this.table_evaluate2 = res.data;
        })

        this.axios.get("getDeptEvaluate/" + this.$route.query.empno + "/" + 3).then(res => {
          this.table_evaluate3 = res.data;
        })

      },
      //编辑操作
      //跳转页面并传值
      editDeptEvaluate(val){
        // 获取工作满一，二，三年的日期，格式以YYYY-MM-DD显示
        let nextYear = this.$moment(this.officialdate).add(1, 'years').format('YYYY-MM-DD');
        let secondYear = this.$moment(this.officialdate).add(2, 'years').format('YYYY-MM-DD');
        let thirdYear = this.$moment(this.officialdate).add(3, 'years').format('YYYY-MM-DD');
        //获取当前日期
        let nowTime = this.$moment().format('YYYY-MM-DD');
        console.log(nowTime+""+nextYear+""+secondYear+""+thirdYear)

        let time,msg;
        if(val == 1){
          time = nextYear;
          msg = "未满工作一年，不允许评价";
        }else if(val == 2){
          time = secondYear;
          msg = "未满工作两年，不允许评价";
        }else if(val == 3){
          time = thirdYear;
          msg = "未满工作三年，不允许评价";
        }


        if(this.officialdate == null || this.officialdate == ""){
          this.$message("请添加转正时间");
        }else {
          //不满足工作年限，不允许评价
          if (nowTime < time) {
            this.$message(msg);
          } else {
            if (val == 0) {
              if (this.table_evaluate0[0] == null) {
                this.$message("评价信息为空，请增加评价信息");
                //页面跳转
                //路由传值
                this.$router.push({
                  path: '/addDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              } else {
                this.$router.push({
                  path: '/editDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              }
            } else if (val == 1) {
              if (this.table_evaluate1[0] == null) {
                this.$message("评价信息为空，请增加评价信息");
                this.$router.push({
                  path: '/addDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              } else {
                this.$router.push({
                  path: '/editDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              }
            } else if (val == 2) {
              if (this.table_evaluate2[0] == null) {
                this.$message("评价信息为空，请增加评价信息");
                this.$router.push({
                  path: '/addDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              } else {
                this.$router.push({
                  path: '/editDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              }
            } else if (val == 3) {
              if (this.table_evaluate3[0] == null) {
                this.$message("评价信息为空，请增加评价信息");
                this.$router.push({
                  path: '/addDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              } else {
                this.$router.push({
                  path: '/editDeptEvaluate',
                  query: {
                    type: val,
                    empno: this.$route.query.empno,
                    ename: this.$route.query.ename,
                    dname: this.$route.query.dname,
                    job: this.$route.query.job,
                    sno: this.$route.query.sno,
                    officialdate: this.$route.query.officialdate
                  }
                })
              }
            }
          }
        }
      },

      //获取学生的学号，姓名，班期
      getStudent() {
        var sno = this.$route.query.sno;
        axios.get("/getStudentById/" + sno).then(res => {
          this.table_data = res.data;
          this.getSchoolEvaluate(this.table_data[0].tno)
        })
      },
      //获取课程信息
      getAllCourse() {
        axios.get("/getAllCourse/").then(res => {
          this.table_course_head = res.data;
        })
      },
      //获取该学生的课程成绩
      getAllScore(){
        var sno = this.$route.query.sno;
        axios.get("/getAllScore/" + sno).then(res => {
          this.table_course_score = res.data;
        })
      },
      //获取该学生的学校评价
      getSchoolEvaluate(tno){
        console.log(tno);
        var sno = this.$route.query.sno;

        axios.get("getSchoolEvaluate/" + sno+"/"+tno).then(res => {
          this.table_evaluate = res.data;
        })
      },
      handleSelect(){
        this.$router.push({
          path: "/addDeptEvaluate",
          query: {
            empno: val1.empno,
            ename: val1.sname,
            type: val2
          }
        });
      }

    },
    //加载执行
    mounted() {
      this.getQuery();
      this.getStudent();
      this.getAllCourse();
      this.getAllScore();
      this.getAllInfo()
    },
    watch: {
      //监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getQuery'
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #409EFF;
    color: #333;
  }
  table,td{
    border-collapse: collapse;
    border: 1px black solid;
    margin: 0px;
  }
  .el-input{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 70%;
  }

</style>

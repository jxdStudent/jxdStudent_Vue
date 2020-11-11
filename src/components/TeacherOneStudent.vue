<template>
  <div>
    <el-container>
      <el-header>
        <navMenu :uid="uid_change"/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            :unique-opened="true"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
            class="el-menu-vertical-demo">
            <el-menu-item index="teacherIndex">
              <i class="el-icon-user"></i>
              <span slot="title">学生信息表</span>
            </el-menu-item>
            <el-menu-item index="teacherIndex2">
              <i class="el-icon-document"></i>
              <span slot="title">学生成绩表</span>
            </el-menu-item>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-s-unfold"></i>
                <span>工作追踪表</span>
              </template>
              <el-menu-item
                index="teacherIndex3_1">
                <i class="el-icon-s-custom"></i>工作1年
              </el-menu-item>
              <el-menu-item
                index="teacherIndex3_2">
                <i class="el-icon-s-custom"></i>工作2年
              </el-menu-item>
              <el-menu-item
                index="teacherIndex3_3">
                <i class="el-icon-s-custom"></i>工作3年
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="teacherAllStudent">
              <i class="el-icon-s-grid"></i>
              <span slot="title">学生总览表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>

      <div style="width: 900px;margin: auto">
        <!--折叠面板-->
        <el-collapse v-model="activeNames">
          <el-collapse-item name="学生基本信息">
            <template slot="title">
              <h1 style="color: #42b983">&nbsp;&nbsp;基本信息<i
                class="header-icon el-icon-info"></i>
              </h1>
            </template>

            <!--表单-->  <!--:span控制区域长度-->
            <div>
              <table>
                <tr>
                  <td class="col_1">姓名</td>
                  <td class="col_2">
                    <el-input v-model="form.sname" readonly class="input_show"></el-input>
                  </td>

                  <td class="col_3">性别</td>
                  <td class="col_2">
                    <el-input v-model="form.sex" readonly class="input_show"></el-input>
                  </td>
                  <td class="col_3">民族</td>
                  <td class="col_2">
                    <el-input v-model="form.nation" readonly class="input_show"></el-input>
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
                  <td class="col_2">
                    <el-input v-model="form.birthday" readonly class="input_show"></el-input>
                  </td>
                  <td class="col_3">籍贯</td>
                  <td class="col_2">
                    <el-input v-model="form.address" readonly class="input_show"></el-input>
                  </td>
                  <td class="col_3">婚否</td>
                  <td class="col_2">
                    <el-input v-model="form.marriage" readonly class="input_show"></el-input>
                  </td>
                </tr>

                <tr>
                  <td class="col_1">联系电话</td>
                  <td colspan="2" class="col_4">
                    <el-input v-model="form.tel" readonly class="input_show_middle"></el-input>
                  </td>
                  <td class="col_2">身份证号码</td>
                  <td colspan="2" class="col_4">
                    <el-input v-model="form.identity" readonly class="input_show_middle"></el-input>
                  </td>
                </tr>

                <tr>
                  <td class="col_1">毕业学校</td>
                  <td colspan="2" class="col_4">
                    <el-input v-model="form.graduate" readonly class="input_show_middle"></el-input>
                  </td>
                  <td class="col_1">专业</td>
                  <td colspan="2" class="col_4">
                    <el-input v-model="form.major" readonly class="input_show_middle"></el-input>
                  </td>
                </tr>

                <tr>
                  <td class="col_1">备注</td>
                  <td colspan="6" class="col_5">
                    <el-input v-model="form.remark" readonly class="input_show_large"></el-input>
                  </td>
                </tr>
              </table>
            </div>
          </el-collapse-item>

          <!--学员成绩信息-->
          <el-collapse-item name="学生成绩信息" >
            <template slot="title">
              <h1 style="color: #42b983">
                &nbsp;&nbsp;成绩<i class="header-icon el-icon-info"></i>
              </h1>
            </template>
            <div v-if="isShowScore">
              <table>
                <tr>
                  <td colspan="5" class="td_score">
                    <h1>培训学校评价</h1>
                  </td>
                </tr>
                <tr>
                  <td rowspan="2" class="td_score">培训学校</td>
                  <td rowspan="2" class="td_score">班期</td>
                  <td rowspan="2" class="td_score">评价人</td>
                  <td class="td_score">培训期间测试成绩</td>
                  <td rowspan="2" class="td_score">整体评价分数</td>
                </tr>
                <tr>
                  <td rowspan="2" class="td_score">
                    <el-table highlight-current-row :data="table_course_score"
                              border empty-text="加载失败，请稍后再试！">
                      <template v-for="(head,index) in table_course_head">
                        <el-table-column :prop="head.cno + ''" :label="head.cname"></el-table-column>
                      </template>
                    </el-table>
                  </td>
                </tr>
                <tr>
                  <td class="td_score">学习评价</td>
                  <td class="td_score">
                    {{ form.classno }}
                    <!--<el-input v-model="form.classno" readonly></el-input>-->
                  </td>
                  <td class="td_score">
                    {{ tname }}
                    <!--<el-input v-model="tname" readonly></el-input>-->
                  </td>
                  <td class="td_score">
                    {{ table_course_score[0].score_total }}
                    <!--<el-input v-model="table_course_score[0].score_total" readonly></el-input>-->
                  </td>
                </tr>
                <tr>
                  <td class="td_score_evaluate">评价（包括主要优点及缺陷）</td>
                  <td colspan="4" class="td_score_evaluates">
                    {{ evaluate_school }}
                    <!--<el-input v-model="evaluate_school" readonly class="score_evaluate"></el-input>-->
                  </td>
                </tr>
              </table>

            </div>
            <div v-else style="color: red;font-size: 30px;font-family: 华文宋体">
              <p>暂未评价</p>
            </div>
          </el-collapse-item>

          <!--部门评价-->
          <EmpEvaluate ></EmpEvaluate>
        </el-collapse>

      </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Qs from 'qs';
import navMenu from './navMenu.vue';
import EmpEvaluate from './EmpEvaluate.vue';
import studentScoreBySno from './studentScoreBySno.vue';

export default {
  name: "teacherOneStudent",
  components: {
    navMenu: navMenu,
    EmpEvaluate: EmpEvaluate,
    studentScoreBySno: studentScoreBySno
  },
  data() {
    return {

      //学生个人数据
      form: {},
      //div_img:'require("../assets/imgs/" + this.form.photo)',

      //显示的图片
      imgUrl: null,

      //学生课程
      table_course_head: [],

      //学生课程成绩
      table_course_score: [],

      //老师编号
      tno: null,
      //老师姓名
      tname: null,

      //学校的评价
      evaluate_school: null,

      //修改密码
      uid_change: null,

      //表单对齐
      labelPosition: 'right',

      //折叠面板默认开启
      activeNames: '',

      //是否编辑
      isEdit: false,

      //控制必填项的 * 是否显示
      isHide: true,

      //登录的身份是学生还是员工
      isStudent: true,

      //是否显示成绩表格
      isShowScore: true,

    }
  },
  watch: {
    tname: {
      deep: true,
      handler: function (newVal, old) {

      }
    }
  },
  methods: {
    //获取个人信息
    getAllInfo() {
      //获取基本信息
      this.axios.get("getStudent/" + this.$store.getters.selectStuNo).then(res => {
        if (res.data.marriage == 0) {
          res.data.marriage = "未婚";
        } else {
          res.data.marriage = "已婚";
        }
        if (this.$store.getters.studentNo) {
          this.isStudent = false;
        }
        this.form = res.data;

        //员工登录，获取员工图片信息
        if (this.$store.getters.studentNo) {
          this.axios.get("getEmpPhotoByEmpno/" + this.$store.getters.studentNo).then(res => {
            this.imgUrl = res.data.photo
          })
        } else {
          this.imgUrl = this.form.photo
        }

        //根据登录角色传递登录用户id
        if (this.$store.getters.studentNo) {
          this.uid_change = this.$store.getters.studentNo
        } else {
          this.uid_change = this.$store.getters.selectStuNo
        }

        this.getAllCourse();
        this.getAllScore();
      })


    },
    //获取课程信息
    getAllCourse() {
      this.axios.get("getAllCourse/" + this.form.classno).then(res => {
        this.table_course_head = res.data;
        this.tname = res.data[0].tname;
        this.tno = res.data[0].tno;

        this.getEvaluate();
      })
    },
    //获取该学生的课程成绩
    getAllScore() {
      this.axios.get("getAllScore/" + this.form.sno).then(res => {
        if (res.data[0].score_total == 0) {
          this.isShowScore = false;
          return;
        }
        this.table_course_score = res.data;
        this.getEvaluate();
      })
    },
    //获取学校的评价
    getEvaluate() {
      this.axios.get("getSchoolEvaluate/" + this.form.sno + "/" + this.tno).then(res => {
        debugger
        if (res.data) {
          this.evaluate_school = res.data[0].sevaluate;
        } else {
          this.evaluate_school = "暂未评价";
        }
      })
    },
    handleSelect(path) {
      this.$router.push(path)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    this.getAllInfo();


  }
}
</script>

<style scoped>
.el-input {
  width: 200px;
  font-size: medium;
}

.input_show {
  width: 140px;
}

.input_show_middle {
  width: 220px;
}

.input_show_large {
  width: 800px;
}


.el-select {
  width: 200px;
  font-size: medium;
}

.width_mark {

}

.width_idCard {

}

.el-img {
  margin-top: 40px;
  width: 50px;
}

.el-date-picker {
}

img {
  width: 150px;
}


.el-form-item {
  width: 300px;
}

table, td {
  border-collapse: collapse;
  border: 1px black solid;
  margin: 0px;
}

.col_1 {
  width: 120px
}

.col_2 {
  width: 140px
}

.col_3 {
  width: 80px
}

.col_4 {
  width: 200px
}

.col_5 {
  width: 320px
}

.col_6 {
  width: 120px;
}

.td_score {
  height: 40px;
  width: 100px;
}

.td_score_evaluate {
  height: 120px;
}

.score_evaluate {
  width: 240px;
}

.el-table{
  /*width: 410px!important;*/
  border: #000000;
}
table{
  width: 900px;
}

.el-header {
  background-color: #409EFF;
  color: #333;
}
</style>

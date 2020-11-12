<template>
  <div>
    <el-container>
      <el-header>
        <navMenu :uid="uid_change"/>
      </el-header>


      <div style="width: 900px;margin: auto">
        <!--折叠面板-->
            <el-collapse  v-model="activeNames">
          <el-collapse-item  name="学生基本信息">
            <template slot="title">
              <h1>&nbsp;&nbsp;学生（{{this.form.sname}}）基本信息<i
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
              <h1 >
                &nbsp;&nbsp;培训学校评价<i class="header-icon el-icon-info"></i>
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
          <EmpEvaluateInAdmin ></EmpEvaluateInAdmin>

        </el-collapse>


        <!--编辑基本信息-->
        <div>
          <el-dialog title="修改基本信息" :visible.sync="dialogFormVisible" width="1000px">
            <el-container>
              <el-main>

                <!--表单-->  <!--:span控制区域长度-->
                <el-form ref="form" :model="form" :label-position="labelPosition"
                         label-width="100px" :inline="true" :rules="rules"
                         :hide-required-asterisk="isHide" label-suffix="：" :span="24">
                  <el-row v-show="isStudent">
                    <el-col :span="10">
                      <div>
                        <!--prop对应的不单单是rules规则里面的验证项，同时对应着我们form-item下的v-model的值。prop绑定的类要与el-form-item下的v-model的值相对应。-->
                        <el-form-item label="班期" prop="classno">
                          <el-input v-model="form.classno" readonly :disabled="isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div>
                        <el-form-item label="班级名称">
                          <el-input v-model="table_course_head[0].classname" readonly :disabled="isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <el-tooltip content="不可修改" placement="top-start" :disabled="!isEdit">
                        <div>
                          <!--prop对应的不单单是rules规则里面的验证项，同时对应着我们form-item下的v-model的值。prop绑定的类要与el-form-item下的v-model的值相对应。-->
                          <el-form-item label="姓名" prop="sname">
                            <el-input v-model="form.sname" readonly :disabled="isEdit"></el-input>
                          </el-form-item>
                        </div>
                      </el-tooltip>
                    </el-col>
                    <el-col :span="10">
                      <el-tooltip content="不可修改" placement="top-start" :disabled="!isEdit">
                        <div>
                          <el-form-item label="性别">
                            <el-input v-model="form.sex" readonly :disabled="isEdit"></el-input>
                          </el-form-item>
                        </div>
                      </el-tooltip>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <div class="grid-content bg-purple">
                        <el-form-item label="民族" prop="nation">
                          <el-input v-model="form.nation" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div>
                        <el-form-item label="婚否">
                          <el-select v-model="form.marriage" :disabled="!isEdit">
                            <el-option value="未婚">未婚</el-option>
                            <el-option value="已婚">已婚</el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <div>
                        <el-form-item label="出生年月" prop="birthday">
                          <el-date-picker type="date" placeholder="选择日期:"
                                          value-format="yyyy-MM-dd"
                                          v-model="form.birthday"
                                          :disabled="!isEdit">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="grid-content bg-purple-light">
                        <el-form-item label="籍贯" prop="address">
                          <el-input v-model="form.address" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="10">
                      <div class="grid-content bg-purple">
                        <el-form-item label="联系电话"
                                      prop="tel">
                          <el-input v-model="form.tel" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="grid-content bg-purple">
                        <el-form-item label="身份证号" prop="identity">
                          <el-input v-model="form.identity" class="width_idCard" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <div class="grid-content bg-purple">
                        <el-form-item label="毕业学校" prop="graduate">
                          <el-input v-model="form.graduate" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="grid-content bg-purple-light">
                        <el-form-item label="专业" prop="major">
                          <el-input v-model="form.major" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                        <el-col span="10">
                          <div style="float: left;margin-left: 48px">备注：</div>
                          <div style="margin-left: 100px;">
                            <el-form-item prop="remark" >
                              <el-input type="textarea" v-model="form.remark"  style="width: 500px"
                                  maxlength="255" :autosize="{ minRows: 2}"
                                  :disabled="!isEdit" show-word-limit></el-input>
                      </el-form-item>
                          </div>
                    </el-col>
                  </el-row>

                  <el-form-item>
                    <el-button type="primary" @click="edit_student" v-if="!isEdit">编辑</el-button>
                    <el-button type="danger" @click="cancel_edit('form')" v-else>取消编辑</el-button>
                    <el-button type="primary" @click="onSubmit('form')" v-if="isEdit">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-main>

              <!--头像-->
              <el-aside width="200px">
                <div v-if="imgUrl">
                  <!--<img :src="this.form.photo" alt="">-->
                  <!--<img src="../assets/imgs/test.jpg" alt="" style="float: right">-->
                  <!--<el-image :src="form.photo" style="width: 160px;margin-top: 60px"></el-image>-->

                  <el-image style="width: 130px;margin-top: 60px;margin-bottom: 10px" :src="imgUrl"></el-image>
                </div>
                <div v-else style="margin-top: 60px;font-size:60px">
                  <i class="el-icon-picture"></i>
                  <p style="font-size: 20px">请上传图片</p>
                </div>

                <!--<img :src="require('@/assets/imgs/' + this.form.photo)" alt="">-->


                <!--图片上传-->
                <el-upload
                  class="upload-demo"
                  action="http://localhost:8081/uploadImg"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  enctype="multipart/form-data"
                  :before-upload="beforeAvatarUpload"
                  name="photo">
                  <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <el-button size="small" type="primary">修改头像</el-button>
                </el-upload>


              </el-aside>

            </el-container>
          </el-dialog>
        </div>

      </div>
    </el-container>


    <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->


  </div>
</template>

<script>
import Qs from 'qs';
import navMenu from '../navMenu.vue';
import EmpEvaluateInAdmin from "./EmpEvaluateInAdmin";
import studentScoreBySno from '../studentScoreBySno.vue';

export default {
  name: "InfoIndexFromAdmin",
  components: {
    navMenu: navMenu,
    EmpEvaluateInAdmin: EmpEvaluateInAdmin,
    studentScoreBySno: studentScoreBySno
  },
  data() {
    return {

      //学生个人数据
      form: {},
      //div_img:'require("../assets/imgs/" + this.form.photo)',

      //编辑弹框
      dialogFormVisible: false,

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
      activeNames: ['学生基本信息','学生成绩信息'],

      //是否编辑
      isEdit: false,

      //控制必填项的 * 是否显示
      isHide: true,

      //登录的身份是学生还是员工
      isStudent: true,

      //是否显示成绩表格
      isShowScore: true,

      //验证规则
      rules: {
        nation: [
          {required: true, message: '请输入所属民族', trigger: 'blur'},
        ],
        birthday: [
          {required: true, message: '请输入生日', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入家庭住址', trigger: 'blur'}
        ],
        tel: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern: /^([1][3,4,5,6,7,8,9]\d{9})$/, message: '请输入正确的联系电话', trigger: 'blur'}
        ],
        identity: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {pattern: /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/, message: '请输入正确的身份证号', trigger: 'blur'}
        ],
        graduate: [
          {required: true, message: '请输入毕业院校', trigger: 'blur'}
        ],
        major: [
          {required: true, message: '请输入所学专业', trigger: 'blur'}
        ]
      }
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
      getForLogin:function() {
      },
    //上传图片成功
    handleAvatarSuccess(res, file) {
      //this.imageUrl = URL.createObjectURL(file.raw);
      if (this.$store.getters.studentNo) {
        //登录身份为员工，上传图片到jxd_emp
        this.axios.post("updateImgForEmp/" + this.$store.getters.studentNo).then(res => {
          if (res.data != "fail") {
            this.imgUrl = "http://localhost:8081/" + res.data;
            this.$message({
              type: 'success',
              message: '上传成功'
            })
          } else {
            this.$message.error("上传失败！")
          }
        })
      } else {
        //登录身份为学生，上传图片到jxd_student
        this.axios.post("updateImgForStu/" + this.form.sno).then(res => {
          if (res.data != "fail") {
            this.imgUrl = "http://localhost:8081/" + res.data;
            this.$message({
              type: 'success',
              message: '上传成功'
            })
          } else {
            this.$message.error("上传失败！")
          }
        })
      }
    },
    //上传图片前对图片格式的要求
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
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
      })
    },
    //获取学校的评价
    getEvaluate() {
      this.axios.get("getSchoolEvaluate/" + this.form.sno + "/" + this.tno).then(res => {
        if (res.data) {
          this.evaluate_school = res.data[0].sevaluate;
        } else {
          this.evaluate_school = "暂未评价";
        }
      })
    },
    //编辑信息
    edit_student() {
      this.dialogFormVisible = true;
      this.isEdit = !this.isEdit;
      this.isHide = !this.isHide;
    },
    //取消编辑
    cancel_edit(form) {
      //重置信息
      this.$refs[form].resetFields();
      this.edit_student();
      this.close_dialog();
    },
    close_dialog() {
      this.dialogFormVisible = false;
    },
    //修改信息提交
    onSubmit(form) {

      //对表单的 “婚否” 数据进行修改为数据库对应字段
      this.$refs[form].validate((valid) => {
        if (valid) {
          let data = this.form;
          if (data.marriage == "未婚") {
            data.marriage = 0;
          } else {
            data.marriage = 1;
          }
          data.photo = this.imgUrl;
          //提交信息
          this.axios.post("editStudent", Qs.stringify(data)).then(res => {
            if (res.data) {
              this.getAllInfo();
              this.$message({
                message: '修改信息成功',
                type: 'success'
              });
              this.isEdit = false;
              this.isHide = true;
              this.close_dialog();
            } else {
              this.$message({
                message: '修改信息失败',
                type: 'success'
              });
            }
          });
        } else {
          this.$message.error("请按照规范填写");
          return false;
        }
      })
    }
  },
    /*created() {
    this.getForLogin();
    },*/
  //加载执行
  mounted() {
    this.getAllInfo();
    //在获取基本信息之后执行，以便获取其中的班级编号classno
    //setTimeout(this.getAllCourse, 60);
    //setTimeout(this.getAllScore, 60);

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

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  /*line-height: 200px;*/
}

.el-main {
  width: 800px;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;

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
</style>

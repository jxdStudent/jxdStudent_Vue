<template>
  <div>
    <el-container>
      <el-header style="background-color: #42b983">
        <navMenu :edit_student="edit_student" :img="form.photo"/>
      </el-header>


      <el-col :span="16" :offset="4">

        <el-container>
          <el-main>
            <!--折叠面板-->
            <el-collapse accordion v-model="activeNames">
              <el-collapse-item name="学生基本信息">
                <template slot="title">
                  <h1 style="color: #42b983">{{$store.state.uname}}&nbsp;&&nbsp;基本信息<i class="header-icon el-icon-info"></i>
                  </h1>
                </template>

                <!--表单-->  <!--:span控制区域长度-->
                <el-form ref="form" :model="form" :label-position="labelPosition"
                         label-width="100px" :inline="true" :rules="rules"
                         :hide-required-asterisk="isHide" label-suffix="：">
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
                        <el-form-item label="技术栈">
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
                    <el-col :span="20">
                      <div class="grid-content bg-purple-dark">
                        <el-form-item label="备注" prop="remark">
                          <el-input type="textarea" v-model="form.remark" class="width_mark"
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
              </el-collapse-item>

              <!--学员成绩信息-->
              <el-collapse-item name="学生成绩信息" v-if="isStudent">
                <template slot="title">
                  <h1 style="color: #42b983">
                    {{$store.state.uname}}&nbsp;&&nbsp;成绩<i class="header-icon el-icon-info"></i>
                  </h1>
                </template>
                <div v-if="isShowScore">
                <el-table highlight-current-row :data="table_course_score"
                          border empty-text="加载失败，请稍后再试！">

                  <!--评价老师-->
                  <!--<el-table-column label="老师">{{tname}}</el-table-column>-->

                  <template v-for="(head,index) in table_course_head">
                    <el-table-column :prop="head.cno + ''" :label="head.cname"></el-table-column>
                  </template>

                  <el-table-column
                    prop="score_total"
                    label="综合成绩"
                  style="background-color: #409EFF">
                  </el-table-column>
                </el-table>
                </div>
                <div v-else style="color: red;font-size: 30px;font-family: 华文宋体">
                  <p>暂未评价</p>
                </div>
              </el-collapse-item>

              <!--部门评价-->
              <EmpEvaluate v-else></EmpEvaluate>

            </el-collapse>
          </el-main>

          <!--头像-->
          <el-aside width="200px">
            <div v-if="form.photo">
              <!--<img :src="this.form.photo" alt="">-->
            <!--<img src="../assets/imgs/test.jpg" alt="" style="float: right">-->

              <!--<el-image :src="form.photo" style="width: 160px;margin-top: 60px"></el-image>-->

              <el-image style="width: 130px;margin-top: 60px;margin-bottom: 10px" :src="form.photo"></el-image>
            </div>
            <div v-else style="margin-top: 60px;font-size:60px">
              <i class="el-icon-picture"></i>
              <p style="font-size: 20px">点击编辑上传图片</p>
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

      </el-col>
    </el-container>

  </div>
</template>

<script>
  import Qs from 'qs';
  import navMenu from './navMenu.vue';
  import EmpEvaluate from './EmpEvaluate.vue';

  export default {
    name: "InfoIndex",
    components: {
      navMenu:navMenu,
      EmpEvaluate:EmpEvaluate
    },
    data() {
      return {

        //学生个人数据
        form: {},
        //div_img:'require("../assets/imgs/" + this.form.photo)',
        //学生课程
        table_course_head: [],

        //学生课程成绩
        table_course_score: [],

        //老师姓名
        tname: null,

        //表单对齐
        labelPosition: 'right',

        //折叠面板默认开启
        activeNames: ['学生基本信息'],

        //是否编辑
        isEdit: false,

        //控制必填项的 * 是否显示
        isHide: true,

        //登录的身份是学生还是员工
        isStudent: true,

        //是否显示成绩表格
        isShowScore:true,

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
    watch:{
      tname:{
        deep:true,
        handler:function (newVal,old) {

        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = URL.createObjectURL(file.raw);
        this.axios.post("updateImgForStu/" + this.form.sno).then(res => {
          if (res.data != "fail") {
            this.form.photo = "http://localhost:8081/" + res.data;
            this.$message({
              type: 'success',
              message: '上传成功'
            })
          } else {
            this.$message.error("上传失败！")
          }
        })
      },
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

      addByEnterKey(e) {
        //Enter键的代码就是13
        if (e.keyCode == 13) {
          this.onSubmit(this.form);
        }
      },
      //获取个人信息
      getAllInfo() {
        this.axios.get("getStudent/" + this.$store.getters.uid).then(res => {
          if (res.data.marriage == 0) {
            res.data.marriage = "未婚";
          } else {
            res.data.marriage = "已婚";
          }
          if (this.$store.getters.studentNo){
            this.isStudent = false;
          }
          this.form = res.data;

        })
      },
      //获取课程信息
      getAllCourse() {
        this.axios.get("getAllCourse/" + this.form.classno).then(res => {
          this.table_course_head = res.data;
          this.tname = res.data[0].tname;
        })
      },
      //获取该学生的课程成绩
      getAllScore() {
        this.axios.get("getAllScore/" + this.form.sno).then(res => {
          if (res.data[0].score_total == 0){
              this.isShowScore = false;
              return;
          }
          this.table_course_score = res.data;
        })
      },
      //编辑信息
      edit_student() {
        this.isEdit = !this.isEdit;
        this.isHide = !this.isHide;
      },
      //取消编辑
      cancel_edit(form) {
        //重置信息
        this.$refs[form].resetFields();

        this.edit_student();
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
            //提交信息
            this.axios.post("editStudent", Qs.stringify(data)).then(res => {
              if (res.data) {
                this.getAllInfo();
                this.$message({
                  message: '修改信息成功',
                  type: 'success'
                });
                this.isEdit = false;
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
    //加载执行
    mounted() {
      this.getAllInfo();
      //在获取基本信息之后执行，以便获取其中的班级编号classno
      setTimeout(this.getAllCourse, 1000);
      setTimeout(this.getAllScore, 1000);

    }
  }
</script>

<style scoped>
  .el-input {
    width: 200px;
    font-size: medium;
  }

  .el-select {
    width: 200px;
    font-size: medium;
  }

  .width_mark {
    width: 520px
  }

  .width_idCard {

  }

  .el-img{
    margin-top: 40px;
    width: 50px;
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
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }

</style>

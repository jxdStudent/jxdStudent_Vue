<template>
  <div>
    <div>
      <el-container>
        <el-header style="background-color: #42b983">
          <navMenu/>
        </el-header>
      </el-container>

      <el-row :gutter="100">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">

            <!--折叠面板-->
            <el-collapse accordion v-model="activeNames">
              <el-collapse-item name="学生基本信息">
                <template slot="title">
                  <h1 style="color: #42b983">学生基本信息<i class="header-icon el-icon-info"></i></h1>
                </template>

                <!--表单-->  <!--:span控制区域长度-->
                <el-form ref="form" :model="form" :label-position="labelPosition"
                         label-width="100px" :inline="true" :rules="rules"
                         :hide-required-asterisk="isHide" label-suffix="：">
                  <el-row>
                    <el-col :span="8">
                      <el-tooltip content="不可修改" placement="top-start">
                        <div>
                          <!--prop对应的不单单是rules规则里面的验证项，同时对应着我们form-item下的v-model的值。prop绑定的类要与el-form-item下的v-model的值相对应。-->
                          <el-form-item label="姓名" prop="sname">
                            <el-input v-model="form.sname" readonly></el-input>
                          </el-form-item>
                        </div>
                      </el-tooltip>
                    </el-col>
                    <el-col :span="8">
                      <el-tooltip content="不可修改" placement="top-start">
                        <div>
                          <el-form-item label="性别">
                            <el-input v-model="form.sex" readonly></el-input>
                          </el-form-item>
                        </div>
                      </el-tooltip>
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="民族" prop="nation">
                          <el-input v-model="form.nation" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
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
                    <el-col :span="8">
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
                    <el-col :span="8">
                      <div class="grid-content bg-purple-light">
                        <el-form-item label="籍贯" prop="address">
                          <el-input v-model="form.address" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="联系电话"
                                      prop="tel">
                          <el-input v-model="form.tel" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="身份证号" prop="identity">
                          <el-input v-model="form.identity" class="width_idCard" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="毕业学校" prop="graduate">
                          <el-input v-model="form.graduate" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple-light">
                        <el-form-item label="专业" prop="major">
                          <el-input v-model="form.major" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="22">
                      <div class="grid-content bg-purple-dark">
                        <el-form-item label="备注">
                          <el-input type="textarea" v-model="form.remark" autosize class="width_mark"
                                    :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-form-item>
                    <el-button type="primary" @click="edit" v-if="!isEdit">编辑</el-button>
                    <el-button type="danger" @click="cancel_edit('form')" v-else>取消编辑</el-button>
                    <el-button type="primary" @click="onSubmit('form')" v-if="isEdit">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-collapse-item>

                <el-collapse-item name="学生成绩信息">
                  <template slot="title">
                    <h1 style="color: #42b983">
                      学生成绩<i class="header-icon el-icon-info"></i>
                    </h1>
                  </template>

                  <el-table highlight-current-row :data="table_course_score" border>
                    <template v-for="(head,index) in table_course_head">
                      <!--拼接''：格式转换--课程编号head.cno是number类型的，从后台接收的成绩json里cno是字符串，-->
                      <el-table-column :prop="head.cno + ''" :label="head.cname"></el-table-column>
                    </template>
                  </el-table>

                </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs';
  import navMenu from './navMenu.vue';

  export default {
    name: "studentIndex",
    props: {
      edit_user: function () {
        this.edit()
      }
    },
    components: {
      navMenu
    },
    data() {
      return {
        //学生个人数据
        form: {},
        //学生课程
        table_course_head: [],
        //学生课程成绩
        table_course_score: [],
        //表单右对齐
        labelPosition: 'right',
        //折叠面板默认开启
        activeNames: ['学生基本信息'],
        //是否编辑
        isEdit: false,
        isHide:true,
        //Todo  修改验证规则
        rules: {
          nation: [
            {required: true, message: '请输入所属民族', trigger: 'blur'},
          ],
          birthday:[
            {required:true,message:'请输入生日',trigger:'blur'}
          ],
          tel: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { pattern:/^([1][3,4,5,6,7,8,9]\d{9}$)/, message: '请输入正确的联系电话', trigger: 'blur'}
            ],
          identity:[
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { pattern:/^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/, message: '请输入正确的身份证号', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      //获取个人信息
      getAllInfo() {
        this.axios.get("getStudent/" + this.$store.getters.sno).then(res => {
          if (res.data.marriage == 0) {
            res.data.marriage = "未婚";
          } else {
            res.data.marriage = "已婚";
          }
          this.form = res.data;
        })
      },
      //获取课程信息
      getAllCourse() {
        this.axios.get("getAllCourse/" + this.form.classno).then(res => {
          this.table_course_head = res.data;
        })
      },
      //获取该学生的课程成绩
      getAllScore() {
        this.axios.get("getAllScore/" + this.form.sno).then(res => {
          this.table_course_score = res.data;
        })
      },
      //编辑信息
      edit(){
        this.isEdit = !this.isEdit;
        this.isHide = !this.isHide;
      },
      //取消编辑
      cancel_edit(form) {

        this.$refs[form].resetFields();

        this.getAllInfo();
        this.edit();
      },
      //修改信息提交
      onSubmit(form) {

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
            this.$message.error("请按要求填写");
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
    width: 180px;
    font-size: medium;
  }

  .el-select {
    width: 180px;
    font-size: medium;
  }

  .width_mark {
    width: 780px;
  }

  .width_idCard {
    width: 195px;
  }

</style>

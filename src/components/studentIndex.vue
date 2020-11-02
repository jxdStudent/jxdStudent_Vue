<template>
  <div>
    <div>
      <el-container>
        <el-header>
          <navMenu/>
        </el-header>
      </el-container>

      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">

            <!--折叠面板-->
            <el-collapse accordion v-model="activeNames">
              <el-collapse-item name="学生基本信息">
                <template slot="title">
                  <h1 style="color: #42b983">学生基本信息<i class="header-icon el-icon-info"></i></h1>
                </template>

                <!--表单-->  <!--:span控制input长度-->
                <el-form ref="form" :data="form" :label-position="labelPosition" :inline="true">

                  <el-form-item label="学号：" label-width="50">
                    <el-col>
                      <el-input v-model="form.classno"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <!--prop对应的不单单是rules规则里面的验证项，同时对应着我们form-item下的v-model的值。prop绑定的类要与el-form-item下的v-model的值相对应。-->
                        <el-form-item prop="sname">
                          <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：</label>
                          <el-input v-model="form.sname" readonly></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple-light">
                        <el-form-item label="性别：">
                          <el-input v-model="form.sex" readonly></el-input>
                        </el-form-item>
                      </div>
                    </el-col>

                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item prop="nation">
                          <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;民族：</label>
                          <el-input v-model="form.nation" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="婚否：">
                          <el-select v-model="form.marriage" :disabled="!isEdit">
                            <el-option value="未婚">未婚</el-option>
                            <el-option value="已婚">已婚</el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="出生年月：">
                          <el-date-picker type="date" placeholder="选择日期:"
                                          v-model="form.birthday" class="width_birthday"
                                          :disabled="!isEdit"></el-date-picker>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple-light">
                        <el-form-item label="籍贯：">
                          <el-input v-model="form.address" class="width_address" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">

                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="联系电话：">
                          <el-input v-model="form.tel" class="width_tel" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="身份证号：">
                          <el-input v-model="form.identity" class="width_idCard" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple-light"></div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="毕业学校：">
                          <el-input v-model="form.graduate" class="width_school" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple-light">
                        <el-form-item label="专业：">
                          <el-input v-model="form.major" class="width_major" :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple"></div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple-dark">
                        <el-form-item label="备注：">
                          <el-input type="textarea" v-model="form.remark" autosize class="width_mark"
                                    :disabled="!isEdit"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>

                  <el-form-item>
                    <el-button type="primary" @click="isEdit = !isEdit" v-if="!isEdit">编辑</el-button>
                    <el-button type="danger" @click="cancel_submit" v-else>取消编辑</el-button>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>

              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <div class="grid-content bg-purple">

            <!--折叠面板-->
            <el-collapse accordion v-model="activeNames">
              <el-collapse-item name="学生成绩信息">
                <template slot="title">
                  <h1 style="color: #42b983">学生成绩<i class="header-icon el-icon-info"></i></h1>
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
        //Todo  修改验证规则
        rules: {
          nation: [
            {required: true, message: '请输入所属民族', trigger: 'blur'},
            {type: 'String', message: '所属民族不能为数字', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      //获取个人信息
      getAllInfo() {
        this.axios.get("getStudent/" + this.$store.getters.sno).then(res => {
          this.$store.dispatch("setStudentClassno", res.data.classno);
          if (res.data.marriage == 0) {
            res.data.marriage = "未婚";
          } else {
            res.data.marriage = "已婚";
          }
          this.form = res.data;
        })
      },
      //获取课程信息
      //todo 获取所属班级的课程，不是全部的
      getAllCourse() {
        this.axios.get("getAllCourse/" + this.$store.getters.classno).then(res => {
          this.table_course_head = res.data;
        })
      },
      //获取该学生的课程成绩
      getAllScore() {
        this.axios.get("getAllScore/" + this.$store.getters.sno).then(res => {
          this.table_course_score = res.data;
        })
      },
      //取消编辑
      cancel_submit() {
        this.getAllInfo();
        this.isEdit = !this.isEdit;
      },
      //修改信息提交
      onSubmit() {
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
              message: '编辑信息成功',
              type: 'success'
            });
            this.isEdit = false;
          } else {
            this.$message({
              message: '编辑信息失败',
              type: 'success'
            });
          }
        });
      }
    },
    //加载执行
    mounted() {
      this.getAllInfo();
      this.getAllCourse();
      this.getAllScore();
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

  /*.width_birthday{
    width: 180px;
  }
  .width_address{
    width:150px;
  }
  .width_tel{
    width:180px;
  }

  .width_major{
    width:180px;
  }
  .width_school{
    width:180px;
  }*/
  .width_mark {
    width: 830px;
  }

  .width_idCard {
    width: 200px;
  }

</style>

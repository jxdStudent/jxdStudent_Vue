<template>
  <div>
    <h1 style="color: #42b983">员工评价信息<i class="header-icon el-icon-info"></i></h1>
      <el-row :gutter="20">
        <el-col :span="24" :offset="8">
          <div class="grid-content bg-purple">

                <!--表单-->  <!--:span控制input长度-->
                <el-form ref="form" :data="form" :label-position="labelPosition" :inline="true">
                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
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
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <el-form-item label="备注：">
                        <el-input type="textarea" v-model="form.remark"
                                  :disabled="!isEdit"></el-input>
                      </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                      </div>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <div class="grid-content bg-purple">
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div class="grid-content bg-purple">
                        <el-form-item>
                          <el-button type="primary" @click="isEdit = !isEdit" v-if="!isEdit">编辑</el-button>
                          <el-button type="danger" @click="cancel_submit" v-else>取消编辑</el-button>
                          <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple">
                      </div>
                    </el-col>
                  </el-row>

                </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Qs from 'qs';

  export default {
    name: "test",
    data() {
      return {
        //学生个人数据
        form: {},
        //表单右对齐
        labelPosition: 'right',
        //折叠面板默认开启
        activeNames: ['学生信息'],
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
        //待做：将传递参数改为动态的学生id--从vuex中读取
        this.axios.get("getStudent/10001").then(res => {
          if (res.data.marriage == 0) {
            res.data.marriage = "未婚"
          } else {
            res.data.marriage = "已婚"
          }
          this.form = res.data;
        })
      },
      //取消编辑
      cancel_submit() {
        this.getAllInfo();
        this.isEdit = !this.isEdit;
      },
      //修改信息提交
      onSubmit() {
        debugger
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
    width: 820px;
  }

  .width_idCard {
    width: 200px;
  }
</style>

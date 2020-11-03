<template>
  <div>
    <h1 style="color: #42b983">新增员工评价信息<i class="header-icon el-icon-info"></i></h1>
    <el-row :gutter="20">
      <el-col :span="24" :offset="8">
        <div class="grid-content bg-purple">

          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>

          <!--表单-->  <!--:span控制input长度-->
          <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" :label-width="width"  :inline="true" class="demo-ruleForm">
            <el-row >
              <el-col :span="8">
                <div class="grid-content bg-purple">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="经理编号：" >
                    <el-input type="text" v-model="form.mgr" disabled="true"></el-input>
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
                  <el-form-item label="员工编号：">
                    <el-input type="text" v-model="form.empno" disabled="true"></el-input>
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
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="积极性：" prop="initiative">
                    <el-select v-model="form.initiative">
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                </div>
              </el-col>
            </el-row>

            <el-row  v-show="false">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="评价类型:">
                    <el-input type="text" v-model="form.type"></el-input>
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
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="能力分数:" prop="ability" >
                    <el-select v-model="form.ability">
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
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
                  <el-form-item label="沟通交流：" prop="communicate">
                    <el-select v-model="form.communicate">
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
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
                  <el-form-item label="人品分数："  prop="quality">
                    <el-select v-model="form.quality">
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
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
                  <el-form-item label="性格分数：" prop="characterc">
                    <el-select v-model="form.characterc">
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
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
                  <el-form-item label="整体评价：" prop="mark">
                    <el-select v-model="form.mark">
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
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
                  <el-form-item label="文字评价：" prop="commentc">
                    <el-input type="textarea" v-model="form.commentc" autosize></el-input>
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
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
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
    data() {
      return {
        //表单数据
        form: {
          mgr:'',
          empno:'',
          type:'',
          ability:'',
          initiative:'',
          communicate:'',
          quality:'',
          characterc:'',
          mark:'',
          commentc:''
        },
        //表单右对齐
        labelPosition: 'right',
        width:"150px",
        rules: {
         ability: [
           { required: true, message: '请选择分数', trigger: 'change' }
          ],
          initiative: [
            { required: true, message: '请选择分数', trigger: 'change' }
          ],
          communicate: [
            { required: true, message: '请选择分数', trigger: 'change' }
          ],
          quality: [
            { required: true, message: '请选择分数', trigger: 'change' }
          ],
          characterc: [
            { required: true, message: '请选择分数', trigger: 'change' }
          ],
          mark: [
            { required: true, message: '请选择分数', trigger: 'blur' }
          ],
          commentc: [
            { required: true, message: '请输入评价内容', trigger: 'blur' },
            { min: 10,  message: '长度在 10 个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getQuery () {
        // 取到路由带过来的参数
        this.form.empno = this.$route.query.empno;
        this.form.type = this.$route.query.type;

        //通过getters属性获取仓库中的值
        var mgr = this.$store.getters.uid;
        this.form.mgr = mgr;
      },
      //重置表单
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      //信息提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)   //表单校验是否通过true或者false
          if (valid) {
            let formdata = this.form;
            //提交信息
            this.axios.post("insertDeptEvaluate", Qs.stringify(formdata)).then(res => {
              if (res.data) {
                this.$message("新增信息成功");
                //页面跳转
                this.$router.push({path:"/mgrIndex"})
              } else {
                this.$message("新增信息失败");
              }
            })
          } else {
            this.$message("输入有误");
          }
        });
      }
    },

    //加载执行
    mounted() {
      this.getQuery();
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getQuery'
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
    width: 820px;
  }

  .width_idCard {
    width: 200px;
  }
</style>

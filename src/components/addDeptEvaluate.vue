<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="8">
    <h1 style="color: #42b983">{{this.msg}}<i class="header-icon el-icon-info"/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   <el-link type="primary" @click="returnMgrIndex" icon="el-icon-s-home"style="font-size: 20px">返回首页</el-link></h1>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span="12" :offset="12">
        <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>



          <!--表单-->  <!--:span控制input长度-->
          <el-form ref="form" :model="form" :rules="rules" :label-position="labelPosition" :label-width="width"  :inline="true" class="demo-ruleForm">

            <el-row  v-show="false">
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="评价类型:">
                    <el-input type="text" v-model="form.type"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row v-show="false">
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="经理工号：" >
                    <el-input type="text" v-model="form.mgr" :disabled="true"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>


            <el-row >
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="员工工号：">
                    <el-input type="text" v-model="form.empno" :disabled="true"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="员工姓名：">
                    <el-input type="text" v-model="form.ename" :disabled="true"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="积极性：" prop="initiative" >
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
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="能力分数:" prop="ability" >
                    <el-select v-model="form.ability" >
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="沟通交流：" prop="communicate">
                    <el-select v-model="form.communicate" >
                      <el-option value="1">1分</el-option>
                      <el-option value="2">2分</el-option>
                      <el-option value="3">3分</el-option>
                      <el-option value="4">4分</el-option>
                      <el-option value="5">5分</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="人品分数："  prop="quality" >
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
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="性格分数：" prop="characterc" >
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
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="文字评价：" prop="commentc">
                    <el-input type="textarea" v-model="form.commentc" autosize></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="8">
                <div class="grid-content bg-purple">
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

          </el-form>
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
          ename:'',
          type:'',
          ability:'',
          initiative:'',
          communicate:'',
          quality:'',
          characterc:'',
          mark:0,
          commentc:''
        },
        //标题信息
        msg:'',
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
          commentc: [
            { required: true, message: '请输入评价内容', trigger: 'blur' },
            { min: 10,  message: '长度在 10 个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //返回首页
      returnMgrIndex(){
        this.$router.push({path: "/mgrIndex"});
      },
      getQuery () {
        // 取到路由带过来的参数
        this.form.empno = this.$route.query.empno;
        this.form.type = this.$route.query.type;
        this.form.ename = this.$route.query.ename;

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
      },
      getMsg(){
        if(this.form.type == 0){
          this.msg = "新增员工转正评价信息"
        }else if(this.form.type == 1){
          this.msg = "新增工作一年评价信息"
        }else if(this.form.type == 2){
          this.msg = "新增工作二年评价信息"
        }else if(this.form.type == 3){
          this.msg = "新增工作三年评价信息"
        }
      }

    },
    //加载执行
    mounted() {
      debugger
      this.getQuery();
      this.getMsg();
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

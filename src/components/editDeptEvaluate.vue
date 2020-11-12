<template>
  <div>
    <el-row>
      <el-col :span="13" :offset="7">
    <h1 style="color: #42b983">{{this.msg}}<i class="header-icon el-icon-info"></i>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   <el-link type="primary" @click="returnMgrIndex" icon="el-icon-s-home"style="font-size: 20px">返回首页</el-link></h1>
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
          <el-form ref="form" :data="form"  :label-position="labelPosition" :label-width="width"  :inline="true" >

            <el-row v-show="false" >
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="评价人员：" prop="mgr">
                    <el-input type="text" v-model="form.mgr"
                              :disabled="!isEdit"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="员工工号：" prop="empno">
                    <el-input type="text" v-model="form.empno"
                              :disabled="!isEdit" readonly></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="员工姓名：" prop="ename">
                    <el-input type="text" v-model="form.ename"
                              :disabled="!isEdit" readonly></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="积极性："  prop="initiative">
                    <el-select v-model="form.initiative" :disabled="!isEdit">
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

            <el-row v-show="false">
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="评价类型：" >
                    <el-input type="text" v-model="form.type"
                              :disabled="!isEdit"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="能力分数：" prop="ability" >
                    <el-select v-model="form.ability" :disabled="!isEdit">
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
                    <el-select v-model="form.communicate" :disabled="!isEdit">
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
                  <el-form-item label="人品分数："  prop="quality">
                    <el-select v-model="form.quality" :disabled="!isEdit">
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
                  <el-form-item label="性格分数：" prop="characterc">
                    <el-select v-model="form.characterc" :disabled="!isEdit">
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
                    <el-input type="textarea" v-model="form.commentc" autosize
                              :disabled="!isEdit"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8" :offset="8">
                <div class="grid-content bg-purple">
                  <el-form-item>
                    <el-button type="primary" @click="isEdit = !isEdit" v-if="!isEdit">编辑</el-button>
                    <el-button type="danger" @click="cancel_submit" v-else>取消编辑</el-button>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
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
          mgr: '',
          empno: '',
          ename:'',
          type: '',
          ability: '',
          initiative: '',
          communicate: '',
          quality: '',
          characterc: '',
          mark: 0,
          commentc: ''
        },
        //label-width和label-position一起使用可以设置表单左侧文字对齐
        //表单右对齐
        labelPosition: 'right',
        //label标签的宽度
         width:"150px",
        //是否编辑
        isEdit: false,
        //标题信息
        msg:''
      }
    },
    methods: {
      //返回首页
      returnMgrIndex(){
        this.$router.push({path: "/mgrIndex"});
      },
      getQuery() {
        //获取个人信息
        // 取到路由带过来的参数
        let empno = this.$route.query.empno;
        let type = this.$route.query.type;
        this.form.type = type;

        this.axios.get("getDeptEvaluate/" + empno + "/" + type).then(res => {
          this.form  = res.data[0];
        })
      },
      //取消编辑
      cancel_submit() {
        this.getQuery();
        this.isEdit = !this.isEdit;
      },
      //修改信息提交
      onSubmit() {
        if (this.isEdit == false) {
          this.$message("请先编辑内容");
        } else {
            debugger
            let formdata = this.form;
            //提交信息
            this.axios.post("updateDeptEvaluate", Qs.stringify(formdata)).then(res => {
              if (res.data) {
                this.$message("编辑信息成功");
                this.isEdit = false;

                //页面跳转
                this.$router.push({
                  path: "/getDeptEvaluate",
                  query: {
                    empno:this.$route.query.empno,
                    ename:this.$route.query.ename,
                    dname:this.$route.query.dname,
                    job:this.$route.query.job,
                    sno:this.$route.query.sno,
                    officialdate:this.$route.query.officialdate
                  }

                })

              } else {
                this.$message("编辑信息失败");
              }
            })
        }
      },
      getMsg(){
        if(this.form.type == 0){
          this.msg = "编辑转正评价信息"
        }else if(this.form.type == 1){
          this.msg = "编辑工作一年评价信息"
        }else if(this.form.type == 2){
          this.msg = "编辑工作二年评价信息"
        }else if(this.form.type == 3){
          this.msg = "编辑工作三年评价信息"
        }
      }

    },
      //加载执行
      mounted() {
        this.getQuery();
        this.getMsg();
      },
      watch: {
        //监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
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

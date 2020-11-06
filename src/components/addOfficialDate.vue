<template>
  <div>

    <el-row>
      <el-col :span="12" :offset="8">
        <h1 style="color: #42b983">添加转正时间<i class="header-icon el-icon-info"/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   <el-link type="primary" @click="returnMgrIndex" icon="el-icon-s-home"style="font-size: 20px">返回首页</el-link></h1>
      </el-col>
    </el-row>

<el-form ref="form" :model="form" :rules="rules"  :label-position="labelPosition" :label-width="width" class="demo-ruleForm">

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

  <el-row >
    <el-col :span="8" :offset="7">
      <div class="grid-content bg-purple">
        <el-form-item label="转正日期：" prop="date" >
              <el-date-picker type="date" placeholder="请选择转正日期" v-model="form.date" :picker-options="pickerOptions1" style="width: 100%"></el-date-picker>
        </el-form-item>
      </div>
    </el-col>
  </el-row>

  <el-row >
  <el-col :span="8" :offset="6">
    <div class="grid-content bg-purple">
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </div>
  </el-col>
  </el-row>

</el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          empno:'',
          ename:'',
          date: '',
        },
        //表单右对齐
        labelPosition: 'right',
        width:"150px",
        rules: {
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        },
        pickerOptions1: {
          disabledDate(time) {
            //选择今天及以后的时间
            //return time.getTime() < Date.now() - 8.64e7  //如果没有后面的-8.64e7就是不可以选择今天的

            // 选择当前的日期之前的时间
            return time.getTime() > Date.now()

          }
        },
      };
    },
    methods: {
      //获取的时间对象转字符串
      transformation(times){
        var time=times;
        var time1 = time.getTime();
        var date = new Date(time1),
          Y = date.getFullYear() + '-',
          M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
          D = date.getDate()
        var current=Y+M+D;
        return current
      },
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            //提交信息
            let time =  this.transformation(this.form.date);
            console.log(time);
            debugger
            this.axios.get("addOfficialDate/"+this.form.empno+"/"+time).then(res => {
              if (res.data) {
                this.$message("添加转正时间成功");
                //页面跳转
                this.$router.push({path:"/mgrIndex"})
              } else {
                this.$message("添加转正时间失败");
              }
            })
          } else {
            this.$message("输入有误");
          }
        });
      },
      //重置表单
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      //返回首页
      returnMgrIndex(){
        this.$router.push({path: "/mgrIndex"});
      },
      getQuery () {
        // 取到路由带过来的参数
        this.form.empno = this.$route.query.empno;
        this.form.ename = this.$route.query.ename;
      },



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

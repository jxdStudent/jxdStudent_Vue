<template>
    <div>
      <el-collapse accordion v-model="activeNames" @change="getEvaluate">
      <el-collapse-item name="0">
        <template slot="title">
          <h1 style="color: #42b983">
            {{ename}}&nbsp;&&nbsp;转正评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

        <EmpEvaluate_part :isYear="isYear" :table_evaluate="table_evaluate" v-if="table_evaluate"></EmpEvaluate_part>
        <p style="color:red;font-size: 30px;font-family: 华文宋体" v-else>暂未评价</p>

      </el-collapse-item>

        <el-collapse-item name="1">
        <template slot="title">
          <h1 style="color: #42b983">
            {{ename}}&nbsp;&&nbsp;第一年评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

          <EmpEvaluate_part :isYear="isYear" :table_evaluate="table_evaluate" v-if="table_evaluate"></EmpEvaluate_part>
          <p style="color:red;font-size: 30px;font-family: 华文宋体" v-else>暂未评价</p>
      </el-collapse-item>


        <el-collapse-item name="2">
        <template slot="title">
          <h1 style="color: #42b983">
            {{ename}}&nbsp;&&nbsp;第二年评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

          <EmpEvaluate_part :isYear="isYear" :table_evaluate="table_evaluate" v-if="table_evaluate"></EmpEvaluate_part>
          <p style="color:red;font-size: 30px;font-family: 华文宋体" v-else>暂未评价</p>
      </el-collapse-item>


        <el-collapse-item name="3">
        <template slot="title">
          <h1 style="color: #42b983">
            {{ename}}&nbsp;&&nbsp;第三年评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

          <EmpEvaluate_part :isYear="isYear" :table_evaluate="table_evaluate" v-if="table_evaluate"></EmpEvaluate_part>
          <p style="color:red;font-size: 30px;font-family: 华文宋体" v-else>暂未评价</p>
      </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
  import EmpEvaluate_part from './EmpEvaluate_part.vue'
    export default {
        name: "EmpEvaluate",
      components:{
        EmpEvaluate_part:EmpEvaluate_part
      },
      props: {
        ename:{
          type:String,
          required: true
        }
      },
      data(){
          return{
            //员工的评价
            table_evaluate:[],
            //第几年的评价
            isYear:null,
            //折叠面板
            activeNames:'0'
          }
      },
      methods:{
          //根据打开的第几行，传递index，查找第几年的评价
        getEvaluate(index) {
          //this.$parent.activeNames="";
          /*var index_now = "";
          for (let i = 0; i < index.length; i++) {
            index_now=index[i]
          }*/
          //点击查看评价，隐藏基本信息
          if (index != "") {
            this.isYear = index;
            this.axios.get("getDeptEvaluate/" + this.$store.getters.studentNo + "/" + index).then(res => {
              //todo
              if (res.data[0]) {
                this.table_evaluate = res.data
              } else {
                this.table_evaluate = res.data[0]
              }
            })
          }
        },
        getEvaluateOfGraduate() {
          //this.$parent.activeNames="";
          /*var index_now = "";
          for (let i = 0; i < index.length; i++) {
            index_now=index[i]
          }*/
          //点击查看评价，隐藏基本信息

            this.isYear = 0;
            this.axios.get("getDeptEvaluate/" + this.$store.getters.studentNo + "/0").then(res => {
              //todo
              if (res.data[0]) {
                this.table_evaluate = res.data
              } else {
                this.table_evaluate = res.data[0]
              }
            })

        },
      },
      mounted(){
          //this.getEvaluate()
        this.getEvaluateOfGraduate();

      }
    }
</script>

<style scoped>

</style>

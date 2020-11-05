<template>
    <div>
      <el-collapse accordion v-model="activeNames" @change="getEvaluate">
      <el-collapse-item name="0">
        <template slot="title">
          <h1 style="color: #42b983">
            {{$store.state.uname}}&nbsp;&&nbsp;转正评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

        <EmpEvaluate_part v-bind:table_evaluate="table_evaluate"></EmpEvaluate_part>

      </el-collapse-item>

        <el-collapse-item name="1">
        <template slot="title">
          <h1 style="color: #42b983">
            {{$store.state.uname}}&nbsp;&&nbsp;第一年评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

          <EmpEvaluate_part v-bind:table_evaluate="table_evaluate"></EmpEvaluate_part>

      </el-collapse-item>


        <el-collapse-item name="2">
        <template slot="title">
          <h1 style="color: #42b983">
            {{$store.state.uname}}&nbsp;&&nbsp;第二年评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

          <EmpEvaluate_part v-bind:table_evaluate="table_evaluate"></EmpEvaluate_part>

      </el-collapse-item>


        <el-collapse-item name="3">
        <template slot="title">
          <h1 style="color: #42b983">
            {{$store.state.uname}}&nbsp;&&nbsp;第三年评价<i class="header-icon el-icon-info"></i>
          </h1>
        </template>

          <EmpEvaluate_part v-bind:table_evaluate="table_evaluate"></EmpEvaluate_part>

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
      data(){
          return{
            table_evaluate:[],
            activeNames:[]
          }
      },
      methods:{
          //根据打开的第几行，传递index，查找第几年的评价
        getEvaluate(index) {
          this.axios.get("getDeptEvaluate/" + this.$store.getters.studentno + "/" + index).then(res => {
            if (res.data) {
              var table_evaluate_json = [];
              table_evaluate_json.push(res.data);
              this.table_evaluate = table_evaluate_json;
            }else{
              this.table_evaluate =[]
            }
          })
        },
      },
      mounted(){
          //this.getEvaluate()
      }
    }
</script>

<style scoped>

</style>

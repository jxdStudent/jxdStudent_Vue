<template>
  <div>
    <table>
      <tr>
        <td colspan="10" class="td_score">
          <div v-if="isYear == '0'">
            <h1>转正工作评价</h1>
          </div>
          <div v-else>
            <h1>工作{{isYear}}年工作评价</h1>
          </div>
        </td>
      </tr>
      <tr>
        <td rowspan="2" class="td_score">项目</td>
        <td rowspan="2" class="td_score">员工部门</td>
        <td rowspan="2" class="td_score">员工职务</td>
        <td rowspan="2" class="td_score">评价人</td>
        <td colspan="5" class="td_score">评价分项</td>
        <td rowspan="2" class="td_score">整体评价分数</td>
      </tr>
      <tr>
        <td class="td_score">
          能力
          <!--<el-table
            :data="table_evaluate"

            border
            style="width: 100%">
            &lt;!&ndash;  <template slot="empty">
                <span style="color:red;font-size: 30px;font-family: 华文宋体">尚未评价</span>
              </template>&ndash;&gt;
            <el-table-column
              prop="ability"
              label="能力">
            </el-table-column>
            <el-table-column
              prop="initiative"
              label="积极性">
            </el-table-column>
            <el-table-column
              prop="communicate"
              label="沟通交流">
            </el-table-column>
            <el-table-column
              prop="quality"
              label="人品">
            </el-table-column>
            <el-table-column
              prop="characterc"
              label="性格">
            </el-table-column>
          </el-table>-->
        </td>
        <td class="td_score">
          积极性
        </td>
        <td class="td_score">
          沟通交流
        </td>
        <td class="td_score">
          人品
        </td>
        <td class="td_score">
          性格
        </td>
      </tr>
      <tr>
        <td class="td_score">工作评价</td>
        <td class="td_score">
          {{deptName}}
        </td>
        <td class="td_score">
          {{job}}
        </td>
        <td class="td_score">
          {{mgr}}
        </td>
        <td class="td_score">
          {{table_evaluate[0].ability}}
        </td>
        <td class="td_score">
          {{table_evaluate[0].initiative}}
        </td>
        <td class="td_score">
          {{table_evaluate[0].communicate}}
        </td>
        <td class="td_score">
          {{table_evaluate[0].quality}}
        </td>
        <td class="td_score">
          {{table_evaluate[0].characterc}}
        </td>


        <td class="td_score">
          <el-input v-model="table_evaluate[0].mark"  readonly></el-input>
        </td>
      </tr>
      <tr>
        <td class="td_score_evaluate">评价（包括主要优点及缺陷）</td>
        <td colspan="9" class="td_score">
          {{table_evaluate[0].commentc}}
          <!--<el-input class="score_evaluate" readonly></el-input>-->
        </td>
      </tr>
    </table>

  </div>
</template>

<script>

  export default {
    name: "EmpEvaluate_partInAdmin",
    data() {
      return {
        mgr:null,
        deptName:null,
        job:null
      }
    },
    props: {
      //接收EmpEvaluate.vue传递过来的数据
      table_evaluate: {
        type: Array,
        required: true
      },
      isYear:{
        type:String,
        required: true
      }
    },
    methods:{
      getMgrByEmpno(){
        this.axios.get("getMgrByEmpno/" + this.$store.getters.studentNo).then(res =>{
          if (res.data){
            this.mgr = res.data
          }
        })
      },
      getDeptByEmpno(){
        this.axios.get("getDeptByEmpno/" + this.$store.getters.studentNo).then(res =>{
          if (res.data){
            this.deptName = res.data[0].dname;
            this.job = res.data[0].job;
          }
        })
      }
    },
    mounted(){
      this.getMgrByEmpno();
      this.getDeptByEmpno();
    }
  }
</script>

<style scoped>
  .el-table{
    /*width: 410px!important;*/
    border: #000000;
  }
  .el-table{ color: black; }

  table,td{
    border-collapse: collapse;
    border: 1px black solid;
    margin: 0px;
  }
  .td_score{
    height: 35px;
    width: 100px;
  }
  .td_score_evaluate{
    height: 120px;
  }
  .score_evaluate{
    width: 240px;
    height: 60px;
  }
</style>

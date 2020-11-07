<template>
  <div>
    <el-table
      :data="table_evaluate"

      border
      style="width: 100%">
      <template slot="empty">
        <span style="color:red;font-size: 30px;font-family: 华文宋体">尚未评价</span>
      </template>
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
      <el-table-column
        prop="mark"
        label="整体评价分数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    name: "EmpEvaluate_part",
    data() {
      return {

      }
    },
    props: {
      //接收EmpEvaluate.vue传递过来的数据
      table_evaluate: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <el-container>
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="sno"
            label="学号"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="姓名"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            label="成绩"
            align="center">
            <el-table-column
              v-for="item in table_course_head"
              :prop="item.cno+''"
              :label="item.cname"
              align="center">
<!--              //此处调用自定义组件（dataIndex 为表头数据中字段，相当于 展示表头 老师对应的 teacher名称）-->
<!--              <template slot-scope="scope">-->
<!--                <span v-if="item.cno !== 'batchInvest' && item.cno !== 'remark'">{{scope.row[item.cno]}}</span>-->
<!--                // 若需要格式化数据 可设置 :format-data="formatFun" formatFun此方法在当前页methods中定义即可-->
<!--                <edit-cell v-else v-model="scope.row[item.cno]" :can-edit="true"/>-->
<!--              </template>-->
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop=""
            label="整体评价"
            width="200"
            align="center">
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="sevaluate"
            label="评价"
            header-align="center">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import navMenu from "./navMenu";
import EditCell from "./EditCell";

export default {
  name: "StudentScore",
  components: {navMenu, EditCell},
  data() {
    return {
      tableData: [
        {
          // seen: false,
          // sno: 10001,
          // sname: "张三",
          // sevaluate: "1111111111111111",
        }
      ],
      table_course_head: [
        // {
        //   cno: "1",
        //   cname: "java"
        // },
        // {
        //   cno: "2",
        //   cname: "html"
        // },
        // {
        //   cno: "3",
        //   cname: "sql"
        // }
      ],
      table_course_score: []
    }
  },
  methods: {
    getStudent() {
      var name = this.$store.getters.uname;
      axios.get("http://localhost:8081/getStudent/" + this.$store.getters.studentNo).then(res => {
        this.tableData = res.data;
      })
    },
    //获取课程信息
    getAllCourse(){
      this.axios.get("getAllCourse").then(res =>{
        this.table_course_head = res.data;
      })
    },
    //获取该学生的课程成绩
    getAllScore(){
      this.axios.get("getAllScore/" + this.$store.getters.sno).then(res =>{
        this.table_course_score = res.data;
      })
    },
  },
  mounted() {
    this.getStudent();
    this.getAllCourse();
    this.getAllScore();
  }
}
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
  line-height: 90px;
  margin-top: -50px;
}

.el-footer {
  background-color: #d9ecff;
}

.el-table .warning-row {
  background: oldlace;
}
</style>

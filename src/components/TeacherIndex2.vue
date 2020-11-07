<template>
  <div>
    <el-container>
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="$route.path"
            :unique-opened="true"
            @select="handleSelect"
            default-active="teacherIndex2"
            class="el-menu-vertical-demo">
            <el-menu-item index="teacherIndex">
              <i class="el-icon-menu"></i>
              <span slot="title">学生信息表</span>
            </el-menu-item>
            <el-menu-item index="teacherIndex2">
              <i class="el-icon-document"></i>
              <span slot="title">学生成绩表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            :default-sort="{prop: 'sno'}">
            <template
              v-for="(item,index) in tableHead">
              <el-table-column
                :prop="item.column_name"
                :label="item.column_comment"
                :key="index"
                v-if="item.column_name != 'id'">
              </el-table-column>
            </template>
            <el-table-column
              fixed="right"
              label="操作"
              width="180"
              align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="toStudentScore(scope.row.sno)">评价
                </el-button>
                <el-button
                  size="mini"
                  @click="">转正
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navMenu from "./navMenu";

export default {
  name: "TeacherIndex2",
  components: {navMenu},
  data() {
    return {
      tableHead:[
        {
          column_name: "sno", column_comment: "学号"
        },
        {
          column_name: "sname", column_comment: "姓名"
        },
        {
          column_name: "classno", column_comment: "班期"
        },
        {
          column_name: "java", column_comment: "Java"
        },
        {
          column_name: "html", column_comment: "Html"
        },
        {
          column_name: "oracle", column_comment: "Oracle"
        },
        {
          column_name: "total_score", column_comment: "总分"
        },
      ],
      tableData: [
        {
          sno: 10001,
          sname: "张三",
          classno: 47,
          java: 5,
          html: 5,
          oracle: 5,
          total_score:15
        }
      ]
    }
  },
  methods: {
    getAllStudentInfoWithScore() {

    },
    handleSelect(path){
      this.$router.push(path)
    },
    toStudentScore(sno) {
      this.$store.dispatch("setSno", sno);
      this.$router.push({path: "/studentScore"});
    },
  },
  mounted() {
    this.getAllStudentInfoWithScore();
  }
}
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: #333;
}

.el-footer {
  background-color: #d9ecff;
}
</style>

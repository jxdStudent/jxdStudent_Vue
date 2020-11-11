<template>
    <div>
      <el-collapse-item name="学生成绩信息" v-if="isStudent">
        <template slot="title">
          <h1 style="color: #42b983">
            {{$store.state.uname}}&nbsp;&&nbsp;成绩<i class="header-icon el-icon-info"></i>
          </h1>
        </template>
        <div v-if="isShowScore">
          <el-table highlight-current-row :data="table_course_score"
                    border empty-text="加载失败，请稍后再试！">

            <!--评价老师-->
            <!--<el-table-column label="老师">{{tname}}</el-table-column>-->

            <template v-for="(head,index) in table_course_head">
              <el-table-column :prop="head.cno + ''" :label="head.cname"></el-table-column>
            </template>

            <el-table-column
              prop="score_total"
              label="综合成绩"
              style="background-color: #409EFF">
            </el-table-column>
          </el-table>
        </div>
        <div v-else style="color: red;font-size: 30px;font-family: 华文宋体">
          <p>暂未评价</p>
        </div>
      </el-collapse-item>
      <table>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td>培训学校</td>
          <td>班期</td>
          <td>评价人</td>
          <td ></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>整体评价分数</td>
        </tr>
      </table>
    </div>
</template>

<script>
    export default {
        name: "studentScoreBySno",
      data(){
          return{
            //学生课程
            table_course_head: [],

            //学生课程成绩
            table_course_score: [],
          }
      },
      methods:{
        //获取课程信息
        getAllCourse() {
          this.axios.get("getAllCourse/" + 47).then(res => {
            this.table_course_head = res.data;
            this.tname = res.data[0].tname;
          })
        },
        //获取该学生的课程成绩
        getAllScore() {
          this.axios.get("getAllScore/" + 10001).then(res => {
            if (res.data[0].score_total == 0){
              this.isShowScore = false;
              return;
            }
            this.table_course_score = res.data;
          })
        },
      },
      mounted() {
          this.getAllCourse();
          this.getAllScore();
      }
    }
</script>

<style scoped>

</style>

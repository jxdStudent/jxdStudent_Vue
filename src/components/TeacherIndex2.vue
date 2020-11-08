<template>
  <div>
    <el-container>
      <el-header>
        <navMenu></navMenu>
      </el-header>
      <el-container>
        <el-aside width="150px">
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
                align="center"
                sortable
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
                  @click="toStudentScore(scope.row.sno, scope.row.classno, scope.row.sname)">评价
                </el-button>
                <el-button
                  size="mini"
                  @click="dialogVisible = true">毕业
                </el-button>
                <el-dialog
                  :modal-append-to-body='false'
                  title="毕业页面"
                  :visible.sync="dialogVisible"
                  width="40%">
                  <el-row>
                    <el-col :span="18" :offset="4">
                      <el-form :model="form">
                        <el-form-item label="是否毕业">
                          <el-select v-model="form.graduated">
                            <el-option label="已毕业" value="1"></el-option>
                            <el-option label="未毕业" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submit_graduated">确 定</el-button>
                </span>
                </el-dialog>
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
import axios from "axios";

export default {
  name: "TeacherIndex2",
  components: {navMenu},
  data() {
    return {
      tableHead: [],
      tableData: [],
      dialogVisible: false,
      form: {
        graduated: '1',
      }
    }
  },
  mounted() {
    this.getTableHead();
    this.getTableData();
  },
  methods: {
    getTableHead() {
      var table_head = [
        {
          column_name: "sno", column_comment: "学号"
        },
        {
          column_name: "sname", column_comment: "姓名"
        },
        {
          column_name: "classno", column_comment: "班期"
        }
      ];
      axios.get("/getAllCourse").then(res => {
        for (let i = 0; i < res.data.length; i++) {
          var table_head_obj = {};
          table_head_obj.column_name = res.data[i].cno + "";
          table_head_obj.column_comment = res.data[i].cname;
          table_head.push(table_head_obj);
        }
      })
      this.tableHead = table_head;
    },
    getTableData() {
      axios.get("/getAllStudentScoreWithInfo/" + this.$store.getters.uid).then(res => {
        this.tableData = res.data;
      })
    },
    handleSelect(path) {
      this.$router.push(path)
    },
    toStudentScore(sno, classno, sname) {
      this.$store.dispatch("setSno", sno);
      this.$store.dispatch("setClassNo", classno);
      this.$store.dispatch("setSname", sname);
      this.$router.push({path: "/studentScore"});
    },
    submit_graduated() {

    }
  },

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

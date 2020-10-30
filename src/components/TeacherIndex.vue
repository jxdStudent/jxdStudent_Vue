<template>
<div>
  <el-container>
    <el-header>
      <NavMenu></NavMenu>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table
          :data="tableData"
          border
          stripe
          height="100%"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column
            prop="sno"
            label="学号"
            sortable
            width="100"
            align="right">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="姓名"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="nation"
            label="民族"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="classno"
            label="班期"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="手机号"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            prop="graduate"
            label="毕业院校"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="major"
            label="所学专业"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="identity"
            label="身份证号"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="300"
            align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="">编辑</el-button>
              <el-button
                size="mini"
                @click="">编辑</el-button>
              <el-button
                size="mini"
                @click="">编辑</el-button>
              <el-button
                size="mini"
                @click="">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>

import NavMenu from "./navMenu";
export default {
name: "TeacherIndex",
  components: {NavMenu},
  data() {
    return {
      tableData: [{
        sno: 10001,
        sname: "张三",
        sex: "男",
        nation: "汉族",
        birthday: "1999-09-09",
        identity: 145623988709675467,
        classno: 47,
        tel: 177777777,
        address: "山东省济南市高新区",
        graduate: "中国大学",
        major: "计算机技术",
      }, {
        sno: 10002,
        sname: "张三",
        sex: "男",
        nation: "汉族",
        birthday: "1999-09-09",
        identity: 145623988709675467,
        classno: 47,
        tel: 177777777,
        address: "山东省济南市高新区",
        graduate: "中国大学",
        major: "计算机技术",
      }, {
        sno: 10003,
        sname: "张三",
        sex: "男",
        nation: "汉族",
        birthday: "1999-09-09",
        identity: 145623988709675467,
        classno: 47,
        tel: 177777777,
        address: "山东省济南市高新区",
        graduate: "中国大学",
        major: "计算机技术",
      }, {
        sno: 10004,
        sname: "张三",
        sex: "男",
        nation: "汉族",
        birthday: "1999-09-09",
        identity: 145623988709675467,
        classno: 47,
        tel: 177777777,
        address: "山东省济南市高新区",
        graduate: "中国大学",
        major: "计算机技术",
      }, {
        sno: 10005,
        sname: "张三",
        sex: "男",
        nation: "汉族",
        birthday: "1999-09-09",
        identity: 145623988709675467,
        classno: 47,
        tel: 177777777,
        address: "山东省济南市高新区",
        graduate: "中国大学",
        major: "计算机技术",
      }, {
        sno: 10006,
        sname: "张三",
        sex: "男",
        nation: "汉族",
        birthday: "1999-09-09",
        identity: 145623988709675467,
        classno: 47,
        tel: 177777777,
        address: "山东省济南市高新区",
        graduate: "中国大学",
        major: "计算机技术",
      }, {
        sno: 10007,
        sname: "张三",
        sex: "男",
        nation: "汉族",
        birthday: "1999-09-09",
        identity: 145623988709675467,
        classno: 47,
        tel: 177777777,
        address: "山东省济南市高新区",
        graduate: "中国大学",
        major: "计算机技术",
      }]
    }
  },
  methods: {
    getAllStudent: function () {
      Axios.get("http://localhost:8081/getAllStudent").then(res => {
        this.tableData = res.data;
      })
    }
  },
  mounted() {
    this.getAllStudent();
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

.el-aside {
  color: #C0C4CC;
}

.el-footer {
  background-color: #d9ecff;
}
</style>

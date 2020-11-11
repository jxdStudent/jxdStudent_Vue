<template>
  <div>
    <!--叶子级菜单-->
    <template v-if="item.children && item.children.length === 0">
      <el-menu-item style="font-size: 17px;" :key="item.id" :index="item.path"
                    class="item.iconCls" @click="handleRoute(item)">
        <i :class="item.iconCls"></i>
        {{item.nameZh}}
      </el-menu-item>
    </template>
    <!--父级菜单-->
    <el-submenu v-else :index="item.path">
      <span slot="title" style="font-size: 17px;">
        <i :class="item.iconCls"></i>
        {{item.nameZh}}
      </span>
      <template v-for="child in item.children">
        <navigation-item v-if="child.children && child.children.length>0" :key="child.id" :item="child"/>
        <el-menu-item v-else :key="child.id" :index="child.path" @click="handleRoute(child)">
          <i :class="child.icon"></i>
          {{child.nameZh}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
  <!--<div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      :unique-opened="true"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="studentInfoInAdmin">
        <i class="el-icon-location"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="teacherInfoInAdmin">
        <i class="el-icon-menu"></i>
        <span slot="title">老师管理</span>
      </el-menu-item>
      <el-menu-item index="deptInfoInAdmin">
        <i class="el-icon-document"></i>
        <span slot="title">部门管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>学期管理</span>
        </template>
        <el-menu-item index="classInfoInAdmin">
          <i class="el-icon-document"></i>
          <span slot="title">学期管理</span>
        </el-menu-item>
        <el-menu-item index="courseInfoInAdmin">
          <i class="el-icon-document"></i>
          <span slot="title">课程管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="accountInfoInAdmin">
        <i class="el-icon-setting"></i>
        <span slot="title">账号管理</span>
      </el-menu-item>
    </el-menu>
  </div>-->
</template>

<script>
  export default {
    name: "navMenuSide",
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        /*isCollapse: true*/
        defaultActive: '', //关键   当前激活菜单的 index
      };
    },
    /*watch: {
      $route () {
        this.setCurrentRoute()
      }
    },*/
    methods: {
      handleRoute (menu) {
        // 通过菜单URL跳转至指定路由
        this.$router.push(menu.path)
      },
      // 用于清空左栏菜单绑定的高亮样式
      handleSelect(){
        this.activePath=''//这是左侧菜单绑定的default-active，使它变成空就可以实现。
      },
      /*setCurrentRoute () {
        this.defaultActive = this.$route.path;//关键   通过他就可以监听到当前路由状态并激活当前菜单
      }*/
      /*handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(path){
        this.$router.push(path)
      },*/
    },
    mounted() {
      /*let href = window.location.href;
      this.defaultActive = href.split("/#")[1];*/
      let defaultMenu = window.location.hash.substr(
        window.location.hash.indexOf("/")
      );
      this.defaultActive = defaultMenu;
    },
    /*created () {
      this.setCurrentRoute()
    }*/
  }
</script>

<style scoped>

</style>

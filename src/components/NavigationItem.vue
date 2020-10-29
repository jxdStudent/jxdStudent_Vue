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
</template>

<script>
    export default {
      name: "NavigationItem",
      props: {
        item: {
          type: Object,
          required: true
        }
      },
      methods: {
        handleRoute (menu) {
          // 通过菜单URL跳转至指定路由
          this.$router.push(menu.path)
        }
      }

    }
</script>

<style scoped>

</style>

import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import adminIndex from "../components/adminIndex";
import TeacherIndex from "../components/TeacherIndex";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/adminIndex',
      name: 'adminIndex',
      component: adminIndex
    },
    {
      path: '/teacherIndex',
      name: 'teacherIndex',
      component: TeacherIndex
    }
  ]
})

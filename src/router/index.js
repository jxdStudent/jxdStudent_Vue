import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import adminIndex from "../components/admin/adminIndex";
import TeacherIndex from "../components/TeacherIndex";
import studentInfoInAdmin from "../components/admin/studentInfoInAdmin";
import accountInfoInAdmin from "../components/admin/accountInfoInAdmin";
import axios from 'axios'
axios.defaults.baseURL='http://localhost:8081/'
Vue.prototype.axios = axios

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
    },
    {
      path: '/studentInfoInAdmin',
      name: 'studentInfoInAdmin',
      component: studentInfoInAdmin
    },
    {
      path: '/accountInfoInAdmin',
      name: 'accountInfoInAdmin',
      component: accountInfoInAdmin
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import studentIndex from "../components/studentIndex"
import adminIndex from "../components/admin/adminIndex";
import TeacherIndex from "../components/TeacherIndex";
import StudentScore from "../components/StudentScore";
import studentInfoInAdmin from "../components/admin/studentInfoInAdmin";
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
      path: '/studentIndex',
      name: 'studentIndex',
      component: studentIndex
    },
    {
      path: '/teacherIndex',
      name: 'teacherIndex',
      component: TeacherIndex
    },
    {
      path: '/studentScore',
      name: 'studentScore',
      component: StudentScore
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

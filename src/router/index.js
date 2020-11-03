import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import studentIndex from "../components/studentIndex"
import adminIndex from "../components/admin/adminIndex";
import TeacherIndex from "../components/TeacherIndex";
import StudentScore from "../components/StudentScore";
import studentInfoInAdmin from "../components/admin/studentInfoInAdmin";
import accountInfoInAdmin from "../components/admin/accountInfoInAdmin";
import teacherInfoInAdmin from "../components/admin/teacherInfoInAdmin";
import deptInfoInAdmin from "../components/admin/deptInfoInAdmin";
import courseInfoInAdmin from "../components/admin/courseInfoInAdmin";
import classInfoInAdmin from "../components/admin/classInfoInAdmin";
import empInfoInAdmin from "../components/admin/empInfoInAdmin";
import mgrIndex from "../components/mgrIndex";
import addDeptEvaluate from "../components/addDeptEvaluate";
import getDeptEvaluate from "../components/getDeptEvaluate";



import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081/'
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
      component: adminIndex,
      redirect:"/studentInfoInAdmin",
      children: [
        {
          path: '/studentInfoInAdmin',
          name: 'studentInfoInAdmin',
          component: studentInfoInAdmin
        },
        {
          path: '/teacherInfoInAdmin',
          name: 'teacherInfoInAdmin',
          component: teacherInfoInAdmin
        },
        {
          path: '/deptInfoInAdmin',
          name: 'deptInfoInAdmin',
          component: deptInfoInAdmin
        },
        {
          path: '/courseInfoInAdmin',
          name: 'courseInfoInAdmin',
          component: courseInfoInAdmin
        },
        {
          path: '/classInfoInAdmin',
          name: 'classInfoInAdmin',
          component: classInfoInAdmin
        },{
          path: '/accountInfoInAdmin',
          name: 'accountInfoInAdmin',
          component: accountInfoInAdmin
        }
      ]
    },
    {
      path: '/teacherIndex',
      name: 'teacherIndex',
      component: TeacherIndex
    },
    {
      path: '/studentIndex',
      name: 'studentIndex',
      component: studentIndex
    },
    {
      path: '/mgrIndex',
      name: 'mgrIndex',
      component: mgrIndex
    },
    {
      path: '/addDeptEvaluate',
      name: 'addDeptEvaluate',
      component: addDeptEvaluate
    },
    {
      path: '/getDeptEvaluate',
      name: 'getDeptEvaluate',
      component: getDeptEvaluate
    },
    {
      path: '/empInfoInAdmin',
      name: 'empInfoInAdmin',
      component: empInfoInAdmin
    },
    {
      path: '/StudentScore',
      name: 'StudentScore',
      component: StudentScore
    }
  ]
})

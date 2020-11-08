import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import InfoIndex from "../components/InfoIndex"
import adminIndex from "../components/admin/adminIndex";
import TeacherIndex from "../components/TeacherIndex";
import TeacherIndex2 from "../components/TeacherIndex2";
import StudentScore from "../components/StudentScore";
import studentInfoInAdmin from "../components/admin/studentInfoInAdmin";
import accountInfoInAdmin from "../components/admin/accountInfoInAdmin";
import teacherInfoInAdmin from "../components/admin/teacherInfoInAdmin";
import deptInfoInAdmin from "../components/admin/deptInfoInAdmin";
import courseInfoInAdmin from "../components/admin/courseInfoInAdmin";
import classInfoInAdmin from "../components/admin/classInfoInAdmin";
import empInfoInAdmin from "../components/admin/empInfoInAdmin";
import test from "../components/admin/test";
import mgrIndex from "../components/mgrIndex";
import addDeptEvaluate from "../components/addDeptEvaluate";
import getDeptEvaluate from "../components/getDeptEvaluate";
import getDeptStudentScore from "../components/getDeptStudentScore";
import editDeptEvaluate from "../components/editDeptEvaluate";

import StudentScoreInAdmin from "../components/admin/StudentScoreInAdmin"
import TeacherIndexInAdmin from "../components/admin/TeacherIndexInAdmin";
import EmpEvaluate from "../components/EmpEvaluate";
import EmpEvaluate_part from "../components/EmpEvaluate_part";
import addOfficialDate from "../components/addOfficialDate";


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
      redirect:"/TeacherIndexInAdmin",
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
        },{
          path: '/TeacherIndexInAdmin',
          name: 'TeacherIndexInAdmin',
          component: TeacherIndexInAdmin,
        }
      ]
    },
    {
      path: '/teacherIndex',
      name: 'teacherIndex',
      component: TeacherIndex
    },
    {
      path: '/teacherIndex2',
      name: 'teacherIndex2',
      component: TeacherIndex2
    },
    {
      path: '/InfoIndex',
      name: 'InfoIndex',
      component: InfoIndex
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
      path: '/studentScore',
      name: 'StudentScore',
      component: StudentScore
    },
    {
      path: '/getDeptStudentScore',
      name: 'getDeptStudentScore',
      component: getDeptStudentScore
    },
    {
    path: '/editDeptEvaluate',
    name: 'editDeptEvaluate',
    component:editDeptEvaluate
    },
    {
      path: '/StudentScoreInAdmin',
      name: 'StudentScoreInAdmin',
      component: StudentScoreInAdmin
    },
    {
      path: '/EmpEvaluate',
      name: 'EmpEvaluate',
      component: EmpEvaluate
    },
    {
      path: '/EmpEvaluate_part',
      name: 'EmpEvaluate_part',
      component: EmpEvaluate_part
    },
    {
      path: '/addOfficialDate',
      name: 'addOfficialDate',
      component: addOfficialDate
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})

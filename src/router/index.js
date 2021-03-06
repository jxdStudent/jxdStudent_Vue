import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import InfoIndex from "../components/InfoIndex"
import adminIndex from "../components/admin/adminIndex";
import TeacherIndex from "../components/TeacherIndex";
import TeacherIndex2 from "../components/TeacherIndex2";
import TeacherIndex3_1 from "../components/TeacherIndex3_1";
import TeacherIndex3_2 from "../components/TeacherIndex3_2";
import TeacherIndex3_3 from "../components/TeacherIndex3_3";
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
import editDeptEvaluate from "../components/editDeptEvaluate";
import EmpEvaluate from "../components/EmpEvaluate";
import EmpEvaluate_part from "../components/EmpEvaluate_part";
import EmpEvaluate_part1 from "../components/EmpEvaluate_part1";
import EmpEvaluate_part2 from "../components/EmpEvaluate_part2";
import EmpEvaluate_part3 from "../components/EmpEvaluate_part3";
import addOfficialDate from "../components/addOfficialDate";
import TeacherAllStudent from "../components/TeacherAllStudent";
import TeacherOneStudent from "../components/TeacherOneStudent";
import allStudentGrow from "../components/admin/allStudentGrow";
import studentScoreBySno from "../components/studentScoreBySno";
import InfoIndexFromAdmin from "../components/admin/InfoIndexFromAdmin";
import EmpEvaluateInAdmin from "../components/admin/EmpEvaluateInAdmin";
import EmpEvaluate_partInAdmin from "../components/admin/EmpEvaluate_partInAdmin";

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081/'
Vue.prototype.axios = axios

Vue.use(Router);

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
      redirect:"/allStudentGrow",
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
        },
        {
          path: '/accountInfoInAdmin',
          name: 'accountInfoInAdmin',
          component: accountInfoInAdmin
        },
        {
          path: '/allStudentGrow',
          name: 'allStudentGrow',
          component: allStudentGrow
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
      path: '/teacherIndex3_1',
      name: 'teacherIndex3_1',
      component: TeacherIndex3_1
    },
    {
      path: '/teacherIndex3_2',
      name: 'teacherIndex3_2',
      component: TeacherIndex3_2
    },
    {
      path: '/teacherIndex3_3',
      name: 'teacherIndex3_3',
      component: TeacherIndex3_3
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
    path: '/editDeptEvaluate',
    name: 'editDeptEvaluate',
    component:editDeptEvaluate
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
      path: '/EmpEvaluate_part1',
      name: 'EmpEvaluate_part1',
      component: EmpEvaluate_part1
    },
    {
      path: '/EmpEvaluate_part2',
      name: 'EmpEvaluate_part2',
      component: EmpEvaluate_part2
    },
    {
      path: '/EmpEvaluate_part3',
      name: 'EmpEvaluate_part3',
      component: EmpEvaluate_part3
    },
    {
      path: '/addOfficialDate',
      name: 'addOfficialDate',
      component: addOfficialDate
    },
    {
      path: '/teacherAllStudent',
      name: 'teacherAllStudent',
      component: TeacherAllStudent
    },
    {
      path: '/teacherOneStudent',
      name: 'teacherOneStudent',
      component: TeacherOneStudent
    },
    {
      path: '/studentScoreBySno',
      name: 'studentScoreBySno',
      component: studentScoreBySno
    },
    {
      path: '/InfoIndexFromAdmin',
      name: 'InfoIndexFromAdmin',
      component: InfoIndexFromAdmin
    },
    {
      path: '/EmpEvaluateInAdmin',
      name: 'EmpEvaluateInAdmin',
      component: EmpEvaluateInAdmin
    },
    {
      path: '/EmpEvaluate_partInAdmin',
      name: 'EmpEvaluate_partInAdmin',
      component: EmpEvaluate_partInAdmin
    }
  ]
})

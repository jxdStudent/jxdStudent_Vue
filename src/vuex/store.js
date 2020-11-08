import Vue from "vue";
//引入vuex，类似vue-router
import Vuex from "vuex";
import ro from "element-ui/src/locale/lang/ro";

Vue.use(Vuex);

const modulesA = {}

const store = new Vuex.Store({
  state: {//状态，要存储的数据
    count: 0,
    uname: null,
    role: null,
    uid: null,
    studentNo: null,
    classNo: null,
    sname: null,
  },
  mutations: {//定义事件，set方法，用于给数据赋值
    setUname: function (state, uname) {
      state.uname = uname;  //将外部参数赋值为state对象中的数据
    },
    setRole: function (state, role) {
      state.role = role;
    },
    setUid: function (state, uid) {
      state.uid = uid;
    },
    setSno: function (state, sno) {
      state.studentNo = sno;
    },
    setClassNo: function (state, classNo) {
      state.classNo = classNo;
    },
    setSname: function (state,sname) {
      state.sname = sname;
    }
  },
  actions: {//作用同mutations，用于提供给数据赋值
    //调用mutations中的方法，类似于dao和service的关系
    //支持异步操作
    //第一个参数为mutations对象
    //第二个对象为传递进行的数据
    setUserName: function (context, uname) {
      context.commit("setUname", uname);
    },
    setUserRole: function (context, role) {
      context.commit("setRole", role)
    },
    setUserUid: function (context, uid) {
      context.commit("setUid", uid)
    },
    setSno: function (context, sno) {
      context.commit("setSno", sno)
    },
    setClassNo: function (context, classNo) {
      context.commit("setClassNo", classNo)
    },
    setSname: function (context, sname) {
      context.commit("setSname", sname)
    }
  },
  getters: {
    uname: state => {//箭头函数相当于function(state){}
      return state.uname;
    },
    role: state => {
      return state.role;
    },
    uid: state => {
      return state.uid;
    },
    studentNo: state => {
      return state.studentNo;
    },
    classNo: state => {
      return state.classNo;
    },
    sname: state => {
      return state.sname;
    }
  }
})
export default store;

import Vue from "vue";
//引入vuex，类似vue-router
import Vuex from "vuex";
import ro from "element-ui/src/locale/lang/ro";
Vue.use(Vuex);

const modulesA = {//给teacher用的module
  state:{
    studentNo: null
  },
  mutations:{
    setStudentNo: function (state, sno) {
      state.studentNo = sno;
    }
  },
  actions:{
  },
  getters:{
    studentNo: state => {
      return state.studentNo;
    }


  }
}

const store = new Vuex.Store({
  state:{//状态，要存储的数据
    count:0,
    uname:null,
    role:null,
    uid:null
  },
  mutations:{//定义事件，set方法，用于给数据赋值
    setUname:function (state,uname) {
      state.uname = uname;  //将外部参数赋值为state对象中的数据
    },
    setRole:function (state,role) {
      state.role = role;
    },
    setUid:function (state,uid) {
      state.uid =uid;
    },
  },
  actions:{//作用同mutations，用于提供给数据赋值
    //调用mutations中的方法，类似于dao和service的关系
    //支持异步操作
    //第一个参数为mutations对象
    //第二个对象为传递进行的数据
    setUserName:function (context,uname) {
      context.commit("setUname",uname);
    },
    setUserRole:function (context, role) {
      context.commit("setRole",role)
    },
    setUserUid:function (context, uid) {
      context.commit("setUid",uid)
    }
  },
  getters:{
    uname:state => {//箭头函数相当于function(state){}
      return state.uname;
    },
    role:state => {
      return state.role;
    },
    uid:state => {
      return state.uid;
    },
  }
})
export default  store;

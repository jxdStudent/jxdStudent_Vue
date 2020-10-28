import Vue from "vue";
//引入vuex，类似vue-router
import Vuex from "vuex";
Vue.use(Vuex);

const modulesA = {
  state:{},
  mutations:{},
  actions:{}
}

const store = new Vuex.Store({
  state:{//状态，要存储的数据
    count:0,
    uname:null
  },
  mutations:{//定义事件，set方法，用于给数据赋值
    setUname:function (state,uname) {
      state.uname = uname;  //将外部参数赋值为state对象中的数据
    }
  },
  actions:{//作用同mutations，用于提供给数据赋值
    //调用mutations中的方法，类似于dao和service的关系
    //支持异步操作
    //第一个参数为mutations对象
    //第二个对象为传递进行的数据
    setUser:function (context,uname) {
      context.commit("setUname",uname);
    }
  },
  getters:{
    name:state => {//箭头函数相当于function(state){}
      return state.uname;
    }
  },
  modules:{
    a: modulesA
  }
})
export default  store;

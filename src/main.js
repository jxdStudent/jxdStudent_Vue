// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import store from './vuex/store';
import axios from 'axios'
axios.defaults.baseURL='http://localhost:8081/'
Vue.prototype.axios = axios
import './assets/header.css'
import moment from 'moment'//导入文件

Vue.prototype.$moment = moment;//赋值使用

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

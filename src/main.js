import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import echarts from 'echarts';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'http://www.phpersky.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

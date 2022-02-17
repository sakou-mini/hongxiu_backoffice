import Vue from 'vue'

import App from './App.vue'
// vue router
import router from './router'
//vueX
import store from './store'
//ui
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
// echarts
import * as echarts from 'echarts'
//axios请求拦截配置文件
import request from "./axios/index"
//定义公用方法
import publicMethod from "./publicMethod/index"

import getUrl from  "./api/index"
Vue.use(ElementUi)

Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = request
Vue.prototype.$publicMethod= publicMethod
Vue.prototype.$getUrl = getUrl.getUrl
Vue.prototype.$getApiObj = getUrl.getApiObj

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

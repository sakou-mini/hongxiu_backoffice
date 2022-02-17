import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import request from "./axios/index"
import publicMethod from "./publicMethod/index"
import * as echarts from 'echarts'
import getUrl from  "./api/index"


Vue.use(ElementUi)
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$axios = request
Vue.prototype.$publicMethod= publicMethod
Vue.prototype.$echarts = echarts
Vue.prototype.$getUrl = getUrl.getUrl
Vue.prototype.$getApiObj = getUrl.getApiObj

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

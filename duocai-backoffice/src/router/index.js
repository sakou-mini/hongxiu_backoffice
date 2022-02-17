import Vue from 'vue'
import VueRouter from 'vue-router'
import store from  "../store/index"
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'local',
    component: () => import('@/views/login.vue'),
    redirect:"/login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,form,next)=>{
  if(to.path !== "/login" && to.path !== "/"){
    console.log(to.path);
    if (store.getters.getMenu.length === 0) {
      store.dispatch("setMenu").then(()=>{
        router.addRoutes(store.getters.getMenu)
        next({ path: to.path === '/index' ? '/index' : to.path })
      })
    }else {
      next()
    }
  }else {
    next()
  }

})

export default router
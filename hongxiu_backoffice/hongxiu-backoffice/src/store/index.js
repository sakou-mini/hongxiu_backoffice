import Vue from 'vue'
import Vuex from 'vuex'
import menuList from "../router/router.json"
import {importPath} from "../publicMethod/pathFilter"

Vue.use(Vuex)

function menuListFilter(menu){
  let menuList = []
  for(let item of menu){
    if(item.type === "group"){
      item.children = []
      menuList.push(item)
    }
  }
  for(let item of menuList){
    for(let i=0;i<menu.length;i++){
      if(menu[i].type !== "jumpUrl"){
        if(item.id === menu[i].groupId){
          item.children.push(menu[i])
        }
      }
    }
  }
  return menuList
}

function filter(menu){
  let menuList = []
  for (let item of menu){
    if(item.type !== "group"){
      let routerObj = {
        id:item.id,
        path: item.path,
        name: item.name,
        component: importPath(item.component),
        redirect: item.redirect,
        children:[]
      }
      let flag = true
      for(let x = 0;x<menuList.length;x++){
        if(menuList[x].id === item.parentId){
          menuList[x].children.push(routerObj)
          flag = false
        }
      }
      if(flag){
        menuList.push(routerObj)
      }
    }
  }
  return menuList
}

export default new Vuex.Store({
  state: {
    menu:[],
    isCollapse: false,
    logoWH:25,
    menuList:[],
  },
  mutations: {
    changeCollapse(state){
      state.isCollapse = !state.isCollapse
      state.isCollapse?state.logoWH = 25 : state.logoWH = 45
    },
    setMenu(state,menu){
      state.menu = menu
    },
    setMenuList(state,menuList){
      state.menuList = menuList
    }
  },
  getters:{
    getCollapse(state){
      return state.isCollapse;
    },
    getLogoWH(state){
      return state.logoWH
    },
    getMenu(state){
      return state.menu
    },
    getMenuList(state){
      return state.menuList
    }
  },
  actions: {
    setMenu({commit}){
      return new Promise(resolve => {
        setTimeout(()=>{
          commit("setMenuList",menuListFilter(menuList))
          let routers=filter(menuList)
          commit("setMenu",routers)
          resolve()
        },1000)
      })
    }
  },
  modules: {

  }
})
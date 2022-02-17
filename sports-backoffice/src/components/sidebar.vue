<template>
<div>
  <div class="asideBox">
    <el-menu :default-active="menuActive" class="el-menu-vertical-demo"  :collapse="isCollapse"
             :collapse-transition="false"
             background-color="#001529"
             text-color="#fff"
             active-text-color="#fff"
             :unique-opened="true"
             :router="true"
    >
      <el-menu-item index="/index">
        <template>
          <img :src="require('../assets/image/default_logo.png')" :width="logoWH" :height="logoWH" class="logo"/>
          <span slot="title" class="logoTitle" v-if="!isCollapse">体育直播</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/index/home">
        <i class="el-icon-odometer"></i>
        <span slot="title">直播监控</span>
      </el-menu-item>
      <el-submenu v-for="(item,i) in menuList" :key="item.id" :index="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.displayName }}</span>
        </template>
        <el-menu-item  v-for="(child,x) in item.children"  :index="child.path">{{ child.displayName }}</el-menu-item>
      </el-submenu>


    </el-menu>
    <div :class="asideClass"></div>
  </div>
</div>
</template>

<script>
export default {
  //侧边栏组件
  name: "sidebar",
  data() {
    return {
      isCollapse: false,
      logoWH:45,
      asideClass:"asidebgc asidebgcOpen",
      menuActive:"",
      menuList:[]
    };
  },
  mounted() {
    this.menuActive = location.pathname
    this.menuList = this.$store.getters.getMenuList
  },
  computed:{
    sidebarChange(){
      return {
        collapse : this.$store.getters.getCollapse,
        logoWH : this.$store.getters.getLogoWH
      }
    },
    menuListChange(){
      return {
        menuList : this.$store.getters.getMenuList
      }
    }
  },
  watch:{
    sidebarChange(data){
      this.isCollapse = data.collapse
      this.logoWH = data.logoWH
      data.collapse?this.asideClass = "asidebgc asidebgcClose":this.asideClass = "asidebgc asidebgcOpen"
    },
    menuListChange(data){
      this.menuList = data.menuList
    }
  }
}
</script>

<style scoped lang="less">
.logo{
  margin-right: 10px;
}
.logoTitle{
  font-size: 1.5rem;
  font-weight: 600;

}
//
//.el-aside{
//  // 侧边栏折叠动画速度
//  transition: width 0.25s;
//  -webkit-transition: width 0.25s;
//  -moz-transition: width 0.25s;
//  -webkit-transition: width 0.25s;
//  -o-transition: width 0.25s;
//}
//
//.horizontal-collapse-transition {
//  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
//
//}
.el-menu-item.is-active{
  background-color: #1890FF!important;
}

.asideBox {
  position: relative;
}
//侧边栏定位
.asidebgc {
  position: fixed;
  top: 0;
  left: 0;

  height: 100%;
  background-color: #001529;
  z-index: -1;
}
.asidebgcOpen{
  width: 240px;
}
.asidebgcClose{
  width: 65px;
}
/deep/ .el-menu {
  border-right: none;
}

</style>
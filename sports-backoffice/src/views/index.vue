<template>
  <div>
    <div class="main">
      <!--滚动条组件-->
      <el-scrollbar class="default-scrollbar" wrap-class="default-scrollbar__wrap" view-class="p20-scrollbar__view">

        <div class="clearFloat">
          <div :class="changeClassName.sidebarClass">
            <sidebar  style="width: 100%"/>
          </div>
          <div :class="changeClassName.headerAndMainClass">
            <el-row>
              <headNav />
            </el-row>
            <el-row class="mainBoxStyle">
              <router-view></router-view>
            </el-row>
          </div>
        </div>

      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import headNav from "@/components/headNav.vue"
import sidebar from "@/components/sidebar.vue"
import Vue from "vue";

export default {
  name: "index",
  data () {
    return {
      changeClassName:{
        sidebarClass:"infoSidebar sidebarOpen",
        headerAndMainClass:"headerAndMainOpen"
      }
    }
  },
  mounted() {

  },
  components: {
    headNav,
    sidebar
  },
  computed:{
    sidebarChange(){
      return this.$store.getters.getCollapse
    }
  },
  watch:{
    sidebarChange(data){
      data?
          this.changeClassName={
            sidebarClass:"infoSidebar sidebarClose",
            headerAndMainClass:"headerAndMainClose"
          } :
          this.changeClassName={
        sidebarClass:"infoSidebar sidebarOpen",
        headerAndMainClass:"headerAndMainOpen"
      }

    }
  }
}
</script>

<style scoped lang="less">
.mainBoxStyle{
  width: 96%;
  margin-top: 1.5rem;
  margin-left: 2.5rem;
}
.clearFloat{
  z-index: 10;
}
.clearFloat:after{
  content: "";
  clear: left;
  display: block;
}
.headerAndMainClose{
  float: left;
  width: calc(100% - 65px);
}
.headerAndMainOpen{
  float: left;
  width: calc(100% - 240px);

}
.infoSidebar{
  //transition: all .3s ease;
  float: left;
}
.sidebarOpen{
  width: 240px;
}
.sidebarClose{
  width: 65px;
}
.main {

  height: 100vh;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.mainBox {
  width: 98rem;
  box-shadow: 0 0 15px #888888;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
}
.default-scrollbar {
  width: 100%;
  height: 100%;
}
// .flex-scrollbar {
//   width: auto;
//   height: auto;
//   -webkit-box-flex: 1;
//   -ms-flex: 1;
//   flex: 1;
// }
body {
  height: 100%;
}
.page-component__scroll {
  height: 100%;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/.el-menu.el-menu--horizontal {
  border: none;
}

</style>
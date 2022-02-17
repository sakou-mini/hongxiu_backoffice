<template>
  <div id="app">
    <router-view></router-view>
    <div class="App_windowBoxBgc"></div>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.hidPadding{
  padding: 0!important;
}
.App_windowBoxBgc{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(240, 242, 245, 1);
  z-index: -100;
}
.descriptionsItem{
  font-size: 1.3rem;
}
.descriptionsLabel{
  font-size: 1rem;
}
.el-tabs__item{
  font-size: 1.1rem!important;
}
.headTitle{
  margin-bottom: 2rem;
}
.editHeadImg{
  line-height: 40px;
}
</style>

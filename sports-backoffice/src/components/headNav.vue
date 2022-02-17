<template>
<div>
  <el-row class="headBox">
    <el-col :span="1">
     <div>
       <i :class="iconClass" @click="clickSidebar" style="font-size: 35px;" ></i>
     </div>
    </el-col>
    <el-col  :offset="18" :span="5" style="height: 56px">

      <div class="nameBox">
        <el-popover
            width="200"
            trigger="hover"
            popper-class="hidPadding"
        >
          <div  slot="reference" style="width: 35px;height: 35px;margin-top: 10.5px;border-radius: 100%;overflow: hidden;float: left;">
            <img src="../assets/image/default_logo.png" width="35" height="35" />
          </div>
          <div slot="reference" style="float: left;margin-left: 15px;">
            <span style="line-height: 56px;font-size: 0.9rem;font-weight: 400;"> {{adminName}}</span>
          </div>

          <div class="list">
            <div class="list-item" v-for="(item, index) in userList" :key="index" @click="headItemJump(item)">
              <div :class="item.icon" />
              <div>{{ item.title }}</div>
            </div>
          </div>


        </el-popover>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  //头部组件
  name: "headNav",
  data(){
    return {
     menuSearch:"",
      adminName:"喜德贵",
      iconClass:"el-icon-s-fold itemHeight icon",
      changFlag:true,
      userList: [
        // { id: 1, title: "个人主页", icon: "el-icon-user",path:"/index/myCentre" },
        { id: 2, title: "退出", icon: "el-icon-switch-button",path:"/logout" },
      ],
    }
  },
  methods:{

    headItemJump(i){

    },
    clickSidebar(){
      this.changFlag = !this.changFlag
      this.changFlag?this.iconClass = "el-icon-s-fold itemHeight icon":this.iconClass = "el-icon-s-fold itemHeight iconTransform icon"
      this.$store.commit("changeCollapse")
    }
  }
}
</script>

<style scoped lang="less">
.icon{
  transition: all .3s ease;
  cursor: pointer;
}
.iconTransform{
  transform:rotate(180deg);
}

.headBox{
  height:56px;
  background-color: #fff;
}
.itemHeight{
  line-height: 56px;
}
.itemHeight>span{
  line-height: 56px;
}
.nameBox{
  display: inline-block;
  height: 56px;
  margin-left: 10px;
}
.list{
  .list-item{
    width: 200px;
    border-bottom: 0.04rem solid #d4d4d4;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: all .4s ease;
    cursor:pointer;
    &:after{
      content: "";
      clear: left;
      display: block;
    }
    &:last-child{
      border-bottom: none;
    }
    &:hover{
      background-color: #f1f1f1;

    }
    div{
      transition: all .4s ease;
      color: #bababa;
      margin-left: 10px;
      font-size: 0.95rem;
      float: left;
      &:first-child{
        font-size: 1.05rem;
      }
    }
  }
}



</style>
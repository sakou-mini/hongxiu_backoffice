<template>
<div  class="backGround">
  <el-row>
    <el-page-header @back="goBack" content="直播详情">
    </el-page-header>
  </el-row >
<el-row  style="margin-top: 20px">

  <el-col :span="8">

    <video
        :style="userData.pattern ==='LIVE_VIDEO'?'':'display: none'"
        id="videoElement"
        ref="videoElement"
           muted
           width="432"
           height="768">
      Your browser is too old which doesn't support HTML5 video.
    </video>
    <div  v-if="userData.pattern ==='LIVE_AUDIO'" style="width:432px;height: 768px;background-color: #000000;text-align: center;line-height: 768px;font-size: 2rem;color: white">
      当前为音频模式
    </div>
  </el-col>
  <el-col :span="16">

    <el-row>
      <div class="imgbox">
        <img :src="userData.avatarUrl" />
      </div>
    </el-row>
    <el-row class="userNamebox">
      <div>
        {{userData.nickname}}
      </div>
    </el-row>

    <el-divider></el-divider>
    <el-row>
      <el-descriptions title="房间基础信息">
        <el-descriptions-item label="用户名">{{userData.nickname}}</el-descriptions-item>
        <el-descriptions-item label="房间ID">{{userData.roomId}}</el-descriptions-item>
        <el-descriptions-item label="主播ID">{{userData.liveUserId}}</el-descriptions-item>
        <el-descriptions-item label="观众人数">{{userData.audienceNum}}</el-descriptions-item>
        <el-descriptions-item label="开播模式">{{userData.pattern === "LIVE_VIDEO" ? "视频模式":"音频模式"}}</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-button type="primary"  @click="openAudio">{{btnText}}</el-button>
      <el-button type="danger"  @click="close">关闭直播</el-button>
      <el-button type="success"  @click="refresh">刷新直播</el-button>
    </el-row>
  </el-col>
</el-row>
</div>
</template>

<script>
import flvjs from "flv.js"
import serve from "../../api/imgHost"
export default {
  name: "liveDetails",
  data(){
    return {
      roomId:"",
      flvPlayer:null,
      userData:{},
      btnText:"启用音频"
    }
  },
  methods:{
    refresh(){
      if (this.flvPlayer) {
        this.flvPlayer.pause();
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
        this.flvPlayer = null;
      }
      this.getLive()
    },
    openAudio(){
      let videoElement = document.getElementById("videoElement");
      console.log(videoElement.muted);
      if(videoElement.muted){

        videoElement.muted = false
        this.btnText = "关闭音频"

      }else {
        this.btnText = "启用音频"
        videoElement.muted = true
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    close(){
      this.$confirm('确定关闭这个直播间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("直播关闭"),{roomId:this.roomId},{
          transformRequest:[
            function(data){
              let params = "";
              var arr = [];
              for(var key in data){
                arr.push(key+"="+data[key]);
              }
              params = arr.join("&");
              return params;
            }
          ] }).then((res)=>{
          console.log(res);
          if(res.data.code === "200"){
            this.$alert('直播间将在5秒后关闭', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.go(-1)
              }
            });
          }
        })

      }).catch()
    },
    getLive(){
      this.getRoomIdInit()
      this.$axios.get(this.$getUrl("直播详情"),{params:{roomId:this.roomId}}).then((res)=>{
        console.log(res);
        this.openLive(res.data.data.liveUrl.flv,res.data.data.pattern)
        this.userData = res.data.data
        this.userData.avatarUrl = serve +this.userData.avatarUrl
      })
    },
    openLive(flv_url,type){
      let mediaMsg
      if(type === "LIVE_AUDIO"){
        mediaMsg = {
          type:"flv",
          hasAudio:true,
          hasVideo:false,
          isLive:true,
          cors:true,
          url:flv_url,
        }
      }else {
        mediaMsg = {
          type:"flv",
          hasAudio:true,
          hasVideo:true,
          isLive:true,
          cors:true,
          url:flv_url,
        }
      }
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer(mediaMsg, {
          enableWorker: false,
          lazyLoadMaxDuration: 3 * 60,
          seekType: 'range',
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
      }
    },
    getRoomIdInit(){
      if(this.$route.params.id === null || this.$route.params.id === undefined ||this.$route.params.id === ""){
        this.$router.go(-1)
      }
    }
  },
  mounted() {
    this.getRoomIdInit()
    this.roomId = this.$route.params.id
    console.log(this.$route);
    this.getLive()
  }
}
</script>

<style scoped lang="less">
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}

.imgbox {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  overflow: hidden;
  margin: 1rem auto 0 auto;
img {
  width: 100%;
  height: 100%;
}
}
</style>
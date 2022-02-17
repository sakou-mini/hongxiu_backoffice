<template>
  <div class="Box">
    <div class="backGround">
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="直播间ID">
                <el-input v-model="searchData.roomId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="主播ID">
                <el-input v-model="searchData.liveUserId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="主播名">
                <el-input v-model="searchData.nickname" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5" >
              <div style="float: right;">
                <el-button native-type="button" type="primary" @click="getLiveList()">查询</el-button>
                <el-button native-type="button" @click="reset()">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <div v-if="liveList.length === 0">
          <h2 style="text-align: center;margin-top: 3rem;margin-bottom: 3rem">
            暂无数据
          </h2>
        </div>
        <div class="liveBox" style="margin-top: 30px;">
          <div class="roomBox"  v-for="(item, index) in liveList" :key="index">
            <div class="imgBox">
              <img :src="item.roomImage" />
              <div class="operationBox">
                <div class="operationItem">
                  <span @click="liveRoom(item.roomId)">查看</span>
                  <span @click="close(item.roomId)">关闭</span>
                </div>
              </div>
            </div>
            <div class="textBox">
              <div class="liveUserMsgBox">
                <img :src="item.avatarUrl">
                <span>{{item.nickname}}</span>
              </div>
              <div>
                <i class="el-icon-user"></i>
                <span>{{item.audienceNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <el-row>
        <div style="margin-top: 20px">
          <div style="float: right;">

            <el-pagination
                background layout="prev, pager, next"
                :current-page="page"
                :page-size="size"
                :total="total">
            </el-pagination>

          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>


<script>
import serve from "../../api/imgHost"
export default {
  name: "liveUserRoom",
  data(){
    return{
      total:0,
      page:1,
      size:8,
      searchData:{
        liveUserId:"",
        nickname:"",
        roomId:""
      },
      liveList:[]
    }
  },
  methods:{
    //this.$axios.get(this.$getUrl("关闭直播"),params:{id:id}).then((res)=>{res.log})
    liveRoom(id){
      this.$router.push({name:"liveDetails",params: {id:id}})
    },
    close(id){
      this.$confirm('确定关闭这个直播间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("直播关闭"),{roomId:id},{
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
              }
            });
          }
          this.getLiveList()
        })

      }).catch()
    },
    getLiveList(){
      this.searchData.page = this.page
      this.searchData.size = this.size
      this.$axios.get(this.$getUrl("直播监控"), {
        params:  this.searchData
      }).then((res)=>{
        console.log(res);
        this.liveList = this.liveRoomBack(res.data.data.content)
        this.total = res.data.data.total
      })
    },

    liveRoomBack(list){
      for(let i=0;i<list.length;i++){
        list[i].avatarUrl = serve+list[i].avatarUrl
        list[i].roomImage = serve+list[i].roomImage
      }
      return list
    },
    reset(){
      this.page=1
      this.size=8
      this.searchData={liveUserId:"", nickname:"", roomId:""}
      this.getLiveList()
    }
  },
  mounted() {
    this.getLiveList()
  }
}



</script>

<style scoped lang="less">
.liveBox{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.roomBox{
  width: 20%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #eaeaea;

  margin: 0 30px 30px 30px;
  .imgBox{
    width: 100%;
    height: 176px;
    overflow: hidden;
    position: relative;
    &:hover .operationBox{
      top:0
    }
    .operationBox{
      width: 100%;
      height: 100%;
      position: absolute;
      top: -13rem;
      left: 0;
      display: flex;
      flex-wrap:wrap;
      align-items:center;
      align-content:space-around;
      background-color: rgba(0,0,0,.3);
      transition: all .3s ease;
      div{
        color: white;
        width: 100%;
        text-align: center;
      }
      .operationItem{
        display: flex;
        justify-content:space-around;
        span{
          cursor: pointer;
          transition: all .3s ease;
          &:nth-child(1):hover{
            color: #00bbff;
          }
          &:nth-child(2):hover{
            color: #ff5e5e;
          }
        }
      }
    }
    img{
      width: 100%;
    }
  }
  .textBox{
    height: 4rem;
    font-size: 0.95rem;
    color: #aaaaaa;

    div{
      height: 4rem;
      float: left;
      display: flex;
      align-items: center;
      &:nth-child(1){
        margin-left: 10px;
      }
      &:last-child{
        float: right;
        margin-right: 20px;
      }
    }
    i{
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    .liveUserMsgBox{
      img{
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
      }
      span{
        margin-left: 10px;
      }
    }
  }
}



.list{
  .list-item{
    width: 150px;
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
    }
  }
}

.checkboxOptionBox{
  border-radius: 5px;
  border: 1px solid rgba(0, 111, 255, 0.3);
  background-color: rgba(60, 188, 255, 0.1);
  padding: 10px 30px;
  font-size: 0.9rem;
  margin-top: 20px;
  color: #787878;
  span{
    margin: 0 5px;
  }
  .bgcBlue{
    color: #00afff;
  }
}
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}

</style>
<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>主播列表</h3>
        </el-row>
        <el-row class="searchForm">
          <el-form ref="form" :model="searchData" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="主播名">
                  <el-input v-model="searchData.nickname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="主播ID">
                  <el-input v-model="searchData.liveUserId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="房间ID">
                  <el-input v-model="searchData.roomId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="状态">
                  <el-select v-model="searchData.status" placeholder="请选择状态">
                    <el-option
                        v-for="item in platformOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="clearFloat">
            <div class="searchBtnBox">
              <el-button type="primary" @click="getLiveUserList()">查询</el-button>
              <el-button  @click="reset()">重置</el-button>
            </div>
          </div>
        </el-row>
<!--        <el-row>-->
<!--          <div>-->
<!--                      <el-button type="primary" icon="el-icon-plus">新增</el-button>-->
<!--                      <el-button type="primary" icon="el-icon-download">导出</el-button>-->
<!--            <el-popover-->
<!--                width="150"-->
<!--                trigger="click"-->
<!--                popper-class="hidPadding"-->
<!--                placement="bottom">-->
<!--              <div class="list">-->
<!--                <div class="list-item" v-for="(item, index) in batchOperation" :key="index" >-->
<!--                  <div>{{ item.title }}</div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <el-button slot="reference" style="margin-left: 10px;">批量操作</el-button>-->
<!--            </el-popover>-->
<!--          </div>-->
<!--          <div>-->
<!--            <div class="checkboxOptionBox">-->
<!--              <i class="el-icon-info bgcBlue"></i>-->
<!--              <span>已选择<span class="bgcBlue">1</span>项</span>-->
<!--              <span class="bgcBlue" style="cursor: pointer">清空</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-row>-->
        <el-row>
          <el-table :data="userList" stripe style="width: 100%">
            <el-table-column
                type="selection"
                width="55"
                align="center"
                header-align="center"
            >
            </el-table-column>
            <el-table-column label="主播信息" width="200">
              <template slot-scope="scope">
                <el-row>
               <el-col :span="7">
                 <div class="tableHeadBox">
                   <img :src="scope.row.avatar" />
                 </div>
               </el-col>
                  <el-col :span="17">
                    <div class="tableLiveUserName">{{scope.row.nickname}}</div>
                    <div class="tableLiveUserId">{{scope.row.userId}}</div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="monthOnlineTime" label="月在线时长（小时）"  align="center">
              <template slot-scope="scope">
                {{$publicMethod.formatSeconds(scope.row.monthOnlineTime)}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"  min-width="140"  align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.status === 0">正常</span>
                <span v-if="scope.row.status === 1" style="color: red;margin-right: 10px">●</span><span v-if="scope.row.status === 1">封禁</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="lastLoginTime"
                label="最近登录"
                min-width="150"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                {{$publicMethod.getTimeForDateAndTime(scope.row.lastLoginTime)}}
              </template>
            </el-table-column>
            <el-table-column
                prop="loginIp"
                label="最近登录IP"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>

            <el-table-column label="操作"  align="center" min-width="150">
              <template slot-scope="scope">
                <el-row>
                  <el-link  style="margin-right: 20px;"  type="danger" v-if="scope.row.status === 0" @click="banLiveUser(scope.row.userId)">封禁</el-link>
                  <el-link  style="margin-right: 20px;"  type="primary" v-if="scope.row.status === 1" @click="unsealLiveUser(scope.row.userId)">解封</el-link>
                  <el-link style="margin-right: 20px;" type="success" @click="editLiveUser(scope.row.userId)">编辑</el-link>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
        </el-row>
        <el-row class="pageBox">
          <el-pagination background layout="prev, pager, next"
                         :current-page="page"
                         :page-size="size"
                         :total="total"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-row>
      </div>
    </div>

    <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="60%"
        top="5vh"
    >
      <el-row>
        <div class="imgbox">
          <img :src="userData.avatar" />
        </div>
      </el-row>
      <el-row class="userNamebox">
        <div>
          {{userData.nickname}}
        </div>
      </el-row>
      <div class="headBox">
        <div class="headCard">
          <div>月在播总时长</div>
          <div>{{$publicMethod.formatSeconds(userData.monthLiveTime)}}</div>
        </div>
        <div class="headCard">
          <div>在播总时长</div>
          <div>{{$publicMethod.formatSeconds(userData.allLiveTime)}}</div>
        </div>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="主播基础信息">
          <el-descriptions-item label="id">{{userData.userId}}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{userData.nickname}}</el-descriptions-item>
          <el-descriptions-item label="注册时间">{{$publicMethod.getTimeForDateAndTime(userData.createTime)}}</el-descriptions-item>
          <el-descriptions-item label="上次登录时间">{{$publicMethod.getTimeForDateAndTime(userData.lastLoginTime)}}</el-descriptions-item>
          <el-descriptions-item label="上次登录IP">{{userData.loginIp}}</el-descriptions-item>
          <el-descriptions-item label="上次登录设备">{{userData.device}}</el-descriptions-item>
          <el-descriptions-item label="账号状态">
            <el-tag size="small" :type="userData.status === 0?'success':'danger'">{{userData.status === 0?'正常':'封禁'}}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="主播直播信息">
          <el-descriptions-item label="上次开播时长">{{$publicMethod.formatSeconds(userData.lastLiveTime)}}</el-descriptions-item>
          <el-descriptions-item label="上次开播时间">{{$publicMethod.formatSeconds(userData.lastLiveStartTime)}}</el-descriptions-item>
          <el-descriptions-item label="直播总时长">{{$publicMethod.formatSeconds(userData.allLiveTime)}}</el-descriptions-item>
          <el-descriptions-item label="开播次数">{{ userData.liveCount+"次" }}</el-descriptions-item>
        </el-descriptions>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger" v-if="userData.status === 0" @click="banLiveUser(userData.userId)">封禁主播</el-button>
    <el-button type="primary" v-if="userData.status === 1" @click="unsealLiveUser(userData.userId)">解封主播</el-button>
    <el-button type="primary" @click="password">修改密码</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import serve from "../../api/imgHost"
// "@/assets/image/headimg.jpg"
export default {
  name: "liveUserList",
  data () {
    return {
      userData:{},
      dialogVisible:false,
      batchOperation: [
        { id: 1, title: "取消发布"},
        { id: 2, title: "发布"},
        { id: 3, title: "删除"}
      ],
      platformOptions: [
        {
          value: -1,
          label: '全部'
        }, {
          value: 1,
          label: '已封禁'
        }, {
          value: 0,
          label: '正常'
        }],
      state: false,
      searchData: {
        liveUserId: "",
        nickname: "",
        roomId: "",
        status:-1
      },
      userList: [],
      page:1,
      size:10,
      total:0
    }
  }, methods: {
    reset(){
      this.searchData= {
        liveUserId: "",
            nickname: "",
            roomId: "",
            status:-1
      }
      this.page = 1
      this.size = 10
      this.getLiveUserList()
    },
    password(){
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9a-zA-Z]{8,16}$/,
        inputErrorMessage: '密码格式不正确'
      }).then(({ value }) => {
        this.$axios.post(this.$getUrl("修改密码"),{userId:this.userData.userId,password:value},{
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
          this.dialogVisible = false;
          if(res.data.code === "200"){
            this.$message.success("操作成功")
          }else {
            this.$message.error("操作失败")
          }
        })
      }).catch(() => {

      });
    },
    editLiveUser(id){
      this.$axios.get(this.$getUrl("主播详情"),{
        params:  {userId:id}
      }).then((res)=>{
        this.userData = res.data.data
        this.userData.avatar = serve + this.userData.avatar
        console.log(res);
      })
      this.dialogVisible = true;
    },
    unsealLiveUser(id){
      this.$confirm('确定解封主播?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("修改状态"),{userIds:[id],status:0},{
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
          this.getLiveUserList()
        })

      }).catch()
    },
    banLiveUser(id){
      this.$confirm('确定封禁主播?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("修改状态"),{userIds:[id],status:1},{
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
          this.getLiveUserList()
        })

      }).catch()
    },
    userDetails () {
      //跳转路径
      this.$router.push('/index/userDetails')
    },

    getLiveUserList(){
      this.searchData.page = this.page
      this.searchData.size = this.size
      console.log(this.searchData);
      this.$axios.get(this.$getUrl("主播列表"),{
        params:  this.searchData
      }).then((res)=>{
        console.log(res);
        this.userList = this.filter(res.data.data.content)
        this.total = res.data.data.total
      })
    },
    filter(data){
      for(let i=0;i<data.length;i++){
        data[i].avatar = serve + data[i].avatar
      }
      return data
    },
    handleSizeChange(val) {
      //size Change事件
      console.log(`每页 ${val} 条`);
      this.size = val
      /**
       * 修改size指向
       * getData
       * */
      this.getLiveUserList()

    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getLiveUserList()
    }
  }, mounted () {
    this.getLiveUserList()

  }
}
</script>

<style scoped lang="less">
.headBox{
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  .headCard{
    box-shadow: 0 0 10px #888888;
    width: 40%;
    text-align: center;
    padding: 10px;
    div{
      &:nth-child(1){
        font-size: 1rem;
      }
      &:nth-child(2){
        padding-top: 20px;
        font-size: 1.9rem;
      }
    }
  }
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
.userNamebox {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 1.3rem;
}
.tableLiveUserName{
  font-size: .9rem;
  text-align: left;
  color: #585858;
}
.tableLiveUserId{
  font-size: .7rem;
  text-align: left;
  color: #8b8b8b;
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
.pageBox {
  margin-top: 2rem;
}
.tableSwithc {
  display: table-cell;
  vertical-align: bottom;
}

.tableHeadBox {
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100%;
  img {
    width: 100%;
  }
}

.searchForm {
  margin-top: 2rem;
}
.searchBtnBox{
  float: right;
}
.clearFloat:after{
  content: "";
  clear: left;
  display: block;
}
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}
</style>
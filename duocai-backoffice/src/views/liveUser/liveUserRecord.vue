<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>直播记录</h3>
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
              <el-col :span="8">
                <el-form-item label="日期范围">
                  <el-date-picker
                      v-model="searchData.time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="timestamp">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="clearFloat">
            <div class="searchBtnBox">
              <el-button type="primary" @click="getLiveUserRecord()">查询</el-button>
              <el-button  @click="reset()">重置</el-button>
            </div>
          </div>
        </el-row>
        <el-row>
<!--          <div>-->
<!--                      <el-button type="primary" icon="el-icon-plus">新增</el-button>-->
<!--            <el-button type="primary" icon="el-icon-download">导出</el-button>-->
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
        </el-row>
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
            <el-table-column
                prop="liveStartTime"
                label="日期"
                min-width="150"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                {{$publicMethod.getTimeForDate(scope.row.liveStartTime)}}
              </template>
            </el-table-column>
            <el-table-column
                prop="liveStartTime"
                label="开播时间"
                min-width="150"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                {{$publicMethod.getTimeForTime(scope.row.liveStartTime)}}
              </template>
            </el-table-column>
            <el-table-column
                prop="liveEndTime"
                label="下播时间"
                min-width="150"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                {{$publicMethod.getTimeForTime(scope.row.liveEndTime)}}
              </template>
            </el-table-column>
            <el-table-column
                prop="liveTime"
                label="开播时长"
                min-width="150"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                {{$publicMethod.formatSeconds(scope.row.liveTime)}}
              </template>
            </el-table-column>

          </el-table>
        </el-row>
        <el-row class="pageBox">
          <el-pagination background layout="prev, pager, next" :total="total"
                         :current-page="page"
                         :page-size="size"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import serve from "../../api/imgHost"
// "@/assets/image/headimg.jpg"
export default {
  name: "liveUserRecord",
  data () {
    return {
      page:1,
      size:10,
      total:0,
      batchOperation: [
        { id: 1, title: "批量导出"},
      ],
      searchData: {
        liveUserId: "",
        nickname: "",
        roomId: "",
        time:[]
      },
      userList: []
    }
  }, methods: {
    reset(){
      this.searchData= {
        liveUserId: "",
        nickname: "",
        roomId: "",
        time:[]
      }
      this.page = 1
      this.size = 10
      this.getLiveUserRecord()
    },
    filter(data){
      for(let i=0;i<data.length;i++){
        data[i].avatar = serve + data[i].avatar
      }
      return data
    },
    userDetails () {
      //跳转路径
      this.$router.push('/index/userDetails')
    },
    getLiveUserRecord(){
      this.searchData.page = this.page
      this.searchData.size = this.size
      this.searchData.endTime = this.searchData.time?this.searchData.time[1]:""
      this.searchData.startTime = this.searchData.time?this.searchData.time[0]:""
      this.$axios.post(this.$getUrl("直播记录"),this.searchData,{
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
        this.userList = this.filter(res.data.data.content)
        this.total = res.data.data.total
      })
    },
    handleSizeChange(val) {
      //size Change事件
      console.log(`每页 ${val} 条`);
      this.size = val
      /**
       * 修改size指向
       * getData
       * */
      this.getLiveUserRecord()

    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getLiveUserRecord()
    }

  }, mounted () {
    this.getLiveUserRecord()
  }
}
</script>

<style scoped lang="less">

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
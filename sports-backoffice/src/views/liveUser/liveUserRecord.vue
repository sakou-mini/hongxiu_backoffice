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
                  <el-input v-model="searchData.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="主播ID">
                  <el-input v-model="searchData.userId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="房间ID">
                  <el-input v-model="searchData.userId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期范围">
                  <el-date-picker
                      v-model="searchData.loginTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="timestamp">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="advancedSearch">

            </el-row>
          </el-form>
          <div class="clearFloat">
            <div class="searchBtnBox">
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </div>
          </div>
        </el-row>
        <el-row>
          <div>
            <!--          <el-button type="primary" icon="el-icon-plus">新增</el-button>-->
                      <el-button type="primary" icon="el-icon-download">导出</el-button>
            <el-popover
                width="150"
                trigger="click"
                popper-class="hidPadding"
                placement="bottom">
              <div class="list">
                <div class="list-item" v-for="(item, index) in batchOperation" :key="index" >
                  <div>{{ item.title }}</div>
                </div>
              </div>
              <el-button slot="reference" style="margin-left: 10px;">批量操作</el-button>
            </el-popover>
          </div>
          <div>
            <div class="checkboxOptionBox">
              <i class="el-icon-info bgcBlue"></i>
              <span>已选择<span class="bgcBlue">1</span>项</span>
              <span class="bgcBlue" style="cursor: pointer">清空</span>
            </div>
          </div>
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
                      <img :src="scope.row.headImg" />
                    </div>
                  </el-col>
                  <el-col :span="17">
                    <div class="tableLiveUserName">{{scope.row.name}}</div>
                    <div class="tableLiveUserId">{{scope.row.id}}</div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column
                prop="loginTime"
                label="日期"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="openLiveTime"
                label="开播时间"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="closeLiveTime"
                label="下播时间"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="liveTime"
                label="开播时长"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>

          </el-table>
        </el-row>
        <el-row class="pageBox">
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>


// "@/assets/image/headimg.jpg"
export default {
  name: "liveUserRecord",
  data () {
    return {

      selectState: "1",
      stateOptions: [
        {
          value: "1",
          label: "全部"
        }, {
          value: "2",
          label: "正常"
        }, {
          value: "3",
          label: "封禁"
        }],
      selectServe: "",
      batchOperation: [
        { id: 1, title: "批量导出"},
      ],
      platformOptions: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '已封禁'
        }, {
          value: '2',
          label: '正常'
        }],
      state: false,
      searchData: {
        userId: "",
        phone: "",
        account: ""
      },
      userList: [
        {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        }, {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:1,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07",
          ip:"114.214.19.1",
          online: false,
          state: false,
          openLiveTime:"15:21:12",
          closeLiveTime:"15:22:12",
          liveTime:"00:01:00"
        },
      ]
    }
  }, methods: {
    stateFilters: function (v) {
      return v ? { title: "正常", color: "success" } : { title: "封禁", color: "danger" }
    }, onlineFilters: function (v) {
      return v ? { title: "在线", color: "" } : { title: "离线", color: "info" }
    },
    userDetails () {
      //跳转路径
      this.$router.push('/index/userDetails')
    },

  }, mounted () {
    for (let i = 0; i < this.userList.length; i++) {
      this.userList[i].online = this.onlineFilters(this.userList[i].online)
      this.userList[i].state = this.stateFilters(this.userList[i].state)
    }
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
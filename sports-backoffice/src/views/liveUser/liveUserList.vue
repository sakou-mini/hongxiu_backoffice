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
              <el-col :span="5">
                <el-form-item label="状态">
                  <el-select v-model="searchData.platform" placeholder="请选择状态">
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
            <el-row :gutter="20" v-if="advancedSearch">
              <el-col :span="8">
                <el-form-item label="上次登录日期">
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
          </el-form>
          <div class="clearFloat">
            <div class="searchBtnBox">
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
              <el-link type="primary" style="margin: 0 20px"  @click="switchSearch">
                {{searchMsg}}<i :class="btnIcon"></i>
              </el-link>
            </div>
          </div>
        </el-row>
        <el-row>
          <div>
            <!--          <el-button type="primary" icon="el-icon-plus">新增</el-button>-->
            <!--          <el-button type="primary" icon="el-icon-download">导出</el-button>-->
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
            <el-table-column prop="works" label="月在线时长（小时）"  align="center">
            </el-table-column>
            <el-table-column prop="state" label="状态"  min-width="140"  align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-tag :type="scope.row.state.color">{{scope.row.state.title }}</el-tag>
                  <el-tag style="margin-left:0.5rem" :type="scope.row.online.color">{{scope.row.online.title }}</el-tag>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column
                prop="loginTime"
                label="最近登录"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="ip"
                label="最近登录IP"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>

            <el-table-column label="操作"  align="center" min-width="150">
              <template slot-scope="scope">
                <el-row>
                  <el-link style="margin-right: 20px;" :type='scope.row.state.title==="正常"?"danger":"primary"'>{{ scope.row.state.title==="正常"?"禁用":"启用" }}</el-link>
                  <el-link style="margin-right: 20px;" type="success" @click="dialogVisible = true">编辑</el-link>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
        </el-row>
        <el-row class="pageBox">
          <el-pagination background layout="prev, pager, next" :total="1000">
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
          <img src="http://1.116.215.106:8848/public/img/head.jpg" />
        </div>
      </el-row>
      <el-row class="userNamebox">
        <div>
          喜德贵
        </div>
      </el-row>
      <div class="headBox">
        <div class="headCard">
          <div>月在播总时长</div>
          <div>11:23:55</div>
        </div>
        <div class="headCard">
          <div>在播总时长</div>
          <div>11:23:55</div>
        </div>
      </div>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="主播基础信息">
          <el-descriptions-item label="id">114514</el-descriptions-item>
          <el-descriptions-item label="用户名">喜德贵</el-descriptions-item>
          <el-descriptions-item label="注册时间">2020-08-09 15:15:21</el-descriptions-item>
          <el-descriptions-item label="上次登录时间">2021-12-22 15:24:19</el-descriptions-item>
          <el-descriptions-item label="上次登录IP">180.217.211.143</el-descriptions-item>
          <el-descriptions-item label="上次登录设备">XiaoMi 10</el-descriptions-item>
          <el-descriptions-item label="当前状态">
            <el-tag size="small" type="info">离线</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="账号状态">
            <el-tag size="small" type="success">正常</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="主播直播信息">
          <el-descriptions-item label="上次开播时长">00:05:12</el-descriptions-item>
          <el-descriptions-item label="上次开播时间">2021-12-22 12:20:15</el-descriptions-item>
          <el-descriptions-item label="直播总时长">11:23:55</el-descriptions-item>
          <el-descriptions-item label="开播次数">47次</el-descriptions-item>
          <el-descriptions-item label="签约时间">2021-12-03 19:12:50</el-descriptions-item>
        </el-descriptions>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger">封禁主播</el-button>
    <el-button type="primary">修改密码</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>


// "@/assets/image/headimg.jpg"
export default {
  name: "liveUserList",
  data () {
    return {
      dialogVisible:false,
      advancedSearch:false,
      btnIcon:"el-icon-arrow-down",
      searchMsg:"展开",
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
        { id: 1, title: "取消发布"},
        { id: 2, title: "发布"},
        { id: 3, title: "删除"}
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
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:5,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: true,
          state: true
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:4,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: true,
          state: true
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:2,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:5,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: true,
          state: true
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:4,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:2,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:3,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:4,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true
        },     {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          introduction:6,
          comment:114,
          works:514,
          follow:19,
          fans:1919,
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false
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
    switchSearch(){
      this.advancedSearch = !this.advancedSearch
      this.btnIcon = this.advancedSearch?"el-icon-arrow-up":"el-icon-arrow-down"
      this.searchMsg = this.advancedSearch?"收起":"展开"
    }
  }, mounted () {
    for (let i = 0; i < this.userList.length; i++) {
      this.userList[i].online = this.onlineFilters(this.userList[i].online)
      this.userList[i].state = this.stateFilters(this.userList[i].state)
    }
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
<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>赛事记录</h3>
        </el-row>
        <el-row class="searchForm">
          <el-form ref="form" :model="searchData" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="赛事时间">
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
              <el-col :span="5">
                <el-form-item label="主播ID">
                  <el-input v-model="searchData.userId"></el-input>
                </el-form-item>
              </el-col>
<!--              <el-col :span="5">-->
<!--                <el-form-item label="状态">-->
<!--                  <el-select v-model="searchData.platform" placeholder="请选择状态">-->
<!--                    <el-option-->
<!--                        v-for="item in platformOptions"-->
<!--                        :key="item.value"-->
<!--                        :label="item.label"-->
<!--                        :value="item.value">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
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
          <el-table :data="userList" stripe style="width: 100%">

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
            <el-table-column prop="eventName" label="赛事名称"  align="center">
            </el-table-column>
            <el-table-column
                prop="eventTime"
                label="赛事时间"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开播时间"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="下播时间"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="liveTime"
                label="直播时长"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="close"
                label="掉线次数"
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
  name: "eventRecord",
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
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },       {
          headImg: "http://1.116.215.106:8848/public/img/head.jpg",
          id: "114514",
          name: "喜德贵",
          eventTime:"2021-12-24 00:00:00",
          startTime:"2021-12-24 00:02:12",
          endTime:"2021-12-24 03:12:21",
          close:"1",
          liveTime:"03:10:09",
          eventName:"美式足球"
        },
      ]
    }
  }, methods: {

  }, mounted () {

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
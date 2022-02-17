<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>举报列表</h3>
        </el-row>
        <el-row class="searchForm">
          <el-form ref="form" :model="searchData" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="提交时间">
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
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row>
          <el-table :data="userList" stripe style="width: 100%">
            <el-table-column prop="id" label="ID"  align="center">
            </el-table-column>
            <el-table-column prop="type" label="类型"  align="center">
            </el-table-column>
            <el-table-column prop="works" label="被举报内容"  align="center" min-width="200">
              <template slot-scope="scope">
                <img v-if="scope.row.type ==='视频'" :src="scope.row.works" @click="videoDialog=true"  alt="" width="100" height="75" style="cursor: pointer">
                <span v-if="scope.row.type ==='用户'||scope.row.type ==='评论'">{{scope.row.works}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="状态"  align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-tag :type="scope.row.state.color">{{scope.row.state.title }}</el-tag>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="举报人"  align="center">
            </el-table-column>
            <el-table-column prop="userId" label="举报人ID"  align="center">
            </el-table-column>
            <el-table-column prop="loginTime" label="举报时间"  align="center">
            </el-table-column>
            <el-table-column prop="ip" label="IP"  align="center">
            </el-table-column>
            <el-table-column label="操作"  align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-link style="margin-right: 20px;" type="primary" >查看</el-link>
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
  </div>
</template>

<script>


// "@/assets/image/headimg.jpg"
export default {
  name: "reportList",
  data () {
    return {
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
      state: false,
      searchData: {
        userId: "",
        phone: "",
        account: ""
      },
      userList: [
        {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"http://1.116.215.106:8848/public/img/head.jpg",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true,
          type:"视频"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"阿巴阿巴",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false,
          type:"用户"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"就这就这？这种人也来传视频？",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false,
          type:"评论"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"http://1.116.215.106:8848/public/img/head.jpg",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true,
          type:"视频"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"luxon",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false,
          type:"用户"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"你这不对啊，傻逼",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false,
          type:"评论"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"http://1.116.215.106:8848/public/img/head.jpg",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false,
          type:"视频"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"好家伙",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: false,
          type:"用户"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"+V114514 看美羊羊洗澡",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true,
          type:"评论"
        },       {
          id: "114514",
          name: "喜德贵",
          userId:"231332",
          works:"http://1.116.215.106:8848/public/img/head.jpg",
          loginTime:"2021-12-07 17:27:05",
          ip:"114.214.19.1",
          online: false,
          state: true,
          type:"视频"
        },
      ]
    }
  }, methods: {
    stateFilters: function (v) {
      return v ? { title: "已查看", color: "" } : { title: "未查看", color: "danger" }
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
      this.userList[i].state = this.stateFilters(this.userList[i].state)
    }
  }
}
</script>

<style scoped lang="less">
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
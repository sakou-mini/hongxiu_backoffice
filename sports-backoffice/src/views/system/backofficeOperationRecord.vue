<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>消息列表</h3>
      </el-row>
      <el-row class="searchForm">
        <el-form ref="form" :model="searchData" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="操作时间">
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
              <el-form-item label="状态">
                <el-select v-model="searchData.platform" placeholder="请选择状态">
                  <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
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
        <div>
          <!--          <el-button type="primary" icon="el-icon-plus">新增</el-button>-->
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>

      </el-row>
      <el-row>
        <el-table
            ref="multipleTable"
            :data="noticeList"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">
          <el-table-column
              prop="id"
              label="id"
              align="center"
              header-align="center"
          >
          </el-table-column>
          <el-table-column prop="desc" label="事件描述"  min-width="200"  align="center">
          </el-table-column>
          <el-table-column
              prop="backoffice"
              label="操作人"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="ip"
              label="操作IP"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="time"
              label="操作时间"
              min-width="150"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="result"
              label="结果"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-row>
                <el-tag :type="scope.row.result==='成功'?'success':'danger'">{{scope.row.result}}</el-tag>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
              prop="appended"
              label="附注"
              align="center"
              min-width="150"
              header-align="center">
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <div style="float: right;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                background

            >
            </el-pagination>
          </div>
        </div>
      </el-row>
    </div>


  </div>
</template>

<script>
export default {
  name: "backOfficeLog",
  data(){
    return{
      page:1,
      size:10,
      searchData:{},
      stateOptions:[ {
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '注册用户'
      }, {
        value: '2',
        label: '游客'
      }, {
        value: '2',
        label: '指定用户'
      }],
      noticeList:[
        {
          id:"1919",
          type:"后端",
          desc:"封禁了ID为 114514 的用户",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"成功",
          appended:""
        },     {
          id:"1919",
          type:"后端",
          desc:"登入了后台管理系统",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"失败",
          appended:"密码输入错误，拒绝登陆"
        },     {
          id:"1919",
          type:"后端",
          desc:"封禁了ID为 114514 的视频",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"失败",
          appended:"未找到有ID为 114514 的视频"
        },     {
          id:"1919",
          type:"前端",
          desc:"登陆APP",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"成功",
          appended:""
        },     {
          id:"1919",
          type:"前端",
          desc:"登陆APP",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"失败",
          appended:"密码输入错误，拒绝登陆"
        },     {
          id:"1919",
          type:"后端",
          desc:"发布了ID为 114514 的公告",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"成功",
          appended:""
        },     {
          id:"1919",
          type:"后端",
          desc:"发布了ID为 114514 的消息",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"失败",
          appended:"该账号没有权限"
        },     {
          id:"1919",
          type:"后端",
          desc:"登入了后台管理系统",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"成功",
          appended:""
        },     {
          id:"1919",
          type:"后端",
          desc:"提交了ID为 114514 的标签",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"错误",
          appended:"重复的标签名"
        },     {
          id:"1919",
          type:"后端",
          desc:"修改了账号为 114514 的权限",
          backoffice:"喜德贵",
          ip:"165.145.45.122",
          time:"2021年12月10日 16:36:05",
          result:"成功",
          appended:""
        },
      ],
    }
  },

  /*
  * 默认 page,size
  * change page -> getData -> renderTable
  * change size -> getData -> renderTable
  *
  * **/
  methods:{
    openVideo(){

    },
    handleSelectionChange(val){
      console.log("选中");
      console.log(val);
    },
    handleSizeChange(val) {
      //size Change事件
      console.log(`每页 ${val} 条`);
      this.size = val
      /**
       * 修改size指向
       * getData
       * */
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
    },
    stateFilters: function (v) {
      let state
      switch (v){
        case 1:
          state = { title: "待发布", color: "info" }
          break
        case 2:
          state = { title: "运行中", color: "success" }
          break
        case 3:
          state = { title: "已结束", color: "danger" }
          break
        case 4:
          state = { title: "已暂停", color: "warning" }
          break
      }

      return state
    }
  },
  mounted () {
    for (let i = 0; i < this.noticeList.length; i++) {
      this.noticeList[i].state = this.stateFilters(this.noticeList[i].state)
    }
  }
}
</script>

<style scoped lang="less">
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}

.searchBtnBox{
  float: right;

}
.clearFloat:after{
  content: "";
  clear: left;
  display: block;
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
</style>
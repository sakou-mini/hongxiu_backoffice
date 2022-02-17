<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>游客列表</h3>
        </el-row>
        <el-row class="searchForm">
          <el-form ref="form" :model="searchData" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="游客ID">
                  <el-input v-model="searchData.touristId"></el-input>
                </el-form-item>
              </el-col>

              <el-col :offset="2" :span="5">
                <el-form-item label="最近登录IP">
                  <el-input v-model="searchData.lastIp"></el-input>
                </el-form-item>
              </el-col>
              <el-col :offset="2" :span="5">
                <el-form-item label="初次登录IP">
                  <el-input v-model="searchData.firstIp"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">

              <el-col :span="7">
                <el-form-item label="最近登录">
                  <el-date-picker
                      v-model="searchData.lastLoginTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="timestamp">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="初次登录">
                  <el-date-picker
                      v-model="searchData.firstLoginTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="timestamp">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="search">查询</el-button>
                <el-button>重置</el-button>
              </el-col>
            </el-row>
          </el-form>
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
            <el-table-column prop="id" label="游客ID"  align="center">
            </el-table-column>
            <el-table-column prop="accountId" label="游客账号"  align="center">
            </el-table-column>
            <el-table-column prop="likeCount" label="点赞"  align="center">
            </el-table-column>
            <el-table-column prop="loginCount" label="登录次数"  align="center">
            </el-table-column>
            <el-table-column
                prop="lastLoginTime"
                label="最近登录"
                min-width="150"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                {{scope.row.lastLoginTime?$publicMethod.getTimeForDateAndTime(scope.row.lastLoginTime):"-"}}
              </template>
            </el-table-column>
            <el-table-column
                prop="lastLoginIp"
                label="最近登录IP"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>

            <el-table-column
                prop="firstLoginTime"
                label="初次登录"
                min-width="150"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                {{scope.row.firstLoginTime?$publicMethod.getTimeForDateAndTime(scope.row.firstLoginTime):"-"}}
              </template>
            </el-table-column>
            <el-table-column
                prop="firstLoginIp"
                label="初次登录IP"
                min-width="150"
                align="center"
                header-align="center">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="pageBox">
          <div style="margin-top: 20px">
            <div style="float: right;">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  :page-size="size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  background
              >
              </el-pagination>
            </div>
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>


// "@/assets/image/headimg.jpg"
export default {
  name: "touristList",
  data () {
    return {
      page:1,
      size:10,
      total:0,
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
        firstIp: "",
        lastIp: "",
        touristId: "",
        firstLoginTime:[],
        lastLoginTime:[]
      },
      userList: []
    }
  }, methods: {
    search(){
      this.page = 1
      this.getTouristList()
    },
    handleSizeChange(val) {
      //size Change事件
      console.log(`每页 ${val} 条`);
      this.size = val
      /**
       * 修改size指向
       * getData
       * */
      this.getTouristList()

    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getTouristList()
    },
    getTouristList(){
      let data = {}
      data.firstLoginTimeStart = this.searchData.firstLoginTime[0]
      data.firstLoginTimeEnd = this.searchData.firstLoginTime[1]
      data.lastLoginTimeStart = this.searchData.lastLoginTime[0]
      data.lastLoginTimeEnd = this.searchData.lastLoginTime[1]
      data.page = this.page
      data.size = this.size
      data.firstIp = this.searchData.firstIp
      data.lastIp = this.searchData.lastIp
      data.touristId = this.searchData.touristId

      this.$axios.post(this.$getUrl("游客列表"),data,{
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
        this.userList = res.data.data.content
        this.total=res.data.data.total
      })
    }

  }, mounted () {
    this.getTouristList()
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
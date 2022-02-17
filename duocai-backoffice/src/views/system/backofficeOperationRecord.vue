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
                    v-model="searchData.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-button type="primary" @click="getLogList">查询</el-button>
              <el-button @click="reset()">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <div>
          <!--          <el-button type="primary" icon="el-icon-plus">新增</el-button>-->
<!--          <el-button type="primary" icon="el-icon-download">导出</el-button>-->
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
          <el-table-column prop="interfaceName" label="事件描述"  min-width="200"  align="center">
          </el-table-column>
          <el-table-column
              prop="createdName"
              label="操作人"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="createdIp"
              label="操作IP"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="createdTime"
              label="操作时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.createdTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="res"
              label="结果"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-row>
                <el-tag :type="scope.row.res?'success':'danger'">{{scope.row.res?'成功':'失败'}}</el-tag>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
              prop="resDesc"
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
                :total="total"
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
      total:0,
      page:1,
      size:10,
      searchData:{
        time:[]
      },

      noticeList:[],
    }
  },

  /*
  * 默认 page,size
  * change page -> getData -> renderTable
  * change size -> getData -> renderTable
  *
  * **/
  methods:{
    reset(){
      this. searchData={
        time:[]
      },
      this.page = 1
      this.size = 10
      this.getLogList()
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
      this.getLogList()
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getLogList()
    },

    getLogList(){
      this.searchData.endTime = this.searchData.time?this.searchData.time[1]:""
      this.searchData.startTime = this.searchData.time?this.searchData.time[0]:""
      this.searchData.page = this.page
      this.searchData.size = this.size
      delete this.searchData.time
      this.$axios.get(this.$getUrl("记录列表"),{params:this.searchData}).then((res)=>{
        console.log(res);
        this.noticeList = res.data.data.content;
        this.total = res.data.data.total
      })
    }
  },
  mounted () {
    this.getLogList()
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
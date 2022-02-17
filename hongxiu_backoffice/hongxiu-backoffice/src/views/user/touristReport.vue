<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>游客报表</h3>
        </el-row>
        <el-row class="searchForm">
          <el-form ref="form" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-form-item label="选择日期">
                  <el-date-picker
                      v-model="touristStatisticsTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="timestamp">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" @click="search">查询</el-button>
                <el-button>重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row>
          <el-table
              ref="multipleTable"
              :data="userList"
              tooltip-effect="dark"
            >
            <el-table-column
                prop="recordTime"
                label="日期"
                align="center"
                header-align="center"
            >
              <template slot-scope="scope">
                {{$publicMethod.getTimeForDate(scope.row.recordTime)}}
              </template>
            </el-table-column>
            <el-table-column
                prop="totalTouristNum"
                label="游客数"
                align="center"
                header-align="center">
            </el-table-column>
            <el-table-column
                prop="ipNum"
                label="ip数"
                align="center"
                header-align="center"
            >
            </el-table-column>
            <el-table-column
                prop="newLikeNum"
                label="点赞数"
                align="center"
                header-align="center"
            >
            </el-table-column>
            <el-table-column
                prop="newUserNum"
                label="转化数"
                align="center"
                header-align="center"
            >
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
  name: "touristReport",
  data () {
    return {
      chart:"",
      touristStatisticsTime:[],
      page:1,
      size:10,
      total:0,
      activeName:"add",
      searchData:{},
      time:"",
      userList:[]
    }
  }, methods: {
    search(){
      this.getList()
    },
    getList(){
      let data = {}
      data.touristStatisticsTimeStart = this.touristStatisticsTime.length > 0?this.touristStatisticsTime[0]:""
      data.touristStatisticsTimeEnd = this.touristStatisticsTime.length > 0?this.touristStatisticsTime[1]:""
      data.page = this.page
      data.size = this.size
      this.$axios.post(this.$getUrl("游客报表"),data,{
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
        console.log(this.userList);
        this.total=res.data.data.total
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
      this.getList()
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getList()
    },
  }, mounted () {
    console.log("open");
    this.getList()
  },

}
</script>

<style scoped lang="less">
.exhibitionDataBox {
  background-color: #ffffff;
  padding: 1rem;
  margin-top: .5rem;
  .exhibitionData {
    text-align: center;
    border-right: 1px solid rgb(187, 187, 187);
    &:nth-last-child(1) {
      border-right: none;
    }
    i {
      line-height: 4rem;
      font-size: 3rem;
      font-weight: 600;
      color: rgb(100, 193, 255);
    }
    .exhibitionDataText {
      text-align: left;
      color: rgb(139, 139, 139);
      div:nth-child(1) {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }
      div:nth-child(2) {
        font-size: 1.5rem;
        font-weight: 600;
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
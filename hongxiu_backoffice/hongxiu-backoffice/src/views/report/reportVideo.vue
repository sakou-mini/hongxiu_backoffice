<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>举报列表</h3>
      </el-row>
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">

            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="searchData.handel" placeholder="请选择状态">
                  <el-option
                      v-for="item in platformOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="举报时间">
                <el-date-picker
                    v-model="searchData.addTime"
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
        <el-table
            ref="multipleTable"
            :data="videoList"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55"
              align="center"
              header-align="center"
          >
          </el-table-column>
          <el-table-column
              prop="id"
              label="id"
              align="center"
              header-align="center"
          >
          </el-table-column>
          <el-table-column
              prop="cover"
              label="视频"
              align="center"
              header-align="center"
          >
            <template slot-scope="scope">
              <!--              <img :src="scope.row.cover" alt="" width="200" height="150" style="cursor: pointer">-->
              <el-link  type="primary" @click="openVideo(scope.row.videoUrl[0])" >预览</el-link>
            </template>
          </el-table-column>
          <el-table-column
              prop="videoContent"
              label="简介"
              align="center"
              min-width="300"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="videoAuthorName"
              label="发布人"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="videoAuthorId"
              label="用户ID"
              min-width="110"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="handle"
              label="状态"
              min-width="120"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.handle" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.handle">已查看</span>
              <span v-if="!scope.row.handle" style="color: red;margin-right: 10px">●</span><span v-if="!scope.row.handle">待查看</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="reason"
              label="举报原因"
              min-width="200"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="createdId"
              label="举报人"
              min-width="150"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="createdTime"
              label="举报时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.createdTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="createdIp"
              label="ip"
              min-width="150"
              align="center"
              header-align="center">
          </el-table-column>

          <el-table-column
              label="操作"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-link v-if="!scope.row.handle" type="primary" @click="updateStatus(scope.row.id)">查看</el-link>
              <el-link v-if="scope.row.handle" type="info" disabled>查看</el-link>
            </template>
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


    <el-dialog
        title="视频"
        :visible.sync="videoDialog"
        top="0.5vh"
    >
      <div style="text-align: center;">
        <video controls="controls" :src="videoUrl"  style="margin-left: auto;margin-right: auto;width: 432px;height: 768px;background-color: #000000;"></video>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button @click="videoDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import serve from "../../api/imgHost"
export default {
  name: "reportVideo",
  data(){
    return{
      videoUrl:"",
      page:1,
      size:10,
      total:0,
      videoList:[],
      batchOperation: [
        { id: 1, title: "查看"},
      ],
      searchMsg:"展开",
      advancedSearch:false,
      btnIcon:"el-icon-arrow-down",
      searchData:{
        handel:"all",
        addTime:[]
      },
      platformOptions: [
        {
          value: 'all',
          label: '全部'
        }, {
          value: true,
          label: '查看'
        }, {
          value: false,
          label: '已查看'
        }],
      videoDialog:false
    }
  },

  /*
  * 默认 page,size
  * change page -> getData -> renderTable
  * change size -> getData -> renderTable
  *
  * **/
  methods:{
    updateStatus(id){
      this.$confirm('确定查看这条举报?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("视频举报状态"),{handle:true,ids:[id]},{
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
          this.getVideoList()
          if(res.data.code === "200"){
            this.$message.success("查看成功")
          }
        })
      }).catch()
    },
    openVideo(url){
      this.videoDialog=true;
      this.videoUrl = serve + url
    },
    getVideoList(){
      let data = {}
      data.handel = this.searchData.handel = "all" ? this.searchData.handel = "":this.searchData.handel

      data.addEndTime = this.searchData.addTime.length > 0?this.searchData.addTime[0]:""
      data.addStartTime = this.searchData.addTime.length > 0?this.searchData.addTime[1]:""
      data.page = this.page
      data.size = this.size
      console.log(data);
      this.$axios.post(this.$getUrl("视频举报列表"),data,{
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
            this.videoList = res.data.data.content
            this.total = res.data.data.total
          })
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
      this.getVideoList()
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getVideoList()
    },

  },mounted() {
    this.getVideoList()
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

<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>视频推荐</h3>
      </el-row>
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="用户ID">
                <el-input v-model="searchData.userId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker
                    v-model="searchData.createdTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-button type="primary" @click="search">查询</el-button>
              <el-button>重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <div>
                    <el-button type="primary" icon="el-icon-plus" @click="addVideoDialog = true">新增</el-button>
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
              label="排序"
              align="center"
              header-align="center"
          >
          </el-table-column>
          <el-table-column
              prop="cover"
              label="封面"
              align="center"
              header-align="center"
          >
            <template slot-scope="scope">
              <!--              <img :src="scope.row.cover" alt="" width="200" height="150" style="cursor: pointer">-->
              <el-link  type="primary" @click="openVideoBox(scope.row.url[0])
               " >预览</el-link>
            </template>
          </el-table-column>
          <el-table-column
              prop="content"
              label="简介"
              align="center"
              min-width="300"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="blogCreateName"
              label="发布人"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="blogUserId"
              label="用户ID"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="createdTime"
              label="发布时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.createdTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="updatedTime"
              label="更新时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.updatedTime)}}
            </template>
          </el-table-column>

          <el-table-column
              prop="createdId"
              label="操作人"
              min-width="140"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="!scope.row.backoffice">admin-AI</span>
              <span>{{scope.row.backoffice}}</span>
            </template>
          </el-table-column>

          <el-table-column
              label="操作"
              min-width="200"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-link type="danger" @click="deletedVideo(scope.row.id)">删除</el-link>
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


    <el-dialog
        title="新增视频推荐"
        :visible.sync="addVideoDialog"
        top="15vh"
        width="30%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="视频ID">
          <el-input placeholder="请输入内容" v-model="addVideoId" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getVideo"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="预览">
          <span v-if="videoDetail===''">--</span>
          <el-link v-if="videoDetail!==''" type="primary" @click="videoDialog=true" >预览</el-link>
        </el-form-item>
        <el-form-item label="简介">
          <span v-if="videoDetail===''">--</span>
          <span v-if="videoDetail!==''">{{ videoDetail.blogs.content}}</span>
        </el-form-item>
        <el-form-item label="发布人">
          <span v-if="videoDetail===''">--</span>
          <span v-if="videoDetail!==''">{{ videoDetail.userInfo.userNickname}}</span>
        </el-form-item>
        <el-form-item label="操作说明">
          <el-input type="textarea" placeholder="请输入" v-model="reason"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
       <el-button @click="addVideoDialog = false;videoDetail = ''">取 消</el-button>
        <el-button type="primary" @click="addVideoRecommend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import serve from "../../api/imgHost";

export default {
  name: "videoRecommend",
  data(){
    return{
      videoUrl:"",
      addVideoDialog:false,
      reason:"",
      addVideoId:"",
      page:1,
      size:10,
      total:0,
      videoList:[],
      batchOperation: [
        { id: 1, title: "取消发布"},
        { id: 2, title: "发布"},
        { id: 3, title: "删除"}
      ],
      searchMsg:"展开",
      advancedSearch:false,
      btnIcon:"el-icon-arrow-down",
      searchData:{
        createdTime:[],
        userId:""
      },
      videoDialog:false,
      videoDetail:""
    }
  },

  /*
  * 默认 page,size
  * change page -> getData -> renderTable
  * change size -> getData -> renderTable
  *
  * **/
  methods:{
    deletedVideo(id){
      this.$confirm('确定删除这条推荐?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("视频推荐删除"),{ids:[id]},{
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
          this.getVideoList()
        })

      }).catch()

    },
    search(){
      this.page = 1
      this.getVideoList()
    },
    addVideoRecommend(){
      this.$axios.post(this.$getUrl("视频推荐新增"),{blogId:this.addVideoId},{
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
        if(res.data.code === "200"){
          this.$message.success("添加成功")
          this.videoDetail = ""
          this.addVideoDialog = false
          this.getVideoList()
        }
      })
    },
    getVideo(){
      this.$axios.get(this.$getUrl("动态详情"),{params:{blogsId:this.addVideoId}}).then(
          (res)=>{
            console.log(res);
            if(res.data.data.blogs !== null){
              this.videoDetail = res.data.data
              this.videoUrl =serve + res.data.data.blogs.resourceUrl[0]
            }
          }
      )
    },
    openVideoBox(url){
      this.videoDialog=true
      this.videoUrl = serve + url
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
    getVideoList(){
      let data = {}
      data.createdTimeEnd = this.searchData.createdTime.length>0?this.searchData.createdTime[1]:""
      data.page = this.page
      data.userId = this.userId
      data.size = this.size
      data.createdTimeStart = this.searchData.createdTime.length>0?this.searchData.createdTime[0]:""
      this.$axios.post(this.$getUrl("视频推荐列表"),data,{
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
    }

  },filters: {

  },
  mounted() {
    this.getVideoList()
  }
}

</script>

<style scoped lang="less">
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
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

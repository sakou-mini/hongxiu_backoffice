<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>banner列表</h3>
      </el-row>
      <el-row class="searchForm">
        <el-form ref="form" :model="searchData" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="标题">
                <el-input v-model="searchData.title"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="status" placeholder="请选择状态">
                  <el-option
                      v-for="(item,i) in stateOptions"
                      :key="i"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="开始时间">
                <el-date-picker
                    v-model="searchData.bannerTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="添加时间">
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
            <el-button type="primary" @click="search">查询</el-button>
            <el-button>重置</el-button>
          </div>
        </div>
      </el-row>
      <el-row>
        <div>
                    <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
          <!--          <el-button type="primary" icon="el-icon-download">导出</el-button>-->
          <el-popover
              width="150"
              trigger="click"
              popper-class="hidPadding"
              placement="bottom">
            <div class="list">
<!--              <div class="list-item" v-for="(item, index) in batchOperation" :key="index" >-->
<!--                <div>{{ item.title }}</div>-->
<!--              </div>-->
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
            :data="noticeList"
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
              prop="title"
              label="标题"
              align="center"
              min-width="200"
              header-align="center">
          </el-table-column>
          <el-table-column prop="bannerUrl" label="图片"  align="center" min-width="200">
            <template slot-scope="scope">
              <img :src="serve + scope.row.bannerUrl" @click="videoDialog=true"  alt="" width="200" height="150" style="cursor: pointer">
            </template>
          </el-table-column>
          <el-table-column
              prop="createdId"
              label="操作人"
              min-width="140"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="!scope.row.createdId">-</span>
              <span>{{scope.row.createdId}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="startTime"
              label="开始时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.startTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="endTime"
              label="结束时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.endTime)}}
            </template>
          </el-table-column>


          <el-table-column prop="status" label="状态" min-width="120"  align="center">
            <template slot-scope="scope">
              <el-row>
                <span v-if="scope.row.status === 1" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.status === 1">运行中</span>
                <span v-if="scope.row.status === 3" style="color: red;margin-right: 10px">●</span><span v-if="scope.row.status === 3">已暂停</span>
                <span v-if="scope.row.status === 0" style="color: #faa405;margin-right: 10px">●</span ><span v-if="scope.row.status === 0">待运行</span>
                <span v-if="scope.row.status === 2" style="color: #a0a0a0;margin-right: 10px">●</span><span v-if="scope.row.status === 2">已结束</span>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column
              prop="createdTime"
              label="添加时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.createdTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="更新时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{ scope.row.updateTime === 0?"未更新" : $publicMethod.getTimeForDateAndTime(scope.row.updateTime)}}
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              min-width="200"
              align="center"
              header-align="center">
            <template slot-scope="scope">
<!--              <el-link v-if="scope.row.state!==4" style="margin-right: 20px;" :type="scope.row.state===1||scope.row.state===3?'warning':'primary'">{{ scope.row.state===1 ||scope.row.state===3 ?"暂停":"恢复" }}</el-link>-->

              <el-link v-if="scope.row.status === 0 || scope.row.status === 1 " style="margin-right: 20px;" type="warning" @click="stop(scope.row.id)">暂停</el-link>
              <el-link v-if="scope.row.status === 3" style="margin-right: 20px;" type="primary" @click="reply(scope.row.id)">恢复</el-link>

              <el-link style="margin-right: 20px;" type="success" @click="edit(scope.row)">编辑</el-link>
              <el-link type="danger" @click="deleteBanner(scope.row.id)">删除</el-link>
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
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
     >
      <el-form ref="form" :model="updateForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="updateForm.title" @input="inputChange($event)"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-date-picker
              v-model="updateForm.time"
              @input="inputChange($event)"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload
              :action="updateServe"
              :limit="1"
              name="file"
              accept=".jpg,.jpeg,.png"
              list-type="picture-card"
              :file-list="uploadImgFile"
              :on-preview="pictureCardPreview"
              :on-remove="thumbnailHandleRemove"
              :on-change="thumbnailHandleEditChange"
              :class="{hide:thumbnailHideUploadEdit}"
              ref="thumbnailSelect"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uploadFun">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog :visible.sync="videoDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import serve from "../../api/imgHost"
export default {
  name: "banner",
  data(){
    return{
      uploadId:"",
      uploadType:"add",
      updateData:"",
      /*----------上传组件------------*/
      uploadImgFile:[],
      thumbnailHideUploadEdit:false,
      upload:"",
      dialogImageUrl:"",
      videoDialogVisible:false,
      status:"all",
      total:0,
      serve:"",
      updateServe:"",
      updateForm:{},
      dialogVisible:false,
      page:1,
      size:10,
      searchData:{
        title:""
      },
      stateOptions:[ {
        value: 'all',
        label: '全部'
      }, {
        value: '1',
        label: '运行中'
      }, {
        value: '0',
        label: '待运行'
      }, {
        value: '3',
        label: '已暂停'
      }, {
        value: '2',
        label: '已结束'
      }],
      noticeList:[

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
    reply(id){
      this.$confirm('确定恢复这条Banner?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("状态横幅"),{ids:[id],status:1},{
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
            this.$message.success("修改成功")
          }
          this.getBannerList()
        })

      }).catch()
    },
    stop(id){
      this.$confirm('确定暂停这条Banner?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("状态横幅"),{ids:[id],status:3},{
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
            this.$message.success("修改成功")
          }
          this.getBannerList()
        })

      }).catch()
    },
    inputChange(e){
      this.$forceUpdate()
      console.log(this.updateForm);
    },
    edit(banner){
      this.uploadType = "update"
      this.updateData = banner;
      console.log(this.updateData);
      this.dialogVisible = true
      this.updateForm.title = banner.title
      this.updateForm.time = [banner.startTime,banner.endTime]
      this.uploadImgFile = [{name: 'img.jpg', url: serve+banner.bannerUrl}]
      this.upload = banner.bannerUrl
      this.uploadId = banner.id
      this.thumbnailHideUploadEdit = true
    },
    deleteBanner(id){
      this.$confirm('确定删除这条Banner?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("删除横幅"),{ids:id},{
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
          this.getBannerList()
        })

      }).catch()
    },
    search(){
      this.page=1
      console.log(this.searchData);
      this.getBannerList()
    },
    uploadFun(){
      this.dialogVisible = false;
      console.log(this.upload);
      console.log(this.updateForm);
      let upObj = {}
      upObj.startTime = this.updateForm.time[0]
      upObj.endTime = this.updateForm.time[1]
      upObj.title = this.updateForm.title
      upObj.bannerUrl = this.upload
      upObj.jumpType = 0

      if(this.uploadType === "update"){
        upObj.id = this.uploadId
        this.$axios.post(this.$getUrl("更新横幅"),upObj,{
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
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.getBannerList()
                this.updateForm = {}
                this.upload=""
                this.uploadImgFile = []
                this.thumbnailHideUploadEdit = false
              }
            });
          }
        })
      }else {
        this.$axios.post(this.$getUrl("新增横幅"),upObj,{
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
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.getBannerList()
                this.updateForm = {}
                this.upload=""
                this.uploadImgFile = []
                this.thumbnailHideUploadEdit = false
              }
            });
          }
        })
      }

    },
    thumbnailHandleEditChange(file, fileList){
      console.log(fileList);
      var thumbnailArr = []
      if(fileList.length>0){
        for(let i=0;i<fileList.length;i++){
          if(fileList[i].response){
            thumbnailArr.push(fileList[i].response[0])
          }
        }
      }else {
        this.upload =""
      }
      console.log(thumbnailArr);
      this.upload = thumbnailArr[0]
      console.log(fileList.length >= 1);
      this.thumbnailHideUploadEdit = fileList.length >= 1
    },
    thumbnailHandleRemove(file,fileList){
      console.log(fileList.length >= 1);
      this.upload =""
      this.thumbnailHideUploadEdit = fileList.length >= 1
    },
    pictureCardPreview(file){
      this.dialogImageUrl = file.url;
      this.videoDialogVisible = true;
    },

    handleSelectionChange(val){
      console.log("选中");
      console.log(val);
    },
    handleSizeChange(val) {
      //size Change事件
      console.log(`每页 ${val} 条`);
      this.page = 1
      this.size = val
      this.getBannerList()
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
      this.getBannerList()
    },
    getBannerList(){
      let searchForm = this.searchData
      searchForm.page = this.page
      searchForm.size = this.size
      searchForm.addEndTime = this.searchData.addTime?this.searchData.addTime[1]:""
      searchForm.addStartTime = this.searchData.addTime?this.searchData.addTime[0]:""
      searchForm.endTime = this.searchData.bannerTime?this.searchData.bannerTime[1]:""
      searchForm.startTime = this.searchData.bannerTime?this.searchData.bannerTime[0]:""
      console.log(this.status);
      searchForm.status = this.status === "all" ? "":parseInt(this.status)
      searchForm.title = this.searchData.title
      this.$axios.post(this.$getUrl("查询横幅"),searchForm,{
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
        this.noticeList = res.data.data.content
        this.total = res.data.data.total
        this.searchData.status === "all"
      })
    },


  },
  mounted () {
    this.getBannerList()
  },
  created() {

    this.serve = serve
    this.updateServe = serve+ this.$getUrl('上传文件')
  }
}

</script>

<style lang="less">
.hide .el-upload--picture-card {
  display: none;
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
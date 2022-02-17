<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>音乐列表</h3>
      </el-row>
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="歌名">
                <el-input v-model="searchData.musicName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="歌手">
                <el-input v-model="searchData.musicAuthor" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="searchData.status" placeholder="请选择状态">
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
              <el-form-item label="发布时间">
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
              prop="musicName"
              label="歌名"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="musicAuthor"
              label="歌手"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="usedCount"
              label="使用次数"
              align="center"
              header-align="center"
          >
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.status">正常</span>
              <span v-if="!scope.row.status" style="color: red;margin-right: 10px">●</span><span v-if="!scope.row.status">禁用</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="添加时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.createTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="更新时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.updateTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="operatorName"
              label="操作人"
              min-width="140"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="!scope.row.operatorName">-</span>
              <span>{{scope.row.operatorName}}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              min-width="200"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-link style="margin-right: 20px;" type="success">编辑</el-link>
              <el-link style="margin-right: 20px;" type="danger">{{ scope.row.operation?"启用":"禁用" }}</el-link>
              <el-link style="margin-right: 20px;" type="primary">删除</el-link>
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
      <el-form ref="form" label-width="80px">
        <el-form-item label="歌名">
          <el-input v-model="musicName" ></el-input>
        </el-form-item>
        <el-form-item label="歌手">
          <el-input v-model="musicAuthor"></el-input>
        </el-form-item>
        <el-form-item label="歌曲封面">
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
        <el-form-item label="歌曲">

          <el-upload
              :limit="1"
              :action="updateServe"
              accept=".mp3"
              name="file"
              ref="uploadMusic"
              :on-change="handleChange"
              :on-remove="musicRemove"
              :on-success="musicSuccess"
              :file-list="musicFileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip">只能上传mp3文件</div>
          </el-upload>

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uploadFun">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import serve from "../../api/imgHost"
export default {
  name: "musicList",
  data(){
    return{
      musicName:"",
      musicAuthor:"",

      musicUrl:"",


      dialogVisible:false,
      musicFileList: [],
      uploadImgFile:[],
      thumbnailHideUploadEdit:false,
      upload:"",
      dialogImageUrl:"",
      serve:"",
      updateServe:"",


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
        musicAuthor:"",
        musicName:"",
        status:-1,
        time:[]
      },
      platformOptions: [
        {
          value: -1,
          label: '全部'
        }, {
          value: 1,
          label: '通过'
        }, {
          value: 0,
          label: '拒绝'
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
    search(){
      this.page = 1
      this.getMusicList()
    },
    uploadFun(){
      this.$axios.post(this.$getUrl("添加音乐"),
          {musicAuthor:this.musicAuthor,
            musicCoverUrl:this.upload,
            musicName:this.musicName,
            musicUrl:this.musicUrl
          },{
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
          this.musicAuthor =""
          this.upload = ""
          this.musicName =""
          this.musicUrl = ""
          this.dialogVisible = true
          this.getMusicList()
        }
      })
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




    musicSuccess(res){
      console.log(res);
      this.musicUrl=res[0]
    },
    musicRemove(file,fileList){
      this.musicUrl = ""
      this.musicFileList = []
      this.$refs.uploadMusic.clearFiles()
    },
    handleChange(file, fileList) {
      this.$refs.uploadMusic.submit();
    },
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
      this.getMusicList()
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
      this.getMusicList()
    },
    getMusicList(){
      this.searchData.endTime = this.searchData.time.length > 0 ? this.searchData.time[1]:""
      this.searchData.startTime = this.searchData.time.length > 0 ? this.searchData.time[0]:""
      this.searchData.page = this.page
      this.searchData.size = this.size
      this.$axios.post(this.$getUrl("音乐列表"),this.searchData,{
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
  },filters: {

  },
  mounted() {
    this.getMusicList()
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
<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>标签列表</h3>
      </el-row>
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="标签名">
                <el-input v-model="searchData.labelName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="标签ID">
                <el-input v-model="searchData.labelId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="searchData.enableSearch" placeholder="请选择状态">
                  <el-option
                      v-for="item in platformOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
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
          <el-button type="primary" icon="el-icon-plus" @click="addTagDialog = true">新增</el-button>
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
              prop="labelName"
              label="标签"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{"#"+scope.row.labelName }}
            </template>
          </el-table-column>
          <el-table-column
              prop="useCount"
              label="使用次数"
              align="center"
              header-align="center"
          >
          </el-table-column>
          <el-table-column
              prop="enable"
              label="状态"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.enable" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.enable">正常</span>
              <span v-if="!scope.row.enable" style="color: red;margin-right: 10px">●</span><span v-if="!scope.row.enable">禁用</span>
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
              prop="backstageUserId"
              label="操作人"
              min-width="140"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="!scope.row.backoffice">-</span>
              <span>{{scope.row.backoffice}}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              min-width="200"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-link style="margin-right: 20px;" :type="scope.row.enable?'danger':'primary'" @click="updateTag(scope.row,'en')">{{ scope.row.enable?"禁用":"启用" }}</el-link>
              <el-link style="margin-right: 20px;" type="success" @click="updateTag(scope.row,'ed')">编辑</el-link>
              <el-link style="margin-right: 20px;" type="danger" @click="deleteTag(scope.row.id)">删除</el-link>
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
        title="新增标签"
        :visible.sync="addTagDialog"
        top="15vh"
        width="30%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="标签名">
          <el-input v-model="addTagName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTag">确 定</el-button>
       <el-button @click="addTagDialog = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="修改标签"
        :visible.sync="updateTagDialog"
        top="15vh"
        width="30%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="标签名">
          <el-input v-model="updateTagName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateTagUpload">确 定</el-button>
       <el-button @click="updateTagDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tagList",
  data(){
    return{
      updateTagDialog:false,
      updateTagId:"",
      updateTagName:"",
      addTagName:"",
      addTagDialog:false,
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
        enableSearch:"all",
        labelId:"",
        labelName:""
      },
      platformOptions: [
        {
          value: "all",
          label: '全部'
        },{
          value: true,
          label: '通过'
        }, {
          value: false,
          label: '拒绝'
        }],
      statusOptions:[
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '通过'
        }, {
          value: '2',
          label: '违规'
        }
      ],
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
    updateTagUpload(){
      console.log(this.updateTagId);
      this.$axios.post(this.$getUrl("修改标签"),{labelId:this.updateTagId,labelName:this.updateTagName},{
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
        this.updateTagDialog = false
        this.updateTagName = ""
        this.getTabList()
      })
    },

    deleteTag(id){
      this.$confirm('确定删除这条标签吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        let arr = []
        arr.push(id)
        console.log(arr);
        this.$axios.post(this.$getUrl("删除标签"),{labels:arr},{
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
          this.getTabList()
        })

      }).catch()
    },
    updateTag(tag,type){
      console.log(tag);
      if(type === "en"){

        this.$confirm(tag.enable?'确定禁用这条标签吗?':'确定启用这条标签吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$axios.post(this.$getUrl("修改标签"),{labelId:tag.id,enable:!tag.enable},{
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
            this.getTabList()
          })

        }).catch()

      }else {
        console.log(tag);
        this.updateTagName = tag.labelName
        this.updateTagId = tag.id
        console.log(this.updateTagId);
        this.updateTagDialog = true
      }
    },
    addTag(){
      this.$axios.post(this.$getUrl("添加标签"),{labelName:this.addTagName},{
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
        this.addTagDialog = false
        this.addTagName=""
        if(res.data.code === "200"){
          this.$alert('操作成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.getTabList()
            }
          });
        }
      })
    },
    search(){
      this.page = 1
      this.getTabList()
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
      this.getTabList()
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getTabList()
    },
    getTabList(){
      this.searchData.enable = this.searchData.enableSearch==="all"?"":this.searchData.enableSearch
      this.searchData.page = this.page
      this.searchData.size = this.size
      console.log(this.searchData);
      this.$axios.post(this.$getUrl("标签列表"),this.searchData,{
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
this.getTabList()
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
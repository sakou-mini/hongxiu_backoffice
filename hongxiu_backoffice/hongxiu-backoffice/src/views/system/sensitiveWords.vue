<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>敏感词列表</h3>
      </el-row>
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="敏感词">
                <el-input v-model="searchData.keyword" placeholder="请输入"></el-input>
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
              <el-form-item label="添加时间">
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
              <el-button type="primary" @click="getWordsList()">查询</el-button>
              <el-button>重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="addSensitiveDialog = true">新增</el-button>
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
          <el-table-column
              prop="word"
              label="敏感词"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-row>
                <span v-if="scope.row.status" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.status">正常</span>
                <span v-if="!scope.row.status" style="color: red;margin-right: 10px">●</span><span v-if="!scope.row.status">封禁</span>
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
              <span v-if="!scope.row.createdId">-</span>
              <span>{{scope.row.createdId}}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              min-width="200"
              align="center"
              header-align="center">
            <template slot-scope="scope">

              <el-link style="margin-right: 20px;"  v-if="scope.row.status"  type="danger" @click="updateStatus(scope.row.id,'ban')">禁用</el-link>
              <el-link style="margin-right: 20px;"  v-if="!scope.row.status"  type="primary"  @click="updateStatus(scope.row.id,'open')">启用</el-link>
              <el-link type="success" @click="deleteWord(scope.row.id)">删除</el-link>
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
        title="新增敏感词"
        :visible.sync="addSensitiveDialog"
        top="15vh"
        width="30%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="敏感词">
          <el-input v-model="addSensitive"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSensitiveFun">确 定</el-button>
       <el-button @click="addSensitiveDialog = false;addSensitive=''">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "sensitiveWords",
  data(){
    return{

      addSensitiveDialog:false,
      addSensitive:"",

      searchData:{
        createdTime:[],
        keyword:"",
        status:"all"
      },
      page:1,
      size:10,
      total:0,
      platformOptions: [
        {
          value: 'all',
          label: '全部'
        }, {
          value: true,
          label: '正常'
        }, {
          value: false,
          label: '已禁用'
        }],
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
    deleteWord(id){
      this.$confirm('确定删除敏感词?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("敏感词删除"),{ids:[id]},{
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
            this.$message.success("删除成功")
          }
          this.getWordsList()
        })

      }).catch()
    },
    updateStatus(id,type){
      let data = {}
      let title
      if(type === "ban"){
        data.status = false
        title = "确定封禁敏感词?"
      }else {
        data.status = true
        title = "确定启用敏感词？"
      }
      data.ids = [id]


      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("敏感词状态"),data,{
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
            this.$message.success("删除成功")
          }
          this.getWordsList()
        })

      }).catch()
    },
    addSensitiveFun(){
      this.$axios.post(this.$getUrl("敏感词添加"),{word:this.addSensitive},{
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
        this.addSensitiveDialog = false;
        this.addSensitive=''
        if(res.data.code === "200"){
          this.$message.success("添加成功")
        }
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
      this.getWordsList()
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
      this.getWordsList()
    },
    getWordsList(){
      let upObj = {}
      upObj.createdTimeStart = this.searchData.createdTime[0]
      upObj.createdTimeEnd = this.searchData.createdTime[1]
      upObj.keyword = this.searchData.keyword
      upObj.status = this.searchData.status === "all"?"":this.searchData.status
      upObj.page = this.page
      upObj.size = this.size
     this.$axios.post(this.$getUrl("敏感词列表"),upObj,{
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
     })
    },
  },
  mounted () {
    this.getWordsList()
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

</style>
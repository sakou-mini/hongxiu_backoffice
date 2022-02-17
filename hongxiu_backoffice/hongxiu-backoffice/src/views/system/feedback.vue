<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>反馈列表</h3>
        </el-row>
        <el-row class="searchForm">
          <el-form ref="form" :model="searchData" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="类型">
                  <el-select v-model="searchData.type" placeholder="请选择状态">
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="状态">
                  <el-select v-model="searchData.status" placeholder="请选择状态">
                    <el-option
                        v-for="item in typeOptions"
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
          <el-table :data="userList" stripe style="width: 100%">
            <el-table-column prop="id" label="ID"  align="center">
            </el-table-column>
            <el-table-column prop="content" label="反馈建议"  align="center" min-width="200">
            </el-table-column>
            <el-table-column prop="type" label="类型"  align="center">
            </el-table-column>
            <el-table-column prop="createdId" label="反馈人"  align="center">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式"  align="center">
            </el-table-column>
            <el-table-column prop="createdTime" min-width="150" label="提交时间"  align="center">
            </el-table-column>
            <el-table-column prop="createdIp" label="IP"  align="center">
            </el-table-column>
            <el-table-column prop="state" label="状态"  align="center">
              <template slot-scope="scope">
                <el-row>
                  <span v-if="scope.row.status === 0" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.status === 0">待查看</span>
                  <span v-if="scope.row.status === 1" style="color:  #faa405;margin-right: 10px">●</span><span v-if="scope.row.status === 1">已查看</span>
                  <span v-if="scope.row.status === 2" style="color:red;margin-right: 10px">●</span ><span v-if="scope.row.status === 2">已回复</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="操作"  align="center">
              <template slot-scope="scope">
                <el-row>
                  <el-link type="primary" v-if="scope.row.status === 0" @click="check(scope.row.id)">查看</el-link>
                  <el-link type="primary" v-if="scope.row.status === 1" @click="feedDialog=true,feedId=scope.row.id">回复</el-link>
                  <el-link type="primary" v-if="scope.row.status === 2" disabled >已回复</el-link>
                </el-row>
              </template>
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

    <el-dialog
        title="回复内容"
        :visible.sync="feedDialog"
        width="30%"
    >
      <div style="font-size: .9rem;color: #aaaaaa;margin-bottom: 1rem;">回复内容：</div>
      <el-row>
        <el-input type="textarea" placeholder="请输入（必填）" v-model="reason"></el-input>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="feedDialog = false;reason=''">取 消</el-button>
    <el-button type="primary" @click="reply">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>


// "@/assets/image/headimg.jpg"
export default {
  name: "feedback",
  data () {
    return {
      feedId:"",
      feedDialog:false,
      reason:"",
      page:1,
      size:10,
      total:0,
      typeOptions:[   {
        value: "all",
        label: "全部"
      }, {
        value: 0,
        label: "问题"
      }, {
        value: 1,
        label: "功能"
      }],
      stateOptions: [
        {
          value: "all",
          label: "全部"
        }, {
          value: 0,
          label: "待查看"
        }, {
          value: 1,
          label: "已查看"
        }, {
          value: 2,
          label: "已回复"
        }],
      selectServe: "",
      state: false,
      searchData: {
        status:"all",
        type:"all"
      },
      userList: []
    }
  }, methods: {
    reply(){
      this.$axios.post(this.$getUrl("反馈回复"),{id:this.feedId,reply:this.reason,status:2},{
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
        this.getFeedbackList()
        this.feedId=""
        this.feedDialog=false
        this.reason = ""
      })
    },
    check(id){
      this.$confirm('确定查看这条反馈?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("反馈查看"),{id:id,status:1},{
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
          this.getFeedbackList()
        })

      }).catch()
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
      this.getFeedbackList()
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
      this.getFeedbackList()
    },
    getFeedbackList(){
      let data = {}
      data.status = this.status === "all"?this.status === "":this.status
      data.type = this.type === "all"?this.type === "":this.type
      data.page = this.page
      data.size = this.size
      this.$axios.post(this.$getUrl("反馈列表"),data,{
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
        this.total = res.data.data.total
      })
    }


  }, mounted () {
    this.getFeedbackList()
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
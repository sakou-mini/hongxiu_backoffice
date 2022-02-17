<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>评论列表</h3>
      </el-row>
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="发布人">
                <el-input v-model="searchData.publishName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户ID">
                <el-input v-model="searchData.userId" placeholder="请输入"></el-input>
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
            <el-col :span="5">
              <el-form-item label="机审结果">
                <el-select v-model="searchData.systemAuditStatus" placeholder="请选择机审结果">
                  <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">

            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker
                    v-model="searchData.createTime"
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
              prop="text"
              label="评论"
              min-width="400"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="userName"
              label="发布人"
              align="center"
              min-width="130"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="userId"
              label="用户id"
              align="center"
              min-width="100"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="releaseTime"
              label="发布时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.commentTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="更新时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.auditTime)}}
            </template>
          </el-table-column>
          <el-table-column
              prop="aiAudit"
              label="机审结果"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <!--              <img :src="scope.row.cover" alt="" width="200" height="150" style="cursor: pointer">-->
              <span v-if="scope.row.systemAuditStatus === 'AUDIT_EMPTY'" :style="{color:'#a5acb3'}">未审核</span>
              <span v-if="scope.row.systemAuditStatus === 'AUDIT_PASS'"  :style="{color:'green'}">通过</span>
              <span v-if="scope.row.systemAuditStatus === 'AUDIT_NOT_PASS'"  :style="{color:'red'}">违规</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="manAudit"
              label="人工审核"
              align="center"
              min-width="150"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.manualAuditStatus === 'AUDIT_PASS'" :style="{color:'green'}">{{"已通过"}}</span>
              <span v-if="scope.row.manualAuditStatus === 'AUDIT_NOT_PASS'" :style="{color:'red'}">{{"未通过"}}</span>
              <el-link  v-if="scope.row.manualAuditStatus === 'AUDIT_EMPTY'"  style="margin-right: 20px;" type="primary" @click="passComment(scope.row.id)">通过</el-link>
              <el-link  v-if="scope.row.manualAuditStatus === 'AUDIT_EMPTY'"  type="primary" @click="refuseComment(scope.row.id)">拒绝</el-link>
            </template>
          </el-table-column>
          <el-table-column
              prop="state"
              label="状态"
              min-width="120"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 'COMMENT_PASS'" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.status === 'COMMENT_PASS'">已发布</span>
              <span v-if="scope.row.status === 'COMMENT_NO_PASS'" style="color: red;margin-right: 10px">●</span><span v-if="scope.row.status === 'COMMENT_NO_PASS'">已拒绝</span>
              <span v-if="scope.row.status === 'COMMENT_APPROVED'||scope.row.status === 'COMMENT_UNAPPROVED'" style="color: #ffa600;margin-right: 10px">●</span><span v-if="scope.row.status === 'COMMENT_APPROVED'||scope.row.status === 'COMMENT_UNAPPROVED'">待审核</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="operatorName"
              label="操作人"
              min-width="140"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="!scope.row.operatorName">admin-AI</span>
              <span>{{scope.row.operatorName}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="refuseReason"
              label="操作原因"
              align="center"
              header-align="center"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.refuseReason">-</span>
              <el-link  v-if="scope.row.refuseReason" type="primary" @click="openRefuseReason(scope.row.refuseReason)">查看</el-link>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              min-width="200"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-link  style="margin-right: 20px;"  type="danger" v-if="scope.row.status === 'COMMENT_PASS'" @click="refuseComment(scope.row.id)">取消发布</el-link>
              <el-link  style="margin-right: 20px;"  type="primary" v-if="scope.row.status === 'COMMENT_NO_PASS'" @click="passComment(scope.row.id)">发布</el-link>
              <el-link  style="margin-right: 20px;"  type="primary" v-if="scope.row.status === 'COMMENT_APPROVED'||scope.row.status === 'COMMENT_UNAPPROVED'" @click="passComment(scope.row.id)">发布</el-link>

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
        title="确定要拒绝这条评论吗？"
        :visible.sync="refuseCommentDialog"
        width="30%"
    >
      <div style="font-size: .9rem;color: #aaaaaa;margin-bottom: 1rem;"><span style="color: red;margin-right: 1rem;">*</span>操作说明：</div>
      <el-row>
        <el-input type="textarea" placeholder="请输入（必填）" v-model="reason"></el-input>
      </el-row>
      <el-row style="font-size: .6rem;color: #aaaaaa;margin-top: .5rem;">被禁用的评论在前端显示</el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="refuseCommentDialog = false;reason=''">取 消</el-button>
    <el-button type="primary" @click="refuseCommentFun">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "commentList",
  data(){
    return{
      refuseCommentDialog:false,
      reason:"",
      refuseCommentId:"",
      total:0,
      page:1,
      size:10,
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
        userId:"",
        systemAuditStatus:-1,
        status:-1,
        publishName:"",
        createTime:[]
      },
      platformOptions: [
        {
          value: -1,
          label: '全部'
        }, {
          value: 0,
          label: '通过'
        }, {
          value: 1,
          label: '拒绝'
        }],
      statusOptions:[
        {
          value: -1,
          label: '全部'
        }, {
          value: 1,
          label: '已发布'
        }, {
          value: 2,
          label: '待审核'
        }, {
          value: 3,
          label: '待审核'
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
    openRefuseReason(res){
      this.$confirm(res, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(() => { }).catch()
    },
    search(){
      this.page = 1
      this.getCommentList()
    },
    refuseCommentFun(){
      this.$axios.post(this.$getUrl("评论审核"),{ids:[this.refuseCommentId],status:2,refuseReason:this.reason},{
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
        this.reason = ""
        this.refuseCommentDialog = false
        this.getCommentList()
      })
    },
    refuseComment(id){
      this.refuseCommentId = id
      this.refuseCommentDialog = true
    },
    passComment(id){
      this.$confirm('确定发布这条评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("评论审核"),{ids:[id],status:1},{
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
          this.getCommentList()
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
      this.size = val
      /**
       * 修改size指向
       * getData
       * */
      this.getCommentList()
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getCommentList()
    },
    getUserNameAndId(list){
      for(let i=0;i<list.length;i++){
        list[i].userName = list[i].fromUser.nickname
        list[i].userId = list[i].fromUser.userId
      }
      return list
    },
    getCommentList(){
      let data = {}
      data.endTime = this.searchData.createTime[1]
      data.page = this.page
      data.publishName = this.publishName
      data.size = this.size
      data.startTime = this.searchData.createTime[0]
      data.status = this.searchData.status
      data.systemAuditStatus = this.searchData.systemAuditStatus
      data.userId = this.searchData.userId
      this.$axios.post(this.$getUrl("评论列表"),data,{
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
        this.videoList = this.getUserNameAndId(res.data.data.content)
        this.total=res.data.data.total
      })
    }
  },
  mounted() {
    this.getCommentList()
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
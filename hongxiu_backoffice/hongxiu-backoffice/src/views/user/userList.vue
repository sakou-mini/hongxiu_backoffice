<template>
  <div>
    <div class="backGround">
    <div class="Box">
      <el-row>
        <h3>用户列表</h3>
      </el-row>
      <el-row class="searchForm">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="用户名">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="用户ID">
                <el-input v-model="form.userId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="手机号">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="登录">
                <el-select v-model="form.loginType" placeholder="请选择状态">
                  <el-option
                      v-for="item in loginOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="advancedSearch">
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择状态">
                  <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="最近登录">
                <el-date-picker
                    v-model="form.lastLoginTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册时间">
                <el-date-picker
                    v-model="form.joinTime"
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
            <el-button @click="recharge">重置</el-button>
            <el-link type="primary" style="margin: 0 20px"  @click="switchSearch">
              {{searchMsg}}<i :class="btnIcon"></i>
            </el-link>
          </div>
        </div>
      </el-row>
      <el-row>
        <div>
          <!--          <el-button type="primary" icon="el-icon-plus">新增</el-button>-->
                    <el-button type="primary" icon="el-icon-download">导出</el-button>
          <el-popover
              width="150"
              trigger="click"
              popper-class="hidPadding"
              placement="bottom">
            <div class="list">
              <div class="list-item" v-for="(item, index) in batchOperation"  @click="batch(item.status)" :key="index" >
                <div>{{ item.title }}</div>
              </div>
            </div>
            <el-button slot="reference" style="margin-left: 10px;">批量操作</el-button>
          </el-popover>
        </div>
        <div v-if="tableSelectionData.length > 0">
          <div class="checkboxOptionBox">
            <i class="el-icon-info bgcBlue"></i>
            <span>已选择<span class="bgcBlue">{{tableSelectionData.length}}</span>项</span>
            <span class="bgcBlue" style="cursor: pointer" @click="clearTableSelection">清空</span>
          </div>
        </div>
      </el-row>
      <el-row>
        <el-table :data="userList" ref="userTable"  :row-key="getKey" stripe style="width: 100%" @selection-change="selectionChange">
          <el-table-column
              type="selection"
              width="55"
              align="center"
              header-align="center"
              :reserve-selection="true"
          >
          </el-table-column>
          <el-table-column prop="id" label="用户ID" min-width="100" align="center">
          </el-table-column>
          <el-table-column prop="nickname" label="用户名" min-width="150"  align="center">
          </el-table-column>
          <el-table-column prop="accountId" label="账号ID" min-width="150"  align="center">
          </el-table-column>
          <el-table-column prop="source" label="登录" min-width="120"  align="center">
          </el-table-column>
          <el-table-column prop="signatureText" min-width="150" :show-overflow-tooltip="true" label="简介"  align="center">
          </el-table-column>
          <el-table-column prop="gender" label="性别" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.gender === 'Gender_NULL'">-</span>
              <span v-if="scope.row.gender === 'MALE'">男</span>
              <span v-if="scope.row.gender === 'FEMALE'">女</span>
            </template>
          </el-table-column>
          <el-table-column prop="birthday" label="生日" align="center" min-width="150">
            <template slot-scope="scope">
              {{scope.row.birthday?$publicMethod.getTimeForDateAndTime(scope.row.birthday):"-"}}
            </template>
          </el-table-column>

          <el-table-column
              prop="status"
              label="状态"
              min-width="120"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <span v-if="!scope.row.status" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="!scope.row.status">正常</span>
              <span v-if="scope.row.status" style="color: red;margin-right: 10px">●</span><span v-if="scope.row.status">已封禁</span>
            </template>
          </el-table-column>

          <el-table-column prop="blogsCount" label="作品" align="center">
          </el-table-column>
          <el-table-column prop="commentCount" label="评论"  align="center">
          </el-table-column>
          <el-table-column prop="focusCount" label="关注中"  align="center">
          </el-table-column>
          <el-table-column prop="fansCount" label="粉丝"  align="center">
          </el-table-column>
          <el-table-column
              prop="lastLoginTime"
              label="最近登录"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{scope.row.lastLoginTime?$publicMethod.getTimeForDateAndTime(scope.row.lastLoginTime):"-"}}
            </template>
          </el-table-column>
          <el-table-column
              prop="lastLoginLoginIp"
              label="最近登录IP"
              min-width="150"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="更新时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{scope.row.updateTime?$publicMethod.getTimeForDateAndTime(scope.row.updateTime):"-"}}
            </template>
          </el-table-column>
          <el-table-column
              prop="reason"
              label="操作原因"
              align="center"
              header-align="center"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.reason">-</span>
              <el-link v-if="scope.row.reason" type="primary">查看</el-link>
            </template>
          </el-table-column>

          <el-table-column label="操作"  align="center" min-width="200">
            <template slot-scope="scope">
              <el-row>
<!--                <el-link style="margin-right: 20px;" type="primary" @click="userDetails">详情</el-link>-->
                <el-link  style="margin-right: 20px;"  type="primary" v-if="scope.row.status" @click="passUser(scope.row.id)">启用</el-link>
                <el-link  style="margin-right: 20px;"  type="danger" v-if="!scope.row.status" @click="banUser(scope.row.id)">禁用</el-link>
                <el-link type="primary" @click="editUserBox(scope.row.id)">编辑</el-link>
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
        title="提示"
        :visible.sync="editDialog"
        width="50%"
        >
      <el-row>
        <el-descriptions title="用户基础信息">
          <el-descriptions-item label="用户头像" labelClassName="editHeadImg">
            <el-avatar :src="serve+userEdit.avatarUrl"></el-avatar>
          </el-descriptions-item>
          <el-descriptions-item label="用户ID">{{ userEdit.id }}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{ userEdit.nickname }}</el-descriptions-item>
          <el-descriptions-item label="简介">{{ userEdit.signatureText }}</el-descriptions-item>
          <el-descriptions-item label="性别">
            <span v-if="userEdit.gender === 'Gender_NULL'">-</span>
            <span v-if="userEdit.gender === 'MALE'">男</span>
            <span v-if="userEdit.gender === 'FEMALE'">女</span>
          </el-descriptions-item>
          <el-descriptions-item label="生日">{{ userEdit.birthday }}</el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="登录信息">
          <el-descriptions-item label="最近登录时间">{{$publicMethod.getTimeForDateAndTime(userEdit.lastLoginTime)}}</el-descriptions-item>
          <el-descriptions-item label="最近登录IP">{{userEdit.lastLoginLoginIp}}</el-descriptions-item>
          <el-descriptions-item label="最近登录设备"></el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="注册信息">
          <el-descriptions-item label="注册时间">{{$publicMethod.getTimeForDateAndTime(userEdit.firstLoginTime)}}</el-descriptions-item>
          <el-descriptions-item label="注册IP">{{$publicMethod.getTimeForDateAndTime(userEdit.firstLoginIp)}}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag size="small" :type="userEdit.status?'danger':'primary'">{{userEdit.status?'封禁':'正常'}}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetUser(userEdit.id,0)">重置用户名</el-button>
<!--        0用户名1头像2简介-->
          <el-button @click="resetUser(userEdit.id,1)">重置头像</el-button>
          <el-button @click="resetUser(userEdit.id,2)">重置简介</el-button>
          <el-button plain :type="userEdit.status?'primary':'danger'" :icon="userEdit.status?'el-icon-circle-check':'el-icon-circle-close'" @click="banOrPass(userEdit.id,userEdit.status)">{{userEdit.status?"解封用户":"封禁用户"}}</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="确定要批量禁用用户吗？"
        :visible.sync="banUserDialog"
        width="30%"
       >
      <div style="font-size: .9rem;color: #aaaaaa;margin-bottom: 1rem;"><span style="color: red;margin-right: 1rem;">*</span>操作说明：</div>
      <el-row>
        <el-input type="textarea" placeholder="请输入（必填）" v-model="reason"></el-input>
      </el-row>
      <el-row style="font-size: .6rem;color: #aaaaaa;margin-top: .5rem;">被禁用的用户将会被静止登录</el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="banUserDialog = false;reason=''">取 消</el-button>
    <el-button type="primary" @click="banSelectionUser(sel)">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

import serve from "../../api/imgHost"
// "@/assets/image/headimg.jpg"
export default {
  name: "userList",
  data () {
    return {
      banUserId:"",
      sel:"all",
      serve:"",
      reason:"",
      userEdit:{},
      editDialog:false,
      banUserDialog:false,
      page:1,
      size:10,
      total:0,
      tableSelectionData:[],
      advancedSearch:false,
      btnIcon:"el-icon-arrow-down",
      searchMsg:"展开",
      selectState: "1",
      form:{
        joinTime:null,
        lastLoginTime:null,
        loginType:"",
        nickname:"",
        phone:"",
        status:"",
        userId:""
      },
      loginOptions:[
        {
          value:"",
          label:"全部"
        }, {
          value:"phone",
          label:"手机"
        }, {
          value:"facebook",
          label:"Facebook"
        }, {
          value:"google",
          label:"Google"
        }, {
          value:"twitter",
          label:"Twitter"
        },
      ],
      stateOptions: [
      {
        value: "",
        label: "全部"
      }, {
        value: true,
        label: "正常"
      }, {
        value: false,
        label: "封禁"
      }],
      selectServe: "",
      batchOperation: [
        { status: false, title: "封禁"},
        { status: true, title: "启用"}
      ],

      searchData: {
        userId: "",
        phone: "",
        account: ""
      },
      userList: [

      ]
    }
  }, methods: {
    resetUser(id,resetType){
      let opt
      switch (resetType){
        case 0:
          opt = "用户名"
              break
        case 1:
          opt = "头像"
          break
        case 2:
          opt = "简介"
          break
      }
      this.$confirm('确定重置用户'+opt+"?", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("重置用户"),{resetType,userId:id},{
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
          this.getUserData()
          this.editDialog = false
        })
        console.log(update);
      }).catch()
    },
    banOrPass(id,status){
      if(status){
        this.passUser(id)
      }else {
        this.banUser(id)
      }
    },
    banUser(id){
      this.banUserDialog = true
      this.sel = "only"
      this.banUserId = id
    },
    passUser(id){
      this.$confirm('确定启用这些用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        console.log(this.tableSelectionData);
        let update = {}
        update.userIds = [id]
        update.status = false
        this.$axios.post(this.$getUrl("修改用户状态"),update,{
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
          this.getUserData()
          this.editDialog = false
        })
        console.log(update);
      }).catch()
    },
    editUserBox(id){
      this.$axios.post(this.$getUrl("用户详情"),{userId:id},{
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
          this.userEdit = res.data.data
        this.editDialog = true
      })
    },
    banSelectionUser(sel){
      let update = {}
      update.userIds = []
      if(sel === "all"){
        for(let i=0;i<this.tableSelectionData.length;i++){
          update.userIds.push(this.tableSelectionData[i].id)
        }
      }else {
        update.userIds.push(this.banUserId)
      }
      update.status = true
      update.reason = this.reason
      this.$axios.post(this.$getUrl("修改用户状态"),update,{
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
        this.banUserDialog = false
        this.editDialog = false
        this.getUserData()
        this.reason = ""
      })
    },
    batch(status){
    //  批量操作
      console.log(status);
      if(status){
        this.$confirm('确定启用这些用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          console.log(this.tableSelectionData);
          let update = {}
          update.userIds = []
          for(let i=0;i<this.tableSelectionData.length;i++){
            update.userIds.push(this.tableSelectionData[i].id)
          }
          update.status = false
          this.$axios.post(this.$getUrl("修改用户状态"),update,{
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
            this.getUserData()
          })
          console.log(update);
        }).catch()
      }
      else {
        this.banUserDialog = true
        this.sel = "all"
      }
    },
    clearTableSelection(){
      this.$refs.userTable.clearSelection();
      this.tableSelectionData = []
    },
    getKey(row){
      return row.id
    },
    selectionChange(val,index){
      console.log(val);
      console.log(index);
      this.tableSelectionData = val
    },
    recharge(){
      this.form={
        joinTime:null,
        lastLoginTime:null,
        loginType:"",
        nickname:"",
        phone:"",
        status:"",
        userId:""
      }
      this.getUserData()
    },
    search(){
      if(this.form.status !== ""){
        // this.form.status = this.form.status === "1"
      }
      this.form.joinTimeStart = this.form.joinTime === null ? "":this.form.joinTime[0]
      this.form.joinTimeEnd = this.form.joinTime === null ? "":this.form.joinTime[1]
      this.form.lastLoginTimeStart = this.form.lastLoginTime === null ? "":this.form.lastLoginTime[0]
      this.form.lastLoginTimeEnd = this.form.lastLoginTime === null ? "":this.form.lastLoginTime[1]
      this.page = 1

      this.getUserData()
      console.log(this.form);
    },
    handleSizeChange(val) {
      //size Change事件
      console.log(`每页 ${val} 条`);
      this.page = 1
      this.size = val
      this.getUserData()
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
      this.getUserData()
    },
    userDetails () {
      //跳转路径
      this.$router.push('/index/userDetails')
    },
  switchSearch(){
    this.advancedSearch = !this.advancedSearch
    this.btnIcon = this.advancedSearch?"el-icon-arrow-up":"el-icon-arrow-down"
    this.searchMsg = this.advancedSearch?"收起":"展开"
  },
    getUserData(){
      this.form.page = this.page
      this.form.size = this.size
      this.$axios.post(this.$getUrl("用户列表"),this.form,{
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
    this.getUserData()
    this.serve =serve
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
    div{
      transition: all .4s ease;
      color: #bababa;
      margin-left: 10px;
      font-size: 0.95rem;
      float: left;
    }
    &:after{
      content: "";
      clear: left;
      display: block;
    }
    &:last-child{
      border-bottom: none;
    }
    &:nth-child(1):hover{
      background-color: rgb(238, 119, 119);
      div{
        color: white;
      }
    }
    &:nth-child(2):hover{
      background-color: #6dcdff;
      div{
        color: white;
      }
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
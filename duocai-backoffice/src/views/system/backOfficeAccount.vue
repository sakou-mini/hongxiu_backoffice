<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>账号列表</h3>
      </el-row>
      <el-row>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
          <!--          <el-button type="primary" icon="el-icon-download">导出</el-button>-->

        </div>

      </el-row>
      <el-row>
        <el-table
            ref="multipleTable"
            :data="noticeList"
            tooltip-effect="dark"
           >
          <el-table-column
              prop="username"
              label="账号"
              align="center"
              min-width="150"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="nickname"
              label="名称"
              align="center"
              min-width="150"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="roleName"
              label="组别"
              align="center"
              header-align="center"
              min-width="180"
          >
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
          <el-table-column prop="enabled" label="状态"  align="center">
            <template slot-scope="scope">
              <el-row>
<!--                <el-tag :type="scope.row.state.color">{{scope.row.state.title }}</el-tag>-->
                <span v-if="scope.row.enabled" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.enabled">正常</span>
                <span v-if="!scope.row.enabled" style="color: red;margin-right: 10px">●</span><span v-if="!scope.row.enabled">封禁</span>
              </el-row>
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
              <el-link style="margin-right: 20px;" type="success" @click="edit(scope.row)">编辑</el-link>
              <el-link  style="margin-right: 20px;"  type="danger" v-if="scope.row.enabled" @click="ban(scope.row.id)">封禁</el-link>
              <el-link  style="margin-right: 20px;"  type="primary" v-if="!scope.row.enabled" @click="unseal(scope.row.id)">解封</el-link>
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
        title="新增后台用户"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.nickname"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="登录账号"  @input="change($event)" v-if="type === 'add'">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码"  @input="change($event)" v-if="type === 'add'">
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item label="组别" @change="change($event)">
          <el-select v-model="form.roleId" placeholder="请选择组别">
            <el-option
                v-for="(item,i) in roleList"
                :key="i"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="uploadRole">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "backOfficeAccount",
  data(){
    return{
      type:"add",
      dialogVisible:false,
      form:{
        nickname:"",
        username:"",
        pwd:"",
        roleId:""
      },
      page:1,
      size:10,
      total:0,
      noticeList:[],
      roleList:[

      ]
    }
  },

  /*
  * 默认 page,size
  * change page -> getData -> renderTable
  * change size -> getData -> renderTable
  *
  * **/
  methods:{
    change(e) {
      this.$forceUpdate()
    },
    edit(obj){
      console.log(obj);
      this.type = "edit"
      this.roleList=[]
      this.$axios.get(this.$getUrl("组别下拉选项")).then((res)=>{
        console.log(res);
        let role = res.data.data
        for(let i=0;i<role.length;i++){
          let obj = {}
          obj.label = role[i].roleAlias
          obj.value = role[i].roleId
          this.roleList.push(obj)
        }
        this.setId = obj.id
        this.dialogVisible = true
        this.form.nickname = obj.nickname
        this.form.roleId = obj.roles[0].id
      })

    },
    uploadRole(){
      if(this.type === "add"){
        this.form.status = true
        console.log(this.form);
        this.$axios.post(this.$getUrl("添加后台用户"),this.form,{
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
            this.form = {
              nickname:"",
              username:"",
              pwd:"",
              roleId:""
            }
            this.getBackofficeList()
            this.dialogVisible = false
          }
        })
      }else {
        this.$axios.post(this.$getUrl("修改后台用户"),{id:this.setId,nickname:this.form.nickname,roleId:this.form.roleId},{
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
            this.form = {
              nickname:"",
              username:"",
              pwd:"",
              roleId:""
            }
            this.getBackofficeList()
            this.dialogVisible = false
          }
        })
      }
    },
    add(){
      this.type = "add"
      this.form={
        nickname:"",
        username:"",
        pwd:"",
        roleId:""
      }
      this.roleList=[]
      this.$axios.get(this.$getUrl("组别下拉选项")).then((res)=>{
        console.log(res);
        let role = res.data.data
        for(let i=0;i<role.length;i++){
          let obj = {}
          obj.label = role[i].roleAlias
          obj.value = role[i].roleId
          this.roleList.push(obj)
        }
      })
      this.dialogVisible = true
    },
    unseal(id){
      this.$confirm('确定解封后台用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("修改后台状态"),{ids:[id],enabled:true},{
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
          this.getBackofficeList()
        })

      }).catch()
    },
    ban(id){
      this.$confirm('确定封禁后台用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("修改后台状态"),{ids:[id],enabled:false},{
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
          this.getBackofficeList()
        })

      }).catch()
    },
    handleSizeChange(val) {
      //size Change事件
      console.log(`每页 ${val} 条`);
      this.size = val
      /**
       * 修改size指向
       * getData
       * */
      this.getBackofficeList()
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getBackofficeList()
    },

    getBackofficeList(){
      this.$axios.get(this.$getUrl("查询后台列表"),{params:{page:this.page,size:this.size}}).then((res)=>{
        console.log(res);
        this.noticeList = this.filter(res.data.data.content)
        this.total = res.data.data.total
        console.log(this.noticeList);
      })
    },
    filter(list){
      console.log(1);
      for(let i =0;i<list.length;i++){
        console.log(list[i].roles[0]);
        list[i].roleName = list[i].roles[0].roleAlias
      }
      return list
    }
  },
  mounted () {

    this.getBackofficeList()
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
<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>组别列表</h3>
      </el-row>
      <el-row>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
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
              prop="roleAlias"
              label="组别名"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="created"
              label="添加时间"
              min-width="150"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              {{$publicMethod.getTimeForDateAndTime(scope.row.created)}}
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
              <el-link style="margin-right: 20px;" type="success" @click="edit(scope.row.id,scope.row.roleAlias)">编辑</el-link>
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
        title="权限修改"
        :visible.sync="dialogVisible"
        width="30%"
    >



      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="组别名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="组别标识名" v-if="type === 'add'">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="组别权限">
          <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="checkedDefault"
          >
          </el-tree>
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
import menuList from "../../router/router.json"
import {importPath} from "../../publicMethod/pathFilter";
export default {
  name: "roleOperation",
  data(){
    return{
      type:"add",
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [],
      dialogVisible:false,
      page:1,
      size:10,
      total:0,
      noticeList:[],
      checkedDefault:[],
    form:{
        name:"",
      roleName:""
    },
      setId:""
    }
  },

  /*
  * 默认 page,size
  * change page -> getData -> renderTable
  * change size -> getData -> renderTable
  *
  * **/
  methods:{
    add(){
      this.$nextTick(function (){
        this.$refs.tree.setCheckedKeys([])
      })
      this.type = "add"
      this.dialogVisible = true
    },
    uploadRole(){
      let menuList = this.$refs.tree.getCheckedNodes();
      let menuIds = []
      for(let i=0;i<menuList.length;i++){
        menuIds.push(menuList[i].id)
      }
 if(this.type === "edit"){
   this.$axios.post(this.$getUrl("组别修改"),{menuIds,roleId:this.setId,roleAlias:this.form.name},{
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
     this.dialogVisible = false
     this.getRoleList()
     this.form={name:"", roleName:""}
   })
 }else {
   this.$axios.post(this.$getUrl("组别添加"),{menuIds,roleId:this.setId,roleAlias:this.form.name,roleName:this.form.roleName,status:true},{
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
     this.dialogVisible = false
     this.form={name:"", roleName:""}
     this.getRoleList()
   })
 }

      console.log(menuIds);
    },
    edit(id,name){
      this.setId = id
      this.type = "edit"
      this.$nextTick(function (){
        this.$refs.tree.setCheckedKeys([])
      })
      this.form.name = name
      this.dialogVisible = true
      this.$axios.get(this.$getUrl("组别对应菜单"),{params:{roleId:id}}).then((res)=>{
        console.log(res);
        let list = []
        for(let i=0;i<res.data.data.length;i++){
          if(res.data.data[i].id !== "1"){
            list.push(res.data.data[i].id)
          }
        }
        this.checkedDefault = list
      })
    },
    ban(id){
      this.$confirm('确定封禁组别?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("组别启用关闭"),{roleIds:[id],status:false},{
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
          this.getRoleList()
        })

      }).catch()
    },
    unseal(id){
      this.$confirm('确定解封组别?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("组别启用关闭"),{roleIds:[id],status:true},{
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
          this.getRoleList()
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
      this.getRoleList()
    },
    handleCurrentChange(val) {
      //page Change事件
      console.log(`当前页: ${val}`);
      /**
       * 修改page指向
       * getData
       * */
      this.page = val
      this.getRoleList()
    },
    getRoleList(){
      this.$axios.get(this.$getUrl("组别列表"),{params:{page:this.page,size:this.size}}).then((res)=>{
        console.log(res);
        this.noticeList = res.data.data.content
        this.total = res.data.data.total
      })
    },
    getMenuList(){
      this.data=this.filter(menuList)
      console.log(this.test);
    },
    filter(menu){
      let menuList = []
      for (let item of menu){
     if(item.id !== "1"){
       let routerObj = {
         id:item.id,
         label: item.displayName,
         children:[]
       }
       let flag = true
       for(let x = 0;x<menuList.length;x++){
         if(menuList[x].id === item.groupId){
           menuList[x].children.push(routerObj)
           flag = false
         }
       }
       if(flag){
         menuList.push(routerObj)
       }
     }
      }
      return menuList
    }
  },
  mounted () {
    this.getMenuList()
    this.getRoleList()
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
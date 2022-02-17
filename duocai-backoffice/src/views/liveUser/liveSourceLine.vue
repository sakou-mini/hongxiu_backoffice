<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>CDN管理</h3>
        </el-row>
        <el-row>
          <el-table :data="userList" stripe style="width: 100%">
            <el-table-column prop="lineCode" label="节点ID"  align="center">
            </el-table-column>
            <el-table-column prop="nodeName" label="节点名称"  align="center">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间"  align="center">
              <template slot-scope="scope">
                {{$publicMethod.getTimeForDateAndTime(scope.row.updateTime)}}
              </template>
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
            <el-table-column label="操作"  align="center" >
              <template slot-scope="scope">
                <el-row>
                  <el-link v-if="scope.row.enable" type="danger" @click="ban(scope.row.lineCode)">禁用</el-link>
                  <el-link v-if="!scope.row.enable" type="primary" @click="use(scope.row.lineCode)">启用</el-link>
                </el-row>
              </template>
            </el-table-column>

          </el-table>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>


// "@/assets/image/headimg.jpg"
export default {
  name: "liveUserList",
  data () {
    return {
      userList: [],
      page:1,
      size:10
    }
  }, methods: {
    ban(id){
      this.$confirm('确定封禁节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("CDN状态修改"),{lineCode:id,status:false},{
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
          this.getSourceLise()
        })

      }).catch()
    },
    use(id){
      this.$confirm('确定解封节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("CDN状态修改"),{lineCode:id,status:true},{
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
          this.getSourceLise()
        })

      }).catch()
    },
    getSourceLise(){
      this.$axios.get(this.$getUrl("CDN列表")).then((res)=>{
        console.log(res);
        this.userList = res.data.data
      })
    }
  }, mounted () {
    this.getSourceLise()
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
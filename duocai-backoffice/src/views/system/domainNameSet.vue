<template>
<div>
<div class="backGround">
  <el-row>
    <h3>域名设置</h3>
  </el-row>
  <el-row style="padding-top: 3rem;font-size: .7rem">
    <el-col :span="4">
      域名：
    </el-col>
    <el-col :span="4">
      使用时长：
    </el-col>
    <el-col :span="4">
      当前状态：
    </el-col>
    <el-col :span="4">
      操作：
    </el-col>
  </el-row>
  <el-divider content-position="left">境内线路</el-divider>
  <el-row class="lineBox" v-for="(item, index) in INLANDList.domains" :key="'INLAND'+index">
    <el-col :span="3">
      <el-input v-model="item.value" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col  v-if="item.status !== ''" :span="4" :offset="1">
      {{item.useTime}}天
    </el-col>
    <el-col v-if="item.status === ''" :span="4" :offset="1">
      暂无
    </el-col>
    <el-col :span="4">
      <div v-if="item.status !== ''">
        <span v-if="item.status" style="color: #21ff17;margin-right: 10px">●</span><span v-if="item.status">正常</span>
        <span v-if="!item.status" style="color: red;margin-right: 10px">●</span><span v-if="!item.status">失效</span>
      </div>
      <div v-if="item.status === ''">
        暂无
      </div>
    </el-col>

    <el-col :span="4">
      <el-button type="primary" @click="add(item,'INLAND')" v-if="item.status === ''">添加</el-button>
      <el-button type="primary" @click="edit(item,'INLAND')" v-if="item.status !== ''">修改</el-button>
      <el-button type="warning" @click="test(item,'INLAND')" v-if="item.status !== ''">测试</el-button>
      <el-button type="danger" @click="del(item,'INLAND')" v-if="item.status !== ''">删除</el-button>
    </el-col>
  </el-row>

  <el-divider content-position="left">东南亚线路</el-divider>
  <el-row class="lineBox" v-for="(item, index) in SOUTHEAST_ASIAList.domains" :key="'SOUTHEAST_ASIA'+index">
    <el-col :span="3">
      <el-input v-model="item.value" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col  v-if="item.status !== ''" :span="4" :offset="1">
      {{item.useTime}}天
    </el-col>
    <el-col v-if="item.status === ''" :span="4" :offset="1">
      暂无
    </el-col>
    <el-col :span="4">
      <div v-if="item.status !== ''">
        <span v-if="item.status" style="color: #21ff17;margin-right: 10px">●</span><span v-if="item.status">正常</span>
        <span v-if="!item.status" style="color: red;margin-right: 10px">●</span><span v-if="!item.status">失效</span>
      </div>
      <div v-if="item.status === ''">
        暂无
      </div>
    </el-col>

    <el-col :span="4">
      <el-button type="primary" @click="add(item,'SOUTHEAST_ASIA')" v-if="item.status === ''">添加</el-button>
      <el-button type="primary" @click="edit(item,'SOUTHEAST_ASIA')" v-if="item.status !== ''">修改</el-button>
      <el-button type="warning" @click="test(item,'SOUTHEAST_ASIA')" v-if="item.status !== ''">测试</el-button>
      <el-button type="danger" @click="del(item,'SOUTHEAST_ASIA')" v-if="item.status !== ''">删除</el-button>
    </el-col>
  </el-row>
  <el-divider content-position="left">境外高防线路</el-divider>
  <el-row class="lineBox" v-for="(item, index) in OVERSEASList.domains" :key="'OVERSEAS'+index">
    <el-col :span="3">
      <el-input v-model="item.value" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col  v-if="item.status !== ''" :span="4" :offset="1">
      {{item.useTime}}天
    </el-col>
    <el-col v-if="item.status === ''" :span="4" :offset="1">
      暂无
    </el-col>
    <el-col :span="4">
      <div v-if="item.status !== ''">
        <span v-if="item.status" style="color: #21ff17;margin-right: 10px">●</span><span v-if="item.status">正常</span>
        <span v-if="!item.status" style="color: red;margin-right: 10px">●</span><span v-if="!item.status">失效</span>
      </div>
      <div v-if="item.status === ''">
        暂无
      </div>
    </el-col>

    <el-col :span="4">
      <el-button type="primary" @click="add(item,'OVERSEAS')" v-if="item.status === ''">添加</el-button>
      <el-button type="primary" @click="edit(item,'OVERSEAS')" v-if="item.status !== ''">修改</el-button>
      <el-button type="warning" @click="test(item,'OVERSEAS')" v-if="item.status !== ''">测试</el-button>
      <el-button type="danger" @click="del(item,'OVERSEAS')" v-if="item.status !== ''">删除</el-button>
    </el-col>
  </el-row>
</div>
</div>
</template>

<script>
export default {
  name: "domainNameSet",
  data(){
    return {
      input: 'xidegui.top',
      INLANDList:{
        domains:[{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        }]
      },
      SOUTHEAST_ASIAList: {
        domains:[{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        }]
      },
      OVERSEASList: {
        domains:[{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        }]
      }
    }
  },
  methods:{
    init(){
      this.INLANDList={
        domains:[{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        }]
      }
      this.SOUTHEAST_ASIAList= {
        domains:[{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        }]
      }
      this.OVERSEASList= {
        domains:[{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        },{
          value:"",
          useTime:0,
          status:""
        }]
      }
    },
    del(obj,line){
      this.$confirm('确定删除域名?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("删除域名"),{id:obj.id},{
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
            this.$message.success("操作成功")
          }
          this.init()
          this.getDomainList()
        })

      }).catch()
    },
    test(obj,line){
      let that = this
      let ajax = new XMLHttpRequest()
      ajax.open("get",obj.value+"/duocai/client/app/test.json")
      ajax.send()
      ajax.onreadystatechange = function (){
        if (ajax.readyState === 4 && ajax.status===200) {
          that.$message.success("测试域名成功")
          obj.status = true
        }
        if(ajax.status !== 200){
          that.$message.error("测试域名失效")
          obj.status = false
        }
      }
      // this.$axios.get(obj.value+"/duocai/client/app/test.json",{
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Authorization':''
      //   },
      // }).then((res)=>{
      //   console.log(res);
      // })
    },
    edit(obj,line){
      console.log(obj);
      this.$confirm('确定修改域名?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios.post(this.$getUrl("修改域名"),{domain:obj.value,id:obj.id},{
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
            this.$message.success("操作成功")
          }
          this.getDomainList()
        })

      }).catch()
    },
    add(obj,line){
      this.$axios.post(this.$getUrl("添加域名"),{domain:obj.value,line},{
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
        this.getDomainList()
      })
    },
    getDomainList(){
      this.$axios.get(this.$getUrl("域名列表")).then((res)=>{
        console.log(res);
        let inland = res.data.data.INLAND?res.data.data.INLAND:[]
        let overseas = res.data.data.OVERSEAS?res.data.data.OVERSEAS:[]
        let southeast_asia = res.data.data.SOUTHEAST_ASIA?res.data.data.SOUTHEAST_ASIA:[]
        for(let i=0;i<6;i++){
          console.log(inland.length,i);
          if(inland.length > i){
            this.INLANDList.domains[i].value = inland[i].domainName
            this.INLANDList.domains[i].useTime = this.$publicMethod.getDaysBetweenByToday(inland[i].createTime)
            this.INLANDList.domains[i].status = inland[i].status
            this.INLANDList.domains[i].id = inland[i].id
          }

          if(overseas.length > i){
            this.OVERSEASList.domains[i].value = overseas[i].domainName
            this.OVERSEASList.domains[i].useTime = this.$publicMethod.getDaysBetweenByToday(overseas[i].createTime)
            this.OVERSEASList.domains[i].status = overseas[i].status
            this.OVERSEASList.domains[i].id = overseas[i].id
          }

          if(southeast_asia.length > i){
            this.SOUTHEAST_ASIAList.domains[i].value = southeast_asia[i].domainName
            this.SOUTHEAST_ASIAList.domains[i].useTime = this.$publicMethod.getDaysBetweenByToday(southeast_asia[i].createTime)
            this.SOUTHEAST_ASIAList.domains[i].status = southeast_asia[i].status
            this.SOUTHEAST_ASIAList.domains[i].id = southeast_asia[i].id
          }
        }
      })
    }
  },
  mounted() {
    this.getDomainList()
  }
}
</script>

<style scoped>
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}
.lineBox{
  line-height: 40px;
  margin-top: 1rem;
}
</style>
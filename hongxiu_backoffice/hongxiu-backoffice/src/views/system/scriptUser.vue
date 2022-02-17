<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>机器人列表</h3>
      </el-row>
      <el-row>
        <div>
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
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
              prop="userName"
              label="用户名"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column prop="img" label="头像"  align="center" >
            <template slot-scope="scope">
              <el-row>
                <div class="tableHeadBox">
                  <img :src="scope.row.img" />
                </div>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
              prop="introduction"
              label="简介"
              min-width="200"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="sex"
              label="性别"
              align="center"
              header-align="center">
          </el-table-column>

          <el-table-column
              prop="releaseTime"
              label="添加时间"
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
          </el-table-column>
          <el-table-column
              prop="backoffice"
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
              <el-link style="margin-right: 20px;" type="success">编辑</el-link>
              <el-link style="margin-right: 20px;" type="danger">{{ scope.row.operation?"启用":"禁用" }}</el-link>
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
                :total="400"
                background

            >
            </el-pagination>
          </div>
        </div>
      </el-row>
    </div>


  </div>
</template>

<script>
export default {
  name: "scriptUser",
  data(){
    return{
      page:1,
      size:10,
      noticeList:[
        {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },
        {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },
        {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },    {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },    {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },    {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },    {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },    {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },    {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },    {
          id:"1919",
          userName:"mio",
          introduction:"这是简介简介简介简介",
          img:"http://1.116.215.106:8848/public/img/head.jpg",
          state:1,
          sex:"男",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },
      ],
    }
  },

  /*
  * 默认 page,size
  * change page -> getData -> renderTable
  * change size -> getData -> renderTable
  *
  * **/
  methods:{
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
    },
    stateFilters: function (v) {
      let state
      switch (v){
        case 1:
          state = { title: "待发布", color: "info" }
          break
        case 2:
          state = { title: "运行中", color: "success" }
          break
        case 3:
          state = { title: "已结束", color: "danger" }
          break
        case 4:
          state = { title: "已暂停", color: "warning" }
          break
      }

      return state
    }
  },
  mounted () {
    for (let i = 0; i < this.noticeList.length; i++) {
      this.noticeList[i].state = this.stateFilters(this.noticeList[i].state)
    }
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
<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>消息列表</h3>
      </el-row>
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="标题">
                <el-input v-model="searchData.displayName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="searchData.platform" placeholder="请选择状态">
                  <el-option
                      v-for="item in stateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间">
                <el-date-picker
                    v-model="searchData.loginTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
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
        <div>
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
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
            :data="noticeList"
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
              prop="title"
              label="标题"
              align="center"
              min-width="200"
              header-align="center">
          </el-table-column>
          <el-table-column prop="introduction" label="内容"  min-width="300"  align="center">
          </el-table-column>
          <el-table-column
              prop="obj"
              label="推送对象"
              min-width="150"
              align="center"
              header-align="center">
          </el-table-column>
          <el-table-column
              prop="startTime"
              label="推送时间"
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
              label="操作"
              min-width="200"
              align="center"
              header-align="center">
            <template slot-scope="scope">
              <el-link style="margin-right: 20px;" type="primary">编辑</el-link>
              <el-link style="margin-right: 20px;" type="danger">删除</el-link>
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
  name: "message",
  data(){
    return{
      page:1,
      size:10,
      searchData:{},
      stateOptions:[ {
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '注册用户'
      }, {
        value: '2',
        label: '游客'
      }, {
        value: '2',
        label: '指定用户'
      }],
      noticeList:[
        {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"游客",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"游客",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"注册用户",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"游客",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"191517",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"游客",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"114514",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"注册用户",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"注册用户",
          backoffice:"喜德贵",
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },   {
          id:"1919",
          title:"起床后这4大要事做错毁身体",
          introduction:"几点吃早餐？睡不睡回笼觉？起床后不要做的4大事情，详情戳>>",
          startTime:"2021-12-01 10:00:00",
          state:1,
          obj:"114514",
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
</style>
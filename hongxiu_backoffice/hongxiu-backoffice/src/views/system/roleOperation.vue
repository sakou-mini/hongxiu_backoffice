<template>
  <div>
    <div class="backGround">
      <el-row class="headTitle">
        <h3>组别列表</h3>
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
              prop="role"
              label="组别名"
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
          <el-table-column prop="state" label="状态"  align="center">
            <template slot-scope="scope">
              <el-row>
                <el-tag :type="scope.row.state.color">{{scope.row.state.title }}</el-tag>
              </el-row>
            </template>
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
              <el-link style="margin-right: 20px;" type="success" @click="dialogVisible = true">编辑</el-link>
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


    <el-dialog
        title="权限修改"
        :visible.sync="dialogVisible"
        width="30%"
       >
      <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "roleOperation",
  data(){
    return{
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [{
        id: 1,
        label: '首页',
      }, {
        id: 2,
        label: '内容管理',
        children: [{
          id: 3,
          label: '视频管理'
        }, {
          id: 4,
          label: '评论管理'
        },{
          id: 5,
          label: '标签管理'
        }, {
          id: 6,
          label: '音乐管理'
        }]
      }, {
        id: 7,
        label: '用户管理',
        children: [{
          id: 8,
          label: '用户列表'
        }, {
          id: 9,
          label: '游客列表'
        }, {
          id: 10,
          label: '游客报表'
        }]
      }, {
        id: 11,
        label: 'APP管理',
        children: [{
          id: 12,
          label: '公告管理'
        }, {
          id: 13,
          label: '消息管理'
        }, {
          id: 14,
          label: 'Banner管理'
        }, {
          id: 15,
          label: '视频推荐'
        }, {
          id: 16,
          label: '用户推荐'
        }]
      }, {
        id: 17,
        label: '举报管理',
        children: [{
          id: 18,
          label: '举报列表'
        }]
      }, {
        id: 19,
        label: '系统管理',
        children: [{
          id: 20,
          label: '机器人管理'
        }, {
          id: 21,
          label: '敏感词管理'
        }, {
          id: 22,
          label: '账号管理'
        }, {
          id: 23,
          label: '组别管理'
        }, {
          id: 24,
          label: '反馈建议'
        }, {
          id: 25,
          label: '安全日志'
        }]
      }],
      dialogVisible:false,
      page:1,
      size:10,
      noticeList:[
        {
          id:"1919",
          userName:"格里芬的指挥官",
          role:"财务",
          backoffice:"喜德贵",
          state:2,
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },        {
          id:"1919",
          userName:"罗德岛的博士",
          role:"运营",
          backoffice:"admin",
          state:1,
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },        {
          id:"1919",
          userName:"镇守府的提督",
          role:"管理员",
          backoffice:"喜德贵",
          state:1,
          releaseTime:"2021-11-30 14:12:07",
          updateTime:"2021-11-30 14:12:07"
        },        {
          id:"1919",
          userName:"兰德索尔的骑士",
          role:"客服",
          backoffice:"admin",
          state:2,
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
          state = { title: "正常", color: "primary" }
          break
        case 2:
          state = { title: "禁用", color: "danger" }
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
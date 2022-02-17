<template>
  <div>
    <div class="backGround">
      <div class="Box">
        <el-row>
          <h3>CDN管理</h3>
        </el-row>
        <el-row>
          <el-table :data="userList" stripe style="width: 100%">
            <el-table-column prop="name" label="节点名称"  align="center">
            </el-table-column>
            <el-table-column prop="id" label="节点编号"  align="center">
            </el-table-column>
            <el-table-column
                prop="state"
                label="状态"
                align="center"
                header-align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state === 1" style="color: #0dc400;margin-right: 10px">●</span ><span v-if="scope.row.state === 1">正常</span>
                <span v-if="scope.row.state === 2" style="color: red;margin-right: 10px">●</span><span v-if="scope.row.state === 2">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作"  align="center" >
              <template slot-scope="scope">
                <el-row>
                  <el-link style="margin-right: 20px;" :type="scope.row.state===1?'danger':'primary'">{{ scope.row.state===1?"禁用":"启用" }}</el-link>

                </el-row>
              </template>
            </el-table-column>

          </el-table>
        </el-row>
        <el-row class="pageBox">
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
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
      userList: [
        {
          id: "WANGSU_LINE",
          name: "网宿科技",
          state: 1
        },  {
          id: "TENCENT_LINE",
          name: "腾讯云",
          state: 1
        },  {
          id: "ALIYUN_LINE",
          name: "阿里云",
          state: 2
        },  {
          id: "NGINX_LINE",
          name: "RTMP服务器",
          state: 2
        },
      ]
    }
  }, methods: {

  }, mounted () {

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
<template>
  <div class="Box">
    <div class="backGround">
      <el-row>
        <el-form ref="form"  :model="searchData" label-width="auto">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="直播间ID">
                <el-input v-model="searchData.roomId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="主播ID">
                <el-input v-model="searchData.liveUserId" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="主播名">
                <el-input v-model="searchData.displayName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="状态">
                <el-select v-model="searchData.state" placeholder="">
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
              <el-form-item label="直播时间">
                <el-date-picker
                    v-model="searchData.liveTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" >
              <div style="float: right;">
                <el-button native-type="button" type="primary">查询</el-button>
                <el-button native-type="button">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
<!--      <el-row>-->
<!--        <div>-->
<!--          <el-popover-->
<!--              width="150"-->
<!--              trigger="click"-->
<!--              popper-class="hidPadding"-->
<!--              placement="bottom">-->
<!--            <div class="list">-->
<!--              <div class="list-item" v-for="(item, index) in batchOperation" :key="index" >-->
<!--                <div>{{ item.title }}</div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <el-button slot="reference" style="margin-left: 10px;">批量操作</el-button>-->
<!--          </el-popover>-->
<!--        </div>-->
<!--        <div>-->
<!--          <div class="checkboxOptionBox">-->
<!--            <i class="el-icon-info bgcBlue"></i>-->
<!--            <span>已选择<span class="bgcBlue">1</span>项</span>-->
<!--            <span class="bgcBlue" style="cursor: pointer">清空</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-row>-->
      <el-row>
        <div class="liveBox" style="margin-top: 30px;">
          <div class="roomBox"  v-for="i in 8" :key="i">
            <div class="imgBox">
              <img src="@/assets/image/headimg.jpg" />
              <div class="operationBox">
                <div v-if="liveNotStop" style="color: #ff2e2e"><i class="el-icon-error" style="margin-right: 5px;"></i>违规暂停直播中</div>
                <div class="operationItem">
                  <span @click="eventTest('暂停')">{{liveNotStop?"恢复":"暂停"}}</span>
                  <span @click="eventTest('查看')">查看</span>
                  <span @click="eventTest('关闭')">关闭</span>
                </div>
              </div>
            </div>
            <div class="textBox">
              <div class="liveUserMsgBox">
                <img src="@/assets/image/headimg.jpg">
                <span>喜德贵</span>
              </div>
              <div>
                <i class="el-icon-user"></i>
                <span>114514</span>
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <el-row>
        <div style="margin-top: 20px">
          <div style="float: right;">
            <el-pagination
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
  name: "liveUserRoom",
  data(){
    return{
      page:1,
      size:10,
      liveNotStop:false,
      searchData:{
        roomId:"",
        liveUserId:"",
        displayName:"",
        state:"",
        platform:"",
        liveTime:""
      },
      platformOptions: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '锦鲤平台'
        }, {
          value: '2',
          label: 'T平台'
        }, {
          value: '3',
          label: 'Q平台'
        }],
      statusOptions:[
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '封禁'
        }
      ],
      batchOperation: [
        { id: 1, title: "启用"},
        { id: 2, title: "封禁"},
      ],
    }
  },
  methods:{
    eventTest(e){
      console.log(e);
      this.liveNotStop = !this.liveNotStop
      console.log(this.liveNotStop);
    }
  }
}



</script>

<style scoped lang="less">
.liveBox{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.roomBox{
  width: 20%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  margin-bottom: 30px;
  .imgBox{
    width: 100%;
    height: 13rem;
    overflow: hidden;
    position: relative;
    &:hover .operationBox{
      top:0
    }
    .operationBox{
      width: 100%;
      height: 100%;
      position: absolute;
      top: -13rem;
      left: 0;
      display: flex;
      flex-wrap:wrap;
      align-items:center;
      align-content:space-around;
      background-color: rgba(0,0,0,.3);
      transition: all .3s ease;
      div{
        color: white;
        width: 100%;
        text-align: center;
      }
      .operationItem{
        display: flex;
        justify-content:space-around;
        span{
          cursor: pointer;
          transition: all .3s ease;
          &:nth-child(1):hover{
            color: #ff7300;
          }
          &:nth-child(2):hover{
            color: #00bbff;
          }
          &:nth-child(3):hover{
            color: #ff5e5e;
          }
        }
      }
    }
    img{
      width: 100%;
    }
  }
  .textBox{
    height: 4rem;
    font-size: 0.95rem;
    color: #aaaaaa;

    div{
      height: 4rem;
      float: left;
      display: flex;
      align-items: center;
      &:nth-child(1){
        margin-left: 10px;
      }
      &:last-child{
        float: right;
        margin-right: 20px;
      }
    }
    i{
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    .liveUserMsgBox{
      img{
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
      }
      span{
        margin-left: 10px;
      }
    }
  }
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
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}

</style>
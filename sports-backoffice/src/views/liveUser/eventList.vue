<template>
  <div class="backGround">
    <el-row>
      <h3>赛事列表</h3>
    </el-row>
    <el-row style="margin-top: 2rem">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="当前赛事" name="first"></el-tab-pane>
        <el-tab-pane label="赛事记录" name="second"></el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row>
      <el-row class="liveBox">
        <el-col :span="10">
          <p>赛事名称：美国大学美式足球</p>
          <p>参赛队伍：西密歇根 VS内华达</p>
          <p>比赛时间：2021-12-28 00:00:00</p>
        </el-col>
        <el-col :span="8">
          <div style="width: 10px;height: 93px"></div>
<!--          <el-row>-->
<!--            <el-col :span="5">-->
<!--              <div class="tableHeadBox">-->
<!--                <img src="http://1.116.215.106:8848/public/img/head.jpg" />-->
<!--              </div>-->
<!--            </el-col>-->
<!--            <el-col :span="7">-->
<!--               <div class="tableNameBox">-->
<!--                 <div class="tableLiveUserName">喜德贵</div>-->
<!--                 <div class="tableLiveUserId">114514</div>-->
<!--               </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
        </el-col>
        <el-col :span="6">
          <div class="buttonBox">
            <el-button type="primary" @click="dialogVisible = true">添加主播</el-button>
<!--            <el-button type="primary">主要按钮</el-button>-->
<!--            <el-button type="primary">主要按钮</el-button>-->
          </div>
        </el-col>

      </el-row>
      <el-row class="liveBox">
        <el-col :span="10">
          <p>赛事名称：美国大学美式足球</p>
          <p>参赛队伍：西密歇根 VS内华达</p>
          <p>比赛时间：2021-12-28 00:00:00</p>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="5">
              <div class="tableHeadBox">
                <img src="http://1.116.215.106:8848/public/img/head.jpg" />
              </div>
            </el-col>
            <el-col :span="7">
              <div class="tableNameBox">
                <div class="tableLiveUserName">喜德贵</div>
                <div class="tableLiveUserId">114514</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <div class="buttonBox">
            <el-button type="primary">修改主播</el-button>
            <!--            <el-button type="primary">主要按钮</el-button>-->
            <!--            <el-button type="primary">主要按钮</el-button>-->
          </div>
        </el-col>
        <div class="tipsBox"></div>
      </el-row>
      <el-row class="liveBox">
        <el-col :span="10">
          <p>赛事名称：美国大学美式足球</p>
          <p>参赛队伍：西密歇根 VS内华达</p>
          <p>比赛时间：2021-12-28 00:00:00</p>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="5">
              <div class="tableHeadBox">
                <img src="http://1.116.215.106:8848/public/img/head.jpg" />
              </div>
            </el-col>
            <el-col :span="7">
              <div class="tableNameBox">
                <div class="tableLiveUserName">喜德贵</div>
                <div class="tableLiveUserId">114514</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <div class="buttonBox">
            <el-button type="primary">修改主播</el-button>
            <!--            <el-button type="primary">主要按钮</el-button>-->
            <!--            <el-button type="primary">主要按钮</el-button>-->
          </div>
        </el-col>
        <div class="tipsBox"></div>
      </el-row>
      <el-row class="liveBox">
        <el-col :span="10">
          <p>赛事名称：美国大学美式足球</p>
          <p>参赛队伍：西密歇根 VS内华达</p>
          <p>比赛时间：2021-12-28 00:00:00</p>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="5">
              <div class="tableHeadBox">
                <img src="http://1.116.215.106:8848/public/img/head.jpg" />
              </div>
            </el-col>
            <el-col :span="7">
              <div class="tableNameBox">
                <div class="tableLiveUserName">喜德贵</div>
                <div class="tableLiveUserId">114514</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <div class="buttonBox">
            <el-button type="primary">修改主播</el-button>
            <!--            <el-button type="primary">主要按钮</el-button>-->
            <!--            <el-button type="primary">主要按钮</el-button>-->
          </div>
        </el-col>
        <div class="tipsBox"></div>
      </el-row>
      <el-row class="liveBox">
        <el-col :span="10">
          <p>赛事名称：美国大学美式足球</p>
          <p>参赛队伍：西密歇根 VS内华达</p>
          <p>比赛时间：2021-12-28 00:00:00</p>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="5">
              <div class="tableHeadBox">
                <img src="http://1.116.215.106:8848/public/img/head.jpg" />
              </div>
            </el-col>
            <el-col :span="7">
              <div class="tableNameBox">
                <div class="tableLiveUserName">喜德贵</div>
                <div class="tableLiveUserId">114514</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <div class="buttonBox">
            <el-button type="primary">进入直播</el-button>
            <el-button type="primary">修改主播</el-button>

            <!--            <el-button type="primary">主要按钮</el-button>-->
          </div>
        </el-col>
        <div class="tipsBox1"></div>
      </el-row>
    </el-row>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
       >
      <el-row style="margin-bottom: 2rem">
        <p>赛事名称：美国大学美式足球</p>
        <p>参赛队伍：西密歇根 VS内华达</p>
        <p>比赛时间：2021-12-28 00:00:00</p>
      </el-row>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="19">
            <el-form-item label="主播名">
              <el-input v-model="form.account"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button type="primary">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="margin-bottom: 2rem">
        <el-col :span="5">
          <div class="tableHeadBox">
            <img src="http://1.116.215.106:8848/public/img/head.jpg" />
          </div>
        </el-col>
        <el-col :span="7">
          <div class="tableNameBox">
            <div class="tableLiveUserName">喜德贵</div>
            <div class="tableLiveUserId">114514</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="height: 93px;line-height: 93px">
            <el-button type="primary">清除</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align: center" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "eventList",
  data(){
    return {
      activeName: 'first',
      form:{},
      dialogVisible:false
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped lang="less">
.tipsBox1{
  width: 10px;
  height: 100%;
  background-color: #10ff00;
  position: absolute;
  left: 0;
  top: 0;
}
.liveBox{
  width: 95%;
  margin-bottom: 30px;
  box-shadow: 0 0 10px #888888;
  padding: 20px 50px;
  position: relative;
  .buttonBox{
    height: 93px;
    line-height: 93px;
  }
  p{
    margin-bottom: 10px;
  }
  .tipsBox{
    width: 10px;
    height: 100%;
    background-color: #ff0000;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}
.tableLiveUserName{
  height: 46.5px;
  line-height: 46.5px;
  font-size: 1.2rem;
  text-align: left;
  color: #585858;
}
.tableLiveUserId{
  height: 46.5px;
  line-height: 46.5px;
  font-size: 1.1rem;
  text-align: left;
  color: #8b8b8b;
}
.tableHeadBox {
  width: 93px;
  height: 93px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100%;
img {
  width: 100%;
}
}
.tableNameBox{
  height: 70px;
}

</style>
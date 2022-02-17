<template>
  <div>
    <div>
      <div class="headBox">
        <div class="headCard">
          <div class="headTitleName">总注册用户</div>
          <div class="headNum">126,560</div>
          <div class="headCharts">
            <div ref="registerNumChart" :style="{width: '100%', height: '2rem' }"></div>
          </div>
          <el-divider></el-divider>
          <div class="headToday">日注册  123</div>
        </div>

        <div class="headCard">
          <div class="headTitleName">总游客</div>
          <div class="headNum">126,560</div>
          <div class="headCharts">
            <div ref="touristNumChart" :style="{width: '100%', height: '2rem' }"></div>
          </div>
          <el-divider></el-divider>
          <div class="headToday">日游客  123</div>
        </div>
        <div class="headCard">
          <div class="headTitleName">总视频数</div>
          <div class="headNum">126,560</div>
          <el-row class="headGrew">
            <el-col :span="12">
              周同比<i class="el-icon-caret-top headUp"></i><span style="color: #4b4b4b">12%</span>
            </el-col>
            <el-col :span="12">
              日环比<i class="el-icon-caret-bottom headDown"></i><span style="color: #4b4b4b">11%</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <div class="headToday">日视频  123</div>
        </div>
        <div class="headCard">
          <div class="headTitleName">总评论数</div>
          <div class="headNum">126,560</div>
          <el-row class="headGrew">
            <el-col :span="12">
              周同比<i class="el-icon-caret-top headUp"></i><span style="color: #4b4b4b">12%</span>
            </el-col>
            <el-col :span="12">
              日环比<i class="el-icon-caret-bottom headDown"></i><span style="color: #4b4b4b">11%</span>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <div class="headToday">日评论  123</div>
        </div>
      </div>
      <div class="mainBox">
        <el-row>
          <el-col :span="15">
            <el-row>
              <el-col :span="4">
                <div style="font-size: .9rem;font-weight: 200">新增游客</div>
                <div style="margin-top: 1rem;font-size: 1.4rem;font-weight: 200">1,214</div>
              </el-col>
              <el-col :span="4">
                <div style="font-size: .9rem;font-weight: 200">新增注册</div>
                <div style="margin-top: 1rem;font-size: 1.4rem;font-weight: 200">514</div>
              </el-col>
              <el-col :span="4">
                <div style="font-size: .9rem;font-weight: 200">新增评论</div>
                <div style="margin-top: 1rem;font-size: 1.4rem;font-weight: 200">114</div>
              </el-col>
              <el-col :span="4">
                <div style="font-size: .9rem;font-weight: 200">新增视频</div>
                <div style="margin-top: 1rem;font-size: 1.4rem;font-weight: 200">1,919</div>
              </el-col>
              <el-col :span="4">
                <div style="font-size: .9rem;font-weight: 200">老用户</div>
                <div style="margin-top: 1rem;font-size: 1.4rem;font-weight: 200">517</div>
              </el-col>
              <el-col :span="4">
                <div style="font-size: .9rem;font-weight: 200">IP访问量</div>
                <div style="margin-top: 1rem;font-size: 1.4rem;font-weight: 200">1,214</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="9" style="line-height: 62px">
            <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                @change="getTime"
            >
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <div ref="mainChart" :style="{width: '100%', height: '33rem' }"></div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      time:"",
      registerNumChartObj:{},
      registerNumOption : {
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        grid:{
          x:0,
          y:0,
          x2:0,
          y2:0
        },
        series: [
          {
            data: [400, 230, 224, 218, 135, 147, 260,114,311,191,132,451,156,154,141,184,321,544],
            type: 'bar'
          }
        ]
      },
      touristNumChartObj:{},
      touristNumOption : {
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        grid:{
          x:0,
          y:0,
          x2:0,
          y2:0
        },
        series: [
          {
            data: [400, 230, 224, 218, 135, 147, 260,114,311,191,132,451,156,154,141,184,321,544],
            type: 'line',
            areaStyle: { // 这里设置区域样式
              normal: {
                //这里使用默认配置
              }
            },
            symbol:'none', //去掉折线图中的节点
            smooth: true
          }
        ]
      },
      mainChartObj:{},
      mainOption:{
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        grid:{
          x:40,
          y:20,
          x2:20,
          y2:30
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70, 110, 130,330,100],
            type: 'bar'
          }
        ]
      }
    }
  },
  mounted () {
    let startTime = new Date(this.$publicMethod.getNDayDate(-30)).getTime()
    let endTime = new Date(this.$publicMethod.getNDayDate(0)).getTime()
    this.time = [startTime,endTime]
    let statDay = -30
    for(let i = 0 ;i<30;i++){
      this.mainOption.xAxis.data.push(this.$publicMethod.getNDayDate(statDay))
      statDay++
    }
    this.registerNumChart();
    this.touristNumChart();
    this.mainChart()
  },
  methods: {
    getTime(e){
      console.log(this.time);
    },
    registerNumChart () {
      const chart = this.$refs.registerNumChart
      let that= this
      if (chart) {
        this.registerNumChartObj = this.$echarts.init(chart)
        this.registerNumChartObj.setOption(this.registerNumOption)
        window.addEventListener("resize", function () {
          that.registerNumChartObj.resize()
        })
      }
      this.$on('hook:destroyed', () => {
        window.removeEventListener("resize", function () {
          that.registerNumChartObj.resize();
        });
      })
    },
    touristNumChart(){
      const chart = this.$refs.touristNumChart
      let that= this
      if (chart) {
        this.touristNumChartObj = this.$echarts.init(chart)
        this.touristNumChartObj.setOption(this.touristNumOption)
        window.addEventListener("resize", function () {
          that.touristNumChartObj.resize()
        })
      }
      this.$on('hook:destroyed', () => {
        window.removeEventListener("resize", function () {
          that.touristNumChartObj.resize();
        });
      })
    },
    mainChart(){
      const chart = this.$refs.mainChart
      let that = this
      if(chart){
        this.mainChartObj = this.$echarts.init(chart)
        this.mainChartObj.setOption(this.mainOption)
        window.addEventListener("resize",function (){
          that.mainChartObj.resize()
        })
        this.$on('hook:destroyed',()=>{
          window.removeEventListener("resize",function (){
            that.mainChartObj.resize()
          })
        })
      }
    }
  }
}
</script>

<style scoped  lang="less">
.el-divider--horizontal{

  margin: 12px 0;
}
.mainBox{
  width: 97.5%;
  padding: 30px 20px;
  background-color: #fff;
  margin-top: 3rem;
  box-shadow: 0 0 10px #888888;
}
.headBox{
  width: 100%;
  display: flex;
  justify-content: space-between;
  .headCard{
    box-shadow: 0 0 10px #888888;
    width: 20%;
    padding: 15px 30px;
    background-color: #fff;
    .headGrew{
      margin-top: 12px;
      color: #aaaaaa;
      .headUp{
        margin: 0 4px 0 10px;
        color: green;
      }
      .headDown{
        margin: 0 4px 0 10px;
        color: red;
      }
    }
    .headTitleName{
      font-size: .8rem;
      color: #888888;
      margin-bottom: 1rem;
    }
    .headNum{
      font-size: 1.8rem;
      font-weight: 100;
    }
    .headCharts{
      margin-bottom: 1rem;
    }
    .headToday{
      font-size: .9rem;
      color: #aaaaaa;
    }
  }
}

</style>
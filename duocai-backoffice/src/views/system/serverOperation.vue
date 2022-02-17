<template xmlns="">
<div>
  <div class="backGround">
    <el-row class="headTitle">
      <h3>服务器管理</h3>
    </el-row>
    <el-row class="disabledBox">
      <el-descriptions title="服务器信息" border>
        <el-descriptions-item label="服务器状态">
          <el-tag size="small">运行中</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="当前在播房间">114514</el-descriptions-item>
        <el-descriptions-item label="当前在线用户">114514</el-descriptions-item>
      </el-descriptions>
    </el-row>
    <el-row>
      <div ref="indexChart" :style="{width: '100%', height: '18rem' }"></div>
    </el-row>
    <el-row>
      <el-button type="danger">关闭服务器</el-button>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: "serverOperation",
  data(){return{
    indexOption: {
      title:{
        text:"服务器每日访问量"
      },
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
        y:80,
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
  }},
  mounted() {
    let startTime = new Date(this.$publicMethod.getNDayDate(-30)).getTime()
    let endTime = new Date(this.$publicMethod.getNDayDate(0)).getTime()
    this.time = [startTime,endTime]
    let statDay = -30
    for(let i = 0 ;i<30;i++){
      this.indexOption.xAxis.data.push(this.$publicMethod.getNDayDate(statDay))
      statDay++
    }
    this.indexChart();
  },
  methods:{
    indexChart () {
      const chart = this.$refs.indexChart
      let that= this
      if (chart) {
        this.indexChartObj = this.$echarts.init(chart)
        this.indexChartObj.setOption(this.indexOption)
        window.addEventListener("resize", function () {
          that.indexChartObj.resize()
        })
      }
      this.$on('hook:destroyed', () => {
        window.removeEventListener("resize", function () {
          that.indexChartObj.resize();
        });
      })
    }
  },
}
</script>

<style scoped>
.backGround{
  background-color: #fff;
  padding: 2rem 1.5rem;
}
.disabledBox{
  margin-bottom: 3rem;
}
</style>
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
      1小时访问量：
    </el-col>
    <el-col :span="4">
      当前使用人数：
    </el-col>
    <el-col :span="4">
      操作：
    </el-col>
  </el-row>
  <el-divider content-position="left">境内线路</el-divider>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: red;margin-right: 10px">●</span><span>失效</span>
    </el-col>
    <el-col :span="4">
      0人次
    </el-col>
    <el-col :span="4">
      0人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: red;margin-right: 10px">●</span><span>失效</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-divider content-position="left">东南亚线路</el-divider>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-divider content-position="left">境外高防线路</el-divider>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: red;margin-right: 10px">●</span><span>失效</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
    </el-col>
  </el-row>
  <el-row class="lineBox">
    <el-col :span="3">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>
    <el-col :span="4" :offset="1">
      27天
    </el-col>
    <el-col :span="4">
      <span style="color: #0dc400;margin-right: 10px">●</span ><span>正常</span>
    </el-col>
    <el-col :span="4">
      17人次
    </el-col>
    <el-col :span="4">
      9人次
    </el-col>
    <el-col :span="4">
      <el-button type="primary">修改</el-button>
      <el-button type="warning">测试</el-button>
      <el-button type="danger">删除</el-button>
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
      input: 'xidegui.top'
    }
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
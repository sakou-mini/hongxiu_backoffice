<template>
  <div>
    <div class="Box">
      <el-row>
        <el-page-header @back="goBack" content="用户详情">
        </el-page-header>
      </el-row>
      <el-row>
        <div class="imgbox">
          <img src="http://1.116.215.106:8848/public/img/head.jpg" />
        </div>
      </el-row>
      <el-row class="userNamebox">
        <div>
          喜德贵
        </div>
      </el-row>
      <el-row>
        <el-descriptions title="用户基础信息">
          <template slot="extra">
            <el-button type="danger" size="small" @click="banUserDialog = true">封禁用户</el-button>
          </template>
          <el-descriptions-item label="id">114514</el-descriptions-item>
          <el-descriptions-item label="用户名">喜德贵</el-descriptions-item>
          <el-descriptions-item label="手机号">11451419191</el-descriptions-item>
          <el-descriptions-item label="关注数">191</el-descriptions-item>
          <el-descriptions-item label="粉丝数">4611</el-descriptions-item>
          <el-descriptions-item label="作品数量">114</el-descriptions-item>
          <el-descriptions-item label="播放量">15654</el-descriptions-item>
          <el-descriptions-item label="获赞量">5141</el-descriptions-item>
          <el-descriptions-item label="评论量">514</el-descriptions-item>
          <el-descriptions-item label="账号注册时间">2020-08-09 15:15:21</el-descriptions-item>
          <el-descriptions-item label="游戏状态">
            <el-tag size="small" type="info">离线</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="账号状态">
            <el-tag size="small" type="success">正常</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="用户作品信息">
          <template slot="extra">
            <el-button type="primary" size="small">作品详情</el-button>
            <el-button type="primary" size="small">作品报表</el-button>
          </template>
          <el-descriptions-item label="本月上传作品">11</el-descriptions-item>
          <el-descriptions-item label="本周上传作品">2</el-descriptions-item>
          <el-descriptions-item label="本月播放量">1214</el-descriptions-item>
          <el-descriptions-item label="本周播放量">154</el-descriptions-item>
          <el-descriptions-item label="本月点赞量">996</el-descriptions-item>
          <el-descriptions-item label="本周点赞量">56</el-descriptions-item>
          <el-descriptions-item label="播放量同比上月增长">
            <el-link type="success">+11.45%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="点赞量同比上月增长">
            <el-link type="danger">-9.78%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="完播率">
            <el-link type="primary">51.45%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="点赞率">
            <el-link type="primary">41.75%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="评论率">
            <el-link type="primary">42.51%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="转发率">
            <el-link type="primary">12.33%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="主页访问率">
            <el-link type="primary">14.21%</el-link>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="用户粉丝信息">
          <template slot="extra">
            <el-button type="primary" size="small">粉丝日志</el-button>
          </template>
          <el-descriptions-item label="本月新增粉丝">115</el-descriptions-item>
          <el-descriptions-item label="本周新增粉丝">6</el-descriptions-item>
          <el-descriptions-item label="本月取关粉丝">1</el-descriptions-item>
          <el-descriptions-item label="本周取关粉丝">0</el-descriptions-item>
          <el-descriptions-item label="粉丝取关率">
            <el-link type="primary">1.12%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="粉丝转化率">
            <el-link type="primary">6.17%</el-link>
          </el-descriptions-item>
          <el-descriptions-item label="粉丝同比上月增长">
            <el-link type="danger">-11.62%</el-link>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-descriptions title="用户登录信息">
          <template slot="extra">
            <el-button type="primary" size="small" @click="toLoginRecord">历史登录</el-button>
          </template>
          <el-descriptions-item label="上次登录时间">2021-08-19 17:58:06</el-descriptions-item>
          <el-descriptions-item label="上次登录IP">192.168.0.144</el-descriptions-item>
          <el-descriptions-item label="上次登录地点">四川 成都 电信</el-descriptions-item>
          <el-descriptions-item label="上次登录设备">XIAOMI 11</el-descriptions-item>
        </el-descriptions>
      </el-row>

    </div>

    <!-- 封禁提示框 -->
    <el-dialog title="封禁用户" :visible.sync="banUserDialog" width="30%">

      <el-form ref="form" :model="banUserData" label-width="80px">

        <el-form-item label="封禁时间">
          <el-select v-model="banUserData.banTime" placeholder="请选择封禁时间" @change="banTimeChange">
            <el-option label="手动选择" value="0"></el-option>
            <el-option label="10分钟" value="1"></el-option>
            <el-option label="30分钟" value="2"></el-option>
            <el-option label="1小时" value="3"></el-option>
            <el-option label="6小时" value="4"></el-option>
            <el-option label="12小时" value="5"></el-option>
            <el-option label="1天" value="6"></el-option>
            <el-option label="3天" value="7"></el-option>
            <el-option label="7天" value="8"></el-option>
            <el-option label="15天" value="9"></el-option>
            <el-option label="30天" value="10"></el-option>
            <el-option label="60天" value="11"></el-option>
            <el-option label="180天" value="12"></el-option>
            <el-option label="1年" value="13"></el-option>
            <el-option label="永久" value="14"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封禁时间" v-show="banTimePicker">
          <el-row>
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" v-model="banUserData.banTime1" style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" :offset="1">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="banUserData.banTime2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="封禁原因">
          <el-checkbox-group v-model="banUserData.banReason">
            <el-checkbox label="使用非法软件" value="1" name="type"></el-checkbox>
            <el-checkbox label="使用游戏恶意BUG" value="2" name="type"></el-checkbox>
            <el-checkbox label="辱骂他人" value="3" name="type"></el-checkbox>
            <el-checkbox label="发布广告" value="4" name="type"></el-checkbox>
            <el-checkbox label="其他" value="5" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" v-model="banUserData.banRemarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updataBanUser">确定</el-button>
          <el-button @click="banUserDialog = false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userDetails",
  data () {
    return {
      banTimePicker: false,
      banUserDialog: false,
      banUserData: {
        banTime: "",
        banTime1: "",
        banTime2: "",
        banReason: [],
        banRemarks: ""
      }
    }
  },
  methods: {
    updataBanUser () {
      this.banUserData = {
        banTime: "",
        banTime1: "",
        banTime2: "",
        banReason: [],
        banRemarks: ""
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    banTimeChange (e) {
      console.log(e)
      e === "0" ? this.banTimePicker = true : this.banTimePicker = false
    },
    toLoginRecord () {
      this.$router.push('/index/loginRecord')
    }
  }
}
</script>

<style scoped lang="less">
.descriptionsBox {
  margin-top: 3rem;
}
.Box {
  background-color: #fff;
  padding: 2rem 1.5rem;
}
.imgbox {
  width: 7rem;
  height: 7rem;
  border-radius: 100%;
  overflow: hidden;
  margin: 1rem auto 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.userNamebox {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 1.8rem;
}
</style>
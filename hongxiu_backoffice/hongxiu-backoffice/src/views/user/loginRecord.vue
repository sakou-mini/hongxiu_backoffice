<template>
  <div>

    <div class="Box">
      <el-row>
        <el-page-header @back="goBack" content="历史登录">
        </el-page-header>
      </el-row>
      <el-row class="searchForm">
        <el-form ref="form" :model="searchData" label-width="80px">

          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="ip地址">
                <el-input v-model="searchData.account"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="选择日期">
                <el-date-picker v-model="loginTime" type="daterange" align="right" unlink-panels range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="5">
              <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>清空</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <el-table :data="loginData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">

              <el-row>
                <el-col :span="3">
                  <h3>观看视频</h3>
                </el-col>
                <el-col :span="21">
                  <el-link type="primary" v-for="(item,i) in props.row.propAdd" :key="i" class="itemSpan">
                    id:{{item.propName}}
                  </el-link>
                </el-col>
              </el-row>

              <el-divider></el-divider>

              <el-row>
                <el-col :span="3">
                  <h3>新增评论</h3>
                </el-col>
                <el-col :span="21">
                  <el-link type="primary" v-for="(item,i) in props.row.propConsume" :key="i" class="itemSpan">
                    id:{{item.propName}}
                  </el-link>
                </el-col>
              </el-row>
              <el-divider></el-divider>

              <el-row>
                <el-col :span="3">
                  <h3>关注变动</h3>
                </el-col>
                <el-col :span="21">
                  <span class="itemSpan">{{props.row.diamonds}}</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="上线时间" prop="onlineTime">
          </el-table-column>
          <el-table-column label="登录地区" prop="loginRegion">
          </el-table-column>
          <el-table-column label="运营商" prop="operator">
          </el-table-column>
          <el-table-column label="ip地址" prop="ip">
          </el-table-column>
          <el-table-column label="下线时间" prop="offlineTime">
          </el-table-column>
          <el-table-column label="上线时长" prop="onlineDuration">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="pageBox">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </el-row>
    </div>

  </div>
</template>

<script>


// "@/assets/image/headimg.jpg"
export default {
  name: "userList",
  data () {
    return {
      loginData: [
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
        {
          onlineTime: "2021-08-17 12:34:54",
          loginRegion: "四川成都",
          operator: "电信",
          ip: "114.191.81.1",
          offlineTime: "2021-08-17 12:37:54",
          onlineDuration: "3分",
          propAdd: [
            { propName: "114514" },
            { propName: "456455" },
            { propName: "245455" },
            { propName: "452041" },
            { propName: "021021" },
            { propName: "544021" },
            { propName: "842105" },
            { propName: "452455" },
            { propName: "045025" },
            { propName: "231321" },
            { propName: "112312" },
            { propName: "213221" },
            { propName: "454424" },
            { propName: "785877" },
            { propName: "577885" },

          ],
          propConsume: [
            { propName: "04725" },
            { propName: "23321" },
            { propName: "11312" },
            { propName: "21221" },
            { propName: "45424" },
            { propName: "78577" },
            { propName: "57785" },
          ],
          diamonds: -1,
        },
      ],


      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      loginTime: '',




      searchData: {
        userId: "",
        phone: "",
        account: ""
      },
    }
  }, methods: {
    goBack () {
      this.$router.go(-1)
    },
  }, mounted () {

  }
}
</script>

<style scoped lang="less">
.itemSpan {
  margin-left: 1rem;
  line-height: 1.5rem;
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
  border-radius: 100%;
  img {
    width: 100%;
  }
}

.searchForm {
  margin-top: 2rem;
}
.Box {
  background-color: #fff;
  padding: 2rem 1.5rem;
}
</style>
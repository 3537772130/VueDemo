<style type="text/css">
  .text {
    font-size: 16px;
  }

  .item {
    height: 19px;
    line-height: 19px;
    text-align: left;
    margin-bottom: 18px;
  }

  .item > label {
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 5px;
    font-size: 14px;
  }

  .el-card__header {
    padding: 0px;
  }

  .clearfix {
    height: 45px;
    line-height: 45px;
    text-align: left;
    font-weight: bold;
    padding-left: 25px;
    font-size: 16px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .el-button-update {
    font-size: 20px;
    position: relative;
    top: 10px;
    left: -30px;
  }

  .photo-div {
    position: absolute;
    top: 140px;
    left: 350px;
  }

  .photo-div:hover {
    cursor: pointer;
  }

  .photo-div > .user-photo {
    width: 100px;
    height: 100px;
    border-radius: 0px;
    border: 1px #dcdee2 solid;
  }

  .container-style {
    width: 400px;
    height: 250px;
  }

  .user-home-dialog .el-dialog {
    width: 500px;
  }
</style>
<template>
  <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
    <table>
      <tr>
        <td style="padding: 20px;">
          <!--个人信息-->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人信息</span>
              <el-button class="el-button-update" style="float: right; padding: 3px 0" type="text"
                         @click="recoveryInfo()">
                <i class="el-icon-edit"></i><span style="font-size: 14px">修改信息</span>
              </el-button>
            </div>
            <div class="container-style">
              <div style="height: 50px;"></div>
              <div class="text item"><label>账&nbsp;&nbsp;户&nbsp;&nbsp;名：</label>{{info.mobile}}</div>
              <div class="text item"><label>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>{{info.nickName}}
              </div>
              <div class="text item"><label>注册时间：</label>{{info.createDate}}</div>
              <div class="photo-div">
                <img :src="info.avatarUrl" class="user-photo">
              </div>
            </div>
          </el-card>
        </td>
        <td>
          <!--用户活跃趋势-->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>账户活跃</span>
            </div>
            <div>
              <div id="activity" class="container-style"></div>
            </div>
          </el-card>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
      </tr>
    </table>
    <el-dialog class="user-home-dialog" title="修改信息" :visible.sync="dialogShow"
               :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
      <userInfo ref="userInfo" v-on:updateInfo="updateInfo"></userInfo>
    </el-dialog>
  </el-main>
</template>

<script type="text/javascript">
  import userInfo from '@/views/user/user-info.vue'

  export default {
    name: 'user-info',
    components: {
      'userInfo': userInfo
    },
    data() {
      return {
        info: this.$cookies.get('user_info'),
        loading: false,
        dialogShow: false
      }
    },
    created() {

    },
    mounted() {
      this.selectActivity()
    },
    methods: {
      recoveryInfo() {
        this.dialogShow = true
      },
      updateInfo() {
        this.info = this.$cookies.get('user_info')
        this.$emit('updateInfo')
      },
      selectActivity() {
        this.$axios({
          url: '/api/user/selectUserActivity',
          method: 'post'
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.drawActivity(res.data.data)
          }
        }).catch(error => {
          console.info('错误信息', error)
        })
      },
      drawActivity(data) {
        let activity = this.$echarts.init(document.getElementById('activity'));
        activity.setOption({
          title: {
            text: '最近' + JSON.parse(data.monthJson).length + '个月活跃情况',
            x: 'center',
            y: 'top',
            textStyle: {
              color: '#ccc',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: JSON.parse(data.monthJson)
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '活跃度',
              type: 'line',
              stack: '总量',
              data: JSON.parse(data.activityJson)
            }
          ]
        })
      }
    }
  }
</script>

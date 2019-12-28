<style type="text/css">
  .coupon-list {
    margin: 0px 20px;
    text-align: left;
  }

  .coupon-list > .coupon {
    display: inline-table;
    width: 350px;
    height: 169px;
    color: #dda026;
    padding-right: 10px;
    margin-left: 20px;
    border-radius: 8px;
    box-shadow: 3px 3px 6px #b2b2b2;
    border: 1px #cdcdcd solid;
    background-image: url("/static/images/background/coupon.png");
    background-size: 360px 169px;
  }

  .coupon-list > .coupon:hover {
    cursor: pointer;
    box-shadow: 3px 3px 6px #67c23a;
    /*border: 1px #67c23a solid;*/
  }

  .coupon-list > .coupon > .applet-logo {
    float: right;
    display: inline-table;
    width: 110px;
    height: 120px;
    text-align: center;
  }

  .coupon-list > .coupon > .applet-logo img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-top: 45px;
  }

  .coupon-list > .coupon > .info {
    display: inline-table;
    width: 230px;
    height: 120px;
  }

  .coupon-list > .coupon > .info > .name {
    height: 20px;
    line-height: 20px;
    margin-top: 20px;
    text-align: left;
    text-indent: 40px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal !important;
  }

  .coupon-list > .coupon > .info > .price {
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 50px;
    font-family: '宋体';
    padding-left: 35px;
    margin-bottom: 10px;
  }

  .coupon-list > .coupon > .info > .price > span {
    font-size: 16px;
    display: inline-table;
    margin-left: 5px;
    font-family: '宋体';
  }

  .coupon-list > .coupon > .info > .date {
    height: 30px;
    line-height: 30px;
    text-indent: 55px;
  }

  .no-record {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }

  .no-record > .icon > img {
    width: 128px;
    height: 128px;
  }

  .no-record > .text {
    margin-top: 10px;
    font-size: 16px;
    color: #cdcdcd;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <div class="coupon-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="未使用" name="1"></el-tab-pane>
          <el-tab-pane label="已使用" name="2"></el-tab-pane>
          <el-tab-pane label="已过期" name="3"></el-tab-pane>
        </el-tabs>
        <div class="coupon" v-if="ifShow" v-for="item in list">
          <div class="applet-logo">
            <el-image :src="item.useAppletLogo + timestamp"></el-image>
          </div>
          <div class="info">
            <div class="name">{{item.couponName}}</div>
            <div class="price">{{item.denomination}}<span>元</span></div>
            <div class="date">截止：
              <span>{{item.activityOver}}</span>
            </div>
          </div>
        </div>
        <div class="no-record" v-else>
          <div class="icon">
            <el-image src="/static/images/small_bean_ding.png"></el-image>
          </div>
          <div class="text">快去获取优惠券吧 >>>></div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    export default {
        name: 'coupon-my-list',
        components: {},
        data () {
            return {
                loading: true,
                activeName: '1',
                type: '1',
                list: [],
                ifShow: false,
                timestamp: ''
            }
        },
        created () {
            this.onSubmit()
        },
        mounted () {
        },
        methods: {
            onSubmit () {
                this.loading = true
                this.$axios({
                    url: '/api/user/coupon/loadMyCoupon',
                    method: 'post',
                    data: {type: parseInt(this.type)}
                }).then(res => {
                    console.info('后台返回的数据', res.data)
                    if (res.data.code === '1') {
                        this.ifShow = true
                        this.list = res.data.data
                    } else if (res.data.code === '-1') {
                        this.ifShow = false
                    }
                    this.timestamp = '?' + Date.parse(new Date())
                    this.$global.exitLoad(this, null, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            handleClick (tab, event) {
                this.type = tab.name
                this.onSubmit()
            }
        }
    }
</script>

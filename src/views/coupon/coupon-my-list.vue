<style type="text/css">
  .coupon-list {
    margin: 0px 20px;
    text-align: left;
  }

  .coupon-list > .coupon {
    display: inline-table;
    width: 280px;
    height: 120px;
    padding-right: 10px;
    margin-left: 20px;
    border-radius: 8px;
    box-shadow: 3px 3px 6px #b2b2b2;
    border: 1px #cdcdcd solid;
  }

  .coupon-list > .coupon:hover {
    cursor: pointer;
    box-shadow: 3px 3px 6px #67c23a;
    border: 1px #67c23a solid;
  }

  .coupon-list > .coupon > .applet-logo {
    float: left;
    display: inline-table;
    width: 100px;
    height: 120px;
    text-align: center;
  }

  .coupon-list > .coupon > .applet-logo img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-top: 20px;
  }

  .coupon-list > .coupon > .info {
    display: inline-table;
    width: 180px;
    height: 120px;
  }

  .coupon-list > .coupon > .info > .name {
    height: 20px;
    line-height: 20px;
    margin-top: 10px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal !important;
  }

  .coupon-list > .coupon > .info > .price{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    font-family: '幼圆';
  }

  .coupon-list > .coupon > .info > .date{
    height: 30px;
    line-height: 30px;
  }

  .no-record{
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }

  .no-record > .icon > img{
    width: 128px;
    height: 128px;
  }

  .no-record > .text{
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
            <!--            <div class="type">-->
            <!--              <span v-if="item.couponType === 1">通用优惠券</span>-->
            <!--              <span v-if="item.couponType === 2">满减优惠券</span>-->
            <!--              <span v-if="item.couponType === 3">满减优惠券</span>-->
            <!--            </div>-->
            <div class="name">{{item.couponName}}</div>
            <div class="price">{{item.denomination}}元</div>
            <div class="date">截止日期：
              <span>{{item.activityOver}}</span>
            </div>
          </div>
        </div>
        <div class="no-record" v-else>
          <div class="icon">
            <el-image src="/static/images/small_bean_ding.png"></el-image>
          </div>
          <div class="text">您还没有获得优惠券哦，快去逛逛吧 >>>></div>
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

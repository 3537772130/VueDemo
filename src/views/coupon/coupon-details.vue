<style type="text/css">
  .coupon-details-form {
    width: 580px;
    height: 350px;
    margin: auto;
    text-align: left;
  }

  .coupon-details-form .el-form-item {
    width: 45%;
  }

  .coupon-details-form .el-form-item__label {
    width: 110px;
  }

  .info-div {
    width: 150px;
    text-align: left;
  }

  .coupon-details-form .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-form :inline="true" :model="coupon" ref="coupon" class="demo-form-inline coupon-details-form">
          <el-form-item label="优惠券类型" prop="couponType">
            <div class="info-div" v-if="coupon.couponType === 1">通用优惠券</div>
            <div class="info-div" v-if="coupon.couponType === 2">满减优惠券</div>
            <div class="info-div" v-if="coupon.couponType === 3">点对点优惠券</div>
          </el-form-item>
          <el-form-item label="获取方式" prop="gainType">
            <div class="info-div" v-if="coupon.gainType === 1">用户主动获取</div>
            <div class="info-div" v-if="coupon.gainType === 2">用户被动赠送</div>
          </el-form-item>
          <br>
          <el-form-item label="优惠券名称" prop="couponName">
            <div class="info-div">{{coupon.couponName}}</div>
          </el-form-item>
          <el-form-item label="面额" prop="denomination">
            <div class="info-div">{{coupon.denomination}} 元</div>
          </el-form-item>
          <el-form-item label="获取途径" prop="gainAppletName">
            <div class="info-div">{{coupon.gainAppletName}}</div>
          </el-form-item>
          <el-form-item label="获取限制" prop="gainPrice">
            <div class="info-div">消费 {{coupon.gainPrice}}元赠送</div>
          </el-form-item>
          <el-form-item label="使用途径" prop="useAppletName">
            <div class="info-div">{{coupon.useAppletName}}</div>
          </el-form-item>
          <el-form-item label="使用限制" prop="usePrice">
            <div class="info-div">满 {{coupon.usePrice}}元可用</div>
          </el-form-item>
          <el-form-item label="预派发数量" prop="makeIssueNum">
            <div class="info-div">{{coupon.makeIssueNum > 0 ? coupon.makeIssueNum + ' 张' : '不限量'}}</div>
          </el-form-item>
          <el-form-item label="已派发数量" prop="alreadyIssueNum">
            <div class="info-div">{{coupon.alreadyIssueNum}} 张</div>
          </el-form-item>
          <el-form-item label="活动日期" prop="activityStart">
            <div class="info-div">{{coupon.activityStart}}</div>
          </el-form-item>
          <el-form-item label="截止日期" prop="activityOver">
            <div class="info-div">{{coupon.activityOver}}</div>
          </el-form-item>
          <el-form-item label="审核状态" prop="status">
            <div class="info-div">
              <el-link :underline="false" type="danger" v-if="coupon.status == -1">未通过</el-link>
              <el-link :underline="false" target="_blank" v-if="coupon.status == 0">待审核</el-link>
              <el-link :underline="false" type="success" v-if="coupon.status == 1">已通过</el-link>
              <el-link :underline="false" type="danger" v-if="coupon.status == 2">已下架</el-link>
              <el-link :underline="false" type="info" v-if="coupon.status == 3">已失效</el-link>
            </div>
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <div class="info-div">{{coupon.createTime}}</div>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    export default {
        name: 'coupon-details',
        data () {
            return {
                loading: false,
                coupon: {}
            }
        },
        created () {
            let id = this.$cookies.get('coupon_id')
            this.loadCouponInfo(id)
        },
        mounted () {

        },
        methods: {
            loadCouponInfo (id) {
                if (id) {
                    this.loading = true
                    this.$axios({
                        url: '/api/user/coupon/loadCouponDetails',
                        method: 'post',
                        data: {id: parseInt(id)}
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        if (res.data.code === '1') {
                            this.coupon = res.data.data
                        }
                        this.$cookies.remove('coupon_id')
                        this.$global.exitLoad(this, null, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            }
        }
    }
</script>

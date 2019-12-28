<style type="text/css">
  .coupon-info-form {
    width: 350px;
    height: 680px;
    margin: auto;
    text-align: left;
  }

  .coupon-info-form .el-form-item__label {
    width: 110px;
  }

  .coupon-info-input {
    width: 230px;
  }

  .remark{
    width: 220px;
    font-size: 12px;
    color: #cdcdcd;
    line-height: normal;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-form :inline="true" :model="coupon" :rules="rules" ref="coupon" class="demo-form-inline coupon-info-form">
          <el-form-item label="优惠券类型" prop="couponType">
            <el-select v-model="coupon.couponType" placeholder="请选择优惠券类型"
                       class="coupon-info-input" @change="chooseCouponType()">
              <el-option label="" value=''></el-option>
              <el-option label="通用优惠券" value='1'></el-option>
              <el-option label="满减优惠券" value='2'></el-option>
              <!--              <el-option label="点对点优惠券" value='3'></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券名称" prop="couponName">
            <el-input v-model="coupon.couponName" maxLength="20" placeholder="请输入优惠券名称"
                      class="coupon-info-input"></el-input>
          </el-form-item>
          <el-form-item label="面额" prop="denomination">
            <el-input v-model.number="coupon.denomination" min="1" max="99999" placeholder="请输入优惠券的面值额度"
                      class="coupon-info-input"></el-input>
          </el-form-item>
          <el-form-item label="获取途径" prop="gainAppletId">
            <el-select v-model="coupon.gainAppletId" placeholder="请选择获取优惠券的小程序" class="coupon-info-input">
              <el-option label="" value=''></el-option>
              <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获取限制" prop="gainPrice" v-if="coupon.couponType !== '1'">
            <el-input v-model.number="coupon.gainPrice" placeholder="例：满10减2中的10"
                      class="coupon-info-input"></el-input>
          </el-form-item>
          <el-form-item label="使用途径" prop="useAppletId">
            <el-select v-model="coupon.useAppletId" placeholder="请选择使用优惠券的小程序" class="coupon-info-input">
              <el-option label="" value=''></el-option>
              <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用限制" prop="usePrice">
<!--            <el-input v-model.number="coupon.usePrice" placeholder="消费多少可用"-->
<!--                      class="coupon-info-input" readonly="readonly" v-if="coupon.couponType === '1'"></el-input>-->
            <el-input v-model.number="coupon.usePrice" placeholder="消费多少可用"
                      class="coupon-info-input"></el-input>
          </el-form-item>
          <el-form-item label="预派发数量" prop="makeIssueNum">
            <el-input v-model.number="coupon.makeIssueNum" min="1" max="100" placeholder="预定可派发的优惠券数量"
                      class="coupon-info-input"></el-input>
            <br>
            <div class="remark">活动期间预定数量派发完毕后将不再派发，优惠券活动将自动结束，若不限量派发优惠券，请输入0。(建议设置限量派发)</div>
          </el-form-item>
          <el-form-item label="活动开始日期" prop="activityStart">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="coupon.activityStart" format="yyyy-MM-dd HH:mm:ss"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动过期时间" prop="activityOver">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="coupon.activityOver" format="yyyy-MM-dd HH:mm:ss"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="success" @click="onSubmit()" class="coupon-info-input" style="text-align: center;">提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'

    export default {
        name: 'coupon-create',
        data () {
            return {
                loading: false,
                appletList: [],
                coupon: {
                    couponType: '',
                    couponName: '',
                    denomination: '',
                    gainAppletId: '',
                    gainPrice: '',
                    useAppletId: '',
                    usePrice: '',
                    makeIssueNum: '',
                    activityStart: '',
                    activityOver: ''
                },
                rules: {
                    couponType: [
                        {required: true, message: '请选择优惠券类型', trigger: 'blur'}
                    ],
                    couponName: [
                        {required: true, message: '优惠券名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 1, max: 20, message: '优惠券名称长度为1-20个字符', trigger: 'blur'}
                    ],
                    denomination: [
                        {required: true, message: '面额不能为空', trigger: 'blur'},
                        {type: 'number', min: 1, max: 99999, message: '面额只能为1-99999', trigger: 'blur'}
                    ],
                    gainAppletId: [
                        {required: true, message: '请选择获取途径', trigger: 'blur'}
                    ],
                    gainPrice: [
                        {required: true, message: '获取限制不能为空', trigger: 'blur'},
                        {type: 'number', min: 0, max: 99999, message: '获取限制只能为0-99999', trigger: 'blur'}
                    ],
                    useAppletId: [
                        {required: true, message: '请选择使用途径', trigger: 'blur'}
                    ],
                    usePrice: [
                        {required: true, message: '使用限制不能为空', trigger: 'blur'},
                        {type: 'number', min: 0, max: 99999, message: '使用限制只能为0-99999', trigger: 'blur'}
                    ],
                    makeIssueNum: [
                        {required: true, message: '预派发数量不能为空', trigger: 'blur'},
                        {type: 'number', min: 0, max: 99999, message: '预派发数量只能为0-99999', trigger: 'blur'}
                    ],
                    activityStart: [
                        {required: true, message: '请选择活动开始时间', trigger: 'blur'}
                    ],
                    activityOver: [
                        {required: true, message: '请选择活动结束时间', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {
            this.loadAddCreateCoupon()
        },
        mounted () {

        },
        methods: {
            loadAddCreateCoupon () {
                this.loading = true
                this.$axios({
                    url: '/api/user/coupon/loadAddCouponInfo',
                    method: 'post'
                }).then(res => {
                    if (res.data.code === '1') {
                        this.appletList = res.data.data
                    }
                    this.$global.exitLoad(this, null, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            onSubmit () {
                this.$refs['coupon'].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '加载中'})
                        this.$axios({
                            url: '/api/user/coupon/addCouponInfo',
                            method: 'post',
                            data: this.coupon
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            let that = this
                            res.data.code === '1' ? this.$message.success({
                                message: res.data.data,
                                duration: 1000,
                                onClose: function () {
                                    that.$emit('refreshList')
                                }
                            }) : this.$message.error(res.data.data)
                            this.$global.exitLoad(this, loading, res.data)
                        }).catch(error => {
                            console.info('错误信息', error)
                            this.$global.exitLoad(this, loading, '')
                        })
                    }
                })
            },
            chooseCouponType () {
                let couponType = this.coupon.couponType
                if (couponType === '1') {
                    // this.coupon.usePrice = 0
                    this.coupon.gainPrice = 0
                } else {
                    this.coupon.usePrice = ''
                    this.coupon.gainPrice = ''
                }
            }
        }
    }
</script>

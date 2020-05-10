<style type="text/css">
  .form-div {
    float: left;
    width: 350px;
  }

  .coupon-info-form {
    width: 100%;
    height: 620px;
    text-align: left;
  }

  .coupon-info-form .el-form-item__label {
    width: 110px;
  }

  .coupon-info-input {
    width: 230px;
  }

  .remark-div {
    float: right;
    width: 255px;
    color: #bfbfbf;
    margin-right: 20px;
  }

  .remark-div > .title {
    font-size: 14px;
    padding-top: 20px;
  }

  .remark-div > .content {
    width: 230px;
    line-height: 20px;
    margin-left: 20px;
    font-size: 12px;
    padding-top: 5px;
  }

  .remark-div > .tips {
    font-size: 12px;
    text-align: center;
    color: #3a8ee6;
    padding-top: 20px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;text-align: left;">
      <div class="form-div">
        <el-form :inline="true" :model="coupon" :rules="rules" ref="coupon" class="coupon-info-form">
          <el-form-item label="优惠券类型" prop="couponType">
            <el-select v-model="coupon.couponType" placeholder="请选择优惠券类型"
                       class="coupon-info-input" @change="chooseCouponType()">
              <el-option label="" value=''></el-option>
              <el-option label="通用优惠券" value='1'></el-option>
              <el-option label="满减优惠券" value='2'></el-option>
              <el-option label="满送优惠券" value='3'></el-option>
              <!--              <el-option label="点对点优惠券" value='3'></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="获取方式" v-if="coupon.couponType">
            {{coupon.gainType === '1' ? '消费者主动获取' : '消费者被动赠送'}}
          </el-form-item>
          <el-form-item label="优惠券名称" prop="couponName">
            <el-input v-model="coupon.couponName" maxLength="20" placeholder="请输入优惠券名称"
                      class="coupon-info-input"></el-input>
          </el-form-item>
          <el-form-item label="面额" prop="denomination">
            <el-input v-model.number="coupon.denomination" maxlength="3" placeholder="请输入优惠券的面值额度"
                      class="coupon-info-input" @input="handleClick"></el-input>
          </el-form-item>
          <el-form-item label="获取途径" prop="gainAppletId" v-if="coupon.gainType !== '1'">
            <el-select v-model="coupon.gainAppletId" placeholder="请选择获取优惠券的小程序" class="coupon-info-input">
              <el-option label="" value=''></el-option>
              <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="获取限制" prop="gainPrice" v-if="coupon.gainType !== '1'">
            <el-input v-model.number="coupon.gainPrice" placeholder="例：满10减2中的10" maxlength="5"
                      class="coupon-info-input" @input="handleClick"></el-input>
          </el-form-item>
          <el-form-item label="使用途径" prop="useAppletId">
            <el-select v-model="coupon.useAppletId" placeholder="请选择使用优惠券的小程序" class="coupon-info-input">
              <el-option label="" value=''></el-option>
              <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用限制" prop="usePrice" v-if="coupon.couponType !== '1'">
            <el-input v-model.number="coupon.usePrice" placeholder="消费多少可用" maxlength="5"
                      class="coupon-info-input" @input="handleClick"></el-input>
          </el-form-item>
          <el-form-item label="预派发数量" prop="makeIssueNum">
            <el-input v-model.number="coupon.makeIssueNum" maxlength="5" placeholder="预定可派发的优惠券数量"
                      class="coupon-info-input" @input="handleClick"></el-input>
            <br>
            <!--            <div class="remark">活动期间预定数量派发完毕后将不再派发，优惠券活动将自动结束，若不限量派发优惠券，请输入0。(建议设置限量派发)</div>-->
          </el-form-item>
          <el-form-item label="活动日期" prop="activityStart">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="coupon.activityStart"
                            :format="format" :value-format="valueFormat" :picker-options="pickerOptionsStart"
                            style="width: 230px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期" prop="activityOver">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="coupon.activityOver"
                            :format="format" :value-format="valueFormat" :picker-options="pickerOptionsStart"
                            style="width: 230px;"></el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="success" @click="onSubmit()" class="coupon-info-input" style="text-align: center;">提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="remark-div">
        <div class="title">优惠券类型</div>
        <div class="content">
          <label style="font-weight: bold;">通用优惠券</label>：
          用户可以在页面主动领取，每日仅限领一张，若领取的优惠券未使用，则一直不可再领取；此类优惠券无使用门槛，请谨慎派发。
        </div>
        <div class="content">
          <label style="font-weight: bold;">满减优惠券</label>：
          用户可以在页面主动领取，每日仅限领一张，若领取的优惠券未使用，则一直不可再领取；当订单总金额达到使用门槛，将可使用此类优惠券。
        </div>
        <div class="content">
          <label style="font-weight: bold;">满送优惠券</label>：
          用户不可以在页面主动领取，只有下单成功后，订单总金额达到获取限制，系统将自动派发此类优惠券中，符合要求的面额值最高的优惠券一张；此类优惠券用户单日获取不设上限。
        </div>
        <div class="content">
          所有类型的优惠券，都建议限量派发。
        </div>
        <div class="title">预派发数量</div>
        <div class="content">活动期间预定数量派发，派发完毕后将不再派发，优惠券活动将自动结束，若不限量派发优惠券，请输入0。(建议设置限量派发)</div>
        <div class="tips">创建优惠券前，请务必阅读以上内容。</div>
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
                format: 'yyyy年MM月dd日',
                valueFormat: 'yyyy/MM/dd',
                appletList: [],
                coupon: {
                    couponType: '',
                    couponName: '',
                    denomination: '',
                    gainType: '',
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
                        {type: 'number', min: 1, max: 99999, message: '面额只能为1-999', trigger: 'blur'}
                    ],
                    gainAppletId: [
                        {required: true, message: '请选择获取途径', trigger: 'blur'}
                    ],
                    gainPrice: [
                        {required: true, message: '获取限制不能为空', trigger: 'blur'},
                        {type: 'number', min: 0, max: 99999, message: '获取限制只能为1-99999', trigger: 'blur'}
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
                        {required: true, message: '请选择活动日期', trigger: 'blur'}
                    ],
                    activityOver: [
                        {required: true, message: '请选择截止日期', trigger: 'blur'}
                    ]
                },
                pickerOptionsStart: {
                    disabledDate (time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
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
                switch (couponType) {
                    case '1':
                        this.coupon.gainType = '1'
                        this.coupon.gainAppletId = '0'
                        this.coupon.gainPrice = 0
                        this.coupon.usePrice = 0
                        break
                    case '2':
                        this.coupon.gainType = '1'
                        this.coupon.gainAppletId = '0'
                        this.coupon.usePrice = ''
                        break
                    case '3':
                        this.coupon.gainType = '2'
                        this.coupon.gainAppletId = ''
                        this.coupon.gainPrice = ''
                        this.coupon.usePrice = ''
                        break
                    case '4':
                        this.coupon.gainType = '2'
                        this.coupon.gainAppletId = ''
                        this.coupon.gainPrice = ''
                        this.coupon.usePrice = ''
                        break
                    default:
                        this.coupon.gainType = ''
                        this.coupon.gainAppletId = ''
                        this.coupon.gainPrice = ''
                        this.coupon.usePrice = ''
                        break
                }
            },
            handleClick () {
                try {
                    this.coupon.denomination = this.coupon.denomination.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.coupon.gainPrice = this.coupon.gainPrice.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.coupon.usePrice = this.coupon.usePrice.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.coupon.makeIssueNum = this.coupon.makeIssueNum.replace(/[^\d]/g, '')
                } catch (e) {
                }
            }
        }
    }
</script>

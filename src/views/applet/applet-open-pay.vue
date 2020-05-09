<style type="text/css">
  .applet-info-input {
    width: 290px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-form :inline="true" :model="info" :rules="rules" ref="info" class="demo-form-inline applet-form"
                 style="width: 500px; margin: auto;text-align: center;">
          <el-form-item label="支付状态" prop="">
            <div style="width: 290px;text-align: left;">
              <el-link type="success" :underline="false" v-if="ifOpenPay">已开通</el-link>
              <el-link type="info" :underline="false" v-else>未开通</el-link>
            </div>
          </el-form-item>
          <el-form-item label="商户号" prop="mchId">
            <el-input v-model="info.mchId" placeholder="请输入商户号" class="applet-info-input"></el-input>
          </el-form-item>
          <el-form-item label="支付秘钥" prop="payKey">
            <el-input type="textarea" v-model="info.payKey" :show-word-limit="true" maxlength="150"
                      resize="none" rows="5" placeholder="请输入支付秘钥" class="applet-info-input"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="success" @click="onSubmit('info')" class="applet-info-input" style="text-align: center;">上传
            </el-button>
          </el-form-item>
        </el-form>
        <div style="margin-top: 30px;text-align: right;font-size: 14px;">
          <el-link type="primary" @click="loadHelp">如何获取微信商户号与支付秘钥？</el-link>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'

    export default {
        name: 'applet-info',
        data () {
            return {
                loading: false,
                info: {
                    id: '',
                    mchId: '',
                    payKey: ''
                },
                ifOpenPay: false,
                rules: {
                    mchId: [
                        {required: true, message: '请输入商户号', trigger: 'blur'},
                        {type: 'string', min: 1, max: 100, message: '商户号长度为1-100个字符', trigger: 'blur'}
                    ],
                    payKey: [
                        {required: true, message: '请输入支付秘钥', trigger: 'blur'},
                        {type: 'string', min: 1, max: 50, message: '支付秘钥长度为1-150个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {
            let id = this.$cookies.get('applet_id')
            let ifOpenPay = this.$cookies.get('if_open_pay')
            this.loadAppletData(id, ifOpenPay === 'true')
        },
        mounted () {
        },
        methods: {
            loadAppletData (appletId, ifOpenPay) {
                if (appletId) {
                    this.info.id = appletId
                    this.ifOpenPay = ifOpenPay
                    this.$cookies.remove('applet_id')
                    this.$cookies.remove('if_open_pay')
                    // this.loading = true
                    // this.$axios({
                    //     url: '/api/user/applet/loadAppletPayData',
                    //     method: 'post',
                    //     data: {id: appletId}
                    // }).then(res => {
                    //     console.info('后台返回的数据', res.data)
                    //     this.$cookies.remove('applet_id')
                    //     if (res.data.code === '1') {
                    //         this.info = res.data.data
                    //     }
                    //     this.$global.exitLoad(this, null, res.data)
                    // }).catch(error => {
                    //     console.info('错误信息', error)
                    //     this.$global.exitLoad(this, null, '')
                    // })
                }
            },
            onSubmit: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('此操作将关闭已开通的小程序在线支付功能，需要在小程序页面【我的 - 设置 - 测试支付】测试付款成功后，才可开启支付功能！', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let loading = Loading.service({fullscreen: true, text: '加载中'})
                            this.$axios({
                                url: '/api/user/applet/uploadAppletPayData',
                                method: 'post',
                                data: {id: this.info.id, mchId: this.info.mchId, payKey: this.info.payKey}
                            }).then(res => {
                                console.info('后台返回的数据', res.data)
                                let that = this
                                res.data.code === '1' ? this.$message.success({
                                    message: res.data.data,
                                    duration: 3000,
                                    onClose: function () {
                                        that.$emit('loadAppletData')
                                    }
                                }) : this.$message.error(res.data.data)
                                this.$global.exitLoad(this, loading, res.data)
                            }).catch(error => {
                                console.info('错误信息', error)
                                this.$global.exitLoad(this, loading, '')
                            })
                        }).catch(() => {
                        })
                    }
                })
            },
            loadHelp: function () {
                const {href} = this.$router.resolve({
                    name: 'applet-apply-pay'
                })
                try {
                    if (!this.newWin.closed) {
                        this.newWin.close()
                    }
                } catch (e) {
                }
                this.newWin = window.open(href, '_blank')
            }
        }
    }
</script>

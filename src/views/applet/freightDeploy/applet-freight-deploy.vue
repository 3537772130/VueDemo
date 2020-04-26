<style type="text/css">
  .form-div {
    float: left;
    width: 350px;
  }

  .freight-form {
    width: 100%;
    text-align: left;
  }

  .freight-form .el-input {
    width: 220px;
  }

  .freight-form .el-select {
    width: 220px;
  }

  .type-logo-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .type-logo-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .form .el-form-item__label {
    width: 100px;
  }

  .remark-div {
    float: right;
    width: 255px;
    color: #bfbfbf;
    margin-right: 20px;
    text-align: left;
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
    <el-main element-loading-text="加载中" style="background-color: #FFFFFF;" v-loading="loading">
      <div class="form-div">
        <el-form :inline="true" :model="form" :rules="rules" class="freight-form" ref="form">
          <el-form-item label="小程序">
            <el-select v-model="form.appletId" placeholder="请选择小程序">
              <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="例：3公里以内、全国统一配送等" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="开始距离">
            <el-input v-model.number="form.minimum" placeholder="请输入开始距离（米）" maxlength="7"
                      @input="handleClick"></el-input>
          </el-form-item>
          <el-form-item label="截止距离">
            <el-input v-model.number="form.maximum" placeholder="请输入截止距离（米）" maxlength="7"
                      @input="handleClick"></el-input>
          </el-form-item>
          <el-form-item label="运费">
            <el-input placeholder="请输入运费（元）" v-model.number="form.freight" maxlength="4"
                      @input="handleClick"></el-input>
          </el-form-item>
          <el-form-item label="免额限制">
            <el-input placeholder="请输入免额限制（元）" v-model.number="form.exemptAmount" maxlength="6"
                      @input="handleClick"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择状态">
              <el-option label="正常" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click="onSubmit()" style="text-align: center; width: 220px;" type="success">提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="remark-div">
        <div class="title">开始-截止距离</div>
        <div class="content">
          消费者下单时，系统将自动检测距离范围，以开始距离为基准，由从大到小的范围逐级检索，为订单添加相应的运费。
        </div>
        <div class="content">
          距离范围设置时，应避免出现断层，否则消费者将会有可能处于不在距离范围内，而导致无法下单。
        </div>
        <div class="title">免额限制</div>
        <div class="content">当订单金额满足限制，将不会收取运费；若免额限制设置为0，则处于此距离范围内的消费者，将必须支付运费。</div>
        <div class="tips">创建运费规则前，请务必阅读以上内容。</div>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'

    export default {
        name: 'applet-freight-deploy',
        data () {
            return {
                loading: false,
                isInitial: true,
                form: {
                    id: '',
                    appletId: '',
                    title: '',
                    minimum: '',
                    maximum: '',
                    freight: '',
                    exemptAmount: '',
                    status: '1'
                },
                rules: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {type: 'string', min: 1, max: 20, message: '标题为1-20个字符', trigger: 'blur'}
                    ],
                    minimum: [
                        {required: true, message: '开始距离不能为空', trigger: 'blur'},
                        {type: 'number', min: 1, max: 9999999, message: '开始距离有效值为0-9999999', trigger: 'blur'}
                    ],
                    maximum: [
                        {required: true, message: '截止距离不能为空', trigger: 'blur'},
                        {type: 'number', min: 1, max: 9999999, message: '截止距离有效值为0-9999999', trigger: 'blur'}
                    ],
                    freight: [
                        {required: true, message: '运费不能为空', trigger: 'blur'},
                        {type: 'number', min: 1, max: 9999, message: '运费有效值为0-9999', trigger: 'blur'}
                    ],
                    exemptAmount: [
                        {required: true, message: '免额限制不能为空', trigger: 'blur'},
                        {type: 'number', min: 1, max: 999999, message: '免额限制有效值为0-999999', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {
            let id = this.$cookies.get('freight_deploy_id')
            this.loadFreightDeploy(id)
        },
        methods: {
            loadFreightDeploy (id) {
                if (id) {
                    this.form.appletId = parseInt(this.$cookies.get('freight_applet_id'))
                    this.appletList = JSON.parse(this.$cookies.get('freight_applet_list'))
                    this.$cookies.remove('freight_applet_id')
                    this.$cookies.remove('freight_applet_list')
                    if (id !== '0') {
                        this.loading = true
                        this.$axios({
                            url: '/api/user/applet/freightDeploy/queryFreightDeployById',
                            method: 'post',
                            data: {id: id}
                        }).then(res => {
                            if (res.data.code === '1') {
                                delete res.data.data.updateTime
                                this.form = res.data.data
                                this.form.appletId = parseInt(this.form.appletId)
                                this.form.status = this.form.status.toString()
                            }
                            this.$cookies.remove('freight_deploy_id')
                            this.$global.exitLoad(this, null, res.data)
                        }).catch(error => {
                            console.info('错误信息', error)
                            this.$global.exitLoad(this, null, '')
                        })
                    }
                }
            },
            onSubmit () {
                if (!this.form.appletId) {

                }
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '加载中'})
                        this.$axios({
                            url: '/api/user/applet/freightDeploy/saveFreightDeploy',
                            method: 'post',
                            data: this.form
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            let that = this
                            this.$global.exitLoad(this, loading, res.data)
                            res.data.code === '1' ? this.$message.success({
                                message: res.data.data,
                                duration: 1000,
                                onClose: function () {
                                    that.$emit('refreshList')
                                }
                            }) : this.$message.error(res.data.data)
                        }).catch(error => {
                            this.$global.exitLoad(this, loading, '')
                            console.info('错误信息', error)
                        })
                    }
                })
            },
            handleClick () {
                try {
                    this.form.minimum = this.form.minimum.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.form.maximum = this.form.maximum.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.form.freight = this.form.freight.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.form.exemptAmount = this.form.exemptAmount.replace(/[^\d]/g, '')
                } catch (e) {
                }
            }
        }
    }
</script>

<style type="text/css">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }

  .form-page {
    height: 390px;
  }

  .applet-info-input {
    width: 290px;
  }

  .applet-form .el-form-item__label {
    width: 110px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-steps :active="active" simple finish-status="success" align-center="true" style="margin-bottom: 50px;">
          <el-step title="基础信息" icon="el-icon-edit"></el-step>
          <el-step title="营业信息" icon="el-icon-s-shop"></el-step>
          <el-step title="管理信息" icon="el-icon-user"></el-step>
        </el-steps>
        <el-form :inline="true" :model="appletForm" :rules="rules" ref="appletForm" class="demo-form-inline applet-form"
                 style="width: 600px; height: 490px; margin: auto;text-align: center;">
          <div class="form-page" v-if="active === 0">
            <el-form-item label="小程序LOGO" prop="appletLogo" style="height: 140px;">
              <div class="applet-info-input" style="display: inline-block;text-align: left;">
                <el-upload
                  class="avatar-uploader"
                  action="/api/user/applet/uploadAppletLogo"
                  name="appletLogo"
                  :headers="myHeader"
                  :show-file-list="false"
                  :on-success="handleLogoSuccess"
                  :before-upload="beforePicUpload">
                  <img v-if="appletForm.appletLogo" :src="appletForm.appletLogo + timestamp" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <el-input v-model="appletForm.appletLogo" class="applet-info-input" style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="小程序名称" prop="appletName">
              <el-input v-model="appletForm.appletName" placeholder="请输入小程序名称" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="小程序简称" prop="appletSimple">
              <el-input v-model="appletForm.appletSimple" placeholder="请输入小程序名称" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone">
              <el-input v-model="appletForm.telephone" placeholder="请输入联系电话" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="服务类型" prop="typeId">
              <el-select v-model="appletForm.typeId" placeholder="请选择服务类型" class="applet-info-input"
                         @change="updateType">
                <el-option label="请选择" value=''></el-option>
                <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"
                           :value='item.id'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经营类型" prop="ifRetail">
              <el-select v-model="appletForm.ifRetail" placeholder="请选择经营类型" class="applet-info-input">
                <el-option label="零售" value='0'></el-option>
                <el-option label="批发" value='1'></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-page" v-if="active === 1">
            <el-form-item label="营业执照" prop="licenseSrc">
              <div class="applet-info-input" style="display: inline-block;height: 140px;text-align: left;">
                <el-upload
                  class="avatar-uploader"
                  action="/api/user/applet/uploadAppletLicense"
                  name="appletLicense"
                  :headers="myHeader"
                  :show-file-list="false"
                  :on-success="handleLicenseSuccess"
                  :before-upload="beforePicUpload">
                  <img v-if="appletForm.licenseSrc" :src="appletForm.licenseSrc + timestamp" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <el-input v-model="appletForm.licenseSrc" class="applet-info-input" style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="执照代码" prop="licenseCode">
              <el-input v-model="appletForm.licenseCode" placeholder="请输入执照代码" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="营业范围" prop="businessScope">
              <el-input type="textarea" v-model="appletForm.businessScope" :show-word-limit="true" maxlength="150"
                        resize="none" rows="5" placeholder="请输入营业范围" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="所在地域" prop="county">
              <el-cascader v-model="region" :options="regions" placeholder="请选择所在地域" @change="handleChange"
                           class="applet-info-input"></el-cascader>
            </el-form-item>
          </div>
          <div class="form-page" v-if="active === 2">
            <el-form-item label="管理账号" prop="managerAccount">
              <el-input v-model="appletForm.managerAccount" placeholder="管理账号" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="管理密码" prop="managerPassword">
              <el-input v-model="appletForm.managerPassword" placeholder="请输入管理密码" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="APPID" prop="appId">
              <el-input v-model="appletForm.appId" placeholder="请输入APPID" class="applet-info-input"></el-input>
            </el-form-item>
            <el-form-item label="SECRET" prop="appSecret">
              <el-input type="textarea" v-model="appletForm.appSecret" :show-word-limit="true" maxlength="150"
                        resize="none" rows="5" placeholder="请输入SECRET" class="applet-info-input"></el-input>
            </el-form-item>
          </div>
          <div style="text-align: center;margin: 20px 0px;">
            <el-button type="primary" @click="back('appletForm')" class="applet-info-input" v-if="active != 0">上一步
            </el-button>
            <el-button type="success" @click="next('appletForm')" class="applet-info-input" v-if="active != 2">下一步
            </el-button>
            <el-button type="success" @click="onSubmit('appletForm')" class="applet-info-input" v-if="active === 2">提交
            </el-button>
          </div>
        </el-form>
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
                active: 0,
                typeList: [],
                region: [],
                regions: [],
                timestamp: '',
                appletForm: {
                    appletLogo: '',
                    appletName: '',
                    appletSimple: '',
                    typeId: '',
                    ifRetail: '0',
                    licenseSrc: '',
                    licenseCode: '',
                    businessScope: '',
                    province: '',
                    city: '',
                    county: '',
                    managerAccount: '',
                    managerPassword: '',
                    appId: '',
                    appSecret: ''
                },
                myHeader: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                rules: {
                    appletLogo: [
                        {required: true, message: '请上传图片', trigger: 'blur'},
                        {type: 'string', min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur'}
                    ],
                    appletName: [
                        {required: true, message: '请输入小程序名称', trigger: 'blur'},
                        {type: 'string', min: 1, max: 50, message: '小程序名称长度为1-50个字符', trigger: 'blur'}
                    ],
                    appletSimple: [
                        {required: true, message: '请输入小程序简称', trigger: 'blur'},
                        {type: 'string', min: 1, max: 20, message: '小程序简称长度为1-20个字符', trigger: 'blur'}
                    ],
                    telephone: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'},
                        {type: 'string', min: 1, max: 20, message: '联系电话长度为1-20个字符', trigger: 'blur'}
                    ],
                    typeId: [
                        {required: true, message: '请选择服务类型', trigger: 'blur'},
                    ],
                    ifRetail: [
                        {required: true, message: '请选择营业类型', trigger: 'blur'}
                    ],
                    licenseSrc: [
                        {required: true, message: '请上传图片', trigger: 'blur'},
                        {type: 'string', min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur'}
                    ],
                    licenseCode: [
                        {required: true, message: '请输入执照代码', trigger: 'blur'},
                        {type: 'string', min: 1, max: 30, message: '执照代码长度为1-30个字符', trigger: 'blur'}
                    ],
                    businessScope: [
                        {required: true, message: '请输入营业范围', trigger: 'blur'},
                        {type: 'string', min: 1, max: 150, message: '营业范围长度为1-150个字符', trigger: 'blur'}
                    ],
                    county: [
                        {required: true, message: '请选择所在地域', trigger: 'blur'}
                    ],
                    managerAccount: [
                        {required: true, message: '请输入管理账号', trigger: 'blur'},
                        {type: 'string', min: 1, max: 50, message: '管理账号长度为1-50个字符', trigger: 'blur'}
                    ],
                    managerPassword: [
                        {required: true, message: '请输入管理密码', trigger: 'blur'},
                        {type: 'string', min: 1, max: 50, message: '管理密码长度为1-50个字符', trigger: 'blur'}
                    ],
                    appId: [
                        {required: true, message: '请输入APPID', trigger: 'blur'},
                        {type: 'string', min: 1, max: 30, message: 'APPID长度为1-30个字符', trigger: 'blur'}
                    ],
                    appSecret: [
                        {required: true, message: '请输入SECRET', trigger: 'blur'},
                        {type: 'string', min: 1, max: 150, message: 'SECRET长度为1-150个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {
            this.loadApplet(this.$cookies.get('applet_id'))
        },
        mounted () {
        },
        methods: {
            loadApplet (appletId) {
                this.active = 0
                if (appletId) {
                    this.loading = true
                    this.$axios({
                        url: '/api/user/applet/queryAppletInfo',
                        method: 'post',
                        data: {id: appletId}
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        this.$cookies.remove('applet_id')
                        this.regions = JSON.parse(res.data.data.regions)
                        this.typeList = res.data.data.typeList
                        if (res.data.code === '1') {
                            this.appletForm = res.data.data.applet
                            this.region = [this.appletForm.province, this.appletForm.city, this.appletForm.county]
                            this.appletForm.ifRetail = this.appletForm.ifRetail ? '1' : '0'
                            delete this.appletForm.userId
                            delete this.appletForm.updateTime
                            delete this.appletForm.ifSelling
                            delete this.appletForm.lat
                            delete this.appletForm.lon
                            delete this.appletForm.status
                            delete this.appletForm.appletCode
                            delete this.appletForm.addressSimple
                            delete this.appletForm.addressDetails
                        }
                        this.timestamp = '?' + Date.parse(new Date())
                        this.$global.exitLoad(this, null, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            },
            handleChange (res) {
                this.appletForm.province = res[0]
                this.appletForm.city = res[1]
                this.appletForm.county = res[2]
                this.$refs['appletForm'].validateField('county', (valid) => {
                })
            },
            onSubmit (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '加载中'})
                        this.$axios({
                            url: '/api/user/applet/saveAppletInfo',
                            method: 'post',
                            data: this.appletForm
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            let that = this
                            res.data.code === '1' ? this.$message.success({
                                message: res.data.data, duration: 1000, onClose: function () {
                                    that.$emit('loadApplet')
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
            next (formName) {
                let bool = true
                switch (this.active) {
                    case 0:
                        this.$refs[formName].validateField('appletLogo', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('appletName', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('appletSimple', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('telephone', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('typeId', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('ifRetail', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        break
                    case 1:
                        this.$refs[formName].validateField('licenseSrc', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('licenseCode', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('businessScope', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('county', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        break
                    case 2:
                        this.$refs[formName].validateField('managerAccount', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('managerPassword', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('appId', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        this.$refs[formName].validateField('appSecret', (valid) => {
                            bool = bool && valid.length <= 0
                        })
                        break
                    default:
                        break
                }
                if (bool && this.active < 2) {
                    this.active++
                }
            },
            back (formName) {
                switch (this.active) {
                    case 1:
                        this.$refs[formName].clearValidate('licenseSrc')
                        this.$refs[formName].clearValidate('licenseCode')
                        this.$refs[formName].clearValidate('businessScope')
                        this.$refs[formName].clearValidate('telephone')
                        this.$refs[formName].clearValidate('county')
                        this.$refs[formName].clearValidate('typeId')
                        break
                    case 2:
                        this.$refs[formName].clearValidate('managerAccount')
                        this.$refs[formName].clearValidate('managerPassword')
                        this.$refs[formName].clearValidate('appId')
                        this.$refs[formName].clearValidate('appSecret')
                        break
                    default:
                        break
                }
                if (this.active > 0) {
                    this.active--
                }
            },
            handleLogoSuccess (res, file) {
                if (res.code === '1') {
                    this.appletForm.appletLogo = res.data
                    this.timestamp = '?' + Date.parse(new Date())
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
                this.$refs['appletForm'].validateField('appletLogo', (valid) => {
                })
            },
            handleLicenseSuccess (res, file) {
                if (res.code === '1') {
                    this.appletForm.licenseSrc = res.data
                    this.timestamp = '?' + Date.parse(new Date())
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
                this.$refs['appletForm'].validateField('licenseSrc', (valid) => {
                })
            },
            beforePicUpload (file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'image/png,image/jpeg,image/jpg'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 3
                if (!isJPG) {
                    this.$message.error('上传图片格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 3MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            },
            updateType () {
                this.appletForm.appletSimple += 'TEST_1'
                this.appletForm.appletSimple = this.appletForm.appletSimple.replace('TEST_1', '')
            }
        }
    }
</script>

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

  .item-input {
    width: 190px;
  }

  .el-form-item__label {
    width: 110px;
  }
</style>
<template>
  <el-container>
    <div style="width: 100%;float: left;clear: left;margin: auto;">
      <el-steps :active="active" simple finish-status="success" align-center="true" style="margin-bottom: 50px;">
        <el-step title="基础信息" icon="el-icon-edit"></el-step>
        <el-step title="营业信息" icon="el-icon-upload"></el-step>
        <el-step title="管理信息" icon="el-icon-picture"></el-step>
        <el-step title="推广码" icon="el-icon-picture"></el-step>
      </el-steps>
      <el-form :inline="true" :model="appletForm" :rules="rules" ref="appletForm" class="demo-form-inline"
               style="width: 500px; margin: auto;text-align: center;">
        <div v-if="active === 0">
          <el-form-item label="小程序LOGO" prop="appletLogo" style="height: 140px;">
            <div style="display: inline-block;width: 190px;text-align: left;">
              <el-upload
                class="avatar-uploader"
                action="/api/user/uploadUserAvatar"
                name="appletLogo"
                :headers="myHeader"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="appletForm.appletLogo" :src="appletForm.appletLogo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <el-input v-model="appletForm.appletLogo" class="item-input" style="display: none;"></el-input>
          </el-form-item>
          <el-form-item label="小程序名称" prop="appletName">
            <el-input v-model="appletForm.appletName" placeholder="请输入小程序名称" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="小程序简称" prop="appletSimple">
            <el-input v-model="appletForm.appletSimple" placeholder="请输入小程序名称" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="appletForm.telephone" placeholder="请输入联系电话" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="经营类型" prop="ifRetail">
            <el-select v-model="appletForm.ifRetail" placeholder="请选择经营类型" class="item-input">
              <el-option label="零售" value='0'></el-option>
              <el-option label="批发" value='1'></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="active === 1">
          <el-form-item label="营业执照" prop="licenseSrc">
            <div style="display: inline-block;width: 190px;height: 140px;text-align: left;">
              <el-upload
                class="avatar-uploader"
                action="/api/user/uploadUserAvatar"
                name="licenseSrc"
                :headers="myHeader"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="appletForm.licenseSrc" :src="appletForm.licenseSrc" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <el-input v-model="appletForm.licenseSrc" class="item-input" style="display: none;"></el-input>
          </el-form-item>
          <el-form-item label="执照代码" prop="licenseCode">
            <el-input v-model="appletForm.licenseCode" placeholder="请输入执照代码" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="营业范围" prop="businessScope">
            <el-input v-model="appletForm.businessScope" placeholder="请输入小程序名称" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="所在省份" prop="province">
            <el-select v-model="appletForm.province" placeholder="请选择所在城市" class="item-input">
              <el-option label="请选择" value=''></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-select v-model="appletForm.city" placeholder="请选择所在城市" class="item-input">
              <el-option label="请选择" value=''></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在区县" prop="county">
            <el-select v-model="appletForm.county" placeholder="请选择所在区县" class="item-input">
              <el-option label="请选择" value=''></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="active === 2">
          <el-form-item label="管理账号" prop="managerAccount">
            <el-input v-model="appletForm.managerAccount" placeholder="管理账号" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="管理密码" prop="managerPassword">
            <el-input v-model="appletForm.managerPassword" placeholder="请输入管理密码" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="APPID" prop="appId">
            <el-input v-model="appletForm.appId" placeholder="请输入APPID" class="item-input"></el-input>
          </el-form-item>
          <el-form-item label="SECRET" prop="appSecret">
            <el-input v-model="appletForm.appSecret" placeholder="请输入SECRET" class="item-input"></el-input>
          </el-form-item>
        </div>
        <div v-if="active === 3">
          <el-form-item label="推广码" prop="recommenderId">
            <el-select v-model="appletForm.recommenderId" class="item-input">
              <el-option label="请选择" value=''></el-option>
            </el-select>
            <el-input v-model="appletForm.recommenderId" class="item-input" style="display: none;"></el-input>
          </el-form-item>
        </div>
        <div style="text-align: center;margin: 20px 0px;">
          <el-button type="primary" @click="back('appletForm')" class="item-input" v-if="active != 0">上一步</el-button>
          <el-button type="success" @click="next('appletForm')" class="item-input" v-if="active != 3">下一步</el-button>
          <el-button type="success" @click="onSubmit('appletForm')" class="item-input" v-if="active === 3">提交</el-button>
        </div>
      </el-form>
    </div>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-info',
    data() {
      return {
        active: 0,
        appletForm: {},
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
          ifRetail: [
            {required: true, message: '请选择营业类型', trigger: 'blur'},
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
            {type: 'string', min: 1, max: 100, message: '营业范围长度为1-100个字符', trigger: 'blur'}
          ],
          province: [
            {required: true, message: '请选择省份', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '请选择城市', trigger: 'blur'}
          ],
          county: [
            {required: true, message: '请选择区县', trigger: 'blur'}
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
          ],
          recommenderId: [
            {required: true, message: '请选择推广码', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.loadApplet(this.$cookies.get('applet_id'))
    },
    mounted() {
    },
    methods: {
      loadApplet(data) {
        this.active = 0
        let loading = Loading.service({fullscreen: true, text: '加载中'})
        if (data === '0'){
          data = null
        } else {
          data = {id: data}
        }
        this.$axios({
          url: '/api/user/applet/selectAppletInfo',
          method: 'post',
          data: data
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.appletForm = res.data.data
          } else if (res.data.code === "-1") {
            this.setAppletForm()
          }
          this.$cookies.remove('applet_id')
          this.$global.exitLoad(this, loading, res.data)
          this.$refs['appletForm'].resetFields()
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, loading, '')
        })
      },
      setAppletForm(){
        this.appletForm = {
          appletLogo: '',
            appletName: '',
            appletSimple: '',
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
            appSecret: '',
            recommenderId: ''
        }
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '加载中'})
            this.$axios({
              url: '/api/user/applet/updateAppletInfo',
              method: 'post',
              data: this.appletForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {

              } else if (res.data.code === "-1") {
                this.$message.error(res.data.data)
              }
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          }
        })
      },
      next(formName) {
        let bool = false
        switch (this.active) {
          case 0:
            this.$refs[formName].validateField('appletLogo', (valid) => {
              if (valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('appletName', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('appletSimple', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('telephone', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('ifRetail', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            break
          case 1:
            this.$refs[formName].validateField('licenseSrc', (valid) => {
              if (valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('licenseCode', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('businessScope', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('province', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('city', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('county', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            break
          case 2:
            this.$refs[formName].validateField('managerAccount', (valid) => {
              if (valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('managerPassword', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('appId', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            this.$refs[formName].validateField('appSecret', (valid) => {
              if (bool && valid.length <= 0) bool = true
            })
            break
          default:
            break
        }
        if (bool && this.active < 3) {
          this.active++
        }
      },
      back() {
        if (this.active > 0) {
          this.active--
        }
      },
      handleAvatarSuccess(res, file) {
        if (res.code === '1') {
          this.appletForm.appletLogo = URL.createObjectURL(file.raw)
        } else {
          this.$message.error(res.data)
        }
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        this.$global.exitLoad(this, loading, res.data)
      },
      beforeAvatarUpload(file) {
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片格式错误!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        if (!isJPG || !isLt2M) {
          loading.close()
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

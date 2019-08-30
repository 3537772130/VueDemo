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

  .applet-form .applet-info-input {
    width: 290px;
    text-align: left;
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
              <div class="demo-image__preview applet-info-input" style="display: inline-block;text-align: left;">
                <el-image :src="appletForm.appletLogo" class="avatar" :preview-src-list="srcList"></el-image>
              </div>
            </el-form-item>
            <el-form-item label="小程序名称" prop="appletName">
              <div class="applet-info-input">{{appletForm.appletName}}</div>
            </el-form-item>
            <el-form-item label="小程序简称" prop="appletSimple">
              <div class="applet-info-input">{{appletForm.appletSimple}}</div>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone">
              <div class="applet-info-input">{{appletForm.telephone}}</div>
            </el-form-item>
            <el-form-item label="经营类型" prop="ifRetail">
              <div class="applet-info-input">{{appletForm.ifRetail ? '批发':'零售'}}</div>
            </el-form-item>
          </div>
          <div class="form-page" v-if="active === 1">
            <el-form-item label="营业执照" prop="licenseSrc">
              <div class="demo-image__preview applet-info-input"
                   style="display: inline-block;height: 140px;text-align: left;">
                <el-image :src="appletForm.licenseSrc" class="avatar" :preview-src-list="srcList"></el-image>
              </div>
            </el-form-item>
            <el-form-item label="执照代码" prop="licenseCode">
              <div class="applet-info-input">{{appletForm.licenseCode}}</div>
            </el-form-item>
            <el-form-item label="营业范围" prop="businessScope">
              <div class="applet-info-input">{{appletForm.businessScope}}</div>
            </el-form-item>
            <el-form-item label="所在地域" prop="county">
              <div class="applet-info-input">{{appletForm.province + appletForm.city + appletForm.county}}</div>
            </el-form-item>
          </div>
          <div class="form-page" v-if="active === 2">
            <el-form-item label="管理账号" prop="managerAccount">
              <div class="applet-info-input">{{appletForm.managerAccount}}</div>
            </el-form-item>
            <el-form-item label="管理密码" prop="managerPassword">
              <div class="applet-info-input">{{appletForm.managerPassword}}</div>
            </el-form-item>
            <el-form-item label="APPID" prop="appId">
              <div class="applet-info-input">{{appletForm.appId}}</div>
            </el-form-item>
            <el-form-item label="SECRET" prop="appSecret">
              <div class="applet-info-input">{{appletForm.appSecret}}</div>
            </el-form-item>
          </div>
          <div style="text-align: center;margin: 20px 0px;">
            <el-button type="success" @click="next()" class="applet-info-input" style="text-align: center;">下一步
            </el-button>
          </div>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">

  export default {
    name: 'applet-info',
    data() {
      return {
        loading: false,
        active: 0,
        appletForm: {
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
        },
        timestamp: '',
        srcList: []
      }
    },
    created() {
      this.loadApplet(this.$cookies.get('applet_id'))
    },
    mounted() {
    },
    methods: {
      loadApplet(appletId) {
        this.active = 0
        if (appletId) {
          this.loading = true
          this.$axios({
            url: '/api/user/applet/queryAppletDetails',
            method: 'post',
            data: {id: appletId}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            this.$cookies.remove('applet_id')
            if (res.data.code === '1') {
              this.appletForm = res.data.data
              let timestamp = '?' + Date.parse(new Date())
              this.appletForm.appletLogo = this.appletForm.appletLogo + timestamp
              this.appletForm.licenseSrc = this.appletForm.licenseSrc + timestamp
              this.srcList.push(this.appletForm.appletLogo)
              this.srcList.push(this.appletForm.licenseSrc)
              delete this.appletForm.updateTime
              delete this.appletForm.ifSelling
              delete this.appletForm.lat
              delete this.appletForm.lon
              delete this.appletForm.status
              delete this.appletForm.appletCode
              delete this.appletForm.addressSimple
              delete this.appletForm.addressDetails
            }
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      next() {
        if (this.active < 2) {
          this.active++
        } else {
          this.active = 0
        }
      }
    }
  }
</script>

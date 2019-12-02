<style type="text/css">

  .form-info-val {
    width: 215px;
  }

  .form-info-div {
    text-align: left;
  }

  .sub-but {
    width: 215px;
    height: 30px;
  }

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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
<template>
  <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
    <el-tabs v-model="showTabs" type="border-card">
      <el-tab-pane label="修改信息" name="up-info" style="height: 400px;">
        <el-form :model="upInfo" :rules="infoRules" ref="upInfo" style="text-align: left; padding-top: 30px;">
          <el-form-item label="账户" :label-width="formLabelWidth" class="form-info-div">
            <span>{{info.mobile}}</span>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="upInfo.nickName" maxlength="20" autocomplete="off" placeholder="请输入昵称"
                      class="form-info-val"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" :label-width="formLabelWidth" class="form-info-div">
            <el-radio-group v-model="upInfo.gender" class="form-info-val">
              <el-radio v-for="gender in genderList" :key="gender.value" :label="gender.value">{{gender.name}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日" prop="birthday" :label-width="formLabelWidth" class="form-info-div">
            <el-date-picker v-model="upInfo.birthday" placeholder="选择日期"
                            :format="format" :value-format="valueFormat" class="form-info-val">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="upInfo.email" maxlength="20" autocomplete="off"
                      placeholder="请输入昵称"
                      class="form-info-val"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" class="form-info-div">
            <el-button class="sub-but" type="primary" @click="onSubmitInfo('upInfo')">提&nbsp;&nbsp;交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="up-pass" style="height: 400px;">
        <el-form :model="passForm" :rules="passRules" ref="passForm"
                 style="text-align: left; padding-top: 30px;">
          <el-form-item label="原密码" prop="oldPass" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="passForm.oldPass" name="oldPass" maxlength="20" type="password"
                      placeholder="请输入原密码"
                      class="form-info-val"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="passForm.newPass" name="newPass" maxlength="20" type="password"
                      placeholder="请输入登录密码"
                      class="form-info-val"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPass" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="passForm.confirmPass" name="confirmPass" maxlength="20" type="password"
                      placeholder="请输入确认密码"
                      class="form-info-val"
                      show-password></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" class="form-info-div">
            <el-button class="sub-but" type="primary" @click="onSubmitPass('passForm')">提&nbsp;&nbsp;交
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改头像" name="up-img" style="height: 400px;">
        <div style="text-align: left; padding-top: 30px;padding-left: 50px;">
          <el-upload
            class="avatar-uploader"
            action="/api/user/uploadUserAvatar"
            name="avatar"
            :headers="myHeader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="info.avatarUrl" :src="info.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span
            style="color: #DCDFE6; font-size: 14px;position: relative;top: 5px;left: 25px;">(点击图片修改头像)</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script type="text/javascript">
    import {Loading} from 'element-ui'

    export default {
        name: 'user-info',
        data() {
            return {
                info: {},
                showTabs: 'up-info',
                loading: false,
                format: 'yyyy年MM月dd日',
                valueFormat: 'yyyy-MM-dd',
                genderList: [
                    {
                        name: '男',
                        value: '1'
                    },
                    {
                        name: '女',
                        value: '0'
                    }
                ],
                upInfo: {
                    nickName: '',
                    gender: '',
                    birthday: '',
                    email: ''
                },
                passForm: {
                    oldPass: '',
                    newPass: '',
                    confirmPass: ''
                },
                formLabelWidth: '120px',
                infoRules: {
                    nickName: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 1, max: 20, message: '昵称长度过长', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'blur'}
                    ]
                },
                passRules: {
                    oldPass: [
                        {required: true, message: '请输入原密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'},
                        {type: 'string', max: 20, message: '密码长度最多20位', trigger: 'blur'}
                    ],
                    newPass: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'},
                        {type: 'string', max: 20, message: '密码长度最多20位', trigger: 'blur'}
                    ],
                    confirmPass: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'},
                        {type: 'string', max: 20, message: '密码长度最多20位', trigger: 'blur'},
                        {validator: this.$global.validate(this).confirmPassValidator, trigger: 'blur'}
                    ]
                },
                myHeader: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        },
        created() {
            this.info = this.$cookies.get('user_info')
            this.upInfo.nickName = this.info.nickName
            this.upInfo.gender = this.info.gender ? '1' : '0'
            this.upInfo.birthday = this.info.birthday
            this.upInfo.email = this.info.email
        },
        mounted() {

        },
        methods: {
            loadUserInfo() {

            },
            getPassword() {
                return this.passForm.newPass
            },
            onSubmitInfo(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '正在提交'})
                        this.$axios({
                            url: '/api/user/updateUserInfo',
                            method: 'post',
                            data: this.upInfo
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            if (res.data.code === '1') {
                                let info = res.data.data
                                this.info = info
                                this.$cookies.set('user_info', info)
                                this.$emit('updateInfo')
                                this.$message({message: '修改信息成功', type: 'success'})
                            } else if (res.data.code === '-1') {
                                this.$message.error(res.data.data)
                            }
                            this.$global.exitLoad(this, loading, res.data)
                        }).catch(error => {
                            console.info('错误信息', error)
                            this.$global.exitLoad(this, loading, '')
                        })
                    } else {
                        this.$message({message: '信息提交失败', type: 'warning'})
                    }
                })
            },
            onSubmitPass(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '正在提交'})
                        this.$axios({
                            url: '/api/user/updateUserInfoByPassword',
                            method: 'post',
                            data: {oldPass: this.passForm.oldPass, newPass: this.passForm.newPass}
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            if (res.data.code === '1') {
                                let that = this
                                this.$message({
                                    message: res.data.data,
                                    type: 'success',
                                    onClose: function () {
                                        that.$axios({
                                            url: '/api/exitLogin',
                                            method: 'post'
                                        }).then(re => {
                                            if (re.data.code === '1') {
                                                that.$global.exitLoad(that, loading, {'code': '0'})
                                            } else {
                                                that.$message.error(re.data.data)
                                            }
                                        })
                                    }
                                })
                            } else {
                                this.$message.error(res.data.data)
                                this.$global.exitLoad(this, loading, res.data)
                            }
                        }).catch(error => {
                            console.info('错误信息', error)
                            this.$global.exitLoad(this, loading, '')
                        })
                    } else {
                        this.$message({message: '信息提交失败', type: 'warning'})
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                console.info('后台返回的res', res)
                console.info('后台返回的file', file)
                if (res.code === '1') {
                    this.info = this.$cookies.get('user_info')
                    this.info.avatarUrl = URL.createObjectURL(file.raw)
                    this.$cookies.set('user_info', this.info)
                    this.$emit('updateInfo')
                    this.$message({message: '上传成功', type: 'success'})
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
            },
            beforeAvatarUpload(file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'image/png,image/jpeg'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 3
                if (!isJPG) {
                    this.$message.error('上传头像图片格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 3MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            }
        }
    }
</script>

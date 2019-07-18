<style type="text/css">
  .text {
    font-size: 14px;
  }

  .item {
    height: 19px;
    line-height: 19px;
    text-align: left;
    margin-bottom: 18px;
  }

  .item > label {
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 5px;
    font-size: 12px;
  }

  .el-card__header {
    padding: 0px;
  }

  .clearfix {
    height: 45px;
    line-height: 45px;
    text-align: left;
    font-weight: bold;
    padding-left: 25px;
    font-size: 16px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .el-button-update {
    font-size: 20px;
    position: relative;
    top: 10px;
    left: -30px;
  }

  .photo-div {
    position: absolute;
    top: 70px;
    left: 350px;
  }

  .photo-div:hover {
    cursor: pointer;
  }

  .photo-div > .user-photo {
    width: 100px;
    height: 100px;
    border-radius: 0px;
    border: 1px #dcdee2 solid;
  }

  .form-info-div {
    text-align: left;
  }

  .form-info-val {
    width: 215px;
  }
</style>
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button class="el-button-update" style="float: right; padding: 3px 0" type="text"
                   @click="dialogFormVisible = true">
          <i class="el-icon-edit"></i><span style="font-size: 14px">修改信息</span>
        </el-button>
      </div>
      <div class="text item"><label>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>{{info.nickName}}</div>
      <div class="text item"><label>账&nbsp;&nbsp;户&nbsp;&nbsp;名：</label>{{info.userName}}</div>
      <div class="text item"><label>登录时间：</label>{{info.createTime}}</div>
      <div class="photo-div">
        <img src="@/assets/logo.png" class="user-photo">
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-tabs v-model="editableTabsValue" type="border-card">
        <el-tab-pane label="修改信息" name="up-info" style="height: 400px;">
          <el-form :model="upInfo" :rules="infoRules" ref="upInfo">
            <el-form-item label="账户" :label-width="formLabelWidth" class="form-info-div">
              <span>{{info.userName}}</span>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth" class="form-info-div">
              <el-input v-model="upInfo.nickName" name="nickName" autocomplete="off" class="form-info-val"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" class="form-info-div">
              <el-select v-model="upInfo.sex" name="sex" placeholder="请选择活动区域" class="form-info-val">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="onSubmitInfo('upInfo')">提&nbsp;&nbsp;交</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="up-pass" style="height: 400px;">
          <el-form :model="passForm" :rules="passRules" ref="passForm">
            <el-form-item label="昵称" :label-width="formLabelWidth" class="form-info-div">
              <el-input v-model="upInfo.nickName" name="nickName" autocomplete="off" class="form-info-val"></el-input>
            </el-form-item>
            <el-form-item label="原密码" :label-width="formLabelWidth" class="form-info-div">
              <el-input name="oldPass" maxlength="20" type="password" class="form-info-val" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" class="form-info-div">
              <el-input name="newPass" maxlength="20" type="password" class="form-info-val" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" class="form-info-div">
              <el-input name="confirmPass" maxlength="20" type="password" class="form-info-val"
                        show-password></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmitPass('passForm')">提&nbsp;&nbsp;交</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'personal-main',
    data() {
      let confirmPassValidator = (rule, value, callback) => {
        if (value !== this.passForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        }
      }
      return {
        info: this.$cookies.get('user_info'),
        upInfo: {},
        passForm: {},
        dialogTableVisible: false,
        dialogFormVisible: false,
        editableTabsValue: 'up-info',
        formLabelWidth: '120px',
        infoRules: {
          nickName: [
            {required: true, message: '请输入账户名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请输入账户名', trigger: 'blur'}
          ]
        },
        passRules: {
          oldPass: [
            {required: true, message: '请输入原密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'},
            {validator: confirmPassValidator, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmitInfo(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            let nickName = this.upInfo.nickName
            let sex = this.upInfo.sex === '男' ? 1 : this.upInfo.sex === '女' ? 0 : this.upInfo.sex
            this.$axios({
              url: '/api/user/updateUserInfo',
              method: 'post',
              data: {nickName: nickName, sex: sex},
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                let info = res.data.data
                info.sex = info.sex ? '男' : '女'
                this.upInfo = info
                this.$cookies.set('user_info', info)
                this.$emit('updateInfo')
                this.$message({message: '修改信息成功', type: 'success'})
              } else {
                this.$message.error(res.data.data)
              }
              this.$nextTick(() => {
                loading.close()
              })
            }).catch(error => {
              console.info('错误信息', error)
              this.GLOBAL.loginExpire(this, loading)
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
              data: this.passForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                this.GLOBAL.loginExpire(this, loading)
              } else {
                this.$message.error(res.data.data)
              }
              this.$nextTick(() => {
                loading.close()
              })
            }).catch(error => {
              console.info('错误信息', error)
              this.GLOBAL.loginExpire(this, loading)
            })
          } else {
            this.$message({message: '信息提交失败', type: 'warning'})
          }
        })
      }
    },
    created() {
      let info = this.info
      info.sex = info.sex ? '男' : '女'
      this.upInfo = info
    }
  }
</script>

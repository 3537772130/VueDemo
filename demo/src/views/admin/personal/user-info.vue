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

  .el-form {
    text-align: left;
  }

  .sub-but {
    width: 215px;
    height: 30px;
  }
</style>
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button class="el-button-update" style="float: right; padding: 3px 0" type="text"
                   @click="recoveryInfo()">
          <i class="el-icon-edit"></i><span style="font-size: 14px">修改信息</span>
        </el-button>
      </div>
      <div class="text item"><label>账&nbsp;&nbsp;户&nbsp;&nbsp;名：</label>{{info.userName}}</div>
      <div class="text item"><label>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>{{info.nickName}}</div>
      <div class="text item"><label>注册时间：</label>{{info.createTime}}</div>
      <div class="photo-div">
        <img :src="info.headPortrait" class="user-photo">
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-tabs v-model="editableTabsValue" type="border-card">
        <el-tab-pane label="修改信息" name="up-info" style="height: 400px;">
          <el-form :model="upInfo" :rules="infoRules" ref="upInfo">
            <el-form-item label="账户" :label-width="formLabelWidth" class="form-info-div">
              <span>{{info.userName}}</span>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName" :label-width="formLabelWidth" class="form-info-div">
              <el-input v-model="upInfo.nickName" name="nickName" maxlength="20" autocomplete="off" placeholder="请输入昵称"
                        class="form-info-val"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" :label-width="formLabelWidth" class="form-info-div">
              <el-radio-group v-model="upInfo.sex" class="form-info-val">
                <el-radio v-for="sex in sexList" :key="sex.value" :label="sex.value">{{sex.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" class="form-info-div">
              <el-button class="sub-but" type="primary" @click="onSubmitInfo('upInfo')">提&nbsp;&nbsp;交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="up-pass" style="height: 400px;">
          <el-form :model="passForm" :rules="passRules" ref="passForm">
            <el-form-item label="原密码" prop="oldPass" :label-width="formLabelWidth" class="form-info-div">
              <el-input v-model="passForm.oldPass" name="oldPass" maxlength="20" type="password" placeholder="请输入原密码"
                        class="form-info-val"
                        show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass" :label-width="formLabelWidth" class="form-info-div">
              <el-input v-model="passForm.newPass" name="newPass" maxlength="20" type="password" placeholder="请输入登录密码"
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
              <el-button class="sub-but" type="primary" @click="onSubmitPass('passForm')">提&nbsp;&nbsp;交</el-button>
            </el-form-item>
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
      return {
        info: this.$cookies.get('user_info'),
        sexList: [
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
          sex: ''
        },
        passForm: {
          oldPass: '',
          newPass: '',
          confirmPass: ''
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        editableTabsValue: 'up-info',
        formLabelWidth: '120px',
        infoRules: {
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {min: 1, max: 20, message: '昵称长度过长', trigger: 'blur'}
          ],
          sex: [
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
            {validator: this.GLOBAL.validate(this).confirmPassValidator, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getPassword() {
        return this.passForm.newPass
      },
      recoveryInfo() {
        this.dialogFormVisible = true
        this.editableTabsValue = 'up-info'
        this.$nextTick(() => {
          this.$refs['passForm'].resetFields()
          let info = this.$cookies.get('user_info')
          info.sex = info.sex ? '1' : '0'
          this.upInfo = info
          this.passForm = {}
        })
      },
      onSubmitInfo(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/user/updateUserInfo',
              method: 'post',
              data: {nickName: this.upInfo.nickName, sex: this.upInfo.sex}
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                let info = res.data.data
                this.info = info
                this.$cookies.set('user_info', info)
                this.$emit('updateInfo')
                this.$message({message: '修改信息成功', type: 'success'})
              } else if (res.data.code === "-1") {
                this.$message.error(res.data.data)
              }
              this.GLOBAL.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.GLOBAL.exitLoad(this, loading, "")
            })
          } else {
            this.$message({message: '信息提交失败', type: 'warning'})
          }
        })
      },
      onSubmitPass(name) {
        let bool = true
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
                that.$message({
                  message: res.data.data, type: 'success', onClose: function () {
                    that.GLOBAL.exitLoad(that, loading, {code: "0"})
                  }
                })
              } else if (res.data.code === "-1") {
                this.$message.error(res.data.data)
                this.GLOBAL.exitLoad(this, loading, res.data)
              }
            }).catch(error => {
              console.info('错误信息', error)
              this.GLOBAL.exitLoad(this, loading, "")
            })
          } else {
            this.$message({message: '信息提交失败', type: 'warning'})
          }
        })
      }
    },
    created() {

    }
  }
</script>

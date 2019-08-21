<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .content-div {
    width: 100%;
    margin: auto;
    margin-top: 100px;
  }

  .content-div > .c-title-div {
    width: 800px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    margin: auto;
  }

  .content-div > .c-form-div {
    width: 740px;
    margin: auto;
    border: 1px #DCDFE6 solid;
    padding: 30px;
  }

  .form-info-div {
    text-align: left;
  }

  .form-info-val {
    width: 215px;
  }

  .sub-but {
    width: 215px;
    height: 30px;
  }
</style>
<template>
  <div>
    <div style="text-align: right;background-color: #545c64;">
      <headerMenu ref="headerMenu"></headerMenu>
    </div>
    <div class="content-div">
      <div class="c-title-div"><h1>基本信息填写</h1></div>
      <div class="c-form-div">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="mobile" :label-width="formLabelWidth" class="form-info-div">
            <el-input type="number" v-model="ruleForm.mobile" minlength="11" maxlength="11"
                      placeholder="请输入手机号码" class="form-info-val"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="ruleForm.nickName" minlength="1" maxlength="20" placeholder="请输入昵称"
                      class="form-info-val"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" :label-width="formLabelWidth" class="form-info-div">
            <el-radio-group v-model="ruleForm.gender" class="form-info-val">
              <el-radio v-for="gender in genderList" :key="gender.value" :label="gender.value">{{gender.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="登录密码" prop="password" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="ruleForm.password" maxlength="20" type="password" placeholder="请输入登录密码"
                      class="form-info-val"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPass" :label-width="formLabelWidth" class="form-info-div">
            <el-input v-model="ruleForm.confirmPass" maxlength="20" type="password" placeholder="请输入确认密码"
                      class="form-info-val"
                      show-password></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" class="form-info-div">
            <el-button class="sub-but" type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import headerMenu from '@/views/common/header-menu.vue'
  import {Loading} from 'element-ui'

  export default {
    name: 'register',
    components: {
      'headerMenu': headerMenu
    },
    data() {
      return {
        formLabelWidth: '120px',
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
        ruleForm: {
          mobile: '',
          nickName: '',
          gender: '0',
          password: '',
          confirmPass: ''
        },
        rules: {
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {type: 'string', min: 11, max: 11, message: '长度为11个数字', trigger: 'blur'},
            {validator: this.$global.validate(this).mobileValidator, trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {type: 'string', min: 1, max: 20, message: '昵称长度为1-20个字符', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {type: 'string', min: 6,max: 20,  message: '密码长度为6-20个字符', trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {type: 'string', min: 6, max: 20, message: '确认密码长度为6-20个字符', trigger: 'blur'},
            {validator: this.$global.validate(this).confirmPassValidator, trigger: 'blur'}
          ]
        }
      }
    },
    created() {

    },
    mounted() {
      this.$refs.headerMenu.setMenuIndex('4')
    },
    methods: {
      getPassword() {
        return this.ruleForm.password
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            this.$axios({
              url: '/api/user/doRegister',
              method: 'post',
              data: this.ruleForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                let that = this
                that.$message({
                  message: '注册成功',
                  type: 'success',
                  onClose: function () {
                    that.$router.push({path: '/login'})
                  }
                })
              } else if (res.data.code === '-1') {
                this.$message.error(res.data.data)
              }
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, '')
            })
          } else {
            this.$message({
              message: '信息提交失败',
              type: 'warning'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

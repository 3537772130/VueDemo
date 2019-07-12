<style type="text/css">
  .login-div {
    width: 100%;
    height: 100%;
    margin-top: 50px;
  }

  .login-div > .img-div {
    width: 100%;
    height: 200px;
    text-align: center;
  }

  .login-div > .img-div > img {
    width: 200px;
    height: 200px;
  }

  .login-div > .form-div {
    width: 259px;
    height: 189px;
    margin: auto;
    border: 1px #DCDFE6 solid;
    border-radius: 5px;
    padding-top: 50px;
    box-shadow: 10px 10px 5px #DCDFE6;
  }

  .login-div > .form-div > form {
    width: 189px;
    margin: auto;
  }

  .login-div > .form-div > form button {
    width: 189px;
    position: relative;
    left: -80px;
  }
  .input-div{
    width: 189px;
    position: relative;
    left: -80px;
  }
  .el-form-item__error{
    left: -80px;
  }
</style>
<template>
  <div class="login-div">
    <div class="img-div">
      <img src="@/assets/logo.png">
    </div>
    <div class="form-div">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item prop="userName">
          <el-input class="input-div" placeholder="请输入账户名" prefix-icon="el-icon-user"
                    v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input type="password" class="input-div" placeholder="请输入密码" prefix-icon="el-icon-lock"
                    v-model="ruleForm.userPass" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'login',
    data() {
      return {
        ruleForm: {
          userName: '17601301913',
          userPass: 'zhouhuahu'
        },
        rules: {
          userName: [
            {required: true, message: '请输入账户名', trigger: 'blur'}
          ],
          userPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在登录'})
            this.$axios({
              url: '/api/doLogin',
              method: 'post',
              data: this.ruleForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                this.$cookies.set('userInfo', res.data.data)
                this.$router.push({path: '/main-info'})
              } else {
                this.$message.error(res.data.data)
              }
              this.$nextTick(() => {loading.close();})
            })
          } else {
            this.$message({message: '表单校验失败!', type: 'warning'})
          }
        })
      }
    }
  }
</script>

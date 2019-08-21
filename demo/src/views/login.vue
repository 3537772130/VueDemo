<style type="text/css">
  .login-div {
    width: 100%;
    position: relative;
    top: 30%;
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

  .input-div {
    width: 189px;
    position: relative;
    left: -80px;
  }

  .login-form .el-form-item__error {
    left: -80px;
  }
</style>
<template>
  <el-container style="margin: 0px;">
    <el-header style="padding: 0px;">
      <div style="background-color: #545c64;text-align: right;">
        <headerMenu ref="headerMenu"></headerMenu>
      </div>
    </el-header>
    <el-main :style="contentStyle">
      <div class="login-div">
        <div class="form-div">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="login-form">
            <el-form-item prop="mobile">
              <el-input class="input-div" placeholder="请输入账户名" prefix-icon="el-icon-user"
                        v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" class="input-div" placeholder="请输入密码" prefix-icon="el-icon-lock"
                        v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('ruleForm')" style="letter-spacing: 5px;">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import headerMenu from '@/views/common/header-menu.vue'
  import {Loading} from 'element-ui'

  export default {
    name: 'login',
    components: {
      'headerMenu': headerMenu
    },
    data() {
      return {
        contentStyle: {
          'width': '100%',
          'height': `${document.documentElement.clientHeight - 76}` + 'px',
          'background-image': 'url(\'/static/images/home/computer/computer-5.jpg\')',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
        },
        ruleForm: {
          mobile: '17601301913',
          password: '123456'
        },
        rules: {
          mobile: [
            {required: true, message: '请输入账户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    mounted() {
      this.$refs.headerMenu.setMenuIndex("3")
    },
    methods: {
      onSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '正在登录'})
            this.$axios({
              url: '/api/user/doLogin',
              method: 'post',
              data: this.ruleForm
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                let info = res.data.data
                if (info.avatarUrl === null || info.avatarUrl === ''){
                  info.avatarUrl = '/static/images/personal/default-avatar.jpeg'
                }
                this.$cookies.set('user_info', info, 3600)
                this.$router.push({path: '/main-info'})
              } else if (res.data.code === "-1") {
                this.$message.error(res.data.data)
              }
              this.$global.exitLoad(this, loading, res.data)
            }).catch(error => {
              console.info('错误信息', error)
              this.$global.exitLoad(this, loading, "")
            })
          } else {
            this.$message({message: '表单校验失败!', type: 'warning'})
          }
        })
      }
    }
  }
</script>

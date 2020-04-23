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
    box-shadow: 5px 5px 5px #DCDFE6;
  }

  .login-div > .form-div > form {
    width: 189px;
    margin: auto;
  }

  .login-div > .form-div > form button {
    width: 189px;
    position: relative;
  }

  .input-div {
    width: 189px;
    position: relative;
    left: -80px;
  }

  .login-form .el-input {
    left: 0px;
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
          <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
            <el-form-item prop="mobile">
              <el-input class="input-div" placeholder="请输入账户名" prefix-icon="el-icon-user"
                        v-model="loginForm.mobile" @input="handleClick"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" class="input-div" placeholder="请输入密码" prefix-icon="el-icon-lock"
                        v-model="loginForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('loginForm')"
                         style="letter-spacing: 5px;">立即登录
              </el-button>
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
        data () {
            return {
                contentStyle: {
                    'width': '100%',
                    'height': `${document.documentElement.clientHeight - 76}` + 'px',
                    'background-image': 'url(\'/static/images/home/computer/computer-5.jpg\')',
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover'
                },
                loginForm: {
                    mobile: '',
                    password: ''
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
        created () {
            let that = this
            document.onkeydown = function (e) {
                e = window.event || e
                // 验证在登录界面和按得键是回车键enter
                if (that.$route.path === '/login' && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
                    // 登录函数 （handleSubmit2('loginForm2')-登录按钮的点击事件）
                    that.onSubmit('loginForm')
                }
            }
        },
        mounted () {
            this.$refs.headerMenu.setMenuIndex('3')
        },
        methods: {
            onSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '正在登录'})
                        this.$axios({
                            url: '/api/user/doLogin',
                            method: 'post',
                            data: this.loginForm
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            if (res.data.code === '1') {
                                let info = res.data.data
                                if (info.avatarUrl === null || info.avatarUrl === '') {
                                    info.avatarUrl = '/static/images/user/default-avatar.jpeg'
                                }
                                this.$cookies.set('user_info', info, 3600)
                                this.$router.push({path: '/main-info'})
                            } else if (res.data.code === '-1') {
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
            handleClick () {
                try {
                    this.loginForm.mobile = this.loginForm.mobile.replace(/[^\d]/g, '')
                } catch (e) {
                }
            }
        }
    }
</script>

<style type="text/css">
  .el-menu--horizontal > .el-submenu {
    float: right;
  }

  .logo {
    display: inline-block;
    position: relative;
    top: -25px;
    width: 120px;
    height: 120px;
  }

  .logo-title {
    display: inline-block;
    position: relative;
    top: -18px;
  }
</style>
<template>
  <div>
    <div
      style="display: inline-block;width: 200px;height: 63px;text-align: center;position: absolute;top: 0px;left: 0px;">
      <img class="logo" src="/static/images/logo.png">
<!--      <img class="logo-title" src="/api/user/setImageText?text=程序坞&color=2196f3&fontFamily=华文隶书">-->
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF" :style="menuWidth">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">前往TEST</el-menu-item>
      <!--      <el-menu-item index="6">ECHARTS</el-menu-item>-->
      <el-menu-item index="7">图片压缩</el-menu-item>
      <el-menu-item index="3" v-if="!loginStatus">登录</el-menu-item>
      <el-menu-item index="4">立刻注册</el-menu-item>
      <el-submenu index="5" v-if="loginStatus" @click.native="handleSelect('5-1','5')">
        <template slot="title">
          <el-avatar :size="50" :src="info.avatarUrl" @error="errorHandler">
            <img :src="info.avatarUrl"/>
          </el-avatar>
        </template>
        <el-menu-item disabled>{{info.nickName}}</el-menu-item>
        <el-menu-item index="5-1">{{info.mobile}}</el-menu-item>
        <el-menu-item index="5-2">注销登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
    import {Loading} from 'element-ui'

    export default {
        name: 'header-menu',
        data () {
            return {
                ifLogo: true,
                activeIndex: '1',
                loginStatus: false,
                menuWidth: {
                    'display': 'inline-block',
                    'border-bottom': 'none',
                    'width': '500px',
                    'margin-right': '30px'
                },
                info: this.$cookies.get('user_info')
            }
        },
        created () {
            this.checkLogin()
        },
        methods: {
            errorHandler () {
                return true
            },
            handleSelect (key, keyPath) {
                console.log(key, keyPath)
                switch (key) {
                    case '1':
                        this.$router.push({path: '/'})
                        break
                    case '2':
                        this.$router.push({path: '/test'})
                        break
                    case '3':
                        this.$router.push({path: '/login'})
                        break
                    case '4':
                        this.$router.push({path: '/register'})
                        break
                    case '5-1':
                        this.$router.push({path: '/main-info'})
                        break
                    case '5-2':
                        this.exitLogin()
                        break
                    case '6':
                        this.$router.push({path: '/echarts'})
                        break
                    case '7':
                        window.open('https://www.bejson.com/ui/compress_img/', '_blank')
                        break
                }
            },
            checkLogin () {
                this.loginStatus = this.$global.checkLogin(this)
                if (!this.loginStatus) {
                    this.menuWidth = {
                        'display': 'inline-block',
                        'border-bottom': 'none',
                        'width': '450px',
                        'margin-right': '30px'
                    }
                }
            },
            setMenuIndex (index) {
                this.activeIndex = index
                if (index === '5-1') {
                    this.ifLogo = false
                }
            },
            updateInfo () {
                this.info = this.$cookies.get('user_info')
            },
            exitLogin () {
                this.$confirm('确定注销登录吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loading = Loading.service({fullscreen: true, text: '正在注销'})
                    this.$axios({
                        url: '/api/user/exitLogin',
                        method: 'post'
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        if (res.data.code === '1') {
                            this.$cookies.remove('user_info')
                            this.$router.push({path: '/login'})
                        } else {
                            this.$message.error(res.data.data)
                        }
                        this.$global.exitLoad(this, loading, res.data)
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>

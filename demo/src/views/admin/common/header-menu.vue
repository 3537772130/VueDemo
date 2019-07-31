<style type="text/css">
</style>
<template>
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
    <el-menu-item index="3" v-if="!loginStatus">登录</el-menu-item>
    <el-menu-item index="4">立刻注册</el-menu-item>
    <el-submenu index="5" v-if="loginStatus" @click.native="handleSelect('5-1','5')">
      <template slot="title">
        <el-avatar :size="50" :src="info.headPortrait" @error="errorHandler">
          <img :src="info.headPortrait"/>
        </el-avatar>
      </template>
      <el-menu-item disabled>{{info.nickName}}</el-menu-item>
      <el-menu-item index="5-1">{{info.userName}}</el-menu-item>
      <el-menu-item index="5-3" @click.native="exitLogin()">注销登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import {Loading} from 'element-ui'

  export default {
    name: 'header-menu',
    data() {
      return {
        activeIndex: '1',
        loginStatus: false,
        menuWidth: {'display': 'inline-block', 'border-bottom': 'none', 'width': '390px', 'margin-right': '30px'},
        info: this.$cookies.get('user_info')
      }
    },
    created() {
      this.checkLogin()
    },
    methods: {
      errorHandler() {
        return true
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        switch (key) {
          case "1":
            this.$router.push({path: '/index'})
            break
          case "2":
            this.$router.push({path: '/test'})
            break
          case "3":
            this.$router.push({path: '/login'})
            break
          case "4":
            this.$router.push({path: '/register'})
            break
          case "5-1":
            this.$router.push({path: '/main-info'})
            break
          case "5-2":
            this.exitLogin()
            break
        }
      },
      checkLogin() {
        this.loginStatus = this.GLOBAL.checkLogin(this)
        if (!this.loginStatus) {
          this.menuWidth = {
            'display': 'inline-block',
            'border-bottom': 'none',
            'width': '340px',
            'margin-right': '30px'
          }
        }
      },
      setMenuIndex(index) {
        this.activeIndex = index
      },
      updateInfo() {
        this.info = this.$cookies.get('user_info')
      },
      exitLogin() {
        this.$confirm('确定注销登录吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loading = Loading.service({fullscreen: true, text: '正在注销'})
          this.$axios({
            url: '/api/exitLogin',
            method: 'post'
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              this.$cookies.remove('user_info')
              this.$router.push({path: '/login'})
            } else {
              this.$message.error(res.data.data)
            }
            this.$nextTick(() => {
              loading.close()
            })
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>

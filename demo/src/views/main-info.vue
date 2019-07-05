<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div>
      <div>{{nickName}}</div>
      <label>{{userName}}</label>
    </div>
    <button @click="exitLogin()">注销</button>
  </div>
</template>

<script>
  export default {
    name: 'main-info',
    data () {
      return {
        msg: 'This is Main',
        userName: '123 ',
        nickName: '321'
      }
    },
    methods: {
      getLoginInfo () {
        this.$axios({
          url: '/api/user/getUserInfo',
          method: 'post'
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            const info = res.data.data;
            this.userName = info.userName;
            this.nickName = info.nickName;
          } else {
            this.$Message.error(res.data.data)
            this.$router.push({path: '/login'})
          }
        })
      },
      exitLogin () {
        this.$axios({
          url: '/api/exitLogin',
          method: 'post'
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.$router.push({path: '/login'})
          } else {
            this.$Message.error(res.data.data)
          }
        })
      }
    },
    created() {
      this.getLoginInfo()
    }
  }
</script>

<style scoped>

</style>

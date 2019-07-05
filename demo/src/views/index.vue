<template>
  <div id="app">
    <div ref='box'></div>
  </div>
</template>

<script>
  import Login from '@/views/login'
  import Main from '@/views/main-info'
  import VueElementLoading from 'vue-element-loading'
  export default {
    name: 'index',
    components: {
      'VueElementLoading': VueElementLoading,
      'Login': Login,
      'Main': Main
    },
    methods: {
      indexs: function () {
        this.$Message.loading('加载中')
        this.$axios({
          url: '/api/checkLogin',
          method: 'post'
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.$router.push({path: '/main-info'})
          } else {
            this.$router.push({path: '/login'})
          }
        })
      }
    },
    created() {
      this.indexs()
    }
  }
</script>

<style scoped>

</style>

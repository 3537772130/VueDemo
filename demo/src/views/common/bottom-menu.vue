<template>
  <div class="bot-menu">
    <ul>
      <li>
        <div>
          <div>
            <img src="">
          </div>
          <div>main</div>
        </div>
      </li>
      <li>
        <div>
          <div>
            <img src="">
          </div>
          <div>type</div>
        </div>
      </li>
      <li>
        <div>
          <div>
            <img src="">
          </div>
          <div>my</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'bottom-menu',
    methods: {
      indexs: function () {
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
  .bot-menu{
    width: 100%;
    height: 50px;
  }
  .bot-menu>ul{
    width: 100%;
    height: 50px;
    background-color: aquamarine;
  }
  .bot-menu>ul>li{
    list-style: none;
    float: left;
    width: 33.33%;
  }
</style>

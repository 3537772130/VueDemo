<script type="text/javascript">

  let checkLogin = function (that) {
    if (that.$cookies.get('user_info') === '' || that.$cookies.get('user_info') === null){
      that.$router.push({path: '/login'})
    }
  }

  let loginExpire = function (that, loading) {
    that.$nextTick(() => {
      loading.close()
    })
    that.$message({
      message: '登录过期', type: 'error', onClose: function () {
        that.$cookies.remove("user_info")
        that.$router.push({path: '/login'})
      }
    })
  }

  export default {
    checkLogin,
    loginExpire
  }
</script>

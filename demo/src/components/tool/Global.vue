<script type="text/javascript">
  /**
   * 判断登录是否失效
   * @param that
   * @returns {boolean}
   */
  let checkLogin = function (that) {
    if (that.$cookies.get('user_info') === '' || that.$cookies.get('user_info') === null) {
      return false
    }
    return true
  }

  /**
   * 登录过期处理
   * @param that
   * @param loading
   */
  let exitLoad = function (that, loading, data) {
    that.$nextTick(() => {
      loading.close()
    })
    if (data === ""){
      that.$message.error("当前访问人数过多，请稍后再试")
    } else if (data.code === "0") {
      that.$message({
        message: '登录过期，请重新登录',
        type: 'error',
        onClose: function () {
          that.$cookies.remove("user_info")
          that.$router.push({path: '/login'})
        }
      })
    }
  }

  /**
   * 表单验证
   */
  let validate = function (that) {
    return {
      /**
       * 校验手机号码格式
       */
      mobileValidator: (rule, value, callback) => {
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,3,5-9]))\d{8}$/
        if (!reg.test(value)) {
          callback(new Error('用户名格式不正确!'))
        } else {
          that.$axios({
            url: '/api/mobileWhetherRegistered',
            method: 'post',
            data: {userName: value}
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code != '1') {
              callback(new Error(res.data.data))
            } else {
              callback()
            }
          }).catch(error => {
            console.info('错误信息', error)
            callback(new Error('该账户已被注册'))
          })
        }
      },
      /**
       * 密码确认
       */
      confirmPassValidator: (rule, value, callback) => {
        if (value === that.getPassword()) {
          callback()
        } else {
          callback(new Error('两次输入密码不一致!'))
        }
      }
    }
  }

  export default {
    checkLogin,
    exitLoad,
    validate
  }
</script>

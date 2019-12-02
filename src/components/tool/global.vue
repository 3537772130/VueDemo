<script type='text/javascript'>
  /**
   * 判断登录是否失效
   * @param that
   * @returns {boolean}
   */
  let checkLogin = function (that) {
    let userInfo = that.$cookies.get('user_info')
    if (userInfo === 'null' || userInfo === null) {
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
    if (loading === null) {
      that.loading = false
    } else {
      that.$nextTick(() => {
        loading.close()
      })
    }
    if (data === '') {
      that.$message.error('当前访问人数过多，请稍后再试')
    } else if (data.code === '0') {
      // that.$message({
      //   message: '登录过期，请重新登录',
      //   type: 'error',
      //   onClose: function () {
      //     that.$cookies.remove('user_info')
      //     that.$router.push({path: '/login'})
      //   }
      // })
      that.$cookies.remove('user_info')
      that.$router.push({path: '/login'})
      that.$message.error('登录过期，请重新登录')
    } else {
      let userInfo = that.$cookies.get('user_info')
      that.$cookies.set('user_info', userInfo, 3600)
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
            url: '/api/user/checkMobilRegistered',
            method: 'post',
            data: {mobile: value}
          }).then(res => {
            // console.info('后台返回的数据', res.data)
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

  /**
   * 动态设置查询页表单高度
   **/
  let setTableHeight = function (that, formId) {
    let tabPaneHeight = that.$cookies.get('tabPaneHeight')
    let height = document.getElementById(formId).offsetHeight
    that.tableHeight = tabPaneHeight - height - 70
  }

  /**
   * 一级dialogs - 动态设置查询页表单高度
   */
  let setAppendTableHeight = function (that, formId) {
    let tabPaneHeight = that.$cookies.get('tabPaneHeight')
    let height = document.getElementById(formId).offsetHeight
    that.tableHeight = tabPaneHeight - height - 189
  }

  /**
   * 商品列表 - 动态设置查询页表单高度
   */
  let setGoodsTableHeight = function (that, formId) {
    let tabPaneHeight = that.$cookies.get('tabPaneHeight')
    let height = document.getElementById(formId).offsetHeight
    that.tableHeight = tabPaneHeight - height - 109
  }

  /**
   * 查询地域信息 json
   * @param that
   */
  let selectRegionJson = function (that) {
    that.$axios({
      url: '/api/selectRegionJson',
      method: 'post'
    }).then(res => {
      // console.info('后台返回的数据', res.data)
      that.options = JSON.parse(res.data.data)
    }).catch(error => {
      console.info('错误信息', error)
      return null
    })
  }

  /**
   * 查询地域信息 list
   * @param that
   * @param id
   * @param level
   */
  let selectRegionList = function (that, id, level) {
    that.$axios({
      url: '/api/selectRegionList',
      method: 'post',
      data: {id: id}
    }).then(res => {
      // console.info('后台返回的数据', res.data)
      if (level === '1') {
        that.provList = res.data.data
      } else if (level === '2') {
        that.cityList = res.data.data
      } else {
        that.countyList = res.data.data
      }
    }).catch(error => {
      console.info('错误信息', error)
      return null
    })
  }

  export default {
    checkLogin,
    exitLoad,
    validate,
    setTableHeight,
    setAppendTableHeight,
    setGoodsTableHeight,
    selectRegionJson,
    selectRegionList
  }
</script>

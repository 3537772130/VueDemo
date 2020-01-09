<style type="text/css">
  .form {
    width: 400px;
    height: 200px;
    margin: auto;
    text-align: center;
  }

  .type-logo-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .type-logo-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .form .el-form-item__label {
    width: 100px;
  }
</style>
<template>
  <el-container>
    <el-main element-loading-text="加载中" style="background-color: #FFFFFF;" v-loading="loading">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-form :inline="true" :model="form" :rules="rules" class="demo-form-inline form" ref="form">
          <el-form-item label="最小数（米）">
            <el-input placeholder="请输入最小数" v-model="form.minimum"></el-input>
          </el-form-item>
          <el-form-item label="最大数（米）">
            <el-input placeholder="请输入最大数" v-model="form.maximum"></el-input>
          </el-form-item>
          <el-form-item label="运费（元）">
            <el-input placeholder="请输入运费" v-model="form.freight"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click="onSubmit()" style="text-align: center; width: 190px;" type="success">提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import {Loading} from 'element-ui'

  export default {
    name: 'applet-freight-deploy',
    data () {
      return {
        loading: false,
        isInitial: true,
        form: {
          id: 0,
          appletId: 0,
          minimum: 0,
          maximum: 0,
          freight: 0
        },
        myHeader: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        rules: {
          minimum: [
            {required: true, message: '最小数不能为空', trigger: 'blur'},
            {type: 'int', min: 1, max: 11, message: '请输入数字', trigger: 'blur'}
          ],
          maximum: [
            {required: true, message: '最大数不能为空', trigger: 'blur'},
            {type: 'int', min: 1, max: 15, message: '请输入数字', trigger: 'blur'}
          ],
          freight: [
            {required: true, message: '运费不能为空', trigger: 'blur'},
            {type: 'number', message: '请输入数字', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let id = this.$cookies.get('freight_deploy_id')
      this.$cookies.remove('freight_deploy_id')
      if (id) {
        this.loadFreightDeploy(id)
      }
    },
    methods: {
      loadFreightDeploy (id) {
        if (id) {
          this.form.id = id
          this.loading = true
          this.$axios({
            url: '/api/user/applet/freightDeploy/queryFreightDeployById',
            method: 'post',
            data: this.form
          }).then(res => {
            this.form = res.data.data
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      onSubmit () {
        if (!this.form.appletId) {
          this.form.appletId = this.$cookies.get('appletId')
        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let loading = Loading.service({fullscreen: true, text: '加载中'})
            this.$axios({
              url: '/api/user/applet/freightDeploy/saveFreightDeploy',
              method: 'post',
              data: this.form
            }).then(res => {
              console.info('后台返回的数据', res.data)
              let that = this
              this.$global.exitLoad(this, loading, res.data)
              res.data.code === '1' ? this.$message.success({
                message: res.data.data, duration: 1000, onClose: function () {
                  that.$emit('refreshList')
                }
              }) : this.$message.error(res.data.data)
            }).catch(error => {
              this.$global.exitLoad(this, loading, '')
              console.info('错误信息', error)
            })
          }
        })
      }
    }
  }
</script>

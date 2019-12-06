<style type="text/css">
  .goods-type-form {
    width: 400px;
    height: 290px;
    margin: auto;
    text-align: center;
  }

  .goods-type-input {
    width: 190px;
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

  .type-logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }

  .type-logo {
    width: 48px;
    height: 48px;
    display: block;
  }
</style>
<template>
  <el-container>
    <el-main element-loading-text="加载中" style="background-color: #FFFFFF;" v-loading="loading">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-form :inline="true" :model="typeForm" :rules="rules" class="demo-form-inline goods-type-form"
                 ref="typeForm">
          <el-form-item label="类型图标" prop="typeLogo">
            <div class="goods-type-input" style="display: inline-block;text-align: left;">
              <el-upload
                :before-upload="beforePicUpload"
                :headers="myHeader"
                :on-success="handleLogoSuccess"
                :show-file-list="false"
                action="/api/user/goods/uploadGoodsImage"
                class="type-logo-uploader"
                name="image">
                <img :src="typeForm.typeLogo + timestamp" class="type-logo" v-if="typeForm.typeLogo">
                <i class="el-icon-plus type-logo-uploader-icon" v-else></i>
              </el-upload>
            </div>
            <el-input class="goods-type-input" style="display: none;" v-model="typeForm.typeLogo"></el-input>
          </el-form-item>
          <el-form-item label="类型名称" prop="typeName">
            <el-input class="goods-type-input" placeholder="请输入类型名称"
                      v-model="typeForm.typeName"></el-input>
          </el-form-item>
          <el-form-item label="类型状态" prop="typeStatus">
            <el-select class="goods-type-input" v-model="typeForm.typeStatus">
              <el-option label="正常" value='1'></el-option>
              <el-option label="禁用" value='0'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click="onSubmit()" class="goods-type-input" style="text-align: center;" type="success">提交
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
        name: 'applet-info',
        data() {
            return {
                loading: false,
                typeForm: {
                    typeLogo: '',
                    typeName: '',
                    typeStatus: '1'
                },
                timestamp: '',
                myHeader: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                rules: {
                    typeName: [
                        {required: true, message: '类型名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 1, max: 15, message: '长度为1-15个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            let typeId = this.$cookies.get('goods_type_id')
            this.loadGoodsType(typeId)
        },
        mounted() {
        },
        methods: {
            loadGoodsType(typeId) {
                if (typeId && typeId != '0') {
                    this.loading = true
                    this.$axios({
                        url: '/api/user/goods/loadGoodsType',
                        method: 'post',
                        data: {id: typeId}
                    }).then(res => {
                        this.$cookies.remove('goods_type_id')
                        if (res.data.code === '1') {
                            this.typeForm = res.data.data
                            this.typeForm.typeStatus = this.typeForm.typeStatus ? '1' : '0'
                            delete this.typeForm.userId
                            delete this.typeForm.typeIndex
                        }
                        typeId = '0'
                        this.timestamp = '?' + Date.parse(new Date())
                        this.$global.exitLoad(this, null, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            },
            onSubmit() {
                this.$refs['typeForm'].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '加载中'})
                        this.$axios({
                            url: '/api/user/goods/updateGoodsType',
                            method: 'post',
                            data: this.typeForm
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            let that = this
                            res.data.code === '1' ? this.$message.success({
                                message: res.data.data, duration: 1000, onClose: function () {
                                    that.$emit('refreshList')
                                }
                            }) : this.$message.error(res.data.data)
                            this.$global.exitLoad(this, loading, res.data)
                        }).catch(error => {
                            console.info('错误信息', error)
                            this.$global.exitLoad(this, loading, '')
                        })
                    }
                })
            },
            handleLogoSuccess(res, file) {
                if (res.code === '1') {
                    this.typeForm.typeLogo = res.data
                  this.$message.success('上传成功，等待提交')
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
            },
            beforePicUpload(file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'image/png,image/jpeg'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG) {
                    this.$message.error('上传图标格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传图标大小不能超过 2MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            }
        }
    }
</script>

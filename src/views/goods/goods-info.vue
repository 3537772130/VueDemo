<style type="text/css">
  .goods-info-form {
    width: 350px;
    height: 530px;
    margin: auto;
    text-align: left;
  }

  .goods-info-input {
    width: 220px;
  }

  .cover-src-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .cover-src-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .cover-src-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 98px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }

  .cover-src {
    width: 98px;
    height: 98px;
    display: block;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-form :inline="true" :model="goods" :rules="rules" ref="goods" class="demo-form-inline goods-info-form">
          <el-form-item label="封面图片" prop="coverSrc">
            <div class="goods-info-input" style="display: inline-block;text-align: left;">
              <el-upload
                class="cover-src-uploader"
                action="/api/user/goods/uploadGoodsImage"
                name="image"
                :headers="myHeader"
                :show-file-list="false"
                :on-success="handleLogoSuccess"
                :before-upload="beforePicUpload">
                <img v-if="goods.coverSrc" :src="goods.coverSrc + timestamp" class="cover-src">
                <i v-else class="el-icon-plus cover-src-uploader-icon"></i>
              </el-upload>
            </div>
            <el-input v-model="goods.coverSrc" class="goods-info-input" style="display: none;"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsName">
            <el-input type="textarea" :show-word-limit="true" maxlength="50" resize="none" rows="3"
                      :readonly="goods.id" v-model="goods.goodsName" placeholder="请输入商品名称（提交后不可变更）"
                      class="goods-info-input"></el-input>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-select v-model="goods.typeId" class="goods-info-input">
              <el-option label="请选择" value=''></el-option>
              <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣" prop="discount">
            <el-input v-model.number="goods.discount" min="1" max="100" placeholder="请输入折扣"
                      class="goods-info-input"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="describeStr">
            <el-input type="textarea" :show-word-limit="true" maxlength="100" resize="none" rows="5"
                      class="goods-info-input" placeholder="请输入描述"
                      v-model="goods.describeStr"></el-input>
          </el-form-item>
          <el-form-item label="优惠券" prop="ifDiscount">
            <el-select v-model="goods.ifDiscount" class="goods-info-input">
              <el-option label="参与" value='1'></el-option>
              <el-option label="不参与" value='0'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="success" @click="onSubmit()" class="goods-info-input" style="text-align: center;">提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    /* eslint-disable no-trailing-spaces */

    import {Loading} from 'element-ui'

    export default {
        name: 'applet-info',
        data () {
            return {
                loading: false,
                typeList: [],
                goods: {
                    coverSrc: '',
                    goodsName: '',
                    typeId: '',
                    discount: 100,
                    describeStr: '',
                    ifDiscount: '1',
                    status: '1'
                },
                timestamp: '',
                myHeader: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                rules: {
                    coverSrc: [
                        {required: true, message: '请上传封面图片', trigger: 'blur'}
                    ],
                    goodsName: [
                        {required: true, message: '商品名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 1, max: 50, message: '商品名称长度为1-50个字符', trigger: 'blur'}
                    ],
                    typeId: [
                        {required: true, message: '请选择类型', trigger: 'blur'}
                    ],
                    discount: [
                        {required: true, message: '折扣不能为空', trigger: 'blur'},
                        {type: 'number', min: 1, max: 100, message: '折扣只能为1-100', trigger: 'blur'}
                    ],
                    describeStr: [
                        {type: 'string', min: 0, max: 100, message: '描述长度为1-100个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        created () {
            let goodsId = this.$cookies.get('goods_id')
            let typeId = this.$cookies.get('goods_type_id')
            this.loadGoodsInfo(goodsId, typeId)
        },
        mounted () {
        },
        methods: {
            loadGoodsInfo (goodsId, typeId) {
                if (goodsId) {
                    this.loading = true
                    this.$axios({
                        url: '/api/user/goods/loadGoodsInfo',
                        method: 'post',
                        data: {id: goodsId}
                    }).then(res => {
                        this.$cookies.remove('goods_id')
                        goodsId = null
                        if (res.data.code === '1') {
                            this.goods = res.data.data.goods
                            this.goods.ifDiscount = this.goods.ifDiscount ? '1' : '0'
                            this.goods.status = this.goods.status ? '1' : '0'
                            delete this.goods.userId
                            delete this.goods.updateTime
                            delete this.goods.goodsIndex
                            delete this.goods.status
                        }
                        this.typeList = res.data.data.typeList
                        this.goods.typeId = parseInt(typeId)
                        this.timestamp = '?' + Date.parse(new Date())
                        this.$global.exitLoad(this, null, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            },
            onSubmit () {
                this.$refs['goods'].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '加载中'})
                        this.$axios({
                            url: '/api/user/goods/updateGoodsInfo',
                            method: 'post',
                            data: this.goods
                        }).then(res => {
                            console.info('后台返回的数据', res.data)
                            let that = this
                            res.data.code === '1' ? this.$message.success({
                                message: res.data.data,
                                duration: 1000,
                                onClose: function () {
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
            handleLogoSuccess (res, file) {
                if (res.code === '1') {
                    this.goods.coverSrc = res.data
                    this.$message.success('上传成功，等待提交')
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
            },
            beforePicUpload (file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'image/png,image/jpeg,image/jpg'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 3
                if (!isJPG) {
                    this.$message.error('上传商品图片格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传商品图片大小不能超过 3MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            }
        }
    }
</script>

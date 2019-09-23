<style type="text/css">
  .goods-specs-form {
    width: 480px;
    height: 620px;
    margin: auto;
    text-align: center;
  }

  .goods-specs-input {
    width: 290px;
  }

  .specs-src-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .specs-src-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .specs-src-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .specs-src {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>
<template>
  <el-container>
    <el-main element-loading-text="加载中" style="background-color: #FFFFFF;" v-loading="loading">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <el-form :inline="true" :model="specsForm" :rules="rules" class="demo-form-inline goods-specs-form"
                 ref="specsForm">
          <el-form-item label="规格图标" prop="typeLogo">
            <div class="goods-specs-input" style="display: inline-block;text-align: left;">
              <el-upload
                :before-upload="beforePicUpload"
                :headers="myHeader"
                :on-success="handleSpecsSrcSuccess"
                :show-file-list="false"
                action="/api/user/goods/uploadGoodsImage"
                class="specs-src-uploader"
                name="image">
                <img :src="specsForm.specsSrc + timestamp" class="specs-src" v-if="specsForm.specsSrc">
                <i class="el-icon-plus specs-src-uploader-icon" v-else></i>
              </el-upload>
            </div>
            <el-input class="goods-specs-input" style="display: none;" v-model="specsForm.specsSrc"></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="specsText">
            <el-input class="goods-specs-input" placeholder="请输入商品规格"
                      v-model="specsForm.specsText"></el-input>
          </el-form-item>
          <el-form-item label="出售价格" prop="sellPrice" v-if="showSellPrice">
            <MumberInput ref="MumberInput" class="goods-specs-input" placeholder="请输入出售价格"
                         v-model="sellPrice" :precision="2"
                         @input="computePrice()" @blur="blurPrice()"></MumberInput>
            <el-input v-model.number="specsForm.sellPrice" style="display: none;"></el-input>
          </el-form-item>
          <el-form-item label="商品折扣" prop="discount">
            <el-input class="goods-specs-input" placeholder="请输入商品折扣"
                      v-model.number="specsForm.discount" @input="computePrice()"></el-input>
          </el-form-item>
          <el-form-item label="折扣描述" prop="discountDescribe">
            <el-input type="textarea" :show-word-limit="true" maxlength="220" resize="none" rows="5"
                      class="goods-specs-input" placeholder="请输入折扣描述"
                      v-model="specsForm.discountDescribe"></el-input>
          </el-form-item>
          <el-form-item label="实际价格" prop="actualPrice">
<!--            <MumberInput class="goods-specs-input" placeholder="请输入实际价格"-->
<!--                         v-model="specsForm.actualPrice" :precision="2"></MumberInput>-->
            <div class="goods-specs-input" style="text-align: left;">
              <span style="width: 80px;display: inline-block;text-align: center; border-bottom: 1px #cdcdcd solid;">{{specsForm.actualPrice|addZero}}</span>
              <span style="color: #cdcdcd;"> = (出售价格&times;商品折扣&divide;100)</span>
            </div>
          </el-form-item>
          <el-form-item label="规格状态" prop="specsStatus">
            <el-select class="goods-specs-input" v-model="specsForm.specsStatus">
              <el-option label="正常" value='1'></el-option>
              <el-option label="禁用" value='0'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click="onSubmit()" class="goods-specs-input" style="text-align: center;" type="success">提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'
    import MumberInput from '@/components/plugin/numberInput.vue'

    export default {
        name: 'goods-specs',
        components: {
            'MumberInput': MumberInput
        },
        data() {
            return {
                loading: false,
                showSellPrice: false,
              sellPrice: 0,
                specsForm: {
                    specsSrc: '',
                    specsText: '',
                    sellPrice: 0,
                    actualPrice: 0,
                    discount: 100,
                    discountDescribe: '',
                    specsStatus: '1'
                },
                timestamp: '',
                myHeader: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                rules: {
                    specsText: [
                        {type: 'string', min: 0, max: 50, message: '商品规格长度为0-50个字符', trigger: 'blur'}
                    ],
                    sellPrice: [
                        {required: true, message: '出售价格不能为空', trigger: 'blur'},
                        {type: 'number', min: 0, max: 99999.99, message: '出售价格为0.00-99999.99', trigger: 'blur'}
                    ],
                    discount: [
                        {required: true, message: '商品折扣不能为空', trigger: 'blur'},
                        {type: 'number', min: 1, max: 100, message: '商品折扣为1-100', trigger: 'blur'}
                    ],
                    discountDescribe: [
                        {type: 'string', min: 0, max: 220, message: '出售价格为0-220个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            let specsId = this.$cookies.get('specs_id')
            let goodsId = this.$cookies.get('goods_id')
            this.loadGoodsSpecs(specsId, goodsId)
        },
        mounted() {

        },
        methods: {
            loadGoodsSpecs(specsId, goodsId) {
                if (specsId) {
                    this.loading = true
                    this.specsForm.goodsId = goodsId
                    this.$axios({
                        url: '/api/user/goods/loadGoodsSpecs',
                        method: 'post',
                        data: {specsId: specsId, goodsId: goodsId}
                    }).then(res => {
                        if (res.data.code === '1') {
                            this.specsForm = res.data.data
                          this.sellPrice = this.specsForm.sellPrice
                            this.specsForm.specsStatus = this.specsForm.specsStatus ? '1' : '0'
                            delete this.specsForm.userId
                            delete this.specsForm.typeIndex
                        }
                        this.$cookies.remove('specs_id')
                        this.$cookies.remove('goods_id')
                        specsId = null
                        this.timestamp = '?' + Date.parse(new Date())
                        this.$global.exitLoad(this, null, res.data)
                        this.showSellPrice = true
                        this.$cookies.set("goods_price", this.specsForm.sellPrice)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            },
            onSubmit() {
                this.$refs['specsForm'].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '加载中'})
                        this.$axios({
                            url: '/api/user/goods/updateGoodsSpecs',
                            method: 'post',
                            data: this.specsForm
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
            handleSpecsSrcSuccess(res, file) {
                if (res.code === '1') {
                    this.specsForm.specsSrc = res.data
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
                const isLt2M = file.size / 1024 / 1024 < 3
                if (!isJPG) {
                    this.$message.error('上传头像图片格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 3MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            },
            computePrice() {
              this.specsForm.sellPrice = this.sellPrice
              this.specsForm.actualPrice = this.specsForm.sellPrice * this.specsForm.discount / 100
              this.$refs.MumberInput.init(this.specsForm.sellPrice);
            },
            blurPrice() {
                this.specsForm.sellPrice = this.specsForm.sellPrice > 99999.99 ? 99999.99 : this.specsForm.sellPrice
              this.$refs.MumberInput.init(this.specsForm.sellPrice);
            }
        }
    }
</script>

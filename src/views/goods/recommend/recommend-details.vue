<style type="text/css">
  .recommend-image-div {
    float: right;
    width: 220px;
    position: relative;
    right: 40px;
  }

  .recommend-image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .recommend-image-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .recommend-image-uploader .recommend-image {
    width: 220px;
    height: 340px;
    display: block;
  }

  .recommend-image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 220px;
    height: 340px;
    line-height: 340px;
    text-align: center;
  }

  .recommend-image-tips {
    height: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #cdcdcd;
    text-align: center;
  }

  .recommend-goods-form {
    width: 400px;
    text-align: left;
  }

  .recommend-goods-input {
    width: 220px;
  }

  .recommend-goods {
    width: 88px;
    height: 88px;
    border: 1px #cdcdcd dashed;
    border-radius: 5px;
    display: inline-table;
  }

  .recommend-goods > .recommend-image {
    width: 88px;
    height: 88px;
    display: block;
  }

  .recommend-goods-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
  }

  .choose-goods {
    position: relative;
  }

  .part-choose-dialog .el-dialog {
    width: 680px;
  }

  .part-choose-dialog .el-dialog > .el-dialog__body {
    padding: 0px 0px;
  }
</style>
<template>
  <el-container>
    <el-main element-loading-text="加载中" style="background-color: #FFFFFF;" v-loading="loading">
      <div style="width: 100%;float: left;clear: left;margin: auto;">
        <div class="recommend-image-div">
          <el-upload
            :before-upload="beforePicUpload"
            :headers="myHeader"
            :on-success="handleLogoSuccess"
            :show-file-list="false"
            action="/api/user/goods/uploadGoodsImage"
            class="recommend-image-uploader"
            name="image">
            <img :src="info.recommendImg" class="recommend-image" v-if="info.recommendImg">
            <i class="el-icon-plus recommend-image-uploader-icon" v-else></i>
          </el-upload>
          <div class="recommend-image-tips">上传推荐图片</div>
        </div>
        <el-form :inline="true" :model="info" :rules="rules" class="demo-form-inline recommend-goods-form"
                 ref="info">
          <el-form-item label="小程序" prop="appletId">
            <el-select v-model="info.appletId" class="recommend-goods-input" @change="changeApplet">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定商品" prop="infoImg">
            <div class="recommend-goods">
              <img :src="coverSrc" class="recommend-image" v-if="coverSrc">
              <i class="el-icon-plus recommend-goods-icon" v-else></i>
            </div>
            <el-button plain class="choose-goods" :style="'top: ' +  (coverSrc ? '-10':'20') + 'px;'" @click="chooseGoods">选择商品</el-button>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsId">
            <el-input class="recommend-goods-input" placeholder="请选择绑定商品" v-model="goodsName" readonly></el-input>
          </el-form-item>
          <el-form-item label="开始日期" prop="startTime">
            <el-date-picker v-model="info.startTime" placeholder="请选择日期" :format="format"
                            :value-format="valueFormat" :picker-options="pickerOptionsStart"
                            class="recommend-goods-input">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期" prop="expireTime">
            <el-date-picker v-model="info.expireTime" placeholder="请选择日期" :format="format"
                            :value-format="valueFormat" :picker-options="pickerOptionsStart"
                            class="recommend-goods-input">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型状态" prop="recommendStatus">
            <el-select class="recommend-goods-input" v-model="info.recommendStatus">
              <el-option label="正常" value='1'></el-option>
              <el-option label="禁用" value='0'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" ">
            <el-button @click="onSubmit()" class="recommend-goods-input" style="text-align: center;" type="success">提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
    <el-dialog :title="listTitle" :visible.sync="listShow" append-to-body class="part-choose-dialog"
               :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
      <StoreChoose ref="StoreChoose" v-on:refreshSet="refreshSet"></StoreChoose>
    </el-dialog>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'
    import StoreChoose from '@/views/applet/page/store/store-choose.vue'

    export default {
        name: 'recommend-details',
        components: {
            'StoreChoose': StoreChoose
        },
        data () {
            return {
                loading: false,
                info: {
                    id: '',
                    appletId: '',
                    goodsId: '',
                    infoImg: '',
                    startTime: '',
                    expireTime: '',
                    recommendStatus: '1'
                },
                appletList: [],
                goodsName: '',
                coverSrc: '',
                listTitle: '选择商品',
                listShow: false,
                format: 'yyyy年MM月dd日',
                valueFormat: 'yyyy/MM/dd',
                pickerOptionsStart: {
                    disabledDate (time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
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
        created () {
            let id = this.$cookies.get('applet_recommend_goods_id')
            this.loadRecommendDetails(id)
            this.loadInfo()
        },
        mounted () {
        },
        methods: {
            loadRecommendDetails (id) {
                if (id && id !== '0') {
                    let loading = Loading.service({fullscreen: true, text: '加载中'})
                    this.$axios({
                        url: '/api/user/goods/loadUserAppletRecommendGoodsDetails',
                        method: 'post',
                        data: {id: id}
                    }).then(res => {
                        this.$cookies.remove('applet_info_goods_id')
                        if (res.data.code === '1') {
                            let data = res.data.data
                            this.info = data.info
                            this.info.recommendStatus = this.info.recommendStatus ? '1' : '0'
                            this.goodsName = data.goods.goodsName
                            this.coverSrc = data.goods.coverSrc
                            delete this.info.updateTime
                            delete this.info.userId
                        }
                        this.$global.exitLoad(this, loading, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, loading, '')
                    })
                }
            },
            loadInfo () {
                this.$axios({
                    url: '/api/user/applet/queryAppletToMap',
                    method: 'post'
                }).then(res => {
                    if (res.data.code === '1') {
                        this.appletList = res.data.data
                    }
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            onSubmit () {
                this.$refs['info'].validate((valid) => {
                    if (valid) {
                        let loading = Loading.service({fullscreen: true, text: '加载中'})
                        this.$axios({
                            url: '/api/user/goods/updateUserAppletRecommendGoods',
                            method: 'post',
                            data: this.info
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
                    this.info.recommendImg = res.data
                    this.$message.success('上传成功，等待提交')
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
            },
            beforePicUpload (file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'image/png,image/jpeg'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 3
                if (!isJPG) {
                    this.$message.error('上传图标格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传图标大小不能超过 3MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            },
            changeApplet: function () {
                this.info.goodsId = ''
                this.goodsName = ''
                this.coverSrc = ''
            },
            chooseGoods: function () {
                if (this.info.appletId !== '') {
                    this.listShow = true
                    this.$cookies.set('default_applet_id', this.info.appletId)
                    this.$cookies.set('bType', 1)
                    this.$refs.StoreChoose.loadList(1)
                } else {
                    this.$message.error('请选择小程序')
                }
            },
            refreshSet: function (id, name, icon, minPrice, maxPrice, discount, type) {
                this.info.goodsId = id
                this.goodsName = name
                this.coverSrc = icon
                this.listShow = false
            }
        }
    }
</script>

<style type="text/css">
  .spread-content {
    height: 610px;
    text-align: left;
  }

  .spread-list-div {
    display: inline-table;
    width: 200px;
    margin: 10px;
    border-radius: 10px 10px 0px 0px;
    border-top: 1px #cdcdcd solid;
    border-left: 1px #cdcdcd solid;
    box-shadow: 3px 3px 6px #cdcdcd;
  }

  .spread-list-div:hover {
    border-top: 1px #3a8ee6 solid;
    border-left: 1px #3a8ee6 solid;
    box-shadow: 3px 3px 6px #3a8ee6;
  }

  .spread-list-div .spread-list-image {
    width: 200px;
    height: 318px;
    border-bottom: 1px #cdcdcd solid;
    border-radius: 10px 10px 0px 0px;
  }

  .spread-list-div .but {
    display: inline-table;
    width: 48%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    letter-spacing: 3px;
    text-align: center;
  }

  .spread-list-div .but:hover {
    cursor: pointer;
    font-size: 14px;
    color: #3a8ee6;
  }

  .spread-left {
    float: left;
    width: 360px;
    height: 600px;
    border-right: 1px #cdcdcd solid;
  }

  .spread-left .spread-image-div {
    width: 200px;
    height: 318px;
    margin-top: 32px;
    margin-bottom: 10px;
    display: inline-table;
    border-radius: 5px;
    border: 1px #e6e6e6 dashed;
  }

  .spread-left .code-image {
    width: 250px;
    height: 300px;
  }

  .spread-left .spread-image-div .spread-preview-image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .spread-left .spread-image-div .spread-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 318px;
    line-height: 318px;
    text-align: center;
  }

  .spread-left .code-image-icon {
    width: 250px;
    height: 300px;
    line-height: 300px;
  }

  .spread-left .spread-image-form {
    width: 100%;
    text-align: center;
  }

  .spread-left .spread-image-form .el-form-item--small .el-form-item__label {
    width: 100px;
    font-size: 12px;
  }

  .spread-left .spread-image-form .spread-image-input {
    width: 50px;
  }

  .spread-left .spread-image-form .remark {
    font-size: 8px;
    color: #d81e06;
    text-align: left;
    padding-left: 45px;
    margin-bottom: 10px;
  }

  .spread-left .spread-image-form .code-position {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }

  .spread-left .spread-image-form .code-position .position {
    width: 40px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #cdcdcd;
    display: inline-table;
    margin-right: 10px;
    padding: 0px 10px;
    border-radius: 5px;
    border: 1px #cdcdcd solid;
  }

  .spread-left .spread-image-form .code-position .position:hover {
    cursor: pointer;
    color: #3a8ee6;
    border: 1px #3a8ee6 solid;
  }

  .spread-right {
    float: right;
    width: 550px;
    height: 580px;
    overflow-y: scroll;
  }

  .spread-right .spread-image-div {
    display: inline-block;
    width: 200px;
    border: 1px #e6e6e6 solid;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
  }

  .spread-right .spread-image-div .select {
    border-top: 1px #3a8ee6 solid;
    border-left: 1px #3a8ee6 solid;
    box-shadow: 3px 3px 6px #3a8ee6;
  }

  .spread-right .separate {
    height: 10px;
  }
</style>
<template>
  <div style="height: 650px;">
    <el-tabs type="border-card" v-model="spreadTabsValue" @tab-click="tabsClick">
      <el-tab-pane label="推广列表" name="list">
        <div class="spread-content">
          <div class="spread-list-div" v-for="(item, index) in list" :key="index">
            <el-image class="spread-list-image" :src="item.spreadImage + timestamp"></el-image>
            <div class="but" @click="delSpreadImage(item.id)">
              <i class="el-icon-delete"></i>删除
            </div>
            <div class="but" style="border-left: 1px #cdcdcd solid;" @click="downSpreadImage(item.id)">
              <i class="el-icon-download"></i>下载
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图片制作" name="make">
        <div class="spread-content">
          <div class="spread-left" style="text-align: center;">
            <div :class="'spread-image-div ' + (materielType === 3 ? 'code-image':'')">
              <img v-if="previewPath" :src="previewPath" class="spread-preview-image">
              <i v-else
                 :class="'el-icon-picture-outline spread-uploader-icon ' + (materielType === 3 ? 'code-image-icon':'')"></i>
            </div>
            <el-form :inline="true" :model="image" :rules="imageRules" ref="image" class="spread-image-form"
                     v-if="isPosition">
              <div class="remark">
                <div>注意：</div>
                <div>二维码宽度 + 水平开始位置 &le; 100</div>
                <div>二维码高度 + 垂直开始位置 &le; 100</div>
              </div>
              <div class="code-position">
                <div class="position" @click="setDefPosition(25, 0, 20, 0)">左上角</div>
                <div class="position" @click="setDefPosition(25, 75, 20, 0)">右上角</div>
                <div class="position" @click="setDefPosition(25, 0, 20, 80)">左下角</div>
                <div class="position" @click="setDefPosition(25, 75, 20, 80)">右下角</div>
              </div>
              <el-form-item label="二维码宽度" prop="sizeX">
                <el-input maxlength="2" v-model.number="image.sizeX" class="spread-image-input" @input="handleClick"
                          @change="changePosition"></el-input>
              </el-form-item>
              <el-form-item label="水平开始位置" prop="startX">
                <el-input maxlength="2" v-model.number="image.startX" class="spread-image-input" @input="handleClick"
                          @change="changePosition"></el-input>
              </el-form-item>
              <el-form-item label="二维码高度" prop="sizeY">
                <el-input maxlength="2" v-model.number="image.sizeY" class="spread-image-input" @input="handleClick"
                          @change="changePosition"></el-input>
              </el-form-item>
              <el-form-item label="垂直开始位置" prop="startY">
                <el-input maxlength="2" v-model.number="image.startY" class="spread-image-input" @input="handleClick"
                          @change="changePosition"></el-input>
              </el-form-item>
            </el-form>
            <div>
              <el-button type="success" plain style="width: 200px;" @click="subImage" v-if="isSub">保存图片</el-button>
              <el-button :type="isCreate ? 'primary':'info'" plain style="width: 200px;" @click="createImage" v-else>
                生成图片
              </el-button>
            </div>
          </div>
          <div class="spread-right">
            <el-divider content-position="left">
              <span>商品图片</span>
            </el-divider>
            <div class="spread-image-div" style="width: 160px;" v-for="(file, fileIndex) in fileList" :key="fileIndex"
                 v-if="file.fileSrc">
              <img :class="fIndex === fileIndex ? 'select':''" :src="file.fileSrc + timestamp"
                   style="width: 160px;height: 160px;" @click="chooseGoodsFile(fileIndex)">
            </div>
            <el-divider content-position="left">
              <span>物料列表</span>
            </el-divider>
            <div class="spread-image-div" v-for="(materiel, materielIndex) in materielList" :key="materielIndex"
                 v-if="1 === materiel.materielType">
              <el-image :class="mIndex === materielIndex ? 'select':''" :src="materiel.materielImage + timestamp"
                        style="width: 200px;height: 74px;margin-bottom: 0px;"
                        @click="chooseMateriel(materielIndex, 1)"></el-image>
            </div>
            <div class="separate"></div>
            <div class="spread-image-div" v-for="(materiel, materielIndex) in materielList" :key="materielIndex"
                 v-if="2 === materiel.materielType">
              <img :class="mIndex === materielIndex ? 'select':''" :src="materiel.materielImage + timestamp"
                   style="width: 200px;height: 32px;margin-bottom: 0px;" @click="chooseMateriel(materielIndex, 2)">
            </div>
            <div class="separate"></div>
            <div class="spread-image-div" style="width: 120px;" v-for="(materiel, materielIndex) in materielList"
                 :key="materielIndex" v-if="3 === materiel.materielType">
              <img :class="mIndex === materielIndex ? 'select':''" :src="materiel.materielImage + timestamp"
                   style="width: 120px;height: 120px;margin-bottom: 0px;" @click="chooseMateriel(materielIndex, 3)">
            </div>
            <div v-if="materielList">请前往【小程序管理 - 小程序管理列表】上传物料</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/javascript">
    /* eslint-disable no-dupe-keys */

    import {Loading} from 'element-ui'

    export default {
        name: 'spread-list',
        data () {
            return {
                spreadTabsValue: 'list',
                goodsId: '',
                list: [],
                materielList: [],
                fileList: [],
                image: {
                    goodsFileId: '',
                    materielId: '',
                    startX: '',
                    startY: '',
                    sizeX: '',
                    sizeY: ''
                },
                mIndex: '',
                fIndex: '',
                materielType: '',
                isPosition: false,
                isCreate: false,
                isSub: false,
                previewPath: '',
                timestamp: '',
                imageRules: {
                    // startX: [
                    //     {required: true, message: '', trigger: 'blur'},
                    //     {type: 'number', min: 0, max: 99, message: '', trigger: 'blur'}
                    // ],
                    // startY: [
                    //     {required: true, message: '', trigger: 'blur'},
                    //     {type: 'number', min: 0, max: 99, message: '', trigger: 'blur'}
                    // ],
                    // sizeX: [
                    //     {required: true, message: '', trigger: 'blur'},
                    //     {type: 'number', min: 1, max: 99, message: '', trigger: 'blur'}
                    // ],
                    // sizeY: [
                    //     {required: true, message: '', trigger: 'blur'},
                    //     {type: 'number', min: 1, max: 99, message: '', trigger: 'blur'}
                    // ]
                }
            }
        },
        created () {
            let goodsId = this.$cookies.get('goods_id')
            this.loadSpreadList(goodsId)
        },
        mounted () {
        },
        methods: {
            tabsClick: function (key) {
                console.info(key.name)
                switch (key.name) {
                    case 'list':
                        this.loadSpreadList(this.goodsId)
                        break
                    case 'make':
                        this.loadMake()
                        break
                    default:
                        break
                }
            },
            loadSpreadList (id) {
                if (id && id !== '') {
                    let loading = Loading.service({fullscreen: true, text: '加载中'})
                    this.goodsId = id
                    this.$cookies.remove('goods_id')
                    this.$axios({
                        url: '/api/user/spread/loadGoodsSpreadImageList',
                        method: 'post',
                        data: {goodsId: id}
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        if (res.data.code === '1') {
                            this.list = res.data.data
                        } else if (res.data.code === '-1') {
                            this.$message.error(res.data.data)
                        }
                        this.timestamp = '?' + Date.parse(new Date())
                        this.$global.exitLoad(this, loading, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, loading, '')
                    })
                }
            },
            delSpreadImage (id) {
                this.$confirm('确定删除吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loading = Loading.service({fullscreen: true, text: '正在删除'})
                    this.$axios({
                        url: '/api/user/spread/delGoodsSpreadImage',
                        method: 'post',
                        data: {goodsId: this.goodsId, imageId: id}
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        if (res.data.code === '1') {
                            let that = this
                            this.$message.success({
                                message: res.data.data,
                                duration: 1000,
                                onClose: function () {
                                    that.loadSpreadList(that.goodsId)
                                }
                            })
                        } else {
                            this.$message.error(res.data.data)
                        }
                        this.$global.exitLoad(this, loading, res.data)
                    })
                })
            },
            downSpreadImage (id) {
                window.location.href = '/api/user/downloadGoodsSpreadImage?id=' + id
            },
            loadMake: function () {
                let loading = Loading.service({fullscreen: true, text: '加载中'})
                this.$axios({
                    url: '/api/user/spread/loadMakeGoodsSpreadImage',
                    method: 'post',
                    data: {goodsId: this.goodsId}
                }).then(res => {
                    console.info('后台返回的数据', res.data)
                    if (res.data.code === '1') {
                        let data = res.data.data
                        this.materielList = data.materielList
                        this.fileList = data.goodsFileList
                    } else if (res.data.code === '-1') {
                        this.$message.error(res.data.data)
                    }
                    this.timestamp = '?' + Date.parse(new Date())
                    this.$global.exitLoad(this, loading, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, loading, '')
                })
            },
            chooseMateriel: function (index, materielType) {
                if (this.mIndex === index) {
                    this.mIndex = ''
                    this.materielType = ''
                    this.isPosition = false
                } else {
                    this.mIndex = index
                    this.image.materielId = this.materielList[this.mIndex].id
                    this.materielType = materielType
                    if (materielType === 3) {
                        this.isPosition = true
                    }
                }
                this.clickImage()
            },
            chooseGoodsFile: function (index) {
                if (this.fIndex === index) {
                    this.fIndex = ''
                } else {
                    this.fIndex = index
                    this.image.goodsFileId = this.fileList[this.fIndex].id
                }
                this.clickImage()
            },
            clickImage: function () {
                if (this.mIndex !== '' && this.fIndex !== '' && this.materielType !== '') {
                    this.isCreate = true
                } else {
                    this.isCreate = false
                }
                this.isSub = false
                this.previewPath = ''
            },
            createImage: function () {
                if (this.isCreate) {
                    let goodsFileId = this.fileList[this.fIndex].id
                    let materielId = this.materielList[this.mIndex].id
                    let previewPath = '/api/user/previewGoodsSpreadImage?goodsFileId=' + goodsFileId + '&materielId=' + materielId
                    if (this.materielType === 3) {
                        if (this.image.sizeX === '' || this.image.startX === '' || this.image.sizeY === '' || this.image.startY === '') {
                            this.$message.error('二维码尺寸或位置信息缺失')
                            return
                        }
                        if (this.image.sizeX + this.image.startX > 100) {
                            this.$message.error('二维码宽度 + 水平开始位置 ≤ 100')
                            return
                        }
                        if (this.image.sizeY + this.image.startY > 100) {
                            this.$message.error('二维码高度 + 垂直开始位置 ≤ 100')
                            return
                        }
                        previewPath += '&sizeX=' + this.image.sizeX + '&sizeY=' + this.image.sizeY + '&startX=' + this.image.startX + '&startY=' + this.image.startY
                    }
                    this.previewPath = previewPath + '&token=' + Date.parse(new Date())
                    this.isSub = true
                } else {
                    this.$message.error('请选择商品图片和物料')
                }
            },
            setDefPosition: function (sizeX, startX, sizeY, startY) {
                this.image.sizeX = sizeX
                this.image.startX = startX
                this.image.sizeY = sizeY
                this.image.startY = startY
                this.createImage()
            },
            handleClick () {
                try {
                    this.image.startX = this.image.startX.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.image.startY = this.image.startY.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.image.sizeX = this.image.sizeX.replace(/[^\d]/g, '')
                } catch (e) {
                }
                try {
                    this.image.sizeY = this.image.sizeY.replace(/[^\d]/g, '')
                } catch (e) {
                }
            },
            changePosition: function () {
                this.createImage()
            },
            subImage: function () {
                let loading = Loading.service({fullscreen: true, text: '正在提交'})
                let goodsFileId = this.fileList[this.fIndex].id
                let materielId = this.materielList[this.mIndex].id
                let data = {
                    goodsFileId: goodsFileId,
                    materielId: materielId
                }
                if (this.materielType === 3) {
                    data = {
                        goodsFileId: goodsFileId,
                        materielId: materielId,
                        sizeX: this.image.sizeX,
                        sizeY: this.image.sizeY,
                        startX: this.image.startX,
                        startY: this.image.startY
                    }
                }
                this.$axios({
                    url: '/api/user/spread/makeGoodsSpreadImage',
                    method: 'post',
                    data: data
                }).then(res => {
                    console.info('后台返回的数据', res.data)
                    if (res.data.code === '1') {
                        this.$message.success(res.data.data)
                        this.image = {
                            goodsFileId: '',
                            materielId: '',
                            startX: '',
                            startY: '',
                            sizeX: '',
                            sizeY: ''
                        }
                        this.mIndex = ''
                        this.fIndex = ''
                        this.materielType = ''
                        this.isPosition = false
                        this.isCreate = false
                        this.isSub = false
                        this.previewPath = ''
                        this.spreadTabsValue = 'list'
                        this.loadSpreadList(this.goodsId)
                    } else if (res.data.code === '-1') {
                        this.$message.error(res.data.data)
                    }
                    this.$global.exitLoad(this, loading, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, loading, '')
                })
            }
        }
    }
</script>

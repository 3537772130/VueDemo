<style type="text/css">
  .materiel-tips {
    font-size: 14px;
    color: #cdcdcd;
    text-align: left;
    text-indent: 20px;
  }

  .materiel-list {
    width: 100%;
    height: 250px;
    overflow-y: scroll;
    text-align: left;
  }

  .materiel-list > .materiel {
    width: 100%;
  }

  .materiel-uploader {
    display: inline;
  }

  .materiel-image-div {
    display: inline-block;
    width: 200px;
    border: 1px #e6e6e6 solid;
    margin-right: 20px;
  }

  .materiel-image-div img{
    border-bottom: 1px #cdcdcd solid;
  }

  .materiel-image-div > .delete {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    letter-spacing: 5px;
  }

  .materiel-image-div > .delete:hover {
    cursor: pointer;
    color: #3a8ee6;
    font-size: 14px;
    /*transition: all 1s;*/
    /*transform: scale(1.1);*/
  }
</style>
<template>
  <div>
    <div class="materiel-tips">物料图片材料，用于合成商品的推广图片，在商品图片上合成小程序的二维码、搜索提示等。(
      <el-link type="primary" style="text-indent: 0px;" @click="getMateriel">如何获取小程序码及线下物料？</el-link>
      )
    </div>
    <div style="">
      <div class="materiel-list" v-for="(value, key) in typeList" :key="key">
        <div class="materiel" v-if="key === '1'">
          <el-divider content-position="left">
            <el-upload
              class="materiel-uploader"
              action="/api/user/spread/uploadAppletMaterielImage"
              name="materielImage"
              :headers="myHeader"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :before-upload="beforePicUpload"
              :data="{'appletId': + appletId,'materielType': + key}">
              <el-button type="success">上传物料</el-button>
            </el-upload>
            <span>{{value}}</span>
          </el-divider>
          <div class="materiel-image-div" v-for="(materiel, materielIndex) in materielList" :key="materielIndex"
               v-if="key === materiel.materielType.toString()">
            <img :src="materiel.materielImage + timestamp" style="width: 200px;height: 74px;">
            <div class="delete" @click="delMateriel(materiel.id)">
              <i class="el-icon-delete"></i>删除
            </div>
          </div>
        </div>
        <div class="materiel" v-if="key === '2'">
          <el-divider content-position="left">
            <el-upload
              class="materiel-uploader"
              action="/api/user/spread/uploadAppletMaterielImage"
              name="materielImage"
              :headers="myHeader"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :before-upload="beforePicUpload"
              :data="{'appletId': + appletId,'materielType': + key}">
              <el-button type="success">上传物料</el-button>
            </el-upload>
            <span>{{value}}</span>
          </el-divider>
          <div class="materiel-image-div" v-for="(materiel, materielIndex) in materielList" :key="materielIndex"
               v-if="key === materiel.materielType.toString()">
            <img :src="materiel.materielImage + timestamp" style="width: 200px;height: 32px;">
            <div class="delete" @click="delMateriel(materiel.id)">
              <i class="el-icon-delete"></i>删除
            </div>
          </div>
        </div>
        <div class="materiel" v-if="key === '3'">
          <el-divider content-position="left">
            <el-upload
              class="materiel-uploader"
              action="/api/user/spread/uploadAppletMaterielImage"
              name="materielImage"
              :headers="myHeader"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :before-upload="beforePicUpload"
              :data="{'appletId': + appletId,'materielType': + key}">
              <el-button type="success">上传物料</el-button>
            </el-upload>
            <span>{{value}}</span>
          </el-divider>
          <div class="materiel-image-div" style="width: 120px;" v-for="(materiel, materielIndex) in materielList" :key="materielIndex"
               v-if="key === materiel.materielType.toString()">
            <img :src="materiel.materielImage + timestamp" style="width: 120px;height: 120px;">
            <div class="delete" @click="delMateriel(materiel.id)">
              <i class="el-icon-delete"></i>删除
            </div>
          </div>
        </div>
      </div>
      <div style="display: none;">
        <el-upload
          action="/api/user/spread/uploadAppletMaterielImage"
          name="materielImage"
          :headers="myHeader"
          :show-file-list="false"
          :on-success="handleLogoSuccess"
          :before-upload="beforePicUpload">
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
    /* eslint-disable no-trailing-spaces */

    import {Loading} from 'element-ui'

    export default {
        name: 'applet-materiel',
        data () {
            return {
                appletId: '',
                typeList: [],
                materielList: [],
                activeNames: ['1'],
                timestamp: '',
                myHeader: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        },
        created () {
            let appletId = this.$cookies.get('applet_id')
            this.loadMaterielPage(appletId)
        },
        mounted () {
        },
        methods: {
            loadMaterielPage (id) {
                if (id && id !== '') {
                    let loading = Loading.service({fullscreen: true, text: '加载中'})
                    this.appletId = id
                    this.$axios({
                        url: '/api/user/spread/loadAppletMaterielImageList',
                        method: 'post',
                        data: {appletId: id}
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        this.$cookies.remove('applet_id')
                        if (res.data.code === '1') {
                            let data = res.data.data
                            this.materielList = data.materielList
                            this.typeList = data.typeList
                            this.timestamp = '?' + Date.parse(new Date())
                        } else if (res.data.code === '-1') {
                            this.$message.error(res.data.data)
                        }
                        this.$global.exitLoad(this, loading, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, loading, '')
                    })
                }
            },
            handleChange (val) {
                console.log(val)
            },
            handleLogoSuccess (res, file) {
                if (res.code === '1') {
                    let that = this
                    this.$message.success({
                        message: res.data,
                        duration: 1000,
                        onClose: function () {
                            that.loadMaterielPage(that.appletId)
                        }
                    })
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
                    this.$message.error('上传图片格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 3MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            },
            getMateriel () {
                window.open('https://jingyan.baidu.com/article/e75057f23e7e32ebc81a8965.html', '_blank')
            },
            delMateriel (id) {
                this.$confirm('确定删除吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loading = Loading.service({fullscreen: true, text: '正在删除'})
                    this.$axios({
                        url: '/api/user/spread/delAppletMaterielImage',
                        method: 'post',
                        data: {materielId: id}
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        if (res.data.code === '1') {
                            let that = this
                            this.$message.success({
                                message: res.data.data,
                                duration: 1000,
                                onClose: function () {
                                    that.loadMaterielPage(that.appletId)
                                }
                            })
                        } else {
                            this.$message.error(res.data.data)
                        }
                        this.$global.exitLoad(this, loading, res.data)
                    })
                })
            }
        }
    }
</script>

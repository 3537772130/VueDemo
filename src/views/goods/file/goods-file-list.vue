<style type="text/css">
  .goods-file-div {
    width: 100%;
  }

  .goods-file-div {
    margin-bottom: 30px;
  }

  .goods-file-div > div {
    text-align: left;
  }

  .goods-file-div .el-divider--horizontal {
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .goods-file-img {
    width: 128px;
    height: 203px;
    display: inline-block;
    margin: 5px;
    text-align: center;
  }

  .goods-file-video {
    width: 138px;
    height: 260px;
    display: inline-block;
    margin: 5px;
    text-align: center;
  }

  .goods-file-video .video-js {
    height: 100%;
  }

  .goods-img-file-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .goods-img--file-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .goods-img-file-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 203px;
    line-height: 203px;
    text-align: center;
  }

  .goods-video-file-uploader {
    width: 128px;
    height: 203px;
    margin-bottom: 5px;
  }

  .goods-video-file-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .goods-video--file-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .goods-video-file-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 203px;
    line-height: 203px;
    text-align: center;
  }

  .file-src {
    width: 128px;
    height: 203px;
    display: block;
  }

  .goods-img-file-delete {
    width: 128px;
    display: inline-table;
  }

  .goods-video-file-delete {
    width: 55px;
    display: inline-table;
    margin-right: 5px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div class="goods-file-div">
        <el-divider content-position="left"><span>商品图片</span></el-divider>
        <div>
          <div v-for="(item, index) in fileList" :key="index" v-if="item.fileType === 1" class="goods-file-img">
            <el-upload class="goods-img-file-uploader"
                       :action="'/api/user/goods/uploadGoodsFileImg?fileId=' + item.id + '&goodsId=' + item.goodsId"
                       name="goodsFile" :headers="myHeader" :show-file-list="false"
                       :on-success="handleFileSuccess" :before-upload="beforeImageUpload">
              <img v-if="item.fileStatus" :src="item.fileSrc + timestamp" class="file-src">
              <i v-else class="el-icon-plus goods-img-file-uploader-icon" style="line-height: 203px;"></i>
            </el-upload>
            <el-button type="danger" plain class="goods-img-file-delete" @click="deleteGoodsFile(index)">删除
            </el-button>
          </div>
        </div>
        <el-divider content-position="left"><span>介绍视频</span></el-divider>
        <div>
          <div v-for="(item, index) in fileList" :key="index" v-if="item.fileType === 2" class="goods-file-video">
            <el-upload class="goods-video-file-uploader"
                       :action="'/api/user/goods/uploadGoodsFileVideo?fileId=' + item.id + '&goodsId=' + item.goodsId"
                       name="goodsFile" :headers="myHeader" :show-file-list="false"
                       :on-success="handleFileSuccess" :before-upload="beforeVideoUpload">
              <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                            :options="playerOptions" style="width: 128px;height: 203px;" v-if="item.fileStatus">
              </video-player>
              <i v-else class="el-icon-plus goods-video-file-uploader-icon" style="line-height: 203px;"></i>
            </el-upload>
            <el-button type="danger" plain class="goods-video-file-delete" @click="deleteGoodsFile(index)">删除
            </el-button>
            <el-button type="success" plain class="goods-video-file-delete" @click="previewVideo(item.fileSrc)"
                       v-if="item.fileSrc">
              预览
            </el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'

    export default {
        name: 'goods-file-list',
        data () {
            return {
                loading: false,
                goodsId: '',
                fileList: [],
                timestamp: '',
                myHeader: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                playerOptions: {}
            }
        },
        created () {
            let goodsId = this.$cookies.get('goods_id')
            this.loadGoodsFile(goodsId)
        },
        mounted () {
        },
        methods: {
            loadGoodsFile (id) {
                if (id) {
                    this.loading = true
                    this.goodsId = id
                    this.$cookies.remove('goods_id')
                    this.$axios({
                        url: '/api/user/goods/queryFileList',
                        method: 'post',
                        data: {goodsId: id}
                    }).then(res => {
                        if (res.data.code === '1') {
                            this.fileList = res.data.data
                            this.initVideo()
                            document.getElementById('vjs_video_3').style.height = '203px'
                        }
                        this.$global.exitLoad(this, null, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            },
            handleFileSuccess (res, file) {
                if (res.code === '1') {
                    for (let i = 0; i < this.fileList.length; i++) {
                        if (this.fileList[i].id === res.data.id) {
                            this.fileList[i].fileSrc = res.data.src
                            this.fileList[i].fileStatus = true
                            break
                        }
                    }
                    this.initVideo()
                    this.timestamp = '?' + Date.parse(new Date())
                    this.$message.success('上传成功')
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
            },
            beforeImageUpload (file) {
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
            beforeVideoUpload (file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'video/mp4'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 10
                if (!isJPG) {
                    this.$message.error('上传视频格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传视频大小不能超过 10MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            },
            deleteGoodsFile (index) {
                let file = this.fileList[(index)]
                if (file.fileStatus) {
                    let loading = Loading.service({fullscreen: true, text: '正在删除'})
                    this.$axios({
                        url: '/api/user/goods/deleteGoodsFile',
                        method: 'post',
                        data: {fileId: file.id, goodsId: file.goodsId}
                    }).then(res => {
                        if (res.data.code === '1') {
                            file.fileStatus = false
                            // this.loadGoodsFile()
                        } else {
                            this.$message.error(res.data.data)
                        }
                        this.$global.exitLoad(this, loading, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, loading, '')
                    })
                }
            },
            initVideo () {
                if (this.fileList.length > 0) {
                    let fileSrc = this.fileList[0].fileSrc
                    if (fileSrc && fileSrc !== '') {
                        this.playerOptions = {
                            // 播放速度
                            playbackRates: [0.5, 1.0, 1.5, 2.0],
                            // 如果true,浏览器准备好时开始回放。
                            autoplay: false,
                            // 默认情况下将会消除任何音频。
                            muted: false,
                            // 导致视频一结束就重新开始。
                            loop: false,
                            // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                            preload: 'auto',
                            language: 'zh-CN',
                            // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                            aspectRatio: '16:9',
                            // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                            fluid: true,
                            sources: [{
                                // 类型
                                type: 'video/mp4',
                                // url地址
                                src: fileSrc + '?' + Date.parse(new Date())
                            }],
                            // 你的封面地址
                            poster: '',
                            // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                            notSupportedMessage: '此视频暂无法播放，请稍后再试',
                            controlBar: {
                                timeDivider: true,
                                durationDisplay: true,
                                remainingTimeDisplay: false,
                                // 全屏按钮
                                fullscreenToggle: true
                            }
                        }
                    }
                }
            },
            previewVideo (fileSrc) {
                window.open(fileSrc)
            }
        }
    }
</script>

<style type="text/css">
  .goods-file-div {
    width: 100%;
  }

  .goods-file-div{
    margin-bottom: 30px;
  }

  .goods-file-div > div {
    text-align: left;
  }

  .goods-file-div .el-divider--horizontal{
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .goods-file-img {
    width: 128px;
    height: 128px;
    display: inline-block;
    margin: 5px;
  }

  .goods-file-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .goods-file-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .goods-file-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .file-src {
    width: 128px;
    height: 128px;
    display: block;
  }

  .goods-file-delete {
    width: 128px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;">
      <div class="goods-file-div">
        <el-divider content-position="left"><span>商品图片</span></el-divider>
        <div>
          <div v-for="(item, index) in fileList" :key="index" v-if="item.fileType === 1" class="goods-file-img">
            <el-upload class="goods-file-uploader" :action="'/api/user/goods/uploadGoodsFileImg?fileId=' + item.id + '&goodsId=' + item.goodsId"
                       name="goodsFile" :headers="myHeader" :show-file-list="false"
                       :on-success="handleFileSuccess" :before-upload="beforeImageUpload"
                       @click="clickUpload(item.id, item.goodsId)">
              <img v-if="item.fileStatus" :src="'api' + item.fileSrc" class="file-src">
              <i v-else class="el-icon-plus goods-file-uploader-icon"></i>
            </el-upload>
            <el-button type="info" plain class="goods-file-delete" @click="deleteGoodsFile(item.id)">删除</el-button>
          </div>
        </div>
        <el-divider content-position="left"><span>介绍视频</span></el-divider>
        <div>
          <div v-for="(item, index) in fileList" :key="index" v-if="item.fileType === 2" class="goods-file-img">
            <el-upload class="goods-file-uploader" action="/api/user/goods/uploadGoodsFileVideo"
                       name="goodsFile" :headers="myHeader" :show-file-list="false"
                       :on-success="handleFileSuccess" :before-upload="beforeVideoUpload"
                       @click="clickUpload(item.id, item.goodsId)">
              <img v-if="item.fileSrc" :src="item.fileSrc" class="file-src">
              <i v-else class="el-icon-plus goods-file-uploader-icon"></i>
            </el-upload>
            <el-button type="info" plain class="goods-file-delete" @click="deleteGoodsFile(index)">删除</el-button>
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
    data() {
      return {
        loading: false,
        fileList: [],
        myHeader: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    },
    created() {
      let goodsId = this.$cookies.get('goods_id')
      this.loadGoodsFile(goodsId)
    },
    mounted() {
    },
    methods: {
      loadGoodsFile(id) {
        if (id) {
          this.loading = true
          this.$axios({
            url: '/api/user/goods/queryFileList',
            method: 'post',
            data: {goodsId: id}
          }).then(res => {
            if (res.data.code === '1') {
              this.fileList = res.data.data
            }
            this.$cookies.remove('goods_id')
            id = null
            this.$global.exitLoad(this, null, res.data)
          }).catch(error => {
            console.info('错误信息', error)
            this.$global.exitLoad(this, null, '')
          })
        }
      },
      handleFileSuccess(res, file) {
        if (res.code === '1') {
          for (let i = 0; i < this.fileList.length; i++) {
            if (this.fileList[i].id === res.data.id) {
              this.fileList[i].fileSrc = res.data.src
              this.fileList[i].fileStatus = true
              break
            }
          }
        } else {
          this.$message.error(res.data)
        }
        let loading = Loading.service({fullscreen: true, text: '正在上传'})
        this.$global.exitLoad(this, loading, res.data)
      },
      beforeImageUpload(file) {
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
      beforeVideoUpload(file) {
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
      deleteGoodsFile(index){
        let file = this.fileList[(index-1)]
        if (file.fileStatus){
          let loading = Loading.service({fullscreen: true, text: '正在删除'})
          this.$axios({
            url: '/api/user/goods/deleteGoodsFile',
            method: 'post',
            data: {fileId: file.id, goodsId: file.goodsId}
          }).then(res => {
            if (res.data.code === '1') {
              file.fileStatus = false
            } else {
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
  }
</script>

<style type="text/css">
  .draggable-form .draggable-input {
    width: 260px;
  }

  .dg-goods-type-list {
    height: 400px;
    overflow-y: scroll;
  }

  .dg-goods-type {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    border-bottom: 1px #e6e6e6 solid;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .dg-goods-type:hover {
    cursor: pointer;
    color: #3a8ee6;
    border-bottom: 1px #3a8ee6 solid;
  }

  .dg-goods-type > label{
    display: inline-table;
    height: 30px;
    line-height: 30px;
    position: relative;
    top: -10px;
  }

  /*.dg-goods-type:active {*/
  /*  cursor: pointer;*/
  /*  color: #00ff00;*/
  /*  border-bottom: 1px #00ff00 solid;*/
  /*}*/

  .dg-goods-type-this {
    color: #3a8ee6;
  }

  .dg-goods-type-sub{
    margin-top: 10px;
    text-align: right;
    padding-right: 30px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="draggable-form" :inline="true" class="draggable-form">
        <el-form-item label="小程序">
          <el-select v-if="appletList.length > 0" v-model="appletId" class="draggable-input" @change="loadType">
            <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
          <el-select v-else v-model="appletId" class="draggable-input">
            <el-option label="全部" value=''></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dg-goods-type-list">
        <draggable class="wrapper" v-model="typeList">
          <transition-group class="cm-flex flex-wrap">
            <div class="dg-goods-type" v-for="(item, index) in typeList" :key="item.id" @mousedown="clickGoodsType(item.id)">
              <label :class="item.id === typeId ? 'dg-goods-type-this' : ''">【{{index+1}}】</label>
              <el-image :src="item.typeLogo + timestamp"
                        style="width: 30px; height: 30px;"></el-image>
              <label :class="item.id === typeId ? 'dg-goods-type-this' : ''">{{item.typeName}}</label>
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="dg-goods-type-sub">
        <el-button type="primary" @click="onSubmit()" v-if="ifSub">提交</el-button>
        <el-button type="info" v-else>提交</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import draggable from 'vuedraggable'

    export default {
        name: 'goods-type-draggable',
        components: {
            'draggable': draggable
        },
        data () {
            return {
                loading: true,
                loadNumber: 0,
                appletId: '',
                typeId: '',
                appletList: [],
                typeList: [],
                ifSub: false,
                timestamp: ''
            }
        },
        created () {
            let appletId = this.$cookies.get('goods_type_applet_id')
            this.loadApplet(parseInt(appletId))
        },
        updated () {
            // 在这里可以获取调整顺序之后的list
            // console.log(this.goodsList)
            this.ifSub = this.loadNumber > 2
            this.loadNumber = this.loadNumber + 1
        },
        methods: {
            loadApplet (appletId) {
                if (appletId > 0) {
                    this.appletId = appletId
                    this.$cookies.remove('goods_type_applet_id')
                    this.$axios({
                        url: '/api/user/applet/queryAppletToMap',
                        method: 'post'
                    }).then(res => {
                        if (res.data.code === '1') {
                            this.appletList = res.data.data
                            this.loadType()
                        }
                        this.$global.exitLoad(this, null, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            },
            loadType () {
                this.loading = true
                this.loadNumber = 0
                this.$axios({
                    url: '/api/user/goods/loadGoodsTypeDraggableList',
                    method: 'post',
                    data: {appletId: this.appletId}
                }).then(res => {
                    if (res.data.code === '1') {
                        this.typeList = res.data.data
                    } else if (res.data.code === '-1') {
                        this.$message.error(res.data.data)
                    }
                    this.timestamp = '?' + Date.parse(new Date())
                    this.$global.exitLoad(this, null, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            clickGoodsType (id) {
                if (this.typeId === id) {
                    this.typeId = ''
                } else {
                    this.typeId = id
                }
            },
            onSubmit () {
                this.loading = true
                this.$axios({
                    url: '/api/user/goods/updateGoodsTypeIndexList',
                    method: 'post',
                    data: {json: JSON.stringify(this.typeList), appletId: this.appletId}
                }).then(res => {
                    let that = this
                    res.data.code === '1' ? this.$message.success({
                        message: res.data.data,
                        duration: 1000,
                        onClose: function () {
                            that.$emit('refreshList')
                        }
                    }) : this.$message.error(res.data.data)
                    this.$global.exitLoad(this, null, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            }
        }
    }
</script>

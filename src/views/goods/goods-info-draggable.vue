<style type="text/css">
  .draggable-form .draggable-input {
    width: 260px;
  }

  .dg-goods-list {
    height: 400px;
    overflow-y: scroll;
  }

  .dg-goods {
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

  .dg-goods:hover {
    cursor: pointer;
    color: #3a8ee6;
    border-bottom: 1px #3a8ee6 solid;
  }

  .dg-goods > label{
    display: inline-table;
    height: 30px;
    line-height: 30px;
    position: relative;
    top: -10px;
  }

  /*.dg-goods:active {*/
  /*  cursor: pointer;*/
  /*  color: #00ff00;*/
  /*  border-bottom: 1px #00ff00 solid;*/
  /*}*/

  .dg-goods-this {
    color: #3a8ee6;
  }

  .dg-goods-sub{
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
      <el-tabs v-model="activeName" @tab-click="handleClick" class="goods-list-tabs">
        <el-tab-pane v-for="(item, index) in typeList" :key="index"
                     :label="item.typeName" :name="'name_' + item.id"></el-tab-pane>
      </el-tabs>
      <div class="dg-goods-list">
        <draggable class="wrapper" v-model="goodsList">
          <transition-group class="cm-flex flex-wrap">
            <div class="dg-goods" v-for="(item, index) in goodsList" :key="item.id" @mousedown="clickGoods(item.id)">
              <label>【{{index+1}}】</label>
              <el-image :src="item.coverSrc + timestamp"
                        style="width: 30px; height: 30px;"></el-image>
              <label :class="item.id === goodsId ? 'dg-goods-this' : ''">{{item.goodsName}}</label>
            </div>
          </transition-group>
        </draggable>
      </div>
      <div class="dg-goods-sub">
        <el-button type="primary" @click="onSubmit()" v-if="ifSub">提交</el-button>
        <el-button type="info" v-else>提交</el-button>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import draggable from 'vuedraggable'

    export default {
        name: 'goods-info-draggable',
        components: {
            'draggable': draggable
        },
        data () {
            return {
                loading: true,
                loadNumber: 0,
                appletId: '',
                typeId: '',
                goodsId: '',
                activeName: '',
                appletList: [],
                typeList: [],
                goodsList: [],
                ifSub: false,
                timestamp: ''
            }
        },
        created () {
            let typeId = this.$cookies.get('goods_type_id')
            this.loadApplet(parseInt(typeId))
        },
        updated () {
            // 在这里可以获取调整顺序之后的list
            // console.log(this.goodsList)
            this.ifSub = this.loadNumber > 2
            this.loadNumber = this.loadNumber + 1
            // console.info('当前loadNumber = ' + this.loadNumber)
        },
        methods: {
            loadApplet (typeId) {
                if (typeId > 0) {
                    this.typeId = typeId
                    this.loadNumber = 0
                    this.$cookies.remove('goods_type_id')
                    this.$axios({
                        url: '/api/user/applet/queryAppletToMap',
                        method: 'post'
                    }).then(res => {
                        if (res.data.code === '1') {
                            this.appletList = res.data.data
                            this.appletId = this.appletList[0].id
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
                this.$axios({
                    url: '/api/user/goods/queryTypeList',
                    method: 'post',
                    data: {appletId: this.appletId}
                }).then(res => {
                    if (res.data.code === '1') {
                        this.typeList = res.data.data
                        // this.typeId = res.data.data[0].id
                        this.activeName = 'name_' + this.typeId
                    }
                    this.loadGoodsList()
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            clickGoods (id) {
                if (this.goodsId === id) {
                    this.goodsId = ''
                } else {
                    this.goodsId = id
                }
            },
            handleClick (tab, event) {
                this.typeId = tab.name.replace('name_', '')
                this.loadGoodsList()
            },
            loadGoodsList () {
                this.loading = true
                this.loadNumber = 0
                this.ifSub = false
                this.$axios({
                    url: '/api/user/goods/loadGoodsDraggableList',
                    method: 'post',
                    data: {appletId: this.appletId, typeId: this.typeId}
                }).then(res => {
                    if (res.data.code === '1') {
                        this.goodsList = res.data.data
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
            onSubmit () {
                this.loading = true
                // console.info(JSON.stringify(this.goodsList))
                this.$axios({
                    url: '/api/user/goods/updateGoodsIndexList',
                    method: 'post',
                    data: {json: JSON.stringify(this.goodsList), typeId: this.typeId}
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

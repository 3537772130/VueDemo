<style file="text/css">
  .page-part-form {
    text-align: left;
  }

  .page-part-form .el-select {
    width: 190px;
  }

  .part-list {
    border: 1px #e6e6e6 solid;
    margin: 0px 15px;
    overflow: auto;
    height: 320px;
    padding-bottom: 50px;
    text-align: left;
  }

  .part-list > div > div > .part-info-select {
    width: 24px;
    height: 24px;
    border-radius: 0px 5px 0px 0px;
    margin-bottom: -28px;
    position: relative;
    right: -117px;
  }

  .part-list > div > div > .part-info {
    width: 100px;
    height: 150px;
    padding: 0px 10px;
    border-top: 1px #f0f0f0 solid;
    border-left: 1px #f0f0f0 solid;
    border-radius: 5px;
    margin-left: 20px;
    webkit-box-shadow: 8px 8px 6px #b2b2b2;
    box-shadow: 8px 8px 6px #b2b2b2;
  }

  .part-list > div > div > .part-info:hover {
    cursor: pointer;
    border: 1px #67C23A solid;
  }

  .part-list > div > div > .part-info > .part-info-img {
    width: 100%;
    height: 100px;
    padding-top: 10px;
    text-align: center;
  }

  .part-list > div > div > .part-info > .part-info-name {
    height: 30px;
    padding: 0px 10px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .part-list > div > .el-divider--horizontal {
    margin-top: 24px;
    margin-bottom: 0px;
  }
</style>
<template>
  <div>
    <dic>
      <el-form :inline="true" class="demo-form-inline page-part-form"
               style="text-align: left;">
        <el-form-item label="名称">
          <el-input v-model="dataName" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
      </el-form>
    </dic>
    <div class="part-list" v-if="parseInt(bType) === 1">
      <div v-for="(type, tIndex) in typeList" :key="tIndex">
        <el-divider content-position="left">{{type.name}}</el-divider>
        <div v-for="(item, index) in goodsList" :key="index" v-if="type.id === item.typeId"
             style="display: inline-block;">
          <el-image class="part-info-select" src="/static/images/icon/select-1.png"
                    v-if="index === chooseIndex"></el-image>
          <div style="height: 24px;" v-if="index != chooseIndex"></div>
          <div class="part-info" @click="chooseInfo(item.id, item.name, item.icon, index)"
               :style="index === chooseIndex ? {'border': '1px #67C23A solid','webkit-box-shadow':'8px 8px 6px #67C23A','box-shadow': '8px 8px 6px #67C23A'} : ''">
            <div class="part-info-img">
              <el-image :src="item.icon" style="width: 90px;height: 90px;border-radius: 5px;"></el-image>
            </div>
            <div class="part-info-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="part-list" v-else-if="parseInt(bType) === 2">
      <div>
        <div v-for="(item, index) in typeList" :key="index" style="display: inline-block;">
          <el-image class="part-info-select" src="/static/images/icon/select-1.png"
                    v-if="index === chooseIndex"></el-image>
          <div style="height: 24px;" v-if="index != chooseIndex"></div>
          <div class="part-info" @click="chooseInfo(item.id, item.name, item.icon, index)"
               :style="index === chooseIndex ? {'border': '1px #67C23A solid'} : ''">
            <div class="part-info-img">
              <el-image :src="item.icon" style="width: 90px;height: 90px;border-radius: 5px;"></el-image>
            </div>
            <div class="part-info-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="part-list" v-else-if="parseInt(bType) === 3">
      <div v-for="(type, tIndex) in typeList" :key="tIndex">
        <el-divider content-position="left">{{type.name}}</el-divider>
        <div v-for="(item, index) in goodsList" :key="index" v-if="type.id === item.typeId"
             style="display: inline-block;">
          <el-image class="part-info-select" src="/static/images/icon/select-1.png"
                    v-if="index === chooseIndex"></el-image>
          <div style="height: 24px;" v-if="index != chooseIndex"></div>
          <div class="part-info"
               @click="chooseDetails(item.id, item.name, item.icon, item.minPrice, item.maxPrice, item.discount, index)"
               :style="index === chooseIndex ? {'border': '1px #67C23A solid'} : ''">
            <div class="part-info-img">
              <el-image :src="item.icon" style="width: 90px;height: 90px;border-radius: 5px;"></el-image>
            </div>
            <div class="part-info-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="part-list" v-else-if="parseInt(bType) === 4">
      <div>
        <div v-for="(item, index) in goodsList" :key="index" style="display: inline-block;">
          <el-image class="part-info-select" src="/static/images/icon/select-1.png"
                    v-if="index === chooseIndex"></el-image>
          <div style="height: 24px;" v-if="index != chooseIndex"></div>
          <div class="part-info"
               @click="chooseDetails(item.id, item.name, item.icon, item.minPrice, item.maxPrice, item.discount, index)"
               :style="index === chooseIndex ? {'border': '1px #67C23A solid'} : ''">
            <div class="part-info-img">
              <el-image :src="item.icon" style="width: 90px;height: 90px;border-radius: 5px;"></el-image>
            </div>
            <div class="part-info-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="part-info" v-else></div>
    <div style="text-align: right;padding: 10px 50px 10px 10px;">
      <el-button v-if="chooseIndex == null" type="info">确定</el-button>
      <el-button v-else type="success" @click="confirmInfo">确定</el-button>
    </div>
  </div>
</template>
<script file="text/javascript">
    import {Loading} from 'element-ui'

    export default {
        name: 'page-part-choose',
        data () {
            return {
                loadIf: true,
                id: null,
                name: '',
                icon: '',
                minPrice: 0.00,
                maxPrice: 0.00,
                discount: 100,
                chooseIndex: null,
                goodsList: [],
                typeList: [],
                bType: null,
                dataName: ''
            }
        },
        created () {
            this.loadList(this.$cookies.get('bType'))
        },
        mounted () {
        },
        methods: {
            loadList (type) {
                this.bType = type
                this.chooseIndex = null
                this.goodsList = []
                this.typeList = []
                if (type != null) {
                    this.loadInfoList(type, '')
                }
            },
            selectList () {
                this.loadInfoList(this.bType, this.dataName)
            },
            loadInfoList (type, name) {
                let appletId = this.$cookies.get('default_applet_id')
                let loading = Loading.service({fullscreen: true, text: '正在加载'})
                let url = ''
                switch (parseInt(type)) {
                    case 1:
                        url = 'queryGoodsInfoList'
                        break
                    case 2:
                        url = 'queryGoodsTypeList'
                        break
                    case 3:
                        url = 'queryGoodsDetailsList'
                        break
                    case 4:
                        url = 'queryGoodsDiscountList'
                        break
                }
                let that = this
                this.$axios({
                    url: '/api/user/applet/page/' + url,
                    method: 'post',
                    data: {appletId: appletId, name: name}
                }).then(res => {
                    if (res.data.code === '1') {
                        this.goodsList = res.data.data.goodsList
                        if (that.bType !== 4) {
                            this.typeList = res.data.data.typeList
                        }
                    } else {
                        this.$message.message('未找到相关信息')
                    }
                    this.$cookies.remove('bType')
                    this.$global.exitLoad(this, loading, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, loading, '')
                })
            },
            chooseInfo (id, name, icon, index) {
                this.id = id
                this.name = name
                this.icon = icon
                this.chooseIndex = index
            },
            chooseDetails (id, name, icon, minPrice, maxPrice, discount, index) {
                this.id = id
                this.name = name
                this.icon = icon
                this.minPrice = minPrice
                this.maxPrice = maxPrice
                this.discount = discount
                this.chooseIndex = index
            },
            confirmInfo () {
                this.$emit('refreshSet', this.id, this.name, this.icon, this.minPrice, this.maxPrice, this.discount, this.bType)
            },
            refreshSet () {

            }
        }
    }
</script>

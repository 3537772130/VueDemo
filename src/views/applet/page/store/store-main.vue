<style file="text/css">
  @import "../../../../../static/css/page/default.css";
  @import "../../../../../static/css/page/store/store-main.css";
</style>
<template>
  <div style="text-align: left;">
    <el-main v-loading="loading" element-loading-text="加载中"
             :style="'height: ' + (contentHeight - 80) + 'px;background-color: #FFFFFF;scrollbar-width: none;'">
      <div class="config-operation">
        <el-button type="primary" @click="preserveConfig()"><i class="el-icon-folder-checked"></i>&nbsp;保存配置</el-button>
        <el-button type="danger" @click="cancelConfig()"><i class="el-icon-folder-delete"></i>&nbsp;取消配置</el-button>
      </div>
      <div class="left-menu" :style="{height: (contentHeight - 150) + 'px;center-img: scroll;'}">
        <div v-for="(item1, index1) in typeList" :key="index1">
          <el-divider content-position="left">{{item1.name}}</el-divider>
          <div v-for="(item2, index2) in item1.list" :key="index2" class="style-choose">
            <div @click="addPartList(item2.logo)" class="box">
              <div class="wrap">{{item2.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="center-menu" :style="'height: ' + (contentHeight - 30) + 'px;'">
        <el-image src="/static/images/timg.jpg" class="center-img"></el-image>
        <div class="center-content" ref="centerContent" style="scrollbar-width: none;">
          <div class="components" v-for="(item,partIndex) in partList" :key="partIndex"
               :style="{'border': checkIndex === partIndex ? '1px #FF00FF dashed':'none'}">
            <div class="goods-search" @click="openDrawer(partIndex)" v-if="item.id === 'goods-search'">
              <div class="search-part">
                <i class="el-icon-search"></i>搜索商品
              </div>
            </div>
            <div class="img-carousel" @click="openDrawer(partIndex)" v-if="item.id === 'img-carousel'">
              <el-carousel :interval="3000" arrow="never" height="120px">
                <el-carousel-item v-for="(car,index) in item.list" :key="index">
                  <el-image class="image" :src="car.icon"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="notice-bar" @click="openDrawer(partIndex)" v-if="item.id === 'notice-bar'">
              <div class="text-content">{{item.describe}}</div>
              <div :style="moveCoverStyle">
                <div class="cover-left" :style="cover_1">
                  <div></div>
                </div>
                <div :style="cover_2"></div>
                <div class="cover-right" :style="cover_1">
                  <div></div>
                </div>
              </div>
              <el-image class="text-trumpet" src="/static/images/icon/trumpet.png"></el-image>
            </div>
            <div class="type-frame-three" @click="openDrawer(partIndex)" v-if="item.id === 'type-frame-three'">
              <div class="type-element" v-for="(type,index) in item.list" :key="index">
                <div>
                  <el-image class="type-icon" :src="type.icon"></el-image>
                </div>
                <span class="type-name">{{type.name}}</span>
              </div>
            </div>
            <div class="type-frame-four" @click="openDrawer(partIndex)" v-if="item.id === 'type-frame-four'">
              <div class="type-element" v-for="(type,index) in item.list" :key="index">
                <div>
                  <el-image class="type-icon" :src="type.icon"></el-image>
                </div>
                <span class="type-name">{{type.name}}</span>
              </div>
            </div>
            <div class="img-text-title" @click="openDrawer(partIndex)" v-if="item.id === 'img-text-title'">
              <el-image v-for="(img, index) in item.list" :key="index" :src="img.icon"
                        class="img-text-title-image"></el-image>
              <span class="img-text-title-text">
                {{item.title}}
                <span v-if="item.describe != ''"> | <span>{{item.describe}}</span></span>
              </span>
            </div>
            <div class="img-title" @click="openDrawer(partIndex)" v-if="item.id === 'img-title'">
              <el-image class="image" v-for="(img, index) in item.list" :key="index" :src="img.icon"></el-image>
            </div>
            <div class="goods-two-row" @click="openDrawer(partIndex)" v-if="item.id === 'goods-two-row'">
              <div class="goods-def" v-for="(goods,index) in item.list" :key="index">
                <div>
                  <el-image class="goods-img" :src="goods.goodsIcon"></el-image>
                </div>
                <div class="goods-price">
                  &yen;{{goods.minPrice|addZero}}
                  <span v-if="goods.minPrice < goods.maxPrice">-{{goods.maxPrice|addZero}}</span>
                </div>
                <div class="goods-name">{{goods.name}}</div>
              </div>
            </div>
            <div class="divider-title" @click="openDrawer(partIndex)" v-if="item.id === 'divider-title'">
              <div class="divider-line"></div>
              <span class="c-divider"><span>{{item.title}}</span></span>
            </div>
            <div class="goods-three-row" @click="openDrawer(partIndex)" v-if="item.id === 'goods-three-row'">
              <div class="goods-def" v-for="(goods, index) in item.list" :key="index">
                <div>
                  <el-image class="goods-img" :src="goods.goodsIcon"></el-image>
                </div>
                <div class="goods-price">
                  &yen;{{goods.minPrice|addZero}}
                  <span v-if="goods.minPrice < goods.maxPrice">-{{goods.maxPrice|addZero}}</span>
                </div>
                <div class="goods-name">{{goods.name}}</div>
              </div>
            </div>
            <div class="bscroll imgX-scroll" ref="imgXScroll" @click="openDrawer(partIndex)"
                 v-if="item.id === 'imgX-scroll'">
              <div class="bscroll-container" :style="imgXScrollStyle">
                <el-image class="image" v-for="(img, index) in item.list" :key="index" :src="img.icon"></el-image>
              </div>
            </div>
            <div class="bscroll imgY-scroll" ref="imgYScroll" @click="openDrawer(partIndex)"
                 v-if="item.id === 'imgY-scroll'">
              <div class="bscroll-container" :style="imgYScrollStyle">
                <el-image class="image" v-for="(img, index) in item.list" :key="index" :src="img.icon"></el-image>
              </div>
            </div>
            <div class="bscroll goodsY-scroll" ref="goodsYScroll" @click="openDrawer(partIndex)"
                 v-if="item.id === 'goodsY-scroll'">
              <div class="bscroll-container" :style="goodsYScrollStyle">
                <div class="goods-def" v-for="(goods, index) in item.list" :key="index">
                  <div>
                    <el-image class="goods-img" :src="goods.goodsIcon"
                              style="border-radius: 10px 10px 0px 0px;"></el-image>
                  </div>
                  <div class="goods-price">
                    &yen;{{goods.minPrice|addZero}}
                    <span v-if="goods.minPrice < goods.maxPrice">-{{goods.maxPrice|addZero}}</span>
                  </div>
                  <div class="goods-name">{{goods.name}}</div>
                </div>
              </div>
            </div>
            <div class="bscroll goodsX-scroll" ref="goodsXScroll" @click="openDrawer(partIndex)"
                 v-if="item.id === 'goodsX-scroll'">
              <div class="bscroll-container" :style="goodsXScrollStyle">
                <div class="goods-def" v-for="(goods, index) in item.list" :key="index">
                  <el-image class="goods-img" :src="goods.goodsIcon" style="border-radius: 5px;"></el-image>
                  <div>
                    <div class="goods-price">现价：<span>{{goods.minPrice|addZero}}</span></div>
                    <div class="goods-price">原价：<span
                      style="font-size: 14px;text-decoration:line-through;">{{goods.maxPrice|addZero}}</span></div>
                    <div class="goods-name">{{goods.name}}</div>
                    <div style="width:120px;height: 30px;display: inline-block;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawer"
        ref="drawerPage"
        direction="rtl"
        :modal="false"
        :before-close="handleClose">
        <el-scrollbar :style="drawerstyle">
          <StoreMainPart ref="StoreMainPart" v-on:refreshSet="refreshSet"></StoreMainPart>
        </el-scrollbar>
      </el-drawer>
    </el-main>
  </div>
</template>
<script file="text/javascript">
    import {Loading} from 'element-ui'
    import StoreMainPart from '@/views/applet/page/store/store-main-part.vue'

    export default {
        name: 'applet-element',
        components: {
            'StoreMainPart': StoreMainPart
        },
        data () {
            return {
                contentHeight: `${document.documentElement.scrollHeight}`,
                contentWidth: `${document.documentElement.scrollWidth}`,
                loading: false,
                typeList: [],
                partList: [],
                checkIndex: null,
                coverWidth: 0,
                imgXScrollStyle: {},
                imgYScrollStyle: {},
                goodsYScrollStyle: {},
                goodsXScrollStyle: {},
                moveCoverStyle: {
                    'width': `${document.documentElement.scrollWidth}` + 'px',
                    'height': '30px',
                    'position': 'relative',
                    'left': (0 - (`${(document.documentElement.scrollWidth - 395) / 2}`)) + 'px',
                    'top': '-30px',
                    'text-align': 'left'
                },
                cover_1: {
                    'width': (`${(document.documentElement.scrollWidth - 385) / 2 - 16}`) + 'px',
                    'height': '30px',
                    'display': 'inline-block',
                    'background-color': '#FFFFFF'
                },
                cover_2: {
                    'width': '377px',
                    'height': '30px',
                    'display': 'inline-block',
                    'margin-left': '5px',
                    'margin-right': '7px'
                },
                drawer: false,
                drawerTitle: '',
                drawerstyle: {}
            }
        },
        created () {
            let pageId = this.$cookies.get('default_page_id')
            this.loadAppletElement(pageId)
            let height = document.getElementById('app').offsetHeight
            this.drawerstyle = {
                'overflow': 'scroll',
                'height': (height - 50) + 'px'
            }
        },
        mounted () {

        },
        methods: {
            loadAppletElement (pageId) {
                if (pageId) {
                    this.pageId = pageId
                    let loading = Loading.service({fullscreen: true, text: '正在加载'})
                    this.$axios({
                        url: '/api/user/applet/page/loadPageElement',
                        method: 'post',
                        data: {appletId: parseInt(this.$cookies.get('default_applet_id')), pageId: parseInt(pageId)}
                    }).then(res => {
                        this.typeList = res.data.data.typeList
                        if (res.data.code === '1') {
                            let json = res.data.data.contentJson
                            this.partList = JSON.parse(json)
                            this.$part.setPartList(this.partList)
                            this.$part._initStoreScroll(this)
                        }
                        this.$global.exitLoad(this, loading, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, loading, '')
                    })
                }
            },
            preserveConfig () {
                let json = JSON.stringify(this.partList)
                let loading = Loading.service({fullscreen: true, text: '正在加载'})
                this.$axios({
                    url: '/api/user/applet/page/savePageContent',
                    method: 'post',
                    data: {appletId: parseInt(this.$cookies.get('default_applet_id')), pageId: this.pageId, json: json}
                }).then(res => {
                    res.data.code === '1' ? this.$message.success({
                        message: res.data.data, duration: 1000
                    }) : this.$message.error(res.data.data)
                    this.$global.exitLoad(this, loading, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, loading, '')
                })
            },
            cancelConfig () {
                this.$confirm('确定取消当前修改的配置吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.close()
                })
            },
            addPartList (logo) {
                this.$cookies.set('part_info', this.$part.getStorePart(logo))
                let part = this.$cookies.get('part_info')
                if (part) {
                    let list = this.partList
                    let limit = true
                    // 滑块part只允许添加一次，超出无效
                    for (let i = 0; i < list.length; i++) {
                        if (part.id === list[i].id) {
                            if ('imgX-scroll,imgY-scroll,goodsY-scroll,goodsX-scroll'.indexOf(part.id) >= 0) {
                                limit = false
                                this.$message.warning('相同滑块只能被添加一次哦')
                            }
                            break
                        }
                    }
                    if (limit) {
                        list.push(part)
                        this.$message.success('添加元素成功')
                        this.$nextTick(() => {
                            let offsetHeight = 0
                            for (let i = 0; i < this.partList.length; i++) {
                                const el = document.querySelector('.' + this.partList[i].id)
                                offsetHeight += el.offsetHeight
                            }
                            this.$refs.centerContent.scrollTop = offsetHeight
                        })
                    }
                } else {
                    this.$message.warning('元素不存在')
                }
            },
            openDrawer (index) {
                // let obj = this.partList.find((item) => {
                //   return item.id === id
                // })
                this.checkIndex = index
                let part = this.partList[index]
                this.$part.setPartList(this.partList)
                this.$cookies.set('store_main_part_index', index)
                this.drawer = true
                this.drawerTitle = part.name
                try {
                    this.$refs.StoreMainPart.loadPart()
                } catch (e) {

                }
            },
            handleClose (done) {
                done()
                this.checkIndex = null
                this.partList = this.$part.getPartList()
            },
            refreshSet (bool, index) {
                this.partList = this.$part.getPartList()
                this.drawer = bool
                this.checkIndex = index
                this.$part._initStoreScroll(this)
            }
        }
    }
</script>

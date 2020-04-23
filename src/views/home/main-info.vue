<style>
  body {
    margin: 0px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px 0px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-aside::-webkit-scrollbar {
    display: none;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 460px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu {
    background-color: #515a6e;
    width: 200px;
  }

  .el-menu-item-group__title {
    display: none;
  }

  .el-dropdown {
    height: 54px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .user-photo {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border: 1px #dcdee2 solid;
    position: relative;
    top: 4px;
  }

  .el-submenu__title {
    text-align: left;
  }

  .el-submenu .el-menu-item {
    text-align: left;
  }
</style>
<template>
  <el-container :style="{height: bodyHeight}">
    <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
      <div style="width: 200px;height: 63px;display: inline-block;">
        <!--        <img style="position: relative;top: -60px;" src="/api/image/getImage?text=applet site&color=16777215&fontFamily=华文隶书">-->
      </div>
      <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        @open="handleSOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF" style="position: relative;top: -140px;">
        <el-submenu v-for="menu in menuList" :key="menu.index" :index="menu.index">
          <template slot="title"><i :class="menu.icon"></i>{{menu.title}}</template>
          <el-menu-item-group>
            <el-menu-item v-for="item in menu.items" :key="item.index" :index="item.index">{{item.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background-color: #545c64;text-align: right;">
        <headerMenu ref="headerMenu" v-on:setActiveIndex="updateInfo"></headerMenu>
      </el-header>
      <el-main style="background-color: #DCDFE6;">
        <tabsContent ref="tabsContent" v-on:updateInfo="updateInfo"></tabsContent>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
    import headerMenu from '@/views/common/header-menu.vue'
    import tabsContent from '@/views/common/tabs-content.vue'

    export default {
        name: 'main-info',
        components: {
            'headerMenu': headerMenu,
            'tabsContent': tabsContent
        },
        data () {
            return {
                bodyHeight: `${document.documentElement.clientHeight}` + 'px',
                info: this.$cookies.get('user_info'),
                activeIndex: '',
                menuList: [
                    {
                        index: 'm-1',
                        title: '个人管理',
                        icon: 'el-icon-user-solid',
                        items: [
                            {
                                index: '1-1',
                                title: '登录日志'
                            },
                            {
                                index: '1-2',
                                title: '我的优惠券'
                            }
                        ]
                    },
                    {
                        index: 'm-2',
                        title: '小程序管理',
                        icon: 'el-icon-menu',
                        items: [
                            {
                                index: '2-1',
                                title: '小程序申请列表'
                            },
                            {
                                index: '2-2',
                                title: '小程序管理列表'
                            }
                        ]
                    },
                    {
                        index: 'm-3',
                        title: '商品管理',
                        icon: 'el-icon-s-goods',
                        items: [
                            {
                                index: '3-1',
                                title: '商品类型'
                            },
                            {
                                index: '3-2',
                                title: '商品列表'
                            },
                            {
                                index: '3-3',
                                title: '商品推荐'
                            }
                        ]
                    },
                    {
                        index: 'm-4',
                        title: '配置管理',
                        icon: 'el-icon-discount',
                        items: [
                            {
                                index: '4-1',
                                title: '创建优惠券'
                            },
                            {
                                index: '4-2',
                                title: '运费配置'
                            }
                        ]
                    }
                ]
            }
        },
        created () {
            this.$axios({
                url: '/api/user/checkLogin',
                method: 'post'
            }).then(res => {
                // console.info('后台返回的数据', res.data)
                if (res.data.code !== '1') {
                    this.$cookies.remove('user_info')
                    this.$router.push({path: '/login'})
                }
            }).catch(error => {
                console.info('错误信息', error)
            })
        },
        mounted () {
            this.$refs.headerMenu.setMenuIndex('5-1')
        },
        methods: {
            updateInfo (index) {
                if (index) {
                    if (index === '0') {
                        this.activeIndex = this.activeIndex === '0' ? '' : '0'
                    } else {
                        this.activeIndex = index
                    }
                } else {
                    this.$refs.headerMenu.updateInfo()
                }
            },
            handleSelect (key, keyPath) {
                // console.log(key, keyPath)
                let keyTitle = ''
                let list = this.menuList
                for (let i = 0; i < list.length; i++) {
                    let items = list[i].items
                    for (let k = 0; k < items.length; k++) {
                        let item = items[k]
                        if (item.index === key) {
                            keyTitle = item.title
                            break
                        }
                    }
                }
                this.$refs.tabsContent.addTab(key, keyTitle)
            },
            handleSOpen (key, keyPath) {
                // console.log("打开：", key, keyPath)
            },
            handleClose (key, keyPath) {
                // console.log("关闭：", key, keyPath)
            }
        }
    }
</script>

<style file="text/css">
  .default-main {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
  }

  .default-main .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" class="default-main">
      <!--餐饮-->
      <el-tabs v-model="showTabs" type="border-card" v-if="appletTypeId == 1" :style="{height: tabsHeight + 'px'}">
        <el-tab-pane :style="{height: tabHeight + 'px'}" v-for="(item, index) in pageList" :key="index"
                     :label="item.pageName" :name="'page' + item.pageId">
          {{item.pageLogo + '-' + item.pageName}}
        </el-tab-pane>
      </el-tabs>
      <!--百货超市/便利店-->
      <el-tabs v-model="showTabs" type="border-card" v-if="appletTypeId == 2" :style="{height: tabsHeight + 'px'}">
        <el-tab-pane :style="{height: tabHeight + 'px'}" v-for="(item, index) in pageList" :key="index"
                     :label="item.pageName" :name="'page' + item.pageId">
          <storeMain trf="storeMain" v-if="item.pageLogo == 'MAIN'"></storeMain>
        </el-tab-pane>
      </el-tabs>
      <!--水果专卖-->
      <el-tabs v-model="showTabs" type="border-card" v-if="appletTypeId == 3" :style="{height: tabsHeight + 'px'}">
        <el-tab-pane :style="{height: tabHeight + 'px'}" v-for="(item, index) in pageList" :key="index"
                     :label="item.pageName" :name="'page' + item.pageId">
          {{item.pageLogo + '-' + item.pageName}}
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script file="text/javascript">
    /* eslint-disable no-trailing-spaces */

    import storeMain from '@/views/applet/page/store/store-main.vue'

    export default {
        name: 'page-default',
        components: {
            'storeMain': storeMain
        },
        data () {
            return {
                tabsHeight: `${document.documentElement.scrollHeight + 50}`,
                tabHeight: `${document.documentElement.scrollHeight - 25}`,
                loading: false,
                showTabs: '',
                appletTypeId: 0,
                pageList: []
            }
        },
        created () {
            let appletId = this.$cookies.get('default_applet_id')
            this.loadPageDefault(appletId)
        },
        mounted () {
        },
        methods: {
            loadPageDefault (appletId) {
                this.loading = true
                this.$axios({
                    url: '/api/user/applet/page/loadPageDefault',
                    method: 'post',
                    data: {appletId: appletId}
                }).then(res => {
                    if (res.data.code === '1') {
                        this.appletTypeId = res.data.data.appletTypeId
                        this.pageList = res.data.data.pageList
                        this.showTabs = 'page' + this.pageList[0].pageId
                        this.$cookies.set('default_page_id', this.pageList[0].pageId)
                    } else {
                        this.$message.error({
                            message: res.data.data,
                            duration: 2000,
                            onClose: function () {
                                window.close()
                            }
                        })
                    }
                    this.$global.exitLoad(this, null, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            }
        }
    }
</script>

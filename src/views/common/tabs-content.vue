<style>
  .el-main {
    padding: 10px;
  }

  .el-tabs__nav {
    height: 40px;
    line-height: 40px;
  }

  .tab-div-content::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }

  .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }

  .tab-div-content > .tab-div-content-page {
    /*padding: 15px;*/
  }

  .tab-div-content .el-table th > .cell {
    font-size: 14px;
    color: #000000;
  }
</style>
<template>
  <el-tabs v-model="editableTabsValue" type="border-card" @tab-click="clickTab" @tab-remove="removeTab">
    <el-tab-pane label="个人主页" name="m-1" :style="{height: tabPaneHeight + 'px',display: mainShow}">
      <userHome v-on:updateInfo="updateInfo"></userHome>
    </el-tab-pane>
    <el-tab-pane class="tab-div-content" v-for="item in editableTabs" :key="item.name"
                 :label="item.title" :name="item.name" :style="{'height': tabPaneHeight + 'px','overflow-y': 'scroll'}"
                 closable>
      <!--个人中心-->
      <div v-if="item.name === '1-1'" class="tab-div-content-page">
        <userLoginLog></userLoginLog>
      </div>
      <div v-if="item.name === '1-2'" class="tab-div-content-page">
        <couponMyList></couponMyList>
      </div>
      <!--小程序管理-->
      <div v-if="item.name === '2-1'" class="tab-div-content-page">
        <appletApplyList></appletApplyList>
      </div>
      <div v-if="item.name === '2-2'" class="tab-div-content-page">
        <appletList></appletList>
      </div>
      <div v-if="item.name === '2-3'" class="tab-div-content-page">
        <appletFreightDeploy></appletFreightDeploy>
      </div>
      <!--商品管理-->
      <div v-if="item.name === '3-1'" class="tab-div-content-page">
        <goodsTypeList></goodsTypeList>
      </div>
      <div v-if="item.name === '3-2'" class="tab-div-content-page">
        <goodsInfoList></goodsInfoList>
      </div>
      <div v-if="item.name === '3-3'" class="tab-div-content-page">
        <recommendList></recommendList>
      </div>
      <!--配置管理-->
      <div v-if="item.name === '4-1'" class="tab-div-content-page">
        <couponCreateList></couponCreateList>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import userHome from '@/views/user/user-home.vue'
  import userLoginLog from '@/views/user/user-login-log.vue'
  import appletList from '@/views/applet/applet-list.vue'
  import appletApplyList from '@/views/applet/applet-apply-list.vue'
  import goodsInfoList from '@/views/goods/goods-info-list.vue'
  import goodsTypeList from '@/views/goods/type/goods-type-list.vue'
  import recommendList from '@/views/goods/recommend/recommend-list.vue'
  import couponCreateList from '@/views/coupon/coupon-create-list.vue'
  import couponMyList from '@/views/coupon/coupon-my-list.vue'
  import appletFreightDeploy from '@/views/applet/freightDeploy/applet-freight-deploy-list.vue'

  export default {
    name: 'tabs-content',
    components: {
        'userHome': userHome,
        'userLoginLog': userLoginLog,
        'appletList': appletList,
        'appletApplyList': appletApplyList,
        'goodsInfoList': goodsInfoList,
        'goodsTypeList': goodsTypeList,
        'recommendList': recommendList,
        'couponCreateList': couponCreateList,
        'couponMyList': couponMyList,
        'appletFreightDeploy': appletFreightDeploy
    },
    data () {
      return {
        tabPaneHeight: `${document.documentElement.clientHeight - 125}`,
        mainShow: 'block',
        editableTabsValue: 'm-1',
        editableTabs: [],
        tabIndex: 0,
        parentMenuIndex: ''
      }
    },
    created () {
      this.$cookies.set('tabPaneHeight', this.tabPaneHeight)
    },
    method () {

    },
    methods: {
      // 添加标签页
      addTab (menuIndex, title) {
        this.mainShow = 'none'
        let menuLists = this.editableTabs
        let ifBe = true
        for (let i = 0; i < menuLists.length; i++) {
          if (menuLists[i].name === menuIndex) {
            ifBe = false
            break
          }
        }
        if (ifBe) {
          this.editableTabs.push({
            title: title,
            name: menuIndex
          })
        }
        this.editableTabsValue = menuIndex
      },
      // 选中标签页
      clickTab (targetName) {
        // 更新main-info菜单选中目标
        this.parentMenuIndex = targetName.$el.id.replace('pane-', '')
        this.setActiveIndex()
      },
      // 移除标签页
      removeTab (targetName) {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
        if (tabs.length === 1) {
          this.mainShow = 'block'
        }
        // 更新main-info菜单选中目标
        this.parentMenuIndex = tabs.length === 1 ? '0' : this.editableTabsValue
        this.setActiveIndex()
      },
      updateInfo () {
        this.$emit('updateInfo')
      },
      setActiveIndex () {
        this.$emit('updateInfo', this.parentMenuIndex)
      }
    }
  }
</script>

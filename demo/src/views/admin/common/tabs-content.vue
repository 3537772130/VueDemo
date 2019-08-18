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
    <el-tab-pane label="个人主页" name="0" :style="{height: tabPaneHeight + 'px',display: mainShow}">
      <userInfo v-on:updateInfo="updateInfo"></userInfo>
    </el-tab-pane>
    <el-tab-pane class="tab-div-content" v-for="item in editableTabs" :key="item.name"
                 :label="item.title" :name="item.name" :style="{'height': tabPaneHeight + 'px','overflow-y': 'scroll'}"
                 closable>
      <div v-if="item.name != '1-1'">{{item.content}}</div>
      <div v-if="item.name === '1-1'" class="tab-div-content-page">
        <userLoginLog></userLoginLog>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import userInfo from '@/views/admin/personal/user-info.vue'
  import userLoginLog from '@/views/admin/personal/user-login-log.vue'

  export default {
    data() {
      return {
        tabPaneHeight: `${document.documentElement.clientHeight - 125}`,
        mainShow: 'block',
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 0,
        parentMenuIndex: ''
      }
    },
    components: {
      'userInfo': userInfo,
      'userLoginLog': userLoginLog
    },
    created() {

    },
    method() {

    },
    methods: {
      // 添加标签页
      addTab(menuIndex, title) {
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
            name: menuIndex,
            content: 'New Tab ' + title
          })
        }
        this.editableTabsValue = menuIndex
      },
      // 选中标签页
      clickTab(targetName) {
        // 更新main-info菜单选中目标
        this.parentMenuIndex = targetName.$el.id.replace('pane-', '')
        this.setActiveIndex()
      },
      // 移除标签页
      removeTab(targetName) {
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
      updateInfo() {
        this.$emit('updateInfo')
      },
      setActiveIndex() {
        this.$emit('updateInfo', this.parentMenuIndex)
      }
    }
  }
</script>

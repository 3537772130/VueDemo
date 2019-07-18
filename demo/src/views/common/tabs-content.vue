<style>
  .el-main {
    padding: 10px;
  }

  .el-tabs__nav {
    height: 40px;
    line-height: 40px;
  }
</style>
<template>
  <el-tabs v-model="editableTabsValue" type="border-card" @tab-remove="removeTab">
    <el-tab-pane label="个人主页" name="0" :style="{height: tabPaneHeight + 'px',display: mainShow}">
      <userInfo v-on:updateInfo="updateInfo"></userInfo>
    </el-tab-pane>
    <el-tab-pane v-for="item in editableTabs" :key="item.name"
                 :label="item.title" :name="item.name" :style="{height: tabPaneHeight + 'px'}" closable>
      {{item.content}}
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import userInfo from '@/views/personal/user-info.vue'

  export default {
    data() {
      return {
        tabPaneHeight: `${document.documentElement.clientHeight - 155}`,
        mainShow: 'block',
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 0
      }
    },
    components: {
      'userInfo': userInfo
    },
    methods: {
      addTab(menuId, title) {
        this.mainShow = 'none'
        let menuLists = this.editableTabs
        let ifBe = true
        for (var i = 0; i < menuLists.length; i++) {
          if (menuLists[i].name === menuId) {
            ifBe = false
            break
          }
        }
        if (ifBe) {
          this.editableTabs.push({
            title: title,
            name: menuId,
            content: 'New Tab ' + title
          })
        }
        this.editableTabsValue = menuId
      },
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
      },
      updateInfo (){
        this.$emit('updateInfo')
      }
    },
    method() {

    },
    created() {

    }
  }
</script>

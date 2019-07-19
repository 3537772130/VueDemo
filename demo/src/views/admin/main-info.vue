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
    line-height: 160px;
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

  .el-submenu__title, .el-menu-item, .el-submenu__title i {
    color: #1E90FF;
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
</style>
<template>
  <el-container :style="{height: bodyHeight}">
    <el-aside width="200px" style="background-color: #515a6e">
      <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        @open="handleSOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF">
        <el-submenu index="s1" style="margin-top: 60px;">
          <template slot="title"><i class="el-icon-platform-eleme"></i>导航一</template>
          <el-menu-item-group style="color: red;">
            <el-menu-item index="1" @click.native="loadMenuContent('1','选项1')">选项1</el-menu-item>
            <el-menu-item index="2" @click.native="loadMenuContent('2','选项2')">选项2</el-menu-item>
            <el-menu-item index="3" @click.native="loadMenuContent('3','选项3')">选项3</el-menu-item>
            <el-menu-item index="4" @click.native="loadMenuContent('4','选项4')">选项4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="s2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <el-menu-item index="5" @click.native="loadMenuContent('5','选项5')">选项5</el-menu-item>
            <el-menu-item index="6" @click.native="loadMenuContent('6','选项6')">选项6</el-menu-item>
            <el-menu-item index="7" @click.native="loadMenuContent('7','选项7')">选项7</el-menu-item>
            <el-menu-item index="8" @click.native="loadMenuContent('8','选项8')">选项8</el-menu-item>
            <el-menu-item index="9" @click.native="loadMenuContent('9','选项9')">选项9</el-menu-item>
            <el-menu-item index="10" @click.native="loadMenuContent('10','选项10')">选项10</el-menu-item>
            <el-menu-item index="11" @click.native="loadMenuContent('11','选项11')">选项11</el-menu-item>
            <el-menu-item index="12" @click.native="loadMenuContent('12','选项12')">选项12</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="s3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <el-menu-item index="13" @click.native="loadMenuContent('13','选项13')">选项13</el-menu-item>
            <el-menu-item index="14" @click.native="loadMenuContent('14','选项14')">选项14</el-menu-item>
            <el-menu-item index="15" @click.native="loadMenuContent('15','选项15')">选项15</el-menu-item>
            <el-menu-item index="16" @click.native="loadMenuContent('16','选项16')">选项16</el-menu-item>
            <el-menu-item index="17" @click.native="loadMenuContent('17','选项17')">选项17</el-menu-item>
            <el-menu-item index="18" @click.native="loadMenuContent('18','选项18')">选项18</el-menu-item>
            <el-menu-item index="19" @click.native="loadMenuContent('19','选项19')">选项19</el-menu-item>
            <el-menu-item index="20" @click.native="loadMenuContent('20','选项20')">选项20</el-menu-item>
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
  import headerMenu from '@/views/admin/common/header-menu.vue'
  import tabsContent from '@/views/admin/common/tabs-content.vue'

  export default {
    name: 'main-info',
    components: {
      'headerMenu': headerMenu,
      'tabsContent': tabsContent
    },
    data() {
      return {
        bodyHeight: `${document.documentElement.clientHeight}` + 'px',
        info: this.$cookies.get('user_info'),
        activeIndex: '1'
      }
    },
    created() {
      this.$axios({
        url: '/api/checkLogin',
        method: 'post'
      }).then(res => {
        console.info('后台返回的数据', res.data)
        if (res.data.code != '1') {
          this.$cookies.remove("user_info")
          this.$router.push({path: '/login'})
        }
      })
    },
    mounted() {
      this.$refs.headerMenu.setMenuIndex("5-1")
    },
    methods: {
      loadMenuContent(menuId, title) {
        this.$refs.tabsContent.addTab(menuId, title)
      },
      updateInfo(index) {
        if (index){
          this.activeIndex = index
        } else {
          this.$refs.headerMenu.updateInfo()
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        switch (key) {
          case "1":
            this.$router.push({path: '/index'})
            break
          case "2":
            break
          case "3":
            this.$router.push({path: '/login'})
            break
          case "4":
            break
          case "5-1":
            this.$router.push({path: '/main-info'})
            break
          case "5-2":
            this.exitLogin()
            break
        }
      },
      handleSOpen(key, keyPath) {
        console.log("打开：", key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log("关闭：", key, keyPath)
      }
    }
  }
</script>

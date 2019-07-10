<style>
  body {
    margin: 0px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
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
      <el-menu>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-platform-eleme"></i>导航一</template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click.native="loadMenuContent('1','选项1')">选项1</el-menu-item>
            <el-menu-item index="1-2" @click.native="loadMenuContent('2','选项2')">选项2</el-menu-item>
            <el-menu-item index="1-3" @click.native="loadMenuContent('3','选项3')">选项3</el-menu-item>
            <el-menu-item index="1-4" @click.native="loadMenuContent('4','选项4')">选项4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click.native="loadMenuContent('5','选项5')">选项5</el-menu-item>
            <el-menu-item index="2-2" @click.native="loadMenuContent('6','选项6')">选项6</el-menu-item>
            <el-menu-item index="2-3" @click.native="loadMenuContent('7','选项7')">选项7</el-menu-item>
            <el-menu-item index="2-4" @click.native="loadMenuContent('8','选项8')">选项8</el-menu-item>
            <el-menu-item index="2-5" @click.native="loadMenuContent('9','选项9')">选项9</el-menu-item>
            <el-menu-item index="2-6" @click.native="loadMenuContent('10','选项10')">选项10</el-menu-item>
            <el-menu-item index="2-7" @click.native="loadMenuContent('11','选项11')">选项11</el-menu-item>
            <el-menu-item index="2-8" @click.native="loadMenuContent('12','选项12')">选项12</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click.native="loadMenuContent('13','选项13')">选项13</el-menu-item>
            <el-menu-item index="3-2" @click.native="loadMenuContent('14','选项14')">选项14</el-menu-item>
            <el-menu-item index="3-3" @click.native="loadMenuContent('15','选项15')">选项15</el-menu-item>
            <el-menu-item index="3-4" @click.native="loadMenuContent('16','选项16')">选项16</el-menu-item>
            <el-menu-item index="3-5" @click.native="loadMenuContent('17','选项17')">选项17</el-menu-item>
            <el-menu-item index="3-3" @click.native="loadMenuContent('18','选项18')">选项18</el-menu-item>
            <el-menu-item index="3-7" @click.native="loadMenuContent('19','选项19')">选项19</el-menu-item>
            <el-menu-item index="3-8" @click.native="loadMenuContent('20','选项20')">选项20</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background-color: #ffffff;text-align: right;">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="@/assets/logo.png" class="user-photo">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>{{userName}}</el-dropdown-item>
            <el-dropdown-item>{{nickName}}</el-dropdown-item>
            <el-dropdown-item divided @click.native="exitLogin()">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main style="background-color: #DCDFE6;">
        <tabsContent ref="tabsContent"></tabsContent>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import tabsContent from '@/views/common/tabs-content.vue'
  import {Loading} from 'element-ui'

  export default {
    data() {
      return {
        bodyHeight: `${document.documentElement.clientHeight}` + 'px',
        userName: '',
        nickName: '',
        createTime: ''
      }
    },
    components: {
      'tabsContent': tabsContent
    },
    methods: {
      getLoginInfo() {
        let loading = Loading.service({fullscreen: true, text: '加载中'});
        this.$axios({
          url: '/api/user/getUserInfo',
          method: 'post',
          contentType: 'application/json;charset=utf-8'
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            const info = res.data.data
            this.userName = info.userName
            this.nickName = info.nickName
            this.createTime = info.createTime
          } else {
            this.$message.error(res.data.data)
            this.$router.push({path: '/login'})
          }
          this.$nextTick(() => {
            loading.close();
          });
        })
      },
      exitLogin() {
        this.$alert('确定注销登录吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$axios({
            url: '/api/exitLogin',
            method: 'post'
          }).then(res => {
            console.info('后台返回的数据', res.data)
            if (res.data.code === '1') {
              this.$router.push({path: '/login'})
            } else {
              this.$message.error(res.data.data)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
      },
      loadMenuContent(menuId, title) {
        this.$refs.tabsContent.addTab(menuId, title)
      }
    },
    created() {
      this.getLoginInfo()
    }
  }
</script>

<style type="text/css">
</style>
<template>
  <div>
    <div style="text-align: right;background: #545c64;min-height: 36px;">
      <headerMenu ref="headerMenu"></headerMenu>
    </div>
    <el-container>
      <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding: 20px;">
        <span>加载地域信息</span>
        <div style="border-bottom: 1px #DCDFE6 solid;margin-bottom: 30px;">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="区域">
              <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-form>
        </div>
        <span>轮播图</span>
        <div class="demo-image__preview" style="text-align: left;border-bottom: 1px #DCDFE6 solid;margin-bottom: 30px;">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList">
          </el-image>
        </div>
      </el-main>
    </el-container>

  </div>
</template>
<script type="text/javascript">
  import headerMenu from '@/views/admin/common/header-menu.vue'

  export default {
    name: 'test',
    components: {
      'headerMenu': headerMenu
    },
    data() {
      return {
        loading: true,
        formInline: {},
        value: [],
        options: [],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    },
    created() {
      this.selectRegion()
    },
    mounted() {
      this.$refs.headerMenu.setMenuIndex("2")
    },
    methods: {
      selectRegion() {
        this.GLOBAL.selectRegionJson(this)
        this.loading = false
      }
    }
  }
</script>

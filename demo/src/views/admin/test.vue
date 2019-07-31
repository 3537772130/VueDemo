<style type="text/css">
</style>
<template>
<!--  <el-container>-->
<!--    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding: 20px;">-->
<!--      <div>-->
<!--        <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--          <el-form-item label="区域">-->
<!--            <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--      <div class="demo-image__preview">-->
<!--        <el-image-->
<!--          style="width: 100px; height: 100px"-->
<!--          :src="url"-->
<!--          :preview-src-list="srcList">-->
<!--        </el-image>-->
<!--      </div>-->
<!--    </el-main>-->
<!--  </el-container>-->
  <div class="demo-image__preview">
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :preview-src-list="srcList">
    </el-image>
  </div>
</template>
<script type="text/javascript">
  // import {Loading} from 'element-ui'

  export default {
    name: 'user-login-log',
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
    },
    methods: {
      selectRegion() {
        this.GLOBAL.selectRegionJson(this)
        this.loading = false
      }
    }
  }
</script>

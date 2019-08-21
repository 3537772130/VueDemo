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
        <span>大图预览</span>
        <div class="demo-image__preview" style="text-align: left;border-bottom: 1px #DCDFE6 solid;margin-bottom: 30px;">
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList">
          </el-image>
        </div>
        <span>轮播图</span>
        <el-row>
          <el-col :span="12">
            <div class="grid-content" style="margin-right: 10px;">
              <el-divider><span>故乡的原风景</span></el-divider>
              <el-carousel :interval="3000" arrow="never" height="500px">
                <el-carousel-item v-for="img in carouselImg2" :key="img">
                  <el-image :src="img.src" style="width: 100%;height: 500px;" :title="img.title" :preview-src-list="carouselImg2"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content" style="margin-left: 10px;">
              <el-divider><span>憧憬的海岸</span></el-divider>
              <el-carousel :interval="3000" arrow="never" height="500px">
                <el-carousel-item v-for="img in carouselImg3" :key="img">
                  <img :src="img" style="width: 100%;height: 500px;">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content" style="margin-right: 10px;">
              <el-divider content-position="left"><span>华灯初上</span></el-divider>
              <el-carousel :interval="3000" arrow="never" height="500px">
                <el-carousel-item v-for="img in carouselImg4" :key="img">
                  <img :src="img" style="width: 100%;height: 500px;">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content" style="margin-left: 10px;">
              <el-divider content-position="right"><span>夜色微凉</span></el-divider>
              <el-carousel :interval="3000" arrow="never" height="500px">
                <el-carousel-item v-for="img in carouselImg5" :key="img">
                  <img :src="img" style="width: 100%;height: 500px;">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script type="text/javascript">
  import headerMenu from '@/views/common/header-menu.vue'

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
        url: '/static/images/home/computer/computer-1.jpg',
        srcList: [
          '/static/images/home/computer/computer-1.jpg',
          '/static/images/home/computer/computer-2.jpg',
          '/static/images/home/computer/computer-3.jpg',
          '/static/images/home/computer/computer-4.jpg',
          '/static/images/home/computer/computer-5.jpg',
          '/static/images/home/computer/computer-6.jpg'
        ],
        carouselImg2: [
          {src: '/static/images/home/hometown/hometown-1.jpg', title: '故乡的原风景-春'},
          {src: '/static/images/home/hometown/hometown-2.jpg', title: '故乡的原风景-夏'},
          {src: '/static/images/home/hometown/hometown-3.jpg', title: '故乡的原风景-秋'},
          {src: '/static/images/home/hometown/hometown-4.jpg', title: '故乡的原风景-冬'}
        ],
        carouselImg3: [
          '/static/images/home/sea/sea-1.jpg',
          '/static/images/home/sea/sea-2.jpg',
          '/static/images/home/sea/sea-3.jpg',
          '/static/images/home/sea/sea-4.jpg'
        ],
        carouselImg4: [
          '/static/images/home/metropolis/dusk/dusk-1.jpg',
          '/static/images/home/metropolis/dusk/dusk-2.jpg',
          '/static/images/home/metropolis/dusk/dusk-3.jpg',
          '/static/images/home/metropolis/dusk/dusk-4.jpg',
          '/static/images/home/metropolis/dusk/dusk-5.jpg'
        ],
        carouselImg5: [
          '/static/images/home/metropolis/night/night-1.jpg',
          '/static/images/home/metropolis/night/night-2.jpg',
          '/static/images/home/metropolis/night/night-3.jpg',
          '/static/images/home/metropolis/night/night-4.jpg',
          '/static/images/home/metropolis/night/night-5.jpg'
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
      },
      handleChange(res){
        console.info('选择的信息是：', res)
      },
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #545c64;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .top-menu {
    text-align: right;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;

    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .back-top {
    width: 46px;
    height: 46px;
    line-height: 46px;
    border-radius: 23px;
    background-color: #e5e9f2;
    color: #FFFFFF;
    font-size: 26px;
    position: fixed;
    right: 40px;
    bottom: 100px;
    z-index: 999;
  }

  .back-top:hover {
    border: 1px #303133 solid;
    background-color: #303133;
  }
</style>
<template>
  <div>
    <el-row style="margin-bottom: 0px;">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark top-menu">
          <headerMenu></headerMenu>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding-top: 20px;background-image: url('/static/images/home/timg.jpg');">
      <el-col :span="24">
        <el-carousel :interval="5000" arrow="never" type="card" height="600px">
          <el-carousel-item v-for="img in carouselImg1" :key="img">
            <img :src="img" style="width: 100%;height: 600px;">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content" style="margin-right: 10px;">
          <el-divider><span>故乡的原风景</span></el-divider>
          <el-carousel :interval="3000" arrow="never" height="500px">
            <el-carousel-item v-for="img in carouselImg2" :key="img">
              <img :src="img" style="width: 100%;height: 500px;">
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
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple" style="text-align: center;height: 250px;">
          <img src="/static/home/chun.jpg" style="width: 300px;height: 250px;">
        </div>
      </el-col>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light" style="text-align: center;height: 250px;">
          <img src="/static/home/xia.jpg" style="width: 300px;height: 250px;">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" style="text-align: center;height: 250px;">
          <img src="/static/home/qiu.jpg" style="width: 300px;height: 250px;">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light" style="text-align: center;height: 250px;">
          <img src="/static/home/dong.jpg" style="width: 300px;height: 250px;">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <div class="back-top" v-if="backTopStatus" @click="backTop">
      <el-tooltip effect="dark" content="回到顶部" placement="bottom" visible-arrow="false">
        <i class="el-icon-top"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import headerMenu from '@/views/admin/common/header-menu.vue'

  export default {
    name: 'index',
    components: {
      'headerMenu': headerMenu
    },
    data() {
      return {
        paneHeight: `${document.documentElement.clientHeight / 2}`,
        backTopStatus: false,
        carouselImg1: [
          '/static/images/home/computer/computer-1.jpg',
          '/static/images/home/computer/computer-2.jpg',
          '/static/images/home/computer/computer-3.jpg',
          '/static/images/home/computer/computer-4.jpg',
          '/static/images/home/computer/computer-5.jpg',
          '/static/images/home/computer/computer-6.jpg'
        ],
        carouselImg2: [
          '/static/images/home/hometown/hometown-1.jpg',
          '/static/images/home/hometown/hometown-2.jpg',
          '/static/images/home/hometown/hometown-3.jpg',
          '/static/images/home/hometown/hometown-4.jpg'
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

    },
    mounted() {
      window.addEventListener('scroll', this.scrollTop)
    },
    methods: {
      scrollTop() {
        let scroll = document.documentElement.scrollTop || document.body.scrollTop
        let height = document.documentElement.clientHeight
        if (scroll > height / 2) {
          this.backTopStatus = true
        } else {
          this.backTopStatus = false
        }
      },
      backTop() {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
    }
  }
</script>

<style scoped>

</style>

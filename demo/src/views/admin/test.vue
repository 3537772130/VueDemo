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
        <span>千层饼图</span>
        <div id="multiLayerCake" style="width: 800px;height: 500px;border:1px solid rgb(180,180,180);"></div>
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
      this.$nextTick(function () {
        this.drawMultiLayerCake()
      })
    },
    methods: {
      selectRegion() {
        this.GLOBAL.selectRegionJson(this)
        this.loading = false
      },
      handleChange(res){
        console.info('选择的信息是：', res)
      },
      drawMultiLayerCake() {
        let myChart = this.$echarts.init(document.getElementById('multiLayerCake'))
        myChart.setOption({
          title: {
            text: '浏览器占比变化',
            subtext: '纯属虚构',
            x: 'right',
            y: 'bottom'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['Chrome', 'Firefox', 'Safari', 'IE9+', 'IE8-']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: false,
          series: (function () {
            let series = []
            for (let i = 0; i < 30; i++) {
              series.push({
                name: '浏览器（数据纯属虚构）',
                type: 'pie',
                itemStyle: {
                  normal: {
                    label: {show: i > 28},
                    labelLine: {show: i > 28, length: 20}
                  }
                },
                radius: [i * 4 + 40, i * 4 + 43],
                data: [
                  {value: i * 128 + 80, name: 'Chrome'},
                  {value: i * 64 + 160, name: 'Firefox'},
                  {value: i * 32 + 320, name: 'Safari'},
                  {value: i * 16 + 640, name: 'IE9+'},
                  {value: i * 8 + 1280, name: 'IE8-'}
                ]
              })
            }
            series[0].markPoint = {
              symbol: 'emptyCircle',
              symbolSize: series[0].radius[0],
              effect: {show: true, scaleSize: 12, color: 'rgba(250,225,50,0.8)', shadowBlur: 10, period: 30},
              data: [{x: '50%', y: '50%'}]
            }
            return series
          })
        })
        setTimeout(function () {
          let _ZR = myChart.getZrender()
          // let TextShape = require('zrender/shape/Text')
          // 补充千层饼
          _ZR.addShape(new TextShape({
            style: {
              x: _ZR.getWidth() / 2,
              y: _ZR.getHeight() / 2,
              color: '#666',
              text: '恶梦的过去',
              textAlign: 'center'
            }
          }))
          _ZR.addShape(new TextShape({
            style: {
              x: _ZR.getWidth() / 2 + 200,
              y: _ZR.getHeight() / 2,
              brushType: 'fill',
              color: 'orange',
              text: '美好的未来',
              textAlign: 'left',
              textFont: 'normal 20px 微软雅黑'
            }
          }))
          _ZR.refresh()
        }, 2000)
      }
    }
  }
</script>

<style type="text/css">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
<template>
  <div style="text-align: left;">
    <div style="text-align: right;background: #545c64;min-height: 36px;">
      <headerMenu ref="headerMenu"></headerMenu>
    </div>
    <div id="hollowCircle" style="width: 500px;height: 500px;display: inline-block;"></div>
    <div id="cake" style="width: 500px;height: 500px;border:1px solid rgb(180,180,180);display: inline-block;"></div>
    <div></div>
    <div id="column" style="width: 500px;height: 300px;display: inline-block;"></div>
    <div id="lines" style="width: 500px;height: 300px;display: inline-block;"></div>
    <div id="line" style="width: 500px;height: 300px;display: inline-block;"></div>
    <div></div>
    <div id="chartMap" style="width: 100%;height: 800px;"></div>
  </div>
</template>
<script type="text/javascript">
  import headerMenu from '@/views/common/header-menu.vue'
  import china from '../../../static/js/echarts/china.js'

  export default {
    name: 'echarts',
    components: {
      'headerMenu': headerMenu
    },
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      this.$refs.headerMenu.setMenuIndex("6")
      this.$nextTick(function () {
        this.drawHollowCircle()
        this.drawColumn()
        this.drawCake()
        this.drawLines()
        this.drawLine()
        this.drawChartMap()
      })
    },
    methods: {
      drawHollowCircle() {
        let myChart = this.$echarts.init(document.getElementById('hollowCircle'))
        myChart.setOption({
          title: {text: '空心圆比例图'},
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            }
          ]
        })
      },
      drawColumn() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('column'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '柱形图',
            x: 'center',
            y: 'top',
            textStyle: {
              //文字颜色
              color: '#ccc',
              //字体风格,'normal','italic','oblique'
              fontStyle: 'normal',
              //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
              fontWeight: 'bold',
              //字体系列
              fontFamily: 'sans-serif',
              //字体大小
              fontSize: 18
            }
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      drawCake() {
        let cake = this.$echarts.init(document.getElementById('cake'))
        // 绘制图表
        cake.setOption({
          //需要的话下面内容copy到主体代码块即可
          backgroundColor: '#45515a',
          //标题
          title: {
            text: '流量来源',
            subtext: '饼图示例',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc',
              fontStyle: 'italic'//标题字体
            }
          },
          //弹窗，响应鼠标指向，显示具体细节
          tooltip: {
            trigger: 'item',//以具体项目触发弹窗
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          //图例，选择要显示的项目
          legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
              color: '#c8c8d0'
            },
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']  //注意要和数据的name相对应
          },
          //工具箱
          toolbox: {
            show: true,//显示工具箱
            feature: {
              dataView: {show: true}, //以文字形式显示数据
              restore: {show: true},   //还原
              //dataZoom:{show:true}, //区域缩放
              saveAsImage: {show: true},  //保存图片
              //magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
            }
          },
          //视觉映射组件，将数据映射到视觉元素上
          visualMap: {
            show: false,
            min: 10,
            max: 650,
            dimension: 0, //选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
            // seriesIndex: 4, //选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
            inRange: {
              //选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
              color: ['red'],
              colorLightness: [0, 1],
              colorSaturation: [0, 1]
            }
          },
          //数据
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 274, name: '联盟广告'},
                {value: 235, name: '视频广告'},
                {value: 400, name: '搜索引擎'}
              ].sort(function (a, b) {
                return a.value - b.value
              }),
              roseType: 'radius',//角度和半径展现百分比，'area'只用半径展现
              label: { //饼图图形的文本标签
                normal: {  //下同，normal指在普通情况下样式，而非高亮时样式
                  textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              },
              labelLine: {  //引导线样式
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.5, //0-1，越大越平滑弯曲
                  length: 10,  //从块到文字的第一段长
                  length2: 20  //拐弯到文字的段长
                }
              },
              itemStyle: { //图例样式
                normal: {
                  color: '#97413c',
                  shadowBlur: 50,//阴影模糊程度
                  shadowColor: 'rgba(0, 0, 0, 0.5)'//阴影颜色，一般黑
                }
              },

              animationType: 'scale', //初始动画效果，scale是缩放，expansion是展开
              animationEasing: 'elasticOut', //初始动画缓动效果
              animationDelay: function (idx) {  //数据更新动画时长，idx限定了每个数据块从无到有的速度
                return Math.random() * 200
              }
            }
          ]
        })
      },
      drawLines() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('lines'))
        // 绘制图表，this.echarts1_option是数据
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            y: 'bottom',
            x: 'center',
            data: ['A股', 'B股', 'C股']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'A股',
              type: 'line',
              stack: '总量',
              data: [3, 54, 65, 43, 24, 5, 31]
            },
            {
              name: 'B股',
              type: 'line',
              stack: '总量',
              data: [43, 5, 33, 23, 54, 53, 42]
            },
            {
              name: 'C股',
              type: 'line',
              stack: '总量',
              data: [2, 45, 42, 23, 34, 3, 22]
            }
          ]
        })
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('line'))
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            y: 'bottom',
            x: 'center',
            data: ['A股']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'A股',
              type: 'line',
              stack: '总量',
              data: [3, 54, 65, 43, 24, 5, 31]
            }
          ]
        })
      },
      drawChartMap() {
        let myChart = this.$echarts.init(document.getElementById('chartMap'))
        // 地图上数据,经度和纬度，最后一个是销量，或者说你要统计的当地数据个数，这些都是后台返给你的你想在哪显示就在哪显示
        let myData = [
          {name: '分店1', value: [121.15, 31.89, 90]},
          {name: '分店2', value: [109.781327, 39.608266, 120]},
          {name: '分店3', value: [120.38, 37.35, 142]},
          {name: '分店4', value: [122.207216, 29.985295, 123]},
          {name: '分店5', value: [110.245672, 30.7787677, 566]}
        ]

        myChart.setOption({
          // 新建一个地理坐标系 geo ，
          geo: {
            map: 'china',//地图类型为中国地图,要是世界那就是world,要是省市区：例如beijing、shanghai
            itemStyle: { // 定义样式
              normal: {       // 普通状态下的样式
                areaColor: '#6699CC',
                borderColor: '#fff',
              },
              emphasis: {         // 高亮状态下的样式
                areaColor: '#e9fbf1'
              }
            }

          },
          // hover显示目标数据
          tooltip: {
            trigger: 'item',
            // tooltip的trigger的值可以有'item'、'axis'。
            //'item':数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            //'axis':坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
            textStyle: {
              align: 'left'
            },
          },
          // 图表背景色
          backgroundColor: '#404a59',
          // 标志颜色
          color: 'red',
          // 新建散点图series
          series: [{
            name: '',//series名称
            type: 'scatter',//为散点类型
            coordinateSystem: 'geo',// series坐标系类型
            data: myData,
            symbol: 'pin',
            symbolSize: [20, 20]
          }],

          // 添加视觉映射组件
          visualMap: {
            type: 'continuous', // 连续型
            min: 0,           // 值域最小值，必须参数
            max: 600,     // 值域最大值，必须参数
            calculable: true, // 是否启用值域漫游
            inRange: {
              color: ['red']
              // 指定数值从低到高时的颜色变化
            },
            textStyle: {
              color: '#fff' // 值域控件的文本颜色
            }
          }
        })
      }
    }
  }
</script>

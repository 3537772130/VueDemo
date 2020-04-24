<style>
  @import "../../static/css/index-style.css";
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

    <el-row style="padding-top: 20px;background-image: url('/static/images/background/timg.jpg');">
      <el-col :span="24">
        <el-carousel :interval="3000" arrow="never" type="card" height="600px">
          <el-carousel-item v-for="(img, index) in carouselImg1" :key="index">
            <img :src="img" style="width: 100%;height: 600px;">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-row style="padding-top: 100px;">
      <el-col :span="24">
        <div class="grid-content" style="height: 600px;">
          <el-divider><span class="server-title">客户至上 , 我们致力于服务</span></el-divider>
          <div class="server-describe">设计精美和易于修改是AppletSite的两大特点</div>
          <div class="server-introduce">
            <div class="introduce">
              <div class="img"><img src="/static/images/icon/qq.png"></div>
              <div class="text">利用企业QQ提供在线解答<br/>帮助企业快速准确解决问题和故障</div>
            </div>
            <div class="introduce">
              <div class="img"><img src="/static/images/icon/customer-service.png"></div>
              <div class="text">由专业客服提供人工服务<br/>负责疑难问题和故障受理</div>
            </div>
            <div class="introduce">
              <div class="img"><img src="/static/images/icon/long-range.png"></div>
              <div class="text">利用远程视频工具，提供协助<br/>帮助客户进行调试、解决故障</div>
            </div>
            <div class="introduce">
              <div class="img"><img src="/static/images/icon/handle.png"></div>
              <div class="text">由技术支持工程师<br/>负责问题解答、需求受理及故障受理</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="advantage">
      <el-col :span="24">
        <div class="grid-content" style="height: 800px;">
          <el-divider><span class="advantage-title">平台三大优势</span></el-divider>
          <div class="advantage-describe">无与伦比的设计感是AppletSite为您带来的一份承诺</div>
          <div class="advantage-introduce">
            <div class="introduce">
              <div class="img"><img src="/static/images/icon/computer.png"></div>
              <div class="text">响应式创建</div>
            </div>
            <div class="introduce">
              <div class="img"><img src="/static/images/icon/mobile-phone.png"></div>
              <div class="text">自助创建</div>
            </div>
            <div class="introduce">
              <div class="img"><img src="/static/images/icon/editor.png"></div>
              <div class="text">无需编程</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="product">
      <el-col :span="24">
        <div class="grid-content" style="height: 900px;text-align: center;">
          <div class="product-title">功能多样满足您的各项需求</div>
          <div class="product-describe">您需要的就是我们追求的，没有最好，只有更好</div>
          <div class="product-register">
            <div>现在注册 GO</div>
          </div>
          <div class="product-img">
            <img src="/static/images/home/business/business-affairs-2.jpg">
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="team">
      <el-col :span="24">
        <div class="grid-content" style="height: 600px;text-align: center;position: relative;top: -180px;">
          <el-divider><span class="team-title">原创团队</span></el-divider>
          <div class="team-describe">一路携手，同舟共雨，砥砺前行</div>
          <div class="team-introduce">
            <el-carousel indicator-position="outside" :interval="5000" arrow="never" height="280"
                         style="width: 900px;margin: auto;text-align: left;background-color: #FFFFFF;">
              <el-carousel-item v-for="(team, index) in teams" :key="index" style="background-color: #FFFFFF;">
                <div style="width: 240px;height: 280px;display: inline-block;text-align: center;">
                  <img class="team-introduce-img" :src="team.avatar">
                </div>
                <div style="width: 620px;height: 280px;display: inline-block;">
                  <div style="height: 70px;"></div>
                  <div style="height: 180px;font-size: 14px;color: rgb(102, 102, 102);">
                    <div style="height: 130px;text-indent: 2em;">{{team.introduce}}</div>
                    <div style="color: #ef4f19;">
                      <span style="font-size: 22px">{{team.name}}</span>&nbsp;&nbsp;({{team.position}})
                    </div>
                  </div>
                  <div style="height: 50px;"></div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="recommend">
      <el-col :span="24">
        <div class="grid-content" style="height: 400px;text-align: center;position: relative;top: -130px;">
          <div class="recommend-title">拥有一个小程序或仅是尝试一下新的想法</div>
          <div class="recommend-describe">流线式网页布局设计方案，可视化图文内容编辑模式，它让小程序制作和维护成为一件轻松惬意的事</div>
          <div class="recommend-button">
            <div>马上体验</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <div style="height: 220px;background-color: #545c64;">

    </div>
    <div class="back-top" v-if="backTopStatus" @click="backTop">
      <el-tooltip effect="dark" content="回到顶部" placement="bottom" visible-arrow="false">
        <i class="el-icon-top"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
    import headerMenu from '@/views/common/header-menu.vue'

    export default {
        name: 'index',
        components: {
            'headerMenu': headerMenu
        },
        data () {
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
                teams: [
                    {
                        name: '周XX',
                        introduce: 'AppletSite是响应式建站专家，拥有全球最领先的屏幕界面智能识别技术，实现所有建站功能组件在多种屏幕下的完美呈现，真正让您的桌面/平板/手机3个网站同步生成，还可连接微信公众平台，创建您的微站。当今最领先的响应式自助建站平台，我们的流线式网页布局设计方案和可视化图文内容编辑模式让网站制作和维护成为一件轻松惬意的事。无论您是普通互联网用户， 还是专业网站制作人员，都能使用起飞页设计出最具专业水准的网站。',
                        position: 'XX经理',
                        avatar: '/static/images/user/default-avatar.jpeg'
                    },
                    {
                        name: '赵XX',
                        introduce: 'AppletSite是响应式建站专家，拥有全球最领先的屏幕界面智能识别技术，实现所有建站功能组件在多种屏幕下的完美呈现，真正让您的桌面/平板/手机3个网站同步生成，还可连接微信公众平台，创建您的微站。当今最领先的响应式自助建站平台，我们的流线式网页布局设计方案和可视化图文内容编辑模式让网站制作和维护成为一件轻松惬意的事。无论您是普通互联网用户， 还是专业网站制作人员，都能使用起飞页设计出最具专业水准的网站。',
                        position: 'XX负责人',
                        avatar: '/static/images/user/default-avatar.jpeg'
                    }
                ]
            }
        },
        created () {
        },
        mounted () {
            window.addEventListener('scroll', this.scrollTop)
        },
        methods: {
            scrollTop () {
                let scroll = document.documentElement.scrollTop || document.body.scrollTop
                let height = document.documentElement.clientHeight
                if (scroll > height / 2) {
                    this.backTopStatus = true
                } else {
                    this.backTopStatus = false
                }
            },
            backTop () {
                document.documentElement.scrollTop = 0
                document.body.scrollTop = 0
            }
        }
    }
</script>

<style scoped>

</style>

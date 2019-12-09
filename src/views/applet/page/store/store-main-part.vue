<style file="text/css">
  @import "../../../../../static/css/page/store/store-main-part.css";
</style>
<template>
  <div>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF; padding: 0px 20px;">
      <el-form class="store-main-part-form">
        <div class="store-main-part" v-for="(item, pIndex) in partList" :key="pIndex">
          <div v-if="partIndex === pIndex && item.id === 'notice-bar'">
            <el-form-item label="通知内容" prop="elementLogo">
              <el-input type="textarea" v-model="item.textContent" :show-word-limit="true" maxlength="60"
                        resize="none" rows="5" placeholder="请输入通知内容" class="part-input"></el-input>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'img-carousel'">
            <table style="width: 400px;">
              <tr v-for="(car, index) in item.list" :key="index">
                <td style="width: 20px;">
                  <el-badge value="×" class="item img-carousel-badge" @click.native="delData(index, car.icon)">
                  </el-badge>
                </td>
                <td>
                  <el-form-item label="" style="margin-bottom: 0px;">
                    <el-upload
                      class="img-carousel-uploader"
                      action="/api/manage/applet/page/uploadAppletPageImage"
                      name="image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" :data="{'pIndex': pIndex,'index': index,'icon': car.icon}">
                      <img v-if="car.icon" :src="car.icon" class="img-carousel" style="width: 244px;height: 95px;">
                      <i v-else class="el-icon-plus img-carousel-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" :src="car.goodsIcon"
                            v-if="car.goodsId != ''" @click="loadPartChoose(pIndex, index, 1)"
                            style="border-radius: 5px;"></el-image>
                  <div class="add-goods" v-if="car.goodsId === ''" @click="loadPartChoose(pIndex, index, 1)">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.list.length < 5">
                <td></td>
                <td>
                  <el-form-item label=" ">
                    <el-upload
                      class="img-carousel-uploader"
                      action="/api/manage/applet/page/uploadAppletPageImage"
                      name="image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" :data="{'pIndex': pIndex}">
                      <i class="el-icon-plus img-carousel-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'type-frame-three'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <div class="type-three-element" v-for="(type, index) in item.list" :key="index">
                <div @click="loadPartChoose(pIndex, index, 2)">
                  <div class="type-icon-div">
                    <el-image :src="type.icon" style="width: 60px;height: 60px;"></el-image>
                  </div>
                  <span class="type-name">{{type.name}}</span>
                </div>
                <el-badge value="×" class="item type-frame-three-badge" @click.native="delData(index)"></el-badge>
              </div>
              <div class="type-three-element" v-if="item.list.length < 12" @click="loadPartChoose(pIndex, null, 2)">
                <div>
                  <div class="type-icon-div">
                    <el-image src="/static/images/icon/add.png" style="width: 60px;height: 60px;"></el-image>
                  </div>
                  <span class="type-name" style="color: #cdcdcd;">添加</span>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'type-frame-four'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <div class="type-four-element" v-for="(type, index) in item.list" :key="index">
                <div @click="loadPartChoose(pIndex, index, 2)">
                  <div class="type-icon-div">
                    <el-image :src="type.icon" style="width: 40px;height: 40px;"></el-image>
                  </div>
                  <span class="type-name">{{type.name}}</span>
                </div>
                <el-badge value="×" class="item type-frame-four-badge" @click.native="delData(index)"></el-badge>
              </div>
              <div class="type-four-element" v-if="item.list.length < 12" @click="loadPartChoose(pIndex, null, 2)">
                <div>
                  <div class="type-icon-div">
                    <el-image src="/static/images/icon/add.png" style="width: 40px;height: 40px;"></el-image>
                  </div>
                  <span class="type-name" style="color: #cdcdcd;">添加</span>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'img-text-title'">
            <el-form-item label="图标">
              <el-upload
                class="img-text-title-uploader"
                action="/api/manage/applet/page/uploadAppletPageImage"
                name="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload" :data="{'pIndex': pIndex,'index': 0,'icon': item.list[0].icon}">
                <img v-if="item.list[0].icon" :src="item.list[0].icon" class="img-text-title">
                <i v-else class="el-icon-plus img-text-title-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="item.title" maxlength="10" placeholder="请输入图文标题" class="part-input"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="item.describe" maxlength="10" placeholder="请输入图文标题" class="part-input"></el-input>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'img-title'">
            <table style="width: 400px;">
              <tr v-if="item.icon != ''">
                <td style="width: 20px;">
                  <el-badge value="×" class="item img-carousel-badge" @click.native="delData(index)">
                  </el-badge>
                </td>
                <td>
                  <el-form-item label="">
                    <el-upload
                      class="img-carousel-uploader"
                      action="/api/manage/applet/page/uploadAppletPageImage"
                      name="image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :data="{'pIndex': pIndex,'index': 0,'icon': item.list[0].icon}">
                      <img v-if="item.list[0].icon" :src="item.list[0].icon" class="img-carousel"
                           style="width: 244px;height: 95px;">
                      <i v-else class="el-icon-plus img-carousel-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" :src="item.list[0].goodsIcon"
                            v-if="item.list[0].goodsId != ''" @click="loadPartChoose(pIndex, 0, 1)"
                            style="position: relative;top: -10px;border-radius: 5px;"></el-image>
                  <div class="add-goods" style="top: -13px" v-if="item.list[0].goodsId === ''"
                       @click="loadPartChoose(pIndex, 0, 1)">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.icon === ''">
                <td>
                  <el-form-item label=" ">
                    <el-upload
                      class="img-title-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" data-id="">
                      <img v-if="imageUrl" :src="imageUrl" class="img-title">
                      <i v-else class="el-icon-plus img-title-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'divider-title'">
            <el-form-item label="标题" prop="title">
              <el-input v-model="item.title" maxlength="12" placeholder="请输入标题" class="part-input"></el-input>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goods-two-row'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <div class="goods-two-element" v-for="(type, index) in item.list" :key="index">
                <div @click="loadPartChoose(pIndex, index, 3)">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon" style="width: 140px;height: 140px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
                <el-badge value="×" class="item goods-two-badge" @click.native="delData(index)"></el-badge>
              </div>
              <div class="goods-two-element" v-if="item.list.length < 10">
                <div @click="loadPartChoose(pIndex, null, 3)">
                  <div class="goods-icon-div" style="width: 140px;height: 140px;line-height: 140px; margin: auto;">
                    <el-image src="/static/images/icon/add.png"
                              style="width: 40px;height: 40px;margin: auto;padding-top: 50px;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goods-three-row'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <div class="goods-three-element" v-for="(type, index) in item.list" :key="index">
                <div @click="loadPartChoose(pIndex, index, 3)">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon" style="width: 95px;height: 95px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
                <el-badge value="×" class="item goods-three-badge" @click.native="delData(index)"></el-badge>
              </div>
              <div class="goods-three-element" v-if="item.list.length < 12">
                <div @click="loadPartChoose(pIndex, null, 3)">
                  <div class="goods-icon-div" style="width: 95px;height: 95px;line-height: 95px; margin: auto;">
                    <el-image src="/static/images/icon/add.png"
                              style="width: 40px;height: 40px;margin: auto;padding-top: 30px;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'imgX-scroll'">
            <table style="width: 400px;">
              <tr v-for="(img, index) in item.list" :key="index">
                <td style="width: 20px;">
                  <el-badge value="×" class="item img-carousel-badge" @click.native="delData(index, img.icon)">
                  </el-badge>
                </td>
                <td>
                  <el-form-item label="" style="margin-bottom: 0px;">
                    <el-upload
                      class="img-carousel-uploader"
                      action="/api/manage/applet/page/uploadAppletPageImage"
                      name="image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" :data="{'pIndex': pIndex,'index': index,'icon': img.icon}">
                      <img v-if="img.icon" :src="img.icon" class="img-carousel"
                           style="width: 244px;height: 95px;border-radius: 5px;">
                      <i v-else class="el-icon-plus img-carousel-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" :src="img.goodsIcon"
                            v-if="img.goodsId != ''" @click="loadPartChoose(pIndex, index, 1)"
                            style="border-radius: 5px;"></el-image>
                  <div class="add-goods" v-if="img.goodsId === ''" @click="loadPartChoose(pIndex, index, 1)">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.list.length < 10">
                <td></td>
                <td>
                  <el-form-item label=" " style="margin-bottom: 0px;">
                    <el-upload
                      class="imgX-scroll-uploader"
                      action="/api/manage/applet/page/uploadAppletPageImage"
                      name="image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" :data="{'pIndex': pIndex}">
                      <i class="el-icon-plus imgX-scroll-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'imgY-scroll'">
            <table style="width: 400px;">
              <tr style="width: 375px;" v-for="(img, index) in item.list" :key="index">
                <td style="width: 20px;">
                  <el-badge value="×" class="item img-carousel-badge" @click.native="delData(index, img.icon)">
                  </el-badge>
                </td>
                <td style="width: 130px;">
                  <el-form-item label="" style="margin-bottom: 0px;text-align: center;">
                    <el-upload
                      class="img-carousel-uploader"
                      action="/api/manage/applet/page/uploadAppletPageImage"
                      name="image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" :data="{'pIndex': pIndex,'index': index,'icon': img.icon}">
                      <img v-if="img.icon" :src="img.icon" class="img-carousel"
                           style="width: 120px;height: 220px;border-radius: 5px;">
                      <i v-else class="el-icon-plus img-carousel-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td class="bind-goods">
                  <el-image class="goods-img" :src="img.goodsIcon"
                            v-if="img.goodsId != ''" @click="loadPartChoose(pIndex, index, 1)"
                            style="border-radius: 5px;"></el-image>
                  <div class="add-goods" v-if="img.goodsId === ''" @click="loadPartChoose(pIndex, index, 1)">
                    <el-image class="goods-icon" src="/static/images/icon/add.png"></el-image>
                    <div class="goods-text">绑定商品</div>
                  </div>
                </td>
              </tr>
              <tr v-if="item.list.length < 10">
                <td></td>
                <td>
                  <el-form-item label="" style="margin-bottom: 0px;text-align: center;">
                    <el-upload
                      class="imgY-scroll-uploader"
                      action="/api/manage/applet/page/uploadAppletPageImage"
                      name="image"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload" :data="{'pIndex': pIndex}">
                      <i class="el-icon-plus imgY-scroll-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goodsY-scroll'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <div class="goods-two-element" v-for="(type, index) in item.list" :key="index">
                <div @click="loadPartChoose(pIndex, index, 3)">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon"
                              style="width: 140px;height: 140px;border-radius: 10px 10px 0px 0px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
                <el-badge value="×" class="item goods-two-badge" @click.native="delData(index)"></el-badge>
              </div>
              <div class="goods-two-element" v-if="item.list.length < 10">
                <div @click="loadPartChoose(pIndex, null, 3)">
                  <div class="goods-icon-div" style="width: 140px;height: 140px;line-height: 140px; margin: auto;">
                    <el-image src="/static/images/icon/add.png"
                              style="width: 40px;height: 40px;margin: auto;padding-top: 50px;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-if="partIndex === pIndex && item.id === 'goodsX-scroll'">
            <el-form-item label=" " style="margin-bottom: 0px; width: 375px;">
              <div class="goods-two-element" v-for="(type, index) in item.list" :key="index">
                <div @click="loadPartChoose(pIndex, index, 4)">
                  <div class="goods-icon-div">
                    <el-image :src="type.icon" style="width: 140px;height: 140px;border-radius: 5px;"></el-image>
                  </div>
                  <div class="goods-name">{{type.name}}</div>
                </div>
                <el-badge value="×" class="item goods-two-badge" @click.native="delData(index)"></el-badge>
              </div>
              <div class="goods-two-element" v-if="item.list.length < 10">
                <div @click="loadPartChoose(pIndex, null, 4)">
                  <div class="goods-icon-div" style="width: 140px;height: 140px;line-height: 140px; margin: auto;">
                    <el-image src="/static/images/icon/add.png"
                              style="width: 40px;height: 40px;margin: auto;"></el-image>
                  </div>
                  <span class="goods-name" style="color: #cdcdcd;text-align: center;">添加商品</span>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <el-form-item label=" " style="margin-top: 20px;">
          <div class="part-operation">
            <el-divider content-position="left">操作元素</el-divider>
            <el-button type="danger" class="part-button" @click="delElement()">
              <i class="el-icon-close"></i>&nbsp;删除
            </el-button>
          </div>
          <div class="part-operation">
            <el-divider content-position="left">移动元素</el-divider>
            <el-button type="success" class="part-button" @click="moveIndex(-1)">
              <i class="el-icon-caret-top"></i>&nbsp;上移
            </el-button>
            <el-button type="success" class="part-button" @click="moveIndex(1)">
              <i class="el-icon-caret-bottom"></i>&nbsp;下移
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <el-dialog :title="listTitle" :visible.sync="listShow" class="part-choose-dialog"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <StoreChoose ref="StoreChoose" v-on:refreshSet="refreshSet"></StoreChoose>
      </el-dialog>
    </el-main>
  </div>
</template>
<script file="text/javascript">
    import {Loading} from 'element-ui'
    import StoreChoose from '@/views/applet/page/store/store-choose.vue'

    export default {
        name: 'store-main-part',
        components: {
            'StoreChoose': StoreChoose
        },
        data () {
            return {
                loading: false,
                partIndex: 0,
                partList: [],
                goodsSearchRules: {
                    elementLogo: [
                        {required: true, message: '请输入元素标识', trigger: 'blur'},
                        {file: 'string', min: 1, max: 30, message: '元素标识长度为1-30个字符', trigger: 'blur'}
                    ]
                },
                listTitle: '',
                listShow: false
            }
        },
        created () {
            this.loadPart()
        },
        mounted () {
        },
        methods: {
            loadPart () {
                this.partIndex = parseInt(this.$cookies.get('store_main_part_index'))
                this.partList = this.$part.getPartList()
            },
            handleAvatarSuccess (res, file) {
                if (res.code === '1') {
                    let pIndex = res.data.pIndex
                    let index = res.data.index
                    let icon = res.data.icon
                    let list = this.partList[pIndex].list
                    if (index != null && index >= 0) {
                        list[index].icon = icon
                    } else {
                        let info = {
                            'goodsId': '',
                            'goodsIcon': '',
                            'icon': icon
                        }
                        list.push(info)
                    }
                    this.$emit('refreshSet', true, pIndex)
                } else {
                    this.$message.error('上传失败')
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, {'code': res.data})
            },
            beforeAvatarUpload (file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'image/png,image/jpeg'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 5

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 5MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            },
            delData (index, icon) {
                this.$confirm('确定删除参数吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let list = []
                    for (let k = 0; k < this.partList.length; k++) {
                        let part = this.partList[k]
                        if (k === this.partIndex) {
                            let list1 = []
                            for (let i = 0; i < part.list.length; i++) {
                                if (i != index) {
                                    list1.push(part.list[i])
                                }
                            }
                            part.list = list1
                        }
                        list.push(part)
                    }
                    this.partList = list
                    this.useElement(list, true, this.partIndex)

                    this.$axios({
                        url: '/api/manage/applet/page/deleteAppletPageImage',
                        method: 'post',
                        data: {icon: icon}
                    })
                })
            },
            delElement () {
                this.$confirm('确定删除元素吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let list = []
                    for (let i = 0; i < this.partList.length; i++) {
                        if (i != this.partIndex) {
                            list.push(this.partList[i])
                        }
                    }
                    this.partIndex = null
                    this.useElement(list, false, this.partIndex)
                })
            },
            moveIndex (num) {
                if ((num < 0 && this.partIndex > 0) || (num > 0 && this.partIndex < (this.partList.length - 1))) {
                    let list = []
                    let part1 = this.partList[this.partIndex]
                    let part2 = this.partList[(num + this.partIndex)]
                    for (let i = 0; i < this.partList.length; i++) {
                        let obj = {}
                        if (this.partIndex === i) {
                            obj = part2
                        } else if ((num + this.partIndex) === i) {
                            obj = part1
                        } else {
                            obj = this.partList[i]
                        }
                        list.push(obj)
                    }
                    this.partIndex = this.partIndex + num
                    this.useElement(list, true, this.partIndex)
                } else {
                    this.$message.warning('不能再移动啦')
                }
            },
            useElement (list, bool, index) {
                this.partList = list
                this.$part.setPartList(this.partList)
                this.$emit('refreshSet', bool, index)
            },
            loadPartChoose (pIndex, index, type) {
                if (type === 1) {
                    this.listTitle = '商品列表'
                } else {
                    this.listTitle = '商品分类列表'
                }
                this.listShow = true
                this.$cookies.set('pIndex', pIndex)
                this.$cookies.set('sIndex', index)
                this.$cookies.set('bType', type)
                try {
                    this.$refs.StoreChoose.loadList(type)
                } catch (e) {
                }
            },
            refreshSet (id, name, icon, minPrice, maxPrice, type) {
                this.listShow = false
                let pIndex = this.$cookies.get('pIndex')
                let sIndex = this.$cookies.get('sIndex')
                let part = this.partList[pIndex]
                let list = part.list
                if (parseInt(type) === 1) {
                    //图片标题、工具绑定商品
                    list[sIndex].goodsId = id
                    list[sIndex].goodsIcon = icon
                } else if (parseInt(type) === 2) {
                    //选择商品分类进行绑定
                    if (sIndex === 'null') {
                        //新增
                        const info = {
                            'id': id,
                            'name': name,
                            'icon': icon
                        }
                        list.push(info)
                    } else {
                        //修改
                        list[sIndex] = {
                            'id': id,
                            'name': name,
                            'icon': icon
                        }
                    }
                } else if (parseInt(type) === 3 || parseInt(type) === 4) {
                    //选择商品进行绑定
                    if (sIndex === 'null') {
                        //新增
                        const info = {
                            'id': id,
                            'name': name,
                            'minPrice': minPrice,
                            'maxPrice': maxPrice,
                            'icon': icon
                        }
                        list.push(info)
                    } else {
                        //修改
                        list[sIndex] = {
                            'id': id,
                            'name': name,
                            'minPrice': minPrice,
                            'maxPrice': maxPrice,
                            'icon': icon
                        }
                    }
                }
                this.$emit('refreshSet', true, pIndex)
                this.$cookies.remove('pIndex')
                this.$cookies.remove('sIndex')
            }
        }
    }
</script>

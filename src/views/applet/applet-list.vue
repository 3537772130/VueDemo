<style type="text/css">
  .applet-list-input {
    width: 190px;
  }

  .applet-list-dialog .el-dialog {
    width: 700px;
  }

  .applet-list-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }

  .applet-pay-dialog .el-dialog {
    width: 1000px;
    height: 850px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.appletName" placeholder="请输入小程序名称" class="applet-list-input"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.status" placeholder="请选择经营状态" class="applet-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="未通过" value="-1"></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="已通过" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="formInline.page" type="hidden"></el-input>
          <el-input v-model="formInline.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="appletLogo" label="小程序LOGO" width="120">
          <template slot-scope="scope">
            <el-upload
              action="/api/user/applet/updateAppletLogo"
              name="materielImage"
              :headers="myHeader"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :before-upload="beforePicUpload"
              :data="{'appletId': + scope.row.id}">
              <el-image :src="scope.row.appletLogo + timestamp" title="点击修改"
                        style="width: 100px; height: 100px; border-radius: 50px"></el-image>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appletName" label="小程序名称" width="180"></el-table-column>
        <el-table-column align="center" prop="appletSimple" label="小程序简称" width="160"></el-table-column>
        <el-table-column align="center" prop="typeName" label="服务类型" width="120"></el-table-column>
        <el-table-column align="center" prop="telephone" label="联系电话" width="120"></el-table-column>
        <el-table-column align="center" prop="province" label="所属地域" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.province + scope.row.city + scope.row.county}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ifRetail" label="经营类型" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.ifRetail">批发</span>
            <span v-if="!scope.row.ifRetail">零售</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新日期" width="140"></el-table-column>
        <el-table-column align="center" prop="ifSelling" label="营业状态" width="80">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="!scope.row.ifSelling">整顿中</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.ifSelling">已发布</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="ifOpenPay" label="支付状态" width="80">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="!scope.row.ifOpenPay">未开通</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.ifOpenPay">已开通</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="小程序状态" width="100">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="scope.row.status == -1">禁用</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.status == 1">正常</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="warning" v-if="scope.row.status == 1 && scope.row.ifSelling" plain
                       @click="updateAppletSelling(scope.row.id, scope.row.ifSelling)">整顿
            </el-button>
            <el-button type="primary" v-if="scope.row.status == 1 && !scope.row.ifSelling" plain
                       @click="updateAppletSelling(scope.row.id, scope.row.ifSelling)">发布
            </el-button>
            <el-button type="success" v-if="!scope.row.ifOpenPay" plain
                       @click="loadAppletOpenPay(scope.row.id, scope.row.appletName, scope.row.ifOpenPay)">支付认证
            </el-button>
            <div style="height: 10px;"></div>
            <el-button type="primary" v-if="scope.row.status == 1" plain
                       @click="loadAppletMateriel(scope.row.id, scope.row.appletName)">物料
            </el-button>
            <el-button type="primary" v-if="scope.row.status == 1" plain
                       @click="editAppletPage(scope.row.id, scope.row.appletName)">编辑页面
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;height: 35px;padding-top: 10px;padding-right: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="formInline.page"
          :page-size="formInline.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog class="applet-pay-dialog" :title="dataTitle" :visible.sync="dataShow"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <appletOpenPay ref="appletOpenPay" v-on:loadAppletData="loadAppletData"></appletOpenPay>
      </el-dialog>
      <el-dialog class="applet-pay-dialog" :title="materielTitle" :visible.sync="materielShow"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <appletMateriel ref="appletMateriel" v-on:loadMaterielPage="loadMaterielPage"></appletMateriel>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'
    import appletOpenPay from '@/views/applet/applet-open-pay.vue'
    import appletMateriel from '@/views/applet/materiel/applet-materiel.vue'

    export default {
        name: 'applet-list',
        components: {
            'appletOpenPay': appletOpenPay,
            'appletMateriel': appletMateriel
        },
        data () {
            return {
                loading: true,
                tableHeight: 50,
                currentPage: 1,
                total: 0,
                formInline: {
                    appletName: '',
                    status: '',
                    page: 1,
                    pageSize: 5
                },
                dataTitle: '',
                dataShow: false,
                materielTitle: '',
                materielShow: false,
                timestamp: ''
            }
        },
        created () {
            this.onSubmit()
        },
        mounted () {
        },
        methods: {
            indexMethod (index) {
                let count = (parseInt(this.formInline.page) - 1) * parseInt(this.formInline.pageSize)
                return count + (parseInt(index) + 1)
            },
            onSubmit () {
                this.loading = true
                this.$axios({
                    url: '/api/user/applet/queryAppletToPage',
                    method: 'post',
                    data: this.formInline
                }).then(res => {
                    console.info('后台返回的数据', res.data)
                    this.$global.setTableHeight(this, 'applet-form')
                    if (res.data.code === '1') {
                        this.tableData = res.data.data.dataSource
                        this.total = res.data.data.totalCount
                    } else if (res.data.code === '-1') {
                        this.$message.error(res.data.data)
                    }
                    this.timestamp = '?' + Date.parse(new Date())
                    this.$global.exitLoad(this, null, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            selectList () {
                this.formInline.page = 1
                this.onSubmit()
            },
            handleCurrentChange (val) {
                this.formInline.page = val
                this.onSubmit()
            },
            editAppletPage (appletId, appletName) {
                this.$cookies.set('default_applet_id', appletId)
                this.$cookies.set('default_applet_name', appletName)
                const {href} = this.$router.resolve({
                    name: 'page-default'
                })
                try {
                    if (!this.newWin.closed) {
                        this.newWin.close()
                    }
                } catch (e) {
                }
                this.newWin = window.open(href, '_blank')
            },
            updateAppletSelling (id, ifSelling) {
                let title = ifSelling ? '确定整顿小程序吗？' : '确定发布小程序吗？'
                this.$confirm(title, '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loading = Loading.service({fullscreen: true, text: '正在加载'})
                    this.$axios({
                        url: '/api/user/applet/updateAppletSelling',
                        method: 'post',
                        data: {appletId: id}
                    }).then(res => {
                        let that = this
                        res.data.code === '1' ? this.$message.success({
                            message: res.data.data,
                            duration: 1000,
                            onClose: function () {
                                that.onSubmit()
                            }
                        }) : this.$message.error(res.data.data)
                        this.$global.exitLoad(this, loading, res.data)
                    })
                })
            },
            loadApplet () {
                this.infoShow = false
                this.selectList()
            },
            loadAppletOpenPay (id, appletName, ifOpenPay) {
                try {
                    this.$refs.appletOpenPay.loadAppletData(id, ifOpenPay)
                } catch (e) {
                    this.$cookies.set('applet_id', id)
                    this.$cookies.set('if_open_pay', ifOpenPay)
                }
                this.dataShow = true
                this.dataTitle = appletName + ' - 上传微信支付资料'
            },
            loadAppletData () {
                this.dataShow = false
            },
            loadAppletMateriel (id, appletName) {
                try {
                    this.$refs.appletMateriel.loadMaterielPage(id)
                } catch (e) {
                    this.$cookies.set('applet_id', id)
                }
                this.materielShow = true
                this.materielTitle = appletName + ' - 物料信息'
            },
            handleLogoSuccess (res, file) {
                if (res.code === '1') {
                    let that = this
                    this.$message.success({
                        message: res.data,
                        duration: 1000,
                        onClose: function () {
                            that.selectList()
                        }
                    })
                } else {
                    this.$message.error(res.data)
                }
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                this.$global.exitLoad(this, loading, res.data)
            },
            beforePicUpload (file) {
                let loading = Loading.service({fullscreen: true, text: '正在上传'})
                const isJPG = 'image/png,image/jpeg,image/jpg'.indexOf(file.type) >= 0
                const isLt2M = file.size / 1024 / 1024 < 3
                if (!isJPG) {
                    this.$message.error('上传图片格式错误!')
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 3MB!')
                }
                if (!isJPG || !isLt2M) {
                    loading.close()
                }
                return isJPG && isLt2M
            }
        }
    }
</script>

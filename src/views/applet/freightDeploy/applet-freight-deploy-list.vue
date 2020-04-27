<style type="text/css">
  .dialog .el-dialog {
    width: 700px;
  }

  .dialog > .el-dialog__body {
    padding: 0px 20px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-form" :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="小程序">
          <el-select v-model="form.appletId" placeholder="请选择小程序" @change="loadTableData()">
            <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="loadFreightDeploy('0')">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="title" label="标题" width="220"></el-table-column>
        <el-table-column align="center" prop="minimum" label="开始距离（米）" width="140"></el-table-column>
        <el-table-column align="center" prop="maximum" label="截止距离（米）" width="140"></el-table-column>
        <el-table-column align="center" prop="freight" label="快递费（元）" width="120"></el-table-column>
        <el-table-column align="center" prop="exemptAmount" label="免额限制（元）" width="140"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="140"></el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" @click="loadFreightDeploy(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="deleteFreightDeploy(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;height: 35px;padding-top: 10px;padding-right: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="form.page"
          :page-size="form.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog class="dialog" :title="infoTitle" :visible.sync="showInfo"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <applet-freight-deploy ref="AppletFreightDeploy" v-on:refreshList="refreshList"></applet-freight-deploy>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'
    import AppletFreightDeploy from '@/views/applet/freightDeploy/applet-freight-deploy.vue'

    export default {
        name: 'applet-freight-deploy-list',
        components: {
            AppletFreightDeploy
        },
        data () {
            return {
                loading: false,
                tableData: null,
                tableHeight: 50,
                currentPage: 1,
                total: 0,
                form: {
                    appletId: null,
                    page: 1,
                    pageSize: 10
                },
                showInfo: false,
                infoTitle: '',
                timestamp: '',
                appletList: []
            }
        },
        created () {
            this.loadAppletMap()
        },
        methods: {
            indexMethod (index) {
                let count = (parseInt(this.form.page) - 1) * parseInt(this.form.pageSize)
                return count + (parseInt(index) + 1)
            },
            loadAppletMap () {
                let loading = Loading.service({fullscreen: true, text: '加载中'})
                this.$axios({
                    url: '/api/user/applet/queryAppletToMap',
                    method: 'post'
                }).then(res => {
                    if (res.data.code === '1') {
                        this.appletList = res.data.data
                        this.form.appletId = res.data.data[0].id
                        this.loadTableData()
                    } else if (res.data.code === '-1') {
                        this.$message.error(res.data.data)
                    }
                    this.$global.exitLoad(this, loading, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, loading, '')
                })
            },
            loadTableData () {
                let loading = Loading.service({fullscreen: true, text: '加载中'})
                this.$axios({
                    url: '/api/user/applet/freightDeploy/queryFreightDeploysByAppletId',
                    method: 'post',
                    data: this.form
                }).then(res => {
                    this.$global.setTableHeight(this, 'applet-form')
                    if (res.data.code === '1') {
                        this.tableData = res.data.data.dataSource
                        this.total = res.data.data.totalCount
                    } else if (res.data.code === '-1') {
                        this.$message.error(res.data.data)
                    }
                    this.$global.exitLoad(this, loading, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, loading, '')
                })
            },
            handleCurrentChange (val) {
                this.form.page = val
                this.loadTableData()
            },
            loadFreightDeploy (id) {
                if (!this.form.appletId) {
                    this.$message.error('请选择小程序')
                    return
                }
                this.$cookies.set('freight_applet_id', this.form.appletId)
                this.$cookies.set('freight_applet_list', JSON.stringify(this.appletList))
                this.showInfo = true
                if (id !== '0') {
                    this.infoTitle = '添加运费配置'
                } else {
                    this.infoTitle = '修改运费配置'
                }
                try {
                    this.$refs.AppletFreightDeploy.loadFreightDeploy(id)
                } catch (e) {
                    this.$cookies.set('freight_deploy_id', id)
                }
            },
            refreshList () {
                this.showInfo = false
                this.loadTableData()
            },
            deleteFreightDeploy (id) {
                this.$confirm('确认删除运费配置吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loading = Loading.service({fullscreen: true, text: '正在加载'})
                    this.$axios({
                        url: '/api/user/applet/freightDeploy/deleteFreightDeploy',
                        method: 'post',
                        data: {id: id}
                    }).then(res => {
                        let that = this
                        res.data.code === '1' ? this.$message.success({
                            message: res.data.data,
                            duration: 1000,
                            onClose: function () {
                                that.loadTableData()
                            }
                        }) : this.$message.error(res.data.data)
                        this.$global.exitLoad(this, loading, res.data)
                    })
                })
            }
        }
    }
</script>

<style type="text/css">
  .coupon-list-input {
    width: 190px;
  }

  .coupon-list-dialog .el-dialog {
    width: 720px;
  }

  .coupon-list-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }

</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-form" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.couponName" placeholder="请输入优惠券名称" class="coupon-list-input"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formInline.couponType" placeholder="请选择优惠券类型" class="coupon-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="通用优惠券" value="1"></el-option>
            <el-option label="满减优惠券" value="2"></el-option>
            <!--            <el-option label="点对点优惠券" value="3"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择优惠券状态" class="coupon-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="未通过" value="-1"></el-option>
            <el-option label="待审核" value="0"></el-option>
            <el-option label="已通过" value="1"></el-option>
            <el-option label="已下架" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="loadCreateCoupon()">创建</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="formInline.page" type="hidden"></el-input>
          <el-input v-model="formInline.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="couponName" label="优惠券名称" width="180"></el-table-column>
        <el-table-column align="center" prop="couponType" label="优惠券类型" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.couponType === 1">通用优惠券</div>
            <div v-if="scope.row.couponType === 2">满减优惠券</div>
            <div v-if="scope.row.couponType === 3">点对点优惠券</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="denomination" label="优惠券面额" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.denomination|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="makeIssueNum" label="预派发数量" width="120"></el-table-column>
        <el-table-column align="center" prop="alreadyIssueNum" label="已派发数量" width="120"></el-table-column>
        <el-table-column align="center" prop="activityStart" label="活动日期" width="140"></el-table-column>
        <el-table-column align="center" prop="activityOver" label="截止日期" width="140"></el-table-column>
        <el-table-column align="center" prop="status" label="审核状态" width="100">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="scope.row.status == -1">审核未通过</el-link>
            <el-link :underline="false" target="_blank" v-if="scope.row.status == 0">待审核</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.status == 1">审核通过</el-link>
            <el-link :underline="false" type="danger" v-if="scope.row.status == 2">已下架</el-link>
            <el-link :underline="false" type="info" v-if="scope.row.status == 3">已过期</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="140"></el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="loadCouponDetails(scope.row.id, scope.row.couponName)">详情
            </el-button>
            <el-button type="warning" plain @click="stopCoupon(scope.row.id, scope.row.couponName, scope.row.couponType)" v-if="scope.row.status == 1">下架
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
      <el-dialog class="coupon-list-dialog" :title="couponTitle" :visible.sync="couponShow"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <couponCreate ref="couponCreate" v-on:refreshList="refreshList"></couponCreate>
      </el-dialog>
      <el-dialog class="coupon-list-dialog" :title="detailsTitle" :visible.sync="detailsShow"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <couponDetails ref="couponDetails"></couponDetails>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import {Loading} from 'element-ui'
    import couponCreate from '@/views/coupon/coupon-create.vue'
    import couponDetails from '@/views/coupon/coupon-details.vue'

    export default {
        name: 'coupon-create-list',
        components: {
            'couponCreate': couponCreate,
            'couponDetails': couponDetails
        },
        data () {
            return {
                loading: true,
                tableHeight: 50,
                currentPage: 1,
                total: 0,
                formInline: {
                    couponName: '',
                    couponType: '',
                    startDate: '',
                    endDate: '',
                    status: '',
                    page: 1,
                    pageSize: 10
                },
                couponTitle: '创建优惠券',
                couponShow: false,
                detailsTitle: '',
                detailsShow: false
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
                    url: '/api/user/coupon/queryCouponPage',
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
                this.goods.page = val
                this.onSubmit()
            },
            loadCreateCoupon () {
                this.couponShow = true
                this.$refs.couponCreate.loadAddCreateCoupon()
            },
            loadCouponDetails (id, name) {
                this.detailsTitle = name + ' - 优惠券详情'
                this.detailsShow = true
                this.$cookies.set('coupon_id', id)
                this.$refs.couponDetails.loadCouponInfo(id)
            },
            stopCoupon (id, name, type) {
                this.$confirm('确定下架【' + name + '】吗？', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loading = Loading.service({fullscreen: true, text: '加载中'})
                    this.$axios({
                        url: '/api/user/coupon/stopCoupon',
                        method: 'post',
                        data: {couponId: id, couponType: type}
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        let that = this
                        res.data.code === '1' ? this.$message.success({
                            message: res.data.data,
                            duration: 1000,
                            onClose: function () {
                                that.$emit('refreshList')
                            }
                        }) : this.$message.error(res.data.data)
                        this.$global.exitLoad(this, loading, res.data)
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, loading, '')
                    })
                })
            },
            refreshList () {
                this.couponShow = false
                this.onSubmit()
            }
        }
    }
</script>

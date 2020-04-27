<style type="text/css">
  .my-order-form .el-input {
    width: 220px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="my-order-form" :inline="true" :model="formInline" class="my-order-form">
        <el-form-item label="订单号">
          <el-input v-model="orderNo" placeholder="输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="登录时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="startTime" :format="format"
                          :value-format="valueFormat"
                          style="width: 220px;"></el-date-picker>&nbsp;-
          <el-date-picker type="date" placeholder="选择日期" v-model="overTime" :format="format"
                          :value-format="valueFormat"
                          style="width: 220px;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="page" type="hidden"></el-input>
          <el-input v-model="pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column prop="orderNo" label="订单号" width="220"></el-table-column>
        <!--        <el-table-column prop="courierNo" label="快递号" width="140"></el-table-column>-->
        <el-table-column prop="appletName" label="小程序" width="220"></el-table-column>
        <el-table-column prop="couponAmount" label="优惠金额" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.couponAmount|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="freightAmount" label="运费" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.freightAmount|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="总金额" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.totalAmount|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payStatus" label="支付状态" width="100">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" v-if="scope.row.payStatus === 1">支付成功</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.payStatus === 0">待支付</el-link>
            <el-link :underline="false" type="info" v-if="scope.row.payStatus === -1">支付失败</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="actualAmount" label="实付金额" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.actualAmount|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="140"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="100">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" v-if="scope.row.orderStatus === 1">订单完成</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.orderStatus === 0">进行中</el-link>
            <el-link :underline="false" type="info" v-if="scope.row.orderStatus === -1">订单失败</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right"></el-table-column>
      </el-table>
      <div style="text-align: right;margin-top: 10px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog class="goods-specs-dialog" :title="orderTitle" :visible.sync="orderShow"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <myOrderDetails ref="myOrderDetails" v-on:loadOrderDetails="loadOrderDetails"></myOrderDetails>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import myOrderDetails from '@/views/order/my-order-details.vue'

    export default {
        name: 'my-order-form',
        components: {
            'myOrderDetails': myOrderDetails
        },
        data () {
            return {
                loading: true,
                tableHeight: 50,
                format: 'yyyy年MM月dd日',
                valueFormat: 'yyyy-MM-dd',
                orderNo: '',
                startTime: '',
                overTime: '',
                page: 1,
                pageSize: 20,
                currentPage: 1,
                total: 0,
                tableData: [],
                orderTitle: '',
                orderShow: false
            }
        },
        created () {
            this.onSubmit()
        },
        mounted () {
        },
        methods: {
            indexMethod (index) {
                let count = (parseInt(this.page) - 1) * parseInt(this.pageSize)
                return count + (parseInt(index) + 1)
            },
            onSubmit () {
                this.loading = true
                this.$axios({
                    url: '/api/user/order/queryUserOrderByPage',
                    method: 'post',
                    data: {
                        orderNo: this.orderNo,
                        startTime: this.startTime,
                        overTime: this.overTime,
                        page: this.page,
                        pageSize: this.pageSize
                    }
                }).then(res => {
                    console.info('后台返回的数据', res.data)
                    this.$global.setTableHeight(this, 'my-order-form')
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
                this.page = 1
                this.onSubmit()
            },
            handleCurrentChange (val) {
                this.page = val
                this.onSubmit()
            },
            loadOrderDetails () {
                this.orderShow = false
                this.onSubmit()
            }
        }
    }
</script>

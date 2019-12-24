<style type="text/css">
  .goods-specs-input {
    width: 190px;
  }

  .goods-specs-dialogs .el-dialog {
    width: 480px;
  }

  .goods-specs-dialogs .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }

</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="goods-specs-form" :inline="true" :model="specsForm" class="demo-form-inline">
        <el-form-item label="商品规格">
          <el-input v-model="specsForm.specsText" placeholder="请输入商品规格" class="goods-specs-input"></el-input>
        </el-form-item>
        <el-form-item label="规格状态">
          <el-select v-model="specsForm.specsStatus" class="goods-specs-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item v-if="showAdd">
          <el-button type="success" @click="loadGoodsSpecs('0')">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="specsForm.page" type="hidden"></el-input>
          <el-input v-model="specsForm.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="specsSrc" label="规格图片" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.specsSrc + timestamp"
                      style="width: 30px; height: 30px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="specsText" label="商品规格" width="180"></el-table-column>
        <el-table-column align="center" prop="sellPrice" label="出售价格" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.sellPrice|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="describeStr" label="描述" :show-overflow-tooltip="true" width="120"></el-table-column>
        <el-table-column align="center" prop="specsStatus" label="类型状态" width="80">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="scope.row.specsStatus == 0">禁用</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.specsStatus == 1">正常</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="specsIndex" label="排序" width="80">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="上移" placement="top">
              <i class="el-icon-caret-top sort-direction" @click="shiftSort(scope.row.id, 'top')"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下移" placement="top">
              <i class="el-icon-caret-bottom sort-direction" @click="shiftSort(scope.row.id, 'bot')"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="warning" plain @click="loadGoodsSpecs(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;height: 35px;padding-top: 10px;padding-right: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="specsForm.page"
          :page-size="specsForm.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog class="goods-specs-dialogs" append-to-body :title="infoTitle" :visible.sync="showInfo"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <goodsSpecs ref="goodsSpecs" v-on:refreshList="refreshList"></goodsSpecs>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import goodsSpecs from '@/views/goods/specs/goods-specs.vue'

    export default {
        name: 'goods-specs-list',
        components: {
            'goodsSpecs': goodsSpecs
        },
        data() {
            return {
                loading: true,
                showAdd: true,
                tableHeight: 50,
                currentPage: 1,
                total: 0,
                specsForm: {
                    goodsId: 0,
                    specsText: '',
                    specsStatus: '',
                    page: 1,
                    pageSize: 10
                },
                infoTitle: '',
                showInfo: false,
                timestamp: ''
            }
        },
        created() {
            let goodsId = this.$cookies.get("goods_id")
            this.loadGoodsPage(goodsId)
        },
        mounted() {
        },
        methods: {
            loadGoodsPage(goodsId){
                if (goodsId){
                    this.specsForm.goodsId = goodsId
                    this.loading = true
                    this.$axios({
                        url: '/api/user/goods/loadSpecsPage',
                        method: 'post',
                        data: this.specsForm
                    }).then(res => {
                        console.info('后台返回的数据', res.data)
                        if (res.data.code === '1') {
                            this.showAdd = true
                        } else if (res.data.code === "-1") {
                            this.showAdd = false
                        }
                        this.$cookies.remove("goods-id")
                        goodsId = null
                        this.specsForm.goodsId = res.data.data
                        this.timestamp = '?' + Date.parse(new Date())
                        this.onSubmit()
                    }).catch(error => {
                        console.info('错误信息', error)
                        this.$global.exitLoad(this, null, '')
                    })
                }
            },
            indexMethod(index) {
                let count = (parseInt(this.specsForm.page) - 1) * parseInt(this.specsForm.pageSize)
                return count + (parseInt(index) + 1)
            },
            onSubmit() {
                this.loading = true
                this.$axios({
                    url: '/api/user/goods/querySpecsPage',
                    method: 'post',
                    data: this.specsForm
                }).then(res => {
                    console.info('后台返回的数据', res.data)
                    this.$global.setAppendTableHeight(this, 'goods-specs-form')
                    if (res.data.code === '1') {
                        this.tableData = res.data.data.dataSource
                        this.total = res.data.data.totalCount
                    } else if (res.data.code === "-1") {
                        this.$message.error(res.data.data)
                    }
                    this.timestamp = '?' + Date.parse(new Date())
                    this.$global.exitLoad(this, null, res.data)
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            selectList() {
                this.specsForm.page = 1
                this.onSubmit()
            },
            handleCurrentChange(val) {
                this.specsForm.page = val
                this.onSubmit()
            },
            loadGoodsSpecs(id) {
                this.showInfo = true
                let goodsName = this.$cookies.get('goods_name');
                if (id && id === '0') {
                    this.infoTitle = goodsName + ' - 添加规格信息'
                } else {
                    this.infoTitle = goodsName + ' - 修改规格信息'
                }
                this.$cookies.set('specs_id', id)
                this.$cookies.set('goods_id', this.specsForm.goodsId)
                this.$refs.goodsSpecs.loadGoodsSpecs(id, this.specsForm.goodsId)
            },
            refreshList() {
                this.showInfo = false
                this.onSubmit()
            },
            shiftSort(id, sort) {
                this.loading = true
                this.$axios({
                    url: '/api/user/goods/updateGoodsSpecsIndex',
                    method: 'post',
                    data: {specsId: id, goodsId: this.specsForm.goodsId, sort: sort}
                }).then(res => {
                    if (res.data.code === '1') {
                        this.onSubmit()
                    } else if (res.data.code === "-1") {
                        this.$message.error(res.data.data)
                        this.$global.exitLoad(this, null, res.data)
                    }
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            }
        }
    }
</script>

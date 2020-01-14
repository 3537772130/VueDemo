<style type="text/css">
  .applet-list-input {
    width: 190px;
  }

  .goods-type-dialog .el-dialog {
    width: 480px;
  }

  .goods-type-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }

</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="goods-type-form" :inline="true" :model="typeForm" class="demo-form-inline">
        <el-form-item label="小程序">
          <el-select v-model="typeForm.appletId" class="applet-list-input" @change="updateApplet">
            <el-option v-for="(item, index) in appletList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="typeForm.typeName" placeholder="请输入类型名称" class="applet-list-input"></el-input>
        </el-form-item>
        <el-form-item label="类型状态">
          <el-select v-model="typeForm.typeStatus" class="applet-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="loadGoodsType('0')">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="typeForm.page" type="hidden"></el-input>
          <el-input v-model="typeForm.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="typeLogo" label="类型图标" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.typeLogo + timestamp"
                      style="width: 30px; height: 30px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="typeName" label="类型名称" width="180"></el-table-column>
        <el-table-column align="center" prop="appletName" label="小程序名称" width="260"></el-table-column>
        <el-table-column align="center" prop="typeStatus" label="类型状态" width="80">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="scope.row.typeStatus == 0">禁用</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.typeStatus == 1">正常</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="typeIndex" label="排序" width="180">
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
            <el-button type="warning" plain @click="loadGoodsType(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;height: 35px;padding-top: 10px;padding-right: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="typeForm.page"
          :page-size="typeForm.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog class="goods-type-dialog" :title="infoTitle" :visible.sync="showInfo"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <goodsType ref="goodsType" v-on:refreshList="refreshList"></goodsType>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import goodsType from '@/views/goods/type/goods-type.vue'

    export default {
        name: 'goods-type-list',
        components: {
            'goodsType': goodsType
        },
        data () {
            return {
                loading: true,
                appletId: null,
                appletList: [],
                tableData: [],
                tableHeight: 50,
                currentPage: 1,
                total: 0,
                typeForm: {
                    appletId: '',
                    typeName: '',
                    typeStatus: '',
                    page: 1,
                    pageSize: 10
                },
                infoTitle: '',
                showInfo: false,
                timestamp: ''
            }
        },
        created () {
            this.$axios({
                url: '/api/user/goods/queryAppletToMap',
                method: 'post'
            }).then(res => {
                if (res.data.code === '1') {
                    this.appletList = res.data.data
                    this.typeForm.appletId = res.data.data[0].id
                    this.onSubmit()
                }
            }).catch(error => {
                console.info('错误信息', error)
                this.$global.exitLoad(this, null, '')
            })
        },
        mounted () {
        },
        methods: {
            indexMethod (index) {
                let count = (parseInt(this.typeForm.page) - 1) * parseInt(this.typeForm.pageSize)
                return count + (parseInt(index) + 1)
            },
            updateApplet: function () {
                this.onSubmit()
            },
            onSubmit () {
                this.loading = true
                this.$axios({
                    url: '/api/user/goods/queryTypePage',
                    method: 'post',
                    data: this.typeForm
                }).then(res => {
                    console.info('后台返回的数据', res.data)
                    this.$global.setTableHeight(this, 'goods-type-form')
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
                this.typeForm.page = 1
                this.onSubmit()
            },
            handleCurrentChange (val) {
                this.typeForm.page = val
                this.onSubmit()
            },
            loadGoodsType (id) {
                this.showInfo = true
                if (id && id === '0') {
                    this.infoTitle = '添加类型信息'
                } else {
                    this.infoTitle = '修改类型信息'
                }
                this.$cookies.set('goods_type_applet_id', this.typeForm.appletId)
                this.$cookies.set('goods_type_id', id)
                try {
                    this.$refs.goodsType.loadGoodsType(id, this.typeForm.appletId)
                } catch (e) {
                }
            },
            refreshList () {
                this.showInfo = false
                this.onSubmit()
            },
            shiftSort (id, sort) {
                this.loading = true
                this.$axios({
                    url: '/api/user/goods/updateGoodsTypeIndex',
                    method: 'post',
                    data: {typeId: id, sort: sort}
                }).then(res => {
                    if (res.data.code === '1') {
                        this.onSubmit()
                    } else if (res.data.code === '-1') {
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

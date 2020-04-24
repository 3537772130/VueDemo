<style type="text/css">
  .recommend-list-input {
    width: 190px;
  }

  .recommend-goods-dialog .el-dialog {
    width: 680px;
    height: 520px;
    text-align: left;
  }

  .recommend-goods-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="recommend-goods-list-form" :inline="true" :model="recommend" class="demo-form-inline">
        <el-form-item label="小程序">
          <el-select v-model="recommend.appletId" class="recommend-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option v-for="(item, index) in appletList" :key="index" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="recommend.goodsName" placeholder="请输入商品名称" class="recommend-list-input"></el-input>
        </el-form-item>
        <el-form-item label="推荐状态">
          <el-select v-model="recommend.recommendStatus" class="recommend-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="未发布" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="loadDetails('0')">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="recommend.page" type="hidden"></el-input>
          <el-input v-model="recommend.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="coverSrc" label="推荐图片" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.recommendImg"
                      style="width: 80px; height: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appletName" label="所属小程序" width="220"></el-table-column>
        <el-table-column align="center" prop="coverSrc" label="商品图片" width="120">
          <template slot-scope="scope">
            <el-image :src="scope.row.coverSrc"
                      style="width: 80px; height: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goodsName" label="商品名称" width="220"></el-table-column>
        <el-table-column align="center" prop="startTime" label="生效日期" width="120"></el-table-column>
        <el-table-column align="center" prop="expireTime" label="截止日期" width="120"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="140"></el-table-column>
        <el-table-column align="center" prop="recommendStatus" label="推荐状态" width="80">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="!scope.row.recommendStatus">已失效</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.recommendStatus">正常</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="loadDetails(scope.row.id)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;height: 35px;padding-top: 10px;padding-right: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="recommend.page"
          :page-size="recommend.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog class="recommend-goods-dialog" append-to-body :title="infoTitle" :visible.sync="infoShow"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <recommendDetails ref="recommendDetails" v-on:loadRecommendDetails="loadRecommendDetails"></recommendDetails>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
    import recommendDetails from '@/views/goods/recommend/recommend-details.vue'

    export default {
        name: 'recommend-goods-list',
        components: {
            'recommendDetails': recommendDetails
        },
        data () {
            return {
                loading: true,
                tableHeight: 50,
                appletList: [],
                currentPage: 1,
                total: 0,
                recommend: {
                    appletId: '',
                    goodsName: '',
                    recommendStatus: '',
                    page: 1,
                    pageSize: 10
                },
                infoTitle: '',
                infoShow: false
            }
        },
        created () {
            this.loadInfo()
        },
        mounted () {

        },
        methods: {
            loadInfo () {
                this.$axios({
                    url: '/api/user/applet/queryAppletToMap',
                    method: 'post'
                }).then(res => {
                    if (res.data.code === '1') {
                        this.appletList = res.data.data
                        this.onSubmit()
                    }
                }).catch(error => {
                    console.info('错误信息', error)
                    this.$global.exitLoad(this, null, '')
                })
            },
            onSubmit () {
                this.loading = true
                this.tableData = {}
                this.$axios({
                    url: '/api/user/goods/queryUserAppletRecommendGoodsByPage',
                    method: 'post',
                    data: this.recommend
                }).then(res => {
                    this.$global.setGoodsTableHeight(this, 'recommend-goods-list-form')
                    if (res.data.code === '1') {
                        this.tableData = res.data.data.dataSource ? res.data.data.dataSource : []
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
                this.recommend.page = 1
                this.onSubmit()
            },
            indexMethod (index) {
                let count = (parseInt(this.recommend.page) - 1) * parseInt(this.recommend.pageSize)
                return count + (parseInt(index) + 1)
            },
            handleCurrentChange (val) {
                this.recommend.page = val
                this.onSubmit()
            },
            loadDetails (id) {
                this.infoShow = true
                if (id && id === '0') {
                    this.infoTitle = '添加商品推荐'
                } else {
                    this.infoTitle = '修改商品推荐'
                }
                try {
                    this.$refs.recommendDetails.loadRecommendDetails(id)
                } catch (e) {
                    this.$cookies.set('applet_recommend_goods_id', id)
                }
            },
            loadRecommendDetails () {
                this.infoShow = false
                this.selectList()
            }
        }
    }
</script>

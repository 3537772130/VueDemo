<style type="text/css">
  .applet-list-input{
    width: 190px;
  }

  .applet-list-dialog .el-dialog {
    width: 680px;
  }

  .applet-list-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }

  .goods-info-dialog .el-dialog {
    width: 480px;
  }
  .goods-info-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }

  .goods-file-dialog .el-dialog {
    width: 750px;
  }
  .goods-file-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }


</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding-top: 20px;">
      <el-form id="applet-form" :inline="true" :model="goods" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="goods.name" placeholder="请输入商品名称" class="applet-list-input"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="goods.typeId" class="applet-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="goods.status" class="applet-list-input">
            <el-option label="全部" value=''></el-option>
            <el-option label="禁用" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="loadGoodsInfo('0')">添加</el-button>
        </el-form-item>
        <div style="display: none;">
          <el-input v-model="goods.page" type="hidden"></el-input>
          <el-input v-model="goods.pageSize" type="hidden"></el-input>
        </div>
      </el-form>
      <el-table :data="tableData" :height="tableHeight" stripe style="width: 100%">
        <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="coverSrc" label="商品封面" width="120">
          <template slot-scope="scope">
            <el-image :src="'api\\' + scope.row.coverSrc + timestamp"
                      style="width: 80px; height: 80px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goodsName" label="商品名称" width="180"></el-table-column>
        <el-table-column align="center" prop="typeName" label="商品类型" width="120"></el-table-column>
        <el-table-column align="center" prop="minPrice" label="最低价格" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.minPrice|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="maxPrice" label="最高价格" width="120" >
          <template slot-scope="scope">
            <span>{{scope.row.maxPrice|addZero}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateTime" label="更新时间" width="160"></el-table-column>
        <el-table-column align="center" prop="goodsStatus" label="商品状态" width="80">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="scope.row.goodsStatus == 0">禁用</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.goodsStatus == 1">正常</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="warning" plain @click="loadGoodsInfo(scope.row.id)">修改</el-button>
            <el-button type="primary" plain @click="loadGoodsFile(scope.row.id, scope.row.goodsName)">文件</el-button>
            <el-button type="primary" plain @click="loadGoodsSpecs(scope.row.id, scope.row.goodsName)">规格</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right;height: 35px;padding-top: 10px;padding-right: 30px;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="goods.page"
          :page-size="goods.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog class="goods-info-dialog" :title="infoTitle" :visible.sync="showInfo"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <goodsInfo ref="goodsInfo" v-on:refreshList="refreshList"></goodsInfo>
      </el-dialog>
      <el-dialog class="goods-file-dialog" :title="fileTitle" :visible.sync="showFile"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <goodsFileList ref="goodsFileList" v-on:loadGoodsFile="loadGoodsFile"></goodsFileList>
      </el-dialog>
      <el-dialog class="applet-list-dialog" :title="specsTitle" :visible.sync="showSpecs"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <goodsSpecsList ref="goodsSpecsList" v-on:loadGoodsSpecs="loadGoodsSpecs"></goodsSpecsList>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import goodsInfo from '@/views/goods/goods-info.vue'
  import goodsFileList from '@/views/goods/file/goods-file-list.vue'
  import goodsSpecsList from '@/views/goods/specs/goods-specs-list.vue'

  export default {
    name: 'goods-info-list',
    components: {
      'goodsInfo': goodsInfo,
      'goodsFileList': goodsFileList,
      'goodsSpecsList': goodsSpecsList
    },
    data() {
      return {
        loading: true,
        tableHeight: 50,
        currentPage: 1,
        total: 0,
        goods: {
          name: '',
          typeId: '',
          status: '',
          page: 1,
          pageSize: 5
        },
        typeList: [],
        infoTitle: '',
        showInfo: false,
        fileTitle: '',
        showFile: false,
        specsTitle: '',
        showSpecs: false,
        timestamp: ''
      }
    },
    created() {
      this.loadInfo()
    },
    mounted() {
    },
    methods: {
      loadInfo(){
        this.loading = true
        this.$axios({
          url: '/api/user/goods/queryTypeList',
          method: 'post',
          data: this.goods
        }).then(res => {
          if (res.data.code === '1') {
            this.typeList = res.data.data
          }
          this.onSubmit()
        }).catch(error => {
          console.info('错误信息', error)
          this.$global.exitLoad(this, null, '')
        })
      },
      indexMethod(index) {
        let count = (parseInt(this.goods.page) - 1) * parseInt(this.goods.pageSize)
        return count + (parseInt(index) + 1)
      },
      onSubmit() {
        this.loading = true
        this.$axios({
          url: '/api/user/goods/queryInfoPage',
          method: 'post',
          data: this.goods
        }).then(res => {
          console.info('后台返回的数据', res.data)
          this.$global.setTableHeight(this, 'applet-form')
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
        this.goods.page = 1
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.goods.page = val
        this.onSubmit()
      },
      loadGoodsInfo(id) {
        this.showInfo = true
        if (id && id === '0') {
          this.infoTitle = '添加商品信息'
        } else {
          this.infoTitle = '修改商品信息'
        }
        this.$cookies.set('goods_id', id)
        this.$refs.goodsInfo.loadGoodsInfo(id)
      },
      loadGoodsFile(id, name) {
        this.showFile = true
        this.fileTitle = name + ' - 文件列表'
        this.$cookies.set('goods_id', id)
        this.$refs.goodsFileList.loadGoodsFile(id)
      },
      loadGoodsSpecs(id, name) {
        this.showSpecs = true
        this.fileTitle = name + ' - 规格列表'
        this.$cookies.set('goods_id', id)
        this.$refs.goodsSpecsList.loadGoodsInfo(id)
      },
      refreshList(){
        this.showInfo = false
        this.onSubmit()
      }
    }
  }
</script>

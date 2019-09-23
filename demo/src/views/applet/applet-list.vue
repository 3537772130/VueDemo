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
        <el-form-item>
          <el-button type="success" @click="updateInfo('0')">申请</el-button>
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
            <el-image :src="'api\\' + scope.row.appletLogo + timestamp"
                      style="width: 100px; height: 100px; border-radius: 50px"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appletName" label="小程序名称" width="180"></el-table-column>
        <el-table-column align="center" prop="appletSimple" label="小程序简称" width="160"></el-table-column>
        <el-table-column align="center" prop="typeName" label="服务类型" width="120"></el-table-column>
        <el-table-column align="center" prop="telephone" label="联系电话" width="120"></el-table-column>
        <el-table-column align="center" prop="province" label="所属地域" width="180" >
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
        <el-table-column align="center" prop="updateTime" label="更新日期" width="120"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-link :underline="false" type="danger" v-if="scope.row.status == -1">禁用</el-link>
            <el-link :underline="false" type="success" v-if="scope.row.status == 1">正常</el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="warning" v-if="scope.row.status == 1" plain @click="loadAppletDetails(scope.row.id)">详情</el-button>
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
      <el-dialog class="applet-list-dialog" :title="dialogTitle" :visible.sync="showInfo"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <appletDetails ref="appletDetails" v-on:loadApplet="loadApplet"></appletDetails>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import appletDetails from '@/views/applet/applet-details.vue'

  export default {
    name: 'applet-list',
    components: {
      'appletDetails': appletDetails
    },
    data() {
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
        dialogTitle: '提交小程序信息',
        showInfo: false,
        timestamp: ''
      }
    },
    created() {
      this.onSubmit()
    },
    mounted() {
    },
    methods: {
      indexMethod(index) {
        let count = (parseInt(this.formInline.page) - 1) * parseInt(this.formInline.pageSize)
        return count + (parseInt(index) + 1)
      },
      onSubmit() {
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
        this.formInline.page = 1
        this.onSubmit()
      },
      handleCurrentChange(val) {
        this.formInline.page = val
        this.onSubmit()
      },
      loadAppletDetails(id) {
        this.showInfo = true
        if (id && id === '0') {
          this.dialogTitle = '提交小程序信息'
        } else {
          this.dialogTitle = '修改小程序信息'
        }
        this.$cookies.set('applet_id', id)
        this.$refs.appletDetails.loadApplet(id)
      },
      loadApplet() {
        this.showInfo = false
        this.selectList()
      }
    }
  }
</script>

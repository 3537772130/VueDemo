<style type="text/css">
  .applet-list-dialog .el-dialog {
    width: 850px;
  }

  .applet-list-dialog .el-dialog > .el-dialog__body {
    padding: 0px 20px;
  }
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding: 20px;">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="小程序名称">
            <el-input v-model="formInline.appletName" placeholder="输入小程序名称"></el-input>
          </el-form-item>
          <el-form-item label="经营状态">
            <el-select v-model="formInline.ifSelling" placeholder="选择经营状态">
              <el-option label="全部" value=''></el-option>
              <el-option label="停业" value='0'></el-option>
              <el-option label="营业" value='1'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="updateInfo('0')">添加</el-button>
          </el-form-item>
          <div style="display: none;">
            <el-input v-model="formInline.page" type="hidden"></el-input>
            <el-input v-model="formInline.pageSize" type="hidden"></el-input>
          </div>
        </el-form>
      </div>
      <div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
          <el-table-column align="center" prop="appletLogo" label="小程序LOGO" width="180">
            <template slot-scope="scope">
              <el-image :src="'api\\' + scope.row.appletLogo"
                        style="width: 100px; height: 100px; border-radius: 50px"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="appletName" label="小程序名称" width="220" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="appletSimple" label="小程序简称" width="120"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" prop="province" label="所属地域" width="220" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.province +','+ scope.row.city +','+ scope.row.county}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ifRetail" label="经营类型" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.ifRetail">批发</span>
              <span v-if="!scope.row.ifRetail">零售</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ifSelling" label="经营状态" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.ifSelling" style="color: #67C23A;">正在营业</span>
              <span v-if="!scope.row.ifSelling" style="color: #E6A23C;">暂停营业</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="updateTime" label="更新日期"></el-table-column>
          <el-table-column align="center" prop="status" label="审核状态" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.status == -1" style="color: #f5260b;">未通过</span>
              <span v-if="scope.row.status == 0">待审核</span>
              <span v-if="scope.row.status == 1" style="color: #67C23A;">已通过</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="warning" v-if="scope.row.status == -1">修改</el-button>
              <el-button type="warning" v-if="scope.row.status == 1">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right;margin-top: 10px;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="formInline.page"
            :page-size="formInline.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog class="applet-list-dialog" :title="dialogTitle" :visible.sync="dialogFormVisible"
                 :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true">
        <appletInfo ref="appletInfo" v-on:loadApplet="loadApplet"></appletInfo>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  import appletInfo from '@/views/applet/applet-info.vue'

  export default {
    name: 'applet-list',
    components: {
      'appletInfo': appletInfo
    },
    data() {
      return {
        loading: true,
        currentPage: 1,
        total: 0,
        formInline: {
          appletName: '',
          ifSelling: '',
          page: 1,
          pageSize: 5
        },
        dialogTitle: '提交小程序信息',
        dialogFormVisible: false
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
          url: '/api/user/applet/selectAppletToPage',
          method: 'post',
          data: this.formInline
        }).then(res => {
          console.info('后台返回的数据', res.data)
          if (res.data.code === '1') {
            this.tableData = res.data.data.dataSource
            this.total = res.data.data.totalCount
          } else if (res.data.code === "-1") {
            this.$message.error(res.data.data)
          }
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
      updateInfo(id) {
        this.dialogFormVisible = true
        if (id && id === '0') {
          this.dialogTitle = '提交小程序信息'
        } else {
          this.dialogTitle = '修改小程序信息'
        }
        this.$cookies.set('applet_id', id)
        this.$refs.appletInfo.loadApplet(id)
      },
      loadApplet() {
        this.selectList()
      }
    }
  }
</script>

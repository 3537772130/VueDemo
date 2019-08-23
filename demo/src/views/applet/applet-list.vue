<style type="text/css">
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
          <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
          <el-table-column prop="appletLogo" label="小程序LOGO" width="180"></el-table-column>
          <el-table-column prop="appletName" label="小程序名称" width="180"></el-table-column>
          <el-table-column prop="appletSimple" label="小程序简称" width="180"></el-table-column>
          <el-table-column prop="addressDetails" label="详细地址" width="180"></el-table-column>
          <el-table-column prop="ifRetail" label="经营类型" width="180"></el-table-column>
          <el-table-column prop="ifSelling" label="经营状态" width="180"></el-table-column>
          <el-table-column prop="updateTime" label="更新日期"></el-table-column>
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
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :close-on-click-modal="false">
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
          ifSelling: ''
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
      updateInfo(id){
        this.dialogFormVisible = true
        if (id && id === '0'){
          this.dialogTitle = '提交小程序信息'
        } else {
          this.dialogTitle = '修改小程序信息'
        }
        this.$cookies.set('applet_id', id)
        this.$refs.appletInfo.loadApplet(id)
      }
    }
  }
</script>

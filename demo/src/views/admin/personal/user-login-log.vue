<style type="text/css">
</style>
<template>
  <el-container>
    <el-main v-loading="loading" element-loading-text="加载中" style="background-color: #FFFFFF;padding: 20px;">
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="省份">
            <el-select v-model="formInline.region" placeholder="选择省份" @change="selectProvince" style="width: 200px;">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="prov in provList" :key="prov" :label="prov.areaName" :value="prov.areaName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="formInline.city" placeholder="选择城市" @change="selectCity" style="width: 200px;">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="city in cityList" :key="city" :label="city.areaName" :value="city.areaName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区/县">
            <el-select v-model="formInline.county" placeholder="选择区/县" style="width: 200px;">
              <el-option label="全部" value=''></el-option>
              <el-option v-for="county in countyList" :key="county" :label="county.areaName" :value="county.areaName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="街道">
            <el-input v-model="formInline.area" placeholder="输入街道"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="IP地址">
            <el-input v-model="formInline.ipAddress" placeholder="输入IP地址"></el-input>
          </el-form-item>
          <el-form-item label="登录时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.startDate" format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.endDate" format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectList">查询</el-button>
          </el-form-item>
          <div style="display: none;">
            <el-input v-model="formInline.page" type="hidden"></el-input>
            <el-input v-model="formInline.pageSize" type="hidden"></el-input>
          </div>
        </el-form>
      </div>
      <div style="height: 640px;">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column type="index" :index="indexMethod" label="序号" width="80"></el-table-column>
          <el-table-column prop="ipAddress" label="IP地址" width="180"></el-table-column>
          <el-table-column prop="country" label="国家" width="180"></el-table-column>
          <el-table-column prop="region" label="省份" width="180"></el-table-column>
          <el-table-column prop="city" label="城市" width="180"></el-table-column>
          <el-table-column prop="county" label="区/县" width="180"></el-table-column>
          <el-table-column prop="area" label="街道" width="180"></el-table-column>
          <el-table-column prop="isp" label="运营商" width="180"></el-table-column>
          <el-table-column prop="loginTime" label="登录时间"></el-table-column>
        </el-table>
      </div>
      <div style="text-align: right;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="formInline.page"
          :page-size="formInline.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>
<script type="text/javascript">
  // import {Loading} from 'element-ui'

  export default {
    name: 'user-login-log',
    data() {
      return {
        loading: true,
        currentPage: 1,
        total: 0,
        formInline: {
          ipAddress: '',
          region: '',
          city: '',
          county: '',
          area: '',
          startDate: '',
          endDate: '',
          page: 1,
          pageSize: 15
        },
        provList: [],
        cityList: [],
        countyList: [],
        tableData: []
      }
    },
    created() {
      this.onSubmit()
      this.$global.selectRegionList(this, '', '1')
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
          url: '/api/user/selectUserLoginLogToPage',
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
      selectProvince() {
        let region = this.formInline.region
        this.formInline.city = ''
        this.formInline.county = ''
        this.countyList = []
        if (region != ''){
          let obj = this.provList.find((item)=> {
            return item.areaName === region;
          })
          this.$global.selectRegionList(this, obj.id, '2')
        }
      },
      selectCity() {
        let city = this.formInline.city
        this.formInline.county = ''
        if (city != ''){
          let obj = this.cityList.find((item)=> {
            return item.areaName === city;
          })
          this.$global.selectRegionList(this, obj.id, '3')
        }
      }
    }
  }
</script>

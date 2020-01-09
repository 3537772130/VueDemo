<template>
  <div class="app-container">

    <div class="filter-container">
      <el-form
        ref="listQueryForm"
        :inline="true"
        label-width="80px"
        :model="listQuery.param"
        size="small"
        @keyup.enter.native="handleSearch"
      >
        <el-form-item label="关键字:" prop="keyword">
          <el-input v-model="listQuery.param.keyword" placeholder="关键字" style="width: 177px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="handleSearch">查询</el-button>
          <el-button plain @click="handleFormReset('listQueryForm')">重置</el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- / 搜索-->

    <el-row class="ml-table">
      <el-table
        v-loading.body="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="姓名" prop="name" />
        <el-table-column align="center" label="年龄" prop="age" />
        <el-table-column align="center" label="状态" prop="shelfStatus">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handelView(scope.row)">
              查看
            </el-button>
            <el-button type="text" size="mini" @click="handelEdit(scope.row)">
              编辑
            </el-button>
            <el-button slot="reference" type="text" size="mini" @click="handelDel(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container">
        <el-pagination
          :current-page.sync="listQuery.page"
          :page-sizes="[20,30,50]"
          :page-size="listQuery.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <!--/ml-table-->

    <TheForm ref="TheForm" @refreshPage="getPage" />
  </div>
</template>

<script>

import { page } from '@/api/demo'
import TheForm from './components/TheForm'

export default {
  name: 'Index',
  components: { TheForm },
  data() {
    return {
      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 20,
        param: {
          keyword: null
        }
      }

    }
  },
  created() {
    this.getPage()
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getPage()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getPage()
    },
    handleSearch() {
      this.listQuery.page = 1
      this.getPage()
    },
    getPage() {
      this.listLoading = true
      page(this.listQuery).then(response => {
        const page = response.result
        this.list = page.dataSource
        this.total = page.totalCount
        this.listLoading = false
      })
    },
    handelView(row) {
      console.log('View', row)
      this.$refs.TheForm.showDialog({ key: row.name, isView: true })
    },
    handelEdit(row) {
      console.log('Edit', row)
      this.$refs.TheForm.showDialog({ key: row.name, isView: false })
    },
    handelDel(row) {
      console.log('Del', row)
    },
    handleFormReset(form) {
      this.$refs[form].resetFields()
    },
    handleAdd() {
      this.$refs.TheForm.showDialog({ isView: false })
    }

  }
}
</script>

<style scoped>
  .ml-form {
    padding: 17px 17px 0px 17px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .bg-purple {
    background: #e5e9f2;
  }

</style>

<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="70%"
    :close-on-click-modal="false"
    top="3vh"
  >
    <el-form ref="addForm" :model="form" :rules="rulesShelf" label-width="100px">
      <el-form-item label="名称:" prop="shelfName">
        <el-input
          v-model="form.shelfName"
          placeholder="请输入名称"
          :maxlength="14"
          :disabled="isView"
        />
      </el-form-item>
      <el-form-item label="年龄:" prop="shelfName">
        <el-input
          v-model="form.shelfName"
          placeholder="请输入年龄"
          :maxlength="14"
          :disabled="isView"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose"> 取 消</el-button>
      <el-button v-if="!isView" type="primary" :loading="createBtnLoading" @click="handleSave">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { save } from '@/api/demo'

export default {
  name: 'TheForm',
  data() {
    return {
      isView: true,
      dialogTitle: '新增货架',
      dialogVisible: false,
      form: {
        shelfModelEn: null,
        shelfSeq: null,
        shelfName: null,
        totalLevels: null,
        contactName: null,
        contactMobile: null,
        district: null,
        sdistrict: null,
        county: null,
        shelfAddr: null,
        eqCardCode: null,
        shelfMgt: null,
        shelfNote: null,
        levelCount: null,
        shelfLogo: null,
        shopId: null,
        shelfMac: null,
        shelfType: 2,
        contact: null,
        contactUserId: null,
        serviceTel: null
      },
      rulesShelf: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        age: [{ required: true, message: '请选择年龄', trigger: 'blur' }]
      },
      createBtnLoading: false
    }
  },
  created() {
  },
  methods: {
    showDialog({ key, isView }) {
      if (key) {
        // TODO  更新 or 查看 需回显数据
        // this.View()
      } else {
        // TODO 新增

      }
      this.isView = isView
      this.dialogVisible = true
    },
    handleSave() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.createBtnLoading = true
          save(this.form).then(res => {
            if (res.success) {
              this.$notify.success(res.message)
              this.$emit('refreshPage')
              this.handleClose()
            } else {
              this.$notify.error(res.message)
            }
            this.createBtnLoading = false
          })
        } else {
          return false
        }
      })
    },
    handleFormReset(form) {
      this.$refs[form].resetFields()
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>

<style type="text/css">
  .text {
    font-size: 14px;
  }

  .item {
    height: 19px;
    line-height: 19px;
    text-align: left;
    margin-bottom: 18px;
  }

  .item > label {
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 5px;
    font-size: 12px;
  }

  .el-card__header {
    padding: 0px;
  }

  .clearfix {
    height: 45px;
    line-height: 45px;
    text-align: left;
    font-weight: bold;
    padding-left: 25px;
    font-size: 16px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .el-button-update {
    font-size: 20px;
    position: relative;
    top: 10px;
    left: -30px;
  }

  .photo-div {
    position: absolute;
    top: 70px;
    left: 350px;
  }

  .photo-div:hover {
    cursor: pointer;
  }

  .photo-div > .user-photo {
    width: 100px;
    height: 100px;
    border-radius: 0px;
    border: 1px #dcdee2 solid;
  }

  .form-info-div {
    text-align: left;
  }
  .form-info-val {
    width: 215px;
  }
</style>
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button class="el-button-update" style="float: right; padding: 3px 0" type="text"
                   @click="dialogFormVisible = true">
          <i class="el-icon-edit"></i><span style="font-size: 14px">修改信息</span>
        </el-button>
      </div>
      <div class="text item"><label>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>{{info.nickName}}</div>
      <div class="text item"><label>账&nbsp;&nbsp;户&nbsp;&nbsp;名：</label>{{info.userName}}</div>
      <div class="text item"><label>登录时间：</label>{{info.createTime}}</div>
      <div class="photo-div">
        <img src="@/assets/logo.png" class="user-photo">
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-tabs v-model="editableTabsValue" type="border-card">
        <el-tab-pane label="修改信息" name="up-info" ref="infoForm" style="height: 400px;">
          <el-form :model="upInfo" :rules="rules">
            <el-form-item label="账户" :label-width="formLabelWidth" class="form-info-div">
              <span>{{upInfo.userName}}</span>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth" class="form-info-div">
              <el-input v-model="upInfo.nickName" name="nickName" autocomplete="off" class="form-info-val"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" class="form-info-div">
              <el-select v-model="upInfo.sex" name="sex" placeholder="请选择活动区域" class="form-info-val">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="">确 定</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="up-pass" style="height: 400px;">
          <el-form :rules="rules" ref="passForm">
            <el-form-item label="原密码" :label-width="formLabelWidth" class="form-info-div">
              <el-input name="oldPass" type="password" autocomplete="off" class="form-info-val" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" class="form-info-div">
              <el-input name="newPass" type="password" autocomplete="off" class="form-info-val" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" class="form-info-div">
              <el-input name="confirmPass" type="password" autocomplete="off" class="form-info-val" show-password></el-input>
            </el-form-item>
            <el-button type="primary" @click="">提&nbsp;&nbsp;交</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'personal-main',
    data() {
      return {
        info: this.$cookies.get('userInfo'),
        upInfo: {},
        dialogTableVisible: false,
        dialogFormVisible: false,
        editableTabsValue: 'up-info',
        formLabelWidth: '120px',
        infoRules: {
          nickName: [
            {required: true, message: '请输入账户名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请输入账户名', trigger: 'blur'}
          ]
        },
        passRules: {
          oldPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      loadUpdateUserInfo() {
        this.$router.push({path: '/update-user-info'})
      },
    },
    created() {
      let info = this.$cookies.get('userInfo')
      info.sex = info.sex ? '男':'女'
      this.upInfo = info
    }
  }
</script>

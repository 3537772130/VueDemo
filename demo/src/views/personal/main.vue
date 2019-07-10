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
  .item>label{
    display: inline-block;
    width: 80px;
    text-align: right;
    margin-right: 5px;
    font-size: 12px;
  }
  .el-card__header{
    padding: 0px;
  }
  .clearfix{
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
  .el-button{
    font-size: 20px;
    position: relative;
    top: 10px;
    left: -30px;
  }
  .photo-div{
    position: absolute;
    top: 70px;
    left: 350px;
  }
  .photo-div:hover{
    cursor: pointer;
  }
  .photo-div>.user-photo{
    width: 100px;
    height: 100px;
    border-radius: 0px;
    border: 1px #dcdee2 solid;
  }
</style>
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
      <el-button style="float: right; padding: 3px 0" type="text">
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
</template>

<script type="text/javascript">

  export default {
    name: 'main',
    data() {
      return {
        info: this.GLOBAL.userInfo
      }
    },
    method() {
      this.$message.error(this.GLOBAL.userInfo)
    }
  }
</script>

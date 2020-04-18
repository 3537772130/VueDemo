<style type="text/css">
  .apply-pay{
    margin: 20px;
    text-align: left;
  }
  .pay-title{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .pay-description{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
    font-size: 16px;
    font-weight: bold;
  }
</style>
<template>
  <div class="apply-pay">
    <div class="pay-title">一、商户号如何获取</div>
    <div class="pay-description">
      1.打开微信支付商户平台 - 登录微信支付账户；
    </div>
    <el-image src="/static/images/pay-step/step-a1.png" style="width: 60%;height: 60%;margin-left: 20px;"></el-image>
    <div class="pay-description">
      2.已注册用户直接扫码登录或账号登录；未注册用户，可以点击【成为商家】，进行注册(请使用小程序绑定微信进行扫码注册)；
    </div>
    <el-image src="/static/images/pay-step/step-a2.png" style="width: 453px;height: 500px;margin-left: 20px;"></el-image>
    <div class="pay-description">
      3.（已注册用户忽略）接入微信支付，选择【注册微信支付商户号】，填写相关资料后提交申请；
    </div>
    <el-image src="/static/images/pay-step/step-a3.png" style="width: 839px;height: 618px;margin-left: 20px;"></el-image>
    <div class="pay-description">
      4.登录成功后，进入【账户中心】；
    </div>
    <el-image src="/static/images/pay-step/step-a4.png" style="width: 60%;height: 60%;margin-left: 20px;"></el-image>
    <div class="pay-description">
      5.在【账户中心】选择【商户信息】，即可查看【微信支付商户号】；
    </div>
    <el-image src="/static/images/pay-step/step-a5.png" style="width: 60%;height: 60%;margin-left: 20px;"></el-image>
    <div class="pay-title">二、商户秘钥如何获取</div>
    <div class="pay-description">
      1.在【账户中心】选择【操作证书】 - 【申请安装】；
    </div>
    <el-image src="/static/images/pay-step/step-a6.png" style="width: 60%;height: 60%;margin-left: 20px;"></el-image>
    <br>
    <el-image src="/static/images/pay-step/step-a7.png" style="width: 789px;height: 669px;margin-left: 20px;"></el-image>
    <div class="pay-description">
      2.证书安装后，在【API安全】界面点击【设置秘钥】，自定义设置32位商户API秘钥，这也就是我们想要获取的商户秘钥；
    </div>
    <el-image src="/static/images/pay-step/step-a8.png" style="width: 60%;height: 60%;margin-left: 20px;"></el-image>
    <br>
    <el-image src="/static/images/pay-step/step-a9.png" style="width: 819px;height: 402px;margin-left: 20px;"></el-image>
    <div class="pay-description">
      3.牢记设置的秘钥，及时上传或做好记录；
    </div>
    <el-image src="/static/images/pay-step/step-b1.png" style="width: 789px;height: 431px;margin-left: 20px;"></el-image>
    <br>
    <el-image src="/static/images/pay-step/step-b2.png" style="width: 819px;height: 521px;margin-left: 20px;"></el-image>
    <br>
    <el-image src="/static/images/pay-step/step-b3.png" style="width: 820px;height: 340px;margin-left: 20px;"></el-image>
  </div>
</template>
<script type="text/javascript">
    export default {
        name: 'applet-info',
        data () {
            return {
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
        }
    }
</script>

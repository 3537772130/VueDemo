<template>
  <div class="form-div">
    <div class="img-div">
      <img src="@/assets/logo.png" alt="">
    </div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="userName">
        <Input type="text" v-model="formInline.userName" placeholder="Username" value="17601301913">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="userPass">
        <Input type="password" v-model="formInline.userPass" placeholder="Password" value="zhouhuahu">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem class="but-div">
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'login',
    data () {
      return {
        formInline: {
          userName: '17601301913',
          userPass: 'zhouhuahu'
        },
        ruleInline: {
          userName: [
            {required: true, message: '请输入账户', trigger: 'blur'}
          ],
          userPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度至少6位', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.loading('正在登录')
            this.$axios({
              url: '/api/doLogin',
              method: 'post',
              data: this.formInline
            }).then(res => {
              console.info('后台返回的数据', res.data)
              if (res.data.code === '1') {
                this.$router.push({path: '/main-info'})
              } else {
                this.$Message.error(res.data.data)
              }
            })
          } else {
            this.$Message.error('表单校验失败!')
          }
        })
      }
    }
  }
</script>
<style type="text/css">
  #app{
    margin-top: 0px;
  }
  .form-div{
    margin: auto;
  }
  .img-div{
    margin: auto;
    width: 100%;
    height: 200px;
  }
  .form-div>form{
    margin: auto;
    width: 189px;
  }
  .form-div .but-div{
    width: 189px;
    margin-right: 0px;
  }
  .form-div .but-div button{
    width: 179px;
    position: relative;
    left: -5px;
  }
</style>

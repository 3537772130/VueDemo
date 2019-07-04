<template>
  <Form ref="formInline" :model="info" :rules="ruleInline" inline>
    <FormItem prop="userName">
      <Input type="text" v-model="info.userName" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="userPass">
      <Input type="password" v-model="info.userPass" placeholder="Password">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
    </FormItem>
  </Form>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        info: {
          userName: '',
          userPass: ''
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
      handleSubmit(name) {
        var a = this.info;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios({
              url: '/api/user/doLogin',//请求的地址
              method: 'post',//请求的方式
              data: this.info//请求的表单数据
            }).then(res => {
              console.info('后台返回的数据', res.data);
            });
          } else {
            this.$Message.error('表单校验失败!');
          }
        })
      }
    }
  }
</script>

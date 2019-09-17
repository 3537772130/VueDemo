<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  * {
    margin: 0;
    padding: 0;
  }

  /* 谷歌 */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }

  /* 火狐 */
  input {
    -moz-appearance: textfield;
  }

  .el-form-item__label {
    width: 80px;
  }

  .el-table__header tr, .el-table__header th {
    background-color: #fafafa;
  }

  .demo-image__preview .el-image-viewer__close > i {
    color: #FFFFFF;
  }

  .el-dialog > .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }

  form{
    text-align: left;
  }
</style>

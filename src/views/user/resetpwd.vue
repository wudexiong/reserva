<template>
   <div class="main">
    <el-page-header>
      <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
      <span slot="content">重置密码</span>
    </el-page-header>
    <div class="inputBox">
        <div>
          <el-input placeholder="请输入您的姓名"></el-input>
        <el-input placeholder="请输入手机号"></el-input>
        <el-input placeholder="请输入登录名"></el-input>
        <el-input placeholder="请输入登录密码"></el-input>
        <el-input placeholder="请再次确认登录密码"></el-input>
        <el-button @click="toGetinfor">重置密码</el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'resetpwd',
    data() {
        return {};
    },
     methods: {
    goBack() {
      this.$router.go(-1);
    },
    toGetinfor() {
      this.$router.push('/getinfor');
    },
  },
};
</script>

<style lang='scss' scoped>

  .el-button {
    width: 520px;
    height: 78px;
    margin-top: 563px;
    background-color:#fe972c ;
    color: #fff;
  }

</style>

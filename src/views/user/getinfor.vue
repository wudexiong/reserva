<template>
  <div>
    <el-page-header>
      <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
      <span slot="content">个人信息</span>
    </el-page-header>
    <div class="box">
      <el-input></el-input>
      <el-input></el-input>
      <el-input></el-input>
    </div>
      <div class="footer">
      <el-button class="left" @click="left">退出系统</el-button>
      <el-button class="right" @click="right">修改密码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getinfor',
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    left() {
      this.$router.push('/signin');
    },
    right() {
      this.$router.push('/resetpwd');
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  margin: 0 auto;
  width: 600px;
  .el-input {
    margin-top: 20px;
    width: 600px;
    .el-input__inner {
      border: 2px solid #e5e5e5;
    }
  }
}
</style>

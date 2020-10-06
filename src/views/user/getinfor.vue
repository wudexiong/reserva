<template>
  <div>
     <Top title="个人信息"></Top>

    <div class="box">
      <el-input v-model="user.uname"></el-input>
      <el-input v-model="user.loginId"></el-input>
      <el-input v-model="user.phone"></el-input>
    </div>
      <div class="footer">
      <el-button class="left" @click="left">退出系统</el-button>
      <el-button class="right" @click="right">修改密码</el-button>
    </div>
  </div>
</template>

<script>
import Top from '@/components/common/top';

export default {
  name: 'getinfor',
  components: {
    Top,
  },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  created() {
    // 如果vuex中没有user信息，就去请求
    if (!this.user) {
      this.$store.dispatch('requsetInfor', {
        data: {},
        res() {
        },
        err(err) {
          console.log(err);
        },
      });
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 退出系统
    left() {
      // 退出系统登录，触发vuex中的logOut重置信息
      this.$store.commit('logOut');
      // 跳转到登录页面
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
.el-input{
      border: 2px solid #DCDFE6;
}
</style>

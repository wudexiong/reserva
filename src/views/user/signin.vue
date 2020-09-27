<template>
<div class="box">
  <div class="signinForm">
    <el-form>
      <p class="title">欢迎登录</p>
      <el-input v-model="loginId" placeholder="请输入账号">
        <i slot="prefix" class="icon iconicontouxiang"></i>
      </el-input>
      <el-input placeholder="请输入密码" v-model="passwd" show-password>
        <i slot="prefix" class="icon iconmima"></i>
      </el-input>
      <el-button class="but" @click="submit">登录</el-button>
      <p class="hintText">还没去注册?<a @click="goRegistered">去注册</a></p>
    </el-form>
 </div>
</div>
</template>

<script>
import { signin } from '@/api/user';
import { mapMutations } from 'vuex';

export default {
  name: 'signin',
  data() {
    return {
      loginId: '',
      passwd: '',
    };
  },
  computed: {},
  methods: {
    ...mapMutations(['setToken']),
    async submit() {
      await signin().then(res => res.token);
      this.$router.push('/reserv');
    },
    // 跳转到注册页面
    goRegistered() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style lang="scss" scoped type="text/css">

/deep/.signinForm {
  height: 100vh;
  background: linear-gradient(#fe9e3b, #ff901f) !important;
  text-align: center;
  display: flex;
  justify-content: center;
   padding-top: 191px;
  .title {
    font-size: 55px;
    color: #e6e6e6;
  }
  .el-button {
    width: 520px;
    height: 78px;
    margin-top: 151px;
    color: #fe8d1d;

  }
  .hintText {
    color: #feb164;
    margin-top: 20px;
    a {
      color: #e4e7e6;
      text-decoration: none;
      margin-left: 15px;
    }
  }
  .el-input {
    margin-top: 38px;
    background-color: #feb873;
    border-radius: 10px;
    .el-input__prefix {
      text-align: center;
      padding: 0 25px;
      height: 100%;
      line-height: 78px;
      color: #fff;
      i {
        font-size: 33px;
      }
    }
    .el-input__inner {
      color: #e4e8e4;
      background-color: #feb873;
      width: 420px;
      height: 78px;
    }
  }

  /*修改提示文字的颜色*/

  input::-webkit-input-placeholder {
    /* WebKit browsers */

    color: #e4e8e4;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */

    color: #e4e8e4;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */

    color: #e4e8e4;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10+ */

    color: #e4e8e4;
  }
}
</style>

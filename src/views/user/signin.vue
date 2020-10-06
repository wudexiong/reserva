<template>
  <div class="box">
    <div class="signinForm">
      <el-form :model="user" :rules="rules" ref="loginFome">
        <p class="title">欢迎登录</p>
        <!-- 用户 -->
        <el-form-item prop="loginId">
          <el-input v-model="user.loginId" placeholder="请输入账号">
            <i slot="prefix" class="icon iconicontouxiang"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passwd">
          <el-input
            placeholder="请输入密码"
            v-model="user.passwd"
            show-password
          >
            <i slot="prefix" class="icon iconmima"></i>
          </el-input>
        </el-form-item>
        <!-- 登录 -->
        <el-button class="but" @click="submit">登录</el-button>
        <!-- 去注册 -->
        <p class="hintText">还没去注册?<a @click="goRegistered">去注册</a></p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'signin',
  data() {
    return {
      user: {
        loginId: '',
        passwd: '123456',
      },
      rules: {
        // 验证用户名是否合法
        loginId: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions(['requsetSignin', 'requsetInfor']),
    submit() {
      // 缓存this对象
      const t = this;
      t.$refs.loginFome.validate((valid) => {
        //  值为空 退出函数
        if (!valid) return;
        // 触发vuex 的actions事件
        this.requsetSignin({
          // 请求的登录需要的参数
          data: this.user,
          // 成功返回的结果
          res: () => {
            // 提示用户登录成功
            t.$message.success('登录成功');
            // 最后跳转预定午餐页面
            t.$router.push('/reserv');
          },
          // 失败返回的结果
          err: () => {
            // 用户密码错误时，输入框清空，这里不提示用户是以为在响应拦截器中统一的进行了拦截并提示对应信息
            t.user.loginId = '';
            t.user.passwd = '';
          },
        });
        // 验证通过 vuex action进行处理
      });
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
    margin-bottom: 120px;
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
  .el-form-item{
    margin-top: 40px;
    }
  .el-input {
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
      border: unset;
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

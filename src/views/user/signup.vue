<template>
  <div class="main">
    <Top title="注册"></Top>
    <el-form :model="user" :rules="rules" ref="signupFome" class="inputBox">
      <el-form-item prop="uname">
        <el-input v-model="user.uname" placeholder="请输入您的姓名"></el-input>
      </el-form-item>
      <el-form-item prop="phoneNum">
        <el-input v-model="user.phoneNum" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="loginId">
        <el-input v-model="user.loginId" placeholder="请输入登录名"></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
        <el-input v-model="user.passwd" show-password placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item prop="passwd1">
        <el-input
          v-model="user.passwd1"
          placeholder="请再次确认登录密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-button @click="toSignup">注册</el-button>
    </el-form>
  </div>
</template>

<script>

import Top from '@/components/common/top';

import { resetpwd } from '@/api/user';

export default {
  name: 'signup',
  components: {
    Top,
  },
  data() {
    // 密码验证规则
      const validatePass = (rule, value, callback) => {
        if (!(/^(?=.*[A-Z])[^]{8,16}$/.test(value))) {
          callback(new Error('8~16个字符之间，必须有1个大写字母'));
        } else {
          callback();
        }
      };
      // 重复密码规则
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      // 手机号验证规则;
      const validatePhoneNum = (rule, value, callback) => {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
          callback(new Error('手机号不符合格式'));
        } else {
          callback();
        }
      };
      // 验证中文名字或英文名可以带空格
      const validateName = (rule, value, callback) => {
        if (!(/^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/.test(value))) {
          callback(new Error('姓名不符合规范，请输入中文或英文名字'));
        } else {
          callback();
        }
      };
      // 登录名正则：4到16位（字母，数字，下划线，减号）
       const validateId = (rule, value, callback) => {
        if (!(/^([a-zA-Z]|[0-9]){4,16}$/.test(value))) {
          callback(new Error('请输入4到16位的字母或数字等'));
        } else {
          callback();
        }
      };
      return {
      user: {
        loginId: '',
        passwd: '',
        passwd1: '',
        uname: '',
        phoneNum: '',
      },
      rules: {
        // 登录名验证
        loginId: [
            { validator: validateId, trigger: 'blur' },
          ],
        // 验证姓名
        uname: [
            { validator: validateName, trigger: 'blur' },
          ],
        // 手机验证是否合法
        phoneNum: [
            { validator: validatePhoneNum, trigger: 'blur' },
          ],
        passwd: [
            { validator: validatePass, trigger: 'blur' },
          ],
        passwd1: [
            { validator: validatePass2, trigger: 'blur' },
          ],
      },
    };
  },
  methods: {
    toSignup() {
      const t = this;
      t.$refs.signupFome.validate((valid) => {
         //  值为空 退出函数
        if (!valid) return;
        // 请求注册
        resetpwd(t.user).then((res) => {
           t.$message.success(`用户名:${res.user}`);
           t.$router.push('/signin');
        });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.el-button {
  width: 520px;
  height: 78px;
  margin-top: 463px;
  background-color: #fe972c;
  color: #fff;
}
</style>

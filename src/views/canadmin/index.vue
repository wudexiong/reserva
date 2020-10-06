<template>
  <el-container>
    <el-aside width="130px">
      <el-aside width="130px"
        ><div class="grid-content bg-purple-dark">
          <el-avatar
            :size="100"
            icon="el-icon-user-solid"
            class="avatar"
          ></el-avatar>
          <ul class="list">
            <router-link
              to="/management"
              tag="li"
              class="icon iconcaidanguanli"
              >菜单管理</router-link
            >
            <router-link
              to="/category"
              tag="li"
              class="icon iconleibieguanli_icox"
              >类别管理</router-link
            >
            <router-link
              to="/comment"
              tag="li"
              class="icon iconhua"
              >评论记录</router-link
            >
          </ul>
        </div>
      </el-aside></el-aside
    >
    <el-container>
      <el-header
        ><el-header
          ><el-card>
            <div slot="header" class="header">
              <el-button class="but" @click="back">退出</el-button>
            </div>
          </el-card>
        </el-header></el-header
      >
      <el-main>
        <el-card class="main">
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { evalquery, getstaffsCondit, createstaff } from '@/api/admin';

export default {
  name: 'canadmin',
  data() {
    // 手机号验证规则;
    const validatePhoneNum = (rule, value, callback) => {
      if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(value)) {
        callback(new Error('手机号不符合格式'));
      } else {
        callback();
      }
    };
    // 验证中文名字或英文名可以带空格
    const validateName = (rule, value, callback) => {
      if (!/^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/.test(value)) {
        callback(new Error('姓名不符合规范，请输入中文或英文名字'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      currentPage: 1,
      centerDialogVisible: false,
      total: 1000,
      sName: '',
      phone: '',
      isSeek: false,
      addData: {
        sname: '',
        phone: '',
      },
      rules: {
        // 验证姓名
        sname: [{ validator: validateName, trigger: 'blur' }],
        // 手机验证是否合法
        phone: [{ validator: validatePhoneNum, trigger: 'blur' }],
      },
      active: 1,
    };
  },
  created() {
    this.getStaff(1, 10);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.user.loginId !== 'canadmin') {
        vm.$store.dispatch('requsetInfor', {
          data: {},
          res(res) {
            if (res.loginId !== 'canadmin') {
              vm.$message.error('您没有这个权限访问该页面');
              // 跳转到登录页面
              vm.$router.push('/');
            }
          },
        });
      }
    });
  },
  methods: {
    // 获取员工请求
    async getStaff(no, size) {
      // no 是页数，size是几条
      const { data } = await evalquery({ pageNo: no, pageSize: size });
      this.tableData = data;
    },
    // 分页请求
    handleCurrentChange(val) {
      if (this.sName === '' && this.phone === '') {
        this.getStaff(val, 10);
      } else {
        this.seek(val, 10);
      }
    },
    async seek(no, size) {
      const { data } = await getstaffsCondit({
        pageNo: no,
        pageSize: size,
        sName: this.sName,
        phone: this.phone,
      });
      this.tableData = data;
    },
    // 新增员工确认
    notarize() {
      const t = this;
      t.$refs.signupFome.validate(async (valid) => {
        //  值为空 退出函数
        if (valid) {
          const { staffId } = await createstaff(t.addData);
          t.tableData.unshift({
            staffId,
            sName: t.addData.sname,
            loginId: t.addData.sname,
            phone: t.addData.phone,
            wState: 0,
          });
        }
      });
      t.centerDialogVisible = false;
    },
    back() {
      // 退出系统登录，触发vuex中的logOut重置信息
      this.$store.commit('logOut');
      // 跳转到登录页面
      this.$router.push('/signin');
    },
  },
};
</script>

<style lang='scss' scoped>
/deep/ .router-link-active{
  background-color: #ff9933;
}
/deep/.el-aside {
  background-color: #ff8d1c;
  width: 231px;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  .el-avatar {
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-top: 58px;
    background: #ffca95;
    .el-avatar--circle {
      margin: 0px auto;
      height: 100px;
    }
    .el-icon-user-solid {
      line-height: 100px;
      font-size: 100px;
      color: #ff8d1c;
    }
  }
}
/deep/.list {
  margin-top: 60px;
  li {
    width: 100%;
    color: #fff;
    font-size: 30px;
    padding: 25px 0;

    i {
      width: 20px;
      height: 20px;
      color: #fff;
      font-size: 30px;
      margin-right: 16px;
    }
  }
  .active {
    background: #ffb884;
  }
}
/deep/.el-card.is-always-shadow {
  display: flex;
  align-items: center;
}
/deep/ .el-card__header {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: flex-end;
  .el-button {
    border: 2px solid #ff8d1c;
    width: 141px;
    height: 52px;
    color: #ff8d1c;
  }
}
.sousuo {
  display: flex;
  margin-bottom: 20px;
  input {
    background: #fafafa;
    border: 2px solid #cccccc;
    margin-right: 20px;
    border-radius: 10px;
    height: 50px;
    outline: none;
  }
  button {
    background: #ff8d1c;
    padding: 0 20px;
    color: #fff;
    border-radius: 10px;
    border: 0;
  }
}
.title {
  color: #ffb884;
  margin-bottom: 20px;
}

/deep/.el-table .cell {
  padding: 10px 0;
  text-align: center;
}
/deep/ .el-table__row:nth-child(odd) {
  background: #fafafa;
}
/deep/.el-pagination {
  display: flex;
  justify-content: flex-end;
}
/deep/.el-pagination span:not([class*="suffix"]) {
  display: flex;
}
.state {
  color: #ffb884;
}
.oper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .title {
    color: #ff8d1c;
  }
  button {
    background: #ff8d1c;
    color: #fff;
  }
}
.el-input {
  margin-top: 30px;
}
.list {
  li {
    cursor: pointer;
  }
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: unset !important;
}
.el-main {
  overflow: unset !important;
}
</style>

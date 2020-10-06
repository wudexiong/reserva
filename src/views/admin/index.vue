<template>
  <el-container>
    <el-aside width="130px"
      ><div class="grid-content bg-purple-dark">
        <el-avatar :size="100" icon="el-icon-user-solid"></el-avatar>
        <ul class="list">
          <li class="el-icon-user">员工管理</li>
          <li>员工列表</li>
        </ul>
      </div>
    </el-aside>
    <el-container>
      <el-header
        ><el-card>
          <div slot="header" class="header">
            <el-button class="but" @click="back">退出</el-button>
          </div>
        </el-card>
      </el-header>
      <el-main>
        <el-card>
          <div class="sousuo">
            <input type="text" placeholder="员工姓名" v-model="sName" />
            <input type="text" placeholder="员工手机号" v-model="phone" />
            <button @click="seek(currentPage, 10)">搜索</button>
          </div>
          <div class="oper">
            <p class="title">员工信息</p>
            <div>
              <el-button @click="centerDialogVisible = true"
                >新增员工</el-button
              >
              <el-button>批量导入</el-button>
            </div>
          </div>
          <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column type="index" width="150" label="编号">
            </el-table-column>
            <el-table-column label="员工姓名" width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.sName }}</p>
              </template>
            </el-table-column>
            <el-table-column label="员工手机号" width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.phone }}</p>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.wState === 0">正常</span>
                <span v-if="scope.row.wState === 1">注销</span>
                <span v-if="scope.row.wState === 2">暂停使用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope" class="">
                <span
                  v-if="scope.row.wState !== 1"
                  class="state"
                  @click="zhuxiao(scope.$index, scope.row)"
                  ><i class="icon iconguanji"></i>注销</span
                >
                <span v-if="scope.row.wState === 2 || scope.row.wState === 1"
                  ><i class="icon iconguanji"></i>已注销</span
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-card>
        <el-dialog
          title="新增员工"
          :visible.sync="centerDialogVisible"
          width="fit-content"
          center
        >
          <el-form :model="addData" :rules="rules" ref="signupFome">
            <el-form-item prop="sname">
              <el-input
                v-model="addData.sname"
                placeholder="请输入您的姓名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                v-model="addData.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="notarize">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  evalquery,
  getstaffsCondit,
  createstaff,
  cancelstaff,
} from '@/api/admin';

export default {
  name: 'admin',
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
    };
  },
  created() {
    this.getStaff(1, 10);
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.user.loginId !== 'admin') {
        vm.$store.dispatch('requsetInfor', {
          data: {},
          res(res) {
            if (res.loginId !== 'admin') {
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
          t.centerDialogVisible = false;
        }
      });
    },
    async zhuxiao(index, data) {
      await cancelstaff({ staffId: data.staffId }).then(() => {
        this.tableData[index].wState = 1;
      });
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
.table {
  cursor: pointer;
}
/deep/.el-aside {
  background-color: #ff8d1c;
  width: 231px;
  height: 100vh;
  display: flex;
  justify-content: center;
  .el-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 58px;
    background: #ffca95;
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
    color: #fff;
    font-size: 30px;
    padding: 10px;
    margin-top: 30px;
    text-align: center;
    cursor: pointer;
    i {
      width: 20px;
      height: 20px;
      color: #fff;
      font-size: 30px;
      margin-right: 16px;
    }
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
/deep/ .is-leaf {
  height: 69px;
  background: #e4e7ef;
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
  span:not([class*="suffix"]) {
    display: flex;
  }
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
</style>

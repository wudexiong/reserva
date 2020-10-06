<template>
  <div>
    <Top title="预定午餐"></Top>
    <ul class="nutchBox">
      <!-- 预定午餐截至时间 -->
      <el-alert :title="getTimeRemain" type="error" :closable="false">
      </el-alert>
      <!-- /预定午餐截至时间 -->
      <li>
        <span>员工姓名</span>
        <span>{{ user.uname }}</span>
      </li>
      <li class="">
        <span>就餐日期</span>
        <span>{{ getDate }}</span>
      </li>
      <ul class="products">
        <li>午餐单品选择</li>
        <!-- 预定的餐品列表 -->
        <li
          :v-if="selectList.length > 0"
          v-for="item in selectList"
          :key="item.foodId"
        >
          <span>{{ item.foodName }}</span>
          <span>数量：{{ item.foodAmt }}份</span>
        </li>
        <!-- /预定的餐品列表 -->
        <li>
          <!-- 添加预定餐品按钮 -->
          <div class="add" @click="centerDialogVisible = true">
            <i class="el-icon-plus"></i>
          </div>
          <!-- /添加预定餐品按钮 -->
        </li>
      </ul>
    </ul>
    <!-- 选择要预定的餐品弹窗 -->
    <el-dialog
      title="选择午餐"
      :visible.sync="centerDialogVisible"
      ref="dialog"
      class="textScroll"
      center
    >
      <!-- 餐品列表 -->
      <el-tree :data="list" node-key="foodId" ref="tree" :props="defaultProps">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <!-- 加减餐品数量 -->
          <div>
           <i
              round
              class="el-icon-remove-outline"
              @click="add('MINUS', data.foodId)"
            ></i>
            <span>{{ data.foodAmt }}</span
            >
             <i
              round
              class="el-icon-circle-plus-outline"
              @click="add('PLUS', data.foodId)"
            ></i>
          </div>
          <!-- /加减餐品数量 -->
        </span>
      </el-tree>
      <!-- /餐品列表 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" class="right" @click="getCheckedNodes"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- /选择要预定的餐品弹窗 -->

    <div class="footer">
      <el-button class="left" @click="left">取消</el-button>
      <el-button class="right" @click="right">提交订单</el-button>
    </div>
  </div>
</template>

<script>
import Top from '@/components/common/top';
import { nextdaymenu } from '@/api/reserv/';

export default {
  name: 'reserv',
  components: {
    Top,
  },
  data() {
    return {
      // 弹窗开关
      centerDialogVisible: false,
      // 用户信息
      user: {},
      // 选中餐品列表
      selectList: [],
      // 明天的所有餐品列表
      list: [],
      // tree树结构配置（餐品列表配置）
      defaultProps: {
        // 显示的子树节点名称（也就是子数组）
        children: 'children',
        // 显示标题的名称
        label: 'foodName',
      },
      // 预定餐品截至时间
      date: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
  },
  created() {
    // 拿到vuex中存储的个人信息
    this.getInfor();
    // 开启预定午餐倒计时
    this.startTime();
    // 获取弹框内明天午餐列表数据
    nextdaymenu({}).then((res) => {
      res.data.forEach((item) => {
        // 添加属性，foodAmt预定的餐品的数量
        // eslint-disable-next-line no-param-reassign
        item.foodAmt = 0;
      });
      this.list = res.data;
    });
  },
  mounted() {},
  methods: {
    left() {
      this.$router.push('/getinfor');
    },
    // 提交订单
    right() {
      const t = this;
      if (t.selectList.length > 0) {
        t.$store.dispatch('setSelectList', {
          data: {
            // 订餐日期（这里就是最新提交的日期）
            orderTime: new Date(),
            // 预订的就餐日期(这里给的是餐品的对应日期)
            dinningTime: t.selectList[0].corrDate,
            // food就是选择的菜品
            food: t.selectList,
          },
          res(res) {
            t.$router.push({
              path: `/getorder/${res}`,
            });
          },
          err(err) {
            console.log(err);
          },
        });
      } else {
        t.$message({
          message: '您还没有预定午餐哦！',
          type: 'error',
        });
      }
    },
    // 拿到vuex中存储的个人信息
    getInfor() {
      const user = this.$store.state.user;
      if (user) {
        this.user = user;
      } else {
        // 触发actions拿到个人信息
        this.$store.dispatch('requsetInfor', {
          // 这个接口请求不需要其他参数，token会在请求时自动添加
          data: {},
          res: (res) => {
            // 请求成功，拿到了user个人信息
            this.user = res;
          },
          err: (err) => {
            console.log(err);
          },
        });
      }
    },
    // 开始预定午餐计时
    startTime() {
      // 初始化时间差
      this.TimeDifference();
      const time = setInterval(() => {
        const d = this.date;
        // 每秒递减
        d.s -= 1;
        // 秒数为0则赋值60,分钟数减去1
        if (d.s === 0) {
          d.s = 60;
          d.m -= 1;
        }
        // 分钟数为0就赋值60,则小时减1,
        if (d.m === 0) {
          d.h -= 1;
        }
        if (d.h === 0 && d.m === 0 && d.s === 0) {
          // 时间都为0时,清除计时器
          clearInterval(time);
        }
      }, 1000);
    },
    // 格式化时间,当时间为个位数时,在前面加上一个0
    tow(n) {
      return n >= 0 && n < 10 ? `0${n}` : `${n}`;
    },
    // 计算订餐截至时间的时分秒
    TimeDifference() {
      const t = this;
      // 获取明天时间
      let d = this.timeTomorrow;
      // 设置明天时间的0时0分0秒
      // d 创建订餐的时间截至时间---明天的00：00：00
      d = new Date(
        `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} 00:00:00`,
      );
      // 截至日期 - 当前时间 得到 d = 剩余的时间差（毫秒）
      d = d.getTime() - new Date().getTime();
      // 将时间差转换为秒
      d /= 1000;
      // 天
      // const day = Math.floor(d / (24 * 60 * 60));
      d %= 24 * 60 * 60;
      // 时
      t.date.h = Number(Math.floor(d / 3600));
      d %= 3600;
      // 分
      t.date.m = Number(Math.floor(d / 60));
      // 秒
      d %= 60;
      // eslint-disable-next-line radix
      t.date.s = Number(parseInt(d));
    },
    // 获取选取好的餐品
    getCheckedNodes() {
      this.centerDialogVisible = false;
      // 筛选foodAmt数量大于0的餐品，并赋值给selectList选中列表
      this.selectList = this.list.filter(item => item.foodAmt > 0);
    },
    // 餐品数量的加减
    add(type, id) {
      switch (type) {
        // 加
        case 'PLUS':
          this.list.forEach((item) => {
            if (item.foodId === id) {
              // eslint-disable-next-line no-param-reassign
              item.foodAmt += 1;
            }
          });
          break;
        // 减
        case 'MINUS':
          this.list.forEach((item) => {
            if (item.foodId === id && item.foodAmt > 0) {
              // eslint-disable-next-line no-param-reassign
              item.foodAmt -= 1;
            }
          });
          break;
        default:
          break;
      }
    },
  },
  computed: {
    // 获取明天时间
    timeTomorrow() {
      return this.$store.getters.timeTomorrow;
    },
    // 显示就餐时间
    getDate() {
      const d = this.timeTomorrow;
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    },
    // 显示今日订餐剩余时间
    getTimeRemain() {
      const d = this.date;
      return `提示：明天午餐预定将在今天${this.tow(d.h)}时${this.tow(
        d.m,
      )}分${this.tow(d.s)}秒截至。`;
    },
  },
};
</script>

<style lang='scss' scoped>
// 滑动核心
/deep/ .el-tree {
  font-size: 35px;
  height: 520px;
  overflow: auto;
  .el-tree-node__content {
    padding: 20px;
  }
  .custom-tree-node {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 4px 0 0;
    }
  }
}
// 隐藏滚动条
.el-tree::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

/deep/ .el-dialog__body {
  overflow: hidden;
}
.nutchBox {
  margin: 0 auto;
  /deep/ .el-alert__title {
    padding-left: 35px;
  }
  li {
    display: flex;
    justify-content: space-between;
    margin: 0 30px;
    border-bottom: 2px solid #f1f1f1;
    padding: 30px;
  }
  .products {
    li {
      border-bottom: 0;
    }
    .add {
      width: 100px;
      height: 100px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      border: 2px solid #cbcbcb;
      i {
        line-height: 40px;
        font-size: 40px;
      }
    }
  }
}

/deep/ .el-dialog {
  position: relative;
  height: 700px;
  width: 560px;
  border-radius: 20px;
  .el-dialog__title {
    font-size: 33px;
    font-weight: 700;
  }
  .el-dialog__footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0px;
    width: 100%;
    .dialog-footer {
      display: flex;
      width: 100%;
      border-top: 2px solid #cbcbcb;
      .el-button {
        z-index: 200;
        border: 0;
        text-align: center;
        height: 82px;
        width: 280px;
        border-radius: 0 0 0 20px;
      }
      .right {
        border-radius: 0 0 20px 0;
        border-left: 2px solid #cdcdcd;
      }
      .el-button + .el-button {
        margin-left: 0;
      }
      .el-button--primary {
        background-color: #fff;
        color: #f1973e;
      }
    }
  }
}
</style>

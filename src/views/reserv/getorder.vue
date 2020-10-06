<template>
  <div>
    <Top title="预定午餐成功"></Top>
    <div class="box">
      <ul class="nutchBox">
        <li>
          <span>员工姓名</span>
          <span>{{ userName }}</span>
        </li>
        <li>
          <span>就餐日期</span>
          <span>{{ data.dinningTime }}</span>
        </li>
        <ul class="products" v-if="data.food">
          <li class="p">所选餐品</li>
          <li v-for="(item, index) in data.food" :key="index">
            <span>{{ item.foodName }}</span>
            <span>{{ item.foodAmt }}份</span>
          </li>
        </ul>
      </ul>
    </div>
    <div class="footer">
      <el-button class="left" @click="goBack">返回</el-button>
      <el-button class="right" @click="right">历史点餐</el-button>
    </div>
  </div>
</template>

<script>
import Top from '@/components/common/top';

export default {
  name: 'getorder',
  components: {
    Top,
  },
  data() {
    return {
      data: {},
      userName: '',
    };
  },
  props: ['id'],
  created() {
    // 初始化
    this.init();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push('/getorderBytime');
    },
    // 初始化数据
    init() {
      const t = this;
      try {
        // 在veux中看有没有对应的数据，避免发起一次请求
        t.data = t.$store.state.selectList.data;
        t.userName = t.$store.state.user.uname;
      } catch (error) {
        // 没有就请求
        t.$store.dispatch('requstOrder', {
          data: {
            // 传入路由接受过来的id或者vuex存储的id
            orderId: t.id || t.$store.state.selectList.orderId,
          },
          res(res) {
            console.log(res);
            t.data = res;
            t.iserName = res.uname;
          },
          err(err) {
            console.log(err);
          },
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  margin: 0 auto;
}
.nutchBox {
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
  }
}
</style>

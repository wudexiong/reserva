<template>
  <div>
    <el-page-header>
      <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
      <span slot="content">餐品评价列表</span>
    </el-page-header>
    <div class="box">
      <ul class="nutchBox">
        <li class="evel">
          <ul>
            <li>餐品名称</li>
            <li>数量</li>
            <li>
              <span>星级评价</span>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </li>
            <li><span>姓名：</span><span>xxxxxxxxxxx</span></li>
          </ul>
          <span class="time">7月14日 </span>
        </li>
      </ul>
    </div>
    <div class="footer">
      <el-button class="left" @click="goBack">返回</el-button>
      <el-button class="right" @click="right">我要评价</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eval',
  data() {
    return {
      value: 3.7,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push('/submiteval');
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
    padding: 20px;
  }
  .evel {
    li {
      border-bottom: 0;
    }
    .time {
      padding: 20px;
    }
 .el-rate__icon{
        font-size:26px;

    }
  }
}
</style>

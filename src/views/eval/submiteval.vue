<template>
  <div>
    <el-page-header>
      <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
      <span slot="content">餐品评价</span>
    </el-page-header>
    <ul class="main">
      <li class="query">
        <span>选择餐品</span>
        <span class="el-icon-arrow-right"></span>
      </li>
      <li class="evel">
        <span>评分</span>
        <el-rate v-model="value"></el-rate>
      </li>
      <li>
        <el-input
          type="textarea"
          placeholder="来留下您的评价或建议..."
        ></el-input>
      </li>
      <li class="radio">
        <el-radio v-model="radio" label="1">实名评价</el-radio>
        <el-radio v-model="radio" label="2">匿名提交</el-radio>
      </li>
    </ul>
    <div class="footer">
      <el-button class="left" @click="left">取消</el-button>
      <el-button class="right" @click="right">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submiteval',
  data() {
    return {
      value: 0,
      radio: 1,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    left() {
      this.$router.push('/getorderBytime');
    },
    right() {
      this.$router.push('/eval');
    },
  },
};
</script>

<style lang='scss' scoped>
.main {
  li {
    margin: 0 30px;
    border-bottom: 2px solid #f1f1f1;
    padding: 20px;
  }
  .query {
    display: flex;
    justify-content: space-between;
  }
  .radio {
    border-bottom: 0;
  }
  .evel {
    display: flex;
  }
  /deep/ .el-radio__inner {
    height: 30px;
    width: 30px;
    border: 2px solid #c0c4cc;
  }
}
</style>

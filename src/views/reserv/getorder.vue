<template>
  <div>
    <el-page-header>
      <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
      <span slot="content">午餐预定成功</span>
    </el-page-header>
    <div class="box">
      <ul class="nutchBox">
        <li>
          <span>员工姓名</span>
          <span>嘻嘻嘻</span>
        </li>
        <li>
          <span>就餐日期</span>
          <span>2020-9-1</span>
        </li>
        <ul class="products">
          <li class="p">所选餐品</li>
          <li>
            <span>午餐单品</span>
            <span>1份</span>
          </li>
        </ul>
      </ul>
    </div>
     <div class="footer">
      <el-button class="left"  @click="goBack">返回</el-button>
      <el-button class="right"  @click="right">历史点餐</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getorder',
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push('/getorderBytime');
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

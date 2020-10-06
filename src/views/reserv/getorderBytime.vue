<template>
  <div>
         <Top title="历史订单"></Top>

    <div class="box">
      <ul class="nutchBox">
        <li>
          <span>就餐日期</span>
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              @change ="change"
            >
            </el-date-picker>
            <i class="el-icon-arrow-right"></i>
          </div>
        </li>
        <ul class="products" v-if="list.length > 0">
          <li class="p">所选餐品</li>
          <li v-for="(item, index) in list" :key="index">
            <span>{{item.foodName}}</span>
            <span>{{item.foodAmt}}份</span>
          </li>
        </ul>
      </ul>
    </div>
    <div class="footer">
      <el-button class="left" @click="goBack">返回</el-button>
      <el-button class="right" @click="right">重新订单</el-button>
    </div>
  </div>
</template>

<script>
import Top from '@/components/common/top';

// 导入请求历史订单接口
import { getorderBytime } from '@/api/reserv';

export default {
  name: 'getorderBytime',
   components: {
    Top,
  },
  data() {
    return {
      // 订单列表
      list: [],
      // 就餐日期
      value1: this.$store.getters.timeTomorrow,
    };
  },
  created() {
    // 初始化历史订单
    this.change();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push('/reserv');
    },
    // 选择日期后触发请求，请求历史订单
    change() {
      getorderBytime({ dinTime: this.value1 }).then((res) => {
        this.list = res.infor.food;
      }, (err) => { console.log(err); });
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
    align-items: center;
  }
  .products {
    li {
      border-bottom: 0;
    }
  }
}
.block {
  display: flex;
  align-items: center;
}
/deep/ .el-date-editor {
  width: 185px;
  padding: 0;
  margin: 0;
  border: 0;
  .el-input__icon {
    display: none;
  }
  .el-input__inner {
    border: 0;
    padding:0;
  }
}
.el-date-editor{
  width: 80px;
}

</style>

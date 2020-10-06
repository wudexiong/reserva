<template>
  <div>
    <Top title="餐品评价列表"></Top>
    <div class="block"></div>
    <div class="box">
      <ul class="nutchBox" v-if="list.length > 0">
        <li class="evel" v-for="(item, index) in list" :key="index">
          <ul>
            <div class="name">
              <li>{{ item.foodName }}</li>
              <span class="time">{{ item.evalTime }}</span>
            </div>
            <li class="rete">
              <span>星级评价</span>
              <el-rate
                v-model="item.evalNum"
                disabled
                show-score
                text-color="#ff9900"
              >
              </el-rate>
            </li>
            <li>
              <span>{{ item.sName }}:</span><span>{{ item.evalCont }}</span>
            </li>
          </ul>
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
import Top from '@/components/common/top';
import { evalquery } from '@/api/eval';

export default {
  name: 'eval',
  components: {
    Top,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push('/submiteval');
    },
    async init() {
      const { data } = await evalquery({
        // 排序字段，只能是evalnum（星级）、evaltime（评价日期）之一
        sortFiled: 'evalnum',
        // 排序方式，只能是1（升序）或0（降序）
        sortway: 1,
        pageNo: 1,
        pageSize: 10,
      });
      // eslint-disable-next-line no-param-reassign
      data.food.forEach((item) => { item.evalNum = Number(item.evalNum) / 2; });
      this.list = data.food;
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  height: 95vh;
  margin: 0 auto;
}
.nutchBox {
  height: 80%;
  overflow: auto;
  li {
    justify-content: space-between;
    margin: 0 30px;
    border-bottom: 2px solid #f1f1f1;
    padding: 20px;
  }
  .name {
    display: flex;
    justify-content: space-between;
  }
  .rete {
    display: inline-flex;
  }
  .evel {
    li {
      border-bottom: 0;
    }
    .time {
      padding: 20px;
    }
    .el-rate__icon {
      font-size: 26px;
    }
  }
}
</style>

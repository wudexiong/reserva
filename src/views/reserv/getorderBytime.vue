<template>
  <div>
    <el-page-header>
      <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
      <span slot="content">历史订单</span>
    </el-page-header>
    <div class="box">
      <ul class="nutchBox">
        <li>
          <span>就餐日期</span>
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="date"
              id="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <i class="el-icon-arrow-right"></i>
          </div>
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
      <el-button class="left" @click="goBack">返回</el-button>
      <el-button class="right" @click="right">重新订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getorderBytime',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              // eslint-disable-next-line no-mixed-operators
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              // eslint-disable-next-line no-mixed-operators
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },
      value1: '2020-9-9',
      value2: '',
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push('/reserv');
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
  }
}

</style>

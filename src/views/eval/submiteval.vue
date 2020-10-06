<template>
  <div>
    <Top title="餐品评价"></Top>
    <ul class="main">
      <li class="query" @click="query">
        <span>选择餐品</span>
        <span class="el-icon-arrow-right"></span>
      </li>
      <li class="evel">
        <span>评分</span>
        <el-rate v-model="params.evalNum"></el-rate>
      </li>
      <li>
        <el-input
          type="textarea"
          v-model="params.textarea"
          placeholder="来留下您的评价或建议..."
        ></el-input>
      </li>
      <li class="radio">
        <el-radio v-model="params.realName" label="-1">实名评价</el-radio>
        <el-radio v-model="params.realName" label="0">匿名提交</el-radio>
      </li>
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
     <ul v-if="list">
       <li v-for="(itme, index) in list" :key="index">
         {item}
       </li>
     </ul>
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
      <el-button class="right" @click="right">确定</el-button>
    </div>
  </div>
</template>

<script>
import Top from '@/components/common/top';

import { submiteval } from '@/api/eval';

export default {
  name: 'submiteval',
  components: {
    Top,
  },
  data() {
    return {
      params: {
        foodId: null,
        evalNum: 0,
        realName: -1,
        textarea: '',
        evalTime: new Date(),
      },
      centerDialogVisible: false,
      list: this.$store.state.selectList,
    };
  },
  methods: {
    left() {
      this.$router.push('/getorderBytime');
    },
    right() {
      if (this.params.textarea.length < 4) {
        this.$message('评论内容应当超过4个字符');
      } else {
this.params.evalNum *= 2;
      this.params.realName = +this.params.realName;
      submiteval(this.params).then(() => {
        this.$router.push('/eval');
      });
}
    },
    getCheckedNodes() {
      this.centerDialogVisible = false;
    },
    query() {
      this.centerDialogVisible = true;
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
}
</style>

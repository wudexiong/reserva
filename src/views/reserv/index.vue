<template>
  <div>
    <el-page-header>
      <span slot="title" class="el-icon-arrow-left" @click="goBack"></span>
      <span slot="content">预定午餐</span>
    </el-page-header>
    <ul class="nutchBox">
      <el-alert
        title="提示：明天午餐预定将在今天XX：XX截至。"
        type="error"
        :closable="false"
      >
      </el-alert>
      <li>
        <span>员工姓名</span>
        <span>嘻嘻嘻</span>
      </li>
      <li class="">
        <span>就餐日期</span>
        <span>2020-9-1</span>
      </li>
      <ul class="products">
        <li>午餐单品选择</li>
        <li>
          <span>餐品名称</span>
          <span>数量：1份</span>
        </li>
        <li>
          <div class="add" @click="centerDialogVisible = true">
            <i class="el-icon-plus"></i>
          </div>
        </li>
      </ul>
    </ul>
    <el-dialog title="选择午餐" :visible.sync="centerDialogVisible" center>
      <el-tree> </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          class="right"
          @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="footer">
      <el-button class="left" @click="left">取消</el-button>
      <el-button class="right" @click="right">提交订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reserv',
  data() {
    return {
      centerDialogVisible: true,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    left() {
      this.$router.push('/getinfor');
    },
    right() {
      this.$router.push('/getorder');
    },
  },
};
</script>

<style lang='scss' scoped>
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
        text-align: center;
        height: 82px;
        width: 280px;
        border-radius: 0 0 0 20px;
      }
      .right {
        border-radius: 0 0 20px 0;
        border-left: 2px solid #cdcdcd;
      }
      .el-button--primary {
        background-color: #fff;
        color: #f1973e;
      }
    }
  }
}
</style>

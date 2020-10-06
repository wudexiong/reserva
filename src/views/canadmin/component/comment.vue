<template>
  <div class="">
    <div class="oper">
      <p class="title">员工信息</p>
    </div>
    <ul class="DegreeComment">
      <p>满意程度</p>
      <li :class="avtive===2?'isActive':''" @click="init(currentPage,1,2)">全部</li>
      <li :class="avtive===1?'isActive':''" @click="init(currentPage,1,1)">好评（5-3星）</li>
      <li :class="avtive===0?'isActive':''" @click="init(currentPage,0,0)">差评（1-2星）</li>
    </ul>
    <div class="box">
      <ul class="nutchBox" v-if="data.length > 0">
        <li class="evel" v-for="(item, index) in data" :key="index">
          <div> <el-avatar src="https://empty" @error="errorHandler">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar></div>


          <div class="right">
            <div class="infor">
              <div>
                <span class="sName">{{ item.sName }}</span>
                <div class="rate">
                  <span>评价</span>
                  <el-rate v-model="item.evalNum" disabled text-color="#ff9900">
                  </el-rate>
                </div>
              </div>

              <span class="time">{{ item.evalTime }}</span>
            </div>
            <p>订单详情{{ item.foodName }} 1份</p>

            <p class="cont">{{ item.evalCont }}</p>
          </div>
        </li>
      </ul>
      <div class="foter"><span>共{{data.length}}条评论</span> <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination></div>

    </div>
  </div>
</template>

<script>
import { evalquery } from '@/api/canadmin';

export default {
  name: 'comment',
  data() {
    return {
      data: [],
      total: 1000,
      currentPage: 1,
      avtive: 2,
    };
  },
  created() {
    this.init(1, 1);
    this.avtive = 2;
  },
  methods: {
    async init(pageNo, sortway, i) {
      this.avtive = i;
      await evalquery({
        //  — 排序字段，只能是evalnum（星级）、evaltime（评价日期）之一
        sortField: 'evalnum',
        //  	— 排序方式，只能是1（升序）或0（降序）
        sortway,
        // — 分页查询的页编号
        pageNo,
        // — 分页查询的页大小（行数）
        pageSize: 10,
      }).then((res) => {
        res.data.food.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.evalNum /= 2;
        });
        this.data = res.data.food;
        console.log(this.data);
      });
    },
    handleCurrentChange(val) {
     this.init(val, 1);
    },
    errorHandler() {
      return true;
    },
  },
};
</script>

<style lang='scss' scoped>
.oper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .title {
    color: #ff8d1c;
  }
  button {
    background: #ff8d1c;
    color: #fff;
  }
}
.DegreeComment {
  display: flex;
  margin-bottom: 20px;
  li {
    padding: 10px;
    margin-left: 20px;
    cursor: pointer;
  }
  p {
    padding: 10px 0;
  }
  .isActive {
    background-color: #ccc;
  }
}
/deep/.nutchBox {
  height: 60vh;
  overflow: auto;
  .evel {
    display: flex;
    margin-bottom: 20px;
    .el-avatar {
      width: 60px;
      height: 60px;
      line-height: 60px;
      margin-right: 10px;
    }
    .right{
         width:100%;
      padding-bottom: 10px;
      border-bottom: 2px solid #ccc;
    }
    .infor {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .sName {
        font-size: 20px;
      }
    }
    .rate {
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: 10px;
      color: #ccc;
    }
    .cont{
      display: block;
      width:100%;
      margin-top: 10px;
      background-color: #ccc;
    }
  }
}
.foter{
  display: flex;
  justify-content: space-between;
    margin-top: 30px;
}
/deep/.el-pagination {
  display: flex;
  span:not([class*="suffix"]) {
  display: flex;
}
}
</style>

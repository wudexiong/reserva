/* eslint-disable no-restricted-syntax */
<template>
  <div>
    <!-- -面包屑 -->
    <div class="oper">
      <p class="title">菜品信息</p>
      <div>
        <el-button @click="thisWeek" :class="isweek ? 'isweek' : ''">本周</el-button>
        <el-button @click="nextWeek" :class="isweek ? '' : 'isweek'">下周</el-button>
      </div>
    </div>
     <!--/ -面包屑 -->
     <!-- 周一到周日的数据展示 -->
    <div class="box">
      <!-- 两层遍历 -->
      <ul v-for="(item, index1) in week" :key="index1">
        <li class="weekName">{{ weekName[index1] }}</li>
        <li
          v-for="(food, index2) in item"
          :key="index2"
          :class="
            activeIndex[1] === index2 && activeIndex[0] === index1
              ? 'active'
              : ''
          "
          @click="select(index1, index2, food)"
        >
          {{ food.foodName }}
        </li>
        <div class="btnBox">
          <el-button @click="add(index1)">增加</el-button>
          <el-button @click="del(index1)">删除</el-button>
        </div>
      </ul>
    </div>
     <!-- /周一到周日的数据展示 -->
     <!-- 新增菜品弹框 -->
     <el-dialog title="新增菜品" :visible.sync="centerDialogVisible" center>
        <el-tree
          :data="data"
          :props="defaultProps"
          accordion
          highlight-current
          @node-click="nodeClick"
        ></el-tree>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
// 引入api接口函数
import {
  neweekdays,
  weekmenu,
  cancelfood,
  addfood,
  copymenu,
} from '@/api/canadmin';
import { clone } from '@/utils/clone';

export default {
  name: 'management',
  data() {
    return {
      // week展示数据，它指向thisData本周数据或者nextData下周数据
      week: [],
      // 周一到周日的标题，方便模板渲染
      weekName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // 显示点击的菜品，index和index1组成的坐标，用以显示准备删除的菜品样式
      activeIndex: [-1, -1],
      // 选择的餐品对应，删除时删除的就是这个对象内的菜品
      selectItem: null,
      // 弹窗的打开与关闭
      centerDialogVisible: false,
      // 这个是单品和分类数据的集合
      data: this.$store.state.sortData,
      // 本周数据
      thisData: [[], [], [], [], [], [], []],
      // 下周数据
      nextData: [],
      // tree型树形结构支持的子类名字children是下级属性名称和label是显示的名称
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      // 增加的餐品
      food: null,
      // 点击增加按钮时，记录周几的列点击的
      weekDays: '',
      // 记录周编号，主要是本周和下周切换时和添加餐品时用
      weekId: '',
      isweek: true,
    };
  },
  created() {
    // 获取本周菜品数据
    this.getWeekData();
    // 获取所有的分类及所有的菜品数据，用以在增加弹框处展示数据
    this.getCat();
  },
  methods: {
    // 点击下周按钮时触发
    async nextWeek() {
      this.isweek = false;
      // 判断有没有下周数据
      if (this.nextData.length > 0) {
        // 有就将week展示数据指向它
        this.week = this.nextData;
      } else {
        // 没有就发起请求创建下周菜谱
        await copymenu({}).then(() => {
          // 请求成功就深拷贝一份本周数据
          // 因为这里的周编号请求接口没有返回，不知道下周数据所有需要后端提供下周的周编号
          // clone是封装的深拷贝函数
          this.nextData = clone(this.week);
          this.week = this.nextData;
        });
      }
    },
    // 点击本周按钮时触发
    thisWeek() {
      // 将week展示数据指向本周数据
      this.week = this.thisData;
      this.isweek = true;
    },
    // 获取本周数据
    async getWeekData() {
      // 先创建本周菜谱，这里有点问题，不知道这个接口具体如何用，因为只能创建本周菜谱，也只提供本周编号
      await neweekdays({});
      // 获取本周数据菜品数据，有完整的周编号，weekId为-1表示本周
      await weekmenu({ weekId: -1 }).then((res) => {
        // 请求成功先存一下本周编号
        this.weekId = res.data[0].weekId;
        // 把请求到的数据按照每天的菜品划分了7给数组
        // weekDays 1就是周一，所以减1就是对应的数组索引
        // 然后按照weekDays把每个item元素push到对应的数组中
        res.data.forEach((item) => {
          this.thisData[item.weekDays - 1].push(item);
        });
      });
      // 将展示数据指向本周数据
      this.week = this.thisData;
    },
    // 点击餐品时触发，i是index1，i1是index2对应的数组索引来确定点击激活的样式
    // food是点击的那个餐品的对象
    select(i, i1, food) {
      // 通过改变activeIndex来切换点击的样式
      this.activeIndex = [i, i1];
      // 通过selectItem来记录点击的那个菜品对象，用以删除
      this.selectItem = food;
    },
    // 点击增加按钮触发
    add(index) {
      // 记录当前点击是在周几的区域点击的，这里的index是week的下标索引，通过索引+1就是对应的周几
      this.weekDays = index;
      // 打开弹窗
      this.centerDialogVisible = true;
    },
    // 获取一二三级分类以及对应餐品的接口函数
    getCat() {
      if (!this.$store.state.sortData) this.$store.dispatch('getCat');
    },
    // 删除餐品
    async del(index1) {
      // 看有没有已经选择的餐品, 有就发起请求删除
      if (this.selectItem) {
        // 删除餐品api函数
        await cancelfood({
          weekId: this.selectItem.weekId,
          weekDays: this.selectItem.weekDays,
          foodId: this.selectItem.foodId,
        }).then(() => {
          // 请求成功,找到对应的数据删掉
          this.week[index1].forEach((item) => {
            if (item.foodId === this.selectItem.foodId) {
              this.week[index1].splice(this.week[index1].indexOf(item), 1);
            }
          });
          // 清空选择坐标和对象
          this.activeIndex = [];
          this.selectItem = null;
        });
      }
    },
    // 增加弹框中点击餐品时获取餐品信息并存起来
    nodeClick(data) {
      this.food = data;
    },
    // 增加弹框的确定按钮触发,用以提交新增的菜品
    async confirm() {
      // 新增菜品api函数
      await addfood({
        weekId: this.weekId,
        weekDays: this.weekDays + 1,
        foodId: this.foodId,
      }).then(() => {
        // 请求成功,对应周几数组中新增餐品
        this.week[this.weekDays].unshift({
          weekId: this.weekId,
          weekDays: this.weekDays + 1,
          corrDate: new Date(),
          foodId: this.food.id,
          foodName: this.food.label,
        });
        // 清空新增餐品的信息
        this.food = null;
        this.weekDays = '';
        this.centerDialogVisible = false;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.active {
  color: red;
}
.el-card__body {
  margin: 0 auto;
}
/deep/.box {
  cursor: pointer;
  display: flex;
  li {
    text-align: center;
    padding: 10px;
  }

  .btnBox {
    margin: 0 auto;
    width: 50%;
  }
}
.el-button {
  outline: none;
}
.el-button + .el-button {
  margin-left: 0;
}
.weekName {
  background-color: #ccc;
}

.list {
  text-align: center;
}
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
/deep/.is-leaf {
  background: unset !important;
}
.isweek{
  background-color: #ccc !important;
  color: #000 !important;
}
</style>

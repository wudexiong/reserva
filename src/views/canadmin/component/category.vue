<template>
  <!--  -->
  <div class="box">
    <ul>
      <li class="title">一级类别</li>
      <li
        v-for="(item1, index1) in data1"
        :key="index1"
        @click="getData1(item1, index1)"
        :class="coord[0] === item1.id ? 'active' : ''"
      >
        {{ item1.label }}
      </li>
      <li><el-button @click="add(0)">新增</el-button></li>
      <li><el-button @click="del(0)">删除</el-button></li>
    </ul>
    <ul>
      <li class="title">二级类别或单品</li>
      <li
        v-for="(item2, index2) in data2"
        :key="index2"
        @click="getData2(item2, index2)"
        :class="coord[1] === item2.id ? 'active' : ''"
      >
        {{ item2.label }}
      </li>
      <li><el-button @click="add(3)">新增单品</el-button></li>
      <li><el-button @click="add(1)">新增类别</el-button></li>
      <li><el-button @click="del(1)">删除</el-button></li>
    </ul>
    <ul>
      <li class="title">三级类别或单品</li>
      <li
        v-for="(item3, index3) in data3"
        :key="index3"
        @click="getData3(item3, index3)"
        :class="coord[2] === item3.id ? 'active' : ''"
      >
        {{ item3.label }}
      </li>
      <li><el-button @click="add(4)">新增单品</el-button></li>
      <li><el-button @click="add(2)">新增类别</el-button></li>
      <li><el-button @click="del(2)">删除</el-button></li>
    </ul>
    <!-- 新增菜品弹框 -->
    <el-dialog
      title="新增菜品或类别"
      :visible.sync="centerDialogVisible"
      center
    >
      <el-input
        placeholder="请输入类别或单品名称"
        v-model="foodName"
      ></el-input>
      <el-input placeholder="请输入单品单价" v-model="foodFee" v-if='isinput'></el-input>
      <span slot="footer" class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>

  <!-- -->
</template>

<script>
export default {
  name: 'category',
  data() {
    return {
      data1: this.getdata1,
      data2: [],
      data3: [],
      // 点击时数据的坐标
      coord: [],
      centerDialogVisible: false,
      foodName: '',
      foodFee: '',
      index: [0, 0, 0],
      indexId: -1,
      isinput: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    getdata1() {
      return this.$store.state.sortData;
    },
    getdata2() {
      return this.$store.state.sortData[0].children;
    },
    getdata3() {
      return this.$store.state.sortData[0].children[0].children;
    },
  },
  methods: {
    async getData() {
      try {
        if (!this.$store.state.sortData) await this.$store.dispatch('getCat');
        const data = this.$store.state.sortData;
        this.data1 = data;
        this.getData1(this.data1[0], 0);
      } catch (error) {
        console.log(error);
      }
    },
    getData1(data, index) {
      this.index.splice(0, 1, index);
      this.coord.splice(0, 1, data.id);
      this.data2 = data.children;
      try {
        this.getData2(data.children[0], 0);
      } catch (error) {
        console.log(error);
      }
    },
    getData2(data, index) {
      this.index.splice(1, 1, index);
      this.coord.splice(1, 1, data.id);
      this.data3 = data.children;
      try {
        this.getData3(data.children[0], 0);
      } catch (error) {
        console.log(error);
      }
    },
    getData3(data, index) {
      this.index.splice(2, 1, index);
      this.coord.splice(2, 1, data.id);
    },
    add(i) {
      this.indexId = i;
      if (i === 3 || i === 4) {
        this.isinput = true;
      } else {
        this.isinput = false;
      }
      this.centerDialogVisible = true;
    },
    del(i) {
      // eslint-disable-next-line default-case
      switch (i) {
        case 0:
          this.$store.dispatch('delcat', {
            oneId: this.coord[0],
            coord: this.coord,
            index: this.index,
            i,
          });
          this.data2 = [];
          this.data3 = [];
          break;
        case 1:if (this.data2[this.index[1]].children) {
          this.$store.dispatch('delcat', {
            oneId: this.coord[0],
            twoId: this.coord[1],
            coord: this.coord,
            index: this.index,
            i,
          });
          this.data3 = [];
        } else {
          this.$store.dispatch('delcat', {
            foodId: this.coord[1],
            coord: this.coord,
            index: this.index,
            i,
          });
        }
        break;
        case 2:if (this.data3[this.index[1]].children) {
          this.$store.dispatch('delcat', {
            oneId: this.coord[0],
            twoId: this.coord[1],
            threeId: this.coord[2],
            coord: this.coord,
            index: this.index,
            i,
          });
        } else {
           this.$store.dispatch('delcat', {
            foodId: this.coord[2],
            coord: this.coord,
            index: this.index,
            i,
          });
        }
          break;
      }
    },
    primary() {
      this.centerDialogVisible = false;
      switch (this.indexId) {
        case 0:
          this.$store.dispatch('created1', {
            oneName: this.foodName,
            index: this.index,
            indexId: this.indexId,
          });
          break;
        case 1:
          this.$store.dispatch('created2', {
            twoName: this.foodName,
            oneId: this.coord[0],
            index: this.index,
            indexId: this.indexId,
          });
          break;
        case 2:
          this.$store.dispatch('created3', {
            threeName: this.foodName,
            oneId: this.coord[0],
            twoId: this.coord[1],
            index: this.index,
            indexId: this.indexId,
          });
          break;
        case 3:
          this.$store.dispatch('createdFood', {
            foodName: this.foodName,
            oneId: this.coord[0],
            foodFee: this.foodFee,
            index: this.index,
            indexId: this.indexId,
          });
          break;
        case 4:
          this.$store.dispatch('createdFood', {
            foodName: this.foodName,
            oneId: this.coord[0],
            twoId: this.coord[1],
            foodFee: this.foodFee,
            index: this.index,
            indexId: this.indexId,
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
/deep/ .el-card__body {
  margin: unset;
}
/deep/.box {
  cursor: pointer;
  width: 100%;
  display: flex;
  li {
    width: 400px;
    text-align: center;
    padding: 10px 0;
  }
  // li:nth-child(odd){
  //   background: #e4e4e4;
  // }
  .btnBox {
    margin: 0 auto;
    width: 50%;
  }
  .title {
    background: #ccc;
  }
}
/deep/.el-input {
  margin: 0 auto;
}
.active {
  background: chocolate;
}
</style>

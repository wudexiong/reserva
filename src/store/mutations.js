// user用户相关请求
import {
  setItem,
  removeItem,
} from '@/utils/storage';
// 导入常量
import {
  TOKEN,
  USER,
  SET_TONKEN,
  SET_USER,
  SET_SELECT_LIST,
} from './const';

export default {
  // 改变token
  [SET_TONKEN](state, data) {
    setItem(TOKEN, data);
    state.token = data;
  },
  // 改变个体信息
  [SET_USER](state, data) {
    state.user = data;
    setItem(USER, data);
  },
  // 改变明天预定的午餐列表
  [SET_SELECT_LIST](state, data) {
    // 这里的单号orderId为属性名，午餐列表food为属性值
    state.selectList = data;
  },
  // 退出登录，删除token,删除用户信息，删除预定午餐列表，浏览器持久化缓存也删除掉
  logOut(state) {
    removeItem(TOKEN);
    removeItem(USER);
    state.token = null;
    state.user = null;
    state.selectList = {};
  },
  // 改变weekData菜品列表和分类集合数据
  setSortData(state, data) {
    state.sortData = data;
  },
  pushSortData(state, data) {
    // eslint-disable-next-line default-case
    switch (data.indexId) {
      case 0:
        state.sortData.unshift({
          id: data.oneId,
          label: data.oneName,
        });
        break;
      case 1:
        state.sortData[data.index[0]].children.unshift({
          id: data.twoId,
          label: data.twoName,
        });
        break;
      case 2:
        state.sortData[data.index[0]].children[data.index[1]].children.unshift({
          id: data.threeId,
          label: data.threeName,
        });
        break;
      case 3:
        state.sortData[data.index[0]].children.push({
          id: data.foodId,
          label: data.foodName,
        });
        break;
        case 4:
          state.sortData[data.index[0]].children[data.index[1]].children.push({
            id: data.foodId,
            label: data.foodName,
          });
          break;
    }
  },
  delSortDataItme(state, { coord, i, index }) {
    // eslint-disable-next-line default-case
    switch (i) {
      case 0 : state.sortData.forEach((item) => {
        if (item.id === coord[0]) {
          state.sortData.splice(state.sortData.indexOf(item), 1);
        }
      }); break;
      case 1 :
        try {
          state.sortData[index[0]].children.forEach((item) => {
            if (item.id === coord[1]) {
              state.sortData[index[0]].children
              .splice(state.sortData[index[0]].children.indexOf(item), 1);
            }
          });
        } catch (err) {
          console.log();
        }
         break;
      case 2 : state.sortData[index[0]].children[index[1]].children.forEach((item) => {
        if (item.id === coord[2]) {
          state.sortData[index[0]].children[index[1]].children
          .splice(state.sortData[index[0]].children[index[1]].children.indexOf(item), 1);
        }
      }); break;
    }
  },
};

import {
  signin,
  getinfor,
} from '@/api/user/';
import {
  submitorder,
  getorder,
} from '@/api/reserv';
// 引入api接口函数
import {
  getcat1,
  getcat2,
  getcat3,
  getfoods,
  createcat1,
  createcat2,
  createcat3,
  createfood,
  delcat1,
  delcat2,
  delcat3,
  delfood,
} from '@/api/canadmin';

import {
  json,
} from '@/utils/json';
import {
  SET_TONKEN,
  SET_USER,
  SET_SELECT_LIST,
} from './const';

export default {
  // 提交选择的预定明天午餐的列表
  setSelectList({
    commit,
  }, payload) {
    // 调用接口
    submitorder(payload.data).then((res) => {
      // 成功 存储选择预定的的订餐列表和对应的单号
      commit(SET_SELECT_LIST, {
        data: payload.data,
        orderId: res.orderId,
      });
      // 返回给组件内一个订单号
      payload.res(res.orderId);
    }, payload.err);
  },
  // 获取对应单号下的预定了的餐品列表（预定成功的）
  requstOrder({
    commit,
  }, payload) {
    // 调用接口
    getorder(payload.data).then((res) => {
      // 成功 存储选择预定的的订餐列表和对应的单号
      commit(SET_SELECT_LIST, {
        data: payload.data,
        orderId: payload.data,
      });
      // 返回给组件内一个订单号
      payload.res(res.order);
    }, payload.err);
  },
  // 请求登录
  requsetSignin({
    commit,
  }, payload) {
    // 调用登录接口，将请求结果返回到组件内的回调函数进行组件内的业务需求
    signin(payload.data).then((res) => {
      commit(SET_TONKEN, res.token);
      payload.res();
    }, payload.err);
  },
  // 请求个人信息
  requsetInfor({
    commit,
  }, payload) {
    // 调用请求个人信息接口，触发vuex中 的mutation事件改变user用户数据
    getinfor(payload.data).then((res) => {
      // 请求成功，触发SET_USER,把结果返回给组件，进行处理
      commit(SET_USER, res.infor);
      payload.res(res.infor);
    }, payload.err);
  },
  // 获取一二三级分类以及对应餐品的接口函数
  async getCat(context) {
    // 请求一级分类
    await getcat1({}).then((res) => {
      // 成功通过json替换掉一些属性名然后把新对象遍历
      // 主要是为了整合成一个树形结构数据
      const data = json(res.data);
      // 遍历data数据
      data.forEach((item) => {
        // 请求二级分类函数接口传入oneId一级分类id
        context.dispatch('cat2', {
          oneId: item.id,
          data: item,
        });
      });
      // 获取到了所有分类与接口放到data数据中响应
      context.commit('setSortData', data);
    });
  },
  // 获取二级分类和一级分类菜品
  async cat2(context, {
    oneId,
    data,
  }) {
    // 二级分类api接口函数，oneId是一级分类id
    await getcat2({
      oneId,
    }).then((res) => {
      // 在data一级分类每个元素创建子类用以存储二级分类数据
      // eslint-disable-next-line no-param-reassign
      data.children = [];
      // 二级分类push到子分类数组中
      data.children.push(...json(res.data));
      // 循环二级分类，请求三级分类
      data.children.forEach((item) => {
        context.dispatch('cat3', {
          oneId,
          twoId: item.id,
          data: item,
        });
      });
    });
    // 把对应的一级菜品push到装二级分类的数组中形成树结构
    await getfoods({
      oneId,
    }).then((res) => {
      // json是改变对象属性名
      // eslint-disable-next-line no-param-reassign
      data.children.push(...json(res.data));
    });
  },
  // 三级接口（基本重复，可以使用函数进行封装）
  async cat3(context, {
    oneId,
    twoId,
    data,
  }) {
    await getcat3({
      oneId,
      twoId,
    }).then((res) => {
      // eslint-disable-next-line no-param-reassign
      data.children = [];
      data.children.push(...json(res.data));
      data.children.forEach((item) => {
        context.dispatch('getfoods', {
          oneId,
          twoId,
          threeId: item.id,
          data: item,
        });
      });
    });
    await getfoods({
      oneId,
      twoId,
    }).then((res) => {
      // eslint-disable-next-line no-param-reassign
      data.children.push(...json(res.data));
    });
  },
  // 获取三级餐品函数接口
  async getfoods(context, {
    oneId,
    twoId,
    threeId,
    data,
  }) {
    // 获取餐品api函数
    await getfoods({
      oneId,
      twoId,
      threeId,
    }).then((res) => {
      // eslint-disable-next-line no-param-reassign
      data.children = json(res.data);
    });
  },

  // 创建一级分类
  async created1({
    commit,
  }, {
    oneName,
    index,
    indexId,
  }) {
    const id = await createcat1({
      oneName,
    });
    commit('pushSortData', {
      oneId: id,
      oneName,
      index,
      indexId,
    });
  },
  // 创建二级分类
  async created2({
    commit,
  }, {
    oneId,
    twoName,
    index,
    indexId,
  }) {
    const id = await createcat2({
      oneId,
      twoName,
      index,
      indexId,
    });
    commit('pushSortData', {
      twoId: id,
      twoName,
      index,
      indexId,
    });
  },
  // 创建三级分类
  async created3({
    commit,
  }, {
    oneId,
    twoId,
    threeName,
    index,
    indexId,
  }) {
    const id = await createcat3({
      oneId,
      twoId,
      threeName,
    });
    commit('pushSortData', {
      threeId: id,
      threeName,
      index,
      indexId,
    });
  },
  // 创建餐品
  async createdFood({
    commit,
  }, {
    oneId,
    twoId,
    threeId,
    foodName,
    foodFee,
    index,
    indexId,
  }) {
    const id = await createfood({
      twoId,
      oneId,
      threeId,
      foodName,
      foodFee,
    });
    commit('pushSortData', {
      foodId: id,
      foodName,
      index,
      indexId,
    });
  },
  async delcat({
    commit,
  }, {
    oneId,
    twoId,
    threeId,
    foodId,
    i,
    coord,
    index,
  }) {
    // eslint-disable-next-line default-case
    switch (i) {
      case 0:
        await delcat1({
          oneId,
        }).then(() => {
          commit('delSortDataItme', {
            coord,
            i,
            index,
          });
        });
        break;
      case 1:
        if (foodId) {
          await delfood({ foodId }).then(() => {
            commit('delSortDataItme', {
              coord,
              i,
              index,
            });
          });
        } else {
          await delcat2({
            oneId,
            twoId,
          }).then(() => {
            commit('delSortDataItme', {
              coord,
              i,
              index,
            });
          });
        }
        break;
      case 2:
        if (foodId) {
          await delfood({ foodId }).then(() => {
            commit('delSortDataItme', {
              coord,
              i,
              index,
            });
          });
        } else {
          await delcat3({
            oneId,
            twoId,
            threeId,
          }).then(() => {
            commit('delSortDataItme', {
              coord,
              i,
              index,
            });
          });
    break;
  }
}
},

};

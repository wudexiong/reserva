// user用户相关请求
import {
  getItem,
} from '@/utils/storage';
// 导入常量
import {
  TOKEN,
  USER,
} from './const';

export default {
  // 用户验证令牌
  token: getItem(TOKEN),
  // 用户个人信息
  user: getItem(USER),
  // 用户预定的明天餐品列表和单号
  selectList: null,
  // 分类和单品菜品的数据集合
  sortData: null,

};

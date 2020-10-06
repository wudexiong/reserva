// 深拷贝,下周数据需要深拷贝本周数据
// eslint-disable-next-line import/prefer-default-export
export function clone(target) {
  // 判断i是对象还是数组,配合clone函数使用
  function checkedType(i) {
    return Object.prototype.toString.call(i).slice(8, -1);
  }
  // 判断拷贝的数据类型
  // 初始化变量result 成为最终克隆的数据
  // eslint-disable-next-line one-var
  let result,
    // eslint-disable-next-line prefer-const
    targetType = checkedType(target);
  if (targetType === 'object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  } else {
    return target;
  }
  // 遍历目标数据

  Object.keys(target).forEach((i) => {
    const value = target[i];
    // 判断目标结构里的每一值是否存在对象/数组
    if (
      checkedType(value) === 'Object' ||
      checkedType(value) === 'Array'
    ) {
      // 对象/数组里嵌套了对象/数组
      // 继续遍历获取到value值
      result[i] = clone(value);
    } else {
      // 获取到value值是基本的数据类型或者是函数。
      result[i] = value;
    }
  });

  return result;
}


  // eslint-disable-next-line no-param-reassign
// 持久化存储
const local = window.localStorage;
// 取数据
export function getItem(key) {
   try {
    return JSON.parse(local.getItem(key));
   } catch (error) {
   return local.getItem(key);
   }
}
// 存数据
export function setItem(key, value) {
    return local.setItem(key, JSON.stringify(value));
}

// 删除
export function removeItem(key) {
    local.removeItem(key);
}

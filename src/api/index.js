import axios from 'axios';

import {
  Message,
  Loading,
} from 'element-ui';
// 加密加载
import crypto from '../utils/crypto';
// 持久化操作
import {
  getItem,
} from '../utils/storage';

let loadingInstance = null; // 这里是loading
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 添加请求拦截器
// eslint-disable-next-line consistent-return
api.interceptors.request.use((config) => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'loading...',
  });
  if (!config.data.token) {
    // 如果没有token加上token
    // eslint-disable-next-line no-param-reassign
    config.data.token = getItem('token');
  }
  if (config.data.passwd) {
    // 如果有密码，给密码加密
    // eslint-disable-next-line no-param-reassign
    config.data.passwd = crypto.Encrypt(config.data.passwd);
  }
  return config;
});
// 添加响应拦截器
api.interceptors.response.use((response) => {
  loadingInstance.close();
  // 响应结果状态码不为0，表示请求失败
  if (response.data.code !== 0) {
    // 提示对应的错误消息
    Message({
      message: `${response.data.msg}`,
      type: 'error',
      duration: 3 * 1000,
    });
    // 返回后端给的错误信息
    return Promise.reject(response.data);
  }
  // if (response.data.msg) {
  //   Message({
  //     message: `${response.data.msg}`,
  //     type: 'success',
  //     duration: 3 * 1000,
  //   });
  // }

  return response.data;
}, (error) => {
  console.log('TCL: error', error);
  const msg = error.Message !== undefined ? error.Message : '';
  Message({
    message: `网络错误${msg}`,
    type: 'error',
    duration: 3 * 1000,
  });
  loadingInstance.close();
  return Promise.reject(error);
});

export default api;

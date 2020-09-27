import axios from 'axios';
import { Message, Loading } from 'element-ui';

let loadingInstance = null; // 这里是loading
const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000 * 10,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
});

// 添加请求拦截器
api.interceptors.request.use((config) => {
    loadingInstance = Loading.service({
      lock: true,
      text: 'loading...',
    });
    return config;
  });
// 添加响应拦截器
api.interceptors.response.use((response) => {
    loadingInstance.close();
    // console.log(response)
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

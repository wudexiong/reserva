

// ui库样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue
import Vue from 'vue';
// 引入ui库
import ElementUI from 'element-ui';

// 跟组件
import App from './App';
// 路由导入
import router from './router';
// vuex中store状态管理导入
import store from './store/';
// 解决 浏览器控制台触摸的警示
// eslint-disable-next-line import/first
import 'default-passive-events';

// 导入mock模拟数据接口
import '../mock';

// 使用ui库
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

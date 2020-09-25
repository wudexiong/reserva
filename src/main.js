import Vue from 'vue';
import App from './App';
import router from './router';
import api from './api'

Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

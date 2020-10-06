import Vue from 'vue';
import Router from 'vue-router';
import {
  getItem,
} from '../utils/storage';

Vue.use(Router);

const routes = [{
    // 首页重定向
    path: '/',
    redirect: '/reserv',
  },
  {
    // 登录
    path: '/signin',
    name: 'signin',
    component: () => import('../views/user/signin'),
  },
  {
    // 注册
    path: '/signup',
    name: 'signup',
    component: () => import('../views/user/signup'),
  },
  {
    // 重置密码
    path: '/resetpwd',
    name: 'resetpwd',
    component: () => import('../views/user/resetpwd'),
  },
  {
    // 预订午餐
    path: '/reserv',
    name: 'reserv',
    component: () => import('../views/reserv/index'),
  },
  {
    // 订餐成功页面
    path: '/getorder/:id',
    name: 'getorder',
    component: () => import('../views/reserv/getorder'),
    props: true,
  },
  {
    // 个人信息
    path: '/getinfor',
    name: 'getinfor',
    component: () => import('../views/user/getinfor'),
  },
  {
    // 历史订单
    path: '/getorderBytime',
    name: 'getorderBytime',
    component: () => import('../views/reserv/getorderBytime'),
  },
  {
    // 餐品评价列表
    path: '/eval',
    name: 'eval',
    component: () => import('../views/eval/'),
  },
  {
    // 餐品评价
    path: '/submiteval',
    name: 'submiteval',
    component: () => import('../views/eval/submiteval'),
  },
  {
    // 公司行政
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/'),
  },
  {
    // 公司食堂
    path: '/canadmin',
    component: () => import('../views/canadmin/'),
    children: [
      {
        path: '',
        component: () => import('@/views/canadmin/component/management'),
      },
      {
        path: '/management',
        name: 'management',
        component: () => import('@/views/canadmin/component/management'),
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/canadmin/component/comment'),
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/canadmin/component/category'),
      },
    ],
  },
];
const router = new Router({
  routes,
});

// 添加路由全局导航守卫，在跳转路由前做一些操作
router.beforeEach((to, from, next) => {
  // 获取localStarage浏览器持久化缓存中的token
  const token = getItem('token');
  // 判断没有token并且不是登录注册页面就放行，因为有token但是一样可以进入sigin页面，那么就进入死循环了
  if (token) {
    // token存在的情况
    if (to.path === '/signin' || to.path === '/signup') {
      // 是注册登录页跳转到首页
      next('/reserv');
    } else {
      // 不是注册登录页
      next();
    }
    // token不存在
  } else if (to.path === '/signin' || to.path === '/signup') {
        // 是登录注册页
        next();
  } else {
    // 不是登录注册页
    next('/signin');
  }
  // 否则跳转到登录页
});

export default router;

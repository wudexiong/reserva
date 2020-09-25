import Vue from 'vue'
import Router from 'vue-router'


import '../styles/index.css'

Vue.use(Router);
const routes = [
  {
    // 首页重定向
    path: '/',
    redirect:'/signup'
  },
  {
    // 登录
    path: '/signin',
    name: 'signin',
    component: () => import('../views/user/signin')
  },
  {
    // 注册
    path: '/signup',
    name: 'signup',
    component: () => import('../views/user/signup')
  },
  {
    // 重置密码
    path:'/resetpwd',
    name:'resetpwd',
    component:()=> import('../views/user/resetpwd')
  },
  {
    // 预订午餐
    path:'/reserv',
    name:'reserv',
    component:()=>import('../views/reserv/'),
  },
  {
    // 订餐成功页面 
    path:'/getorder',
    name:'getorder',
    component:()=>import('../views/reserv/getorder')
  },
  {
    // 个人信息 
    path:'/getinfor',
    name:'getinfor',
    component:import('../views/user/getinfor')
  },
  {
    // 历史订单 
    path:'/getorder_bytime',
    name:'getorder_bytime',
    component:import('../views/reserv/getorder_bytime')
  },
  {
    // 餐品评价列表 
    path:'/eval',
    name:'eval',
    component:import('../views/eval/')
  },
  {
    // 餐品评价 
    path:'/submiteval',
    name:'submiteval',
    component:import('../views/eval/submiteval')
  },
  {
    // 公司行政
    path:'admin',
    name:'admin',
    component:import('../views/admin/')
  },
  {
    //	公司食堂
    path:'canadmin',
    name:'canadmin',
    component:import('../views/canadmin/')
  }

]

export default new Router({
  routes
});

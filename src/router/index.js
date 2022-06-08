import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index'
import home from '../views/home'
import Welcome from '@/views/Welcome'
import Users from '@/views/Users'
import Rights from '@/views/power/Rights'
import Roles from '@/views/power/Roles'
import Cate from '@/views/goods/Cate'
import Params from '@/views/goods/Params'
import List from '@/views/goods/List'
import Add from '@/views/goods/add'
import Order from '@/views/order/Order'
import Report from '@/views/report/Report'
import Input from '@/views/goods/Input'
import Vuex from '@/views/goods/Vuex'
import Files from '@/views/goods/Files'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: index },
    {
      path: '/home',
      component: home,

      children: [{
        path: '/Welcome',
        component: Welcome
      },
      {
        path: '/Users',
        component: Users
      },
      {
        path: '/Rights',
        component: Rights
      },
      {
        path: '/Roles',
        component: Roles
      },
      {
        path: '/Cate',
        component: Cate
      },
      {
        path: '/Params',
        component: Params
      },
      {
        path: '/List',
        component: List
      },
      {
        path: '/List/add',
        component: Add
      },
      {
        path: '/Order',
        component: Order
      },
      {
        path: '/Report',
        component: Report
      },
      {
        path: '/input',
        component: Input
      },
      {
        path: '/vuex',
        component: Vuex
      },
      {
        path: '/Files',
        component: Files
      },
      ]
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to将要访问的路径
  //from代表从那个路径跳转过来
  //next是一个函数，表示放行
  //next()放行 next（'/home'） 强制跳转

  if (to.path === '/index') return next()
  // const tokenStr = window.sessionStorage.getItem('token')
  // if (!tokenStr) return next('/home')

  next()
})

export default router
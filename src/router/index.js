import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/View/Layout/Home' // Home
import Fruit from '@/View/Layout/Home/Fruit' // 水果
import Vegetables from '@/View/Layout/Home/Vegetables' // 蔬菜
import Flowers from '@/View/Layout/Home/Flowers' // 花卉
import Poultry from '@/View/Layout/Home/Poultry' // 家禽

import SelfCenter from '@/View/Layout/Home/SelfCenter' // 个人中心

import Relaxation from '@/View/Layout/Relaxation' // 休闲娱乐

import Support from '@/View/Layout/Support' // 技术帮扶

import Practice from '@/View/Layout/Practice' // 实践基地

import Business from '@/View/Layout/Business' // 商业合作

import index from '@/View/Layout/index' // 首页

import Login from '@/View/Layout/Login/Login' // 登录页
import Regist from '@/View/Layout/Regist/Regist' // 注册页

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'index',
      component: index,
      children: [
        { // Home 组件
          path: '/',
          name: 'Home',
          component: Home,
          redirect: '/Fruit',
          children: [
            {
              path: '/Fruit',
              name: 'Fruit',
              component: Fruit,
            },
            {
              path: '/Vegetables',
              name: 'Vegetables',
              component: Vegetables
            },
            {
              path: '/Flowers',
              name: 'Flowers',
              component: Flowers
            },
            {
              path: '/Poultry',
              name: 'Poultry',
              component: Poultry
            }
          ],
        },
        { // 登录组件
          path: '/Login',
          name: 'Login',
          component: Login,
        },
        { // 注册组件
          path: '/Regist',
          name: 'Regist',
          component: Regist,
        },
        { // 休闲娱乐版块
          path: '/Relaxation',
          name: 'Relaxation',
          component: Relaxation,
        },
        { // 技术帮扶版块
          path: '/Support',
          name: 'Support',
          component: Support,
        },
        { // 实践基地版块
          path: '/Practice',
          name: 'Practice',
          component: Practice
        },
        { // 商业合作版块
          path: '/Business',
          name: 'Business',
          component: Business
        },
        { // 个人中心
          path: '/SelfCenter',
          name: 'SelfCenter',
          component: SelfCenter
        }
      ]
    },
  ]
})

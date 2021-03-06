import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/View/Layout/Home' // Home
import Fruit from '@/View/Layout/Home/Fruit' // 水果
import Vegetables from '@/View/Layout/Home/Vegetables' // 蔬菜
import Flowers from '@/View/Layout/Home/Flowers' // 花卉
import Poultry from '@/View/Layout/Home/Poultry' // 家禽

import SelfCenter from '@/View/Layout/Home/SelfCenter' // 个人中心

import Relaxation from '@/View/Layout/Relaxation/Index' // 休闲娱乐
import CropsClaim from '@/View/Layout/Relaxation/CropsClaim' // 作物认领
import SelfPicking from '@/View/Layout/Relaxation/SelfPicking' // 采摘预约
import Tourism from '@/View/Layout/Relaxation/Tourism' // 旅游度假版块
import Daily from '@/View/Layout/Relaxation/Daily' // 饮食住宿版块

import Support from '@/View/Layout/Support' // 技术帮扶

import Practice from '@/View/Layout/Practice' // 实践基地

import Business from '@/View/Layout/Business' // 商业合作

import index from '@/View/Layout/index' // 首页

import Login from '@/View/Layout/Login/Login' // 登录页
import Regist from '@/View/Layout/Regist/Regist' // 注册页

import Console from '@/View/Layout/Console/Index' // 管理控制台
import Add from '@/View/Layout/Console/Add' // 增加商品
import Del from '@/View/Layout/Console/Del' // 删除商品
import Modify from '@/View/Layout/Console/Modify' // 修改商品
import OrderInfo from '@/View/Layout/Console/OrderInfo' // 查询订单状况
import AdminSupport from '@/View/Layout/Console/Support' // 在线技术帮扶
import AdminPractice from '@/View/Layout/Console/Practice' // 实践信息管理
import AdminCrops from '@/View/Layout/Console/Crops' // 植物认领相关操作
import AdminPick from '@/View/Layout/Console/AdminPick' // 采摘预约管理

import pay from '@/View/Layout/pay' // pay success

import Downloads from '@/View/Layout/Downloads/Downloads' // 下载页面

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
            },
          ],
        },
        { ///////////////////// for clickCell
          path: '/pay',
          name: 'pay',
          component: pay
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
          redirect: '/CropsClaim',
          children: [
            {
              path: '/CropsClaim',
              name: 'CropsClaim',
              component: CropsClaim
            },
            {
              path: '/SelfPicking',
              name: 'SelfPicking',
              component: SelfPicking
            },
            {
              path: '/Tourism',
              name: 'Tourism',
              component: Tourism
            },
            {
              path: '/Daily',
              name: 'Daily',
              component: Daily
            }
          ]
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
        },
        {
          path: '/Downloads',
          name: 'Downloads',
          component: Downloads
        },
        { // 管理控制台
          path: '/Console',
          name: 'Console',
          component: Console,
          redirect: '/Add',
          children: [
            {
              path: '/Add',
              name: 'Add',
              component: Add
            },
            {
              path: '/Del',
              name: 'Del',
              component: Del
            },
            {
              path: '/Modify',
              name: 'Modify',
              component: Modify
            },
            {
              path: '/OrderInfo',
              name: 'OrderInfo',
              component: OrderInfo
            },
            {
              path: '/AdminSupport',
              name: 'AdminSupport',
              component: AdminSupport
            },
            {
              path: '/AdminPractice',
              name: 'AdminPractice',
              component: AdminPractice
            },
            {
              path: '/AdminCrops',
              name: 'AdminCrops',
              component: AdminCrops
            },
            {
              path: '/AdminPick',
              name: 'AdminPick',
              component: AdminPick
            }
          ],
        }
      ]
    },
  ]
})

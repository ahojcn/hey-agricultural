import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/View/Layout/Home' // Home
import Fruit from '@/View/Layout/Home/Fruit' // 水果

import index from '@/View/Layout/index' // 首页

import Login from '@/View/Login/Login' // 登录页

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'index',
      component: index,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
          children: [
            {
              path: '/Fruit',
              name: 'Fruit',
              component: Fruit,
            }
          ],
        },
        {
          path: '/Login',
          name: 'Login',
          component: Login,
        }
      ]
    },
  ]
})

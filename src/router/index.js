import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

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
          name: 'HelloWorld',
          component: HelloWorld,
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

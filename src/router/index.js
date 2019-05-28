import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import index from '@/View/Layout/index'

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
      ]
    }
  ]
})

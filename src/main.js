// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

// animate
import 'animate.css'

// vue-resource
import VueResource from 'vue-resource'

Vue.use(VueResource);
// Vue.http.options.root = 'http://106.12.202.93:8080';
// Vue.http.options.root = 'http://106.12.202.93:8080';
// 生产环境服务器
Vue.http.options.root = 'http://tim.natapp1.cc';
Vue.http.interceptors.push(function (request, next) {//拦截器
// 跨域携带cookie
  request.credentials = true;
  next()
});
Vue.http.options.xhr = {withCredentials: true};
Vue.http.options.emulateJSON = true;

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

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
// 虚拟机
// Vue.http.options.root = 'http://10.211.55.19:8080';
// 本机
// Vue.http.options.root = 'http://localhost:8080';
// 生产
// Vue.http.options.root = 'http://106.12.202.93:8080';
// tim开发环境
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

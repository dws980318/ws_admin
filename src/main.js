// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueVideoPlayer from 'vue-video-player'
import base_api from '@/utils/baseApi.js'
import echarts from 'echarts'
import api from '@/utils/api.js'
import store from './store'
import VueLazyload from 'vue-lazyload'
import axios from 'axios';
import i18n from './lang'

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$baseUrl = base_api;
Vue.prototype.$api = api; // 将api挂载到vue的原型上
// import Editor from './components/editor/Editor'

// require videojs style
// import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import './common/element-ui/index.css'
import './common/css/variable.styl'
import './common/css/reset.css'
import './common/css/common.css'
import '@/permission' // permission control

Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})
// Vue.component({'vue-editor': Editor})
Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let login = sessionStorage.getItem('login')
  // let login = store.state.login
  // let token = sessionStorage.getItem('token')
  // console.log(token)
  if (to.path === '/login') {
    next()
    return false
  }
  if (login) {
    next()
    return false
  } else {
    // api.checkSession().then(res => {
    //   next()
    //   return false
    // }).catch(reject => {
    next('/login')
    //   return false
    // })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, i18n,
  router,
  render: h => h(App),
  template: '<App/>'
})

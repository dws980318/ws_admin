import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import {
  setTitle
} from '@/utils/util' // 设置浏览器头部标题

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  let one = true;
  if (one) {
    // 设置浏览器头部标题
    const browserHeaderTitle = to.name
    store.commit('SET_BROWSERHEADERTITLE', {
      browserHeaderTitle: browserHeaderTitle
    })
    if (to.path === '/login') { // 如果去的是登录页
      next() //分解钩子
      NProgress.done() // end
    } else {
      NProgress.done()
      next()
    }
    next() //分解钩子
    NProgress.done() // end
  } else {
    // 设置浏览器头部标题
    const browserHeaderTitle = to.name
    store.commit('SET_BROWSERHEADERTITLE', {
      browserHeaderTitle: browserHeaderTitle
    })
    console.log(whiteList)
    console.log(whiteList.indexOf(to.path))
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(111)
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})

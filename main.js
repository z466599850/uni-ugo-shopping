
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'


// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}


uni.$showMsg = function(title = '数据加载失败',duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores/index.js'
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app
  }
}
// #endif
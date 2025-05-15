import '@/style/index.scss'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'virtual:uno.css'
import { createSSRApp } from 'vue'

import App from './App.vue'
import {
  prototypeInterceptor,
  requestInterceptor,
  routeInterceptor,
  OnShowInterceptorPlugin,
} from './interceptors'
import store from './store'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)
  // app.use(OnShowInterceptorPlugin, {
  //   excludeTabBar: true,
  //   excludePaths: [], // 额外排除的路径
  //   beforeHook: () => {
  //     console.log('beforeHook')
  //     return true
  //   }, // 前置钩子
  //   afterHook: () => {
  //     console.log('afterHook')
  //   }, // 后置钩子
  // })
  app.use(VueQueryPlugin)

  return {
    app,
  }
}

/**
 * 路由拦截，通常也是登录拦截
 */
import { useUserStore } from '@/store'
import {
  needLoginPages as _needLoginPages,
  notLoginPages as _notLoginPages,
  getNeedLoginPages,
  getLastPage,
  getNotLoginPages,
  getLoginPage,
} from '@/utils'
import { getToken } from '@/utils/lucky/auth'

// 这里用来跳转到登录页
const loginRoute = getLoginPage()
// 白名单页面，可以设置多个，登录注册页面
const whiteRouters = [loginRoute]

const isDev = import.meta.env.DEV
// 判断是否登录
const isLogin = () => {
  return !!getToken()
}

/**
 * 这里是所有的页面都需要登录
 * 使用 getNeedLoginPages 获取 所有需要登录的页面
 * 使用 getNotLoginPages 获取 所有不需要登录的页面
 */
const navigateToInterceptor = {
  invoke({ url }: { url: string }) {
    // 获取用户状态
    const userStore = useUserStore()
    let path = url.split('?')[0]
    // 处理相对路径
    if (!path.startsWith('/')) {
      const currentPath = getLastPage().route
      const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
      const baseDir = normalizedCurrentPath.substring(0, normalizedCurrentPath.lastIndexOf('/'))
      path = `${baseDir}/${path}`
    }
    console.log('路由拦截器当前页面:', path)
    let routers: string[] = []
    // 所有页面都需要登录，除了设置了 notLogin 的页面 和 白名单页面
    if (isDev) {
      // 获取白名单和不需要登录的页面
      routers = [...getNotLoginPages(), ...whiteRouters]
    } else {
      routers = [..._notLoginPages, ...whiteRouters]
    }
    // 不需要登录
    const routerStatus: boolean = routers.includes(path)
    if (routerStatus) {
      return true
    }

    /*
        // 所有页面都不需要登录，除了设置了 needLogin 的页面
        if (isDev) {
          // 获取白名单和不需要登录的页面
          routers = [...getNeedLoginPages()]
        } else {
          routers = [..._needLoginPages]
        }
        // 需要登录的页面
        const routerStatus: boolean = routers.includes(path)
        if (!routerStatus) {
          return true
        }
    */
    // 后续的逻辑
    // 每次路由拦截时重新计算登录状态
    const hasLogin = isLogin()
    console.log('是否登录:', hasLogin)
    console.log('用户信息:', userStore.userInfo)
    if (hasLogin) {
      // 这里根据实际情况来写，若需要获取用户信息，可以在这里获取，不需要就直接返回
      // 判断是否获取了用户信息
      // 判断用户信息不存在或ID为0时需要获取用户信息
      if (!userStore.userInfo || userStore.userInfo.id === 0) {
        console.log('已登录，没有用户信息，获取用户信息')
        userStore.UserInfoAction()
      }
      return true
    }
    console.log('未登录，跳转登录页')
    userStore.LogoutAction()
    const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent(url)}`
    uni.navigateTo({ url: redirectRoute })
    return false
  },
}

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.addInterceptor('reLaunch', navigateToInterceptor)
    uni.addInterceptor('redirectTo', navigateToInterceptor)
    uni.addInterceptor('switchTab', navigateToInterceptor)
  },
}

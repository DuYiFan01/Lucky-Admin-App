import { CustomRequestOptions } from '@/interceptors/request'
import { useMessage } from 'wot-design-uni'
import { useUserStore } from '@/store'
import { toast } from '@/utils/lucky/toast'
import { getLoginPage } from '.'
export const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<R<T>>((resolve, reject) => {
    // Loading
    uni.showLoading({ title: '加载中', mask: true })
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      withCredentials: true,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          const data = res.data as R<T>
          if (data.code === -401) {
            // 未登录或登录已过期
            // 清除用户信息
            useUserStore().LogoutAction()
            // 跳转登录页
            const currentPath = getCurrentPages()?.[0]?.route || ''
            // 如果不是登录页，弹出提示框
            if (currentPath !== getLoginPage()) {
              // 创建message实例
              // const message = useMessage()
              // message
              //   .confirm({
              //     title: '登录过期',
              //     msg: '您的登录已过期，请重新登录',
              //     confirmButtonText: '去登录',
              //     cancelButtonText: '取消',
              //   })
              //   .then(() => {
              //     uni.navigateTo({
              //       url: getLoginPage() + `?redirect=${encodeURIComponent(currentPath)}`,
              //     })
              //   })
              toast.error('登录过期,请重新登录')
            } else {
              toast.error(data.message)
            }
            uni.navigateTo({ url: '/pages/login/index' })
          } else if (data.code === -403) {
            // 没有权限
            toast.error(data.message)
          } else if (data.code === -405) {
            // 没有角色
            toast.error(data.message)
          } else if (data.code === -1) {
            // 业务错误
            toast.error(data.message)
          }
          resolve(res.data as R<T>)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast && toast.error((res.data as R<T>).message || '请求错误')
          reject(res)
        }
        uni.hideLoading()
      },
      // 响应失败
      fail(err) {
        console.error('/utils/http.ts 错误：', err.errMsg)
        toast.error('httpError:网络错误，换个网络试试')
        reject(err)
        uni.hideLoading()
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
export const httpGet = <T>(
  url: string,
  query?: Record<string, any>,
  header?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    method: 'GET',
    header,
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @param header 请求头，默认为json格式
 * @returns
 */
export const httpPost = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>,
  header?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
    header,
  })
}

http.get = httpGet
http.post = httpPost

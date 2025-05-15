import { http } from '@/utils/http'

/**
 * 登录表单
 */
export interface ILoginForm {
  username: string
  password: string
  code: string
  uuid: string
}

/**
 * 获取验证码
 * @returns ICaptcha 验证码
 */
export const getCode = () => {
  return http.get<ICaptcha>('/user/getCode')
}

/**
 * 用户登录
 * @param loginForm 登录表单
 * @returns IUserLogin 用户登录信息
 */
export const login = (loginForm: ILoginForm) => {
  return http.post<IUserLogin>('/user/login', loginForm)
}

/**
 * 获取用户信息
 * @param token token信息
 * @returns IUserInfoVo 用户信息
 */
export const getUserInfo = (token: string) => {
  return http.get<IUserInfoVo>('/user/info', { token })
}

/**
 * 退出登录
 * @returns void
 */
export const logout = () => {
  return http.get('/user/logout')
}

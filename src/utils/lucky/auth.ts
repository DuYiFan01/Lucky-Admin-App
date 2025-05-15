import Cookie from 'js-cookie'

/**
 * TokeKey的名字
 */
const TokenKey: string = 'token'

/**
 * 获取tokenKeyName
 * @returns tokenKeyName
 */
export const getTokenKey = (): string => {
  return TokenKey
}

/**
 * 获取Token
 * @returns 令牌
 */
export const getToken = () => {
  return getCookieMap<string>(getTokenKey())
}

/**
 * 设置Token
 * @param token 令牌
 */
export const setToken = (token: string) => {
  setCookieMap(getTokenKey(), token)
}
/**
 * 删除Token
 */
export const removeToken = () => {
  removeCookieMap(getTokenKey())
}

/**
 * 设置Cookie
 * @param key Cookie的key
 * @param value Cookie的value
 */
export const setCookieMap = (key: string, value: any) => {
  Cookie.set(key, value)
}

/**
 * 获取Cookie
 * @param key Cookie的key
 * @returns Cookie的value
 */
export const getCookieMap = <T>(key: string) => {
  return Cookie.get(key) as T
}

/**
 * 删除Cookie
 * @param key Cookie的key
 */
export const removeCookieMap = (key: string) => {
  Cookie.remove(key)
}

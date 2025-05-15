import { login, getUserInfo, logout } from '@/api/login'
import { setCookieMap, getCookieMap, removeCookieMap } from '@/utils/lucky/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义用户令牌名称
const TokenName = 'token'

// 初始化状态
const userInfoState: IUserInfoVo = {
  id: 0,
  username: '',
  name: '',
  sex: '',
  email: '',
  phone: '',
  avatar: '/static/images/profile.jpg',
  createTime: '',
  roles: [],
  permissions: [],
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoVo>({ ...userInfoState })
    // 设置用户信息
    const setUserInfo = (val: IUserInfoVo) => {
      userInfo.value = val
    }
    /**
     * 删除用户信息
     */
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState }
      removeUserToken()
    }
    // 获取用户登录令牌名称
    const getTokenName = () => {
      return TokenName
    }
    // 设置用户登录令牌
    const setUserToken = (val: string) => {
      setCookieMap(getTokenName(), val)
    }
    // 获取用户登录令牌
    const getUserToken = () => {
      return getCookieMap<string>(getTokenName())
    }
    // 删除用户登录令牌
    const removeUserToken = () => {
      removeCookieMap(getTokenName())
    }
    // 是否登录
    const isLogin = computed(() => {
      const token = getUserToken()
      return !!token
    })
    /**
     * 用户登录
     * @param credentials 登录参数
     * @returns R<IUserLogin>
     */
    const LoginAction = async (credentials: {
      username: string
      password: string
      code: string
      uuid: string
    }) => {
      const res = await login(credentials)
      console.log('登录信息', res)
      setUserToken(res.data.token)
      return res
    }
    /**
     * 获取用户信息
     * @returns R<IUserInfoVo>
     */
    const UserInfoAction = async () => {
      const res = await getUserInfo(getUserToken()).then((res) => {
        setUserInfo(res.data)
        // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      })
      return res
    }
    /**
     * 退出登录 并 删除用户信息
     */
    const LogoutAction = () => {
      logout()
      removeUserInfo()
    }
    return {
      userInfo,
      isLogin,
      removeUserInfo,
      getTokenName,
      setUserToken,
      getUserToken,
      removeUserToken,
      LoginAction,
      UserInfoAction,
      LogoutAction,
    }
  },
  {
    persist: false, // 关闭持久化
  },
)

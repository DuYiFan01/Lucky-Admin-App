import { login, getUserInfo, logout, wxLogin } from '@/api/login'
import { getToken, getTokenKey, removeToken, setToken } from '@/utils/lucky/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      } else {
        val.avatar =
          import.meta.env.VITE_SERVER_BASEURL + val.avatar + '?' + getTokenKey() + '=' + getToken()
      }
      userInfo.value = val
    }
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState }
      removeToken()
    }
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
      setToken(res.data.token)
      return res
    }
    /**
     * 获取用户信息
     * @returns R<IUserInfoVo>
     */
    const UserInfoAction = async () => {
      const res = await getUserInfo(getToken())
      setUserInfo(res.data)
      // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      return res
    }
    /**
     * 退出登录 并 删除用户信息
     */
    const LogoutAction = async () => {
      logout()
      removeUserInfo()
    }
    /**
     * 微信登录
     * @param credentials 微信登录Code
     */
    const WxLoginAction = async (credentials: { code: string }) => {
      const res = await wxLogin(credentials)
      setToken(res.data.token)
      return res
    }

    return {
      userInfo,
      LoginAction,
      WxLoginAction,
      UserInfoAction,
      LogoutAction,
    }
  },
  {
    persist: false, // 关闭持久化
  },
)

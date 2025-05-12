<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="login-container">
    <view class="login-header">
      <image class="login-logo" :src="appLogo" mode="aspectFit"></image>
      <view class="login-title">{{ appTitle }}</view>
    </view>

    <view class="login-form">
      <view class="welcome-text">欢迎登录</view>
      <view class="login-desc">请输入您的账号和密码</view>

      <view class="login-input-group">
        <view class="input-wrapper">
          <wd-input
            v-model="username"
            placeholder="请输入用户名"
            clearable
            class="login-input"
            :border="false"
          >
            <template #prefix>
              <wd-icon name="person" size="18px" class="input-icon"></wd-icon>
            </template>
          </wd-input>
          <view class="input-bottom-line"></view>
        </view>

        <view class="input-wrapper">
          <wd-input
            v-model="password"
            placeholder="请输入密码"
            clearable
            show-password
            class="login-input"
            :border="false"
          >
            <template #prefix>
              <wd-icon name="lock" size="18px" class="input-icon"></wd-icon>
            </template>
          </wd-input>
          <view class="input-bottom-line"></view>
        </view>
      </view>

      <!-- 登录按钮组 -->
      <view class="login-buttons">
        <!-- 账号密码登录按钮 -->
        <wd-button
          type="primary"
          size="large"
          block
          @click="handleAccountLogin"
          class="account-login-btn"
        >
          登录
        </wd-button>

        <!-- 微信小程序一键登录按钮 -->
        <!-- #ifdef MP-WEIXIN -->
        <view class="divider">
          <view class="divider-line"></view>
          <view class="divider-text">或</view>
          <view class="divider-line"></view>
        </view>

        <wd-button
          type="info"
          size="large"
          block
          plain
          @click="handleWechatLogin"
          class="wechat-login-btn"
        >
          <template #prefix>
            <wd-icon name="weixin" size="20px" class="wechat-icon"></wd-icon>
          </template>
          微信一键登录
        </wd-button>
        <!-- #endif -->
      </view>
    </view>

    <!-- 隐私协议勾选 -->
    <view class="privacy-agreement">
      <wd-checkbox v-model="agreePrivacy" shape="square" class="privacy-checkbox">
        <view class="agreement-text">
          我已阅读并同意
          <text class="agreement-link" @click.stop="handleAgreement('user')">《用户协议》</text>
          和
          <text class="agreement-link" @click.stop="handleAgreement('privacy')">《隐私政策》</text>
        </view>
      </wd-checkbox>
    </view>

    <view class="login-footer"></view>

    <!-- 页面内容结束 -->
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { isMpWeixin } from '@/utils/platform'

// 获取环境变量
const appTitle = ref(import.meta.env.VITE_APP_TITLE || 'Lucky-Admin-App')
const appLogo = ref(import.meta.env.VITE_APP_LOGO || '/static/logo.png')

// 初始化store
const userStore = useUserStore()

// 登录表单数据
const username = ref('')
const password = ref('')
// 隐私协议勾选状态
const agreePrivacy = ref(false)

// 显示消息提示
const showToast = (msg: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
  uni.showToast({
    title: msg,
    icon: type === 'success' ? 'success' : 'none',
    duration: 2000,
  })
}

// 账号密码登录
const handleAccountLogin = () => {
  // 表单验证
  if (!username.value) {
    showToast('请输入用户名', 'error')
    return
  }
  if (!password.value) {
    showToast('请输入密码', 'error')
    return
  }
  // 验证是否同意隐私协议
  if (!agreePrivacy.value) {
    showToast('请先阅读并同意用户协议和隐私政策', 'error')
    return
  }

  // 显示加载中
  uni.showLoading({ title: '登录中...' })

  // 模拟登录请求
  setTimeout(() => {
    // 这里模拟登录成功，实际项目中应该调用后端接口
    // const res = await api.login({ username: username.value, password: password.value })

    // 模拟登录成功后的用户信息
    const mockUserInfo = {
      nickname: username.value,
      avatar: '/static/avatar.png',
      token: 'mock-token-' + Date.now(),
    }

    // 保存用户信息到store
    userStore.setUserInfo(mockUserInfo)

    // 隐藏加载
    uni.hideLoading()

    // 登录成功提示
    showToast('登录成功', 'success')

    // 延迟跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index',
      })
    }, 1500)
  }, 1000)
}

// 微信登录
const handleWechatLogin = () => {
  if (!isMpWeixin) {
    showToast('请在微信小程序中使用此功能')
    return
  }

  // 验证是否同意隐私协议
  if (!agreePrivacy.value) {
    showToast('请先阅读并同意用户协议和隐私政策', 'error')
    return
  }

  // 显示加载中
  uni.showLoading({ title: '登录中...' })

  // 调用微信登录API
  uni.login({
    provider: 'weixin',
    success: async (loginRes) => {
      if (loginRes.code) {
        try {
          // 这里模拟登录成功，实际项目中应该调用后端接口
          // const res = await api.login({ code: loginRes.code })

          // 模拟登录成功后的用户信息
          const mockUserInfo = {
            nickname: '微信用户',
            avatar:
              'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
            token: 'mock-token-' + Date.now(),
          }

          // 保存用户信息到store
          userStore.setUserInfo(mockUserInfo)

          // 登录成功提示
          showToast('登录成功', 'success')

          // 延迟跳转到首页
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/index/index',
            })
          }, 1500)
        } catch (error) {
          console.error('登录失败', error)
          showToast('登录失败，请重试', 'error')
        } finally {
          uni.hideLoading()
        }
      } else {
        uni.hideLoading()
        showToast('登录失败，请重试', 'error')
      }
    },
    fail: () => {
      uni.hideLoading()
      showToast('登录失败，请重试', 'error')
    },
  })
}

// 处理协议点击
const handleAgreement = (type: 'user' | 'privacy') => {
  const title = type === 'user' ? '用户协议' : '隐私政策'
  showToast(`查看${title}`)
  // 实际项目中可以跳转到对应的协议页面
  // uni.navigateTo({
  //   url: `/pages/agreement/${type}`
  // })titletypetitletypetitletypetitletypetitletypetitletype
}
</script>

<style lang="scss" scoped>
.login-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 60rpx;
  background-color: #ffffff;
  background-image: linear-gradient(to bottom, rgba(25, 137, 250, 0.05), rgba(255, 255, 255, 0));
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 140rpx;

  .login-logo {
    width: 180rpx;
    height: 180rpx;
    border-radius: 30rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:active {
      transform: scale(0.95);
    }
  }

  .login-title {
    margin-top: 30rpx;
    font-size: 44rpx;
    font-weight: bold;
    color: #333333;
    letter-spacing: 2rpx;
  }
}

.login-form {
  flex: 1;
  margin-top: 80rpx;

  .welcome-text {
    margin-bottom: 16rpx;
    font-size: 48rpx;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }

  .login-desc {
    margin-bottom: 60rpx;
    font-size: 28rpx;
    color: #999999;
    text-align: center;
  }

  .login-input-group {
    margin-bottom: 50rpx;

    .input-wrapper {
      position: relative;
      margin-bottom: 40rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .login-input {
        padding: 6rpx 10rpx;
        background-color: rgba(245, 247, 250, 0.6);
        border-radius: 12rpx;
        transition: all 0.3s ease;

        &:focus-within {
          background-color: rgba(245, 247, 250, 0.9);
          box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
          transform: translateY(-2rpx);
        }
      }

      .input-bottom-line {
        position: absolute;
        bottom: 0;
        left: 5%;
        width: 90%;
        height: 2rpx;
        background: linear-gradient(
          to right,
          transparent,
          var(--wot-color-theme, #1989fa),
          transparent
        );
        transition: transform 0.3s ease;
        transform: scaleX(0);
      }

      &:focus-within .input-bottom-line {
        transform: scaleX(1);
      }

      .input-icon {
        margin-right: 10rpx;
        color: #666666;
      }
    }
  }

  .login-buttons {
    display: flex;
    flex-direction: column;
    gap: 30rpx;

    .account-login-btn {
      height: 90rpx;
      margin-top: 20rpx;
      font-size: 32rpx;
      border-radius: 45rpx;
      box-shadow: 0 10rpx 20rpx rgba(25, 137, 250, 0.2);
      transition: all 0.3s ease;

      &:active {
        box-shadow: 0 5rpx 10rpx rgba(25, 137, 250, 0.2);
        transform: scale(0.98);
      }
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 20rpx 0;

      .divider-line {
        flex: 1;
        height: 1px;
        background-color: #eeeeee;
      }

      .divider-text {
        padding: 0 20rpx;
        font-size: 24rpx;
        color: #999999;
      }
    }

    .wechat-login-btn {
      height: 90rpx;
      font-size: 32rpx;
      color: #07c160;
      border-color: #07c160;
      border-radius: 45rpx;

      .wechat-icon {
        margin-right: 10rpx;
      }

      &:active {
        background-color: rgba(7, 193, 96, 0.05);
      }
    }
  }
}

.privacy-agreement {
  display: flex;
  justify-content: center;
  margin: 20rpx 0 40rpx;

  .privacy-checkbox {
    display: flex;
    align-items: center;
  }

  .agreement-text {
    margin-left: 8rpx;
    font-size: 26rpx;
    line-height: 1.6;
    color: #666666;

    .agreement-link {
      padding: 0 4rpx;
      font-weight: 500;
      color: var(--wot-color-theme, #1989fa);
      transition: opacity 0.3s ease;

      &:active {
        opacity: 0.8;
      }
    }
  }
}

.login-footer {
  padding: 50rpx 0;
  margin-top: auto;
}
</style>

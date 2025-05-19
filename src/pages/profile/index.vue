<route lang="json5">
{
  style: {
    navigationBarTitleText: '个人中心',
  },
}
</route>

<template>
  <view class="profile-container">
    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <view class="avatar-wrapper" @click="run">
        <wd-img :src="userInfo.avatar" width="80px" height="80px" radius="50%"></wd-img>
      </view>
      <view class="user-details">
        <view class="username">{{ userInfo.name }}</view>
        <view class="user-id">ID: {{ userInfo.id }}</view>
        <view class="user-created">注册时间: {{ userInfo.createTime }}</view>
      </view>
    </view>

    <!-- 功能区块 -->
    <view class="function-section">
      <view class="cell-group">
        <view class="group-title">账号管理</view>
        <wd-cell title="个人资料" is-link @click="handleProfileInfo">
          <template #icon>
            <wd-icon name="user" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="账号安全" is-link @click="handlePassword">
          <template #icon>
            <wd-icon name="lock-on" size="20px"></wd-icon>
          </template>
        </wd-cell>
      </view>

      <view class="cell-group">
        <view class="group-title">通用设置</view>
        <wd-cell title="消息通知" is-link @click="handleInform">
          <template #icon>
            <wd-icon name="notification" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="清理缓存" is-link @click="handleClearCache">
          <template #icon>
            <wd-icon name="clear" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="应用更新" is-link @click="handleAppUpdate">
          <template #icon>
            <wd-icon name="refresh1" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="关于我们" is-link @click="handleAbout">
          <template #icon>
            <wd-icon name="info-circle" size="20px"></wd-icon>
          </template>
        </wd-cell>
      </view>

      <view class="logout-button-wrapper">
        <wd-button type="error" block @click="handleLogout">退出登录</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { toast } from '@/utils/lucky/toast'
import { uploadFileUrl, useUpload } from '@/utils/lucky/uploadFile'
import { storeToRefs } from 'pinia'

onShow((options) => {
  console.log('个人中心onShow', options)
  useUserStore().UserInfoAction()
})
// 上传头像
const { run } = useUpload<IUploadSuccessInfo>(
  uploadFileUrl.USER_AVATAR,
  {},
  {
    onSuccess: (res) => useUserStore().UserInfoAction(),
  },
)

// 用户信息
const { userInfo } = storeToRefs(useUserStore())
// 个人资料
const handleProfileInfo = () => {
  uni.navigateTo({ url: `/pages/profile/info/index` })
}
// 账号安全
const handlePassword = () => {
  uni.navigateTo({ url: `/pages/profile/password/index` })
}
// 消息通知
const handleInform = () => {
  // uni.navigateTo({ url: `/pages/profile/inform/index` })
  toast.success('功能开发中')
}
// 应用更新
const handleAppUpdate = () => {
  // toast.success('已是最新版本')
  toast.success('功能开发中')
}
// 关于我们
const handleAbout = () => {
  // uni.navigateTo({ url: `/pages/profile/about/index` })
  toast.success('功能开发中')
}
// 清除缓存
const handleClearCache = () => {
  uni.showModal({
    title: '清除缓存',
    content: '确定要清除所有缓存吗？\n清除后需要重新登录',
    success: (res) => {
      if (res.confirm) {
        try {
          // 清除所有缓存
          uni.clearStorageSync()
          // 清除用户信息并跳转到登录页
          useUserStore().LogoutAction()
          toast.success('清除缓存成功')
        } catch (err) {
          console.error('清除缓存失败:', err)
          toast.error('清除缓存失败')
        }
      }
    },
  })
}
// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空用户信息
        useUserStore().LogoutAction()
        // 执行退出登录逻辑
        toast.success('退出登录成功')
        // 跳转到登录页面
        uni.reLaunch({ url: '/pages/login/index' })
      }
    },
  })
}
</script>

<style lang="scss" scoped>
/* 基础样式 */
.profile-container {
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  background-color: #f7f8fa;
}
/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  padding: 40rpx;
  margin: 30rpx 30rpx 20rpx;
  background-color: #fff;
  border-radius: 24rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  }
}

.avatar-wrapper {
  width: 160rpx;
  height: 160rpx;
  margin-right: 40rpx;
  overflow: hidden;
  border: 4rpx solid #f5f5f5;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.user-details {
  flex: 1;
}

.username {
  margin-bottom: 12rpx;
  font-size: 38rpx;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5rpx;
}

.user-id {
  font-size: 28rpx;
  color: #666;
}

.user-created {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #999;
}
/* 功能区块 */
.function-section {
  padding: 0 20rpx;
  margin-top: 20rpx;
}

.cell-group {
  margin-bottom: 20rpx;
  overflow: hidden;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.group-title {
  padding: 24rpx 30rpx 16rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #999;
  background-color: #fafafa;
}

:deep(.wd-cell) {
  border-bottom: 1rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  .wd-cell__title {
    margin-left: 5px;
    font-size: 32rpx;
    color: #333;
  }

  .cell-icon {
    margin-right: 20rpx;
    font-size: 36rpx;
  }
}
/* 退出登录按钮 */
.logout-button-wrapper {
  padding: 40rpx 30rpx;
}

:deep(.wd-button--danger) {
  height: 88rpx;
  font-size: 32rpx;
  line-height: 88rpx;
  color: #fff;
  background-color: #f53f3f;
  border-radius: 44rpx;
}
</style>

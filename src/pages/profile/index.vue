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
      <view class="avatar-wrapper" @click="navigateToAvatarEdit">
        <wd-img :src="userInfo.avatar" width="80px" height="80px" radius="50%"></wd-img>
      </view>
      <view class="user-details">
        <view class="username">{{ userInfo.username }}</view>
        <view class="user-id">ID: {{ userInfo.userId }}</view>
        <view class="user-created">注册时间: {{ userInfo.createdAt }}</view>
      </view>
    </view>

    <!-- 功能区块 -->
    <view class="function-section">
      <view class="cell-group">
        <view class="group-title">账号管理</view>
        <wd-cell title="个人资料" is-link @click="handleCellClick('profile')">
          <template #icon>
            <wd-icon name="user" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="账号安全" is-link @click="handleCellClick('security')">
          <template #icon>
            <wd-icon name="lock-on" size="20px"></wd-icon>
          </template>
        </wd-cell>
      </view>

      <view class="cell-group">
        <view class="group-title">通用设置</view>
        <wd-cell title="消息通知" is-link @click="handleCellClick('notification')">
          <template #icon>
            <wd-icon name="notification" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="隐私设置" is-link @click="handleCellClick('privacy')">
          <template #icon>
            <wd-icon name="setting" size="20px"></wd-icon>
          </template>
        </wd-cell>
        <wd-cell title="关于我们" is-link @click="handleCellClick('about')">
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
import { ref } from 'vue'

// 用户信息
const userInfo = ref({
  username: '用户名',
  userId: '10086',
  avatar: '/static/profile.jpg',
  createdAt: '2023-01-01',
})

// 跳转到头像编辑页面
const navigateToAvatarEdit = () => {
  uni.navigateTo({
    url: '/pages/profile/avatar/index',
  })
}

// 处理功能项点击
const handleCellClick = (type: string) => {
  uni.showToast({
    title: `点击了${type}`,
    icon: 'none',
  })
}

// 处理退出登录
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 执行退出登录逻辑
        uni.showToast({
          title: '已退出登录',
          icon: 'success',
          success: () => {
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/login/index',
              })
            }, 1500)
          },
        })
      }
    },
  })
}
</script>

<style lang="scss" scoped>
/* 基础样式 */
.profile-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  background-color: #f7f8fa;
}
/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  margin: 20rpx;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.avatar-wrapper {
  width: 160rpx;
  height: 160rpx;
  margin-right: 30rpx;
  overflow: hidden;
  border: 2rpx solid #eee;
  border-radius: 50%;
}

.user-details {
  flex: 1;
}

.username {
  margin-bottom: 10rpx;
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
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

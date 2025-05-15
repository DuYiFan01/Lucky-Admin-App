<route lang="json5">
{
  style: {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom',
  },
}
</route>
<template>
  <view class="content">
    <image class="logo" :src="appLogo"></image>
    <view class="text-area">
      <text class="title">{{ appTitle }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store'
const appTitle = ref(import.meta.env.VITE_APP_TITLE || 'Lucky-Admin-App')
const appLogo = ref(import.meta.env.VITE_APP_LOGO || '/static/logo.png')
onShow((options) => {
  console.log('首页onShow', options)
  useUserStore().UserInfoAction()
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 180rpx;
  height: 180rpx;
  margin-top: 140rpx;
}
.text-area {
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

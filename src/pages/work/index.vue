<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '工作台',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class=""></view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
onShow((options) => {
  console.log('工作台onShow', options)
  useUserStore().UserInfoAction()
})
</script>

<style lang="scss" scoped>
//
</style>

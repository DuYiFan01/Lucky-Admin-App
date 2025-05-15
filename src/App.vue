<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { toast } from '@/utils/lucky/toast'
import { useUserStore } from '@/store'

onLaunch(() => {
  console.log('App Launch')
  // 文档位置 : https://uniapp.dcloud.net.cn/api/system/network.html#onnetworkstatuschange
  // 监听网络状态变化
  uni.onNetworkStatusChange((result) => {
    const { isConnected, networkType } = result
    if (!isConnected) {
      toast.error('网络连接已断开')
    }
    console.log('网络状态:' + networkType)
  })
  // 检测是否登录
  // #ifdef MP-WEIXIN
  checkLogin()
  // #endif
})
onShow((options) => {
  console.log(options)

  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
// 检测是否登录
// #ifdef MP-WEIXIN
const checkLogin = () => {
  // 判断是否登录
  useUserStore()
    .UserInfoAction()
    .then((res) => {
      if (res.code === 1) {
        // 已经登录
        console.log('已经登录')
        // 跳转指定页面
        const currentPage = getCurrentPages()
        console.log('currentPages:', currentPage)
        const toPage = '/pages/index/index'
        if (currentPage[0]?.route === toPage) {
          return
        }
        uni.reLaunch({ url: '/pages/index/index' })
      }
    })
}
// #endif
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>

# Lucky-Admin-App

## 文档地址

文档地址：  [Home | Lucky-Admin](https://doc.admin.anlucky.cn/)


## 1. 部署Lucky-Admin-Vue的后端

不想部署后端可参考文档修改后端请求地址，直接使用Lucky-Admin-Vue 在线预览后端地址即可

## 2. 克隆项目到本地

```shell
git clone https://gitee.com/xiaodu6/lucky-admin-app-unibest.git
```

## 3. 导入移动端数据库

> 移动端的SQL在根目录下：sql/sql/createApp.sql  

> 移动端的菜单仅仅提供了基础的菜单配置和角色配置，并没有实现动态路由，权限控制使用的是Web端页面的权限控制配置器，因此，若需要使用动态路由是需要自己实现的。

## 4. 修改配置文件

移动端的后端依赖于Lucky-Admin-Vue的后端故修改配置文件同Lucky-Admin-Vue的后端配置方法相同

## 5. 移动端安装依赖

```shell
npm install pnpm -g
pnpm install
```

## 6. 移动端启动

```shell
pnpm dev ## 运行H5环境
pnpm dev:mp-weixin ## 运行微信小程序环境
```

## 7. 移动端运行到其他平台

|     类型     |    标识     |
| :----------: | :---------: |
|  微信小程序  |  mp-weixin  |
| 支付宝小程序 |  mp-alipay  |
|  抖音小程序  | mp-toutiao  |
|  飞书小程序  |   mp-lark   |
|   QQ小程序   |    mp-qq    |
|  京东小程序  |    mp-jd    |
| 小红书小程序 |   mp-xhs    |
|  百度小程序  |  mp-baidu   |
|  快手小程序  | mp-kuaishou |


# 一点 · 让善意刚好发生

uni-app + Vue 3 实现的账单互助产品演示，支持 H5 与微信小程序。桌面双栏、移动端卡片布局，左右滑动、分类与金额筛选、收藏、模拟帮助记录、发布账单和本地持久化均可直接体验。

## 运行

```sh
npm install
npm run dev:h5
```

打开终端显示的本地地址。H5 构建：`npm run build:h5`，产物位于 `dist/build/h5`，使用静态服务器部署即可。

微信小程序构建：`npm run build:mp-weixin`，使用微信开发者工具导入 `dist/build/mp-weixin`，并将 `src/manifest.json` 中的 `mp-weixin.appid` 替换为自己的小程序 AppID。空 AppID 可按开发者工具支持情况使用测试模式。

运行数据逻辑检查：`npm test`。浏览器交互检查：`npm run test:e2e`（Windows 默认使用已安装的 Edge，其他系统先执行 `npx playwright install chromium`，也可设置 `PLAYWRIGHT_EXECUTABLE_PATH`）。图标是本地 PNG，同时兼容两个端；可用 Pillow 运行 `python scripts/create-icons.py` 重新生成。

## 演示范围

当前所有人物、账单、审核标签与公共统计为产品示意。没有真实身份审核和支付：帮助确认只增加本地记录，发布只保存到当前设备。浏览器数据保存在 `yidian-v1`，请勿存放真实敏感资料。

正式运营需建设服务端、用户登录、实名认证和票据审核、内容举报与风控、适用的支付或公益资质、商户支付及服务端回调核验。不得直接把前端模拟余额作为真实收款结果。

## 图片来源

示意照片下载自 Unsplash，照片中人物与虚构故事无关：

- https://unsplash.com/photos/1524504388940-b1c1722653e1（人物卡片）
- https://images.unsplash.com/photo-1556911220-bff31c812dba（厨房）
- https://images.unsplash.com/photo-1434030216411-0b793f4b4173（学习）

上线前请按实际使用场景复核肖像和图片使用授权，并替换成已授权的求助者资料。

欢迎部署测试
https://img.2cf.de5.net

# 介绍
基于 Cloudflare 下 Snippets 或 Worker 或 Pages 的图床/视频床/文件床服务

## 功能特点

- ❌可选的访客验证功能
- 图片压缩功能
- 文件大小限制20MB
- 支持查看本地历史记录
- 支持所有文件格式上传
- 支持多文件上传和粘贴上传
- 支持批量操作和显示上传时间
- ❌Cloudflare Cache API 缓存支持
- 基于 Telegram Bot API 的文件存储

## 更新日志

> **最近更新**: 2025-12-08
> - 去除R2存储

### 2025-08-24
- 修复cdn.bytedance.com下线导致的页面加载异常的问题

## 部署步骤

### 1. 创建 Telegram Bot
1. 在 Telegram 中找到 [@BotFather](https://t.me/BotFather)
2. 发送 `/newbot` 命令创建新机器人
3. 按照提示设置机器人名和用户名
4. 保存获得的 Bot Token (格式为`123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)
   - 这个 Token 将用作环境变量 `TG_BOT_TOKEN`

### 2. 创建 Telegram 频道或群组
1. 创建一个新的频道或群组
2. 将你的 Bot 添加为管理员
3. 获取频道/群组 ID：
   - 发送频道内的任意消息给 [@getidsbot](https://t.me/getidsbot)
   - 在 Origin chat 下找到对应的 ID (格式为 `-100xxxxxxxxxx`)
   - 这个 ID 将用作环境变量 `TG_CHAT_ID`

### 3. 部署Snippets/Worker/Pages
1. 进入你的worker项目 → 点击编辑代码
2. 将 `_worker.js` 的完整代码复制粘贴到编辑器中修改开头2行变量
3. 点击 `部署`

#### 4、Snippets设置代码片段

#### 4、Worker设置自定义域名或添加路由

#### 4、Pages设置自定义域名

## 开源协议

MIT License

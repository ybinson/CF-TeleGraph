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
3. 按照提示设置机器人名和用户名得到→ @free_tuchuang_bot
4. 获得 TG_BOT_TOKEN (格式为`123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. 启用机器人和获取你的TGID
1. 发送`/start` 给上面创建@free_tuchuang_bot
3. 获取你TG的ID：
   - 发送 `/start` 给 [@GetIDcnBot](https://t.me/GetIDcnBot)
   - 返回你TG对应的 `TG_CHAT_ID`

### 3. 部署Snippets/Worker/Pages
1. 进入你的worker项目 → 点击编辑代码
2. 将 `snippets.js_worker.js` 的完整代码复制粘贴到编辑器中修改开头2行变量

#### 4、Snippets设置代码片段

#### 4、Worker设置自定义域名或添加路由

#### 4、Pages设置自定义域名

## 开源协议

MIT License


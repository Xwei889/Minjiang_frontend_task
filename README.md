# 📖 个人课程学习平台 V5.0


一个基于纯前端技术（HTML5 + CSS3 + JavaScript）借助vibecoding构建的个人课程学习平台，集成了课程管理、数据可视化、音乐播放等多种实用功能模块。


## ✨ 功能模块

### 🏠 首页
- 响应式导航栏，支持移动端汉堡菜单
- 自动轮播图展示（4 张幻灯片，支持手动切换）
- iframe 嵌入子页面，自适应内容高度
- 实时时钟显示
  <img width="1277" height="680" alt="image" src="https://github.com/user-attachments/assets/f34ae4a3-ba7a-45cd-8b2d-53c49bee6b79" />


### 🔐 用户系统
- 用户注册（用户名 / 密码强度校验、确认密码）
- 用户登录 / 退出
- 登录状态本地持久化（localStorage）
- 表单实时验证与错误提示

### 📖 课程简介
- 课程介绍与核心内容展示
- HTML5 / CSS3 / JavaScript 三大技术要点说明

### 📅 课表
- 周课程表展示

### 📚 教材
- 教材信息浏览

### 📝 备忘录
- 学习备忘录记录与管理

### 📊 数据图表（ECharts）
- 基于 [ECharts](https://echarts.apache.org/) 的数据可视化
- 多种图表类型展示

### 💰 记账本
- 个人收支记录管理

### 🎵 音乐播放器
- 播放 / 暂停 / 上一首 / 下一首
- 进度条拖拽与时间显示
- 音量控制
- 播放列表管理

---

## 🛠️ 技术栈

| 技术          | 用途               |
| ------------- | ------------------ |
| HTML5         | 页面结构与语义化   |
| CSS3          | 样式布局与动画     |
| JavaScript    | 交互逻辑与 DOM 操作 |
| ECharts 5.4.3 | 数据可视化图表     |
| localStorage  | 客户端数据持久化   |

---

## 📂 项目结构

```
Projectxjw_V5.0/
├── index.html          # 首页（主入口）
├── introduce.html      # 课程简介
├── schedule.html       # 课表
├── book.html           # 教材
├── memo.html           # 备忘录
├── echart.html         # 数据图表
├── account.html        # 记账本
├── music.html          # 音乐播放器
├── favicon.ico         # 网站图标
├── top-bg.gif          # 顶部背景图
├── css/
│   ├── common.css      # 公共样式
│   ├── index.css       # 首页样式
│   ├── login.css       # 登录弹窗样式
│   ├── carousel.css    # 轮播图样式
│   ├── introduce.css   # 课程简介样式
│   ├── schedule.css    # 课表样式
│   ├── book.css        # 教材样式
│   ├── memo.css        # 备忘录样式
│   ├── music.css       # 音乐播放器样式
│   └── account.css     # 记账本样式
├── js/
│   ├── utils.js        # 工具函数
│   ├── login.js        # 登录注册逻辑
│   └── carousel.js     # 轮播图逻辑
├── images/             # 图片资源
│   ├── DiscreteMath.jpg
│   ├── Java.jpg
│   ├── Web2.jpg
│   ├── computer.jpg
│   ├── computer2.jpg
│   ├── computer3.jpg
│   ├── database.jpg
│   └── web.jpg
├── audio/              # 音频资源
│   ├── 王力宏 - 爱错.mp3
│   ├── 蔡徐坤 - 情人.mp3
│   └── 陶喆 - 王八蛋.mp3
└── video/              # 视频资源目录
```

---

## 🚀 快速开始

1. **克隆或下载项目**

   ```bash
   git clone <仓库地址>
   ```

2. **打开项目**

   直接在浏览器中打开 `index.html` 即可运行（纯静态项目，无需构建工具）。

3. **推荐使用 Live Server**

   如果使用 VS Code，可安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件，右键 `index.html` 选择 **Open with Live Server**，获得更好的开发体验。

---

## 📱 响应式支持

- 桌面端（≥1024px）：完整布局
- 平板端（768px~1023px）：自适应调整
- 移动端（<768px）：折叠导航栏、单列布局

---

## 📝 更新日志

### V5.0（2026-06）
- 新增 ECharts 数据图表模块
- 新增音乐播放器功能
- 优化整体 UI 设计
- 完善响应式布局

---

## 📄 许可证

本项目仅用于学习交流，请勿用于商业用途。

---

<p align="center">© 2025-2026 闽江大学 · 计算机和大数据学院 · 人工智能专业</p>

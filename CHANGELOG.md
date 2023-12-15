### v0.0.1

支持 localStorage 在页面见的转移
使用方式见 README.md

### v0.0.2

- 切换存储域名时 也会选中默认的 key

- 排序改为按时间倒排

### v0.0.3

- 使用 chrome.scripting.executeScript 方法代替 content_scripts

- 做到不用重启浏览器也能直接运行插件

### v0.0.4

- vite 升级到 v4 版本
- 修改图片存放路径，解决打包后图片资源引用不到问题

> copyTarget 不能和 outdir 一个目录，会被编译产物覆盖

### v0.0.5

- 默认开启 sourceMap

- 增加用户信息展示

- 使用 Context 存储当前 tab 信息

### v0.0.6

- 新增复制 set 方法，可以跨浏览器设置 localStorage

### v0.0.7

- localStorage 获取提升到 store 中
- 拆分 contentScripts 为 start 和 end
- 新增新框架跳过登录功能
- 新增修复新框架本地样式功能
- 布局更新

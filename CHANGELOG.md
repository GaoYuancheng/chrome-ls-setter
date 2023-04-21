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

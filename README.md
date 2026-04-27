# Personal Website

一个轻量的个人网页框架，不需要安装依赖，适合直接部署到 GitHub Pages。

## 文件

- `index.html`: 页面结构和占位文本
- `styles.css`: 响应式布局、明暗主题和视觉样式
- `script.js`: 明暗主题切换、年份和首页星图背景

## 修改位置

1. 在 `index.html` 里把 `Your Name`、简介、项目、论文和链接替换成你的信息。
2. 如需增加项目，复制 `Project Title` 所在的 `<article class="project">...</article>`。
3. 如需增加论文，复制 `publication-list` 里的 `<li>...</li>`。
4. 如果用于 GitHub Pages，通常把这些文件放到仓库根目录，或放到 `docs/` 并在仓库设置里选择对应目录。

## 本地预览

直接双击 `index.html` 即可打开；也可以在 VS Code 里用 Live Server 预览。

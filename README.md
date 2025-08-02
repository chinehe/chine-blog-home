# chine-blog-home

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Project Structure

```
.
├── .vscode/                 # VS Code 配置目录
│   ├── extensions.json      # 推荐的 VS Code 扩展
│   └── settings.json        # VS Code 设置
├── public/                  # 公共静态资源目录
│   └── favicon.ico          # 网站图标
├── src/                     # 源代码目录
│   ├── App.vue              # 根组件
│   └── main.js              # 应用入口文件
├── index.html               # HTML 入口文件
├── jsconfig.json            # JavaScript 配置文件
├── vite.config.js           # Vite 配置文件
├── package.json             # 项目配置和依赖
└── README.md                # 项目说明文档
```

### File Descriptions

- **index.html**: 页面入口文件，定义了 Vue 应用的挂载点
- **src/main.js**: 应用入口文件，创建并挂载 Vue 实例
- **src/App.vue**: 根组件，包含应用的主要界面
- **vite.config.js**: Vite 构建工具配置文件
- **package.json**: 项目配置文件，包含依赖和脚本命令
- **jsconfig.json**: JavaScript 配置，用于路径映射
- **public/**: 静态资源目录，存放不会被构建过程处理的文件
- **.vscode/**: VS Code 编辑器相关配置
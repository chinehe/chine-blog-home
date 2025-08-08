// 从 vue 模块中导入 createApp 函数，用于创建 Vue 应用实例
import { createApp } from 'vue'
// 从 App.vue 文件中导入根组件
import App from './App.vue'
// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 使用 createApp 函数创建 Vue 应用实例，传入根组件 App
// 然后将应用实例挂载到 index.html 中 id 为 'app' 的 DOM 元素上
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
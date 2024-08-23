import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'// 引入pinia
import elementPlus from 'element-plus'// 引入element-plus
import 'element-plus/dist/index.css'// 引入element-plus样式

const app = createApp(App)// 创建vue实例
app.use(elementPlus)
app.use(createPinia())
app.mount('#app')
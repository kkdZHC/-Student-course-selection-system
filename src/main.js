import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
//import 'element-plus/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import '../theme/index.css'
createApp(App).use(store).use(router).use(scroll).use(ElementPlus, { locale }).mount("#app");


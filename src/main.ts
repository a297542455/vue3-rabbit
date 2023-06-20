import { createApp } from "vue";
import App from "./App.vue";

// 统一不同浏览器标签默认样式
import "normalize.css";
// 按照项目需求，提供自己的公用样式
import "@/assets/styles/common.less";
import router from "./router";
import { createPinia } from "pinia";
import XtxUI from "./components/XtxUI";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 创建 pinia 实例
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
// 使用 vueRouter
app.use(router);
// 使用 pinia
app.use(pinia);
// 使用 XtxUI
app.use(XtxUI);
app.mount("#app");

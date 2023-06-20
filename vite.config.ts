import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 1. Jsx 插件，初始化项目的时候选择Jsx就会自动下载
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vitejs.dev/config/
export default defineConfig({
  // 配置开发服务器
  server: {
    // QQ三方登录的回调uri为：http://www.corho.com:8080/#/login/callback
    // vite 中配置： www.corho.com:8080
    // 🔔要实现QQ授权登录，需要做两个步骤：
    //   1. 复制项目根目录的 hosts 文件到电脑中，位置为 C:\Windows\System32\drivers\etc 目录下
    //   2. 开启以下注释，让本地服务器支持通过 www.corho.com 访问当前 Vue项目。
    // host: "www.corho.com",
    port: 8080,
    // 其他常用配置项
    open: true, // 帮我们打开浏览器
    cors: true, // 允许开发时 ajax 跨域
  },
  base: "./", // 设置打包路径，部署到码云GiteePages需要
  plugins: [
    vue({
      // 响应性语法糖目前默认是关闭状态，需要你显式选择启用。此外，接下来的所有配置都需要 vue@^3.2.25
      reactivityTransform: true,
    }),
    // 2. 应用 vueJsx 插件
    vueJsx(),
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    // https://cn.vitejs.dev/config/#css-preprocessoroptions
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `,
      },
    },
  },
});

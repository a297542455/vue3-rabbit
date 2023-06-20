<script setup lang="ts">
import AppTopnav from "./components/app-topnav.vue";
import AppHeader from "./components/app-header.vue";
import AppFooter from "./components/app-footer.vue";
import AppHeaderSticky from "./components/app-header-sticky.vue";
import { RouterView } from "vue-router";
import useStore from "@/store";
const { home } = useStore();
// 在父组件发送请求更合理，分类请求只需要发一次即可
home.getAllCategory();
</script>

<template>
  <AppTopnav />
  <AppHeader />
  <AppHeaderSticky />
  <main class="app-body">
    <!-- 预留路由出口，添加添加 :key 解决路由缓存的问题 -->
    <RouterView :key="$route.fullPath" />
    <!-- fulllPath   /category/1029487?username=zs&age=18 -->
    <!-- path        /category/1029487 -->
  </main>
  <AppFooter />
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>

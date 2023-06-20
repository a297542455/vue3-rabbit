<script setup lang="ts" name="Home">
import HomeBanner from "./components/home-banner.vue";
import HomeCategory from "./components/home-category.vue";
import HomeNew from "./components/home-new.vue";
</script>

<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- banner轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- home-entry 同级添加面板 -->
    <HomeNew />
  </div>
</template>

<style lang="less" scoped></style>

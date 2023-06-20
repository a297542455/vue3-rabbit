<script setup lang="ts">
import useStore from "@/store";

const { home } = useStore();
home.getBannerList();
</script>

<template>
  <div class="home-banner">
    <XtxSlider :sliders="home.bannerList" auto-play />
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>

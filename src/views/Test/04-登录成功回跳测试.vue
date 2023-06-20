<script setup lang="ts">
//
</script>

<template>
  <RouterLink :to="'/login?target=' + encodeURIComponent($route.fullPath)">
    <XtxButton type="primary"> 请先登录 </XtxButton>
  </RouterLink>
</template>

<style scoped lang="less"></style>

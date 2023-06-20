<script setup lang="ts">
import { useObserver } from "@/hooks";
import useStore from "@/store";
import { RouterLink } from "vue-router";
import HomePanel from "./home-panel.vue";
const { home } = useStore();
// 调用封装的请求按需加载函数，返回用于绑定DOM的目标元素ref
const { target } = useObserver(home.getNewGoodsList);
</script>

<template>
  <div class="home-new">
    <!-- 🚨 ref 需在模板中绑定目标元素 -->
    <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list" v-if="home.newGoodsList.length > 0">
        <li v-for="item in home.newGoodsList" :key="item.id">
          <RouterLink :to="`/goods/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <ul class="goods-list" v-else>
        <li v-for="item in home.newGoodsList" :key="item.id">
          <XtxSkeleton :width="306" :height="406" bg="rgba(0,0,0,0.2)" />
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>

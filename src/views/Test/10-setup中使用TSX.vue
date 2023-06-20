<script setup lang="tsx">
import { ref } from "vue";

const count = ref(0);
const isHide = ref(true);
const add = () => {
  count.value += 1;
};
const list = ref([
  { id: 1, content: "吃饭", done: true },
  { id: 2, content: "睡觉", done: false },
  { id: 3, content: "打代码", done: true },
]);
// script - 数据绑定在 JSX 用一对花括号
const VDOM = () => {
  return (
    <div>
      <h1>Hello TSX in Setup</h1>
      <p>{count.value}</p>
      <button onClick={add}>点击+1</button>
      <button
        onClick={() => {
          isHide.value = !isHide.value;
        }}
      >
        切换显示隐藏
      </button>
      <h2>条件渲染</h2>
      {isHide.value ? <div>loading</div> : <div>结构2</div>}
      <h2>列表渲染</h2>
      <ul>
        {list.value.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};
</script>

<template>
  <!-- template 中数据绑定用 两对花括号 -->
  <VDOM />
</template>

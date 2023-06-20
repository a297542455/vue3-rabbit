<script setup lang="ts">
const obj = {
  name: "heima",
  age: 18,
};

console.log(obj);

for (const key in obj) {
  // console.log(key);
  // obj[key];     // TS 报错，key 的类型为 string，不够具体
  // 通过 ES6 提供的 Reflect 获取对象没问题
  const value = Reflect.get(obj, key);
  console.log(value);
}
</script>

<template>
  <div>
    <h1>TS中遍历和Reflect对象应用</h1>
  </div>
</template>

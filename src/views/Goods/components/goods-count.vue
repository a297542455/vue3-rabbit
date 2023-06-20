<script setup lang="ts">
// 子组件定义 Props
// 设置默认值写法建议使用传入配置
const props = defineProps({
  // 是否显示标签
  isLabel: {
    type: Boolean,
    default: false,
  },
  // 数量值
  modelValue: {
    type: Number,
    default: 1,
  },
  // 最大值
  max: {
    type: Number,
    default: 100,
  },
  // 最小值
  min: {
    type: Number,
    default: 1,
  },
});

// 子组件定义事件(普通写法，TS只检查事件名)
// const emit = defineEmits(["update:modelValue", "change"]);
// 子组件定义事件(进阶写法，TS同时检查事件名和形参)
const emit = defineEmits<{
  // 为组件的 emit 标注类型，形参也做 TS 检查 (TS函数重载的泛型写法)
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
}>();

// 点击加按钮
const add = () => {
  // 临时加
  const temp = props.modelValue + 1;
  // 如果超过了 max 最大值，不处理
  if (temp > props.max) return;
  // 更新 v-model 绑定的数据
  emit("update:modelValue", temp);
  // 把值也传给自定义事件 change
  emit("change", temp);
};

// 点击减按钮
const minus = () => {
  // 临时减
  const temp = props.modelValue - 1;
  // 如果超过了 min 最小值，不处理
  if (temp < props.min) return;
  // 更新 v-model 绑定的数据
  emit("update:modelValue", temp);
  // 把值也传给自定义事件 change
  emit("change", temp);
};
</script>

<template>
  <div class="xtx-numbox">
    <div class="label" v-if="isLabel">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="minus">-</a>
      <input type="text" readonly :value="modelValue" />
      <a href="javascript:;" @click="add">+</a>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>

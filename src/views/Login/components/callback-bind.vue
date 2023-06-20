<script setup lang="ts">
import { message } from "@/components/XtxUI";
import { useCountDown } from "@/hooks";
import useStore from "@/store";
import type { QQUserInfo } from "@/types";
import { reactive } from "vue";

interface Props {
  userInfo: QQUserInfo;
  unionId: string;
}
const props = defineProps<Props>();

// 准备表单响应式数据
const form = reactive({
  mobile: "13012345764",
  code: "123456",
});

const { member } = useStore();
// 调用倒计时hooks
const { start, countTime } = useCountDown(60);
// 发送验证码按钮
const sendCode = async () => {
  // 🐛如果前面的倒计时没结束，不执行任何操作，相当于按钮禁用
  if (countTime.value !== 0) return;
  // 1. 进行手机号格式校验
  if (!/^1[3-9]\d{9}$/.test(form.mobile)) {
    // 校验不通过，提醒用户
    return message({ type: "warn", text: "手机号码格式错误~" });
  }
  // 2. 调用获取验证码接口
  await member.getCodeQQBind(form.mobile);
  // 调用成功，用户提示
  message({ type: "success", text: "验证码已发送~" });
  // 调用成功，开始倒计时
  start();
};

// 提交登录
const submitLogin = () => {
  // 调用QQ登录绑定接口
  member.loginQQBind({
    unionId: props.unionId,
    mobile: form.mobile,
    code: form.code,
  });
};
</script>

<template>
  <!-- 防止控制台报错，QQ用户信息没回来不渲染 -->
  <div class="xtx-form" v-if="userInfo">
    <div class="user-info">
      <img :src="userInfo.data.figureurl_2" alt="" />
      <p>
        Hi，{{ userInfo.data.nickname }}
        欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~
      </p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input
          v-model.trim="form.mobile"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input
          v-model.trim="form.code"
          class="input"
          type="text"
          placeholder="短信验证码"
        />
        <span class="code" @click="sendCode">
          {{ countTime === 0 ? `发送验证码` : `${countTime}秒后重试` }}
        </span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit" @click="submitLogin">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>

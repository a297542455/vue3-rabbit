import { http } from "@/utils/request";
import { defineStore } from "pinia";
import type { Profile } from "@/types";
import { message } from "@/components/XtxUI";
// 📌在非 .vue 组件文件中，可通过导入 router 直接获取路由实例
import router from "@/router";
import {
  clearStorageProfile,
  getStorageProfile,
  saveStorageProfile,
} from "@/utils/storage";
import useStore from "..";

const useMemberStore = defineStore({
  id: "member",
  // 🚨使用插件遇到小问题，自己手写本地存储
  // persist: true,
  // 状态
  state: () => ({
    // 用户资料
    profile: getStorageProfile(),
  }),
  // 计算
  getters: {
    // getters 封装用户是否登录，语义更强
    isLogin(): boolean {
      return Boolean(this.profile.token);
    },
  },
  // 方法
  actions: {
    // 登录成功后的复用逻辑封装
    loginSuccess() {
      // 存储到本地
      saveStorageProfile(this.profile);
      // 📌主动合并本地购物车
      const { cart } = useStore();
      cart.mergeLocalCart();
      // 登录成功提示
      message({ type: "success", text: "登录成功" });
      // console.log(router);
      // 🐛 在非 .vue 组件中 useRoute() 返回 undefined，没法使用
      // const route = useRoute()
      // 📌 解决方案，通过 router 路由实例 currentRoute 获取
      const route = router.currentRoute.value;
      // console.log(route.path);
      if (route.query.target) {
        // 跳转到指定地址
        router.push(decodeURIComponent(route.query.target as string));
      } else {
        // 跳转到首页
        router.push("/");
      }
    },
    // 用户名密码登录
    async login(data: { account: string; password: string }) {
      // 发送请求
      const res = await http<Profile>("POST", "/login", data);
      // console.log("/login", res.data.result);
      // 存储到 Pinia 中
      this.profile = res.data.result;
      // 调用登录成功后的逻辑
      this.loginSuccess();
    },
    // 退出登录
    async logout() {
      // 清空 Pinia 用户信息
      this.profile = {} as Profile;
      // 清空 本地 用户信息
      clearStorageProfile();
      // 跳转到登录页
      router.push("/login");
      // 退出登录-主动清空购物车数据
      const { cart } = useStore();
      cart.clearCart();
    },
    // 获取QQ登录验证码
    async getCodeQQBind(mobile: string) {
      // 🔔温馨提醒：验证码是发送到用户手机上的
      await http("GET", "/login/social/code", { mobile: mobile });
      // console.log("GET", "/login/social/code", res.data.result);
    },
    // QQ登录_账号绑定
    async loginQQBind(data: { unionId: string; mobile: string; code: string }) {
      const res = await http<Profile>("POST", "/login/social/bind", data);
      // console.log("POST", "/login/social/bind", res.data.result);
      this.profile = res.data.result;
      // 调用登录成功后的逻辑
      this.loginSuccess();
    },
    // QQ直接登录
    async loginQQUnionId(data: { unionId: string; source: number }) {
      const res = await http<Profile>("POST", "/login/social", data);
      // console.log("POST", "/login/social", res.data.result);
      this.profile = res.data.result;
      // 调用登录成功后的逻辑
      this.loginSuccess();
    },
  },
});

export default useMemberStore;

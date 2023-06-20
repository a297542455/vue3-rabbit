import useStore from "@/store";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

// 指定 RouteRecordRaw[] 类型后，书写的时候就有 TS 的类型提示和检查了
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/Layout/index.vue"),
    children: [
      { path: "/", component: () => import("@/views/Home/index.vue") },
      {
        path: "/category/:id",
        component: () => import("@/views/Category/index.vue"),
      },
      {
        path: "/goods/:id",
        component: () => import("@/views/Goods/index.vue"),
      },
      {
        path: "/cart",
        component: () => import("@/views/Cart/index.vue"),
      },
      {
        path: "/checkout",
        component: () => import("@/views/Checkout/index.vue"),
      },
      {
        path: "/pay",
        component: () => import("@/views/Pay/index.vue"),
      },
      {
        path: "/pay/callback",
        component: () => import("@/views/Pay/callback.vue"),
      },
      {
        path: "/member",
        component: () => import("@/views/Member/Layout/index.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/Member/Home/index.vue"),
          },
          {
            path: "order",
            component: () => import("@/views/Member/Order/index.vue"),
          },
        ],
      },
    ],
  },
  { path: "/login", component: () => import("@/views/Login/index.vue") },
  {
    path: "/login/callback",
    component: () => import("@/views/Login/callback.vue"),
  },
  { path: "/test", component: () => import("@/views/Test/index.vue") },
];

// 创建路由实例
const router = createRouter({
  // 创建 hash 路由模式
  history: createWebHashHistory(),
  // 路由规则
  routes,
  // VueRouter@4官网 - 进阶 - 滚动行为
  scrollBehavior: () => {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

// 📌需求：已登录的用户才允许访问个人中心。
// （未登录怎么？跳转到登录页并携带回跳地址）
// 导航守卫 - 全局前置守卫
// VueRouter4升级: return 取代了以前的 next() 放行函数
// return true 或 undefined(没写return) 都默认放行
router.beforeEach((to) => {
  const { member } = useStore();
  // 进行判断：未登录情况但是访问 /member 开头的路径，需要跳转登录页
  if (!member.isLogin && to.path.startsWith("/member")) {
    return `/login?target=${to.fullPath}`;
  }
});

export default router;

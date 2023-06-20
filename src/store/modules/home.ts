import { defineStore } from "pinia";
import { http } from "@/utils/request";
import type { BannerList, CategoryList, GoodsItem } from "@/types";

// 定义 Store 时建议遵循命名规范 useXxxStore
const useHomeStore = defineStore({
  // 唯一标识
  id: "home",
  // 持久化插件 - 默认存所有模块数据
  // persist: true,
  // 持久化插件 - 进阶用法
  persist: {
    // 修改存储时的键名称
    key: "rabbit-shop-home",
    // 按需存储分类数据
    paths: ["categoryList"],
  },
  // 状态
  state: () => {
    return {
      money: 15000,
      // 所有分类数据
      categoryList: [] as CategoryList,
      // 轮播图数据
      bannerList: [] as BannerList,
      // 新鲜好物数据
      // 如果 TS 项目某些变量改名重构了
      // 需通过命令 yarn typecheck 主动调用TS检查，提前发现错误
      newGoodsList: [] as GoodsItem[],
    };
  },
  // 函数/方法
  actions: {
    // 获取所有分类数据
    async getAllCategory() {
      // const res = await request.get<ApiRes<CategoryList>>("/home/category/head");
      const res = await http<CategoryList>("GET", "/home/category/head");
      // 🎉恭喜已经有类型提醒了
      // console.log(res.data.result);
      // 左右类型一致了
      this.categoryList = res.data.result;
    },
    // 获取轮播图数据
    async getBannerList() {
      const res = await http<BannerList>("GET", "/home/banner");
      // console.log(res.data.result);
      this.bannerList = res.data.result;
    },
    // 获取新鲜好物数据
    async getNewGoodsList() {
      const res = await http<GoodsItem[]>("GET", "/home/new");
      // console.log("/home/new", res.data.result);
      this.newGoodsList = res.data.result;
    },
  },
});

// 默认导出
export default useHomeStore;

import { message } from "@/components/XtxUI";
import useStore from "@/store";
import axios, { type Method } from "axios";

// 🚨 支付宝支付需要跳转到 devtest 这台服务器
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
// export const baseURL = "http://pcapi-xiaotuxian-front.itheima.net/";

// 创建 axios 实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: 50000,
});

// 官方说明：https://pinia.vuejs.org/core-concepts/outside-component-usage.html
// ❌ 非组件中，常见错误写法
// const { member } = useStore();

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // ✅ 非组件中，在消费前获取 Store
    const { member } = useStore();
    // 1. 获取token
    const { token } = member.profile;
    // 2. 如果有 token 同时 headers 非空
    if (token && config.headers) {
      // 3. 请求头中携带 token 信息
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 如果请求成功成功 2xx 就直接返回 data 中的数据
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if (!error.response) {
      // 网络错误，response 没有信息
      message({ type: "error", text: "网络错误，请换个网络环境" });
    } else {
      // 对响应错误做点什么 400 401 404 500 ...
      // 通用错误，通用提示
      message({ type: "error", text: error.response.data.message });
    }
    return Promise.reject(error);
  }
);

// 后端返回的接口数据格式
export interface ResponseData<T> {
  data: {
    code: string;
    msg: string;
    result: T;
  };
}

/**
 * axios 二次封装
 * @param {String} url  请求地址
 * @param {String} method  请求类型
 * @param {Object} submitData  对象类型，提交数据
 */
export const http = <T>(method: Method, url: string, submitData?: unknown) => {
  return instance.request<T, ResponseData<T>>({
    url,
    method,
    // 🔔 自动设置合适的 params/data 键名称，如果 method 为 get 用 params 传请求参数，否则用 data
    [method.toUpperCase() === "GET" ? "params" : "data"]: submitData,
  });
};

export default instance;

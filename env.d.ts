/// <reference types="vite/client" />

// QC 类型声明 - QQ 登录模块
declare namespace QC {
  // QC.api("get_user_info").success((res: unknown) => {
  //   console.log("获取QQ用户资料", res);
  // });
  function api(s: string): {
    success: (res: unknown) => void;
  };
  const Login: {
    // QC.Login.check()
    check: () => boolean;
    // QC.Login.getMe((openId) => {
    //   console.log("获取QQ用户openId", openId);
    // });
    getMe: (callback: (openId: string) => void) => void;
  };
}

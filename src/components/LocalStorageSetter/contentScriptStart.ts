import { WssConfig } from "@/constants";

(() => {
  const WSS_CONFIG = "WSS_CONFIG";
  const startInit = () => {
    const wssConfigObj = window.localStorage.getItem(WSS_CONFIG) || "{}";

    // 用来获取 user.type 绕过环境变化的提示 不然在项目级每次切换都会触发弹窗
    const currentUser = window.localStorage.getItem("currentUser") || "{}";
    const currentUserObj = JSON.parse(currentUser);
    const { skipPmsLogin } = JSON.parse(wssConfigObj) as WssConfig;
    if (!skipPmsLogin) return;
    let __PMS_CONSOLE__TEMP__: any;

    Object.defineProperty(window, "__PMS_CONSOLE__", {
      get: function () {
        return __PMS_CONSOLE__TEMP__;
      },
      set: function (newVal) {
        if (newVal?.user?.login) {
          newVal.user.login = () => {};
          newVal.user.type = currentUserObj.type;
          // console.log("跳过登录设置成功-----------");
        }
        __PMS_CONSOLE__TEMP__ = newVal;
      },
    });
  };
  startInit();
})();

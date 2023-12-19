import { WssConfig } from "@/constants";

(() => {
  // @ts-ignore 没有 __PMS_CONSOLE__ 就直接返回
  if (!window?.__PMS_CONSOLE__) return;
  const WSS_CONFIG = "WSS_CONFIG";

  const endInit = () => {
    const wssConfigObj = window.localStorage.getItem(WSS_CONFIG) || "{}";
    const { fixPmsRootStyle } = JSON.parse(wssConfigObj) as WssConfig;
    // @ts-ignore
    if (fixPmsRootStyle) {
      // @ts-ignore
      document.getElementById("root-slave").style.display = "block";
      console.log("root-salve样式修复成功--------");
    }
  };
  endInit();
})();

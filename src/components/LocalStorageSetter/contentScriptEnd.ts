import { WssConfig } from "@/constants";

(() => {
  const WSS_CONFIG = "WSS_CONFIG";

  const endInit = () => {
    const wssConfigObj = window.localStorage.getItem(WSS_CONFIG) || "{}";
    const { fixPmsRootStyle } = JSON.parse(wssConfigObj) as WssConfig;
    // @ts-ignore
    if (window.__PMS_CONSOLE__ && fixPmsRootStyle) {
      // @ts-ignore
      document.getElementById("root-slave").style.display = "block";
      console.log("root-salve样式修复成功--------");
    }
  };
  endInit();
})();

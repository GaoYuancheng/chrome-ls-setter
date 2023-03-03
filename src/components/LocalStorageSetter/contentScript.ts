import { sendMessage } from "../../utils";

// console.log("contentJs");
// sendMessage({ type: "getLocalStorage" }, (res) => {
//   console.log("recir", res);
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("onMessage", message, message.type === "getLocalStorage");
  const { type, payload } = message;
  if (type === "getLocalStorage") {
    // 获取到localStorage
    sendResponse({ res: window.localStorage });
  }
  if (type === "setLocalStorage") {
    Object.keys(payload).forEach((key) => {
      window.localStorage.setItem(key, payload[key]);
    });
  }
});

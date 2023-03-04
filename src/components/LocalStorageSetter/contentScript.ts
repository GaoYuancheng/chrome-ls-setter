// console.log("contentJs");
// sendMessage({ type: "getLocalStorage" }, (res) => {
//   console.log("recir", res);
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("onMessage", message);
  const { type, payload } = message;

  // 获取到localStorage
  if (type === "getLocalStorage") {
    sendResponse({ data: window.localStorage });
  }

  // 设置 localStorage
  if (type === "setLocalStorage") {
    Object.keys(payload).forEach((key) => {
      window.localStorage.setItem(key, payload[key]);
    });
    sendResponse({ success: true });
  }

  // 清空 localStorage
  if (type === "clearLocalStorage") {
    window.localStorage.clear();
    sendResponse({ success: true });
  }
});

// 格式化cookies
export const formatCookieToString = (cookies: any[]) => {
  let cookieString = "";
  cookies.forEach((item) => {
    const { name, value } = item;
    cookieString += `${name}=${value};`;
  });
  return cookieString;
};

// 复制指定内容
export const copyToClipboard = (content: string) => {
  let copy = (e: any) => {
    e.preventDefault();
    e.clipboardData.setData("text/plain", content);
    document.removeEventListener("copy", copy);
  };
  document.addEventListener("copy", copy);
  document.execCommand("Copy");
};

// 获取当前tab
export const getCurrentTab = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

// 发送信息
export const sendMessage = async (message: { type: string; payload?: any }) => {
  const currentTab = await getCurrentTab();
  if (!currentTab?.id) return;
  return await chrome.tabs.sendMessage(currentTab?.id, message);
};

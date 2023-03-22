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
  const copy = (e: any) => {
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

// 获取筛选obj中有的key
export const getKeysInObj = (
  obj: Record<string, string>,
  keys: string[]
): string[] => {
  const res: string[] = [];
  keys.forEach((key) => {
    if (obj[key]) res.push(key);
  });
  return res;
};

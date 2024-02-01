export const request = async (
  url: RequestInfo | URL,
  options?: RequestInit
) => {
  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      //错误处理
    });
};

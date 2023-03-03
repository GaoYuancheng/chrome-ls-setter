import {
  Button,
  Card,
  Dropdown,
  Input,
  Menu,
  message,
  Select,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./app.module.less";
import {
  URL_LIST,
  DEFAULT_URL_VALUE,
  QUERY_LIST,
  LOCAL_COOKIE_KEYS,
} from "./constant";
import { formatCookieToString, copyToClipboard } from "./utils";

// 获取当前域名
const getCurrentTab = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

const DOMAIN_LOCAL_KEY = "TARGET_DOMAIN"; // 存储在 storage 的 key

const App: React.FC = () => {
  const [urlValue, setUrlValue] = useState(DEFAULT_URL_VALUE);
  const [domainValue, setDomainValue] = useState("");

  // 复制cookie数组
  const copyCookie = async () => {
    const cookies = await chrome.cookies
      .getAll({
        url: urlValue,
      })
      .catch((err: any) => {
        console.log("err", err);
        message.error(err);
      });
    if (!cookies) return;
    const cookieString = formatCookieToString(cookies);
    copyToClipboard(cookieString);
    message.success("复制成功");
  };

  // 设置
  const setCookie = async () => {
    const cookies = await chrome.cookies
      .getAll({
        url: urlValue,
      })
      .catch((err: any) => {
        console.log("err", err);
        message.error(err);
      });

    cookies?.forEach((item: any) => {
      const { name, value } = item;
      if (LOCAL_COOKIE_KEYS.includes(name)) {
        chrome.cookies.set({
          url: "http://localhost",
          name,
          value,
        });
      }
    });
    message.success("设置成功");
  };

  // 地址栏上面增加query
  const addQuery = async (query: string) => {
    const [key, value] = query.split("=");
    const { url, id } = await getCurrentTab();

    if (!url || !id) return;
    const a = document.createElement("a");
    a.href = url;

    const urlParams = new URLSearchParams(a.search);

    if (urlParams.has(key)) {
      urlParams.set(key, value);
    } else {
      urlParams.append(key, value);
    }

    a.search = `?${urlParams}`;

    chrome.tabs.update(id, {
      url: a.href,
    });
  };

  // 打开new tab
  const openNewTab = () => {
    chrome.tabs.create({
      active: false,
      url: urlValue,
    });
  };

  const replaceDomain = async () => {
    const tab = await getCurrentTab();
    const { url, index } = tab;
    if (!url) return;
    const curDomain = new URL(url).origin;
    const newUrl = url.replace(curDomain, domainValue);
    chrome.storage.local.set({ [DOMAIN_LOCAL_KEY]: domainValue });
    chrome.tabs.create(
      {
        active: true,
        url: newUrl,
        index: index + 1,
      },
      () => {
        // 保存到 storage
        chrome.storage.local.set({ [DOMAIN_LOCAL_KEY]: domainValue });
      }
    );
  };

  // 填入当前 useCurUrl
  // const useCurUrl = () => {
  //   getCurrentTab().then((tab) => {
  //     setUrlValue(tab?.url);
  //   });
  // };

  const init = () => {
    chrome.storage.local.get([DOMAIN_LOCAL_KEY], (result: any) => {
      setDomainValue(result[DOMAIN_LOCAL_KEY]);
    });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Card size="small" title="cookie操作" className={styles.app}>
      <>
        <div className={styles.urlFormItem}>
          <Select
            placeholder="请选择或者输入地址"
            value={urlValue}
            onChange={setUrlValue}
            listHeight={170}
            className={styles.autoComplete}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {URL_LIST.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          {/* <div className={styles.useCurButton}>
          <Button size="small" onClick={useCurUrl}>
            填入当前地址
          </Button>
        </div> */}
        </div>

        <div className={styles.urlActionBtn}>
          <Tooltip
            title="如果cookie失效，建议先检查自己对应环境的登录状态"
            placement="topLeft"
          >
            <Button type="primary" size="small" onClick={copyCookie}>
              复制cookie
            </Button>
          </Tooltip>
          <Button size="small" onClick={setCookie}>
            设置到localhost
          </Button>
          <Button size="small" onClick={openNewTab}>
            打开到新tab
          </Button>
        </div>
        <div className={styles.domainFormItem}>
          <Input
            className={styles.domainInput}
            placeholder="请输入替换的域名,如 localhost:3001"
            value={domainValue}
            onChange={(e) => setDomainValue(e.target.value)}
          />
          <div className={styles.domainActionBtn}>
            <Dropdown
              overlay={
                <Menu>
                  {QUERY_LIST.map((query) => (
                    <Menu.Item key={query}>
                      <a onClick={() => addQuery(query)}>{query}</a>
                    </Menu.Item>
                  ))}
                </Menu>
              }
              placement="bottomLeft"
              arrow
            >
              <Button type="primary" size="small">
                添加query
              </Button>
            </Dropdown>
            <Button type="primary" onClick={replaceDomain} size="small">
              切换domain
            </Button>
          </div>
        </div>
      </>
    </Card>
  );
};

export default App;

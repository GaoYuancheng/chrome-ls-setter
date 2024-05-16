import React, { useEffect } from "react";
import { Tabs, Tooltip } from "antd";
import LocalStorageSetter from "./components/LocalStorageSetter";
import CookieSetter from "./components/CookieSetter";
import Styles from "./index.module.less";
import UserInfo from "./components/UserInfo";
import { GlobalContextProvider } from "@/models/useGlobalContext";
import VersionInfo from "./components/VersionInfo";
import ReactDOM from "react-dom";
import { ExclamationCircleOutlined, SettingOutlined } from "@ant-design/icons";

const tabList = [
  {
    label: `LocalStorage`,
    key: "LocalStorage",
    children: <LocalStorageSetter />,
  },
  {
    label: `Cookie`,
    key: "Cookie",
    children: <CookieSetter />,
  },
];

const DefaultPopup: React.FC = () => {
  const tabBarExtraContent = (
    <div className={Styles.tabBarExtraContent}>
      <Tooltip title={`所在目录：${__DIRNAME}`}>
        <ExclamationCircleOutlined />
      </Tooltip>
      <Tooltip title="设置">
        <SettingOutlined
          onClick={() => {
            // 打开设置页
            chrome.runtime.openOptionsPage();
          }}
        />
      </Tooltip>
    </div>
  );

  return (
    <GlobalContextProvider>
      <div className={Styles.chromeStorageChanger}>
        {/* <VersionInfo /> */}
        <UserInfo className={Styles.userInfo} />
        <Tabs
          size="small"
          defaultActiveKey="LocalStorage"
          items={tabList}
          tabBarExtraContent={tabBarExtraContent}
        />
      </div>
    </GlobalContextProvider>
  );
};

ReactDOM.render(<DefaultPopup />, document.getElementById("root"));

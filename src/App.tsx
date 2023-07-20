import React, { useEffect } from "react";
import { Tabs } from "antd";
import LocalStorageSetter from "./components/LocalStorageSetter";
import CookieSetter from "./components/CookieSetter";
import "./index.less";
import Styles from "./index.module.less";
import UserInfo from "./components/UserInfo";
import { GlobalContextProvider } from "@/models/useGlobalContext";

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

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <div className={Styles.chromeStorageChanger}>
        <UserInfo className={Styles.userInfo} />
        <Tabs size="small" defaultActiveKey="LocalStorage" items={tabList} />
      </div>
    </GlobalContextProvider>
  );
};

export default App;

import React, { useEffect } from "react";
import { Tabs } from "antd";
import LocalStorageSetter from "./components/LocalStorageSetter";
import CookieSetter from "./components/CookieSetter";
import Styles from "./index.module.less";
import UserInfo from "./components/UserInfo";
import { GlobalContextProvider } from "@/models/useGlobalContext";
import VersionInfo from "./components/VersionInfo";
import ReactDOM from "react-dom";

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
        {/* <VersionInfo /> */}
        <UserInfo className={Styles.userInfo} />
        <Tabs size="small" defaultActiveKey="LocalStorage" items={tabList} />
      </div>
    </GlobalContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

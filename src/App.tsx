import React from "react";

import { Tabs } from "antd";
import LocalStorageSetter from "./components/LocalStorageSetter";
import CookieSetter from "./components/CookieSetter";
import "./index.less";
import styles from "./index.module.less";

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
    <div className={styles.chromeStorageChanger}>
      <Tabs size="small" defaultActiveKey="LocalStorage" items={tabList} />
    </div>
  );
};

export default App;

import React from "react";

import { Tabs } from "antd";
import LocalStorageSetter from "./components/LocalStorageSetter";
import CookieSetter from "./components/CookieSetter";

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
  return <Tabs defaultActiveKey="LocalStorage" items={tabList} />;
};

export default App;

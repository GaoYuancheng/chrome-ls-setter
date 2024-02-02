import { Button, Tabs } from "antd";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Styles from "./index.module.less";
import LSOptions from "./components/LSOptions";
import CookieOptions from "./components/CookieOptions";
import CommonOptions from "./components/CommonOptions";

const tabsList = [
  {
    key: "common",
    label: "公共设置",
    children: <CommonOptions />,
  },
  {
    key: "LS",
    label: "LocalStorage 设置",
    children: <LSOptions />,
  },
  {
    key: "cookie",
    label: "Cookie 设置",
    children: <CookieOptions />,
  },
];

const OptionsPage = () => {
  const init = async () => {
    console.log(chrome.storage);
  };

  useEffect(() => {
    init();
  }, []);

  // 保存
  const saveConfig = () => {
    console.log("saveConfig");
  };

  return (
    <div className={Styles.optionsPage}>
      <Tabs
        className={Styles.optionsTabs}
        tabPosition="left"
        items={tabsList}
      />
      <div className={Styles.confirmButton}>
        <Button type="primary" onClick={saveConfig}>
          保存
        </Button>
      </div>
    </div>
  );
};

ReactDOM.render(<OptionsPage />, document.getElementById("root"));

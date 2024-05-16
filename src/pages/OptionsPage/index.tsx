import { Button, Tabs } from "antd";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Styles from "./index.module.less";
import LSOptions from "./components/LSOptions";
import CookieOptions from "./components/CookieOptions";
import CommonOptions from "./components/CommonOptions";
import OptionsFormWrapper, { Options } from "./components/OptionsForm";
import { CHROME_STORAGE_OPTION_KEY } from "./_data";

const commonOptions: Options[] = [
  {
    label: "默认全选",
    name: "defaultSelectAll",
    type: "checkbox",
    formItemProps: {
      valuePropName: "checked",
    },
  },
];

const tabsList = [
  {
    key: "common",
    label: "公共设置",
    children: <CommonOptions />,
  },
  {
    key: "LS",
    label: "LocalStorage 设置",
    children: (
      <OptionsFormWrapper options={commonOptions} optionKey="localStorage" />
    ),
  },
  {
    key: "cookie",
    label: "Cookie 设置",
    children: <CookieOptions />,
  },
];

const OptionsPage = () => {
  const init = async () => {
    chrome.storage.local.get(CHROME_STORAGE_OPTION_KEY).then(console.log);
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
      {/* <div className={Styles.confirmButton}>
        <Button type="primary" onClick={saveConfig}>
          保存
        </Button>
      </div> */}
      <div style={{ position: "absolute", right: 0 }}>
        <pre>
          {JSON.stringify(
            chrome.storage.local.get(CHROME_STORAGE_OPTION_KEY),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};

ReactDOM.render(<OptionsPage />, document.getElementById("root"));

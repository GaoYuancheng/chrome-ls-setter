import { Tabs } from "antd";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Styles from "./index.module.less";

const OptionsPage = () => {
  const init = async () => {
    console.log(chrome.storage);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={Styles.optionsPage}>
      {/* <Tabs
        tabPosition="left"
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      /> */}
    </div>
  );
};

ReactDOM.render(<OptionsPage />, document.getElementById("root"));

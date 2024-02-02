import { Button, Select } from "antd";
import React from "react";
import Styles from "./index.module.less";

interface Props {}

const LSOptions: React.FC<Props> = () => {
  return (
    <div className={Styles.LSOptions}>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Tags Mode"
        // onChange={handleChange}
        // options={options}
      />
    </div>
  );
};

export default LSOptions;

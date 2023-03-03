import { Button, Col, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { sendMessage } from "../../utils";
import styles from "./index.module.less";

const DEFAULT_DOMAIN = "https://localhost:8085";

const LocalStorageSetter = () => {
  // 使用ref的话后续不好对 input 的value进行控制
  const [domainValue, setDomainValue] = useState(DEFAULT_DOMAIN);
  const [curLS, setCurLS] = useState({});
  const [selectLSKeys, setSelectLSKeys] = useState([]);

  const init = async () => {
    const res = await sendMessage({ type: "getLocalStorage", query });
    setCurLS(res);
  };

  const getLocalStorage = () => {
    // chrome.runtime.sendMessage({ type: "getLocalStorage" }, (res) => {
    //   console.log("recir", res);
    // });
  };

  useEffect(() => {
    // message.error("sss");
    init();
  }, []);

  return (
    <div className={styles.localStorageSetter}>
      <div>复制选中的localStorage到此域名下</div>
      <Button
        onClick={() => {
          getLocalStorage();
        }}
      >
        sendMessage
      </Button>
      <Row>
        <Col span={16}>
          <Input
            placeholder="目标域名"
            value={domainValue}
            onChange={(e) => {
              setDomainValue(e.target.value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default LocalStorageSetter;

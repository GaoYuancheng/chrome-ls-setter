import { Button, Checkbox, Col, Input, message, Radio, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getCurrentTab } from "../../utils";
import styles from "./index.module.less";
import dayjs from "dayjs";

interface DomianListItem {
  updateTime?: number;
  domain: string;
  value: Record<string, any>;
}

const TIME_FORMAT = "MM-DD HH:mm:ss";
const DEFAULT_SELECT_KEYS = ["refreshToken", "accessToken", "site3-f-ue"];
const CHROME_STORAGE_KEY = "CHROME_STORAGE_LOCATSTORAGE";
const DOMAIN_NUM_LIMIT = 3;

const LocalStorageSetter = () => {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState<number>(0);
  const [selectLSKeys, setSelectLSKeys] = useState<string[]>([]);
  const [domainList, setDomainList] = useState<DomianListItem[]>([]);

  const { value: curLS = {} } = domainList[selectedDomainIndex] || {};

  const localStorageKeysList = Object.keys(curLS).sort(
    (a: any, b: any) => a - b
  );

  const indeterminate =
    !!selectLSKeys.length && selectLSKeys.length < localStorageKeysList.length;
  const checkAll = selectLSKeys.length === localStorageKeysList.length;

  const init = async () => {
    const data = (await chrome.storage.local.get(CHROME_STORAGE_KEY)) || {};
    const { [CHROME_STORAGE_KEY]: domainListFromStorage = [] } = data || {};
    console.log("init", data);
    const defaultKeys: string[] = [];
    const lastIndex =
      domainListFromStorage.length > 0 ? domainListFromStorage.length - 1 : 0;
    const { value = {} } = domainListFromStorage[lastIndex] || {};
    Object.keys(value).forEach((key) => {
      if (DEFAULT_SELECT_KEYS.includes(key)) {
        defaultKeys.push(key);
      }
    });
    setSelectLSKeys(defaultKeys);
    setDomainList([...domainListFromStorage]);
    setSelectedDomainIndex(lastIndex);
  };

  const getValueFromObj = (keys: string[]) => {
    const res: Record<string, any> = {};
    keys.forEach((key) => {
      res[key] = curLS[key];
    });
    return res;
  };

  // 清空当前 localStorage
  const clearCurrentLS = async () => {
    const tab = await getCurrentTab();
    if (!tab?.id) return;
    await chrome.tabs.sendMessage(tab.id, {
      type: "clearLocalStorage",
    });
    message.success("操作成功");
  };

  // 更新 chromeStorage
  const updateChromeStorage = async (data: DomianListItem) => {
    console.log("updateChromeStorage", data);
    const { [CHROME_STORAGE_KEY]: domainListFromStorage = [] } =
      (await chrome.storage.local.get(CHROME_STORAGE_KEY)) || {};
    const newDomainList = [...domainListFromStorage];
    newDomainList.push(data);
    if (newDomainList.length > DOMAIN_NUM_LIMIT) {
      newDomainList.shift();
    }
    await chrome.storage.local.set({
      [CHROME_STORAGE_KEY]: newDomainList,
    });
  };

  // 设置当前 localStorage 到 storage
  const setCurrentLSToStorage = async () => {
    // 获取当前tab信息
    const tab = await getCurrentTab();
    if (!tab?.id) return;
    const { data } = await chrome.tabs.sendMessage(tab.id, {
      type: "getLocalStorage",
    });
    await updateChromeStorage({
      updateTime: dayjs().valueOf(),
      domain: tab?.url || "",
      value: data,
    });
    message.success("操作成功");
    init();
    // setCurLS(data);
    // console.log("setCurrentLSToStorage");
  };

  // 设置 选中的域名localStorage 到 当前页面
  const setTargetLSToCurrentTab = async () => {
    try {
      const tab = await getCurrentTab();
      if (!tab?.id) return;
      await chrome.tabs.sendMessage(tab.id, {
        type: "setLocalStorage",
        payload: getValueFromObj(selectLSKeys),
      });
      message.success("操作成功");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.localStorageSetter}>
      <div className={styles.operateBtn}>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            setCurrentLSToStorage();
          }}
        >
          存储
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setTargetLSToCurrentTab();
          }}
          size="small"
        >
          使用
        </Button>
        <Button
          onClick={() => {
            clearCurrentLS();
          }}
          size="small"
        >
          清空
        </Button>

        {/* <Button
          onClick={async () => {
            const data =
              (await chrome.storage.local.get([CHROME_STORAGE_KEY])) || {};
            console.log("getdata", data);
          }}
          size="small"
        >
          获取
        </Button> */}
        {/* <Button
          onClick={() => {
            chrome.storage.local.clear();
          }}
        >
          清空chromeSL
        </Button> */}
      </div>

      <div className={styles.domains}>
        <div className={styles.label}>当前可用存储</div>
        <div className={styles.domainsList}>
          <Radio.Group
            onChange={(e) => {
              setSelectedDomainIndex(e.target.value);
            }}
            value={selectedDomainIndex}
            size="small"
          >
            <Space direction="vertical">
              {domainList.map((item, index) => (
                <Radio value={index} key={item.updateTime}>
                  <div className={styles.domainsItem}>
                    <div className={styles.domian} title={item.domain}>
                      {/* <span className={styles.domainText}>{item.domain}</span> */}
                      {item.domain}
                    </div>
                    <div className={styles.updateTime}>
                      {dayjs(item.updateTime).format(TIME_FORMAT)}
                    </div>
                  </div>
                </Radio>
              ))}

              {/* <Radio value={4}>
            More...
            {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
          </Radio> */}
            </Space>
          </Radio.Group>
        </div>
      </div>
      <div>
        <div>
          <span className={styles.label}>可用key</span>
          {localStorageKeysList.length > 0 && (
            <Checkbox
              indeterminate={indeterminate}
              onChange={(e) => {
                setSelectLSKeys(e.target.checked ? localStorageKeysList : []);
              }}
              checked={checkAll}
            >
              全选
            </Checkbox>
          )}
        </div>
        <div className={styles.checkboxArea}>
          <Checkbox.Group
            value={selectLSKeys}
            onChange={(value) => setSelectLSKeys(value as string[])}
          >
            <Row>
              {localStorageKeysList.map((key) => (
                <Col span={8} key={key}>
                  <Checkbox value={key}>
                    <span className={styles.checkBoxLabel} title={key}>
                      {key}
                    </span>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>
      </div>

      {/* <Row>
        <Col span={16}>
          <Input
            placeholder="目标域名"
            value={domainValue}
            onChange={(e) => {
              setDomainValue(e.target.value);
            }}
          />
        </Col>
      </Row> */}
    </div>
  );
};

export default LocalStorageSetter;

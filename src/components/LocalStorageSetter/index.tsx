import { Button, Checkbox, Col, Input, message, Radio, Row, Space } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import dayjs from "dayjs";
import { DEFAULT_SELECT_KEYS } from "../../constants";
import { QuestionCircleOutlined } from "@ant-design/icons";
import classnames from "classnames";
import {
  getKeysInObj,
  templateForSetLocalStorage,
  getLocalStorageFunc,
  copyToClipboard,
  setLocalStorageFunc,
  clearLocalStorageFunc,
} from "@/utils";
import { GlobalContext } from "@/models/useGlobalContext";

interface DomianListItem {
  updateTime?: number;
  domain: string;
  value: Record<string, any>;
}

const TIME_FORMAT = "MM-DD HH:mm:ss";
const CHROME_STORAGE_KEY = "CHROME_STORAGE_LOCATSTORAGE";
const DOMAIN_NUM_LIMIT = 3;

const LocalStorageSetter = () => {
  const { currentTab, refresh, currentLocalStorage } =
    useContext(GlobalContext);

  const [selectedDomainIndex, setSelectedDomainIndex] = useState<number>(0);
  const [selectLSKeys, setSelectLSKeys] = useState<string[]>([]);
  const [domainList, setDomainList] = useState<DomianListItem[]>([]);

  // const currentTabRef = useRef<chrome.tabs.Tab | undefined>();

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

    // const selectIndex =
    // domainListFromStorage.length > 0 ? domainListFromStorage.length - 1 : 0;

    // 选中第一个
    const selectIndex = 0;
    const { value = {} } = domainListFromStorage[selectIndex] || {};
    const defaultKeys: string[] = getKeysInObj(value, DEFAULT_SELECT_KEYS);

    setSelectLSKeys(defaultKeys);
    setDomainList([...domainListFromStorage]);
    setSelectedDomainIndex(selectIndex);
  };

  const getValueFromObj = (keys: string[], obj: Record<string, any>) => {
    const res: Record<string, any> = {};
    keys.forEach((key) => {
      res[key] = obj[key];
    });
    return res;
  };

  // 清空当前 localStorage
  // const clearCurrentLS = async () => {
  //   if (!currentTab?.id) return;

  //   chrome.scripting.executeScript({
  //     target: { tabId: currentTab.id },
  //     func: clearLocalStorageFunc,
  //   });

  //   message.success("操作成功");
  // };

  // 更新 chromeStorage
  const updateChromeStorage = async (data: DomianListItem) => {
    console.log("updateChromeStorage", data);
    const { [CHROME_STORAGE_KEY]: domainListFromStorage = [] } =
      (await chrome.storage.local.get(CHROME_STORAGE_KEY)) || {};
    const newDomainList = [...domainListFromStorage];
    newDomainList.unshift(data);
    if (newDomainList.length > DOMAIN_NUM_LIMIT) {
      newDomainList.pop();
    }
    await chrome.storage.local.set({
      [CHROME_STORAGE_KEY]: newDomainList,
    });
  };

  // 设置当前 localStorage 到 storage
  const setCurrentLSToStorage = async () => {
    if (!currentTab?.id || !currentLocalStorage) return;

    await updateChromeStorage({
      updateTime: dayjs().valueOf(),
      domain: currentTab?.url || "",
      value: currentLocalStorage,
    });

    message.success("操作成功");
    init();
  };

  // 设置 选中的域名localStorage 到 当前页面
  const setTargetLSToCurrentTab = async () => {
    try {
      if (!currentTab?.id) return;

      await chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: setLocalStorageFunc,
        args: [getValueFromObj(selectLSKeys, curLS)] as any,
      });

      message.success("操作成功");
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const changeDomainIndex = (value: number) => {
    setSelectedDomainIndex(value);
  };

  // set 方法
  const copyForSetLS = async () => {
    if (!currentTab?.id) return;
    const template = templateForSetLocalStorage;

    const resData = getValueFromObj(selectLSKeys, curLS);
    const res = template.replace("$1", JSON.stringify(resData));
    copyToClipboard(res);
    message.success("复制成功");
  };

  useEffect(() => {
    if (!currentTab) return;
    init();
  }, [currentTab]);

  const operateBtnDom = (
    <div className={styles.operateBtn}>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          copyForSetLS();
        }}
      >
        复制 set 方法
      </Button>
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
      {/* <Button
        onClick={() => {
          clearCurrentLS();
        }}
        size="small"
        title="清空当前页面的localStorage"
      >
        清空
      </Button> */}

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
  );

  return (
    <div className={styles.localStorageSetter}>
      <div className={styles.domains}>
        <div
          className={classnames({
            [styles.label]: true,
            [styles.operateLabel]: true,
          })}
        >
          <div className={styles.labelText}>当前可用存储</div>
          <div>{operateBtnDom}</div>
        </div>
        <div className={styles.domainsList}>
          <Radio.Group
            onChange={(e) => {
              changeDomainIndex(e.target.value);
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
          <QuestionCircleOutlined
            className={styles.keySelectTipIcon}
            title={`默认选中 ${DEFAULT_SELECT_KEYS.join(", ")}`}
          />
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

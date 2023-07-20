import React, { useEffect, useContext, useState } from "react";
import Styles from "./index.module.less";
import classnames from "classnames";
import { GlobalContext } from "@/models/useGlobalContext";
import { getLocalStorageFunc } from "@/utils";
import { Tooltip } from "antd";

interface Props {
  className?: string;
}

interface InfoItem {
  label: string;
  key: string;
  className?: string;
  toolTip?: boolean;
}
const typeMap: Record<
  string,
  {
    label: string;
    infoList?: InfoItem[];
  }
> = {
  1: {
    label: "企业级",
    infoList: [
      {
        label: "coName",
        key: "coName",
        toolTip: true,
      },
      {
        label: "coId",
        key: "coId",
      },
    ],
  },
  2: {
    label: "项目级",
    infoList: [
      {
        label: "pjName",
        key: "pjName",
        toolTip: true,
      },
      {
        label: "pjId",
        key: "pjId",
      },
    ],
  },
  3: {
    label: "子公司级",
    infoList: [
      {
        label: "subCoName",
        key: "subCoName",
        toolTip: true,
      },
      {
        label: "currentDepartmentId",
        key: "currentDepartmentId",
      },
    ],
  },
  4: {
    label: "个人",
  },
  5: {
    label: "obs",
  },
};

const UserInfo: React.FC<Props> = ({ className = "", ...rest }) => {
  const { currentTab } = useContext(GlobalContext);
  const [userInfo, setUserInfo] = useState<any>({});

  const getUserInfo = async () => {
    if (!currentTab?.id) {
      return;
    }
    const [
      {
        result: { data },
      },
    ] = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: getLocalStorageFunc,
    });

    const { currentUser = "{}" } = data;
    setUserInfo(JSON.parse(currentUser));
  };

  const infoItemRender = (item: InfoItem) => {
    const childDom = (
      <div className={Styles.infoItem}>
        {item.label}: {userInfo[item.key]}
      </div>
    );
    if (item?.toolTip)
      return (
        <Tooltip title={userInfo[item.key]} key={item.key}>
          {childDom}
        </Tooltip>
      );

    return childDom;
  };

  useEffect(() => {
    // const
    // 状态管理 加一个当前tab的状态管理
    if (!currentTab) {
      return;
    }
    getUserInfo();
  }, [currentTab]);

  const { type } = userInfo || {};
  const targetTypeInfo = typeMap[type as keyof typeof typeMap] || {};

  return (
    <div className={classnames(Styles.userInfo, className)} {...rest}>
      <Tooltip title={userInfo?.userName}>
        <div className={Styles.infoItem}>用户名: {userInfo?.userName}</div>
      </Tooltip>
      <div className={Styles.infoItem}>层级: {targetTypeInfo?.label}</div>
      {(targetTypeInfo?.infoList || []).map(infoItemRender)}
    </div>
  );
};

export default UserInfo;

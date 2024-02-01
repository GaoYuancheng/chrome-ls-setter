import React, { CSSProperties } from "react";
import Styles from "./index.module.less";
import classNames from "classnames";

const typeMap: Record<
  string,
  {
    label: string;
    infoList?: InfoItem[];
  }
> = {
  1: {
    label: "企",
    infoList: [
      {
        label: "coName",
        key: "coName",
        classNames: [Styles.coPjSubName],
      },
      {
        label: "coId",
        key: "coId",
        classNames: [Styles.coPjSubId],
      },
    ],
  },
  2: {
    label: "项",
    infoList: [
      {
        label: "pjName",
        key: "pjName",
        classNames: [Styles.coPjSubName],
      },
      {
        label: "pjId",
        key: "pjId",
        classNames: [Styles.coPjSubId],
      },
    ],
  },
  3: {
    label: "子",
    infoList: [
      {
        label: "subCoName",
        key: "subCoName",
        classNames: [Styles.coPjSubName],
      },
      {
        label: "currentDepartmentId",
        key: "currentDepartmentId",
        classNames: [Styles.coPjSubId],
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

interface InfoItem {
  label: string;
  key: string;
  classNames?: string[];
  // toolTip?: boolean;
  style?: CSSProperties;
}

interface Props {
  userInfo?: any;
}

const UserInfoLine: React.FC<Props> = ({ userInfo }) => {
  if (!userInfo) {
    return null;
  }
  const resUserInfo = JSON.parse(userInfo);

  const { type } = resUserInfo || {};
  const targetTypeInfo = typeMap[type as keyof typeof typeMap] || {};

  return (
    <div className={Styles.userInfoLine}>
      <div className={classNames(Styles.infoItem, Styles.userName)}>
        {resUserInfo?.userName}
      </div>
      {/* 层级展示已经不重要了  因为可能被切换组织 */}
      {/* <div className={classNames(Styles.infoItem, Styles.userLevel)}>
        {targetTypeInfo?.label}
      </div> */}
      {(targetTypeInfo?.infoList || []).map((item) => (
        <div
          className={classNames(Styles.infoItem, item.classNames)}
          style={item.style}
        >
          {resUserInfo[item.key]}
        </div>
      ))}
    </div>
  );
};

export default UserInfoLine;

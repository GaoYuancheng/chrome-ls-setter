import React, { useEffect, useState } from "react";
import { request } from "@/utils/request";
import packageJson from "../../../package.json";
import { Alert } from "antd";

interface Props {}

const VersionInfo: React.FC<Props> = () => {
  const [version, setVersion] = useState("");

  const isLatestVersion = version === packageJson.version;

  const onClick = async () => {};

  const getLatestVersion = async () => {
    const { data } = await request(
      // 先写死 如果在 vite中用全局变量的形式 那每次打包都会变
      "http://172.16.10.244:3344/getLatestVersion"
    );
    setVersion(data.version);
  };

  useEffect(() => {
    getLatestVersion();
  }, []);

  // 如果服务没有启动 || 已经是最新版本 || 还未到过期时间
  if (!version || isLatestVersion) return null;

  return (
    <Alert
      onClick={() => {
        onClick();
      }}
      onClose={() => {
        // close 时候设置到 chrome缓存中 下次进来的时候读取
      }}
    >
      当前版本：{packageJson.version}, 最新版本：{version}
    </Alert>
  );
};

export default VersionInfo;

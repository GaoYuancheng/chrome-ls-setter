import React, { useEffect } from "react";

const CookieSetter = () => {
  useEffect(() => {
    console.log("cookie useEffect");
  }, []);
  return <div>敬请期待！</div>;
};

export default CookieSetter;

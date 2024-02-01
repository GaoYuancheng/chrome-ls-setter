import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const init = async () => {
    console.log(chrome.storage);
  };

  useEffect(() => {
    init();
  }, []);

  return <div></div>;
};

ReactDOM.render(<Options />, document.getElementById("root"));

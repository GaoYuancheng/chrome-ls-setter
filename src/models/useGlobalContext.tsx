import React, { useContext, createContext, useState, useEffect } from "react";
import { getCurrentTab, getLocalStorageFunc } from "@/utils";

interface Store {
  currentTab?: chrome.tabs.Tab;
  currentLocalStorage?: Window["localStorage"] & {
    WSS_CONFIG?: string;
  };
}

interface ContextValue extends Store {
  setStore?: React.Dispatch<React.SetStateAction<Store>>;
  refresh: () => void;
}

const GlobalContext = createContext<ContextValue>({
  refresh: () => null,
  setStore: () => null,
  currentLocalStorage: undefined,
});

const GlobalContextProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<Store>({});

  // 获取当前tab的localStorage]
  // TODO: 后续考虑是否拆分到 localStorage组件中
  const getLocal = async (currentTab: Store["currentTab"]) => {
    if (!currentTab?.id) return;
    const [
      {
        result: { data },
      },
    ] = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: getLocalStorageFunc,
    });

    return data;
  };

  const init = async () => {
    const tab = await getCurrentTab();
    const data = await getLocal(tab);
    setStore({ currentTab: tab, currentLocalStorage: data });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...store,
        setStore,
        // TODO: 有时候只需要更新一个变量
        refresh: init,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };

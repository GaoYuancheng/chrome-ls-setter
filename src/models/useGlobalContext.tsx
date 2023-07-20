import React, { useContext, createContext, useState, useEffect } from "react";
import { getCurrentTab } from "@/utils";

interface Store {
  currentTab?: chrome.tabs.Tab;
}

interface ContextValue extends Store {
  setStore?: React.Dispatch<React.SetStateAction<Store>>;
  refresh: () => void;
}

const GlobalContext = createContext<ContextValue>({
  refresh: () => null,
  setStore: () => null,
});

const GlobalContextProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<Store>({});

  const init = async () => {
    const tab = await getCurrentTab();
    setStore({ currentTab: tab });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...store, setStore, refresh: init }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };

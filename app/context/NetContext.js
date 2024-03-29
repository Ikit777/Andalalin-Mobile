import React, { createContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const NetContext = createContext();

export function NetProvider({ children }) {
  const [isInternetAvailable, setIsInternetAvailable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetAvailable(state.isInternetReachable);
    });
  
    NetInfo.fetch().then((state) => {
      setIsInternetAvailable(state.isInternetReachable);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <NetContext.Provider value={isInternetAvailable}>
      {children}
    </NetContext.Provider>
  );
}

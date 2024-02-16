import React, { createContext, useContext, useEffect, useState } from "react";
import { health } from "../api/user";
import { NetContext } from "./NetContext";
import Constants from "expo-constants";

export const CheckContext = createContext();

export function CheckProvider({ children }) {
  const net = useContext(NetContext);
  const [isServerOk, setIsServerOk] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    checkServer();
    // checkVersion();

    const intervalId = setInterval(async () => {
      checkServer();
      // checkVersion();
    }, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const checkServer = () => {
    health((response) => {
      if (response == undefined) {
        setIsServerOk(false);
      } else {
        if (response.status === 200) {
          setIsServerOk(true);
        } else {
          setIsServerOk(false);
        }
      }
    });
  };

  const checkVersion = async () => {
    try {
      const res = await fetch(
        process.env.APP_PLAYSTORE ??
          `https://play.google.com/store/apps/details?id=com.andalalin`
      );
      const text = await res.text();
      let latestVersionApp;
      const match = text.match(/\[\[\["([\d.]+?)"\]\]/);
      if (match) {
        latestVersionApp = match[1].trim();
      }

      VersionCheck.needUpdate({
        currentVersion: Constants.expoConfig.version,
        latestVersion: latestVersionApp,
      }).then((res) => {
        setIsUpdate(res.isNeeded);
      });
    } catch (error) {}
  };

  return (
    <CheckContext.Provider value={{ isServerOk, isUpdate }}>
      {children}
    </CheckContext.Provider>
  );
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { health } from "../api/user";
import Constants from "expo-constants";
import { NetContext } from "./NetContext";

export const CheckContext = createContext();

export function CheckProvider({ children }) {
  const net = useContext(NetContext);

  const [isServerOk, setIsServerOk] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (net == true) {
      checkServer();

      // checkVersion();

      const intervalId = setInterval(async () => {
        checkServer();
        // checkVersion();
      }, 5 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (net == true) {
      checkServer();
      // checkVersion();
    }
  }, [net]);

  useEffect(() => {
    if (isServerOk == false && isUpdate == true) {
      setIsServerOk(true);
    }
  }, [isUpdate]);

  const checkServer = () => {
    setTimeout(() => {
      health((response) => {
        if (response == undefined) {
          if (response.code != "ERR_NETWORk") {
            setIsServerOk(false);
          }
        } else {
          switch (response.status) {
            case 200:
              setIsServerOk(true);
              break;
            default:
              setIsServerOk(false);
              break;
          }
        }
      });
    }, 500);
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
    <CheckContext.Provider
      value={{ isServerOk, setIsServerOk, isUpdate, setIsUpdate }}
    >
      {children}
    </CheckContext.Provider>
  );
}

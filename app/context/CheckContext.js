import React, { createContext, useEffect, useState } from "react";
import { health } from "../api/user";
import Constants from "expo-constants";
import { AppState } from "react-native";

export const CheckContext = createContext();

export function CheckProvider({ children }) {
  const [isServerOk, setIsServerOk] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const [appState, setAppState] = useState();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setAppState(nextAppState);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    checkServer();
    // checkVersion();

    const intervalId = setInterval(async () => {
      checkServer();
      // checkVersion();
    }, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [appState]);

  const checkServer = () => {
    if (appState == "active") {
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
    }
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

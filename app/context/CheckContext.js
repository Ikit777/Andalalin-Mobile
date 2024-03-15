import React, { createContext, useContext, useEffect, useState } from "react";
import { health, userMe } from "../api/user";
import Constants from "expo-constants";
import { NetContext } from "./NetContext";
import { UserContext } from "./UserContext";
import { authRefreshToken } from "../api/auth";
import { get } from "../utils/local-storage";

export const CheckContext = createContext();

export function CheckProvider({ children }) {
  const net = useContext(NetContext);
  const context = useContext(UserContext);

  const [isServerOk, setIsServerOk] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      checkServer();
      // checkVersion();
      check_user();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (net == true) {
      checkServer();
      // checkVersion();
      check_user();
    }
  }, [net]);

  const checkServer = () => {
    if (net == true && isUpdate == false) {
      setTimeout(() => {
        health((response) => {
          if (response == undefined) {
            setIsServerOk(true);
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
    }
  };

  const checkVersion = async () => {
    if (net == true) {
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
    }
  };

  const check_user = async () => {
    const value = await get("authState");

    if (value && net == true && isServerOk == true && isUpdate == false) {
      userMe(value.access_token, (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              if (isServerOk != false && isUpdate != true) {
                const result = await response.data;
                if (value.push_token != result.data.push_token) {
                  setIsUser(true);
                } else {
                  setIsUser(false);
                }
              }
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                check_user();
              }
            });
            break;
          default:
            if (isServerOk != false && isUpdate != true) {
              setIsUser(true);
            }
            break;
        }
      });
    }
  };

  return (
    <CheckContext.Provider
      value={{
        isServerOk,
        setIsServerOk,
        isUpdate,
        setIsUpdate,
        isUser,
        setIsUser,
      }}
    >
      {children}
    </CheckContext.Provider>
  );
}

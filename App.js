import { View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NetProvider, NetContext } from "./app/context/NetContext";
import { AFonts } from "./app/constants/font";
import { get } from "./app/utils/local-storage";
import ANoInternetDialog from "./app/component/utility/ANoInternetDialog";
import {
  UserContext,
  UserProvider,
  useMyContext,
} from "./app/context/UserContext";
import Navigator from "./app/navigation/Navigator";
import ASessionEnd from "./app/component/utility/ASessionEnd";
import { navigationRef } from "./app/navigation/RootNavigator";
import ALoading from "./app/component/utility/ALoading";

import * as Updates from "expo-updates";
import AUpdateDialog from "./app/component/utility/AUpdateDialog";
import ADialog from "./app/component/utility/ADialog";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState("user");

  const [update, toggleUpdate] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const [updateSelesai, toggleUpdateSelesai] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  const prepare = async () => {
    try {
      /* Load fonts */
      await Font.loadAsync(AFonts);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      console.warn(err);
    } finally {
      setIsAppReady(true);
    }
  };

  const checkFirstTimeLaunch = async () => {
    const value = await get("authState");
    if (!value) {
      setLogged(false);
    } else {
      setUser(value);
      setLogged(true);
    }
  };

  const checkUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        toggleUpdate(true);
      }
    } catch (error) {
      console.log("Terjadi kesalahan pada saat cek pembaharuan");
    }
  };

  const fetchUpdate = async () => {
    try {
      toggleLoading(true);
      await Updates.fetchUpdateAsync();
      const eventListener = async (event) => {
        if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
          toggleLoading(false);
          toggleUpdateSelesai(true);
        }
      };
      Updates.useUpdateEvents(eventListener);
    } catch (error) {
      console.log("Terjadi kesalahan pada saat cek pembaharuan");
    }
  };

  const reloadApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      console.log("Terjadi kesalahan pada saat reload aplikasi");
    }
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  useEffect(() => {
    prepare();
  }, []);

  useEffect(() => {
    checkFirstTimeLaunch();
  }, []);

  if (!isAppReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AUpdateDialog
        visibleModal={update}
        onPressOKButton={() => {
          toggleUpdate(false);
          fetchUpdate();
        }}
      />
      <ADialog
        title={"Update selesai"}
        desc={"Aplikasi berhasil diperbaharui, silahkan buka kembali aplikasi"}
        visibleModal={updateSelesai}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleUpdateSelesai(false);
          reloadApp();
        }}
      />
      <ALoading visibleModal={loading} />

      <NetProvider>
        <UserProvider>
          <LoadMaster isLogged={isLogged} user={user} />
          <NavigationContainer ref={navigationRef}>
            <NetContext.Consumer>
              {(ctx) => <ANoInternetDialog visibleModal={!ctx} />}
            </NetContext.Consumer>

            <UserContext.Consumer>
              {(value) => <ASessionEnd visibleModal={value.getSession()} />}
            </UserContext.Consumer>

            <UserContext.Consumer>
              {(value) =>
                value.user != "user" ? (
                  <ALoading visibleModal={value.getLoading()} />
                ) : (
                  ""
                )
              }
            </UserContext.Consumer>

            <Navigator isLogged={isLogged} />
          </NavigationContainer>
        </UserProvider>
      </NetProvider>
    </View>
  );
}

function LoadMaster({ isLogged, user }) {
  const { setUser } = useMyContext();

  const checkFirstTimeLaunch = () => {
    if (isLogged) {
      setUser(user);
    }
  };

  useEffect(() => {
    checkFirstTimeLaunch();
  }, []);
}

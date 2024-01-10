import { View, Linking } from "react-native";
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

import AUpdateDialog from "./app/component/utility/AUpdateDialog";
import Constants from "expo-constants";
import ExitApp from "react-native-exit-app";
import VersionCheck from "react-native-version-check";
import { health } from "./app/api/user";
import AServer from "./app/component/utility/AServer";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState("user");

  const [update, toggleUpdate] = useState(false);

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
      console.log(err);
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
        toggleUpdate(res.isNeeded);
      });
    } catch (error) {}
  };

  useEffect(() => {
    // checkVersion();
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
          Linking.openURL("market://details?id=com.andalalin");
          ExitApp.exitApp();
        }}
      />

      <NetProvider>
        <UserProvider>
          <LoadMaster isLogged={isLogged} user={user} />
          <NavigationContainer ref={navigationRef}>
            <NetContext.Consumer>
              {(ctx) => <ANoInternetDialog visibleModal={!ctx} />}
            </NetContext.Consumer>

            <UserContext.Consumer>
              {(value) => <AServer visibleModal={value.getServer()} />}
            </UserContext.Consumer>

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
  const { setUser, setServer } = useMyContext();

  const checkFirstTimeLaunch = () => {
    if (isLogged) {
      setUser(user);
    }
  };

  const checkServer = () => {
    health((response) => {
      if (response.status === 200) {
        setServer(false);
      } else {
        context.toggleLoading(false);
        setServer(true);
      }
    });
  };

  useEffect(() => {
    checkFirstTimeLaunch();
    checkServer();
  }, []);
}

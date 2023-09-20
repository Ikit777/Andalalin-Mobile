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

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState("user");

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

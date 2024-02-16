import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
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
import AServer from "./app/component/utility/AServer";
import SplashScreen from "./app/screens/SplashScreen";
import { CheckContext, CheckProvider } from "./app/context/CheckContext";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const prepare = async () => {
    try {
      /* Load fonts */
      await Font.loadAsync(AFonts);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      console.log(err);
    } finally {
      setIsAppReady(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 150);
    }
  };

  const checkFirstTimeLaunch = async () => {
    const value = await get("authState");
    if (!value) {
      setLogged(false);
    } else {
      setLogged(true);
    }
  };

  useEffect(() => {
    prepare();
    checkFirstTimeLaunch();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NetProvider>
        <CheckProvider>
          <UserProvider>
            {isLoading ? (
              <SplashScreen isLoading={isAppReady} />
            ) : (
              <NavigationContainer ref={navigationRef}>
                <NetContext.Consumer>
                  {(isAvailable) => (
                    <ANoInternetDialog visibleModal={!isAvailable} />
                  )}
                </NetContext.Consumer>

                <CheckContext.Consumer>
                  {(check) => <AServer visibleModal={!check.isServerOk} />}
                </CheckContext.Consumer>

                <CheckContext.Consumer>
                  {(check) => <AUpdateDialog visibleModal={check.isUpdate} />}
                </CheckContext.Consumer>

                <UserContext.Consumer>
                  {(isEnd) => <ASessionEnd visibleModal={isEnd.getSession()} />}
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
            )}
          </UserProvider>
        </CheckProvider>
      </NetProvider>
    </View>
  );
}

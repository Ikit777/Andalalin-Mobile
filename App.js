import { Animated, Easing, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { NetProvider, NetContext } from "./app/context/NetContext";
import { AFonts } from "./app/constants/font";
import { get } from "./app/utils/local-storage";
import ANoInternetDialog from "./app/component/utility/ANoInternetDialog";
import { UserContext, UserProvider } from "./app/context/UserContext";
import Navigator from "./app/navigation/Navigator";
import ASessionEnd from "./app/component/utility/ASessionEnd";
import { navigationRef } from "./app/navigation/RootNavigator";
import ALoading from "./app/component/utility/ALoading";
import AUpdateDialog from "./app/component/utility/AUpdateDialog";
import AServer from "./app/component/utility/AServer";
import SplashScreen from "./app/screens/SplashScreen";
import { CheckContext, CheckProvider } from "./app/context/CheckContext";
import ADialogAkun from "./app/component/utility/ADialogAkun";
import { ModalContext, ModalProvider } from "./app/context/ModalContext";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isLogged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleVisibility = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

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
        toggleVisibility();
      }, 100);
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
      {isLoading ? (
        <SplashScreen isLoading={isAppReady} />
      ) : (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <NetProvider>
            <UserProvider>
              <CheckProvider>
                <ModalProvider>
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
                      {(check) => (
                        <AUpdateDialog visibleModal={check.isUpdate} />
                      )}
                    </CheckContext.Consumer>

                    <CheckContext.Consumer>
                      {(check) => <ADialogAkun visibleModal={check.isUser} />}
                    </CheckContext.Consumer>

                    <UserContext.Consumer>
                      {(isEnd) => (
                        <ASessionEnd visibleModal={isEnd.getSession()} />
                      )}
                    </UserContext.Consumer>

                    <UserContext.Consumer>
                      {(value) => (
                        <ALoading visibleModal={value.getLoading()} />
                      )}
                    </UserContext.Consumer>

                    <Navigator isLogged={isLogged} />
                  </NavigationContainer>
                </ModalProvider>
              </CheckProvider>
            </UserProvider>
          </NetProvider>
        </Animated.View>
      )}
    </View>
  );
}

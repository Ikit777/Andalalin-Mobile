import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Pressable, BackHandler } from "react-native";
import AScreen from "../component/utility/AScreen";
import AText from "../component/utility/AText";
import color from "../constants/color";
import ATextInput from "../component/utility/ATextInput";
import APasswordInput from "../component/utility/APasswordInput";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import AButton from "../component/utility/AButton";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { authLogin, authResendVerication } from "../api/auth";
import { store } from "../utils/local-storage";
import { UserContext } from "../context/UserContext";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import ExitApp from "react-native-exit-app";

function LoginScreen({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();
  const [dialogUser, toggleDialogUser] = useStateToggler();
  const [dialogVerif, toggleDialogVerif] = useStateToggler();
  const [confirm, toggleComfirm] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [passwordError, togglePasswordError] = useStateToggler();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const emailInput = React.createRef();
  const passwordInput = React.createRef();
  const context = useContext(UserContext);

  /* prevent  */
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      navigation.removeListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    };
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      context.toggleLoading(false);
      context.setUser("userLoggin");

      BackHandler.addEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setToken(token))
      .catch(console.log("Network Failed"));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      console.log("filed get token");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const verif = (email) => {
    context.toggleLoading(true);
    authResendVerication(email, (response) => {
      if (response.status === 201) {
        context.toggleLoading(false);
      }
    });
  };

  const login = () => {
    context.toggleLoading(true);
    authLogin(email, password, token.data, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();

            const newAuthState = {
              access_token: result.data.access_token,
              refresh_token: result.data.refresh_token,
              id: result.data.id,
              nama: result.data.name,
              email: result.data.email,
              role: result.data.role,
              photo: result.data.photo,
            };

            context.setUser(newAuthState);
            store("authState", newAuthState);
            navigation.push("Home");
          })();
          break;
        case 400:
          context.toggleLoading(false);
          toggleDialogUser();
          break;
        case 403:
          context.toggleLoading(false);
          toggleDialogVerif();
          break;
        default:
          context.toggleLoading(false);
          toggleDialogUser();
          break;
      }
    });
  };

  const doLogin = () => {
    if (email != "" && password != "") {
      {
        emailError ? toggleEmailError() : "";
      }
      {
        passwordError ? togglePasswordError() : "";
      }
      login();
    } else {
      {
        email == "" ? (emailError ? "" : toggleEmailError()) : "";
      }
      {
        password == "" ? (passwordError ? "" : togglePasswordError()) : "";
      }
    }
  };

  return (
    <AScreen>
      <View style={styles.content}>
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Log in
        </AText>
        <AText
          style={{ paddingBottom: 32 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Selamat datang di andalalin
        </AText>
        <ATextInput
          bdColor={emailError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan email anda"}
          title={"Email"}
          rtype={"next"}
          value={email}
          blur={false}
          multi={false}
          ref={emailInput}
          onChangeText={(value) => {
            setEmail(value);
          }}
          submit={() => {
            {
              emailError ? toggleEmailError() : "";
            }
            passwordInput.current.focus();
          }}
        />
        {emailError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email kosong
          </AText>
        ) : (
          ""
        )}
        <APasswordInput
          hint={"Masukkan password anda"}
          title={"Password"}
          rtype={"done"}
          bdColor={emailError ? color.error.error300 : color.neutral.neutral300}
          value={password}
          ref={passwordInput}
          onChangeText={(value) => {
            setPassword(value);
          }}
          submit={() => {
            {
              passwordError ? togglePasswordError() : "";
            }
          }}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
        />

        {passwordError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Password kosong
          </AText>
        ) : (
          ""
        )}

        <Pressable
          style={{
            flexDirection: "row",
            paddingLeft: 4,
            alignSelf: "flex-end",
            marginTop: 24,
          }}
          onPress={() => {
            navigation.push("Forgot");
            setEmail("");
            setPassword("");
          }}
        >
          <AText size={14} color={color.neutral.neutral700} weight="semibold">
            Lupa password
          </AText>
        </Pressable>
        <AButton
          style={styles.login}
          mode="contained"
          title="Log in"
          onPress={() => {
            doLogin();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            paddingTop: 32,
            alignSelf: "center",
          }}
        >
          <AText color={color.neutral.neutral500} size={14} weight="normal">
            Belum memiliki akun?
          </AText>

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setEmail("");
              setPassword("");
              navigation.push("Register");
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Daftar
            </AText>
          </Pressable>
        </View>
      </View>
      <AConfirmationDialog
        title={"Peringatan!"}
        desc={"Apakah Anda yakin ingin keluar"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          ExitApp.exitApp();
          toggleComfirm();
        }}
      />
      <ADialog
        title={"Peringatan!"}
        desc={"User tidak terdaptar pada sistem"}
        visibleModal={dialogUser}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleDialogUser();
          setEmail("");
          setPassword("");
        }}
      />
      <ADialog
        title={"Peringatan!"}
        desc={"Akun Anda belum terverifikasi"}
        visibleModal={dialogVerif}
        btnOK={"Verifikasi"}
        onPressOKButton={() => {
          toggleDialogVerif();
          setEmail("");
          setPassword("");
          verif(email);
          navigation.push("Verifikasi", { email: email });
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingTop: 80,
  },
  lupaPassword: {
    alignItems: "flex-end",
    marginTop: 24,
  },
  login: {
    marginTop: 24,
  },
});

export default LoginScreen;

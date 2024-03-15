import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import ABackButton from "../component/utility/ABackButton";

function LoginScreen({ navigation }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();
  const [dialogUser, toggleDialogUser] = useStateToggler();
  const [dialogVerif, toggleDialogVerif] = useStateToggler();
  const [confirm, toggleComfirm] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [passwordError, togglePasswordError] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [verify, toggleVerify] = useStateToggler();
  const [formError, toggleFormError] = useStateToggler();
  const [emailNotExist, toggleEmailNotExist] = useStateToggler();

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
      .then((token) => {
        if (token != undefined) {
          setToken(token.data);
        }
      })
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
      if (finalStatus === "granted") {
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
      }
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
      switch (response.status) {
        case 201:
          context.toggleLoading(false);
          navigation.push("Verifikasi", { email: email });
          break;
        case 404:
          context.toggleLoading(false);
          emailError ? "" : toggleEmailError();
          passwordError ? "" : togglePasswordError();
          dialogUser ? "" : toggleDialogUser();
          break;
        default:
          context.toggleLoading(false);
          toggleVerify();
          break;
      }
    });
  };

  const login = () => {
    context.toggleLoading(true);
    authLogin(email, password, token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            context.toggleLoading(false);

            const result = await response.data;

            const newAuthState = {
              access_token: result.data.access_token,
              refresh_token: result.data.refresh_token,
              id: result.data.id,
              nama: result.data.name,
              email: result.data.email,
              nomor: result.data.nomor,
              role: result.data.role,
              photo: result.data.photo,
              nip: result.data.nip,
              push_token: result.data.push_token,
            };

            context.setUser(newAuthState);
            store("authState", newAuthState);
            navigation.push("Home");
          })();
          break;
        case 404:
          context.toggleLoading(false);
          emailError ? "" : toggleEmailError();
          passwordError ? "" : togglePasswordError();
          dialogUser ? "" : toggleDialogUser();
          break;
        case 403:
          context.toggleLoading(false);
          toggleDialogVerif();
          break;
        default:
          context.toggleLoading(false);
          toggleSomething();
          break;
      }
    });
  };

  const doLogin = () => {
    if (email != "" && password != "") {
      if (!dialogUser && !emailNotExist) {
        emailError ? toggleEmailError() : "";
        passwordError ? togglePasswordError() : "";
        formError ? toggleFormError() : "";
        login();
      }
    } else {
      email == "" ? (emailError ? "" : toggleEmailError()) : "";
      password == "" ? (passwordError ? "" : togglePasswordError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  const clear_error = () => {
    email != "" && !emailNotExist ? (emailError ? toggleEmailError() : "") : "";
    password != "" ? (passwordError ? togglePasswordError() : "") : "";
    email != "" && password != "" ? (formError ? toggleFormError() : "") : "";
    dialogUser ? toggleDialogUser() : "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      emailError ? "" : toggleEmailError();
      emailNotExist ? "" : toggleEmailNotExist();
    } else {
      emailError ? toggleEmailError() : "";
      emailNotExist ? toggleEmailNotExist() : "";
    }
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <ABackButton color={color.text.trans} />
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Ayo Masuk
        </AText>
        <AText
          style={{ paddingBottom: 32 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Dapatkan kemudahan dalam urusan manajemen lalu lintas
        </AText>
        <ATextInput
          bdColor={emailError ? color.error.error500 : color.neutral.neutral300}
          hint={"Masukkan email anda"}
          title={"Email"}
          rtype={"next"}
          ktype={"email-address"}
          inputMode={"email"}
          value={email}
          blur={false}
          multi={false}
          ref={emailInput}
          onChangeText={(value) => {
            setEmail(value);
            clear_error();
            if (value.length > 0) {
              validateEmail(value);
            } else {
              emailError ? toggleEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
          }}
          submit={() => {
            passwordInput.current.focus();
            clear_error();
            if (email.length > 0) {
              validateEmail(email);
            } else {
              emailError ? toggleEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
          }}
        />
        {emailNotExist ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email Anda tidak valid, masukkan email dengan benar
          </AText>
        ) : (
          ""
        )}
        <APasswordInput
          hint={"Masukkan kata sandi anda"}
          title={"Kata sandi"}
          rtype={"done"}
          padding={20}
          bdColor={
            passwordError ? color.error.error500 : color.neutral.neutral300
          }
          value={password}
          ref={passwordInput}
          onChangeText={(value) => {
            setPassword(value);
            clear_error();
          }}
          submit={() => {
            clear_error();
          }}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
        />

        {formError ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Masukkan email dan kata sandi Anda
          </AText>
        ) : (
          ""
        )}

        {dialogUser ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Akun tidak terdaftar, silakan periksa kembali email dan kata sandi
            Anda
          </AText>
        ) : (
          ""
        )}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingHorizontal: 4,
            alignSelf: "flex-end",
            marginTop: 24,
          }}
          onPress={() => {
            navigation.push("Forgot");
          }}
        >
          <AText size={14} color={color.neutral.neutral700} weight="semibold">
            Lupa kata sandi
          </AText>
        </TouchableOpacity>
        <AButton
          style={styles.login}
          mode="contained"
          title="Masuk"
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

          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              navigation.push("Register", { kondisi: "Login" });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Daftar
            </AText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AConfirmationDialog
        title={"Keluar"}
        desc={"Apakah Anda yakin ingin keluar aplikasi?"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
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
        title={"Verifikasi"}
        desc={
          "Akun Anda belum terverifikasi oleh kami, silahkan lakukan verifikasi"
        }
        visibleModal={dialogVerif}
        btnOK={"Verifikasi"}
        onPressOKButton={() => {
          toggleDialogVerif();
          verif(email);
        }}
      />

      <ADialog
        title={"Masuk"}
        desc={"Masuk gagal dilakukan, silahkan coba lagi lain waktu"}
        visibleModal={something}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSomething();
        }}
      />

      <ADialog
        title={"Verifikasi"}
        desc={"Kode verifikasi gagak dikirim, silahkan coba lagi lain waktu"}
        visibleModal={verify}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleVerify();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
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

import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, BackHandler } from "react-native";
import AScreen from "../component/utility/AScreen";
import AText from "../component/utility/AText";
import color from "../constants/color";
import ATextInput from "../component/utility/ATextInput";
import { useStateToggler } from "../hooks/useUtility";
import { authForgotPassword, authResendVerication } from "../api/auth";
import AButton from "../component/utility/AButton";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
import ABackButton from "../component/utility/ABackButton";

function ForgotPasswordScreen({ navigation }) {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");

  const [err, toggleErr] = useStateToggler();
  const [verif, toggleVerif] = useStateToggler();
  const [data, toggleData] = useStateToggler();
  const [bd, toggleBd] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [verify, toggleVerify] = useStateToggler();
  const [emailNotExist, toggleEmailNotExist] = useStateToggler();

  const forgot = (email) => {
    context.toggleLoading(true);
    authForgotPassword(email, (response) => {
      switch (response.status) {
        case 200:
          context.toggleLoading(false);
          navigation.push("Reset", { email: email, kondisi: "Not Logged" });
          break;
        case 404:
          context.toggleLoading(false);
          err ? "" : toggleErr();
          bd ? "" : toggleBd();
          break;
        case 403:
          context.toggleLoading(false);
          toggleVerif();
          break;
        default:
          context.toggleLoading(false);
          toggleSomething();
          break;
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.replace("Login");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.replace("Login");
        return true;
      });
    });
    return unsubscribe;
  }, [navigation]);

  const verification = (email) => {
    context.toggleLoading(true);
    authResendVerication(email, (response) => {
      switch (response.status) {
        case 201:
          context.toggleLoading(false);
          navigation.push("Verifikasi", { email: email });
          break;
        case 404:
          context.toggleLoading(false);
          err ? "" : toggleErr();
          bd ? "" : toggleBd();
          break;
        default:
          context.toggleLoading(false);
          toggleVerify();
          break;
      }
    });
  };

  const kirim = () => {
    if (email != "") {
      if (!err && !emailNotExist) {
        data ? toggleData() : "";
        bd ? toggleBd() : "";

        forgot(email);
      }
    } else {
      email == "" ? (data ? "" : toggleData()) : "";
      email == "" ? (bd ? "" : toggleBd()) : "";
    }
  };

  const clear_error = () => {
    data ? toggleData() : "";
    email != "" && !emailNotExist ? (bd ? toggleBd() : "") : "";

    err ? toggleErr() : "";
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      bd ? "" : toggleBd();
      emailNotExist ? "" : toggleEmailNotExist();
    } else {
      bd ? toggleBd() : "";
      emailNotExist ? toggleEmailNotExist() : "";
    }
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <ABackButton
          onPress={() => {
            navigation.replace("Login");
          }}
        />
      </View>

      <View style={styles.content}>
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Lupa kata sandi?
        </AText>
        <AText
          style={{ paddingBottom: 32 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Jangan khawatir, kami akan memberikan intruksi reset kata sandi ke
          email Anda
        </AText>

        <ATextInput
          bdColor={bd ? color.error.error500 : color.neutral.neutral300}
          hint={"Masukkan email anda"}
          title={"Email"}
          rtype={"done"}
          ktype={"email-address"}
          inputMode={"email"}
          value={email}
          multi={false}
          submit={() => {
            clear_error();
            if (email.length > 0) {
              validateEmail(email);
            } else {
              bd ? toggleBd() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
          }}
          onChangeText={(value) => {
            setEmail(value);
            clear_error();
            if (value.length > 0) {
              validateEmail(value);
            } else {
              bd ? toggleBd() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
          }}
        />

        {emailNotExist ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email Anda tidak valid, masukkan email dengan benar
          </AText>
        ) : (
          ""
        )}

        {err ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Akun tidak terdaftar, silakan periksa kembali email Anda
          </AText>
        ) : (
          ""
        )}

        {data ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Masukkan email Anda
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={styles.forgot}
          mode="contained"
          title="Kirim"
          onPress={() => {
            kirim();
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
              navigation.push("Register", { kondisi: "Forgot" });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Daftar
            </AText>
          </TouchableOpacity>
        </View>
      </View>

      <ADialog
        title={"Verifikasi"}
        desc={
          "Akun Anda belum terverifikasi oleh kami, silahkan lakukan verifikasi"
        }
        visibleModal={verif}
        toggleModal={toggleVerif}
        btnOK={"Verifikasi"}
        onPressOKButton={() => {
          toggleVerif();
          verification(email);
        }}
      />

      <ADialog
        title={"Kirim"}
        desc={"Kode gagal dikirim, silahkan coba lagi lain waktu"}
        visibleModal={something}
        toggleModal={toggleSomething}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSomething();
        }}
      />

      <ADialog
        title={"Verifikasi"}
        desc={"Kode verifikasi gagak dikirim, silahkan coba lagi lain waktu"}
        visibleModal={verify}
        toggleModal={toggleVerify}
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
  },
  forgot: {
    marginTop: 32,
  },
});

export default ForgotPasswordScreen;

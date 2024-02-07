import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, BackHandler } from "react-native";
import AScreen from "../component/utility/AScreen";
import BackButton from "../component/utility/ABackButton";
import AText from "../component/utility/AText";
import color from "../constants/color";
import ATextInput from "../component/utility/ATextInput";
import { useStateToggler } from "../hooks/useUtility";
import { authForgotPassword } from "../api/auth";
import AButton from "../component/utility/AButton";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
ADialog;

function ForgotPasswordScreen({ navigation }) {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");

  const [err, toggleErr] = useStateToggler();
  const [verif, toggleVerif] = useStateToggler();
  const [data, toggleData] = useStateToggler();
  const [bd, toggleBd] = useStateToggler();

  const forgot = (email) => {
    context.toggleLoading(true);
    authForgotPassword(email, (response) => {
      switch (response.status) {
        case 200:
          context.toggleLoading(false);
          navigation.push("Reset", { email: email });
          break;
        case 400:
          context.toggleLoading(false);
          err ? "" : toggleErr();
          bd ? "" : toggleBd();
          break;
        case 401:
          context.toggleLoading(false);
          toggleVerif();
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

  const kirim = () => {
    if (email != "") {
      if (!err) {
        data ? toggleData() : "";
        bd ? toggleBd() : "";
      }

      forgot(email);
    } else {
      email == "" ? (data ? "" : toggleData()) : "";
      email == "" ? (bd ? "" : toggleBd()) : "";
    }
  };

  const clear_error = () => {
    data ? toggleData() : "";
    bd ? toggleBd() : "";
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <BackButton
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
          Jangan khawatir, kami akan memberikan intruksi reset kata sandi ke email
          Anda
        </AText>

        <ATextInput
          bdColor={bd ? color.error.error300 : color.neutral.neutral300}
          hint={"Masukkan email anda"}
          title={"Email"}
          rtype={"done"}
          ktype={"email-address"}
          inputMode={"email"}
          value={email}
          multi={false}
          submit={() => {
            clear_error();
          }}
          onChangeText={(value) => {
            setEmail(value);
            clear_error();
          }}
        />

        {err ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email Anda tidak terdaftar
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
              setEmail("");
              navigation.push("Register", { email: email });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Daftar
            </AText>
          </TouchableOpacity>
        </View>
      </View>

      <ADialog
        title={"Peringatan"}
        desc={"Akun Anda belum terverifikasi"}
        visibleModal={verif}
        btnOK={"Verifikasi"}
        onPressOKButton={() => {
          toggleVerif();
          verif(email);
          navigation.push("Verifikasi", { email: email });
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

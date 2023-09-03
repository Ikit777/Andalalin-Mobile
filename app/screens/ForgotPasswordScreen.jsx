import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Pressable, BackHandler } from "react-native";
import AScreen from "../component/utility/AScreen";
import BackButton from "../component/utility/ABackButton";
import AText from "../component/utility/AText";
import color from "../constants/color";
import ATextInput from "../component/utility/ATextInput";
import ALoading from "../component/utility/ALoading";
import { useStateToggler } from "../hooks/useUtility";
import { authForgotPassword } from "../api/auth";
import AButton from "../component/utility/AButton";
import { UserContext } from "../context/UserContext";

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
          navigation.navigate("Reset", { email: email });
          break;
        case 400:
          context.toggleLoading(false);
          toggleErr();
          toggleBd();
          break;
        case 401:
          context.toggleLoading(false);
          if (!err) {
            toggleVerif();
            toggleBd();
          }
          break;
      }
    });
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setEmail("");
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      setEmail("");
      navigation.goBack();
      return true;
    });
  }, []);

  return (
    <AScreen>
      <View style={styles.header}>
        <BackButton
          onPress={() => {
            setEmail("");
            navigation.goBack();
          }}
        />
      </View>

      <View style={styles.content}>
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Lupa password?
        </AText>
        <AText
          style={{ paddingBottom: 32 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Jangan khawatir, kami akan memberikan intruksi reset password ke email
          Anda
        </AText>

        <ATextInput
          bdColor={bd ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan email anda"}
          title={"Email"}
          rtype={"done"}
          value={email}
          multi={false}
          submit={() => {
            if (data) {
              toggleData();
              toggleBd();
            }
            if (err) {
              toggleErr();
              toggleBd();
            }
            if (verif) {
              toggleVerif();
              toggleBd();
            }
          }}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />

        {err ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email tidak ditemukan
          </AText>
        ) : (
          ""
        )}

        {verif ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email belum melakukan verifikasi
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
            Email kosong
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={styles.forgot}
          mode="contained"
          title="Kirim"
          onPress={() => {
            if (email != "") {
              forgot(email);
              setEmail("");
            } else {
              toggleData();
              toggleBd();
            }
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
              navigation.navigate("Register", { email: email });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Daftar
            </AText>
          </Pressable>
        </View>
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    padding: 16,
  },
  forgot: {
    marginTop: 32,
  },
});

export default ForgotPasswordScreen;

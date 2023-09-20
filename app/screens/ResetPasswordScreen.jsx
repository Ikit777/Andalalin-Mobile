import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  BackHandler,
  ScrollView,
} from "react-native";
import AScreen from "../component/utility/AScreen";
import BackButton from "../component/utility/ABackButton";
import AText from "../component/utility/AText";
import color from "../constants/color";
import ATextInput from "../component/utility/ATextInput";
import AButton from "../component/utility/AButton";
import { useStateToggler } from "../hooks/useUtility";
import { authForgotPassword, authResetPassword } from "../api/auth";
import ALoading from "../component/utility/ALoading";
import ADialog from "../component/utility/ADialog";
import { remove } from "../utils/local-storage";
import { UserContext } from "../context/UserContext";

function ResetPasswordScreen({ navigation, route }) {
  const passwordBaruInput = React.createRef();
  const konfirmasiPassword = React.createRef();
  const codeInput = React.createRef();
  const context = useContext(UserContext);

  const [baru, setBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [code, setCode] = useState("");

  let [count, setTimer] = useState(5 * 60);
  let [isStarted, setIsStarted] = useState(true);

  const [resendBerhasil, toggleResendBerhasil] = useStateToggler();
  const [resendGagal, toggleResendGagal] = useStateToggler();
  const [resetBerhasil, toggleResetBerhasil] = useStateToggler();
  const [passNotSame, togglePassNotSame] = useStateToggler();
  const [expired, toggleExpired] = useStateToggler();
  const [passwordError, togglePasswordError] = useStateToggler();
  const [konfirmasiError, toggleKonfirmasiError] = useStateToggler();
  const [codeError, toggleCodeError] = useStateToggler();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.goBack();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.goBack();
        return true;
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        count = lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    //cleanup the interval on complete
    return () => {
      clearInterval(interval);
    };
  }, [isStarted]);

  function secondsToHms(d) {
    d = Number(d);
    const minutes = Math.floor(d / 60);
    const seconds = Math.floor(d - minutes * 60);

    const time = `${minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds
    }`;

    return time;
  }

  const resend = (email) => {
    context.toggleLoading(true);
    authForgotPassword(email, (response) => {
      if (response.status === 200) {
        context.toggleLoading(false);
        toggleResendBerhasil();
      } else {
        context.toggleLoading(false);
        toggleResendGagal();
      }
    });
  };

  const reset = (password, passwordConfirm, code) => {
    context.toggleLoading(true);
    authResetPassword(password, passwordConfirm, code, (response) => {
      switch (response.status) {
        case 200:
          context.toggleLoading(false);
          toggleResetBerhasil();
          break;
        case 400:
          context.toggleLoading(false);
          togglePassNotSame();
          break;
        case 502:
          context.toggleLoading(false);
          toggleExpired();
          break;
      }
    });
  };

  const doReset = () => {
    if (baru != "" && konfirmasi != "" && code != "") {
      {
        passwordError ? togglePasswordError() : "";
      }
      {
        konfirmasiError ? toggleKonfirmasiError() : "";
      }
      {
        codeError ? toggleCodeError() : "";
      }
      reset(baru, konfirmasi, code);
    } else {
      {
        baru == "" ? (passwordError ? "" : togglePasswordError()) : "";
      }
      {
        konfirmasi == ""
          ? konfirmasiError
            ? ""
            : toggleKonfirmasiError()
          : "";
      }
      {
        code == "" ? (codeError ? "" : toggleCodeError()) : "";
      }
    }
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Reset password
        </AText>
        <AText
          style={{ paddingBottom: 16 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Kami sudah mengirim kode reset password ke{" "}
          {route.params.email.toLowerCase()}
        </AText>

        <ATextInput
          bdColor={
            passwordError ? color.error.error300 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan password baru"}
          title={"Password baru"}
          rtype={"next"}
          value={baru}
          blur={false}
          multi={false}
          ref={passwordBaruInput}
          onChangeText={(value) => {
            setBaru(value);
          }}
          submit={() => {
            {
              passwordError ? togglePasswordError() : "";
            }
            konfirmasiPassword.current.focus();
          }}
        />

        <AText
          style={{ paddingTop: 6 }}
          color={
            passwordError ? color.error.error500 : color.neutral.neutral500
          }
          size={14}
          weight="normal"
        >
          Minimal 8 karakter: Hanya huruf, angka, dan simbol
        </AText>

        <ATextInput
          bdColor={
            konfirmasiError ? color.error.error300 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan konfirmasi password"}
          title={"Konfirmasi password"}
          rtype={"next"}
          value={konfirmasi}
          blur={false}
          padding={20}
          multi={false}
          ref={konfirmasiPassword}
          onChangeText={(value) => {
            setKonfirmasi(value);
          }}
          submit={() => {
            {
              konfirmasiError ? toggleKonfirmasiError() : "";
            }
            codeInput.current.focus();
          }}
        />

        {konfirmasiError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Konfirmasi password kosong
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={codeError ? color.error.error300 : color.neutral.neutral300}
          ktype={"numeric"}
          hint={"Masukkan kode reset password"}
          title={"Kode reset password"}
          rtype={"done"}
          value={code}
          multi={false}
          padding={20}
          ref={codeInput}
          submit={() => {
            {
              codeError ? toggleCodeError() : "";
            }
          }}
          onChangeText={(value) => {
            setCode(value);
          }}
        />

        {codeError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Kode reset password kosong
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={styles.reset}
          mode="contained"
          title="Reset password"
          onPress={() => {
            doReset();
          }}
        />

        <View
          style={{
            flexDirection: "row",
            paddingTop: 32,
            marginBottom: 32,
            alignSelf: "center",
          }}
        >
          <AText color={color.neutral.neutral500} size={14} weight="normal">
            Tidak menerima kode?
          </AText>

          <Pressable
            disabled={count === 0 ? false : true}
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setTimer(5 * 60);
              setIsStarted(false);
              resend(route.params.email);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              {count === 0 ? "Kirim ulang" : secondsToHms(count)}
            </AText>
          </Pressable>
        </View>
      </ScrollView>
      <ADialog
        title={"Kirim ulang berhasil"}
        desc={"Kode reset password berhasil dikirim ulang ke email Anda"}
        visibleModal={resendBerhasil}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResendBerhasil();
        }}
      />

      <ADialog
        title={"Kirim ulang gagal"}
        desc={"Akun tidak terdaftar"}
        visibleModal={resendGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResendGagal();
        }}
      />

      <ADialog
        title={"Reset password berhasil"}
        desc={"Password Anda berhasil direset, silahkan login kembali"}
        visibleModal={resetBerhasil}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResetBerhasil();
          remove("authState");
          context.setCheck();
          navigation.push("Back Login");
        }}
      />

      <ADialog
        title={"Reset password gagal"}
        desc={"Konfirmasi password Anda tidak sama dengan password"}
        visibleModal={passNotSame}
        btnOK={"OK"}
        onPressOKButton={() => {
          togglePassNotSame();
        }}
      />

      <ADialog
        title={"Reset password gagal"}
        desc={
          "kode reset Anda sudah tidak luarsa, silahkan kirim ulang kode reset"
        }
        visibleModal={expired}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleExpired();
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
    flexGrow: 1,
  },
  reset: {
    marginTop: 32,
  },
});

export default ResetPasswordScreen;

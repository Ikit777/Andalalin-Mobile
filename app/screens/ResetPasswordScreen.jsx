import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
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
import ADialog from "../component/utility/ADialog";
import { remove } from "../utils/local-storage";
import { UserContext } from "../context/UserContext";
import APasswordInput from "../component/utility/APasswordInput";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";

function ResetPasswordScreen({ navigation, route }) {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();

  const kondisi = route.params.kondisi;
  const passwordBaruInput = React.createRef();
  const konfirmasiPassword = React.createRef();
  const codeInput = React.createRef();
  const context = useContext(UserContext);

  const [baru, setBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [code, setCode] = useState("");

  let [count, setTimer] = useState(5 * 60);
  let [isStarted, setIsStarted] = useState(true);

  const [resendGagal, toggleResendGagal] = useStateToggler();
  const [resetBerhasil, toggleResetBerhasil] = useStateToggler();
  const [resetGagal, toggleResetGagal] = useStateToggler();
  const [passNotSame, togglePassNotSame] = useStateToggler();
  const [expired, toggleExpired] = useStateToggler();
  const [passwordError, togglePasswordError] = useStateToggler();
  const [konfirmasiError, toggleKonfirmasiError] = useStateToggler();
  const [codeError, toggleCodeError] = useStateToggler();
  const [formError, toggleFormError] = useStateToggler();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        if (kondisi == "Logged") {
          navigation.replace("Home");
        } else {
          navigation.replace("Forgot");
        }

        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        if (kondisi == "Logged") {
          navigation.replace("Home");
        } else {
          navigation.replace("Forgot");
        }
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
        setTimer(5 * 60);
        setIsStarted(false);
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
        case 422:
          context.toggleLoading(false);
          konfirmasiError ? "" : toggleKonfirmasiError();
          passNotSame ? "" : togglePassNotSame();
          break;
        case 400:
          context.toggleLoading(false);
          codeError ? "" : toggleCodeError();
          expired ? "" : toggleExpired();
          break;
        default:
          context.toggleLoading(false);
          toggleResetGagal();
          break;
      }
    });
  };

  const doReset = () => {
    if (baru != "" && konfirmasi != "" && code != "") {
      if (!passNotSame && !expired) {
        passwordError ? togglePasswordError() : "";
        konfirmasiError ? toggleKonfirmasiError() : "";
        codeError ? toggleCodeError() : "";
        formError ? toggleFormError() : "";
      }

      reset(baru, konfirmasi, code);
    } else {
      baru == "" ? (passwordError ? "" : togglePasswordError()) : "";
      konfirmasi == "" ? (konfirmasiError ? "" : toggleKonfirmasiError()) : "";
      code == "" ? (codeError ? "" : toggleCodeError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  const clear_error = () => {
    konfirmasi != "" ? (konfirmasiError ? toggleKonfirmasiError() : "") : "";
    code != "" ? (codeError ? toggleCodeError() : "") : "";
    baru != "" && konfirmasi != "" && code != ""
      ? formError
        ? toggleFormError()
        : ""
      : "";
    passNotSame ? togglePassNotSame() : "";
    expired ? toggleExpired() : "";
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
              if (kondisi == "Logged") {
                navigation.replace("Home");
              } else {
                navigation.replace("Forgot");
              }
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
          Buat kata sandi baru
        </AText>
        <AText
          style={{ paddingBottom: 16 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Kode untuk membuat kata sandi baru telah dikirim ke{" "}
          {route.params.email.toLowerCase()}
        </AText>

        <APasswordInput
          bdColor={
            passwordError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan kata sandi baru"}
          title={"Kata sandi baru"}
          rtype={"next"}
          value={baru}
          blur={false}
          multi={false}
          ref={passwordBaruInput}
          onChangeText={(value) => {
            setBaru(value);
            if (value.length < 8) {
              passwordError ? "" : togglePasswordError();
            } else {
              passwordError ? togglePasswordError() : "";
            }
            clear_error();
          }}
          submit={() => {
            if (baru.length < 8) {
              passwordError ? "" : togglePasswordError();
            } else {
              passwordError ? togglePasswordError() : "";
            }
            clear_error();
            konfirmasiPassword.current.focus();
          }}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
        />

        <AText
          style={{ paddingTop: 6 }}
          color={
            passwordError ? color.error.error500 : color.neutral.neutral500
          }
          size={14}
          weight="normal"
        >
          Keterangan: Kata sandi minimal 8 karakter, terdiri dari huruf, angka,
          atau simbol
        </AText>

        <APasswordInput
          bdColor={
            konfirmasiError ? color.error.error500 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan konfirmasi kata sandi"}
          title={"Konfirmasi kata sandi"}
          rtype={"next"}
          value={konfirmasi}
          blur={false}
          padding={20}
          multi={false}
          ref={konfirmasiPassword}
          onChangeText={(value) => {
            setKonfirmasi(value);
            clear_error();
          }}
          submit={() => {
            clear_error();
            codeInput.current.focus();
          }}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
        />

        <ATextInput
          bdColor={codeError ? color.error.error500 : color.neutral.neutral300}
          ktype={"numeric"}
          hint={"Masukkan kode autentikasi anda"}
          title={"Kode autentikasi"}
          rtype={"done"}
          value={code}
          multi={false}
          padding={20}
          ref={codeInput}
          submit={() => {
            clear_error();
          }}
          onChangeText={(value) => {
            setCode(value);
            clear_error();
          }}
        />

        {formError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Lengkapi formulir atau kolom yang tersedia dengan benar
          </AText>
        ) : (
          ""
        )}

        {passNotSame ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Konfirmasi kata sandi Anda dengan benar
          </AText>
        ) : (
          ""
        )}

        {expired ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Kode autentikasi Anda salah atau sudah tidak berlaku, silahkan
            periksa atau kirim ulang kode
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={styles.reset}
          mode="contained"
          title="Buat kata sandi"
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

          <TouchableOpacity
            disabled={count === 0 ? false : true}
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              resend(route.params.email);
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              {count === 0 ? "Kirim ulang" : secondsToHms(count)}
            </AText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ADialog
        title={"Kata sandi"}
        desc={"Kata sandi baru berhasil dibuat, silahkan untuk login kembali"}
        visibleModal={resetBerhasil}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResetBerhasil();
          if (kondisi == "Logged") {
            remove("authState");
            context.setCheck();
          }

          navigation.replace("Login");
        }}
      />

      <ADialog
        title={"Kata sandi"}
        desc={"Kata sandi baru gagal dibuat, silahkan coba lagi lain waktu"}
        visibleModal={resetGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResetGagal();
        }}
      />

      <ADialog
        title={"Kirim ulang"}
        desc={"Kirim ulang kode gagal dilakukan, silahkan coba lagi lain waktu"}
        visibleModal={resendGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleResendGagal();
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

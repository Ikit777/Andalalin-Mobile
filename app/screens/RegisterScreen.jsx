import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import AScreen from "../component/utility/AScreen";
import BackButton from "../component/utility/ABackButton";
import AText from "../component/utility/AText";
import color from "../constants/color";
import ATextInput from "../component/utility/ATextInput";
import APasswordInput from "../component/utility/APasswordInput";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import AButton from "../component/utility/AButton";
import { useStateToggler } from "../hooks/useUtility";
import { authRegister } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import { UserContext } from "../context/UserContext";
import { Checkbox } from "react-native-paper";

function RegisterScreen({ navigation, route }) {
  const kondisi = route.params.kondisi;
  const emailInput = React.createRef();
  const nomorInput = React.createRef();
  const passwordInput = React.createRef();
  const comfirmInput = React.createRef();
  const context = useContext(UserContext);

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();
  const [emailExist, toggleEmailExist] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [passNotSame, togglePassNotSame] = useStateToggler();
  const [nameError, toggleNameError] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [nomorError, toggleNomorError] = useStateToggler();
  const [passwordError, togglePasswordError] = useStateToggler();
  const [konfirmasiError, toggleKonfirmasiError] = useStateToggler();
  const [emailNotExist, toggleEmailNotExist] = useStateToggler();
  const [formError, toggleFormError] = useStateToggler();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nomor, setNomor] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [setuju, setSetuju] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (kondisi == "Login") {
        navigation.replace("Login");
      } else {
        navigation.replace("Forgot");
      }

      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      if (kondisi == "Login") {
        navigation.replace("Login");
      } else {
        navigation.replace("Forgot");
      }
      return true;
    });
  }, []);

  const register = (name, email, nomor, password, confirmPassword) => {
    context.toggleLoading(true);

    authRegister(name, email, nomor, password, confirmPassword, (response) => {
      switch (response.status) {
        case 201:
          context.toggleLoading(false);
          navigation.push("Verifikasi", { email: email });
          break;
        case 400:
          context.toggleLoading(false);
          konfirmasiError ? "" : toggleKonfirmasiError();
          passNotSame ? "" : togglePassNotSame();
          break;
        case 409:
          context.toggleLoading(false);
          emailError ? "" : toggleEmailError();
          emailExist ? "" : toggleEmailExist();
          break;
        default:
          context.toggleLoading(false);
          toggleSomething();
          break;
      }
    });
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

  const doRegister = () => {
    if (
      name != "" &&
      email != "" &&
      nomor != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      if (!passNotSame && !emailNotExist && !emailExist) {
        nameError ? toggleNameError() : "";
        emailError ? toggleEmailError() : "";
        nomorError ? toggleNomorError() : "";
        passwordError ? togglePasswordError() : "";
        konfirmasiError ? toggleKonfirmasiError() : "";
        formError ? toggleFormError() : "";

        register(name, email, nomor, password, confirmPassword);
      }
    } else {
      name == "" ? (nameError ? "" : toggleNameError()) : "";
      email == "" ? (emailError ? "" : toggleEmailError()) : "";
      nomor == "" ? (nomorError ? "" : toggleNomorError()) : "";
      password == "" ? (passwordError ? "" : togglePasswordError()) : "";
      confirmPassword == ""
        ? konfirmasiError
          ? ""
          : toggleKonfirmasiError()
        : "";
      formError ? "" : toggleFormError();
    }
  };

  const clear_error = () => {
    name != "" ? (nameError ? toggleNameError() : "") : "";
    email != "" && !emailNotExist ? (emailError ? toggleEmailError() : "") : "";
    nomor != "" ? (nomorError ? toggleNomorError() : "") : "";
    confirmPassword != ""
      ? konfirmasiError
        ? toggleKonfirmasiError()
        : ""
      : "";

    name != "" &&
    email != "" &&
    nomor != "" &&
    password != "" &&
    confirmPassword != ""
      ? formError
        ? toggleFormError()
        : ""
      : "";

    passNotSame ? togglePassNotSame() : "";
    emailExist ? toggleEmailExist() : "";
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <BackButton
          onPress={() => {
            if (kondisi == "Login") {
              navigation.replace("Login");
            } else {
              navigation.replace("Forgot");
            }
          }}
        />
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Daftar
        </AText>
        <AText
          style={{ paddingBottom: 32 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Bergabung bersama andalalin
        </AText>

        <ATextInput
          bdColor={nameError ? color.error.error500 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama anda"}
          title={"Nama lengkap"}
          rtype={"next"}
          blur={false}
          multi={false}
          value={name}
          onChangeText={(value) => {
            setName(value);
            clear_error();
          }}
          submit={() => {
            clear_error();
            emailInput.current.focus();
          }}
        />

        <ATextInput
          bdColor={emailError ? color.error.error500 : color.neutral.neutral300}
          ktype={"email-address"}
          inputMode={"email"}
          hint={"Masukkan email anda"}
          title={"Email"}
          rtype={"next"}
          blur={false}
          padding={20}
          multi={false}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            if (value.length > 0) {
              validateEmail(value);
            } else {
              emailError ? toggleEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
            clear_error();
          }}
          ref={emailInput}
          submit={() => {
            if (email.length > 0) {
              validateEmail(email);
            } else {
              emailError ? toggleEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
            clear_error();
            nomorInput.current.focus();
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

        <ATextInput
          bdColor={nomorError ? color.error.error500 : color.neutral.neutral300}
          ktype={"number-pad"}
          hint={"Masukkan nomor anda"}
          title={"Nomor telepon"}
          rtype={"next"}
          blur={false}
          padding={20}
          multi={false}
          value={nomor}
          onChangeText={(value) => {
            setNomor(value);
            clear_error();
          }}
          ref={nomorInput}
          submit={() => {
            clear_error();
            passwordInput.current.focus();
          }}
        />

        <APasswordInput
          hint={"Masukkan kata sandi anda"}
          title={"Kata sandi"}
          rtype={"next"}
          bdColor={
            passwordError ? color.error.error500 : color.neutral.neutral300
          }
          padding={20}
          ref={passwordInput}
          blur={false}
          onChangeText={(value) => {
            setPassword(value);
            if (value.length > 0 && value.length < 8) {
              passwordError ? "" : togglePasswordError();
            } else {
              passwordError ? togglePasswordError() : "";
            }
            clear_error();
          }}
          value={password}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
          submit={() => {
            if (password.length > 0 && password.length < 8) {
              passwordError ? "" : togglePasswordError();
            } else {
              passwordError ? togglePasswordError() : "";
            }
            clear_error();
            comfirmInput.current.focus();
          }}
        />

        <AText
          style={{ paddingTop: 8 }}
          color={color.neutral.neutral300}
          size={14}
          weight="normal"
        >
          Keterangan: Kata sandi minimal 8 karakter, terdiri dari huruf, angka,
          atau simbol
        </AText>

        <APasswordInput
          hint={"Masukkan kata sandi anda"}
          title={"Konfirmasi kata sandi"}
          bdColor={
            konfirmasiError ? color.error.error500 : color.neutral.neutral300
          }
          padding={20}
          rtype={"done"}
          blur={true}
          onChangeText={(value) => {
            setconfirmPassword(value);
            clear_error();
          }}
          submit={() => {
            clear_error();
          }}
          value={confirmPassword}
          ref={comfirmInput}
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
            Lengkapi formulir atau kolom yang tersedia dengan benar
          </AText>
        ) : (
          ""
        )}

        {passNotSame ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Konfirmasi kata sandi Anda dengan benar
          </AText>
        ) : (
          ""
        )}

        {emailExist ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email sudah digunakan pengguna lain
          </AText>
        ) : (
          ""
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
            maxWidth: "90%",
          }}
        >
          <Checkbox
            uncheckedColor={color.neutral.neutral300}
            color={color.primary.primary600}
            status={setuju ? "checked" : "unchecked"}
            onPress={() => {
              setSetuju(!setuju);
            }}
          />

          <AText
            style={{ paddingLeft: 4 }}
            size={14}
            color={color.neutral.neutral700}
          >
            Saya telah menyetejui{" "}
            <AText
              size={14}
              color={color.primary.main}
              weight="semibold"
              onPress={() => {
                Linking.openURL(
                  process.env.APP_WEB ??
                    "https://andalalin.me" + "/syarat-ketentuan"
                );
              }}
            >
              Ketentuan{" "}
            </AText>
            <AText size={14} color={color.neutral.neutral700}>
              dan{" "}
            </AText>
            <AText
              size={14}
              color={color.primary.main}
              weight="semibold"
              onPress={() => {
                Linking.openURL(
                  process.env.APP_WEB ??
                    "https://andalalin.me" + "/kebijakan-privasi"
                );
              }}
            >
              Kebijakan Privasi{" "}
            </AText>
          </AText>
        </View>

        <AButton
          style={styles.register}
          mode="contained"
          title="Daftar"
          onPress={() => {
            if (setuju) {
              doRegister();
            }
          }}
        />

        <View
          style={{
            flexDirection: "row",
            paddingTop: 32,
            paddingBottom: 32,
            alignSelf: "center",
          }}
        >
          <AText color={color.neutral.neutral500} size={14} weight="normal">
            Sudah punya akun?
          </AText>

          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              navigation.replace("Back Login");
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Masuk
            </AText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ADialog
        title={"Daftar"}
        desc={"Pendaftaran gagal dilakukan, silahkan coba lagi lain waktu"}
        visibleModal={something}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSomething();
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
  register: {
    marginTop: 32,
  },
});

export default RegisterScreen;

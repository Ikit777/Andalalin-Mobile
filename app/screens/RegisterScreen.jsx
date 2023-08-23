import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, BackHandler, ScrollView } from "react-native";
import AScreen from "../component/utility/AScreen";
import BackButton from "../component/utility/ABackButton";
import AText from "../component/utility/AText";
import color from "../constants/color";
import ATextInput from "../component/utility/ATextInput";
import APasswordInput from "../component/utility/APasswordInput";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import AButton from "../component/utility/AButton";
import ALoading from "../component/utility/ALoading";
import { useStateToggler } from "../hooks/useUtility";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { authRegister } from "../api/auth";
import ADialog from "../component/utility/ADialog";

function RegisterScreen({ navigation }) {
  const emailInput = React.createRef();
  const passwordInput = React.createRef();
  const comfirmInput = React.createRef();

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();
  const [loading, toggleLoading] = useStateToggler();
  const [confirm, toggleComfirm] = useStateToggler();
  const [emailExist, toggleEmailExist] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [passNotSame, togglePassNotSame] = useStateToggler();
  const [nameError, toggleNameError] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [passwordError, togglePasswordError] = useStateToggler();
  const [konfirmasiError, toggleKonfirmasiError] = useStateToggler();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      toggleComfirm();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      toggleComfirm();
      return true;
    });
  }, []);

  const register = (name, email, password, confirmPassword) => {
    toggleLoading();

    authRegister(name, email, password, confirmPassword, (response) => {
      switch (response.status) {
        case 201:
          toggleLoading();
          navigation.navigate("Verifikasi", { email: email });
          break;
        case 409:
          toggleLoading();
          toggleEmailExist();
          break;
        case 502:
          toggleLoading();
          togglePassNotSame();
          break;
        default:
          toggleLoading();
          toggleSomething();
          break;
      }
    });
  };

  const doRegister = () => {
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      {nameError ? toggleNameError() : ""}
      {emailError ? toggleEmailError() : ""}
      {passwordError ? togglePasswordError() : ""}
      {konfirmasiError ? toggleKonfirmasiError() : ""}
      register(name, email, password, confirmPassword);
    } else {
      {name == "" ? (nameError ? "" : toggleNameError()) : ""}
      {email == "" ? (emailError ? "" : toggleEmailError()) : ""}
      {password == ""? (passwordError ? "" : togglePasswordError()) : ""}
      {confirmPassword == "" ? konfirmasiError ? "" : toggleKonfirmasiError() : ""}
    }
  }

  return (
    <AScreen>
      <View style={styles.header}>
        <BackButton
          onPress={() => {
            toggleComfirm();
          }}
        />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} persistentScrollbar={true}>
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
          bdColor={nameError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama anda"}
          title={"Nama"}
          rtype={"next"}
          blur={false}
          multi={false}
          onChangeText={(value) => {
            setName(value);
          }}
          submit={() => {
            {nameError ? toggleNameError() : ""}
            emailInput.current.focus();
          }}
        />

        {nameError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nama kosong
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={emailError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan email anda"}
          title={"Email"}
          rtype={"next"}
          blur={false}
          padding={20}
          multi={false}
          onChangeText={(value) => {
            setEmail(value);
          }}
          ref={emailInput}
          submit={() => {
            {emailError ? toggleEmailError() : ""}
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
          rtype={"next"}
          bdColor={
            passwordError ? color.error.error300 : color.neutral.neutral300
          }
          ref={passwordInput}
          blur={false}
          onChangeText={(value) => {
            setPassword(value);
          }}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
          submit={() => {
            {passwordError ? togglePasswordError() : ""}
            comfirmInput.current.focus();
          }}
        />

        <AText
          style={{ paddingTop: 6 }}
          color={
            passwordError ? color.error.error300 : color.neutral.neutral300
          }
          size={14}
          weight="normal"
        >
          Minimal 8 karakter: Hanya huruf, angka, dan simbol
        </AText>

        <APasswordInput
          hint={"Masukkan password anda"}
          title={"Konfirmasi Password"}
          bdColor={
            konfirmasiError || passNotSame
              ? color.error.error300
              : color.neutral.neutral300
          }
          rtype={"done"}
          blur={true}
          onChangeText={(value) => {
            setconfirmPassword(value);
          }}
          submit={() => {
            {konfirmasiError ? toggleKonfirmasiError() : ""}
          }}
          ref={comfirmInput}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
        />

        {konfirmasiError ? (
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

        {passNotSame ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Konfirmasi password tidak sama
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={styles.register}
          mode="contained"
          title="Daftar"
          onPress={() => {
            doRegister();
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
            Sudah punya akun?
          </AText>

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Log in
            </AText>
          </Pressable>
        </View>
      </ScrollView>
      <AConfirmationDialog
        title={"Kembali?"}
        desc={"Apakah Anda yakin ingin kembali, perubahan tidak akan disimpan"}
        visibleModal={confirm}
        btnOK={"Kembali"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          setEmail("");
          setName("");
          setPassword("");
          setconfirmPassword("");
          navigation.goBack();
        }}
      />
      <ADialog
        title={"Peringatan!"}
        desc={"Email sudah digunakan"}
        visibleModal={emailExist}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleEmailExist();
        }}
      />
      <ADialog
        title={"Peringatan!"}
        desc={"Telah terjadi sesuatu yang buruk pada server kami"}
        visibleModal={something}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSomething();
        }}
      />
      <ALoading visibleModal={loading} />
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
    flexGrow: 1,
  },
  register: {
    marginTop: 32,
  },
});

export default RegisterScreen;

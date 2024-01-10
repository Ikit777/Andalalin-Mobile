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
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { authRegister } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import { UserContext } from "../context/UserContext";
import { Checkbox } from "react-native-paper";

function RegisterScreen({ navigation }) {
  const emailInput = React.createRef();
  const nomorInput = React.createRef();
  const passwordInput = React.createRef();
  const comfirmInput = React.createRef();
  const context = useContext(UserContext);

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();
  const [confirm, toggleComfirm] = useStateToggler();
  const [emailExist, toggleEmailExist] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [passNotSame, togglePassNotSame] = useStateToggler();
  const [nameError, toggleNameError] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [nomorError, toggleNomorError] = useStateToggler();
  const [passwordError, togglePasswordError] = useStateToggler();
  const [konfirmasiError, toggleKonfirmasiError] = useStateToggler();
  const [emailNotExist, toggleEmailNotExist] = useStateToggler();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nomor, setNomor] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [setuju, setSetuju] = useState(false);

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

  const register = (name, email, nomor, password, confirmPassword) => {
    context.toggleLoading(true);

    authRegister(name, email, nomor, password, confirmPassword, (response) => {
      switch (response.status) {
        case 201:
          context.toggleLoading(false);
          navigation.push("Verifikasi", { email: email });
          break;
        case 409:
          context.toggleLoading(false);
          toggleEmailExist();
          break;
        case 204:
          context.toggleLoading(false);
          toggleEmailNotExist();
          break;
        case 502:
          context.toggleLoading(false);
          togglePassNotSame();
          break;
        default:
          context.toggleLoading(false);
          toggleSomething();
          break;
      }
    });
  };

  const doRegister = () => {
    if (name != "" && email != "" && nomor != "" && password != "" && confirmPassword != "") {
      {
        nameError ? toggleNameError() : "";
      }
      {
        emailError ? toggleEmailError() : "";
      }
      {
        nomorError ? toggleNomorError() : "";
      }
      {
        passwordError ? togglePasswordError() : "";
      }
      {
        konfirmasiError ? toggleKonfirmasiError() : "";
      }
      register(name, email, nomor, password, confirmPassword);
    } else {
      {
        name == "" ? (nameError ? "" : toggleNameError()) : "";
      }
      {
        email == "" ? (emailError ? "" : toggleEmailError()) : "";
      }
      {
        nomor == "" ? (nomorError ? "" : toggleNomorError()) : "";
      }
      {
        password == "" ? (passwordError ? "" : togglePasswordError()) : "";
      }
      {
        confirmPassword == ""
          ? konfirmasiError
            ? ""
            : toggleKonfirmasiError()
          : "";
      }
    }
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <BackButton
          onPress={() => {
            toggleComfirm();
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
          bdColor={nameError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama anda"}
          title={"Nama lengkap"}
          rtype={"next"}
          blur={false}
          multi={false}
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
          submit={() => {
            {
              nameError ? toggleNameError() : "";
            }
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
            Nama lengkap wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={emailError ? color.error.error300 : color.neutral.neutral300}
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
          }}
          ref={emailInput}
          submit={() => {
            {
              emailError ? toggleEmailError() : "";
            }
            nomorInput.current.focus();
          }}
        />

        {emailError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Email wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={nomorError ? color.error.error300 : color.neutral.neutral300}
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
          }}
          ref={nomorInput}
          submit={() => {
            {
              nomorError ? toggleNomorError() : "";
            }
            passwordInput.current.focus();
          }}
        />

        {nomorError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nomor telepon kosong
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
          value={password}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
          submit={() => {
            {
              passwordError ? togglePasswordError() : "";
            }
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
            {
              konfirmasiError ? toggleKonfirmasiError() : "";
              passNotSame ? togglePassNotSame() : "";
            }
          }}
          value={confirmPassword}
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
            Konfirmasi password tidak sama dengan password
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
              navigation.push("Back Login");
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Log in
            </AText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AConfirmationDialog
        title={"Peringatan!"}
        desc={"Apakah Anda yakin ingin kembali, data tidak akan disimpan"}
        visibleModal={confirm}
        btnOK={"OK"}
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
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={something}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSomething();
        }}
      />

      <ADialog
        title={"Peringatan!"}
        desc={
          "Email tidak dapat ditemukan, silahkan masukkan email dengan benar"
        }
        visibleModal={emailNotExist}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleEmailNotExist();
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

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ATextInput from "../component/utility/ATextInput";
import ADropDown from "../component/utility/ADropDown";
import APasswordInput from "../component/utility/APasswordInput";
import { usePasswordVisibility } from "../hooks/usePasswordVisibility";
import AButton from "../component/utility/AButton";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import { tambahUser } from "../api/user";
import { UserContext } from "../context/UserContext";
import ADialog from "../component/utility/ADialog";
import { authRefreshToken } from "../api/auth";
import ASnackBar from "../component/utility/ASnackBar";

function TambahUserScreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const [emailExist, toggleEmailExist] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [berhasil, toggleBerhasil] = useStateToggler();
  const context = useContext(UserContext);
  const [message, setMessage] = useState();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [peran, setPeran] = useState("");
  const [password, setPassword] = useState("");

  const [namaError, setNamaError] = useStateToggler();
  const [emailError, setEmailError] = useStateToggler();
  const [peranError, setPeranError] = useStateToggler();
  const [passwordError, setPasswordError] = useStateToggler();

  const namaRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    usePasswordVisibility();

  const jenis_peran = [
    { value: "Dinas Perhubungan" },
    { value: "Admin" },
    { value: "Operator" },
    { value: "Petugas" },
    { value: "User" },
  ];

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

  const tambah = () => {
    if (nama != "" && email != "" && peran != "" && password != "") {
      {
        namaError ? setNamaError() : "";
      }
      {
        emailError ? setEmailError() : "";
      }
      {
        peranError ? setPeranError() : "";
      }
      {
        passwordError ? setPasswordError() : "";
      }
      tambah_pengguna();
    } else {
      {
        nama == "" ? (namaError ? "" : setNamaError()) : "";
      }
      {
        email == "" ? (emailError ? "" : setEmailError()) : "";
      }
      {
        peran == "" ? (peranError ? "" : setPeranError()) : "";
      }
      {
        password == "" ? (passwordError ? "" : setPasswordError()) : "";
      }
    }
  };

  const showSnackbar = () => {
    toggleBerhasil();
    setNama("");
    setEmail("");
    setPeran("");
    setPassword("");
    setTimeout(() => {
      toggleBerhasil();
    }, 3000);
  };

  const tambah_pengguna = () => {
    context.toggleLoading(true);

    const user = {
      nama: nama,
      email: email,
      peran: peran,
      password: password,
    };

    tambahUser(context.getUser().access_token, user, (response) => {
      switch (response.status) {
        case 201:
          context.toggleLoading(false);
          setMessage("Tambah pengguna berhasil");
          showSnackbar();
          break;
        case 409:
          context.toggleLoading(false);
          toggleEmailExist();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              tambah_pengguna();
            } else {
              context.toggleLoading(false);
              toggleSomething();
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleSomething();
          break;
      }
    });
  };

  useEffect(() => {
    peranError ? setPeranError() : "";
  }, [peran]);

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Tambah pengguna
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <ATextInput
          bdColor={namaError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama"}
          title={"Nama"}
          rtype={"next"}
          blur={false}
          multi={false}
          value={nama}
          ref={namaRef}
          onChangeText={(value) => {
            setNama(value);
          }}
          submit={() => {
            {
              namaError ? setNamaError() : "";
            }
            emailRef.current.focus();
          }}
        />

        {namaError ? (
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
          hint={"Masukkan email"}
          title={"Email"}
          rtype={"done"}
          padding={20}
          multi={false}
          value={email}
          ref={emailRef}
          onChangeText={(value) => {
            setEmail(value);
          }}
          submit={() => {
            {
              emailError ? setEmailError() : "";
            }
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

        <ADropDown
          bdColor={peranError ? color.error.error300 : color.neutral.neutral300}
          judul={"Peran"}
          hint={"Pilih peran"}
          data={jenis_peran}
          padding={20}
          selected={setPeran}
          max={500}
          saved={peran}
        />
        {peranError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Peran belum dipilih
          </AText>
        ) : (
          ""
        )}

        <APasswordInput
          hint={"Masukkan password"}
          title={"Password"}
          rtype={"done"}
          bdColor={
            passwordError ? color.error.error300 : color.neutral.neutral300
          }
          value={password}
          ref={passwordRef}
          onChangeText={(value) => {
            setPassword(value);
          }}
          submit={() => {
            {
              passwordError ? setPasswordError() : "";
            }
          }}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
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

        <AButton
          style={{ marginTop: 32, marginBottom: 50 }}
          title={"Tambah"}
          mode="contained"
          onPress={() => {
            toggleComfirm();
          }}
        />
      </ScrollView>

      <View style={{ paddingHorizontal: 16 }}>
        {berhasil ? <ASnackBar visible={berhasil} message={message} /> : ""}
      </View>

      <AConfirmationDialog
        title={"Tambah pengguna"}
        desc={"Apakah Anda yakin ingin tambah pengguna?"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          tambah();
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
        title={"Tambah pengguna gagal"}
        desc={"Tambah pengguna gagal, silahkan coba kembali"}
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
    paddingTop: 16,
    height: 64,
  },
  content: {
    padding: 16,
  },
});

export default TambahUserScreen;

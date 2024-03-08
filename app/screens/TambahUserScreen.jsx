import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, ScrollView, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ATextInput from "../component/utility/ATextInput";
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
import ADropDownCostume from "../component/utility/ADropdownCostume";

function TambahUserScreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const [emailExist, toggleEmailExist] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [berhasil, toggleBerhasil] = useStateToggler();
  const [emailNotExist, toggleEmailNotExist] = useStateToggler();
  const context = useContext(UserContext);
  const [message, setMessage] = useState();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomor, setNomor] = useState("");
  const [peran, setPeran] = useState("");
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");

  const [namaError, setNamaError] = useStateToggler();
  const [emailError, setEmailError] = useStateToggler();
  const [nomorError, setNomorError] = useStateToggler();
  const [peranError, setPeranError] = useStateToggler();
  const [nipError, setNipError] = useStateToggler();
  const [passwordError, setPasswordError] = useStateToggler();
  const [formError, toggleFormError] = useStateToggler();

  const namaRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const nipRef = React.createRef();
  const nomorRef = React.createRef();

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
    if (peran != "" && peran != "User") {
      if (
        nama != "" &&
        email != "" &&
        nomor != "" &&
        peran != "" &&
        nip != "" &&
        password != ""
      ) {
        if (!emailNotExist && !emailExist) {
          namaError ? setNamaError() : "";
          emailError ? setEmailError() : "";
          nomorError ? setNomorError() : "";
          peranError ? setPeranError() : "";
          passwordError ? setPasswordError() : "";
          nipError ? setNipError() : "";
          formError ? toggleFormError() : "";

          tambah_pengguna();
        }
      } else {
        nama == "" ? (namaError ? "" : setNamaError()) : "";
        email == "" ? (emailError ? "" : setEmailError()) : "";
        nomor == "" ? (nomorError ? "" : setNomorError()) : "";
        peran == "" ? (peranError ? "" : setPeranError()) : "";
        nip == "" ? (nipError ? "" : setNipError()) : "";
        password == "" ? (passwordError ? "" : setPasswordError()) : "";
        formError ? "" : toggleFormError();
      }
    } else {
      if (
        nama != "" &&
        email != "" &&
        nomor != "" &&
        peran != "" &&
        password != ""
      ) {
        if (!emailNotExist && !emailExist) {
          namaError ? setNamaError() : "";
          emailError ? setEmailError() : "";
          nomorError ? setNomorError() : "";
          peranError ? setPeranError() : "";
          passwordError ? setPasswordError() : "";
          formError ? toggleFormError() : "";

          tambah_pengguna();
        }
      } else {
        nama == "" ? (namaError ? "" : setNamaError()) : "";
        email == "" ? (emailError ? "" : setEmailError()) : "";
        nomor == "" ? (nomorError ? "" : setNomorError()) : "";
        peran == "" ? (peranError ? "" : setPeranError()) : "";
        password == "" ? (passwordError ? "" : setPasswordError()) : "";
        formError ? "" : toggleFormError();
      }
    }
  };

  const showSnackbar = () => {
    toggleBerhasil();
    setNama("");
    setEmail("");
    setNomor("");
    setPeran("");
    setNomor("");
    setPassword("");
    setNip("");
    setTimeout(() => {
      toggleBerhasil();
    }, 3000);
  };

  const tambah_pengguna = () => {
    context.toggleLoading(true);

    const user = {
      nama: nama,
      email: email,
      nomor: nomor,
      peran: peran,
      nip: nip,
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
    clear_error();
  }, [peran]);

  const clear_error = () => {
    if (peran != "" && peran != "User") {
      nama != "" ? (namaError ? setNamaError() : "") : "";
      email != "" && !emailNotExist ? (emailError ? setEmailError() : "") : "";
      nomor != "" ? (nomorError ? setNomorError() : "") : "";
      peran != "" ? (peranError ? setPeranError() : "") : "";
      nip != "" ? (nipError ? setNipError() : "") : "";

      nama != "" &&
      email != "" &&
      nomor != "" &&
      peran != "" &&
      nip != "" &&
      password != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
    } else {
      nama != "" ? (namaError ? setNamaError() : "") : "";
      email != "" && !emailNotExist ? (emailError ? setEmailError() : "") : "";
      nomor != "" ? (nomorError ? setNomorError() : "") : "";
      peran != "" ? (peranError ? setPeranError() : "") : "";

      nama != "" && email != "" && nomor != "" && peran != "" && password != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      emailError ? "" : setEmailError();
      emailNotExist ? "" : toggleEmailNotExist();
    } else {
      emailError ? setEmailError() : "";
      emailNotExist ? toggleEmailNotExist() : "";
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
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
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
        <ADropDownCostume
          bdColor={peranError ? color.error.error500 : color.neutral.neutral300}
          judul={"Peran"}
          hint={"Pilih peran"}
          data={jenis_peran}
          selected={setPeran}
          max={400}
          saved={peran}
        />

        <ATextInput
          bdColor={namaError ? color.error.error500 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama"}
          title={"Nama lengkap"}
          rtype={"next"}
          padding={20}
          blur={false}
          multi={false}
          value={nama}
          ref={namaRef}
          onChangeText={(value) => {
            setNama(value);
            clear_error();
          }}
          submit={() => {
            clear_error();
            nama != "" ? emailRef.current.focus() : "";
          }}
        />

        <ATextInput
          bdColor={emailError ? color.error.error500 : color.neutral.neutral300}
          hint={"Masukkan email"}
          title={"Email"}
          rtype={"next"}
          padding={20}
          blur={false}
          multi={false}
          value={email}
          ref={emailRef}
          ktype={"email-address"}
          inputMode={"email"}
          onChangeText={(value) => {
            setEmail(value);
            if (value.length > 0) {
              validateEmail(value);
            } else {
              emailError ? setEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
            clear_error();
          }}
          submit={() => {
            if (email.length > 0) {
              validateEmail(email);
            } else {
              emailError ? setEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
            clear_error();
            email != "" ? nomorRef.current.focus() : "";
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
          hint={"Masukkan nomor"}
          title={"Nomor telepon"}
          rtype={"next"}
          padding={20}
          blur={false}
          multi={false}
          value={nomor}
          ref={nomorRef}
          ktype={"number-pad"}
          onChangeText={(value) => {
            setNomor(value);
            clear_error();
          }}
          submit={() => {
            clear_error();

            if (peran != "" && peran != "User") {
              nomor != "" ? nipRef.current.focus() : "";
            } else {
              nomor != "" ? passwordRef.current.focus() : "";
            }
          }}
        />

        {peran != "User" && peran != "" ? (
          <View>
            <ATextInput
              bdColor={
                nipError ? color.error.error500 : color.neutral.neutral300
              }
              hint={"Masukkan nip"}
              title={"NIP"}
              rtype={"next"}
              padding={20}
              blur={false}
              multi={false}
              value={nip}
              ref={nipRef}
              ktype={"number-pad"}
              onChangeText={(value) => {
                setNip(value);
                clear_error();
              }}
              submit={() => {
                clear_error();

                nip != "" ? passwordRef.current.focus() : "";
              }}
            />
          </View>
        ) : (
          ""
        )}

        <APasswordInput
          hint={"Masukkan password"}
          title={"Password"}
          padding={20}
          rtype={"done"}
          bdColor={
            passwordError ? color.error.error500 : color.neutral.neutral300
          }
          value={password}
          ref={passwordRef}
          onChangeText={(value) => {
            setPassword(value);
            if (value.length > 0 && value.length < 8) {
              passwordError ? "" : setPasswordError();
            } else {
              passwordError ? setPasswordError() : "";
            }
            clear_error();
          }}
          submit={() => {
            if (password.length > 0 && password.length < 8) {
              passwordError ? "" : setPasswordError();
            } else {
              passwordError ? setPasswordError() : "";
            }
            clear_error();
          }}
          passwordVisibility={passwordVisibility}
          handlePasswordVisibility={handlePasswordVisibility}
          rightIcon={rightIcon}
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
        desc={"Apakah Anda yakin ingin menambah pengguna?"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
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
        title={"Tambah pengguna"}
        desc={"Tambah pengguna gagal dilakukan, silahkan coba lagi lain waktu"}
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
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default TambahUserScreen;

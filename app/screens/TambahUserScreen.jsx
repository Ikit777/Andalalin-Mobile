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
        {
          namaError ? setNamaError() : "";
        }
        {
          emailError ? setEmailError() : "";
        }
        {
          nomorError ? setNomorError() : "";
        }
        {
          peranError ? setPeranError() : "";
        }
        {
          passwordError ? setPasswordError() : "";
        }
        {
          nipError ? setNipError() : "";
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
          nomor == "" ? (nomorError ? "" : setNomorError()) : "";
        }
        {
          peran == "" ? (peranError ? "" : setPeranError()) : "";
        }
        {
          nip == "" ? (nipError ? "" : setNipError()) : "";
        }
        {
          password == "" ? (passwordError ? "" : setPasswordError()) : "";
        }
      }
    } else {
      if (nama != "" && email != "" && nomor != "" && peran != "" && password != "") {
        {
          namaError ? setNamaError() : "";
        }
        {
          emailError ? setEmailError() : "";
        }
        {
          nomorError ? setNomorError() : "";
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
          nomor == "" ? (nomorError ? "" : setNomorError()) : "";
        }
        {
          peran == "" ? (peranError ? "" : setPeranError()) : "";
        }
        {
          password == "" ? (passwordError ? "" : setPasswordError()) : "";
        }
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
        case 204:
          context.toggleLoading(false);
          toggleEmailNotExist();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              tambah_pengguna();
            } else {
              context.toggleLoading(false);
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
            style={{ paddingLeft: 4}}
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
          bdColor={peranError ? color.error.error300 : color.neutral.neutral300}
          judul={"Peran"}
          hint={"Pilih peran"}
          data={jenis_peran}
          selected={setPeran}
          max={400}
          saved={peran}
        />
        {peranError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Peran wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={namaError ? color.error.error300 : color.neutral.neutral300}
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
          }}
          submit={() => {
            {
              namaError ? setNamaError() : "";
            }
            {
              nama != "" ? emailRef.current.focus() : "";
            }
          }}
        />

        {namaError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nama wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={emailError ? color.error.error300 : color.neutral.neutral300}
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
          }}
          submit={() => {
            {
              emailError ? setEmailError() : "";
            }

              {
                email != "" ? nomorRef.current.focus() : "";
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
            Email wajib
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={nomorError ? color.error.error300 : color.neutral.neutral300}
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
          }}
          submit={() => {
            {
              nomorError ? setNomorError() : "";
            }

            if (peran != "" && peran != "User") {
              {
                nomor != "" ? nipRef.current.focus() : "";
              }
            } else {
              {
                nomor != "" ? passwordRef.current.focus() : "";
              }
            }
          }}
        />

        {nomorError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nomor telepon wajib
          </AText>
        ) : (
          ""
        )}

        {peran != "User" && peran != "" ? (
          <View>
            <ATextInput
              bdColor={
                nipError ? color.error.error300 : color.neutral.neutral300
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
              }}
              submit={() => {
                {
                  nipError ? setNipError() : "";
                }
                {
                  nip != "" ? passwordRef.current.focus() : "";
                }
              }}
            />

            {nipError ? (
              <AText
                style={{ paddingTop: 6 }}
                color={color.error.error500}
                size={14}
                weight="normal"
              >
                NIP wajib
              </AText>
            ) : (
              ""
            )}
          </View>
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
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={something}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSomething();
        }}
      />

      <ADialog
        title={"Tambah pengguna gagal"}
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
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default TambahUserScreen;

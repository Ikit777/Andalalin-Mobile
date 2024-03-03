import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ATextInput from "../component/utility/ATextInput";
import { UserContext } from "../context/UserContext";
import { useStateToggler } from "../hooks/useUtility";
import ASnackBar from "../component/utility/ASnackBar";
import { authRefreshToken } from "../api/auth";
import AButton from "../component/utility/AButton";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import ADialog from "../component/utility/ADialog";
import { editUser } from "../api/user";
import { store } from "../utils/local-storage";

function EditAkunScreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const [emailExist, toggleEmailExist] = useStateToggler();
  const [something, toggleSomething] = useStateToggler();
  const [berhasil, toggleBerhasil] = useStateToggler();
  const context = useContext(UserContext);
  const [message, setMessage] = useState();

  const [nama, setNama] = useState(context.getUser().nama);
  const [email, setEmail] = useState(context.getUser().email);
  const [nip, setNip] = useState(context.getUser().nip);
  const [nomor, setNomor] = useState(context.getUser().nomor);

  const [namaError, setNamaError] = useStateToggler();
  const [emailError, setEmailError] = useStateToggler();
  const [nipError, setNipError] = useStateToggler();
  const [nomorError, setNomorError] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();
  const [emailNotExist, toggleEmailNotExist] = useStateToggler();

  const namaRef = React.createRef();
  const emailRef = React.createRef();
  const nomorRef = React.createRef();
  const nipRef = React.createRef();

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

  const showSnackbar = () => {
    toggleBerhasil();
    setTimeout(() => {
      toggleBerhasil();
    }, 3000);
  };

  const edit = () => {
    context.toggleLoading(true);

    const user = {
      nama: nama,
      email: email,
      nip: context.getUser().role != "User" ? nip : "",
      nomor: nomor,
    };

    editUser(context.getUser().access_token, user, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.data;
            const newAuthState = {
              access_token: context.getUser().access_token,
              refresh_token: context.getUser().refresh_token,
              id: result.data.id,
              nama: result.data.name,
              email: result.data.email,
              nomor: result.data.nomor,
              role: result.data.role,
              photo: result.data.photo,
              nip: result.data.nip,
            };
            store("authState", newAuthState);
            if (namaRef.current) {
              namaRef.current.blur();
            }
            if (emailRef.current) {
              emailRef.current.blur();
            }
            if (nomorRef.current) {
              nomorRef.current.blur();
            }
            if (nipRef.current) {
              nipRef.current.blur();
            }
            context.toggleLoading(false);
            setMessage("Perubahan akun berhasil");
            showSnackbar();
          })();
          break;
        case 409:
          context.toggleLoading(false);
          toggleEmailExist();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              edit();
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

  const press = () => {
    if (context.getUser().role != "User") {
      if (nama != "" && email != "" && nomor != "" && nip != "") {
        if (!emailNotExist) {
          namaError ? setNamaError() : "";

          emailError ? setEmailError() : "";

          nomorError ? setNomorError() : "";

          nipError ? setNipError() : "";

          formError ? toggleFormError() : "";

          edit();
        }
      } else {
        nama == "" ? (namaError ? "" : setNamaError()) : "";

        email == "" ? (emailError ? "" : setEmailError()) : "";

        nomor == "" ? (nomorError ? "" : setNomorError()) : "";

        nip == "" ? (nipError ? "" : setNipError()) : "";

        formError ? "" : toggleFormError();
      }
    } else {
      if (nama != "" && email != "" && nomor != "") {
        if (!emailNotExist) {
          namaError ? setNamaError() : "";

          emailError ? setEmailError() : "";

          nomorError ? setNomorError() : "";

          formError ? toggleFormError() : "";

          edit();
        }
      } else {
        nama == "" ? (namaError ? "" : setNamaError()) : "";

        email == "" ? (emailError ? "" : setEmailError()) : "";

        nomor == "" ? (nomorError ? "" : setNomorError()) : "";

        formError ? "" : toggleFormError();
      }
    }
  };

  const clear_error = () => {
    if (context.getUser().role != "User") {
      nama != "" ? (namaError ? setNamaError() : "") : "";
      email != "" && !emailNotExist ? (emailError ? setEmailError() : "") : "";
      nomor != "" ? (nomorError ? setNomorError() : "") : "";
      nip != "" ? (nipError ? setNipError() : "") : "";

      nama != "" && email != "" && nomor != "" && nip != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
    } else {
      nama != "" ? (namaError ? setNamaError() : "") : "";
      email != "" && !emailNotExist ? (emailError ? setEmailError() : "") : "";
      nomor != "" ? (nomorError ? setNomorError() : "") : "";

      nama != "" && email != "" && nomor != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
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
            Perbarui akun
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <ATextInput
          bdColor={namaError ? color.error.error500 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama"}
          title={"Nama lengkap"}
          rtype={"next"}
          blur={false}
          multi={false}
          value={nama}
          ref={namaRef}
          onChangeText={(value) => {
            clear_error();
            setNama(value);
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
          multi={false}
          blur={false}
          value={email}
          ref={emailRef}
          ktype={"email-address"}
          inputMode={"email"}
          onChangeText={(value) => {
            clear_error();
            setEmail(value);
            if (value.length > 0) {
              validateEmail(value);
            } else {
              emailError ? setEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
          }}
          submit={() => {
            clear_error();
            if (email.length > 0) {
              validateEmail(email);
            } else {
              emailError ? setEmailError() : "";
              emailNotExist ? toggleEmailNotExist() : "";
            }
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
          ktype={"number-pad"}
          hint={"Masukkan nomor"}
          title={"Nomor telepon"}
          rtype={context.getUser().role != "User" ? "next" : "done"}
          blur={context.getUser().role != "User" ? false : true}
          padding={20}
          multi={false}
          value={nomor}
          ref={nomorRef}
          onChangeText={(value) => {
            clear_error();
            setNomor(value);
          }}
          submit={() => {
            clear_error();
            if (context.getUser().role != "User") {
              nomor != "" ? nipRef.current.focus() : "";
            }
          }}
        />

        {context.getUser().role != "User" ? (
          <View>
            <ATextInput
              bdColor={
                nipError ? color.error.error500 : color.neutral.neutral300
              }
              hint={"Masukkan nip"}
              title={"NIP"}
              rtype={"done"}
              padding={20}
              multi={false}
              value={nip}
              ref={nipRef}
              ktype={"number-pad"}
              onChangeText={(value) => {
                clear_error();
                setNip(value);
              }}
              submit={() => {
                clear_error();
                nipError ? setNipError() : "";
              }}
            />
          </View>
        ) : (
          ""
        )}

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

        <AButton
          style={{ marginTop: 32, marginBottom: 50 }}
          title={"Simpan"}
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
        title={"Simpan perubahan"}
        desc={"Apakah Anda yakin ingin menyimpan perubahan?"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          press();
        }}
      />

      <ADialog
        title={"Peringatan"}
        desc={"Email sudah digunakan"}
        visibleModal={emailExist}
        toggleModal={toggleEmailExist}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleEmailExist();
        }}
      />

      <ADialog
        title={"Perubahan gagal disimpan"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={something}
        toggleModal={toggleSomething}
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

export default EditAkunScreen;

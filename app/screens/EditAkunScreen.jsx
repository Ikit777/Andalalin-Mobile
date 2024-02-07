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
  const [emailNotExist, toggleEmailNotExist] = useStateToggler();
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
            Object.assign(context.user, newAuthState);
            context.setUser(newAuthState);
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
        case 204:
          context.toggleLoading(false);
          toggleEmailNotExist();
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

  const press = () => {
    if (context.getUser().role != "User") {
      if (nama != "" && email != "" && nomor != "" && nip != "") {
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
          nipError ? setNipError() : "";
        }
        edit();
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
          nip == "" ? (nipError ? "" : setNipError()) : "";
        }
      }
    } else {
      if (nama != "" && email != "" && nomor != "") {
        {
          namaError ? setNamaError() : "";
        }
        {
          emailError ? setEmailError() : "";
        }
        {
          nomorError ? setNomorError() : "";
        }
        edit();
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
          bdColor={namaError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nama"}
          title={"Nama lengkap"}
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
          multi={false}
          blur={false}
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
            setNomor(value);
          }}
          submit={() => {
            {
              nomorError ? setNomorError() : "";
            }
            if (context.getUser().role != "User") {
              {
                nomor != "" ? nipRef.current.focus() : "";
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

        {context.getUser().role != "User" ? (
          <View>
            <ATextInput
              bdColor={
                nipError ? color.error.error300 : color.neutral.neutral300
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
                setNip(value);
              }}
              submit={() => {
                {
                  nipError ? setNipError() : "";
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
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleEmailExist();
        }}
      />

      <ADialog
        title={"Perubahan gagal disimpan"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={something}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSomething();
        }}
      />

      <ADialog
        title={"Perubahan gagal disimpan"}
        desc={
          "Email tidak tidak tersedia, masukkan email dengan benar"
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

export default EditAkunScreen;

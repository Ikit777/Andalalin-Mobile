import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  BackHandler,
  ScrollView,
  Linking,
} from "react-native";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import AText from "../component/utility/AText";
import color from "../constants/color";
import { UserContext } from "../context/UserContext";
import ASettingItem from "../component/utility/ASettingItem";
import AButton from "../component/utility/AButton";
import { useStateToggler } from "../hooks/useUtility";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { authLogout, authForgotPassword, authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import { get, remove, store } from "../utils/local-storage";
import * as ImagePicker from "expo-image-picker";
import { userUpdatePhoto } from "../api/user";
import { masterGetPanduan } from "../api/master";
import { StorageAccessFramework } from "expo-file-system";
import ASnackBar from "../component/utility/ASnackBar";
import * as FileSystem from "expo-file-system";

function SettingScreen({ navigation }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();
  const [fotoBerhasil, toggleFotoBerhasil] = useStateToggler();
  const [fotoGagal, toggleFotoGagal] = useStateToggler();
  const [permission, togglePermission] = useStateToggler();
  const [forgotError, toggleForgotError] = useStateToggler();

  const [downloadConfirm, toggleDownloadConfirm] = useStateToggler();
  const [uri, setUri] = useState();

  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();

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

  const showSnackbar = () => {
    setSnackbarVisible();
    setTimeout(() => {
      setSnackbarVisible();
    }, 3000);
  };

  const logout = () => {
    authLogout(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          context.toggleLoading(false);
          remove(context.getUser().id);
          remove("authState");
          navigation.replace("Login");
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              logout();
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleGagal();
          break;
      }
    });
  };

  const forgot = (email) => {
    context.toggleLoading(true);
    authForgotPassword(email, (response) => {
      if (response.status === 200) {
        context.toggleLoading(false);
        navigation.navigate("Reset", { email: email, kondisi: "Logged" });
      } else {
        context.toggleLoading(false);
        toggleForgotError();
      }
    });
  };

  const change = (uri) => {
    userUpdatePhoto(uri, context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          context.toggleLoading(false);
          (async () => {
            const result = await response.data;
            const newAuthState = {
              access_token: context.getUser().access_token,
              refresh_token: context.getUser().refresh_token,
              id: context.getUser().id,
              nama: context.getUser().nama,
              email: context.getUser().email,
              nomor: context.getUser().nomor,
              role: context.getUser().role,
              photo: result.photo,
              nip: context.getUser().nip,
            };
            store("authState", newAuthState);
            toggleFotoBerhasil();
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              change();
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleFotoGagal();
          break;
      }
    });
  };

  const profile = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      togglePermission();
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!imagePickerResult.canceled) {
      context.toggleLoading(true);
      change(imagePickerResult.assets[0].uri);
    }
  };

  const download = async () => {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    setUri(permissions.directoryUri);
    toggleDownloadConfirm();
  };

  const getDokumen = async () => {
    context.toggleLoading(true);
    masterGetPanduan(
      context.getUser().access_token,
      "Panduan umum",
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;

              await StorageAccessFramework.createFileAsync(
                uri,
                "Panduan.pdf",
                "application/pdf"
              )
                .then(async (uri) => {
                  context.toggleLoading(true);
                  await FileSystem.writeAsStringAsync(uri, result.data, {
                    encoding: FileSystem.EncodingType.Base64,
                  });
                })
                .catch(() => {
                  context.toggleLoading(false);
                  setMessage("Panduan gagal di download atau belum tersedia");
                  showSnackbar();
                })
                .finally(() => {
                  context.toggleLoading(false);
                  setMessage("Panduan berhasil di download");
                  showSnackbar();
                });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                getDokumen();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            setMessage("Panduan gagal di download atau belum tersedia");
            showSnackbar();
            break;
        }
      }
    );
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
            Pengaturan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 64,
              height: 64,
              borderRadius: 150 / 2,
              overflow: "hidden",
            }} // Set your desired dimensions
            source={{ uri: `data:image/png;base64,${context.getUser().photo}` }}
          />
          <View style={{ marginLeft: 16 }}>
            <AText size={16} color={color.neutral.neutral900} weight="normal">
              {context.getUser().nama}
            </AText>
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              {context.getUser().email}
            </AText>
          </View>
        </View>

        <View style={{ paddingTop: 32 }}>
          {context.getUser().role != "Super Admin" ? (
            <ASettingItem
              onPress={() => {
                navigation.navigate("Edit Akun");
              }}
              icon={"user"}
              title={"Perbarui akun"}
            />
          ) : (
            ""
          )}
          <ASettingItem
            icon={"image"}
            title={"Perbarui foto profil"}
            onPress={() => {
              profile();
            }}
          />
          <ASettingItem
            onPress={() => forgot(context.getUser().email)}
            icon={"lock"}
            title={"Kata sandi baru"}
          />

          {context.getUser().role == "User" ? (
            <View>
              <ASettingItem
                icon={"book"}
                title={"Panduan"}
                onPress={() => {
                  download();
                }}
              />

              <ASettingItem
                icon={"book-open"}
                title={"Syarat dan ketentuan"}
                onPress={() => {
                  Linking.openURL(
                    process.env.APP_TERMS ??
                      "https://andalalin.me" + "/syarat-ketentuan"
                  );
                }}
              />

              <ASettingItem
                icon={"shield"}
                title={"Kebijakan privasi"}
                onPress={() => {
                  Linking.openURL(
                    process.env.APP_PRIVACY_POLICY ??
                      "https://andalalin.me" + "/kebijakan-privasi"
                  );
                }}
              />

              <ASettingItem
                icon={"help-circle"}
                title={"Bantuan"}
                onPress={() => {
                  Linking.openURL(
                    "mailto:andalalin.bjm.v1@gmail.com?subject=Bantuan andalalin"
                  );
                }}
              />
            </View>
          ) : (
            ""
          )}

          <ASettingItem
            icon={"info"}
            title={"Tentang"}
            onPress={() => {
              navigation.navigate("Tentang");
            }}
          />
        </View>

        <AButton
          style={{ marginTop: 32 }}
          title={"Keluar"}
          mode="contained"
          onPress={() => {
            toggleKonfirmasi();
          }}
        />
      </ScrollView>
      <AConfirmationDialog
        title={"Keluar"}
        desc={"Apakah Anda yakin ingin keluar dari akun ini?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"Keluar"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          context.toggleLoading(true);
          logout();
        }}
      />
      <ADialog
        title={"Keluar gagal"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <ADialog
        title={"Foto berhasil diperbarui"}
        desc={"Foto profil berhasil diperbarui"}
        visibleModal={fotoBerhasil}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleFotoBerhasil();
        }}
      />

      <ADialog
        title={"Foto gagal diperbarui"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={fotoGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleFotoGagal();
        }}
      />

      <ADialog
        title={"Izin"}
        desc={"Izin untuk mengakses galeri belum diberikan"}
        visibleModal={permission}
        btnOK={"OK"}
        onPressOKButton={() => {
          togglePermission();
        }}
      />

      <ADialog
        title={"Kata sandi baru"}
        desc={"Terjadi kesalahan pada akaun anda, silahkan login kembali"}
        visibleModal={forgotError}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleForgotError();
          remove(context.getUser().id);
          remove("authState");
          navigation.replace("Login");
        }}
      />

      <AConfirmationDialog
        title={"Download"}
        desc={"Panduan akan tersimpan pada folder yang Anda pilih"}
        visibleModal={downloadConfirm}
        toggleVisibleModal={toggleDownloadConfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleDownloadConfirm();
        }}
        onPressOKButton={() => {
          toggleDownloadConfirm();
          getDokumen();
        }}
      />

      <View style={{ paddingHorizontal: 16 }}>
        {isSnackbarVisible ? (
          <ASnackBar visible={isSnackbarVisible} message={message} />
        ) : (
          ""
        )}
      </View>
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

export default SettingScreen;

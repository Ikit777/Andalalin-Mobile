import React, { useEffect, useContext } from "react";
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
import { remove, store } from "../utils/local-storage";
import * as ImagePicker from "expo-image-picker";
import { userUpdatePhoto } from "../api/user";

function SettingScreen({ navigation }) {
  const context = useContext(UserContext);
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();
  const [fotoBerhasil, toggleFotoBerhasil] = useStateToggler();
  const [fotoGagal, toggleFotoGagal] = useStateToggler();
  const [permission, togglePermission] = useStateToggler();

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

  const logout = () => {
    authLogout(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          context.toggleLoading(false);
          remove("authState");
          context.setCheck();
          navigation.replace("Back Login");
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              logout();
            } else {
              context.toggleLoading(false);
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
        navigation.navigate("Reset", { email: email });
      }
    });
  };

  const change = (uri) => {
    userUpdatePhoto(uri, context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          context.toggleLoading(false);
          (async () => {
            const result = await response.json();
            const newAuthState = {
              access_token: context.getUser().access_token,
              refresh_token: context.getUser().refresh_token,
              id: context.getUser().id,
              nama: context.getUser().nama,
              email: context.getUser().email,
              role: context.getUser().role,
              photo: result.photo,
            };
            Object.assign(context.user, newAuthState);
            context.setUser(newAuthState);
            store("authState", newAuthState);
            toggleFotoBerhasil();
          })();
          break;
        case 400:
          context.toggleLoading(false);
          toggleFotoGagal();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              change();
            } else {
              context.toggleLoading(false);
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
            size={24}
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
          <ASettingItem
            onPress={() => forgot(context.getUser().email)}
            icon={"lock"}
            title={"Reset password"}
          />
          <ASettingItem
            icon={"image"}
            title={"Ubah foto profil"}
            onPress={() => {
              profile();
            }}
          />
          <ASettingItem
            icon={"info"}
            title={"Tentang"}
            onPress={() => {
              navigation.navigate("Tentang");
            }}
          />
          {context.getUser().role == "User" ? (
            <View>
              <ASettingItem
                icon={"shield"}
                title={"Kebijakan privasi"}
                onPress={() => {Linking.openURL("https://andalalin.com");}}
              />
              <ASettingItem
                icon={"book-open"}
                title={"Syarat dan ketentuan"}
                onPress={() => {
                  Linking.openURL("https://andalalin.com");
                }}
              />
              <ASettingItem
                icon={"help-circle"}
                title={"Bantuan"}
                onPress={() => {
                  Linking.openURL(
                    "mailto:andalalin@gmail.com?subject=Bantuan andalalin");
                }}
              />
            </View>
          ) : (
            ""
          )}
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
        desc={"Apakah Anda yakin ingin keluar?"}
        visibleModal={konfirmasi}
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
        title={"Foto berhasil diperbaharui"}
        desc={"Foto profil berhasil diperbaharui"}
        visibleModal={fotoBerhasil}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleFotoBerhasil();
        }}
      />

      <ADialog
        title={"Foto gagal diperbaharui"}
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

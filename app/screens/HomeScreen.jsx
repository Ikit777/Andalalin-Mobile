import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  BackHandler,
  ScrollView,
} from "react-native";
import AScreen from "../component/utility/AScreen";
import AMenuCard from "../component/utility/AMenuCard";
import color from "../constants/color";
import AText from "../component/utility/AText";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { UserContext } from "../context/UserContext";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import ADialog from "../component/utility/ADialog";
import { authRefreshToken } from "../api/auth";
import { userMe } from "../api/user";
import ExitApp from "react-native-exit-app";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  const context = useContext(UserContext);
  const [confirm, toggleComfirm] = useStateToggler();
  const [error, toggleError] = useStateToggler();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      navigation.removeListener("beforeRemove", (e) => {
        e.preventDefault();
      });
    };
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  const home = () => {
    switch (context.getUser().role) {
      case "User":
        return (
          <View style={{ paddingBottom: 40 }}>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Andalalin"}
              desc={"Ajukan permohonan untuk pelaksanaan andalalin"}
              onPress={() => {
                navigation.push("Andalalin");
                context.clear();
                context.setIndex(1);
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"alert-triangle"}
              title={"Rambu lalu lintas"}
              desc={
                "Ajukan permohonan untuk pelaksanaan pengadaan rambu lalu lintas"
              }
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                navigation.push("Daftar");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"file-text"}
              title={"Survey kepuasa"}
              desc={"Survey kepuasan masyaratan terhadap layanan kami"}
            />
          </View>
        );
      case "Operator":
        return (
          <View style={{ paddingBottom: 40 }}>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Diajukan" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan selesai"}
              desc={"Daftar permohonan yang telah selesai"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Selesai" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Survei kepuasan masyarakat"}
              desc={
                "Daftar survei kepuasan yang dilakukan masyarakat terhadap aplikasi"
              }
            />
          </View>
        );
      case "Petugas":
        return (
          <View style={{ paddingBottom: 40 }}>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"map-pin"}
              title={"Survei lapangan"}
              desc={"Pengisian data survei lapangan permohonan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Survei" });
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar survei"}
              desc={"Daftar survei yang dilakukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Daftar" });
              }}
            />
          </View>
        );
      case "Super Admin":
        return (
          <View style={{ paddingBottom: 40 }}>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar pengguna"}
              desc={"Daftar pengguna andalalin"}
              onPress={() => {
                navigation.push("Daftar User");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"user-plus"}
              title={"Tambah pengguna"}
              desc={"Tambahkan pengguna baru andalalin"}
              onPress={() => {
                navigation.push("Tambah User");
              }}
            />
          </View>
        );
      case "Admin":
        return (
          <View style={{ paddingBottom: 40 }}>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan selesai"}
              desc={"Daftar permohonan yang telah selesai"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Selesai" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"check-square"}
              title={"Persetujuan dokumen"}
              desc={
                "Persetujuan dokumen terhadap permohonan yang telah di ajukan"
              }
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Persetujuan" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"paperclip"}
              title={"Pengawasan tiket"}
              desc={
                "Pengawasan tiket bertujuan untuk menindaklanjuti usulan tindakan terhadap pelaksanaan survei lapangan"
              }
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Pengawasan" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"archive"}
              title={"Lanjutkan pelaksanaan survei"}
              desc={"Melanjutkan pelaksanaan survei lapangan yang ditunda"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Tertunda" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"edit"}
              title={"Pengelolaan produk"}
              desc={
                "Pengelolaan produk yang diterapkan pada aplikasi andalalin"
              }
              onPress={() => {
                navigation.push("Pengelolaan");
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Survei kepuasan masyarakat"}
              desc={
                "Daftar survei kepuasan yang dilakukan masyarakat terhadap aplikasi"
              }
            />
          </View>
        );
    }
  };

  const me = () => {
    if (context.getUser() != "user") {
      userMe(context.getUser().access_token, (response) => {
        switch (response.status) {
          case 200:
            context.toggleLoading(false);
            context.setCheck("userIsChecked");
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                me();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleError();
            break;
        }
      });
    }
  };

  useEffect(() => {}, []);

  useFocusEffect(
    React.useCallback(() => {
      const timerID = setInterval(() => {
        if (context.getUser() != "user") {
          clearInterval(timerID);
          if (context.check == null) {
            setTimeout(() => {
              me();
            }, 1000);
          }
        }
      }, 1000);
      return () => {
        clearInterval(timerID);
      };
    }, [context.user])
  );

  return (
    <AScreen full statusbar={"light"}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            height: 64,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AText size={16} color={color.text.white} weight="semibold">
            Andalalin
          </AText>
          <View style={{ flexDirection: "row" }}>
            {context.getUser().role == "User" ||
            context.getUser().role == "Operator" ||
            context.getUser().role == "Petugas" ? (
              <Pressable
                style={{ padding: 8, flexDirection: "row" }}
                onPress={() => {
                  navigation.push("Notifikasi");
                  context.setNotification(false);
                }}
              >
                <Feather name="bell" size={18} color="white" />

                {context.notification ? (
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      borderRadius: 15,
                      backgroundColor: color.error.error500,
                    }}
                  />
                ) : (
                  ""
                )}
              </Pressable>
            ) : (
              ""
            )}

            <Pressable
              style={{ alignItems: "center", padding: 8 }}
              onPress={() => {
                navigation.push("Setting");
              }}
            >
              <Feather name="settings" size={18} color="white" />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 36,
            padding: 16,
            backgroundColor: color.text.white,
            marginHorizontal: 16,
            borderRadius: 8,
            marginBottom: 32,
            flexDirection: "row",
            shadowColor: "#101828",
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Image
            style={{
              width: 46,
              height: 46,
              borderRadius: 150 / 2,
              overflow: "hidden",
            }} // Set your desired dimensions
            source={{ uri: `data:image/png;base64,${context.getUser().photo}` }}
          />
          <View style={{ marginLeft: 16 }}>
            <AText size={16} color={color.neutral.neutral900} weight="normal">
              {context.getUser().nama}
            </AText>
            <AText size={12} color={color.neutral.neutral500} weight="normal">
              {context.getUser().email}
            </AText>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        {home()}
      </ScrollView>
      <AConfirmationDialog
        title={"Peringatan!"}
        desc={"Apakah Anda yakin ingin keluar"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          ExitApp.exitApp();
          toggleComfirm();
        }}
      />
      <ADialog
        title={"Error"}
        desc={"Telah terjadi sesuatu, silahkan login kembali"}
        visibleModal={error}
        btnOK={"OK"}
        onPressOKButton={() => {
          navigation.push("Login");
          toggleError();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: color.primary.primary500,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#101828",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    paddingTop: 29,
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default HomeScreen;

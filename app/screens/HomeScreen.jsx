import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  BackHandler,
  ScrollView,
  TouchableOpacity,
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
import ExitApp from "react-native-exit-app";
import { checkMaster, masterAndalalin } from "../api/master";
import { get, remove } from "../utils/local-storage";
import AKategoriBangkitan from "../component/utility/AKategoriBangkitan";
import * as FileSystem from "expo-file-system";
import { inflate } from "react-native-gzip";
import { Buffer } from "buffer";
import { CheckContext } from "../context/CheckContext";

function HomeScreen({ navigation }) {
  const context = useContext(UserContext);
  const check = useContext(CheckContext);
  const [confirm, toggleComfirm] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();
  const [kategoriBangkitan, toggleKategoriBangkitan] = useStateToggler();

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
      (async () => {
        const user = await get("authState");
        const notification = await get(user.id);
        if (notification) {
          context.setNotification(true);
        } else {
          context.setNotification(false);
        }
      })();

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
          <View style={{ paddingBottom: 32 }}>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Analisis Dampak Lalu Lintas"}
              desc={
                "Pengajuan permohonan pelaksanaan analisis dampak lalu lintas"
              }
              onPress={() => {
                context.clear();
                masterData("Andalalin");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"alert-triangle"}
              title={"Perlengkapan lalu lintas"}
              desc={
                "Pengajuan permohonan pelaksanaan pemasangan perlengkapan lalu lintas"
              }
              onPress={() => {
                masterData("Perlalin");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Pengaduan perlengkapan lalu lintas"}
              desc={
                "Sarana aduan perlengkapan yang tidak berfungsi dengan baik atau mengalami kerusakan"
              }
              onPress={() => {
                context.clearSurveiMandiri();
                navigation.push("Survei mandiri");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                masterData("Daftar User");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar pengaduan"}
              desc={"Daftar pengaduan yang telah dilakukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Mandiri" });
              }}
            />
          </View>
        );
      case "Operator":
        return (
          <View style={{ paddingBottom: 32 }}>
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                masterData("Daftar Non User");
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar pengaduan"}
              desc={"Daftar pengaduan yang telah dilakukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Mandiri" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Survei kepuasan masyarakat"}
              desc={
                "Daftar survei kepuasan yang dilakukan masyarakat terhadap aplikasi"
              }
              onPress={() => {
                navigation.push("Kepuasan");
              }}
            />
          </View>
        );
      case "Petugas":
        return (
          <View style={{ paddingBottom: 32 }}>
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
              icon={"map-pin"}
              title={"Survei lapangan"}
              desc={"Pengisian data survei lapangan permohonan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Survei" });
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"alert-triangle"}
              title={"Pemasangan perlalin"}
              desc={"Pengisian data pemasangan perlengkapan lalu lintas"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Pemasangan" });
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Pengaduan perlengkapan lalu lintas"}
              desc={
                "Sarana penyampaian informasi maupun keluhan mengenai perlengkapan jalan yang tidak berfungsi dengan baik atau mengalami kerusakan"
              }
              onPress={() => {
                context.clearSurveiMandiri();
                navigation.push("Survei mandiri");
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar pengaduan"}
              desc={"Daftar pengaduan yang telah dilakukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Mandiri" });
              }}
            />
            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Survei kepuasan masyarakat"}
              desc={
                "Daftar survei kepuasan yang dilakukan masyarakat terhadap aplikasi"
              }
              onPress={() => {
                navigation.push("Kepuasan");
              }}
            />
          </View>
        );
      case "Super Admin":
        return (
          <View style={{ paddingBottom: 32 }}>
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

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar permohonan"}
              desc={"Daftar permohonan yang telah diajukan"}
              onPress={() => {
                masterData("Daftar Non User");
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Pengaduan perlengkapan lalu lintas"}
              desc={
                "Sarana penyampaian informasi maupun keluhan mengenai perlengkapan jalan yang tidak berfungsi dengan baik atau mengalami kerusakan"
              }
              onPress={() => {
                context.clearSurveiMandiri();
                navigation.push("Survei mandiri");
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"list"}
              title={"Daftar pengaduan"}
              desc={"Daftar pengaduan yang telah dilakukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Mandiri" });
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
              onPress={() => {
                navigation.push("Kepuasan");
              }}
            />
          </View>
        );
      case "Admin":
        return (
          <View style={{ paddingBottom: 32 }}>
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
              title={"Daftar pengaduan"}
              desc={"Daftar pengaduan yang telah dilakukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Mandiri" });
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
              onPress={() => {
                navigation.push("Kepuasan");
              }}
            />
          </View>
        );
      case "Dinas Perhubungan":
        return (
          <View style={{ paddingBottom: 32 }}>
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
              title={"Daftar pengaduan"}
              desc={"Daftar pengaduan yang telah dilakukan"}
              onPress={() => {
                navigation.push("Daftar", { kondisi: "Mandiri" });
              }}
            />

            <AMenuCard
              style={{ marginBottom: 20 }}
              icon={"clipboard"}
              title={"Survei kepuasan masyarakat"}
              desc={
                "Daftar survei kepuasan yang dilakukan masyarakat terhadap aplikasi"
              }
              onPress={() => {
                navigation.push("Kepuasan");
              }}
            />
          </View>
        );
    }
  };

  const decompressGzip = async (base64) => {
    try {
      const decompressed = await inflate(base64);
      const decompressedString = Buffer.from(decompressed).toString("utf8");
      console.log("Dekompresi selesai");
      return decompressedString;
    } catch (error) {
      throw new Error(`Terjadi kesalahan saat melakukan dekompresi: ${error}`);
    }
  };

  const masterData = async (kondisi) => {
    context.toggleLoading(true);

    const value = await get("updated");

    if (!value) {
      masterAndalalin((response) => {
        if (response.status === 200) {
          (async () => {
            const result = await response.data;
            decompressGzip(result.data)
              .then((jsonData) => {
                const filePath = `${FileSystem.documentDirectory}data.json`;
                FileSystem.writeAsStringAsync(filePath, jsonData, {
                  encoding: FileSystem.EncodingType.UTF8,
                })
                  .then(() => {
                    context.getDataMaster();

                    switch (kondisi) {
                      case "Andalalin":
                        context.toggleLoading(false);
                        toggleKategoriBangkitan();
                        break;
                      case "Perlalin":
                        context.toggleLoading(false);
                        context.setIndex(1);
                        context.clear();
                        context.setPerlalin({ perlengkapan: [] });
                        navigation.push("Andalalin", {
                          kondisi: "Perlalin",
                        });

                        break;
                      case "Daftar User":
                        navigation.push("Daftar", { kondisi: "Diajukan" });
                        break;
                      case "Daftar Non User":
                        navigation.push("Daftar", { kondisi: "Diajukan" });
                        break;
                    }
                  })
                  .catch((error) => {
                    if (check.isServerOk != false) {
                      context.toggleLoading(false);
                      toggleGagal();
                    }
                  });
              })
              .catch((error) => {
                if (check.isServerOk != false) {
                  context.toggleLoading(false);
                  toggleGagal();
                }
              });
          })();
        } else {
          if (check.isServerOk != false) {
            context.toggleLoading(false);
            toggleGagal();
          }
        }
      });
    } else {
      checkMaster((response) => {
        if (response.status === 200) {
          (async () => {
            const result = await response.data;
            if (result.data.update != value) {
              masterAndalalin((response) => {
                if (response.status === 200) {
                  (async () => {
                    const result = await response.data;
                    decompressGzip(result.data)
                      .then((jsonData) => {
                        const filePath = `${FileSystem.documentDirectory}data.json`;
                        FileSystem.writeAsStringAsync(filePath, jsonData, {
                          encoding: FileSystem.EncodingType.UTF8,
                        })
                          .then(() => {
                            context.getDataMaster();

                            switch (kondisi) {
                              case "Andalalin":
                                context.toggleLoading(false);
                                toggleKategoriBangkitan();
                                break;
                              case "Perlalin":
                                context.toggleLoading(false);
                                context.setIndex(1);
                                context.clear();
                                context.setPerlalin({ perlengkapan: [] });
                                navigation.push("Andalalin", {
                                  kondisi: "Perlalin",
                                });

                                break;
                              case "Daftar User":
                                navigation.push("Daftar", { kondisi: "Diajukan" });
                                break;
                              case "Daftar Non User":
                                navigation.push("Daftar", {
                                  kondisi: "Diajukan",
                                });
                                break;
                            }
                          })
                          .catch((error) => {
                            if (check.isServerOk != false) {
                              context.toggleLoading(false);
                              toggleGagal();
                            }
                          });
                      })
                      .catch((error) => {
                        if (check.isServerOk != false) {
                          context.toggleLoading(false);
                          toggleGagal();
                        }
                      });
                  })();
                } else {
                  if (check.isServerOk != false) {
                    context.toggleLoading(false);
                    toggleGagal();
                  }
                }
              });
            } else {
              context.getDataMaster();

              switch (kondisi) {
                case "Andalalin":
                  context.toggleLoading(false);
                  toggleKategoriBangkitan();
                  break;
                case "Perlalin":
                  context.toggleLoading(false);
                  context.setIndex(1);
                  context.clear();
                  context.setPerlalin({ perlengkapan: [] });
                  navigation.push("Andalalin", {
                    kondisi: "Perlalin",
                  });
                  break;
                case "Daftar User":
                  navigation.push("Daftar", { kondisi: "Diajukan" });
                  break;
                case "Daftar Non User":
                  navigation.push("Daftar", { kondisi: "Diajukan" });
                  break;
              }
            }
          })();
        } else {
          if (check.isServerOk != false) {
            context.toggleLoading(false);
            toggleGagal();
          }
        }
      });
    }
  };

  return (
    <AScreen full statusbar={"light"}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
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
              <TouchableOpacity
                style={{ padding: 8, flexDirection: "row" }}
                onPress={() => {
                  navigation.push("Notifikasi");
                  (async () => {
                    const user = await get("authState");
                    remove(user.id);
                  })();
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
              </TouchableOpacity>
            ) : (
              ""
            )}

            <TouchableOpacity
              style={{ alignItems: "center", padding: 8 }}
              onPress={() => {
                navigation.push("Setting");
              }}
            >
              <Feather name="settings" size={18} color="white" />
            </TouchableOpacity>
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
        title={"Keluar"}
        desc={"Apakah Anda yakin ingin keluar aplikasi?"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
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
        title={"Telah terjadi sesuatu"}
        desc={
          "Aplikasi gagal disiapkan, silahkan buka kembali aplikasi untuk melanjutkan aktivitas"
        }
        visibleModal={gagal}
        toggleModal={toggleGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          ExitApp.exitApp();
        }}
      />

      <AKategoriBangkitan
        visibleModal={kategoriBangkitan}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKategoriBangkitan();
        }}
        onPressOKButton={() => {
          navigation.push("Andalalin", { kondisi: "Andalalin" });
          context.setIndex(1);
          toggleKategoriBangkitan();
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

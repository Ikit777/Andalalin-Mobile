import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  RefreshControl,
  Pressable,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ACardPermohonan from "../component/utility/ACardPermohonan";
import {
  andalalinGetAllByTiketLevel2,
  andalalinGetAllSurvei,
  andalalinGetByIdUser,
  andalalinGetByStatus,
  andalalinGetByTiketLevel1,
  andalalinGetByTiketLevel2,
  andalalinGetUsulanTindakan,
  andalalinTindakan,
} from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import { Feather } from "@expo/vector-icons";
import ABottomSheet from "../component/utility/ABottomSheet";
import { RadioButton } from "react-native-paper";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";

function DaftarScreen({ navigation, route }) {
  const [gagal, toggleGagal] = useStateToggler();
  const [surveiGagal, toggleSurveiGagal] = useStateToggler();
  const [usulanGagal, toggleUsulanGagal] = useStateToggler();
  const [permohonan, setPermohonan] = useState("permohonan");
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);

  const [lanjutkanModal, toggleLanjutkanModal] = useStateToggler();
  const [lanjutkanCheck, setLanjutanCheck] = useState();
  const [idPermohonan, setIdPermohonan] = useState();
  const [confirm, toggleComfirm] = useStateToggler();
  const [lanjutkanGagal, toggleLanjutkanGagal] = useStateToggler();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.setOptions({ animation: "slide_from_right" });
        navigation.replace("Back Home");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.setOptions({ animation: "slide_from_right" });
        navigation.replace("Back Home");
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setPermohonan("permohonan");
      switch (context.getUser().role) {
        case "User":
          context.toggleLoading(true);
          loadDaftarPermohonan();
          break;
        case "Operator":
          context.toggleLoading(true);
          if (kondisi == "Diajukan" && kondisi != undefined) {
            loadDaftarByTiketLevel1();
          } else {
            loadPermohonanByStatus("Permohonan selesai");
          }

          break;
        case "Petugas":
          context.toggleLoading(true);
          if (kondisi == "Survei" && kondisi != undefined) {
            loadDaftarByTiketLevel2("Buka");
          } else {
            loadDaftarSurvei();
          }
          break;
        case "Admin":
          context.toggleLoading(true);
          switch (kondisi) {
            case "Persetujuan":
              loadPermohonanByStatus("Persetujuan dokumen");
              break;
            case "Pengawasan":
              loadUsulanTindakan();
              break;
            case "Tertunda":
              loadAllByTiketLevel2("Tunda");
              break;
            case "Selesai":
              loadPermohonanByStatus("Permohonan selesai");
              break;
          }
          break;
      }
    });

    return unsubscribe;
  }, [navigation]);

  const loadPermohonanByStatus = (status) => {
    andalalinGetByStatus(context.getUser().access_token, status, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            setPermohonan(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadPermohonanByStatus();
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

  const loadDaftarPermohonan = () => {
    andalalinGetByIdUser(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            setPermohonan(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadDaftarPermohonan();
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

  const loadDaftarByTiketLevel1 = () => {
    andalalinGetByTiketLevel1(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            setPermohonan(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadDaftarByTiketLevel1();
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

  const loadDaftarByTiketLevel2 = (status) => {
    andalalinGetByTiketLevel2(
      context.getUser().access_token,
      status,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.json();
              setPermohonan(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadDaftarByTiketLevel1();
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
      }
    );
  };

  const loadDaftarSurvei = () => {
    andalalinGetAllSurvei(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            setPermohonan(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadDaftarSurvei();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleSurveiGagal();
          break;
      }
    });
  };

  const loadUsulanTindakan = () => {
    andalalinGetUsulanTindakan(context.getUser().access_token, (response) => {
      switch (response.status) {
        case 200:
          (async () => {
            const result = await response.json();
            setPermohonan(result.data);
            context.toggleLoading(false);
          })();
          break;
        case 424:
          authRefreshToken(context, (response) => {
            if (response.status === 200) {
              loadUsulanTindakan();
            } else {
              context.toggleLoading(false);
            }
          });
          break;
        default:
          context.toggleLoading(false);
          toggleUsulanGagal();
          break;
      }
    });
  };

  const loadAllByTiketLevel2 = (status) => {
    andalalinGetAllByTiketLevel2(
      context.getUser().access_token,
      status,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.json();
              setPermohonan(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadAllByTiketLevel2();
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
      }
    );
  };

  const judul = () => {
    switch (context.getUser().role) {
      case "User":
        return "Daftar permohonan";
      case "Operator":
        return "Daftar permohonan";
      case "Petugas":
        if (kondisi == "Survei") {
          return "Daftar permohonan";
        } else {
          return "Daftar survei";
        }
      case "Admin":
        switch (kondisi) {
          case "Persetujuan":
            return "Daftar permohonan";
          case "Pengawasan":
            return "Daftar usulan";
          case "Tertunda":
            return "Daftar tunda";
          case "Selesai":
            return "Daftar permohonan";
        }
    }
  };

  const doPress = (item) => {
    switch (context.getUser().role) {
      case "User":
        return navigation.push("Detail", { id: item.id_andalalin });
      case "Operator":
        return navigation.push("Detail", { id: item.id_andalalin });
      case "Petugas":
        if (kondisi == "Survei") {
          return navigation.push("Detail", {
            id: item.id_andalalin,
          });
        } else {
          return navigation.push("Detail Survei", {
            id: item.id_andalalin,
            kondisi: "Petugas",
          });
        }
      case "Admin":
        switch (kondisi) {
          case "Persetujuan":
            return navigation.push("Detail", { id: item.id_andalalin });
          case "Pengawasan":
            return navigation.push("Detail Usulan", { id: item.id_andalalin });
          case "Tertunda":
            setIdPermohonan(item.id_andalalin);
            toggleLanjutkanModal();
            break;
          case "Selesai":
            return navigation.push("Detail", { id: item.id_andalalin });
        }
    }
  };

  const list_item = (item) => {
    switch (context.getUser().role) {
      case "User":
        return list("Detail", item);
      case "Operator":
        return list("Detail", item);
      case "Petugas":
        if (kondisi == "Survei") {
          return list("Detail", item);
        } else {
          return list("Detail", item);
        }
      case "Admin":
        switch (kondisi) {
          case "Persetujuan":
            return list("Detail", item);
          case "Pengawasan":
            return list("Detail", item);
          case "Tertunda":
            return list("Lanjutkan", item);
          case "Selesai":
            return list("Detail", item);
        }
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      setPermohonan("permohonan");
      switch (context.getUser().role) {
        case "User":
          context.toggleLoading(true);
          loadDaftarPermohonan();
          break;
        case "Operator":
          context.toggleLoading(true);
          if (kondisi == "Diajukan" && kondisi != undefined) {
            loadDaftarByTiketLevel1();
          } else {
            loadPermohonanByStatus("Permohonan selesai");
          }

          break;
        case "Petugas":
          context.toggleLoading(true);
          if (kondisi == "Survei" && kondisi != undefined) {
            loadDaftarByTiketLevel2("Buka");
          } else {
            loadDaftarSurvei();
          }
          break;
        case "Admin":
          context.toggleLoading(true);
          switch (kondisi) {
            case "Persetujuan":
              loadPermohonanPersetujuan();
              break;
            case "Pengawasan":
              loadUsulanTindakan();
              break;
            case "Tertunda":
              loadAllByTiketLevel2("Tunda");
              break;
          }
          break;
      }
    }, 50);
  }, []);

  const list = (text, item) => {
    return (
      <ACardPermohonan
        style={{ marginBottom: 16 }}
        status={item.status_andalalin}
        tanggal={item.tanggal_andalalin}
        jenis={item.jenis_andalalin}
        kode={item.kode_andalalin}
        pemohon={item.nama_pemohon}
        alamat={item.alamat_pemohon}
        title={text}
        onPress={() => {
          doPress(item);
        }}
      />
    );
  };

  const pelaksanaan = () => {
    if (context.getUser().role == "Admin" && kondisi == "Tertunda") {
      return (
        <ABottomSheet visible={lanjutkanModal}>
          <View style={{ height: 278 }}>
            <AText
              style={{ paddingBottom: 16 }}
              size={18}
              color={color.neutral.neutral700}
              weight="semibold"
            >
              Apakah Anda ingin melanjutkan{"\n"}permohonan ini?
            </AText>

            <RadioButton.Group
              onValueChange={(value) => setLanjutanCheck(value)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  label="Buka"
                  value="Buka"
                  uncheckedColor={color.neutral.neutral300}
                  color={color.primary.primary600}
                  status={lanjutkanCheck === "Buka" ? "checked" : "unchecked"}
                />
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Lanjutkan pelaksanaan
                </AText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 8,
                }}
              >
                <RadioButton
                  label="Batal"
                  value="Batal"
                  uncheckedColor={color.neutral.neutral300}
                  color={color.primary.primary600}
                  status={lanjutkanCheck === "Batal" ? "checked" : "unchecked"}
                />
                <AText
                  style={{ paddingLeft: 4 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Batalkan pelaksanaan
                </AText>
              </View>
            </RadioButton.Group>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                position: "absolute",
                bottom: 32,
                right: 16,
              }}
            >
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  setIdPermohonan(null);
                  setLanjutanCheck(null);
                  toggleLanjutkanModal();
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </Pressable>
              <Pressable
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  if (lanjutkanCheck != null) {
                    toggleLanjutkanModal();
                    toggleComfirm();
                  }
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Simpan
                </AText>
              </Pressable>
            </View>
          </View>
        </ABottomSheet>
      );
    }
  };

  const tindakan = () => {
    andalalinTindakan(
      context.getUser().access_token,
      idPermohonan,
      lanjutkanCheck,
      (response) => {
        switch (response.status) {
          case 201:
            loadAllByTiketLevel2("Tunda");
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                tindakan();
              } else {
                context.toggleLoading(false);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleLanjutkanGagal();
        }
      }
    );
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              setProgressViewOffset(-1000);
              navigation.setOptions({ animation: "slide_from_right" });
              navigation.replace("Back Home");
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        {permohonan != "permohonan" ? (
          <FlatList
            data={permohonan}
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[color.primary.primary500]}
                progressViewOffset={progressViewOffset}
              />
            }
            renderItem={({ item }) => list_item(item)}
          />
        ) : (
          ""
        )}
        {permohonan == null ? (
          <View
            style={{
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              paddingBottom: 16,
            }}
          >
            <View
              style={{
                borderColor: color.primary.primary50,
                borderWidth: 8,
                borderRadius: 40,
                backgroundColor: color.primary.primary100,
              }}
            >
              <Feather
                style={{ padding: 14 }}
                name="frown"
                size={28}
                color={color.primary.main}
              />
            </View>
            <AText
              style={{ paddingTop: 16 }}
              size={20}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {judul()}
            </AText>
            <AText size={20} color={color.neutral.neutral900} weight="normal">
              Belum ada
            </AText>
          </View>
        ) : (
          ""
        )}
      </View>

      {pelaksanaan()}

      <ADialog
        title={"Permohoman gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.navigate("Home");
        }}
      />

      <ADialog
        title={"Daftar survei gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={surveiGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSurveiGagal();
          navigation.navigate("Home");
        }}
      />

      <ADialog
        title={"Usulan tindakan gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={usulanGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleUsulanGagal();
          navigation.navigate("Home");
        }}
      />

      <ADialog
        title={"Tindakan gagal disimpan"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={lanjutkanGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleLanjutkanGagal();
        }}
      />

      <AConfirmationDialog
        title={"Apakah Anda yakin?"}
        desc={"Tindakan akan disimpan"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
          setIdPermohonan(null);
          setLanjutanCheck(null);
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.toggleLoading(true);
          tindakan();
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default DaftarScreen;

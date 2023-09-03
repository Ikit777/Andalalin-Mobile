import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  RefreshControl,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ACardPermohonan from "../component/utility/ACardPermohonan";
import {
  andalalinGetAllSurvei,
  andalalinGetByIdUser,
  andalalinGetByStatus,
  andalalinGetByTiketLevel1,
  andalalinGetByTiketLevel2,
  andalalinPersetujuan,
} from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import { Feather } from "@expo/vector-icons";

function DaftarScreen({ navigation, route }) {
  const [gagal, toggleGagal] = useStateToggler();
  const [surveiGagal, toggleSurveiGagal] = useStateToggler();
  const [permohonan, setPermohonan] = useState("permohonan");
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(20);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.setOptions({ animation: "slide_from_right" });
        navigation.navigate("Home");

        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-1000);
        navigation.setOptions({ animation: "slide_from_right" });
        navigation.navigate("Home");

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
            loadDaftarByTiketLevel2();
          } else {
            loadDaftarSurvei();
          }
          break;
        case "Admin":
          context.toggleLoading(true);
          loadPermohonanPersetujuan();
          break;
      }
    });

    return unsubscribe;
  }, [navigation]);

  const loadPermohonanPersetujuan = () => {
    andalalinPersetujuan(context.getUser().access_token, (response) => {
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
              loadPermohonanPersetujuan();
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

  const loadDaftarByTiketLevel2 = () => {
    andalalinGetByTiketLevel2(context.getUser().access_token, (response) => {
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
        return "Daftar permohonan";
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
        return navigation.push("Detail", { id: item.id_andalalin });
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      switch (context.getUser().role) {
        case "User":
          loadDaftarPermohonan();
          break;
        case "Operator":
          loadDaftarByTiketLevel1();
          break;
        case "Petugas":
          if (kondisi == "Survei") {
            loadDaftarByTiketLevel2();
          } else {
            loadDaftarSurvei();
          }
          break;
        default:
          loadDaftarPermohonan();
          break;
      }
    }, 50);
  }, []);

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              setProgressViewOffset(-1000);
              navigation.navigate("Home");
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
            renderItem={({ item }) => (
              <ACardPermohonan
                style={{ marginBottom: 16 }}
                status={item.status_andalalin}
                tanggal={item.tanggal_andalalin}
                jenis={item.jenis_andalalin}
                kode={item.kode_andalalin}
                pemohon={item.nama_pemohon}
                alamat={item.alamat_pemohon}
                title={"Detail"}
                onPress={() => {
                  doPress(item);
                }}
              />
            )}
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
      <ADialog
        title={"Memuat permohoman gagal"}
        desc={"Permohonan gagal dimuat, silahkan coba lagi"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          navigation.navigate("Home");
        }}
      />

      <ADialog
        title={"Memuat daftar survei gagal"}
        desc={"Daftar survei gagal dimuat, silahkan coba lagi"}
        visibleModal={surveiGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSurveiGagal();
          navigation.navigate("Home");
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

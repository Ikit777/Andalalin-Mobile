import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  RefreshControl,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useStateToggler } from "../hooks/useUtility";
import ADialog from "../component/utility/ADialog";
import {
  andalalinBatalkanPermohonan,
  andalalinCekSurveiKepuasan,
  andalalinGetById,
} from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import DetailUser from "../component/detail/DetailUser";
import DetailNonUser from "../component/detail/DetailNonUser";
import { useFocusEffect } from "@react-navigation/native";
import ASnackBar from "../component/utility/ASnackBar";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { Feather } from "@expo/vector-icons";
import ABottomSheet from "../component/utility/ABottomSheet";
import ATextInput from "../component/utility/ATextInput";

function DetailScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [gagal, toggleGagal] = useStateToggler();
  const [gagalSimpan, toggleGagalSimpan] = useStateToggler();
  const [data, setData] = useState("permohonan");

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(40);

  const [surveiDialog, toggleSurveiDialog] = useStateToggler();

  const [pilih, setPilih] = useState("");
  const [pertimbangan, setPertimbangan] = useState("");
  const [tindakanModal, toggleTindakanModal] = useStateToggler();
  const [batalModal, toggleBatalModal] = useStateToggler();

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-5000);
        back();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        setProgressViewOffset(-5000);
        back();
        return true;
      });
    }, [data])
  );

  const back = () => {
    switch (context.getUser().role) {
      case "User":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
      case "Operator":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
      case "Petugas":
        switch (data.status_andalalin) {
          case "Survei lapangan":
            navigation.replace("Daftar", { kondisi: "Survei" });
            break;
          case "Pemasangan sedang dilakukan":
            navigation.replace("Daftar", { kondisi: "Pemasangan" });
            break;
          default:
            navigation.replace("Daftar", { kondisi: "Survei" });
            break;
        }
        break;
      case "Admin":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
      case "Dinas Perhubungan":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
      case "Super Admin":
        navigation.replace("Daftar", { kondisi: "Diajukan" });
        break;
    }
  };

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    loadPermohonan();
  }, []);

  const cek = (id) => {
    andalalinCekSurveiKepuasan(
      context.getUser().access_token,
      id,
      (response) => {
        switch (response.status) {
          case 200:
            context.toggleLoading(false);
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                cek(id);
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleSurveiDialog();
            break;
        }
      }
    );
  };

  const loadPermohonan = () => {
    andalalinGetById(
      route.params.id,
      context.getUser().access_token,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              setData(result.data);
              context.setDetailPermohonan(result.data);

              switch (context.getUser().role) {
                case "User":
                  if (
                    result.data.status_andalalin == "Permohonan selesai" ||
                    result.data.status_andalalin == "Pemasangan selesai"
                  ) {
                    cek(route.params.id);
                  } else {
                    context.toggleLoading(false);
                  }

                  break;
                default:
                  context.toggleLoading(false);
                  break;
              }
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadPermohonan();
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

  const detail = () => {
    switch (context.getUser().role) {
      case "User":
        return (
          <DetailUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Operator":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Petugas":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Admin":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Dinas Perhubungan":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
      case "Super Admin":
        return (
          <DetailNonUser
            permohonan={data}
            navigation={navigation}
            reload={loadPermohonan}
          />
        );
    }
  };

  const judul = () => {
    switch (context.getUser().role) {
      case "User":
        return "Detail permohonan";
      case "Operator":
        return "Detail permohonan";
      case "Petugas":
        return "Detail permohonan";
      case "Admin":
        return "Detail permohonan";
      case "Dinas Perhubungan":
        return "Detail permohonan";
      case "Super Admin":
        return "Detail permohonan";
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      loadPermohonan();
    }, 50);
  }, []);

  const batalkan_permohonan = () => {
    return (
      <View>
        <AText
          style={{ marginBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Pertimbangan pembatalan permohonan
        </AText>
        <View>
          <ATextInput
            bdColor={color.neutral.neutral300}
            ktype={"default"}
            hint={"Masukkan pertimbangan"}
            rtype={"done"}
            max={4}
            maxHeight={90}
            multi={true}
            value={pertimbangan}
            onChangeText={(value) => {
              setPertimbangan(value);
            }}
          />
        </View>
      </View>
    );
  };

  const batalkan = () => {
    context.toggleLoading(true);
    andalalinBatalkanPermohonan(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      pertimbangan,
      (response) => {
        switch (response.status) {
          case 200:
            context.toggleLoading(false);
            setPilih("");
            setPertimbangan("");
            loadPermohonan();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                batalkan();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            setPilih("");
            setPertimbangan("");
            toggleGagalSimpan();
            break;
        }
      }
    );
  };

  const close_tindakan = () => {
    setPilih("");
    toggleTindakanModal();
  };

  return (
    <AScreen>
      {context.getUser().role == "Operator" ||
      context.getUser().role == "Admin" ||
      context.getUser().role == "Super Admin" ? (
        data.status_andalalin != "Permohonan selesai" &&
        data.status_andalalin != "Pemasangan selesai" &&
        data.status_andalalin != "Permohonan ditolak" &&
        data.status_andalalin != "Permohonan dibatalkan" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
              }}
            >
              <ABackButton
                onPress={() => {
                  setProgressViewOffset(-5000);
                  back();
                }}
              />
              <AText
                style={{ paddingLeft: 4 }}
                size={20}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {judul()}
              </AText>
            </View>
            <TouchableOpacity
              style={{ paddingVertical: 12, paddingHorizontal: 16 }}
              onPress={() => {
                toggleTindakanModal();
              }}
            >
              <Feather
                name="more-vertical"
                size={24}
                color={color.neutral.neutral900}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
              }}
            >
              <ABackButton
                onPress={() => {
                  setProgressViewOffset(-5000);
                  back();
                }}
              />
              <AText
                style={{ paddingLeft: 4 }}
                size={20}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {judul()}
              </AText>
            </View>
          </View>
        )
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <ABackButton
              onPress={() => {
                setProgressViewOffset(-5000);
                back();
              }}
            />
            <AText
              style={{ paddingLeft: 4 }}
              size={20}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {judul()}
            </AText>
          </View>
        </View>
      )}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.primary.primary500]}
            progressViewOffset={progressViewOffset}
          />
        }
      >
        {data != "permohonan" ? detail() : ""}
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        {context.isSnackbarVisible ? (
          <ASnackBar
            visible={context.isSnackbarVisible}
            message={context.message}
          />
        ) : (
          ""
        )}
      </View>

      <ADialog
        title={"Permohoman gagal dimuat"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        toggleModal={toggleGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          back();
        }}
      />

      <AConfirmationDialog
        title={"Survei kepuasan"}
        desc={"Anda harus menyelesaikan survei kepuasan terlebih dahulu"}
        visibleModal={surveiDialog}
        toggleVisibleModal={toggleSurveiDialog}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleSurveiDialog();
          back();
        }}
        onPressOKButton={() => {
          toggleSurveiDialog();
          context.clearSurveiKepuasan();
          context.setIndexSurvei(1);
          navigation.push("Survei Kepuasan", { id: route.params.id });
        }}
      />

      <ADialog
        title={"Peringatan"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagalSimpan}
        toggleModal={toggleGagalSimpan}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagalSimpan();
        }}
      />

      <AConfirmationDialog
        title={"Batalkan permohonan"}
        desc={"Apakah anda yakin ingin membatalkan permohonan ini?"}
        visibleModal={batalModal}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          setPilih("");
          setPertimbangan("");
          toggleBatalModal();
        }}
        onPressOKButton={() => {
          toggleBatalModal();
          batalkan();
        }}
      />

      <ABottomSheet visible={tindakanModal} close={close_tindakan}>
        <View>
          {pilih == "" ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AText
                  size={18}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Pilihan
                </AText>
              </View>
              <Pressable
                android_ripple={{
                  color: "rgba(0, 0, 0, 0.1)",
                  borderless: false,
                }}
                style={{
                  flexDirection: "row",
                  padding: 8,
                  marginTop: 24,
                  marginBottom: 32,
                }}
                onPress={() => {
                  setPilih("Batal");
                }}
              >
                <Feather
                  name="x-square"
                  size={20}
                  color={color.neutral.neutral900}
                />
                <AText
                  style={{ paddingLeft: 16 }}
                  size={14}
                  color={color.neutral.neutral700}
                >
                  Batalkan permohonan
                </AText>
              </Pressable>
            </View>
          ) : (
            ""
          )}

          {pilih == "Batal" ? batalkan_permohonan() : ""}

          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              marginTop: 32,
              marginRight: 16,
              marginBottom: 16,
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                setPilih("");
                setPertimbangan("");
                toggleTindakanModal();
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Batal
              </AText>
            </TouchableOpacity>
            {pilih != "" ? (
              <TouchableOpacity
                style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
                onPress={() => {
                  switch (pilih) {
                    case "Batal":
                      if (pertimbangan != "") {
                        toggleTindakanModal();
                        toggleBatalModal();
                      }
                      break;
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
              </TouchableOpacity>
            ) : (
              ""
            )}
          </View>
        </View>
      </ABottomSheet>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default DetailScreen;

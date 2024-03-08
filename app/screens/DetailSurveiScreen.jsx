import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { andalalinGetPemasangan, andalalinGetSurvei } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import ADetailView from "../component/utility/ADetailView";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import * as Clipboard from "expo-clipboard";
import ASnackBar from "../component/utility/ASnackBar";

function DetailSurveiScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [surveiGagal, toggleSurveiGagal] = useStateToggler();
  const jenis = route.params.jenis;
  const [survei, setSurvei] = useState("survei");

  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(40);

  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
    });

    return unsubscribe;
  }, [navigation]);

  const copyToClipboard = async (text) => {
    try {
      await Clipboard.setStringAsync(text);
      setMessage("Berhasil di salin");
      showSnackbar();
    } catch (error) {
      console.error(error);
    }
  };

  const showSnackbar = () => {
    setSnackbarVisible();
    setTimeout(() => {
      setSnackbarVisible();
    }, 3000);
  };

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    switch (jenis) {
      case "Permohonan":
        loadSurvei();
        break;
      case "Pemasangan":
        loadPemasangan();
        break;
    }
  }, []);

  const back = () => {
    switch (context.getUser().role) {
      case "Petugas":
        switch (jenis) {
          case "Permohonan":
            navigation.replace("Daftar", { kondisi: "Daftar" });
            break;
          case "Pemasangan":
            navigation.replace("Daftar", { kondisi: "Daftar Pemasangan" });
            break;
        }
        break;
      case "Super Admin":
        navigation.replace("Detail", { id: route.params.id });
        break;
      default:
        navigation.goBack();
        break;
    }
  };

  const judul = () => {
    switch (jenis) {
      case "Permohonan":
        return "Detail survei";
      case "Pemasangan":
        return "Detail pemasangan";
    }
  };

  const loadSurvei = () => {
    andalalinGetSurvei(
      context.getUser().access_token,
      route.params.id,
      route.params.id_perlengkapan,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              const result = await response.data;
              setSurvei(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadSurvei();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleSurveiGagal();
            break;
        }
      }
    );
  };

  const loadPemasangan = () => {
    andalalinGetPemasangan(
      context.getUser().access_token,
      route.params.id,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              const result = await response.data;
              setSurvei(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadPemasangan();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleSurveiGagal();
            break;
        }
      }
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);
    setTimeout(() => {
      context.toggleLoading(true);
      switch (jenis) {
        case "Permohonan":
          loadSurvei();
          break;
        case "Pemasangan":
          loadPemasangan();
          break;
      }
    }, 50);
  }, []);

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
      {survei != "survei" ? (
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
          <ADetailView title={"Informasi petugas"} style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 14,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Nama
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {survei.Petugas}
              </AText>
            </View>
          </ADetailView>

          <ADetailView style={{ marginBottom: 20 }} title={"Waktu pelaksanaan"}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Waktu
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {jenis == "Pemasangan"
                  ? survei.WaktuPemasangan
                  : survei.WaktuSurvei}
              </AText>
            </View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Tanggal
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {jenis == "Pemasangan"
                  ? survei.TanggalPemasangan
                  : survei.TanggalSurvei}
              </AText>
            </View>
          </ADetailView>

          <ADetailView
            title={`Foto ${jenis == "Pemasangan" ? "Pemasangan" : "Survei"}`}
          >
            {survei.Foto.length != 0
              ? survei.Foto.map((item, index) => (
                  <View key={index}>
                    {index == 0 && index == survei.Foto.length ? (
                      ""
                    ) : (
                      <View style={styles.separator} />
                    )}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 16,
                      }}
                    >
                      <AText
                        size={12}
                        color={color.neutral.neutral900}
                        weight="normal"
                      >
                        Foto {index + 1}
                      </AText>

                      <TouchableOpacity
                        style={{ flexDirection: "row", paddingLeft: 4 }}
                        onPress={() => {
                          navigation.push("Foto", { foto: item });
                        }}
                      >
                        <AText
                          size={14}
                          color={color.neutral.neutral700}
                          weight="semibold"
                        >
                          Lihat
                        </AText>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              : ""}
            {survei.Foto1 != null ? (
              <View>
                <View style={styles.separator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    Foto 1
                  </AText>

                  <TouchableOpacity
                    style={{ flexDirection: "row", paddingLeft: 4 }}
                    onPress={() => {
                      navigation.push("Foto", { foto: survei.Foto1 });
                    }}
                  >
                    <AText
                      size={14}
                      color={color.neutral.neutral700}
                      weight="semibold"
                    >
                      Lihat
                    </AText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              ""
            )}
            {survei.Foto2 != null ? (
              <View>
                <View style={styles.separator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    Foto 2
                  </AText>

                  <TouchableOpacity
                    style={{ flexDirection: "row", paddingLeft: 4 }}
                    onPress={() => {
                      navigation.push("Foto", { foto: survei.Foto2 });
                    }}
                  >
                    <AText
                      size={14}
                      color={color.neutral.neutral700}
                      weight="semibold"
                    >
                      Lihat
                    </AText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              ""
            )}
            {survei.Foto3 != null ? (
              <View>
                <View style={styles.separator} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    Foto 3
                  </AText>

                  <TouchableOpacity
                    style={{ flexDirection: "row", paddingLeft: 4 }}
                    onPress={() => {
                      navigation.push("Foto", { foto: survei.Foto3 });
                    }}
                  >
                    <AText
                      size={14}
                      color={color.neutral.neutral700}
                      weight="semibold"
                    >
                      Lihat
                    </AText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              ""
            )}
          </ADetailView>

          <ADetailView
            style={{ marginTop: 20 }}
            title={`Koordinat ${
              jenis == "Pemasangan" ? "Pemasangan" : "Survei"
            }`}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Latitude
              </AText>
              <TouchableOpacity
                onPress={() => {
                  copyToClipboard(survei.Latitude.toString());
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {survei.Latitude}
                </AText>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Longitude
              </AText>
              <TouchableOpacity
                onPress={() => {
                  copyToClipboard(survei.Longitude.toString());
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {survei.Longitude}
                </AText>
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
              }}
            >
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Lokasi survei di map
              </AText>

              <TouchableOpacity
                style={{ flexDirection: "row", paddingLeft: 4 }}
                onPress={() => {
                  const koordinat = {
                    latitude: survei.Latitude,
                    longitude: survei.Longitude,
                  };
                  navigation.push("Map", { koordinat: koordinat });
                }}
              >
                <AText
                  size={14}
                  color={color.neutral.neutral700}
                  weight="semibold"
                >
                  Lihat
                </AText>
              </TouchableOpacity>
            </View>
          </ADetailView>

          <ADetailView
            style={{ marginTop: 20 }}
            title={`Lokasi ${jenis == "Pemasangan" ? "Pemasangan" : "Survei"}`}
          >
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {survei.Lokasi}
            </AText>
          </ADetailView>

          {survei.Catatan != null && survei.Catatan != "" ? (
            <ADetailView
              style={{ marginTop: 20 }}
              title={`Catatan ${
                jenis == "Pemasangan" ? "pemasangan" : "survei"
              }`}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {survei.Catatan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          <View style={{ marginBottom: 32 }} />
        </ScrollView>
      ) : (
        ""
      )}
      <ADialog
        title={"Data gagal dimuat"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={surveiGagal}
        toggleModal={toggleSurveiGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSurveiGagal();
          back();
        }}
      />

      <ADialog
        title={"Terima survei gagal"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        toggleModal={toggleGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan?"}
        visibleModal={konfirmasi}
        toggleVisibleModal={toggleKonfirmasi}
        btnOK={"Simpan"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleKonfirmasi();
          setKeteranganTindakan();
          toggleTindakanModal();
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
          toggleTindakanModal();
          context.toggleLoading(true);
          terima();
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
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default DetailSurveiScreen;

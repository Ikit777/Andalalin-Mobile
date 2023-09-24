import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import {
  andalalinGetPemasangan,
  andalalinGetSurvei,
  andalalinGetSurveiMandiri,
  andalalinTerimaSurveiMandiri,
} from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";
import ADetailView from "../component/utility/ADetailView";
import ADialog from "../component/utility/ADialog";
import { useStateToggler } from "../hooks/useUtility";
import AButton from "../component/utility/AButton";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import ABottomSheet from "../component/utility/ABottomSheet";
import ATextInput from "../component/utility/ATextInput";

function DetailSurveiScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [surveiGagal, toggleSurveiGagal] = useStateToggler();
  const kondisi = route.params.kondisi;
  const jenis = route.params.jenis;
  const [survei, setSurvei] = useState("survei");

  const [tindakanModal, toggleTindakanModal] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [keteranganTindakan, setKeteranganTindakan] = useState();
  const [gagal, toggleGagal] = useStateToggler();

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(40);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.setOptions({ animation: "slide_from_right" });
        setProgressViewOffset(-5000);
        back();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.setOptions({ animation: "slide_from_right" });
        setProgressViewOffset(-5000);
        back();
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    switch (jenis) {
      case "Permohonan":
        loadSurvei();
        break;
      case "Mandiri":
        loadSurveiMandiri();
        break;
      case "Pemasangan":
        loadPemasangan();
        break;
    }
  }, []);

  const back = () => {
    if (context.getUser().role == "Petugas") {
    } else {
      navigation.goBack();
    }

    switch (context.getUser().role) {
      case "Petugas":
        switch (jenis) {
          case "Permohonan":
            navigation.replace("Back Daftar", { kondisi: "Daftar" });
            break;
          case "Mandiri":
            navigation.replace("Back Daftar", { kondisi: "Mandiri" });
            break;
          case "Pemasangan":
            navigation.replace("Back Daftar", { kondisi: "Daftar Pemasangan" });
            break;
        }
        break;
      case "Super Admin":
        switch (jenis) {
          case "Mandiri":
            navigation.replace("Back Daftar", { kondisi: "Mandiri" });
            break;
          default:
            navigation.replace("Back Detail", { id: route.params.id });
            break;
        }
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
      case "Mandiri":
        return "Detail survei";
      case "Pemasangan":
        return "Detail pemasangan";
    }
  };

  const loadSurvei = () => {
    andalalinGetSurvei(
      context.getUser().access_token,
      route.params.id,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              const result = await response.json();
              setSurvei(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadSurvei();
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
      }
    );
  };

  const loadSurveiMandiri = () => {
    andalalinGetSurveiMandiri(
      context.getUser().access_token,
      route.params.id,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              const result = await response.json();
              setSurvei(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadSurveiMandiri();
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
              const result = await response.json();
              setSurvei(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                loadPemasangan();
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
      }
    );
  };

  const terima = () => {
    andalalinTerimaSurveiMandiri(
      context.getUser().access_token,
      route.params.id,
      keteranganTindakan,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              navigation.replace("Reload Survei", {
                id: route.params.id,
                kondisi: kondisi,
                jenis: jenis,
              });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                terima();
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

  const tindakan = () => {
    return (
      <View style={{ height: 250 }}>
        <AText
          style={{ paddingBottom: 16 }}
          size={18}
          color={color.neutral.neutral700}
          weight="semibold"
        >
          Terima survei mandiri petugas
        </AText>

        <ATextInput
          bdColor={color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan keterangan tambahan"}
          rtype={"done"}
          multi={true}
          max={4}
          maxHeight={90}
          value={keteranganTindakan}
          onChangeText={(value) => {
            setKeteranganTindakan(value);
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 24,
            right: 16,
          }}
        >
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setKeteranganTindakan(null);
              toggleTindakanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              {
                keteranganTindakan != null ? toggleKonfirmasi() : "";
              }
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Simpan
            </AText>
          </Pressable>
        </View>
      </View>
    );
  };

  const status = () => {
    switch (survei.StatusSurvei) {
      case "Survei diterima":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (survei.StatusSurvei) {
      case "Survei diterima":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
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
        case "Mandiri":
          loadSurveiMandiri();
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
              navigation.setOptions({ animation: "slide_from_right" });
              setProgressViewOffset(-5000);
              back();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={24}
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
          {kondisi != "Petugas" ? (
            <ADetailView
              title={"Informasi petugas"}
              style={{ marginBottom: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Nama
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {survei.Petugas}
                </AText>
              </View>
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Nama
                </AText>
                <AText
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {survei.EmailPetugas}
                </AText>
              </View>
            </ADetailView>
          ) : (
            ""
          )}

          {jenis == "Mandiri" ? (
            <ADetailView style={{ marginBottom: 20 }} title={"Status survei"}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                }}
              >
                <AText
                  style={{
                    backgroundColor: status(),
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 15,
                  }}
                  size={12}
                  color={statusText()}
                  weight="normal"
                >
                  {survei.StatusSurvei}
                </AText>
              </View>
            </ADetailView>
          ) : (
            ""
          )}

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
                
                {jenis == "Pemasangan" ? survei.TanggalPemasangan : survei.TanggalSurvei}
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
              { jenis == "Pemasangan" ? survei.WaktuPemasangan : survei.WaktuSurvei}
              </AText>
            </View>
          </ADetailView>

          <ADetailView
            title={`Foto ${jenis == "Pemasangan" ? "Pemasangan" : "Survei"}`}
          >
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

                  <Pressable
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
                  </Pressable>
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

                  <Pressable
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
                  </Pressable>
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

                  <Pressable
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
                  </Pressable>
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
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {survei.Latitude}
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
                Longitude
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {survei.Longitude}
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
                Lokasi survei di map
              </AText>

              <Pressable
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
              </Pressable>
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

          {survei.Keterangan != "" ? (
            <ADetailView
              style={{ marginTop: 20 }}
              title={`Keterangan ${
                jenis == "Pemasangan" ? "Pemasangan" : "Survei"
              }`}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {survei.Keterangan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          {survei.KeteranganTindakan != "" && jenis == "Mandiri" ? (
            <ADetailView
              style={{ marginTop: 20 }}
              title={"Keterangan tambahan"}
            >
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {survei.KeteranganTindakan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          <View style={{ marginBottom: 32 }} />

          {jenis == "Mandiri" &&
          context.getUser().role != "Dinas Perhubungan" &&
          context.getUser().role != "User" &&
          context.getUser().role != "Petugas" &&
          survei.StatusSurvei != "Survei diterima" ? (
            <AButton
              style={{ marginBottom: 32 }}
              title={"Terima survei"}
              mode="contained"
              onPress={() => {
                toggleTindakanModal();
              }}
            />
          ) : (
            ""
          )}
        </ScrollView>
      ) : (
        ""
      )}

      <ABottomSheet visible={tindakanModal}>{tindakan()}</ABottomSheet>

      <ADialog
        title={"Data gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={surveiGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSurveiGagal();
          back();
        }}
      />

      <ADialog
        title={"Terima survei gagal"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
        }}
      />

      <AConfirmationDialog
        title={"Simpan"}
        desc={"Apakah Anda yakin ingin simpan?"}
        visibleModal={konfirmasi}
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

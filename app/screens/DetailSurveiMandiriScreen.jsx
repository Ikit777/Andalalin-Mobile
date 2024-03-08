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
import {
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
import * as Clipboard from "expo-clipboard";
import ASnackBar from "../component/utility/ASnackBar";

function DetailSurveiMandiriScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const [surveiGagal, toggleSurveiGagal] = useStateToggler();
  const [survei, setSurvei] = useState("survei");

  const [tindakanModal, toggleTindakanModal] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [keteranganTindakan, setKeteranganTindakan] = useState();
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

  useEffect(() => {
    if (context.loading == false) {
      context.toggleLoading(true);
    }
    loadSurveiMandiri();
  }, []);

  const back = () => {
    switch (context.getUser().role) {
      case "Petugas":
        navigation.replace("Daftar", { kondisi: "Mandiri" });
        break;
      case "Super Admin":
        navigation.replace("Daftar", { kondisi: "Mandiri" });
        break;
      default:
        navigation.replace("Daftar", { kondisi: "Mandiri" });
        break;
    }
  };

  const judul = () => {
    return "Detail pengaduan";
  };

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

  const loadSurveiMandiri = () => {
    andalalinGetSurveiMandiri(
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
                loadSurveiMandiri();
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
            loadSurveiMandiri();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                terima();
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

  const closeTindakan = () => {
    setKeteranganTindakan(null);
    toggleTindakanModal();
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
          Terima pengaduan
        </AText>

        <ATextInput
          bdColor={color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan catatan"}
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
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              setKeteranganTindakan(null);
              toggleTindakanModal();
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Batal
            </AText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4, marginLeft: 32 }}
            onPress={() => {
              toggleTindakanModal();

              keteranganTindakan != null ? toggleKonfirmasi() : "";
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Simpan
            </AText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const status = () => {
    switch (survei.StatusSurvei) {
      case "Pengaduan diterima":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (survei.StatusSurvei) {
      case "Pengaduan diterima":
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
      loadSurveiMandiri();
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
          <ADetailView
            title={"Informasi pengaduan"}
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
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Nama
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {survei.Nama}
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
              <AText size={12} color={color.neutral.neutral900} weight="normal">
                Email
              </AText>
              <AText size={12} color={color.neutral.neutral500} weight="normal">
                {survei.Email}
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
              <AText
                style={{ maxWidth: "40%" }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                Status pengaduan
              </AText>
              <AText
                style={{
                  maxWidth: "60%",
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

          <ADetailView style={{ marginBottom: 20 }} title={"Waktu pengaduan"}>
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
                {survei.WaktuSurvei}
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
                {survei.TanggalSurvei}
              </AText>
            </View>
          </ADetailView>

          <ADetailView title={`Foto pengaduan`}>
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
          </ADetailView>

          <ADetailView style={{ marginTop: 20 }} title={`Lokasi pengaduan`}>
            <AText
              style={{ padding: 16 }}
              size={12}
              color={color.neutral.neutral900}
              weight="normal"
            >
              {survei.Lokasi}
            </AText>
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

          {survei.Catatan != null && survei.Catatan != "" ? (
            <ADetailView style={{ marginTop: 20 }} title={`Catatan pengaduan`}>
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

          {survei.CatatanTindakan != "" && survei.CatatanTindakan != null ? (
            <ADetailView style={{ marginTop: 20 }} title={"Catatan tindakan"}>
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {survei.CatatanTindakan}
              </AText>
            </ADetailView>
          ) : (
            ""
          )}

          <View style={{ marginBottom: 32 }} />

          {context.getUser().role != "Dinas Perhubungan" &&
          context.getUser().role != "User" &&
          context.getUser().role != "Petugas" &&
          survei.StatusSurvei != "Pengaduan diterima" ? (
            <AButton
              style={{ marginBottom: 32 }}
              title={"Terima aduan"}
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

      <ABottomSheet visible={tindakanModal} close={closeTindakan}>
        {tindakan()}
      </ABottomSheet>

      <ADialog
        title={"Pengaduan gagal dimuat"}
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
        title={"Terima pengaduan gagal"}
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
        }}
        onPressOKButton={() => {
          toggleKonfirmasi();
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

export default DetailSurveiMandiriScreen;

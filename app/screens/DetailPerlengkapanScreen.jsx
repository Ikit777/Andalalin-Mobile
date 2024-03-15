import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { andalalinGetperlengkapan } from "../api/andalalin";
import { UserContext } from "../context/UserContext";
import { authRefreshToken } from "../api/auth";
import ADetailView from "../component/utility/ADetailView";
import { useStateToggler } from "../hooks/useUtility";
import Modal from "react-native-modal";
import * as Clipboard from "expo-clipboard";
import ASnackBar from "../component/utility/ASnackBar";

function DetailPerlengkapanScreen({ navigation, route }) {
  const id_perlengkapan = route.params.id;
  const context = useContext(UserContext);

  const [data, setData] = useState("data");

  const [message, setMessage] = useState();
  const [isSnackbarVisible, setSnackbarVisible] = useStateToggler();

  const [image, toggleImage] = useStateToggler();
  const [imageUri, setImageUri] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const [progressViewOffset, setProgressViewOffset] = useState(40);

  const status = () => {
    switch (data.status) {
      case "Tidak disetujui":
        return color.error.error50;
      case "Selesai":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (data.status) {
      case "Tidak disetujui":
        return color.error.error700;
      case "Selesai":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-5000);
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      setProgressViewOffset(-5000);
      navigation.goBack();
      return true;
    });
  }, []);

  useEffect(() => {
    context.toggleLoading(true);
    GetPerlengkapan();
  }, []);

  const GetPerlengkapan = () => {
    andalalinGetperlengkapan(
      context.detailPermohonan.id_andalalin,
      id_perlengkapan,
      context.getUser().access_token,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              const result = await response.data;
              setData(result.data);
              context.toggleLoading(false);
            })();
            break;
          case 409:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                GetPerlengkapan();
              }
            });
            break;
          default:
            context.toggleLoading(false);
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
      GetPerlengkapan();
    }, 50);
  }, []);

  const survei = () => {
    if (data.status != "Pemeriksaan" && data.status != "Survei") {
      return (
        <ADetailView style={{ marginTop: 20 }} title={"Survei lapangan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Data survei lapangan
            </AText>

            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Detail Survei", {
                  id: context.detailPermohonan.id_andalalin,
                  id_perlengkapan: data.id_perlengkapan,
                  jenis: "Permohonan",
                });
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
      );
    }
  };

  const pemasangan = () => {
    if (data.status == "Selesai") {
      return (
        <ADetailView
          style={{ marginTop: 20 }}
          title={"Pemasangan perlengkapan"}
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
              Data pemasangan
            </AText>

            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Detail Survei", {
                  id: context.detailPermohonan.id_andalalin,
                  id_perlengkapan: data.id_perlengkapan,
                  jenis: "Pemasangan",
                });
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
      );
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
              setProgressViewOffset(-5000);
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Perlengkapan
          </AText>
        </View>
      </View>

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
        {data != "data" ? (
          <View>
            <ADetailView title={"Informasi perlengkapan"}>
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
                  Status perlengkapan
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
                  {data.status}
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
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Kategori utama
                </AText>
                <AText
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {data.kategori_utama}
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
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Kategori perlengkapan
                </AText>
                <AText
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {data.kategori}
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
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Jenis perlengkapan
                </AText>
                <AText
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral500}
                  weight="normal"
                >
                  {data.perlengkapan}
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
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Gambar perlengkapan
                </AText>
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    setImageUri(`data:image/png;base64,${data.gambar}`);
                    toggleImage();
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

            <ADetailView style={{ paddingTop: 20 }} title={"Lokasi pemasangan"}>
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {data.pemasangan}
              </AText>

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
                  style={{ maxWidth: "30%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Latitude
                </AText>
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(data.latitude.toString());
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral500}
                    weight="normal"
                  >
                    {data.latitude}
                  </AText>
                </TouchableOpacity>
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
                  style={{ maxWidth: "30%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Longitude
                </AText>
                <TouchableOpacity
                  onPress={() => {
                    copyToClipboard(data.longitude.toString());
                  }}
                >
                  <AText
                    size={12}
                    color={color.neutral.neutral500}
                    weight="normal"
                  >
                    {data.longitude}
                  </AText>
                </TouchableOpacity>
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
                  style={{ maxWidth: "50%" }}
                  size={12}
                  color={color.neutral.neutral900}
                  weight="normal"
                >
                  Lokasi pemasangan dimap
                </AText>
                <TouchableOpacity
                  style={{ flexDirection: "row", paddingLeft: 4 }}
                  onPress={() => {
                    const koordinat = {
                      latitude: data.latitude,
                      longitude: data.longitude,
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
              style={{ paddingTop: 20 }}
              title={"Foto lokasi pemasangan"}
            >
              {data.foto.map((item, index) => (
                <View key={index}>
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
                      style={{ maxWidth: "70%" }}
                      size={12}
                      color={color.neutral.neutral900}
                      weight="normal"
                    >
                      {"Foto " + (index + 1)}
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
              ))}
            </ADetailView>

            <ADetailView style={{ paddingTop: 20 }} title={"Alasan"}>
              <AText
                style={{ padding: 16 }}
                size={12}
                color={color.neutral.neutral900}
                weight="normal"
              >
                {data.alasan}
              </AText>
            </ADetailView>

            {data.detail != "" && data.detail != null ? (
              <View>
                <ADetailView style={{ marginTop: 20 }} title={"Detail lainnya"}>
                  <AText
                    style={{ padding: 16 }}
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    {data.detail}
                  </AText>
                </ADetailView>
              </View>
            ) : (
              ""
            )}

            {survei()}

            {pemasangan()}

            {data.pertimbangan != "" && data.pertimbangan != null ? (
              <View>
                <ADetailView style={{ marginTop: 20 }} title={"Pertimbangan"}>
                  <AText
                    style={{ padding: 16 }}
                    size={12}
                    color={color.neutral.neutral900}
                    weight="normal"
                  >
                    {data.pertimbangan}
                  </AText>
                </ADetailView>
              </View>
            ) : (
              ""
            )}
          </View>
        ) : (
          ""
        )}

        <View style={{ paddingBottom: 32 }} />
      </ScrollView>

      {imageUri != null && imageUri != "" ? (
        <Modal
          isVisible={image}
          backdropOpacity={0.5}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={300}
          statusBarTranslucent
          coverScreen={true}
          deviceHeight={Dimensions.get("screen").height}
          backdropTransitionOutTiming={0}
          onBackButtonPress={() => {
            setImageUri();
            toggleImage();
          }}
          onBackdropPress={() => {
            setImageUri();
            toggleImage();
          }}
        >
          <View
            style={{
              overflow: "hidden",
              width: 250,
              height: 250,
              borderRadius: 8,
              alignSelf: "center",
              backgroundColor: color.text.white,
            }}
          >
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
              source={{
                uri: imageUri,
              }}
            />
          </View>
        </Modal>
      ) : (
        ""
      )}

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
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
  },
});

export default DetailPerlengkapanScreen;

import React, { useState, useContext, useRef } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import AButton from "./AButton";
import Geolocation from "react-native-geolocation-service";
import { useStateToggler } from "../../hooks/useUtility";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import { Feather } from "@expo/vector-icons";
import ADialog from "../utility/ADialog";
import { UserContext } from "../../context/UserContext";

function ALokasi({
  visibleModal = false,
  onPressOKButton,
  setLokasi,
  setLat,
  setLong,
}) {
  const [visible, setVisible] = React.useState(visibleModal);

  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const context = useContext(UserContext);
  const [alamat, setAlamat] = useState("");
  const [maps, setMaps] = useState("");
  const [alamatLengkap, setAlamatLengkap] = useState("");

  const webViewRef = useRef();
  const [permission, togglePermission] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();
  const [location, setLocation] = useState();
  const [lokasiKosong, toggleLokasiKosong] = useStateToggler();
  const [load, toggleLoad] = useState(false);

  const [tile, setTile] = useState("OpenStreetMap");

  const tileLayers = {
    OpenStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    Satelit:
      "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  const changeTileLayer = (layer) => {
    setTile(layer);
    const url = tileLayers[layer];
    webViewRef.current.injectJavaScript(`changeTileLayer('${url}');`);
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      context.toggleLoading(false);
      togglePermission();
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      context.toggleLoading(false);
      togglePermission();
    }

    return false;
  };

  async function getLokasi() {
    try {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        return;
      }

      context.toggleLoading(true);

      
      Geolocation.getCurrentPosition(
        (position) => {
          (async () => {
            const { latitude, longitude } = position.coords;
            let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });

            for (let item of response) {
              let address = `${item.street}`;
              let addressLengkap = `${item.street}, ${item.name}, ${item.district}, ${item.postalCode}, ${item.city}, ${item.subregion}, ${item.region}, ${item.country}`;

              setAlamat(address);
              setAlamatLengkap(addressLengkap);
            }

            setLocation(position);
            setMaps(`
            <html>
              <head>
              <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
              </head>
              <body style="margin: 0; padding: 0;">
                <div id="map" style="width: 100%; height: 100vh;"></div>
                <script>
                  var map = L.map('map').setView([${position.coords.latitude}, ${position.coords.longitude}], 20);
                  var currentTileLayer;

                  function changeTileLayer(url) {
                    if (currentTileLayer) {
                      map.removeLayer(currentTileLayer);
                    }
                    currentTileLayer = L.tileLayer(url).addTo(map);
                  }

                  changeTileLayer('${tileLayers.OpenStreetMap}');
                  L.marker([${position.coords.latitude}, ${position.coords.longitude}]).addTo(map)
                    .bindPopup('Lokasi saat ini')
                    .openPopup();
                </script>
              </body>
            </html>
            `);
          })();
        },
        (error) => {
          toggleGagal();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      toggleGagal();
    }
  }

  async function getLokasiUser() {
    try {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        return;
      }
      context.toggleLoading(true);
      Geolocation.getCurrentPosition(
        (position) => {
          (async () => {
            const { latitude, longitude } = position.coords;
            let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });

            for (let item of response) {
              let address = `${item.street}`;
              let addressLengkap = `${item.street}, ${item.name}, ${item.district}, ${item.postalCode}, ${item.city}, ${item.subregion}, ${item.region}, ${item.country}`;

              setAlamat(address);
              setAlamatLengkap(addressLengkap);
            }

            setLocation(position);
            webViewRef.current.reload();
          })();
        },
        (error) => {
          toggleGagal();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      toggleGagal();
    }
  }

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      getLokasi();
    } else {
      setTimeout(() => setVisible(false), 200);
      Animated.spring(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      Geolocation.stopObserving();
    }
  };

 

  const pilih_lokasi = () => {
    if (alamatLengkap != "") {
      setLokasi(alamatLengkap);
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);
      close();
    } else {
      toggleLokasiKosong();
    }
  };

  const close = () => {
    setTimeout(() => {
      setAlamat("");
      setAlamatLengkap("");
      setMaps("");
      setLocation();
      toggleLoad(false);
    }, 500);
    onPressOKButton();
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
      onRequestClose={() => {
        close();
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => {
          close();
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.horizontal}>
            <AText color={color.neutral.neutral900} size={18} weight="semibold">
              Pilih lokasi bangunan
            </AText>

            <View style={styles.map}>
              {maps != "" ? (
                <WebView
                  ref={webViewRef}
                  source={{ html: maps }}
                  onLoadEnd={() => {
                    context.toggleLoading(false);
                    toggleLoad(true);
                  }}
                />
              ) : (
                ""
              )}

              {load ? (
                <Pressable
                  style={{
                    alignSelf: "baseline",
                    position: "absolute",
                    bottom: 32,
                    right: 24,
                    backgroundColor: color.text.white,
                    borderRadius: 8,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: color.neutral.neutral300,
                    shadowColor: "rgba(16, 24, 40, 0.05)",
                    elevation: 8,
                  }}
                  onPress={() => {
                    getLokasiUser();
                  }}
                >
                  <Feather
                    style={{ padding: 8 }}
                    name="navigation"
                    size={20}
                    color={color.primary.main}
                  />
                </Pressable>
              ) : (
                ""
              )}

              {load ? (
                <Pressable
                  style={{
                    alignSelf: "baseline",
                    position: "absolute",
                    bottom: 32,
                    left: 24,
                    backgroundColor: color.text.white,
                    borderRadius: 8,
                    padding: 6,
                    borderWidth: 1,
                    borderColor: color.neutral.neutral300,
                    shadowColor: "rgba(16, 24, 40, 0.05)",
                    elevation: 8,
                  }}
                  onPress={() => {
                    switch (tile) {
                      case "OpenStreetMap":
                        changeTileLayer("Satelit");
                        break;
                      case "Satelit":
                        changeTileLayer("OpenStreetMap");
                        break;
                    }
                  }}
                >
                  <Feather
                    style={{ padding: 8 }}
                    name="map"
                    size={20}
                    color={color.primary.main}
                  />
                </Pressable>
              ) : (
                ""
              )}
            </View>
            {load ? (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 24,
                    width: "100%",
                    paddingHorizontal: 16,
                  }}
                >
                  <View
                    style={{
                      borderColor: color.primary.primary50,
                      borderWidth: 2,
                      borderRadius: 28,
                      backgroundColor: color.primary.primary100,
                      alignSelf: "baseline",
                    }}
                  >
                    <Feather
                      style={{ padding: 8 }}
                      name="map-pin"
                      size={16}
                      color={color.primary.main}
                    />
                  </View>
                  <View style={{ paddingLeft: 16, alignContent: "flex-start" }}>
                    <AText size={12} color={color.neutral.neutral900}>
                      {alamat}
                    </AText>
                    <AText
                      style={{ paddingTop: 8, marginRight: 40 }}
                      size={12}
                      color={color.neutral.neutral500}
                    >
                      {alamatLengkap}
                    </AText>
                  </View>
                </View>
              </View>
            ) : (
              ""
            )}

            <ADialog
              title={"Izin lokasi"}
              desc={"Izin atau lokasi pada perangkat Anda belum di aktifkan"}
              visibleModal={permission}
              btnOK={"OK"}
              onPressOKButton={() => {
                togglePermission();
                onPressOKButton();
              }}
            />

            <ADialog
              title={"Lokasi gagal dimuat"}
              desc={
                "Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"
              }
              visibleModal={gagal}
              btnOK={"OK"}
              onPressOKButton={() => {
                toggleGagal();
                onPressOKButton();
              }}
            />

            <ADialog
              title={"Lokasi"}
              desc={"Lokasi belum dipilih"}
              visibleModal={lokasiKosong}
              btnOK={"OK"}
              onPressOKButton={() => {
                toggleLokasiKosong();
              }}
            />

            {load ? (
              <AButton
                style={{ marginVertical: 24 }}
                title={"Pilih lokasi"}
                mode="contained"
                onPress={() => {
                  pilih_lokasi();
                }}
              />
            ) : (
              ""
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 16,
  },
  horizontal: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: color.primary.primary50,
    height: "77%",
  },
  map: {
    paddingTop: 8,
    height: "60%",
    width: "100%",
  },
});

export default ALokasi;

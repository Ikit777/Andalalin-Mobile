import React, { useEffect, useContext, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  Pressable,
  Platform,
  PermissionsAndroid,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import { useStateToggler } from "../hooks/useUtility";
import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import { Feather } from "@expo/vector-icons";
import ADialog from "../component/utility/ADialog";
import AButton from "../component/utility/AButton";

function PilihLokasiScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;

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
              let street = item.street != null ? (item.street + ", ") : ("");
              let name = item.name != null ? (item.name + ", ") : ("");
              let district = item.district != null ? (item.district + ", ") : ("");
              let postalCode = item.postalCode != null ? (item.postalCode + ", ") : ("");
              let city = item.city != null ? (item.city + ", ") : ("");
              let subregion = item.subregion != null ? (item.subregion + ", ") :("");
              let region = item.region != null ? (item.region + ", ") : ("");
              let addressLengkap = `${street}${name}${district}${postalCode}${city}${subregion}${region}${"Indonesia"}`;

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
        () => {
          context.toggleLoading(false);
          toggleGagal();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      context.toggleLoading(false);
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
              let street = item.street != null ? (item.street + ", ") : ("");
              let name = item.name != null ? (item.name + ", ") : ("");
              let district = item.district != null ? (item.district + ", ") : ("");
              let postalCode = item.postalCode != null ? (item.postalCode + ", ") : ("");
              let city = item.city != null ? (item.city + ", ") : ("");
              let subregion = item.subregion != null ? (item.subregion + ", ") :("");
              let region = item.region != null ? (item.region + ", ") : ("");
              let addressLengkap = `${street}${name}${district}${postalCode}${city}${subregion}${region}${"Indonesia"}`;

              setAlamatLengkap(addressLengkap);
            }

            setLocation(position);
            webViewRef.current.reload();
          })();
        },
        () => {
          context.toggleLoading(false);
          toggleGagal();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      context.toggleLoading(false);
      toggleGagal();
    }
  }

  const pilih_lokasi = () => {
    if (alamatLengkap != "") {
      if (kondisi == "Pengajuan andalalin") {
        context.dispatch({
          lokasi_bangunan: alamatLengkap,
          lat_bangunan: location.coords.latitude,
          long_bangunan: location.coords.longitude,
        });
        navigation.goBack();
      } else if (kondisi == "Pengajuan perlalin") {
        context.setPerlalin({
          titik_pemasangan: alamatLengkap,
          lat_pemasangan: location.coords.latitude,
          long_pemasangan: location.coords.longitude,
        });
        navigation.goBack();
      }
    } else {
      toggleLokasiKosong();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getLokasi();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
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
              navigation.goBack();
            }}
          />
         <AText
            style={{ paddingLeft: 4}}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Pilih lokasi
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.map}>
          {maps != "" ? (
            <WebView
              ref={webViewRef}
              source={{ html: maps }}
              onLoadEnd={() => {
                context.toggleLoading(false);
                toggleLoad(true);
                Geolocation.stopObserving();
              }}
            />
          ) : (
            ""
          )}

          {load ? (
            <Pressable
              android_ripple={{
                color: "rgba(0, 0, 0, 0.1)",
                borderless: false,
                radius: 32,
              }}
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
              android_ripple={{
                color: "rgba(0, 0, 0, 0.1)",
                borderless: false,
                radius: 32,
              }}
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
                paddingTop: 32,
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
                <AText
                  style={{ marginRight: 40 }}
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

        {load ? (
          <View style={{ marginVertical: 32, paddingHorizontal: 16 }}>
            <AButton
              title={"Pilih lokasi"}
              mode="contained"
              onPress={() => {
                pilih_lokasi();
              }}
            />
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
            navigation.goBack();
          }}
        />

        <ADialog
          title={"Lokasi gagal dimuat"}
          desc={
            "Terjadi kesalahan pada server, mohon coba lagi lain waktu"
          }
          visibleModal={gagal}
          btnOK={"OK"}
          onPressOKButton={() => {
            toggleGagal();
            navigation.goBack();
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
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingBottom: 16,
  },
  map: {
    height: "70%",
    width: "100%",
  },
});

export default PilihLokasiScreen;

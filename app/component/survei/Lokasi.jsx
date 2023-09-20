import React, { useContext, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import { Feather } from "@expo/vector-icons";
import color from "../../constants/color";
import AText from "../utility/AText";
import ADialog from "../utility/ADialog";
import * as RootNavigation from "../../navigation/RootNavigator.js";
import { UserContext } from "../../context/UserContext";

import Geolocation from "react-native-geolocation-service";

function Lokasi({ onPress, id }) {
  const {
    survei: { lat, long, lokasi, jalan },
    setSurvei,
  } = useContext(UserContext);
  const context = useContext(UserContext);
  const [alamat, setAlamat] = useState(jalan);
  const [maps, setMaps] = useState("");
  const [alamatLengkap, setAlamatLengkap] = useState(lokasi);

  const webViewRef = useRef();
  const [permission, togglePermission] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();
  const [location, setLocation] = useState();
  const [lokasiKosong, toggleLokasiKosong] = useStateToggler();
  const [load, toggleLoad] = useState(false);

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

  useEffect(() => {
    if (lokasi == "") {
      context.toggleLoading(true);
      getLokasi();
    } else {
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
                  var map = L.map('map').setView([${lat}, ${long}], 20);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                  }).addTo(map);
                  L.marker([${lat}, ${long}]).addTo(map)
                    .bindPopup('Lokasi saat ini')
                    .openPopup();
                </script>
              </body>
            </html>
            `);
    }
  }, []);

  async function getLokasi() {
    try {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        return;
      }

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
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                  }).addTo(map);
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
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                  }).addTo(map);
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

  const pilih_lokasi = () => {
    if (alamatLengkap != "") {
      if (location != null) {
        setSurvei({
          lat: location.coords.latitude,
          long: location.coords.longitude,
          lokasi: alamatLengkap,
          jalan: alamat,
        });
      } else {
        setSurvei({
          lat: lat,
          long: long,
          lokasi: lokasi,
          jalan: jalan,
        });
      }

      onPress();
    } else {
      toggleLokasiKosong();
    }
  };

  return (
    <View style={styles.content}>
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
              right: 32,
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
          <View style={{ paddingHorizontal: 16 }}>
            <AButton
              style={{ marginTop: 32, marginBottom: 50, paddingHorizontal: 16 }}
              title={"Pilih lokasi"}
              mode="contained"
              onPress={() => {
                pilih_lokasi();
              }}
            />
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
          RootNavigation.replace("Detail", { id: id });
          context.setIndexSurvei(1);
        }}
      />

      <ADialog
        title={"Lokasi gagal dimuat"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={gagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleGagal();
          RootNavigation.replace("Detail", { id: id });
          context.setIndexSurvei(1);
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
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  map: {
    height: "70%",
    width: "100%",
  },
});

export default Lokasi;

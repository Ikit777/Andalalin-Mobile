import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, View, Pressable } from "react-native";
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

function Lokasi({ onPress, id }) {
  const {
    survei: { lat, long, lokasi },
    setSurvei,
  } = useContext(UserContext);
  const context = useContext(UserContext);
  const [alamat, setAlamat] = useState();
  const [maps, setMaps] = useState("");
  const [alamatLengkap, setAlamatLengkap] = useState(lokasi);

  const webViewRef = useRef();
  const [permission, togglePermission] = useStateToggler();
  const [location, setLocation] = useState();
  const [lokasiKosong, toggleLokasiKosong] = useStateToggler();
  const [load, toggleLoad] = useState(false);

  useEffect(() => {
    (async () => {
      context.toggleLoading(true);
      loadMapsLocation();
    })();
  }, []);

  const loadMapsLocation = async () => {
    try {
      context.toggleLoading(true);
      (await Location.requestForegroundPermissionsAsync()).canAskAgain;
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });

      const { latitude, longitude } = location.coords;
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

      setLocation(location);
      setMaps(`
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          />
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        </head>
        <body style="margin: 0; padding: 0;">
          <div id="map" style="width: 100%; height: 100vh;"></div>
          <script>
            var map = L.map('map').setView([${location.coords.latitude}, ${location.coords.longitude}], 20);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap'
            }).addTo(map);
            L.marker([${location.coords.latitude}, ${location.coords.longitude}]).addTo(map)
              .bindPopup('Lokasi anda!')
              .openPopup();
          </script>
        </body>
      </html>
      `);
    } catch (error) {
      context.toggleLoading(false);
      togglePermission();
    }
  };

  const getLokasiSekarang = async () => {
    context.toggleLoading(true);
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });

      const { latitude, longitude } = location.coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.street}`;
        let addressLengkap = `${item.street}, ${item.name}, ${item.district},\n${item.postalCode}, ${item.city},\n${item.subregion}, ${item.region},\n${item.country}`;

        setAlamat(address);
        setAlamatLengkap(addressLengkap);
      }

      setLocation(location);
      webViewRef.current.reload();
      setMaps(`
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          />
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        </head>
        <body style="margin: 0; padding: 0;">
          <div id="map" style="width: 100%; height: 100vh;"></div>
          <script>
            var map = L.map('map').setView([${location.coords.latitude}, ${location.coords.longitude}], 20);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap'
            }).addTo(map);
            L.marker([${location.coords.latitude}, ${location.coords.longitude}]).addTo(map)
              .bindPopup('Lokasi anda!')
              .openPopup();
          </script>
        </body>
      </html>
      `);
    } catch (error) {
      context.toggleLoading(false);
      togglePermission();
    }
  };

  const pilih_lokasi = () => {
    if (alamatLengkap != "") {
      setSurvei({
        lat: location.coords.latitude,
        long: location.coords.longitude,
        lokasi: alamatLengkap,
      });
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
              getLokasiSekarang();
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
              paddingTop: 16,
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

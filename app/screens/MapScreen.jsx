import React, { useEffect, useRef, useContext, useState } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { WebView } from "react-native-webview";
import { UserContext } from "../context/UserContext";

function MapScreen({ navigation, route }) {
  const koordinat = route.params.koordinat;
  const context = useContext(UserContext);
  const webViewRef = useRef();
  const [maps, setMaps] = useState("");

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

  useEffect(() => {
    context.toggleLoading(true);
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
                  var map = L.map('map').setView([${koordinat.latitude}, ${koordinat.longitude}], 20);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap'
                  }).addTo(map);
                  L.marker([${koordinat.latitude}, ${koordinat.longitude}]).addTo(map)
                    .bindPopup('Lokasi survei lapangan')
                    .openPopup();
                </script>
              </body>
            </html>
            `);
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
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Lokasi survei
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        {maps != "" ? (
          <WebView
            ref={webViewRef}
            source={{ html: maps }}
            onLoadEnd={() => {
              context.toggleLoading(false);
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : (
          ""
        )}
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: { flex: 1, paddingBottom: 16 },
});

export default MapScreen;

import React, { useEffect, useRef, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { WebView } from "react-native-webview";
import { UserContext } from "../context/UserContext";
import { Feather } from "@expo/vector-icons";

function MapScreen({ navigation, route }) {
  const koordinat = route.params.koordinat;
  const context = useContext(UserContext);
  const webViewRef = useRef();
  const [maps, setMaps] = useState("");
  const [tile, setTile] = useState("OpenStreetMap");
  const [load, toggleLoad] = useState(false);

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
                  var currentTileLayer;

                  function changeTileLayer(url) {
                    if (currentTileLayer) {
                      map.removeLayer(currentTileLayer);
                    }
                    currentTileLayer = L.tileLayer(url).addTo(map);
                  }

                  changeTileLayer('${tileLayers.OpenStreetMap}');
                  
                  L.marker([${koordinat.latitude}, ${koordinat.longitude}]).addTo(map)
                    .bindPopup('Lokasi')
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
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Lokasi
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
              toggleLoad(true);
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        ) : (
          ""
        )}
      </View>

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
            left: 32,
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
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: { flex: 1, paddingBottom: 16 },
});

export default MapScreen;

import React, { useEffect } from "react";
import { StyleSheet, View, Image, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import Constants from "expo-constants";

function TentangScreen({ navigation }) {
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
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Tentang
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 64, height: 64 }}
            source={require("../assets/image/icon_app.png")}
          />
          <View style={{ paddingLeft: 16 }}>
            <AText size={16} color={color.neutral.neutral900} weight="semibold">
              Andalalin
            </AText>
            <AText size={14} color={color.neutral.neutral500} weight="normal">
              {Constants.expoConfig.version}
            </AText>
          </View>
        </View>
        <AText
          style={{ paddingTop: 16 }}
          size={14}
          color={color.neutral.neutral500}
          weight="normal"
        >
          Andalalin adalah aplikasi yang memiliki kegunaan untuk melakukan
          permohonan, pengajuan, pengadaan dan pelacakan dokumen analisis dampak
          lalu lintas atau perlengkapan rambu lalu lintas.
        </AText>
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
});

export default TentangScreen;

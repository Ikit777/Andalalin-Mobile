import React, {useEffect} from "react";
import { StyleSheet, View, Image, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";

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
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
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
            paddingTop: 10,
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
              1.0.0
            </AText>
          </View>
        </View>
        <AText
          style={{ paddingTop: 16 }}
          size={14}
          color={color.neutral.neutral500}
          weight="normal"
        >
          Andalalin adalah sebuah aplikasi yang digunakan untuk melakukan
          permohonan, pengajuan dan pelacakan dokumen Andalalin atau rambu lalu
          lintas.
        </AText>
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    padding: 16,
  },
});

export default TentangScreen;

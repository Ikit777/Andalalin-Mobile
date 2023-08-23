import React from "react";
import { StyleSheet, Image, View } from "react-native";
import AScreen from "../component/utility/AScreen";
import AText from "../component/utility/AText";
import AButton from "../component/utility/AButton";
import color from "../constants/color";

function OnBoardingscreen({ navigation }) {
  return (
    <AScreen>
      <View style={styles.content}>
        <View style={{ marginBottom: 128 }}>
          <Image
            source={require("../assets/image/icon.png")}
            style={styles.stretch}
          />
        </View>
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Selamat datang di{"\n"}andalalin
        </AText>
        <View style={{ paddingTop: 8 }}>
          <AText color={color.neutral.neutral500} size={16} weight="normal">
            Management lalu lintas dengan mudah dan tepat bersama andalalin
          </AText>
        </View>
        <View style={{ paddingTop: 128, paddingBottom: 16 }}>
          <AButton mode="contained" title="Mulai" onPress={() => {navigation.navigate("Login")}} />
        </View>
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
  },
  stretch: {
    width: 145,
    height: 118,
    alignSelf: "center",
    resizeMode: "contain",
  },
});

export default OnBoardingscreen;

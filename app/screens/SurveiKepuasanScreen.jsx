import React, { useEffect } from "react";
import { StyleSheet, View, Image, BackHandler } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import APolygon from "../component/utility/APolygon";
import ADetailView from "../component/utility/ADetailView";

function SurveiKepuasanScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        navigation.replace("Back Home");
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        navigation.replace("Back Home");
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

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
              navigation.replace("Back Home");
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Survei kepuasan
          </AText>
        </View>
      </View>
      <View style={styles.content}>
        <View
          style={{
            height: 175,
            width: 175,
            alignSelf: "center",
          }}
        >
          <APolygon skor={"91.32"} />
        </View>
        <AText
          style={{ alignSelf: "center" }}
          size={16}
          color={color.neutral.neutral900}
          weight="semibold"
        >
          Indeks Kepuasan Masyakat
        </AText>

        <ADetailView style={{ marginTop: 32 }} title={"Informasi survei"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Priode survei
            </AText>
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              01 - 30 September 2023
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
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Jumlah responden
            </AText>
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              52
            </AText>
          </View>
        </ADetailView>

        <ADetailView style={{ marginTop: 20 }} title={"Unsur layanan"}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
            }}
          >
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Informasi
            </AText>
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              80.52
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
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Persyaratan
            </AText>
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              86.82
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
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Prosedur/alur
            </AText>
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              86.82
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
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              Respon
            </AText>
            <AText size={12} color={color.neutral.neutral900} weight="normal">
              86.82
            </AText>
          </View>
        </ADetailView>
      </View>
    </AScreen>
  );
}

const styles = StyleSheet.create({
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

export default SurveiKepuasanScreen;

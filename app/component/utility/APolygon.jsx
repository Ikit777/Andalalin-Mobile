import { StyleSheet, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../constants/color";
import AText from "./AText";

const APolygon = ({ skor }) => {
  return (
    <View style={{ height: 191 }}>
      <MaterialCommunityIcons
        name="hexagon"
        size={175}
        color="white"
        style={styles.polygon1}
      />
      <MaterialCommunityIcons
        name="hexagon"
        size={159}
        color={color.primary.main}
        style={[styles.polygon, { marginTop: 8 }]}
      />
      <MaterialCommunityIcons
        name="hexagon"
        size={131}
        color={color.primary.primary25}
        style={[styles.polygon, { paddingTop: 22 }]}
      />

      <View style={styles.skor}>
        <AText
          size={32}
          color={color.neutral.neutral900}
          weight="semibold"
          style={{
            textAlign: "center",
            shadowColor: "rgba(16, 24, 40, 0.10)",
          }}
        >
          {skor}
        </AText>
      </View>
    </View>
  );
};

export default APolygon;

const styles = StyleSheet.create({
  polygon1: {
    borderRadius: 8,
    position: "absolute",
    shadowOpacity: 0.1,
    textShadowRadius: 20,
    textShadowOffset: { width: 0, height: 4 },
  },
  polygon: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 8,
  },
  skor: {
    height: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { StyleSheet, View } from "react-native";
import color from "../../constants/color";
import AText from "./AText";

function ADetailView({ children, title, style }) {
  return (
    <View style={[style]}>
      <AText color={color.neutral.neutral700} size={14}>
        {title}
      </AText>
      <View style={styles.detail}>
        <View style={styles.child}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    borderRadius: 20,
    shadowColor: "rgba(16, 24, 40, 0.10)",
    elevation: 8,
    paddingVertical: 4
  },
  child: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: color.text.white,
  },
});

export default ADetailView;

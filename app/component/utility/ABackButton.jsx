import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ABackButton({ onPress, style, color = "#210A0A" }) {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={[style]}>
      <View style={styles.back}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={color} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  back: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default ABackButton;

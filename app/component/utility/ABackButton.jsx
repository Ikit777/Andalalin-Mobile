import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ABackButton({ onPress, style, color = "#210A0A" }) {
  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <View style={styles.back}>
        <MaterialCommunityIcons name="arrow-left" size={28} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  back: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

export default ABackButton;

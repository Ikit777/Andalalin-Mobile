import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import color from "../../constants/color";

function ABackButton({ onPress, style }) {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={[style]}>
      <View style={styles.back}>
      <MaterialCommunityIcons name="arrow-left" size={28} color={color.neutral.neutral900} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  back: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default ABackButton;

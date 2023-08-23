import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import color from "../../constants/color";
import AText from "./AText";

function ANotificationCard({ style, title, desc }) {
  return (
    <View style={[styles.notif, style]}>
      <AText size={14} color={color.neutral.neutral900} weight="normal">
        {title}
      </AText>
      <AText
        style={{ paddingTop: 8 }}
        size={14}
        color={color.neutral.neutral500}
        weight="normal"
      >
        {desc}
      </AText>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  notif: {},
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
    marginTop: 16,
  },
});

export default ANotificationCard;

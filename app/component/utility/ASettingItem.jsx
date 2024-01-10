import React from "react";
import { TouchableHighlight, StyleSheet, View } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { Feather } from "@expo/vector-icons";

function ASettingItem({ onPress, icon, title, style }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.hover, style]}
      underlayColor={"rgba(0, 0, 0, 0.1)"}
    >
      <View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              style={{ padding: 0 }}
              name={icon}
              size={24}
              color={color.neutral.neutral900}
            />
            <AText
              style={{ paddingLeft: 16 }}
              color={color.neutral.neutral900}
              size={14}
              weight="normal"
            >
              {title}
            </AText>
          </View>
          <Feather
            name="arrow-right"
            size={24}
            color={color.neutral.neutral900}
          />
        </View>
        <View style={{ height: 1, backgroundColor: color.neutral.neutral50 }} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: color.neutral.neutral900,
    backgroundColor: color.primary.primary25,
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  hover: {
    overflow: "visible",
    borderRadius: 8,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});

export default ASettingItem;

import React from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";

import Colors from "../../constants/color";
import AText from "../../component/utility/AText";
import { poppins } from "../../constants/font";

function AButton({
  mode = "text",
  onPress,
  style,
  title,
  disabled,
  weight = "normal",
}) {
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          alignItems: "center",
          backgroundColor: styles[mode].backgroundColor,
          borderRadius: 8,
          justifyContent: "center",
          paddingHorizontal: styles[mode].paddingHorizontal,
          paddingVertical: styles[mode].paddingVertical,
          fontFamily: poppins[weight],
          width: "100%",
          borderColor: mode === "secondary"  ? Colors.background.yellow : Colors.text.brown ,
          borderWidth: mode === "outlined" || mode === "outlined2" || mode === "secondary"? 1 : 0,
        },
        style,
      ]}
      underlayColor={styles[mode].pressedBackgroundColor}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AText
          style={{
            color: styles[mode].color,
          }}
          size={16}
          weight="semibold"
        >
          {title}
        </AText>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  contained: {
    color: Colors.text.white,
    backgroundColor: Colors.primary.primary500,
    pressedBackgroundColor: Colors.primary.primary600,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  text: {
    color: Colors.primary.primary700,
    backgroundColor: "transparent",
    pressedBackgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  secondary: {
    color: "#7c6900",
    backgroundColor: "#ffd600",
    pressedBackgroundColor: "#e5c000",
  },
  outlined: {
    color: Colors.neutral.neutral300,
    backgroundColor: Colors.neutral.main,
    pressedBackgroundColor: Colors.neutral.neutral200,
  }
});

export default AButton;

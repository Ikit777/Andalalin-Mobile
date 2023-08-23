import React from "react";
import { Text } from "react-native";
import { poppins } from "../../constants/font";

function AText({
  color,
  children,
  size,
  style,
  weight = "normal",
}) {
  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          color: color,
          fontSize: size,
          fontFamily: poppins[weight],
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export default AText;

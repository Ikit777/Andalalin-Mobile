import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import AText from "./AText";
import color from "../../constants/color";
import { Feather } from "@expo/vector-icons";
import { useStateToggler } from "../../hooks/useUtility";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function AJenisDropdown({ hint, padding, bdColor, children }) {
  const [open, setOpen] = useStateToggler();

  const toggleView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen();
  };

  return (
    <View style={{ paddingTop: padding }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: bdColor,
          backgroundColor: color.text.white,
          alignItems: "center"
        }}
        onPress={() => {
          toggleView();
        }}
      >
        <AText size={16} color={color.neutral.neutral900}>
          {hint}
        </AText>
        {open ? (
          <Feather
            name="chevron-up"
            size={20}
            color={color.neutral.neutral900}
          />
        ) : (
          <Feather
            name="chevron-down"
            size={20}
            color={color.neutral.neutral900}
          />
        )}
      </TouchableOpacity>

      {open && (
        <View>
          {children}
        </View>
      )}
    </View>
  );
}

export default AJenisDropdown;

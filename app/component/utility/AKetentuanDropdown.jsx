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

function AKetentuanDropdown({ bottom, hint, data, padding, bdColor }) {
  const [open, setOpen] = useStateToggler();

  const toggleView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen();
  };

  return (
    <View style={{ paddingTop: padding, paddingBottom: bottom }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
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
          <View>
            <AText size={16} color={color.neutral.neutral500}>
              {data}
            </AText>
          </View>
        </View>
      )}
      
    </View>
  );
}

export default AKetentuanDropdown;

import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import AText from "./AText";
import color from "../../constants/color";
import { Feather } from "@expo/vector-icons";
import { useStateToggler } from "../../hooks/useUtility";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ADropDownCostume({
  judul,
  hint,
  data,
  saved,
  selected,
  padding,
  bdColor,
  max,
  notFound,
}) {
  const [open, setOpen] = useStateToggler();
  const [value, setValue] = useState();

  const toggleView = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen();
  };

  useEffect(() => {
    setValue(saved);
    selected(saved);
  }, [saved]);

  return (
    <View style={{ paddingTop: padding }}>
      {judul != null ? (
        <AText
          style={{ paddingBottom: 6 }}
          color={color.neutral.neutral700}
          size={14}
        >
          {judul}
        </AText>
      ) : (
        ""
      )}

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
          alignItems: "center",
        }}
        onPress={toggleView}
      >
        <AText
          style={{ width: "95%" }}
          size={16}
          color={
            value == "" ? color.neutral.neutral500 : color.neutral.neutral900
          }
        >
          {value == "" ? hint : value}
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

      {open &&
        (data.length == 0 ? (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 10,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderColor: color.neutral.neutral300,
              backgroundColor: color.text.white,
            }}
          >
            <View>
              <AText
                style={{ paddingVertical: 7 }}
                size={16}
                color={color.neutral.neutral900}
              >
                {notFound}
              </AText>
            </View>
          </View>
        ) : (
          <ScrollView
            style={{
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 10,
              borderColor: color.neutral.neutral300,
              backgroundColor: color.text.white,
              maxHeight: max,
            }}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 14,
              overflow: "hidden",
            }}
            showsVerticalScrollIndicator={false}
            persistentScrollbar={true}
          >
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={toggleView}
                onPressIn={() => {
                  setValue(item.value);
                  selected(item.value);
                }}
              >
                <AText
                  style={{ paddingVertical: 6 }}
                  size={16}
                  color={color.neutral.neutral900}
                >
                  {item.value}
                </AText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ))}
    </View>
  );
}

export default ADropDownCostume;

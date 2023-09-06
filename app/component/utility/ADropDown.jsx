import React from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { poppins } from "../../constants/font";
import AText from "./AText";
import color from "../../constants/color";
import { Feather } from "@expo/vector-icons";

function ADropDown({ judul, hint, data, saved, selected, padding, bdColor, max, notFound }) {

  return (
    <View style={{ paddingTop: padding }}>
      <AText
        style={{ paddingBottom: 6 }}
        color={color.neutral.neutral700}
        size={14}
      >
        {judul}
      </AText>
      <SelectList
        setSelected={selected}
        arrowicon={<Feather name="chevron-down" size={20} color="black" />}
        fontFamily={poppins.normal}
        inputStyles={{ fontSize: 19 }}
        dropdownTextStyles={{ fontSize: 19 }}
        boxStyles={{ backgroundColor: color.text.white, borderColor: bdColor}}
        dropdownStyles={{
          backgroundColor: color.text.white,
          borderColor: color.neutral.neutral300,
        }}
        maxHeight={max}
        placeholder={hint}
        search={false}
        data={data}
        save="value"
        defaultOption={{key:saved, value:saved}}
        notFoundText={notFound}
      />
    </View>
  );
}

export default ADropDown;

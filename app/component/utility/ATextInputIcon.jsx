import React from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { poppins } from "../../constants/font";
import AText from "./AText";
import color from "../../constants/color";
import { Feather } from "@expo/vector-icons";

const ATextInputIcon = React.forwardRef((props, ref) => {
  return (
    <View style={{ flexDirection: "column", paddingTop: props.padding }}>
      <AText color={color.neutral.neutral700} size={14}>
        {props.title}
      </AText>
      <Pressable onPress={props.onPress} style={[styles.border, { borderColor: props.bdColor }]}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholderTextColor={color.neutral.neutral500}
          onChangeText={props.onChangeText}
          allowFontScaling={false}
          value={props.value}
          placeholder={props.hint}
          autoComplete="off"
          ref={ref}
        />
        <Feather
          style={{ paddingRight: 14 }}
          name={props.icon}
          size={16}
          color={color.neutral.neutral900}
        />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  border: {
    backgroundColor: color.text.white,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    boderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    paddingLeft: 14,
    paddingVertical: 10,
    fontFamily: poppins.normal,
    fontSize: 16,
    color: color.neutral.neutral700,
  },
});

export default ATextInputIcon;

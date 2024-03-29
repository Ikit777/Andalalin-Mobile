import React from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { poppins } from "../../constants/font";
import AText from "./AText";
import color from "../../constants/color";
import { Feather } from "@expo/vector-icons";

const ATextInputIcon = React.forwardRef((props, ref) => {
  return (
    <View style={{ flexDirection: "column", paddingTop: props.padding }}>
      {props.title != null ? (
        <View style={{ flexDirection: "row" }}>
          <AText
            color={color.neutral.neutral700}
            size={14}
            style={{ paddingRight: 2 }}
          >
            {props.title}{" "}
            <AText color={color.error.error500} size={14}>
              {props.wajib}
            </AText>
          </AText>
        </View>
      ) : (
        ""
      )}
      <Pressable
        onPress={props.onPress}
        style={[styles.border, { borderColor: props.bdColor }]}
      >
        <TextInput
          editable={false}
          style={[
            styles.input,
            {
              maxHeight: props.maxHeight,
              width: props.width == null ? "100%" : "90%",
            },
          ]}
          numberOfLines={props.max}
          placeholderTextColor={color.neutral.neutral500}
          onChangeText={props.onChangeText}
          allowFontScaling={false}
          value={props.value}
          multiline={props.mult}
          placeholder={props.hint}
          autoCapitalize="none"
          textAlignVertical="top"
          autoComplete="off"
          ref={ref}
          underlineColorAndroid="transparent"
        />
        <Feather
          style={{ position: "absolute", right: 14 }}
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
    paddingLeft: 14,
    paddingVertical: 10,
    fontFamily: poppins.normal,
    fontSize: 16,
    color: color.neutral.neutral700,
  },
});

export default ATextInputIcon;

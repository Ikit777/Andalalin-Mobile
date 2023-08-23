import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { poppins } from "../../constants/font";
import AText from "../utility/AText";
import color from "../../constants/color";

const ATextInput = React.forwardRef((props, ref) =>
{
  return (
    <View style={{ flexDirection: "column", paddingTop: props.padding, paddingBottom: props.bottom }}>
      <AText color={color.neutral.neutral700} size={14}>
        {props.title}
      </AText>
      <View style={[styles.border, {borderColor: props.bdColor}]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={color.neutral.neutral500}
          onChangeText={props.onChangeText}
          allowFontScaling={false}
          value={props.value}
          placeholder={props.hint}
          keyboardType={props.ktype}
          selectionColor={color.neutral.neutral400}
          autoComplete="off"
          multiline={props.multi}
          textAlignVertical="top"
          returnKeyType={props.rtype}
          onSubmitEditing={props.submit}
          ref={ref}
          blurOnSubmit={props.blur}
        >
        </TextInput>
      </View>
    </View>
  );
})

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
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: poppins.normal,
    fontSize: 16,
    color: color.neutral.neutral700,
  },
});

export default ATextInput;

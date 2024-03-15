import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { poppins } from "../../constants/font";
import AText from "../utility/AText";
import color from "../../constants/color";

const ATextInput = React.forwardRef((props, ref) => {
  return (
    <View
      style={{
        flexDirection: "column",
        paddingTop: props.padding,
        paddingBottom: props.bottom,
      }}
    >
      {props.title != null ? (
        <AText color={color.neutral.neutral700} size={14}>
          {props.title}{" "}
          <AText color={color.error.error500} size={14}>
            {props.wajib}
          </AText>
        </AText>
      ) : (
        ""
      )}

      <View
        style={[
          styles.border,
          { borderColor: props.bdColor, width: props.lebar },
        ]}
      >
        <TextInput
          style={[styles.input, { maxHeight: props.maxHeight }]}
          placeholderTextColor={color.neutral.neutral500}
          onChangeText={props.onChangeText}
          allowFontScaling={false}
          value={props.value}
          placeholder={props.hint}
          keyboardType={props.ktype}
          selectionColor={color.neutral.neutral400}
          autoComplete="off"
          autoCapitalize="none"
          inputMode={props.inputMode}
          multiline={props.multi}
          maxLength={props.maksimal}
          numberOfLines={props.max}
          textAlignVertical="top"
          returnKeyType={props.rtype}
          onSubmitEditing={props.submit}
          onBlur={props.onBlur}
          ref={ref}
          blurOnSubmit={props.blur}
          underlineColorAndroid="transparent"
        />
      </View>
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

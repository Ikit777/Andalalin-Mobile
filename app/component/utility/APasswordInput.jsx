import React from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { poppins } from "../../constants/font";
import AText from "../utility/AText";
import color from "../../constants/color";
import { Feather } from '@expo/vector-icons'; 

const APasswordInput = React.forwardRef((props, ref) =>
{
  return (
    <View style={{ flexDirection: "column", paddingTop: 20, paddingBottom: props.bottom }}>
      <AText color={color.neutral.neutral700} size={14}>
        {props.title}
      </AText>
      <View style={[styles.border, {borderColor: props.bdColor}]}>
        <TextInput
          style={[styles.input, props.style]}
          placeholderTextColor={color.neutral.neutral500}
          onChangeText={props.onChangeText}
          allowFontScaling={false}
          placeholder={props.hint}
          selectionColor={color.neutral.neutral400}
          autoComplete="off"
          onSubmitEditing={props.submit}
          ref={ref}
          autoCorrect={false}
          textContentType="newPassword"
          enablesReturnKeyAutomatically
          secureTextEntry={props.passwordVisibility}
          blurOnSubmit={props.blur}
          returnKeyType={props.rtype}
          value={props.value}
          underlineColorAndroid="transparent"
        />
        <Pressable onPress={props.handlePasswordVisibility}>
          <Feather name={props.rightIcon} size={24} color={color.primary.primary600} />
        </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: poppins.normal,
    fontSize: 16,
    width: '90%'
  },
});

export default APasswordInput;

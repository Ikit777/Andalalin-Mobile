import React from "react";
import { TouchableHighlight, StyleSheet, View } from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { Feather } from '@expo/vector-icons';

function AMenuCard({ onPress, icon, title, desc, style }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.hover, style]}
      underlayColor={"rgba(0, 0, 0, 0.1)"}
    >
      <View style={styles.card}>
      <View style={{borderColor: color.primary.primary50, borderWidth: 2, borderRadius: 28, backgroundColor: color.primary.primary100, alignSelf:'baseline'}}>
      <Feather style={{padding: 8}}  name={icon} size={16} color={color.primary.main} />
      </View>
        <AText style={{paddingTop: 8}} color={color.neutral.neutral900} size={18} weight="semibold">{title}</AText>
        <AText style={{paddingTop: 4}} color={color.neutral.neutral500} size={14} weight="normal">{desc}</AText>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 8,
        flexDirection: "column",
        backgroundColor: color.text.white,
        shadowColor: "rgba(16, 24, 40, 0.10)",
        elevation: 8,  
        paddingHorizontal: 17,
        paddingTop: 16,
        paddingBottom: 22,
        overflow: 'hidden'
      },
      hover: {
        borderRadius: 8,
        backgroundColor: 'transparent',
      },
  });

export default AMenuCard;

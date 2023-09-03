import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import color from "../../constants/color";
import AText from "./AText";
import { Feather } from "@expo/vector-icons";

function ACardPermohonan({ status, tanggal, jenis, kode, pemohon, alamat, style, onPress, title }) {
  const statusBg = () => {
    switch (status) {
      case "Persyaratan tidak sesuai":
        return color.error.error50;
      case "Permohonan selesai":
        return color.success.success50;
      default:
        return color.secondary.secondary50;
    }
  };

  const statusText = () => {
    switch (status) {
      case "Persyaratan tidak sesuai":
        return color.error.error700;
      case "Permohonan selesai":
        return color.success.success700;
      default:
        return color.secondary.secondary700;
    }
  };

  return (
    <View style={[styles.daftar, style]}>
      <View style={styles.child}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AText size={14} color={color.neutral.neutral400} weight="normal">
            {tanggal}
          </AText>
          <AText
            style={{
              backgroundColor: statusBg(),
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 15,
            }}
            size={12}
            color={statusText()}
            weight="normal"
          >
            {status}
          </AText>
        </View>
        <View style={styles.separator} />
        <AText
          style={{ paddingTop: 16 }}
          size={14}
          color={color.neutral.neutral800}
          weight="normal"
        >
          {jenis}
        </AText>
        <AText
          style={{ paddingTop: 8 }}
          size={12}
          color={color.neutral.neutral400}
          weight="normal"
        >
          {kode}
        </AText>
        <AText size={12} color={color.neutral.neutral400} weight="normal">
          {pemohon}
        </AText>
        <AText size={12} color={color.neutral.neutral400} weight="normal">
          {alamat}
        </AText>
        <Pressable style={{ flexDirection: "row", alignSelf: "flex-end", alignItems: "center", paddingTop: 8, paddingHorizontal: 8, paddingVertical: 8 }} onPress={onPress}>
          <AText size={14} color={color.neutral.neutral700} weight="semibold">
            {title}
          </AText>
          <Feather style={{paddingLeft: 8}} name="arrow-right" size={20} color={color.primary.primary700} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  daftar: {
    borderRadius: 20,
    shadowColor: "rgba(16, 24, 40, 0.10)",
    elevation: 8,
    paddingVertical: 4,
  },
  child: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: color.text.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
    marginTop: 14,
  },
});

export default ACardPermohonan;

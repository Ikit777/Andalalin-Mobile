import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import color from "../../constants/color";
import AText from "./AText";

function ACardPerlengkapan({
  jenis,
  gambar,
  lokasi,
  style,
  onPressEdit,
  onPressHapus,
}) {
  return (
    <View style={[styles.daftar, style]}>
      <View style={styles.child}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
            source={{
              uri: `data:image/png;base64,${gambar}`,
            }}
          />
          <View style={{ paddingLeft: 16 }}>
            <AText
              style={{ paddingTop: 8, width: "35%" }}
              size={14}
              color={color.neutral.neutral800}
              weight="semibold"
            >
              {jenis}
            </AText>
            <AText
              style={{ width: "35%" }}
              size={12}
              color={color.neutral.neutral400}
              weight="normal"
            >
              {lokasi}
            </AText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            paddingTop: 8,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              alignItems: "center",
              paddingTop: 8,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}
            onPress={onPressHapus}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Hapus
            </AText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              alignItems: "center",
              paddingTop: 8,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}
            onPress={onPressEdit}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Edit
            </AText>
          </TouchableOpacity>
        </View>
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
    paddingTop: 8,
    paddingBottom: 8,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral50,
    alignSelf: "center",
    marginTop: 14,
  },
});

export default ACardPerlengkapan;

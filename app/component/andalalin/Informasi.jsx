import React from "react";
import { StyleSheet, View } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import AButton from "../utility/AButton";

function Informasi({ navigation, onPress }) {
  return (
    <View style={styles.content}>
      <AText size={24} weight="semibold" color={color.neutral.neutral900}>
        Perhatian
      </AText>
      <AText
        style={{ paddingTop: 8 }}
        size={16}
        color={color.neutral.neutral500}
      >
        Sebelum melakukan Pengisian data, pastikan koneksi pada perangkat Anda
        berjalan dengan baik.
      </AText>
      <AText
        style={{ paddingTop: 8 }}
        size={16}
        color={color.neutral.neutral500}
      >
        Sebelum melakukan Pengisian data, pastikan koneksi pada perangkat Anda
        berjalan dengan baik.
      </AText>

      <AButton
        style={{
          marginTop: 32,
          borderWidth: 1,
          paddingVertical: 10,
          borderColor: color.neutral.neutral300,
        }}
        title={"Lihat persyaratan"}
        mode="text"
        onPress={() => {
          navigation.push("Ketentuan", {kondisi: "Pengajuan andalalin"})
        }}
      />

      <AButton
        style={{ marginTop: 16 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          onPress();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
  },
});

export default Informasi;

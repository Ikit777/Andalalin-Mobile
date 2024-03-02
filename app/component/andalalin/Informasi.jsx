import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";


function Informasi({ navigation, onPress, kondisi }) {
  const {
    permohonan: { bangkitan },
  } = useContext(UserContext);

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
        Pastikan juga Anda telah melengkapi dokumen persyaratan yang bisa di
        lihat di bawah ini agar pengisian berjalan lancar.
      </AText>

      {kondisi == "Andalalin" ? (
        <AButton
          style={{
            marginTop: 32,
            borderWidth: 1,
            paddingVertical: 10,
            borderColor: color.neutral.neutral300,
          }}
          title={"Panduan " + bangkitan.toLowerCase()}
          mode="text"
          onPress={() => {}}
        />
      ) : (
        ""
      )}

      <AButton
        style={{
          marginTop: 16,
          borderWidth: 1,
          paddingVertical: 10,
          borderColor: color.neutral.neutral300,
        }}
        title={"Lihat persyaratan"}
        mode="text"
        onPress={() => {
          if (kondisi == "Andalalin") {
            navigation.push("Ketentuan", { kondisi: "Pengajuan andalalin" });
          } else {
            navigation.push("Ketentuan", { kondisi: "Pengajuan perlalin" });
          }
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

import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { useStateToggler } from "../../hooks/useUtility";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AButton from "../utility/AButton";
import AText from "../utility/AText";

function Foto({ onPress, navigation, kondisi, id }) {
  const {
    survei: { foto1, foto2, namaFoto1, namaFoto2, namaFoto3 },
  } = useContext(UserContext);

  const [foto1Error, setFoto1Error] = useStateToggler();

  const selanjutnya = () => {
    if (foto1 != "Kosong") {
      {
        foto1Error ? setFoto1Error() : "";
      }
      onPress();
    } else {
      {
        foto1 == "Kosong" ? (foto1Error ? "" : setFoto1Error()) : "";
      }
    }
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ATextInputIcon
          bdColor={foto1Error ? color.error.error300 : color.neutral.neutral300}
          hint={"Masukkan foto"}
          title={"Foto 1"}
          icon={"camera"}
          value={namaFoto1}
          mult={true}
          onPress={() => {
            setTimeout(() => {
              navigation.push("Kamera", {
                kondisi: "foto" + 1,
                jenis: kondisi,
                id: id,
              });
            }, 500);
          }}
        />
      </View>

      {foto1Error ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Foto 1 belum dipilih
        </AText>
      ) : (
        ""
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ATextInputIcon
          bdColor={color.neutral.neutral300}
          hint={"Masukkan foto"}
          title={"Foto 2 (Opsional)"}
          icon={"camera"}
          value={namaFoto2}
          padding={20}
          mult={true}
          onPress={() => {
            if (foto1 != "Kosong") {
              setTimeout(() => {
              navigation.push("Kamera", {
                kondisi: "foto" + 2,
                jenis: kondisi,
                id: id,
              });
            }, 500);
            }
          }}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ATextInputIcon
          bdColor={color.neutral.neutral300}
          hint={"Masukkan foto"}
          title={"Foto 3 (Opsional)"}
          icon={"camera"}
          value={namaFoto3}
          padding={20}
          mult={true}
          onPress={() => {
            if (foto1 != "Kosong" && foto2 != "Kosong") {
              setTimeout(() => {
              navigation.push("Kamera", {
                kondisi: "foto" + 3,
                jenis: kondisi,
                id: id,
              });
            }, 500);
            }
          }}
        />
      </View>

      <AButton
        style={{ marginTop: 32, marginBottom: 50 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          selanjutnya();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
});

export default Foto;

import React, { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AButton from "../utility/AButton";
import { UserContext } from "../../context/UserContext";
import AText from "../utility/AText";
import color from "../../constants/color";
import ACardPerlengkapan from "../utility/ACardPerlengkapan";
import { Feather } from "@expo/vector-icons";

function PermohonanPerlalin({ onPress, navigation }) {
  const {
    perlalin: { perlengkapan },
    setPerlalin,
    setLokasi,
    setFoto,
  } = useContext(UserContext);

  const remove_item = (id) => {
    const updated = perlengkapan;

    const index = updated.findIndex((value) => {
      return value.id_perlengkapan == id;
    });
    if (index > -1) {
      updated.splice(index, 1);
    }

    setPerlalin({
      perlengkapan: updated,
    });
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
      nestedScrollEnabled={true}
    >
      {perlengkapan.length != 0
        ? perlengkapan.map((item, index) => (
            <ACardPerlengkapan
              jenis={item.perlengkapan}
              gambar={item.gambar}
              lokasi={item.pemasangan}
              onPressHapus={() => {
                remove_item(item.id_perlengkapan);
              }}
              onPressEdit={() => {
                setLokasi();
                setFoto([]);
                navigation.push("Tambah perlengkapan", {
                  id: item.id_perlengkapan,
                  kondisi: "Edit",
                });
              }}
              key={index}
              style={{ paddingBottom: 16 }}
            />
          ))
        : ""}

      {perlengkapan.length == 0 ? (
        <View
          style={{
            alignItems: "center",
            paddingTop: "70%",
            paddingBottom: 16,
          }}
        >
          <View
            style={{
              borderColor: color.primary.primary50,
              borderWidth: 8,
              borderRadius: 40,
              backgroundColor: color.primary.primary100,
            }}
          >
            <Feather
              style={{ padding: 14 }}
              name="frown"
              size={28}
              color={color.primary.main}
            />
          </View>
          <AText
            style={{ paddingTop: 16 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Perlengkapan
          </AText>
          <AText size={20} color={color.neutral.neutral900} weight="normal">
            Belum ada
          </AText>
        </View>
      ) : (
        ""
      )}

      {perlengkapan.length != 0 ? (
        <AButton
          style={{ marginTop: 16, marginBottom: 50 }}
          title={"Lanjut"}
          mode="contained"
          onPress={() => {
            onPress();
          }}
        />
      ) : (
        ""
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
  },
});

export default PermohonanPerlalin;

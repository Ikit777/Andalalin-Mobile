import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { useStateToggler } from "../../hooks/useUtility";
import * as DocumentPicker from "expo-document-picker";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AButton from "../utility/AButton";
import AText from "../utility/AText";
import { Feather } from "@expo/vector-icons";

function Foto({ onPress, navigation, kondisi, id }) {
  const {
    survei: { foto1, foto2, foto3, namaFoto1, namaFoto2, namaFoto3 },
    setSurvei,
  } = useContext(UserContext);

  const [fotoSurvei1, setFotoSurvei1] = useState(foto1);
  const [nama1, setNama1] = useState(namaFoto1);
  const [foto1Error, setFoto1Error] = useStateToggler();

  const [fotoSurvei2, setFotoSurvei2] = useState(foto2);
  const [nama2, setNama2] = useState(namaFoto2);

  const [fotoSurvei3, setFotoSurvei3] = useState(foto3);
  const [nama3, setNama3] = useState(namaFoto3);

  const pilih_foto = async (foto) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    if (!result.canceled) {
      switch (foto) {
        case 1:
          {
            foto1Error ? setFoto1Error() : "";
          }
          setFotoSurvei1(result.assets[0].uri);
          setNama1(result.assets[0].name);
          break;
        case 2:
          setFotoSurvei2(result.assets[0].uri);
          setNama2(result.assets[0].name);
          break;
        case 3:
          setFotoSurvei3(result.assets[0].uri);
          setNama3(result.assets[0].name);
          break;
      }
    }
  };

  const selanjutnya = () => {
    if (fotoSurvei1 != "Kosong") {
      {
        foto1Error ? setFoto1Error() : "";
      }
      setSurvei({
        foto1: fotoSurvei1,
        namaFoto1: nama1,
        foto2: fotoSurvei2,
        namaFoto2: nama2,
        foto3: fotoSurvei3,
        namaFoto3: nama3,
      });
      onPress();
    } else {
      {
        fotoSurvei1 == "Kosong" ? (foto1Error ? "" : setFoto1Error()) : "";
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
          icon={"image"}
          value={nama1}
          mult={true}
          width={true}
          onPress={() => {
            pilih_foto(1);
          }}
        />

        <Pressable
          style={{ padding: 8, marginTop: 30 }}
          onPress={() => {
            navigation.push("Kamera", {
              kondisi: "foto1",
              jenis: kondisi,
              id: id,
            });
          }}
        >
          <Feather
            style={{ paddingRight: 14 }}
            name={"camera"}
            size={24}
            color={color.neutral.neutral900}
          />
        </Pressable>
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
          icon={"image"}
          value={nama2}
          padding={20}
          mult={true}
          width={true}
          onPress={() => {
            if (foto1 != "Kosong") {
              pilih_foto(2);
            }
          }}
        />

        <Pressable
          style={{ padding: 8, marginTop: 50 }}
          onPress={() => {
            if (foto1 != "Kosong") {
              navigation.push("Kamera", {
                kondisi: "foto2",
                jenis: kondisi,
                id: id,
              });
            }
          }}
        >
          <Feather
            style={{ paddingRight: 14 }}
            name={"camera"}
            size={24}
            color={color.neutral.neutral900}
          />
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ATextInputIcon
          bdColor={color.neutral.neutral300}
          hint={"Masukkan foto"}
          title={"Foto 3 (Opsional)"}
          icon={"image"}
          value={nama3}
          padding={20}
          mult={true}
          width={true}
          onPress={() => {
            if (foto1 != "Kosong") {
              pilih_foto(3);
            }
          }}
        />

        <Pressable
          style={{ padding: 8, marginTop: 50 }}
          onPress={() => {
            if (foto1 != "Kosong") {
              navigation.push("Kamera", {
                kondisi: "foto3",
                jenis: kondisi,
                id: id,
              });
            }
          }}
        >
          <Feather
            style={{ paddingRight: 14 }}
            name={"camera"}
            size={24}
            color={color.neutral.neutral900}
          />
        </Pressable>
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

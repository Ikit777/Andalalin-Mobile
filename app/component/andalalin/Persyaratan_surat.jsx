import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import * as DocumentPicker from "expo-document-picker";

function PersyaratanSURAT({ onPress }) {
  const {
    permohonan: { berkas_surat, nama_surat },
    dispatch,
  } = useContext(UserContext);
  const [surat, setSurat] = useState(berkas_surat);
  const [nama, setNama] = useState(nama_surat);
  const [suratError, setSuratError] = useStateToggler();

  const press = () => {
    if (surat != ""){
      {suratError ? setSuratError() : "" };
      dispatch({ berkas_surat: surat, nama_surat: nama });
      onPress();
    }else{
      {surat == "" ? (suratError ?  "": setSuratError()) : ""};
    }
  };

  const file = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      {suratError ? setSuratError() : "" };
      setNama(result.assets[0].name);
      setSurat(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <AText color={color.neutral.neutral900} size={24} weight="semibold">
        Surat kuasa
      </AText>
      <AText
        style={{ paddingBottom: 32, paddingTop: 8 }}
        color={color.neutral.neutral500}
        size={16}
        weight="normal"
      >
        Surat kuasa bermaterai dari pemrakarsa apabila pengajuan permohonan
        dikuasakan kepada orang lain.{"\n"}{"\n"}Pemberian surat kuasa hanya diberikan
        kepada orang yang memiliki hubungan keluarga/saudara atau hubungan
        staf/bawahan/kerja dengan pemohon izin yang dibuktikan dengan:{"\n"}{"\n"}1. Foto copy
        kartu keluarga atau surat pernyataan bermaterai yang menyatakan bahwa
        yang bersangkutan memiliki hubungan keluarga/saudara, dalam hal kuasa
        diberikan kepada orang yang memiliki hubungan keluarga/saudara.{"\n"}2. Surat
        keterangan bermaterai terkait status kepegawaian/surat penempatan kerja,
        dalam hal kuasa diberikan kepada orang ang memiliki hubungan
        staff/bawahan/kerja.
      </AText>

      <ATextInputIcon
        bdColor={suratError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan berkas surat kuasa"}
        title={"Surat kuasa"}
        icon={"file-plus"}
        value={nama}
        onPress={() => {
          file();
        }}
      />

      {suratError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Berkas surat kuasa kosong
        </AText>
      ) : (
        ""
      )}

      <AButton
        style={{ marginTop: 32, marginBottom: 50 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          press();
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

export default PersyaratanSURAT;

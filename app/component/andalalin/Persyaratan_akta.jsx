import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import * as DocumentPicker from "expo-document-picker";

function PersyaratanAKTA({ onPress }) {
  const {
    permohonan: { berkas_akta, nama_akta },
    dispatch,
  } = useContext(UserContext);
  const [akta, setAkta] = useState(berkas_akta);
  const [nama, setNama] = useState(nama_akta);
  const [aktaError, setAktaError] = useStateToggler();

  const press = () => {
    if (akta != ""){
      {aktaError ? setAktaError() : "" };
      dispatch({ berkas_akta: akta, nama_akta: nama });
      onPress();
    }else{
      {akta == "" ? (aktaError ?  "": setAktaError()) : ""};
    }
  };

  const file = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      {aktaError ? setAktaError() : "" };
      setNama(result.assets[0].name);
      setAkta(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.content}>
      <AText color={color.neutral.neutral900} size={24} weight="semibold">
        Akta pendirian badan
      </AText>
      <AText
        style={{ paddingBottom: 32, paddingTop: 8 }}
        color={color.neutral.neutral500}
        size={16}
        weight="normal"
      >
        Akta Pendirian badan yang telah mendapatkan pengesahan dari pejabat yang berwenang, apabila pemrakarsa adalah badan (operasional)
      </AText>

      <ATextInputIcon
        bdColor={aktaError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan berkas akta"}
        title={"Berkas akta"}
        icon={"file-plus"}
        value={nama}
        onPress={() => {
          file();
        }}
      />

      {aktaError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Berkas akta kosong
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
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
  },
});

export default PersyaratanAKTA;

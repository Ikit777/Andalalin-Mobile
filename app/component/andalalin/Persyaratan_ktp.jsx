import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import * as DocumentPicker from "expo-document-picker";

function PersyaratanKTP({ onPress }) {
  const {
    permohonan: { berkas_ktp, nama_ktp },
    dispatch,
  } = useContext(UserContext);
  const [ktp, setKTP] = useState(berkas_ktp);
  const [nama, setNama] = useState(nama_ktp);
  const [ktpError, setKTPError] = useStateToggler();

  const press = () => {
    if (ktp != ""){
      {ktpError ? setKTPError() : "" };
      dispatch({ berkas_ktp: ktp, nama_ktp: nama });
      onPress();
    }else{
      {ktp == "" ? (ktpError ?  "": setKTPError()) : ""};
    }
  };

  const file = async () => {
    const result = await DocumentPicker.getDocumentAsync({type: 'application/pdf'});
    if (!result.canceled) {
      {ktpError ? setKTPError() : "" };
      setNama(result.assets[0].name)
      setKTP(result.assets[0].uri)
    }
   
  };

  return (
    <View style={styles.content}>
      <AText color={color.neutral.neutral900} size={24} weight="semibold">
        KTP
      </AText>
      <AText
        style={{ paddingBottom: 32, paddingTop: 8 }}
        color={color.neutral.neutral500}
        size={16}
        weight="normal"
      >
        Kartu tanda penduduk indonesia
      </AText>

      <ATextInputIcon
        bdColor={ktpError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan berkas KTP"}
        title={"Berkas KTP"}
        icon={"file-plus"}
        value={nama}
        onPress={() => {file()}}
      />

      {ktpError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Berkas KTP kosong
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

export default PersyaratanKTP;

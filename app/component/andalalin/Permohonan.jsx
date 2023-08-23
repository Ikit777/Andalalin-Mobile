import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import AButton from "../utility/AButton";
import ADropDown from "../utility/ADropDown";
import { useStateToggler } from "../../hooks/useUtility";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";

function Permohonan({ onPress }) {
  const { permohonan: { jenis, lokasi_pengambilan }, dispatch } = useContext(UserContext);
  const [izin, setIzin] = useState("");
  const [lokasiPengambilan, setLokasi] = useState("");

  const [jenisError, toggleJenisError] = useStateToggler();
  const [lokasiError, toggleLokasiError] = useStateToggler();

  const data = [
    { value: "Dokumen analisa dampak lalu lintas" },
  ];
  const tempat = [{ value: "Banjarmasin" }];

  const press = () => {
    if (izin != "" && lokasiPengambilan != ""){
      {jenisError ? toggleJenisError() : "" };
      {lokasiError ? toggleLokasiError() : "" };
      dispatch({ jenis: izin, lokasi_pengambilan: lokasiPengambilan });
      onPress();
    }else{
      {izin == "" ? (jenisError ?  "": toggleJenisError()) : ""};
      {lokasiPengambilan == "" ? (lokasiError ? "" :toggleLokasiError()) : ""};
    }
  }

  return (
    <View style={styles.content}>
      <ADropDown
        judul={"Jenis izin"}
        hint={"Pilih jenis izin"}
        data={data}
        selected={setIzin}
        saved={jenis}
      />
      {jenisError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jenis izin belum dipilih
        </AText>
      ) : (
        ""
      )}
      <ADropDown
        judul={"Lokasi pengambilan"}
        hint={"Pilih lokasi"}
        data={tempat}
        selected={setLokasi}
        padding={20}
        saved={lokasi_pengambilan}
      />
      {lokasiError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Lokasi belum dipilih
        </AText>
      ) : (
        ""
      )}
      <AButton style={{marginTop: 32}} title={"Lanjut"} mode="contained" onPress={() => {
        press();
      }} />
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

export default Permohonan;
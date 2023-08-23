import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";

function LokasiPerusahaan({onPress}) {
  const {
    permohonan: {
      provinsi_perusahaan,
      kabupaten_perusahaan,
      kecamatan_perusahaan,
      kelurahan_perusahaan,
    },
    dispatch,
  } = useContext(UserContext);

  const provInput = React.createRef();
  const kabInput = React.createRef();
  const kecInput = React.createRef();
  const kelInput = React.createRef();

  const [prov, setProv] = useState(provinsi_perusahaan);
  const [kab, setKab] = useState(kabupaten_perusahaan);
  const [kec, setKec] = useState(kecamatan_perusahaan);
  const [kel, setKel] = useState(kelurahan_perusahaan);

  const [provError, toggleProvError] = useStateToggler();
  const [kabError, toggleKabError] = useStateToggler();
  const [kecError, toggleKecError] = useStateToggler();
  const [kelError, toggleKelError] = useStateToggler();

  const press = () => {
    if (prov != "" && kab != "" && kec != "" && kel != ""){
      {provError ? toggleProvError() : ""};
      {kabError ? toggleKabError() : ""};
      {kecError ? toggleKecError() : ""};
      {kelError ? toggleKelError() : ""};
      dispatch({ provinsi_perusahaan: prov, kabupaten_perusahaan: kab, kecamatan_perusahaan: kec,  kelurahan_perusahaan: kel});
      onPress();
    }else{
      {prov == "" ? (provError ? "" : toggleProvError()) : ""};
      {kab == "" ? (kabError ? "" : toggleKabError()) : ""};
      {kec == "" ? (kecError ? "" : toggleKecError()) : ""};
      {kel == "" ? (kelError ? "" : toggleKelError()) : ""};
    }
  }

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >

      <ATextInput
        bdColor={provError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan provinsi"}
        title={"Provinsi perusahaan"}
        rtype={"next"}
        blur={false}
        multi={false}
        value={prov}
        ref={provInput}
        onChangeText={(value) => {
          setProv(value);
        }}
        submit={() => {
          {
            provError ? toggleProvError() : "";
          }
          kabInput.current.focus();
        }}
      />

      {provError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Provinsi perusahaan kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={kabError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan kabupaten"}
        title={"Kabupaten perusahaan"}
        rtype={"next"}
        blur={false}
        padding={20}
        multi={false}
        value={kab}
        ref={kabInput}
        onChangeText={(value) => {
          setKab(value);
        }}
        submit={() => {
          {
            kabError ? toggleKabError() : "";
          }
          kecInput.current.focus();
        }}
      />

      {kabError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kabupaten perusahaan kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={kecError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan kecamatan"}
        title={"Kecamatan perusahaan"}
        rtype={"next"}
        blur={false}
        padding={20}
        multi={false}
        value={kec}
        ref={kecInput}
        onChangeText={(value) => {
          setKec(value);
        }}
        submit={() => {
          {
            kecError ? toggleKecError() : "";
          }
          kelInput.current.focus();
        }}
      />

      {kecError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kecamatan perusahaan kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={kelError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan kelurahan"}
        title={"Kelurahan perusahaan"}
        rtype={"done"}
        multi={false}
        padding={20}
        value={kel}
        ref={kelInput}
        onChangeText={(value) => {
          setKel(value);
        }}
        submit={() => {
          {
            kelError ? toggleKelError() : "";
          }
        }}
      />

      {kelError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kelurahan perusahaan kosong
        </AText>
      ) : (
        ""
      )}

      <AButton
        style={{ marginTop: 32, marginBottom: 50 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {press();}}
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

export default LokasiPerusahaan;


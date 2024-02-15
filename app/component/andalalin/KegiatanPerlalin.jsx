import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";

function KegiatanPerlalin({ onPress }) {
  const {
    perlalin: {
      alasan,
      peruntukan,

      catatan,
    },
    setPerlalin,
  } = useContext(UserContext);

  const kegiatanInput = React.createRef();
  const peruntukanInput = React.createRef();

  const [kegiatan, setKegiatan] = useState(alasan);
  const [untuk, setPeruntukan] = useState(peruntukan);

  const [catatanTambahan, setCatatanTambahan] = useState(catatan);

  const [kegiatanError, toggleKegiatanError] = useStateToggler();
  const [peruntukanError, togglePeruntukanError] = useStateToggler();

  const press = () => {
    if (kegiatan != "" && untuk != "") {
      {
        kegiatanError ? toggleKegiatanError() : "";
      }
      {
        peruntukanError ? togglePeruntukanError() : "";
      }

      setPerlalin({
        alasan: kegiatan,
        peruntukan: untuk,
        catatan: catatanTambahan,
      });
      onPress();
    } else {
      {
        kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
      }
      {
        untuk == "" ? (peruntukanError ? "" : togglePeruntukanError()) : "";
      }
    }
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={
          kegiatanError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan alasan"}
        title={"Alasan"}
        multi={true}
        value={kegiatan}
        ref={kegiatanInput}
        onChangeText={(value) => {
          setKegiatan(value);
        }}
      />

      {kegiatanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Alasan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={
          peruntukanError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Peruntukan"}
        title={"Peruntukan"}
        multi={true}
        padding={20}
        value={untuk}
        ref={peruntukanInput}
        onChangeText={(value) => {
          setPeruntukan(value);
        }}
      />

      {peruntukanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Peruntukan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan catatan"}
        title={"Catatan"}
        multi={true}
        padding={20}
        value={catatanTambahan}
        onChangeText={(value) => {
          setCatatanTambahan(value);
        }}
      />

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

export default KegiatanPerlalin;

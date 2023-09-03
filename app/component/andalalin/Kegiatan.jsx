import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";

function Kegiatan({onPress}) {
  const {
    permohonan: {
      jenis_kegiatan,
      peruntukan,
      luas_lahan,
      alamat_persil,
      kelurahan_persil,
      nomer_skrk,
      tanggal_skrk,
    },
    dispatch,
  } = useContext(UserContext);

  const kegiatanInput = React.createRef();
  const peruntukanInput = React.createRef();
  const luasInput = React.createRef();
  const alamatInput = React.createRef();
  const kelInput = React.createRef();
  const nomerInput = React.createRef();

  const [kegiatan, setKegiatan] = useState(jenis_kegiatan);
  const [untuk, setPeruntukan] = useState(peruntukan);
  const [luas, setLuas] = useState(luas_lahan);
  const [alamat, setAlamat] = useState(alamat_persil);
  const [kel, setKel] = useState(kelurahan_persil);
  const [nomer, setNomer] = useState(nomer_skrk);
  const [tanggal, setTanggal] = useState(tanggal_skrk);

  const [kegiatanError, toggleKegiatanError] = useStateToggler();
  const [peruntukanError, togglePeruntukanError] = useStateToggler();
  const [luasError, toggleLuasError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [kelError, toggleKelError] = useStateToggler();
  const [nomerError, toggleNomerError] = useStateToggler();
  const [tanggalError, toggleTanggalError] = useStateToggler();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTanggal(formatDate(currentDate));
    {
      tanggalError ? toggleTanggalError() : "";
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const press = () => {
    if (kegiatan != "" && untuk != "" && luas != "" && alamat != "" && kel != "" && nomer != "" && tanggal != ""){
      {kegiatanError ? toggleKegiatanError() : "" };
      {peruntukanError ? togglePeruntukanError() : "" };
      {luasError ? toggleLuasError() : "" };
      {alamatError ? toggleAlamatError() : "" };
      {kelError ? toggleKelError() : "" };
      {nomerError ? toggleNomerError() : "" };
      {tanggalError ? toggleTanggalError() : "" };
      
      dispatch({ jenis_kegiatan: kegiatan, peruntukan: untuk, luas_lahan: luas, alamat_persil: alamat, kelurahan_persil: kel, nomer_skrk: nomer, tanggal_skrk: tanggal});
      onPress();
    }else{
      {kegiatan == "" ? (kegiatanError ?  "": toggleKegiatanError()) : ""};
      {untuk == "" ? (peruntukanError ?  "": togglePeruntukanError()) : ""};
      {luas == "" ? (luasError ?  "": toggleLuasError()) : ""};
      {alamat == "" ? (alamatError ?  "": toggleAlamatError()) : ""};
      {kel == "" ? (kelError ?  "": toggleKelError()) : ""};
      {nomer == "" ? (nomerError ?  "": toggleNomerError()) : ""};
      {tanggal == "" ? (tanggalError ?  "": toggleTanggalError()) : ""};
    }
  }

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >

    <ATextInput
        bdColor={kegiatanError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan jenis kegiatan"}
        title={"Jenis kegiatan"}
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
          Jenis kegiatan kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={peruntukanError ? color.error.error300 : color.neutral.neutral300}
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
          Peruntukan kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={luasError ? color.error.error300 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan luas lahan"}
        title={"Luas lahan"}
        rtype={"next"}
        blur={false}
        multi={false}
        padding={20}
        value={luas}
        ref={luasInput}
        onChangeText={(value) => {
          setLuas(value);
        }}
        submit={() => {
          {
            luasError ? toggleLuasError() : "";
          }
          alamatInput.current.focus();
        }}
      />

      {luasError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Luas lahan kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={alamatError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat persil"}
        title={"Alamat persil"}
        multi={true}
        padding={20}
        value={alamat}
        ref={alamatInput}
        onChangeText={(value) => {
          setAlamat(value);
        }}
      />

      {alamatError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Alamat persil kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={kelError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan kelurahan persil"}
        title={"Kelurahan persil"}
        rtype={"next"}
        blur={false}
        multi={false}
        value={kel}
        padding={20}
        ref={kelInput}
        onChangeText={(value) => {
          setKel(value);
        }}
        submit={() => {
          {
            kelError ? toggleKelError() : "";
          }
          nomerInput.current.focus();
        }}
      />

      {kelError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kelurahan persil kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={nomerError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan nomor SKRK"}
        title={"Nomor SKRK"}
        rtype={"done"}
        multi={false}
        value={nomer}        
        padding={20}
        ref={nomerInput}
        onChangeText={(value) => {
          setNomer(value);
        }}
        submit={() => {
          {
            nomerError ? toggleNomerError() : "";
          }
        }}
      />

      {nomerError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nomor SKRK kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={tanggalError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan tanggal SKRK"}
        title={"Tanggal SKRK"}
        padding={20}
        icon={"calendar"}
        value={tanggal}
        onPress={showDatepicker}
      />

      {tanggalError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Tanggal SKRK kosong
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

export default Kegiatan;

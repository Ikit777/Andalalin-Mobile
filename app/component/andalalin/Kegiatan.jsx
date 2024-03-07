import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import ADatePicker from "../utility/ADatePicker";

function Kegiatan({ onPress, navigation }) {
  const {
    permohonan: {
      aktivitas,
      peruntukan,
      total_luas_lahan,
      nilai_kriteria,

      nomer_skrk,
      tanggal_skrk,

      jenis,
      rencana_pembangunan,
      catatan,
    },
    dispatch,
    dataMaster,
  } = useContext(UserContext);

  const kegiatanInput = React.createRef();
  const peruntukanInput = React.createRef();
  const totalInput = React.createRef();
  const luasInput = React.createRef();
  const nomerInput = React.createRef();

  const [kegiatan, setKegiatan] = useState(aktivitas);
  const [untuk, setPeruntukan] = useState(peruntukan);
  const [total, setTotal] = useState(total_luas_lahan);
  const [luas, setLuas] = useState(nilai_kriteria);

  const [nomer, setNomer] = useState(nomer_skrk);
  const [tanggal, setTanggal] = useState(tanggal_skrk);

  const [catatanTambahan, setCatatanTambahan] = useState(catatan);

  const [kegiatanError, toggleKegiatanError] = useStateToggler();
  const [peruntukanError, togglePeruntukanError] = useStateToggler();
  const [luasError, toggleLuasError] = useStateToggler();

  const [nomerError, toggleNomerError] = useStateToggler();
  const [tanggalError, toggleTanggalError] = useStateToggler();
  const [totalError, toggleTotalError] = useStateToggler();

  const [data, setData] = useState("");

  const [dateModal, toggleDateModal] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();

  const press = () => {
    if (data.Kriteria == "" && data.Kriteria == null) {
      if (
        kegiatan != "" &&
        untuk != "" &&
        nomer != "" &&
        tanggal != "" &&
        total != ""
      ) {
        kegiatanError ? toggleKegiatanError() : "";
        peruntukanError ? togglePeruntukanError() : "";
        nomerError ? toggleNomerError() : "";
        tanggalError ? toggleTanggalError() : "";
        totalError ? toggleTotalError() : "";
        formError ? toggleFormError() : "";
        dispatch({
          aktivitas: kegiatan,
          peruntukan: untuk,
          total_luas_lahan: total,

          nomer_skrk: nomer,
          tanggal_skrk: tanggal,

          catatan: catatanTambahan,
        });
        onPress();
      } else {
        kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
        untuk == "" ? (peruntukanError ? "" : togglePeruntukanError()) : "";
        nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
        tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
        total == "" ? (totalError ? "" : toggleTotalError()) : "";
        formError ? "" : toggleFormError();
      }
    } else {
      if (
        kegiatan != "" &&
        untuk != "" &&
        luas != "" &&
        nomer != "" &&
        tanggal != "" &&
        total != ""
      ) {
        kegiatanError ? toggleKegiatanError() : "";
        peruntukanError ? togglePeruntukanError() : "";
        luasError ? toggleLuasError() : "";
        nomerError ? toggleNomerError() : "";
        tanggalError ? toggleTanggalError() : "";
        totalError ? toggleTotalError() : "";
        formError ? toggleFormError() : "";
        dispatch({
          aktivitas: kegiatan,
          peruntukan: untuk,
          kriteria_khusus: data.Kriteria,
          total_luas_lahan: total,
          nilai_kriteria: luas,
          nomer_skrk: nomer,
          tanggal_skrk: tanggal,
          catatan: catatanTambahan,
        });
        onPress();
      } else {
        kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
        untuk == "" ? (peruntukanError ? "" : togglePeruntukanError()) : "";
        luas == "" ? (luasError ? "" : toggleLuasError()) : "";
        nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
        tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
        total == "" ? (totalError ? "" : toggleTotalError()) : "";
        formError ? "" : toggleFormError();
      }
    }
  };

  const dataSet = () => {
    let findData = dataMaster.jenis_rencana.find((item) => {
      return item.Kategori == jenis;
    });

    if (findData != null) {
      let rencana = findData.JenisRencana.find((item) => {
        return item.Jenis == rencana_pembangunan;
      });

      setData(rencana);
    }
  };

  useEffect(() => {
    dataSet();
  }, []);

  useEffect(() => {
    clear_error();
  }, [tanggal]);

  const clear_error = () => {
    if (data.Kriteria == "" && data.Kriteria == null) {
      kegiatan != "" ? (kegiatanError ? toggleKegiatanError() : "") : "";
      untuk != "" ? (peruntukanError ? togglePeruntukanError() : "") : "";
      total != "" ? (totalError ? toggleTotalError() : "") : "";
      nomer != "" ? (nomerError ? toggleNomerError() : "") : "";
      tanggal != "" ? (tanggalError ? toggleTanggalError() : "") : "";
      kegiatan != "" &&
      untuk != "" &&
      nomer != "" &&
      tanggal != "" &&
      total != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
    } else {
      kegiatan != "" ? (kegiatanError ? toggleKegiatanError() : "") : "";
      untuk != "" ? (peruntukanError ? togglePeruntukanError() : "") : "";
      total != "" ? (totalError ? toggleTotalError() : "") : "";
      nomer != "" ? (nomerError ? toggleNomerError() : "") : "";
      tanggal != "" ? (tanggalError ? toggleTanggalError() : "") : "";
      luas != "" ? (luasError ? toggleLuasError() : "") : "";
      kegiatan != "" &&
      untuk != "" &&
      luas != "" &&
      nomer != "" &&
      tanggal != "" &&
      total != ""
        ? formError
          ? toggleFormError()
          : ""
        : "";
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
        hint={"Masukkan aktivitas"}
        title={"Aktivitas"}
        multi={true}
        wajib={"*"}
        value={kegiatan}
        ref={kegiatanInput}
        onChangeText={(value) => {
          clear_error();
          setKegiatan(value);
        }}
      />

      <ATextInput
        bdColor={
          peruntukanError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan peruntukan"}
        title={"Peruntukan"}
        multi={true}
        padding={20}
        wajib={"*"}
        value={untuk}
        ref={peruntukanInput}
        onChangeText={(value) => {
          clear_error();
          setPeruntukan(value);
        }}
      />

      <ATextInput
        bdColor={totalError ? color.error.error500 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan total"}
        title={"Total luas lahan (m²)"}
        multi={false}
        wajib={"*"}
        padding={20}
        rtype={"next"}
        blur={data.Kriteria != "" && data.Kriteria != null ? false : true}
        value={total}
        ref={totalInput}
        onChangeText={(value) => {
          clear_error();
          setTotal(value);
        }}
        submit={() => {
          clear_error();
          if (data.Kriteria != "" && data.Kriteria != null) {
            total != "" ? luasInput.current.focus() : "";
          } else {
            total != "" ? nomerInput.current.focus() : "";
          }
        }}
      />

      {data.Kriteria != "" && data.Kriteria != null ? (
        <View>
          <ATextInput
            bdColor={
              luasError ? color.error.error500 : color.neutral.neutral300
            }
            ktype={"number-pad"}
            hint={"Masukkan " + data.Kriteria.toLowerCase()}
            title={data.Kriteria + " " + "(" + data.Satuan.toLowerCase() + ")"}
            rtype={"next"}
            blur={false}
            wajib={"*"}
            multi={false}
            padding={20}
            value={luas}
            ref={luasInput}
            onChangeText={(value) => {
              clear_error();
              setLuas(value);
            }}
            submit={() => {
              clear_error();
              luas != "" ? nomerInput.current.focus() : "";
            }}
          />
        </View>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={nomerError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan nomor SKRK"}
        title={"Nomor SKRK"}
        rtype={"done"}
        multi={false}
        wajib={"*"}
        value={nomer}
        padding={20}
        ref={nomerInput}
        onChangeText={(value) => {
          clear_error();
          setNomer(value);
        }}
        submit={() => {
          clear_error();
        }}
      />

      <ATextInputIcon
        bdColor={tanggalError ? color.error.error500 : color.neutral.neutral300}
        hint={"Masukkan tanggal SKRK"}
        title={"Tanggal SKRK"}
        padding={20}
        wajib={"*"}
        icon={"calendar"}
        value={tanggal}
        onPress={() => {
          toggleDateModal();
        }}
      />

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

      {!formError ? (
        <View
          style={{
            borderColor: color.neutral.neutral300,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            marginTop: 25,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: color.text.white,
            alignItems: "center",
          }}
        >
          <AText
            style={{ width: "65%" }}
            size={16}
            color={color.neutral.neutral900}
          >
            Format surat permohonan andalalin
          </AText>

          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {}}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Download
            </AText>
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}

      {formError ? (
        <AText
          style={{ paddingTop: 8 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Lengkapi formulir atau kolom yang tersedia dengan benar{" "}
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

      <ADatePicker
        visibleModal={dateModal}
        onPressOKButton={() => {
          toggleDateModal();
          {
            tanggalError ? toggleTanggalError() : "";
          }
        }}
        onPressBATALButton={() => {
          toggleDateModal();
        }}
        pilih={setTanggal}
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

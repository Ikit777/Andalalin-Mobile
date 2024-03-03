import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AButton from "../utility/AButton";
import { useStateToggler } from "../../hooks/useUtility";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import ADropDownCostume from "../utility/ADropdownCostume";

function Permohonan({ onPress }) {
  const {
    permohonan: { jenis, rencana_pembangunan, lokasi_pengambilan, pemohon },
    dispatch,
    dataMaster,
  } = useContext(UserContext);

  const [jenisRencana, setJenisRencana] = useState(jenis);
  const [lokasiPengambilan, setLokasi] = useState(lokasi_pengambilan);
  const [rencanaJenisPembangunan, setrencanaJenisPembangunan] =
    useState(rencana_pembangunan);

  const [rencana, setRencana] = useState("");
  const [jenis_rencana, setjenis_rencana] = useState("");

  const [jenisError, toggleJenisError] = useStateToggler();
  const [lokasiError, toggleLokasiError] = useStateToggler();
  const [rencanaError, toggleRencanaError] = useStateToggler();

  const [kategoriPemohon, setKategoriPemohon] = useState(pemohon);
  const [pemohonError, togglePemohonError] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();

  let lokasi = dataMaster.lokasi_pengambilan.map((item) => {
    return { value: item };
  });

  useEffect(() => {
    let pusat = dataMaster.jenis_rencana.filter((item) => {
      return item.JenisRencana != null;
    });

    let jenis_rencana = pusat.map((item) => {
      return { value: item.Kategori };
    });

    setjenis_rencana(jenis_rencana);
  }, []);

  const rencanaPembangunan = () => {
    let pusat = dataMaster.jenis_rencana.find((item) => {
      return item.Kategori == jenisRencana;
    });

    if (pusat != null) {
      let jenis_rencana = pusat.JenisRencana.map((item) => {
        return { value: item.Jenis };
      });

      setRencana(jenis_rencana);
    }
  };

  useEffect(() => {
    clear_error();
    setTimeout(() => {
      if (jenisRencana != "") {
        rencanaPembangunan();
      }
    }, 500);

    if (jenisRencana != jenis) {
      setrencanaJenisPembangunan("");
    }
  }, [jenisRencana]);

  useEffect(() => {
    clear_error();
  }, [lokasiPengambilan]);

  useEffect(() => {
    clear_error();
  }, [kategoriPemohon]);

  useEffect(() => {
    clear_error();
  }, [rencanaJenisPembangunan]);

  const press = () => {
    if (
      jenisRencana != "" &&
      lokasiPengambilan != "" &&
      rencanaJenisPembangunan != "" &&
      kategoriPemohon != ""
    ) {
      formError ? toggleFormError() : "";

      dispatch({
        jenis: jenisRencana,
        rencana_pembangunan: rencanaJenisPembangunan,
        lokasi_pengambilan: lokasiPengambilan,
        pemohon: kategoriPemohon,
      });
      onPress();
    } else {
      jenisRencana == "" ? (jenisError ? "" : toggleJenisError()) : "";
      rencanaJenisPembangunan == ""
        ? rencanaError
          ? ""
          : toggleRencanaError()
        : "";
      lokasiPengambilan == "" ? (lokasiError ? "" : toggleLokasiError()) : "";
      kategoriPemohon == "" ? (pemohonError ? "" : togglePemohonError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  const kategori = [{ value: "Perorangan" }, { value: "Non-perorangan" }];

  const clear_error = () => {
    jenisRencana != "" ? (jenisError ? toggleJenisError() : "") : "";
    lokasiPengambilan != "" ? (lokasiError ? toggleLokasiError() : "") : "";
    kategoriPemohon != "" ? (pemohonError ? togglePemohonError() : "") : "";
    rencanaJenisPembangunan != ""
      ? rencanaError
        ? toggleRencanaError()
        : ""
      : "";

    jenisRencana != "" &&
    lokasiPengambilan != "" &&
    rencanaJenisPembangunan != "" &&
    kategoriPemohon != ""
      ? formError
        ? toggleFormError()
        : ""
      : "";
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ADropDownCostume
        judul={"Kategori pemohon"}
        hint={"Pilih kategori"}
        data={kategori}
        selected={setKategoriPemohon}
        wajib={"*"}
        max={200}
        saved={kategoriPemohon}
        bdColor={pemohonError ? color.error.error500 : color.neutral.neutral300}
      />

      <ADropDownCostume
        judul={"Kategori rencana pembangunan"}
        hint={"Pilih kategori"}
        data={jenis_rencana}
        selected={setJenisRencana}
        wajib={"*"}
        max={200}
        padding={20}
        saved={jenisRencana}
        bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
      />

      <ADropDownCostume
        bdColor={rencanaError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jenis rencana pembangunan"}
        hint={"Pilih jenis"}
        data={rencana}
        max={200}
        wajib={"*"}
        padding={20}
        selected={setrencanaJenisPembangunan}
        saved={rencanaJenisPembangunan}
        notFound={"Kategori jenis belum dipilih"}
      />

      <ADropDownCostume
        judul={"Lokasi pengambilan"}
        hint={"Pilih lokasi"}
        data={lokasi}
        wajib={"*"}
        selected={setLokasi}
        max={200}
        padding={20}
        saved={lokasiPengambilan}
        bdColor={lokasiError ? color.error.error500 : color.neutral.neutral300}
      />

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

export default Permohonan;

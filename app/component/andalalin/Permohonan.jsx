import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AButton from "../utility/AButton";
import { useStateToggler } from "../../hooks/useUtility";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import ATextInput from "../utility/ATextInput";
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

  let lokasi = dataMaster.lokasi_pengambilan.map((item) => {
    return { value: item };
  });

  useEffect(() => {
    let pusat = dataMaster.rencana_pembangunan.filter((item) => {
      return item.JenisRencana != null;
    });

    let jenis_rencana = pusat.map((item) => {
      return { value: item.Kategori };
    });

    jenis_rencana.push({ value: "Lainnya" });

    setjenis_rencana(jenis_rencana);
  }, []);

  const rencanaPembangunan = () => {
    let pusat = dataMaster.rencana_pembangunan.find((item) => {
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
    {
      jenisError ? toggleJenisError() : "";
    }
    if (jenisRencana != "") {
      rencanaPembangunan();
    }
    if (jenisRencana != jenis) {
      setrencanaJenisPembangunan("");
    }
  }, [jenisRencana]);

  useEffect(() => {
    {
      lokasiError ? toggleLokasiError() : "";
    }
  }, [lokasiPengambilan]);

  useEffect(() => {
    {
      pemohonError ? togglePemohonError() : "";
    }
  }, [kategoriPemohon]);

  useEffect(() => {
    {
      rencanaError ? toggleRencanaError() : "";
    }
  }, [rencanaJenisPembangunan]);

  const press = () => {
    if (
      jenisRencana != "" &&
      lokasiPengambilan != "" &&
      rencanaJenisPembangunan != "" &&
      kategoriPemohon != ""
    ) {
      dispatch({
        jenis: jenisRencana,
        rencana_pembangunan: rencanaJenisPembangunan,
        lokasi_pengambilan: lokasiPengambilan,
        pemohon: kategoriPemohon,
      });
      onPress();
    } else {
      {
        jenisRencana == "" ? (jenisError ? "" : toggleJenisError()) : "";
      }
      {
        rencanaJenisPembangunan == ""
          ? rencanaError
            ? ""
            : toggleRencanaError()
          : "";
      }
      {
        lokasiPengambilan == "" ? (lokasiError ? "" : toggleLokasiError()) : "";
      }
      {
        kategoriPemohon == "" ? (pemohonError ? "" : togglePemohonError()) : "";
      }
    }
  };

  const kategori = [{ value: "Perorangan" }, { value: "Non-perorangan" }];

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
        max={200}
        saved={kategoriPemohon}
        bdColor={pemohonError ? color.error.error300 : color.neutral.neutral300}
      />
      {pemohonError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kategori pemohon wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        judul={"Kategori jenis rencana pembangunan"}
        hint={"Pilih jenis"}
        data={jenis_rencana}
        selected={setJenisRencana}
        max={200}
        padding={20}
        saved={jenisRencana}
        bdColor={jenisError ? color.error.error300 : color.neutral.neutral300}
      />
      {jenisError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kategori jenis wajib
        </AText>
      ) : (
        ""
      )}

      {jenisRencana != "Lainnya" ? (
        <ADropDownCostume
          bdColor={
            rencanaError ? color.error.error300 : color.neutral.neutral300
          }
          judul={"Jenis rencana pembangunan"}
          hint={"Pilih rencana"}
          data={rencana}
          max={200}
          padding={20}
          selected={setrencanaJenisPembangunan}
          saved={rencanaJenisPembangunan}
          notFound={"Kategori jenis belum dipilih"}
        />
      ) : (
        <ATextInput
          bdColor={
            rencanaError ? color.error.error300 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan rencana pembangunan"}
          title={"Rencana pembangunan lainnya"}
          rtype={"done"}
          multi={false}
          padding={20}
          value={rencanaJenisPembangunan}
          onChangeText={(value) => {
            setrencanaJenisPembangunan(value);
          }}
        />
      )}

      {rencanaError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jenis rencana pembangunan wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        judul={"Lokasi pengambilan"}
        hint={"Pilih lokasi"}
        data={lokasi}
        selected={setLokasi}
        max={200}
        padding={20}
        saved={lokasiPengambilan}
        bdColor={lokasiError ? color.error.error300 : color.neutral.neutral300}
      />
      {lokasiError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Lokasi pengambilan wajib
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

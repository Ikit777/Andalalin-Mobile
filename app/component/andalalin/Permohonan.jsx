import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AButton from "../utility/AButton";
import ADropDown from "../utility/ADropDown";
import { useStateToggler } from "../../hooks/useUtility";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import ATextInput from "../utility/ATextInput";

function Permohonan({ onPress }) {
  const {
    permohonan: { jenis, rencana_pembangunan, lokasi_pengambilan },
    dispatch,
    dataMaster,
  } = useContext(UserContext);
  const [jenisRencana, setJenisRencana] = useState("");
  const [lokasiPengambilan, setLokasi] = useState("");
  const [rencanaJenisPembangunan, setrencanaJenisPembangunan] =
    useState(rencana_pembangunan);

  const [rencana, setRencana] = useState("");

  const [jenisError, toggleJenisError] = useStateToggler();
  const [lokasiError, toggleLokasiError] = useStateToggler();
  const [rencanaError, toggleRencanaError] = useStateToggler();

  let lokasi = dataMaster.lokasi_pengambilan.map((item) => {
    return { value: item };
  });

  let jenis_rencana = dataMaster.jenis_rencana.map((item) => {
    return { value: item };
  });

  const rencanaPembangunan = () => {
    switch (jenisRencana) {
      case "Pusat kegiatan":
        let pusat = dataMaster.rencana_pembangunan.Pusat.map((item) => {
          return { value: item };
        });
        setRencana(pusat);
        break;
      case "Pemukiman":
        let pemukiman = dataMaster.rencana_pembangunan.Pemukiman.map((item) => {
          return { value: item };
        });
        setRencana(pemukiman);
        break;
      case "Infrastruktur":
        let infrastruktur = dataMaster.rencana_pembangunan.Infrastruktur.map(
          (item) => {
            return { value: item };
          }
        );
        setRencana(infrastruktur);
        break;
    }
  };

  useEffect(() => {
    {
      jenisError ? toggleJenisError() : "";
    }
    rencanaPembangunan();
  }, [jenisRencana]);

  useEffect(() => {
    {
      lokasiError ? toggleLokasiError() : "";
    }
  }, [lokasiPengambilan]);

  useEffect(() => {
    {
      rencanaError ? toggleRencanaError() : "";
    }
  }, [rencanaJenisPembangunan]);

  const press = () => {
    if (
      jenisRencana != "" &&
      lokasiPengambilan != "" &&
      rencanaJenisPembangunan != ""
    ) {
      dispatch({
        jenis: jenisRencana,
        rencana_pembangunan: rencanaJenisPembangunan,
        lokasi_pengambilan: lokasiPengambilan,
      });
      onPress();
    } else {
      {
        jenisRencana == "" ? (jenisError ? "" : toggleJenisError()) : "";
      }
      {
        jenisRencana != ""
          ? rencanaJenisPembangunan == ""
            ? rencanaError
              ? ""
              : toggleRencanaError()
            : ""
          : "";
      }
      {
        lokasiPengambilan == "" ? (lokasiError ? "" : toggleLokasiError()) : "";
      }
    }
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ADropDown
        judul={"Kategori jenis rencana pembangunan"}
        hint={"Pilih jenis"}
        data={jenis_rencana}
        selected={setJenisRencana}
        saved={jenis}
        bdColor={jenisError ? color.error.error300 : color.neutral.neutral300}
      />
      {jenisError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kategori belum dipilih
        </AText>
      ) : (
        ""
      )}

      {jenisRencana != "" && jenisRencana != "Lainnya" ? (
        <ADropDown
          bdColor={
            rencanaError ? color.error.error300 : color.neutral.neutral300
          }
          judul={"Jenis rencana pembangunan"}
          hint={"Pilih rencana"}
          data={rencana}
          padding={20}
          selected={setrencanaJenisPembangunan}
          saved={rencana_pembangunan}
        />
      ) : (
        ""
      )}

      {jenisRencana == "Lainnya" ? (
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
      ) : (
        ""
      )}

      {rencanaError && jenisRencana != "" ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Rencana pembangunan kosong
        </AText>
      ) : (
        ""
      )}

      <ADropDown
        judul={"Lokasi pengambilan"}
        hint={"Pilih lokasi"}
        data={lokasi}
        selected={setLokasi}
        padding={20}
        saved={lokasi_pengambilan}
        bdColor={lokasiError ? color.error.error300 : color.neutral.neutral300}
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

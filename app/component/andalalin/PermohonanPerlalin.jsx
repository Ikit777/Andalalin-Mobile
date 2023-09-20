import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AButton from "../utility/AButton";
import { useStateToggler } from "../../hooks/useUtility";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import ATextInput from "../utility/ATextInput";
import ADropDownCostume from "../utility/ADropdownCostume";
import ADropDownPerlengkapan from "../utility/ADropdownPerlengkapan";

function PermohonanPerlalin({ onPress }) {
  const {
    perlalin: { kategori, rambu, perlengkapan, lokasi_pengambilan },
    setPerlalin,
    dataMaster,
  } = useContext(UserContext);

  const [kategoriPerlalin, setKategoriPerlalin] = useState(kategori);
  const [lokasiPengambilan, setLokasi] = useState(lokasi_pengambilan);
  const [jenisPerlengkapan, setJenisPerlengkapan] = useState(perlengkapan);
  const [rambulalin, setRambulalin] = useState(rambu);

  const [kategoriData, setKategoriData] = useState("");
  const [jenisData, setJenisData] = useState("");
  const [jenisDataDefault, setJenisDataDefault] = useState("");

  const [kategoriError, toggleKategoriError] = useStateToggler();
  const [lokasiError, toggleLokasiError] = useStateToggler();
  const [jenisError, toggleJenisError] = useStateToggler();

  let lokasi = dataMaster.lokasi_pengambilan.map((item) => {
    return { value: item };
  });

  useEffect(() => {
    let kategori = dataMaster.perlengkapan.filter((item) => {
      return item.Perlengkapan != null;
    });

    let kategoriperlengkapan = kategori.map((item) => {
      return { value: item.Kategori };
    });

    kategoriperlengkapan.push({ value: "Lainnya" });

    setKategoriData(kategoriperlengkapan);
  }, []);

  const perlengkapanData = () => {
    let perlengkapan = dataMaster.perlengkapan.find((item) => {
      return item.Kategori == kategoriPerlalin;
    });

    if (perlengkapan != null) {
      let jenisPerlengkapan = perlengkapan.Perlengkapan.map((item) => {
        return {
          value: item.JenisPerlengkapan,
          rambu: item.GambarPerlengkapan,
        };
      });

      setJenisData(jenisPerlengkapan);
      setJenisDataDefault(jenisPerlengkapan);
    }
  };

  useEffect(() => {
    {
      kategoriError ? toggleKategoriError() : "";
    }

    if (kategoriPerlalin != kategori) {
      setJenisPerlengkapan("");
    }

    setTimeout(() => {
      if (kategoriPerlalin != "") {
        perlengkapanData();
      }
    }, 300);
  }, [kategoriPerlalin]);

  useEffect(() => {
    {
      lokasiError ? toggleLokasiError() : "";
    }
  }, [lokasiPengambilan]);

  useEffect(() => {
    {
      jenisError ? toggleJenisError() : "";
    }
  }, [jenisPerlengkapan]);

  const press = () => {
    if (
      kategoriPerlalin != "" &&
      lokasiPengambilan != "" &&
      jenisPerlengkapan != ""
    ) {
      setPerlalin({
        kategori: kategoriPerlalin,
        perlengkapan: jenisPerlengkapan,
        lokasi_pengambilan: lokasiPengambilan,
        rambu: rambulalin,
      });
      onPress();
    } else {
      {
        kategoriPerlalin == ""
          ? kategoriError
            ? ""
            : toggleKategoriError()
          : "";
      }
      {
        jenisPerlengkapan == "" ? (jenisError ? "" : toggleJenisError()) : "";
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
      <ADropDownCostume
        judul={"Kategori perlengkapan"}
        hint={"Pilih kategori"}
        data={kategoriData}
        selected={setKategoriPerlalin}
        max={200}
        saved={kategoriPerlalin}
        bdColor={
          kategoriError ? color.error.error300 : color.neutral.neutral300
        }
      />
      {kategoriError ? (
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

      {kategoriPerlalin != "Lainnya" ? (
        <ADropDownPerlengkapan
          bdColor={jenisError ? color.error.error300 : color.neutral.neutral300}
          judul={"Jenis perlengkapan"}
          hint={"Pilih perlengkapan"}
          data={jenisData}
          setData={setJenisData}
          dataDefault={jenisDataDefault}
          max={200}
          padding={20}
          kategori={kategoriPerlalin}
          selected={setJenisPerlengkapan}
          rambulalin={rambulalin}
          rambuSelect={setRambulalin}
          saved={jenisPerlengkapan}
          notFound={"Kategori belum dipilih"}
        />
      ) : (
        <ATextInput
          bdColor={jenisError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan Jenis perlengkapan"}
          title={"Jenis perlengkapan lainnya"}
          rtype={"done"}
          multi={false}
          padding={20}
          value={jenisPerlengkapan}
          onChangeText={(value) => {
            setJenisPerlengkapan(value);
          }}
        />
      )}

      {jenisError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Perlengkapan kosong
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

export default PermohonanPerlalin;

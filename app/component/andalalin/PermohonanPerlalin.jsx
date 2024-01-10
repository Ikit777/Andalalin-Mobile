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
import ADropdownJalan from "../utility/ADropdownJalan";
import ATextInputIcon from "../utility/ATextInputIcon";
import AWilayahProyek from "../utility/AWilayahProyek";
import { useFocusEffect } from "@react-navigation/native";

function PermohonanPerlalin({ onPress, navigation }) {
  const {
    perlalin: {
      kategori_utama,
      kategori,
      rambu,
      perlengkapan,
      lokasi_pengambilan,
      wilayah_administratif_pemasangan,
      nama_jalan,
      alamat_pemasangan,
      provinsi_pemasangan,
      kabupaten_pemasangan,
      kecamatan_pemasangan,
      kelurahan_pemasangan,
      kode,
      titik_pemasangan,
      lat_pemasangan,
      long_pemasangan,
    },
    setPerlalin,
    dataMaster,
  } = useContext(UserContext);

  const alamatInput = React.createRef();
  const [KategoriUtama, setKategoriUtama] = useState(kategori_utama);
  const [kategoriPerlalin, setKategoriPerlalin] = useState(kategori);
  const [lokasiPengambilan, setLokasi] = useState(lokasi_pengambilan);
  const [jenisPerlengkapan, setJenisPerlengkapan] = useState(perlengkapan);
  const [rambulalin, setRambulalin] = useState(rambu);
  const [titik, setTitik] = useState(titik_pemasangan);
  const [lat, setLat] = useState(lat_pemasangan);
  const [long, setLong] = useState(long_pemasangan);

  const [wilayah, setWilayah] = useState(wilayah_administratif_pemasangan);
  const [alamat, setAlamat] = useState(alamat_pemasangan);
  const [jalan, setJalan] = useState(nama_jalan);
  const [kodeJalan, setKodeJalan] = useState(kode);
  const [provinsi, setProvinsi] = useState(provinsi_pemasangan);
  const [kabupaten, setKabupaten] = useState(kabupaten_pemasangan);
  const [kecamatan, setKecamatan] = useState(kecamatan_pemasangan);
  const [kelurahan, setKelurahan] = useState(kelurahan_pemasangan);
  const [titikError, toggletitikError] = useStateToggler();

  const [jalanItem, setJalanItem] = useState("");
  const [jalanItemDefault, setJalanItemDefault] = useState("");

  const [kategoriData, setKategoriData] = useState("");
  const [kategoriUtamaData, setKategoriUtamaData] = useState("");
  const [jenisData, setJenisData] = useState("");
  const [jenisDataDefault, setJenisDataDefault] = useState("");

  const [kategoriUtamaError, toggleKategoriUtamaError] = useStateToggler();
  const [kategoriError, toggleKategoriError] = useStateToggler();
  const [lokasiError, toggleLokasiError] = useStateToggler();
  const [jenisError, toggleJenisError] = useStateToggler();
  const [wilayahError, toggleWilayahError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [jalanError, toggleJalanError] = useStateToggler();

  const [wilayahModal, toggleWilayahModal] = useStateToggler();

  let lokasi = dataMaster.lokasi_pengambilan.map((item) => {
    return { value: item };
  });

  const filter_jalan = () => {
    let jalanan = dataMaster.jalan.filter((item) => {
      return item.Kelurahan.toLowerCase() == kelurahan.toLowerCase();
    });

    if (jalanan != null) {
      let jalan_item = jalanan.map((item) => {
        return { value: item.Nama, kode: item.KodeJalan };
      });

      setJalanItem(jalan_item);
      setJalanItemDefault(jalan_item);
    }
  };

  useEffect(() => {
    {
      jalanError ? toggleJalanError() : "";
    }
    if (alamatInput.current) {
      alamatInput.current.blur();
    }
  }, [jalan]);

  useEffect(() => {
    {
      wilayahError ? toggleWilayahError() : "";
    }
    if (alamatInput.current) {
      alamatInput.current.blur();
    }

    if (kelurahan != kelurahan) {
      setJalanItem("");
    }

    setTimeout(() => {
      if (kelurahan != "") {
        filter_jalan();
      }
    }, 500);
  }, [wilayah]);

  useEffect(() => {
    let kategori = dataMaster.kategori_utama.filter((item) => {
      return item != null;
    });

    let kategoriperlengkapan = kategori.map((item) => {
      return { value: item };
    });

    setKategoriUtamaData(kategoriperlengkapan);
  }, []);

  useEffect(() => {
    {
      kategoriUtamaError ? toggleKategoriUtamaError() : "";
    }

    if (KategoriUtama != kategori_utama) {
      setKategoriPerlalin("");
    }
    setTimeout(() => {
      if (KategoriUtama != "") {
        let kategori = dataMaster.kategori_perlengkapan.find((item) => {
          return item.KategoriUtama == KategoriUtama;
        });

        if (kategori != null) {
          let kategoriperlengkapan = kategori.Kategori.map((item) => {
            return { value: item };
          });

          setKategoriData(kategoriperlengkapan);
        }
      }
    }, 300);
  }, [KategoriUtama]);

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
      setRambulalin("");
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
      KategoriUtama != "" &&
      kategoriPerlalin != "" &&
      lokasiPengambilan != "" &&
      jenisPerlengkapan != "" &&
      wilayah != "" &&
      alamat != "" &&
      titik != "" &&
      jalan != ""
    ) {
      {
        titikError ? toggletitikError() : "";
      }
      setPerlalin({
        kategori_utama: KategoriUtama,
        kategori: kategoriPerlalin,
        perlengkapan: jenisPerlengkapan,
        lokasi_pengambilan: lokasiPengambilan,
        rambu: rambulalin,
        wilayah_administratif_pemasangan: wilayah,
        alamat_pemasangan: alamat,
        provinsi_pemasangan: provinsi,
        kabupaten_pemasangan: kabupaten,
        kecamatan_pemasangan: kecamatan,
        kelurahan_pemasangan: kelurahan,
        nama_jalan: jalan,
        kode: kodeJalan,
        titik_pemasangan: titik,
        lat_pemasangan: lat,
        long_pemasangan: long,
      });
      onPress();
    } else {
      {
        KategoriUtama == ""
          ? kategoriUtamaError
            ? ""
            : toggleKategoriUtamaError()
          : "";
      }
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
      {
        wilayah == "" ? (wilayahError ? "" : toggleWilayahError()) : "";
      }
      {
        alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
      }
      {
        jalan == "" ? (jalanError ? "" : toggleJalanError()) : "";
      }
      {
        titik == "" ? (titikError ? "" : toggletitikError()) : "";
      }
    }
  };

  const press_titik = () => {
    setPerlalin({
      kategori: kategoriPerlalin,
      perlengkapan: jenisPerlengkapan,
      lokasi_pengambilan: lokasiPengambilan,
      rambu: rambulalin,
      wilayah_administratif_pemasangan: wilayah,
      alamat_pemasangan: alamat,
      provinsi_pemasangan: provinsi,
      kabupaten_pemasangan: kabupaten,
      kecamatan_pemasangan: kecamatan,
      kelurahan_pemasangan: kelurahan,
      nama_jalan: jalan,
      kode: kodeJalan,
      titik_pemasangan: titik,
      lat_pemasangan: lat,
      long_pemasangan: long,
    });

    navigation.push("Pilih Lokasi", { kondisi: "Pengajuan perlalin" });
  };

  useFocusEffect(
    React.useCallback(() => {
      setTitik(titik_pemasangan);
      setLat(lat_pemasangan);
      setLong(long_pemasangan);
    }, [titik_pemasangan])
  );

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
      nestedScrollEnabled={true}
    >
      <ADropDownCostume
        judul={"Kategori utama perlengkapan"}
        hint={"Pilih kategori"}
        data={kategoriUtamaData}
        selected={setKategoriUtama}
        max={250}
        saved={KategoriUtama}
        bdColor={
          kategoriUtamaError ? color.error.error300 : color.neutral.neutral300
        }
      />
      {kategoriUtamaError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Kategori utama wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        judul={"Kategori perlengkapan"}
        hint={"Pilih kategori"}
        data={kategoriData}
        selected={setKategoriPerlalin}
        max={250}
        padding={20}
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
          Kategori perlengkapan wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownPerlengkapan
        bdColor={jenisError ? color.error.error300 : color.neutral.neutral300}
        judul={"Jenis perlengkapan"}
        hint={"Pilih perlengkapan"}
        data={jenisData}
        setData={setJenisData}
        dataDefault={jenisDataDefault}
        max={400}
        padding={20}
        kategori={kategoriPerlalin}
        selected={setJenisPerlengkapan}
        rambulalin={rambulalin}
        rambuSelect={setRambulalin}
        saved={jenisPerlengkapan}
        notFound={"Kategori belum dipilih"}
      />

      {jenisError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jenis perlengkapan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={wilayahError ? color.error.error300 : color.neutral.neutral300}
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif pemasangan"}
        padding={20}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={wilayah}
        onPress={toggleWilayahModal}
      />

      {wilayahError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Wilayah adiminstratif wajib
        </AText>
      ) : (
        ""
      )}

      <ADropdownJalan
        bdColor={jalanError ? color.error.error300 : color.neutral.neutral300}
        judul={"Jalan pemasangan"}
        hint={"Pilih jalan"}
        data={jalanItem}
        setData={setJalanItem}
        dataDefault={jalanItemDefault}
        max={300}
        padding={20}
        kode={setKodeJalan}
        kategori={kelurahan}
        selected={setJalan}
        saved={jalan}
        notFound={"Wilayah administratif belum dipilih"}
      />

      {jalanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jalan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={alamatError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat pemasangan"}
        title={"Alamat pemasangan"}
        rtype={"done"}
        padding={20}
        multi={true}
        ref={alamatInput}
        value={alamat}
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
          Alamat wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={titikError ? color.error.error300 : color.neutral.neutral300}
        hint={"Pilih lokasi pemasangan"}
        title={"Lokasi pemasangan"}
        padding={20}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={titik}
        onPress={press_titik}
      />

      {titikError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Lokasi pemasangan wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        judul={"Lokasi pengambilan"}
        hint={"Pilih lokasi"}
        data={lokasi}
        selected={setLokasi}
        max={250}
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

      <AWilayahProyek
        visibleModal={wilayahModal}
        master={dataMaster}
        setWilayah={setWilayah}
        setProvinsi={setProvinsi}
        setKabupaten={setKabupaten}
        setKecamatan={setKecamatan}
        setKelurahan={setKelurahan}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleWilayahModal();
        }}
        onPressOKButton={() => {
          toggleWilayahModal();
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

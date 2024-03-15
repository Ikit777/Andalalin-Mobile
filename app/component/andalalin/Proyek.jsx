import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AButton from "../utility/AButton";
import { useStateToggler } from "../../hooks/useUtility";
import color from "../../constants/color";
import AText from "../utility/AText";
import { UserContext } from "../../context/UserContext";
import ATextInput from "../utility/ATextInput";
import ADropDownCostume from "../utility/ADropdownCostume";
import ATextInputIcon from "../utility/ATextInputIcon";
import ADropdownJalan from "../utility/ADropdownJalan";
import AWilayahProyek from "../utility/AWilayahProyek";
import PermohonanAtom from "../../atom/PermohonanAtom";
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilState } from "recoil";

function Proyek({ onPress, navigation }) {
  const { dataMaster } = useContext(UserContext);

  const { andalalinState } = PermohonanAtom;

  const [andalalin, setAndalalin] = useRecoilState(andalalinState);

  const alamatInput = React.createRef();

  const [namaProyek, setNamaProyek] = useState(andalalin.nama_proyek);
  const [jenisProyek, setJenisProyek] = useState(andalalin.jenis_proyek);
  const [wilayah, setWilayah] = useState(
    andalalin.wilayah_administratif_proyek
  );
  const [alamat, setAlamat] = useState(andalalin.alamat_proyek);
  const [jalan, setJalan] = useState(andalalin.nama_jalan);
  const [kodeJalan, setKodeJalan] = useState(andalalin.kode);
  const [provinsi, setProvinsi] = useState(andalalin.provinsi_proyek);
  const [kabupaten, setKabupaten] = useState(andalalin.kabupaten_proyek);
  const [kecamatan, setKecamatan] = useState(andalalin.kecamatan_proyek);
  const [kelurahan, setKelurahan] = useState(andalalin.kelurahan_proyek);
  const [lokasi, setLokasi] = useState(andalalin.lokasi_bangunan);
  const [lat, setLat] = useState(andalalin.lat_bangunan);
  const [long, setLong] = useState(andalalin.long_bangunan);

  const [jalanItem, setJalanItem] = useState("");
  const [jalanItemDefault, setJalanItemDefault] = useState("");

  const [namaProyekError, toggleNamaProyekError] = useStateToggler();
  const [jenisProyekError, toggleJenisProyekError] = useStateToggler();
  const [wilayahError, toggleWilayahError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [jalanError, toggleJalanError] = useStateToggler();
  const [lokasiError, toggleLokasiError] = useStateToggler();

  const [wilayahModal, toggleWilayahModal] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();
  const data = useRef();

  useFocusEffect(
    React.useCallback(() => {
      data.current = {
        ...andalalin,
      };
      return () => {
        setAndalalin(data.current);
      };
    }, [])
  );

  useEffect(() => {
    data.current = {
      ...andalalin,
      nama_proyek: namaProyek,
      jenis_proyek: jenisProyek,
      wilayah_administratif_proyek: wilayah,
      alamat_proyek: alamat,
      provinsi_proyek: provinsi,
      kabupaten_proyek: kabupaten,
      kecamatan_proyek: kecamatan,
      kelurahan_proyek: kelurahan,
      nama_jalan: jalan,
      kode: kodeJalan,
      lokasi_bangunan: lokasi,
      lat_bangunan: lat,
      long_bangunan: long,
    };

  }, [namaProyek, jenisProyek, wilayah, alamat, jalan, lokasi]);

  let proyek = dataMaster.jenis_proyek.map((item) => {
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
    clear_error();
    if (alamatInput.current) {
      alamatInput.current.blur();
    }
  }, [jenisProyek]);

  useEffect(() => {
    clear_error();
    if (alamatInput.current) {
      alamatInput.current.blur();
    }
  }, [jalan]);

  useEffect(() => {
    clear_error();
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

  const press = () => {
    if (
      namaProyek != "" &&
      jenisProyek != "" &&
      wilayah != "" &&
      alamat != "" &&
      lokasi != "" &&
      jalan != ""
    ) {
      clear_error();
      onPress();
    } else {
      namaProyek == "" ? (namaProyekError ? "" : toggleNamaProyekError()) : "";
      jenisProyek == ""
        ? jenisProyekError
          ? ""
          : toggleJenisProyekError()
        : "";
      wilayah == "" ? (wilayahError ? "" : toggleWilayahError()) : "";
      alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
      jalan == "" ? (jalanError ? "" : toggleJalanError()) : "";
      lokasi == "" ? (lokasiError ? "" : toggleLokasiError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  const clear_error = () => {
    namaProyek != "" ? (namaProyekError ? toggleNamaProyekError() : "") : "";
    jenisProyek != "" ? (jenisProyekError ? toggleJenisProyekError() : "") : "";
    wilayah != "" ? (wilayahError ? toggleWilayahError() : "") : "";
    alamat != "" ? (alamatError ? toggleAlamatError() : "") : "";
    jalan != "" ? (jalanError ? toggleJalanError() : "") : "";
    lokasi != "" ? (lokasiError ? toggleLokasiError() : "") : "";

    namaProyek != "" &&
    jenisProyek != "" &&
    wilayah != "" &&
    alamat != "" &&
    lokasi != "" &&
    jalan != ""
      ? formError
        ? toggleFormError()
        : ""
      : "";
  };

  useFocusEffect(
    React.useCallback(() => {
      if (andalalin.lokasi_bangunan != "") {
        setLokasi(andalalin.lokasi_bangunan);
        setLat(andalalin.lat_bangunan);
        setLong(andalalin.long_bangunan);
        clear_error();
      }
    }, [andalalin.lokasi_bangunan])
  );

  useEffect(() => {
    if (lokasi != "") {
      clear_error();
    }
  }, [lokasi]);

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={
          namaProyekError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan nama"}
        title={"Nama proyek"}
        rtype={"done"}
        wajib={"*"}
        multi={false}
        value={namaProyek}
        onChangeText={(value) => {
          clear_error();
          setNamaProyek(value);
        }}
        submit={() => {
          clear_error();
        }}
      />

      <ADropDownCostume
        judul={"Jenis proyek"}
        hint={"Pilih jenis"}
        data={proyek}
        wajib={"*"}
        selected={setJenisProyek}
        max={200}
        padding={20}
        saved={jenisProyek}
        bdColor={
          jenisProyekError ? color.error.error500 : color.neutral.neutral300
        }
      />

      <ATextInputIcon
        bdColor={wilayahError ? color.error.error500 : color.neutral.neutral300}
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif proyek"}
        padding={20}
        mult={true}
        width={true}
        wajib={"*"}
        icon={"map-pin"}
        value={wilayah}
        onPress={toggleWilayahModal}
      />

      <ADropdownJalan
        bdColor={jalanError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jalan proyek"}
        hint={"Pilih jalan"}
        data={jalanItem}
        setData={setJalanItem}
        dataDefault={jalanItemDefault}
        wajib={"*"}
        max={300}
        padding={20}
        kode={setKodeJalan}
        kategori={kelurahan}
        selected={setJalan}
        saved={jalan}
        notFound={"Wilayah administratif belum dipilih"}
      />

      <AText
        style={{ paddingTop: 8 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Keterangan: Jika jalan tidak ditemukan, silahkan pilih yang paling
        mendekati
      </AText>

      <ATextInput
        bdColor={alamatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat proyek"}
        title={"Alamat lainnya"}
        rtype={"done"}
        wajib={"*"}
        padding={20}
        multi={true}
        ref={alamatInput}
        value={alamat}
        onChangeText={(value) => {
          clear_error();
          setAlamat(value);
        }}
      />

      <AText
        style={{ paddingTop: 8 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Keterangan: Alamat dapat berupa Nomor Bangunan, RT, RW, atau detail
        lainnya
      </AText>

      <ATextInputIcon
        bdColor={lokasiError ? color.error.error500 : color.neutral.neutral300}
        hint={"Pilih lokasi proyek"}
        title={"Lokasi proyek"}
        padding={20}
        wajib={"*"}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={lokasi}
        onPress={() => {
          navigation.push("Pilih Lokasi", { kondisi: "Pengajuan andalalin" });
        }}
      />

      <AText
        style={{ paddingTop: 8 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Keterangan: Pemohon harus berada di lokasi proyek yang sebenarnya
      </AText>

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

export default Proyek;

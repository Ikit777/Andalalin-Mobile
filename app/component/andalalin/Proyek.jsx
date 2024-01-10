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
import { useFocusEffect } from "@react-navigation/native";

function Proyek({ onPress, navigation }) {
  const {
    permohonan: {
      nama_proyek,
      jenis_proyek,
      wilayah_administratif_proyek,
      nama_jalan,
      alamat_proyek,
      provinsi_proyek,
      kabupaten_proyek,
      kecamatan_proyek,
      kelurahan_proyek,
      kode,
      lat_bangunan,
      long_bangunan,
      lokasi_bangunan,
    },
    dispatch,
    dataMaster,
  } = useContext(UserContext);

  const alamatInput = React.createRef();

  const [namaProyek, setNamaProyek] = useState(nama_proyek);
  const [jenisProyek, setJenisProyek] = useState(jenis_proyek);
  const [wilayah, setWilayah] = useState(wilayah_administratif_proyek);
  const [alamat, setAlamat] = useState(alamat_proyek);
  const [jalan, setJalan] = useState(nama_jalan);
  const [kodeJalan, setKodeJalan] = useState(kode);
  const [provinsi, setProvinsi] = useState(provinsi_proyek);
  const [kabupaten, setKabupaten] = useState(kabupaten_proyek);
  const [kecamatan, setKecamatan] = useState(kecamatan_proyek);
  const [kelurahan, setKelurahan] = useState(kelurahan_proyek);
  const [lokasi, setLokasi] = useState(lokasi_bangunan);
  const [lat, setLat] = useState(lat_bangunan);
  const [long, setLong] = useState(long_bangunan);

  const [jalanItem, setJalanItem] = useState("");
  const [jalanItemDefault, setJalanItemDefault] = useState("");

  const [namaProyekError, toggleNamaProyekError] = useStateToggler();
  const [jenisProyekError, toggleJenisProyekError] = useStateToggler();
  const [wilayahError, toggleWilayahError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [jalanError, toggleJalanError] = useStateToggler();
  const [lokasiError, toggleLokasiError] = useStateToggler();

  const [wilayahModal, toggleWilayahModal] = useStateToggler();

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
    {
      jenisProyekError ? toggleJenisProyekError() : "";
    }
    if (alamatInput.current) {
      alamatInput.current.blur();
    }
  }, [jenisProyek]);

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

  const press = () => {
    if (
      namaProyek != "" &&
      jenisProyek != "" &&
      wilayah != "" &&
      alamat != "" &&
      lokasi != "" &&
      jalan != ""
    ) {
      {
        alamatError ? toggleAlamatError() : "";
      }

      {
        lokasiError ? toggleLokasiError() : "";
      }

      dispatch({
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
      });
      onPress();
    } else {
      {
        namaProyek == ""
          ? namaProyekError
            ? ""
            : toggleNamaProyekError()
          : "";
      }
      {
        jenisProyek == ""
          ? jenisProyekError
            ? ""
            : toggleJenisProyekError()
          : "";
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
        lokasi == "" ? (lokasiError ? "" : toggleLokasiError()) : "";
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLokasi(lokasi_bangunan);
      setLat(lat_bangunan);
      setLong(long_bangunan);
    }, [lokasi_bangunan])
  );

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={
          namaProyekError ? color.error.error300 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan nama"}
        title={"Nama proyek"}
        rtype={"done"}
        multi={false}
        value={namaProyek}
        onChangeText={(value) => {
          setNamaProyek(value);
        }}
        submit={() => {
          {
            namaProyekError ? toggleNamaProyekError() : "";
          }
        }}
      />

      {namaProyekError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nama proyek wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        judul={"Jenis proyek"}
        hint={"Pilih jenis"}
        data={proyek}
        selected={setJenisProyek}
        max={200}
        padding={20}
        saved={jenisProyek}
        bdColor={
          jenisProyekError ? color.error.error300 : color.neutral.neutral300
        }
      />

      {jenisProyekError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jenis proyek wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={wilayahError ? color.error.error300 : color.neutral.neutral300}
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif proyek"}
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
        judul={"Jalan proyek"}
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
        hint={"Masukkan alamat proyek"}
        title={"Alamat proyek"}
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
        bdColor={lokasiError ? color.error.error300 : color.neutral.neutral300}
        hint={"Pilih lokasi proyek"}
        title={"Lokasi proyek"}
        padding={20}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={lokasi}
        onPress={() => {
          dispatch({
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
          });
          navigation.push("Pilih Lokasi", { kondisi: "Pengajuan andalalin" });
        }}
      />

      {lokasiError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Lokasi bangunan wajib
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

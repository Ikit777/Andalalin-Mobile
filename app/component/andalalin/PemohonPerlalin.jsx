import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import { UserContext } from "../../context/UserContext";
import ATextInput from "../utility/ATextInput";
import { useStateToggler } from "../../hooks/useUtility";
import ATextInputIcon from "../utility/ATextInputIcon";
import AButton from "../utility/AButton";
import ADropDownCostume from "../utility/ADropdownCostume";
import AInputAlamat from "../utility/AInputAlamat";

import ADatePicker from "../utility/ADatePicker";

function PemohonPerlalin({ onPress }) {
  const {
    perlalin: {
      nik_pemohon,
      jenis_kelamin_pemohon,
      tempat_lahir_pemohon,
      tanggal_lahir_pemohon,
      wilayah_administratif_pemohon,
      provinsi_pemohon,
      kabupaten_pemohon,
      kecamatan_pemohon,
      kelurahan_pemohon,
      alamat_pemohon,
      nomer_pemohon,
      catatan,
    },
    dataMaster,
    setPerlalin,
  } = useContext(UserContext);

  const nikInput = React.createRef();
  const tempatLahirInput = React.createRef();
  const tanggalLahirInput = React.createRef();
  const alamatInput = React.createRef();
  const nomerInput = React.createRef();

  const [nik, setNik] = useState(nik_pemohon);
  const [tempat, setTempat] = useState(tempat_lahir_pemohon);
  const [tanggal, setTanggal] = useState(tanggal_lahir_pemohon);
  const [jenis, setJenis] = useState(jenis_kelamin_pemohon);
  const [alamatModal, setAlamatModal] = useState(wilayah_administratif_pemohon);
  const [provinsi, setProvinsi] = useState(provinsi_pemohon);
  const [kabupaten, setKabupaten] = useState(kabupaten_pemohon);
  const [kecamatan, setKecamatan] = useState(kecamatan_pemohon);
  const [kelurahan, setKelurahan] = useState(kelurahan_pemohon);
  const [alamat, setAlamat] = useState(alamat_pemohon);
  const [nomer, setNomer] = useState(nomer_pemohon);
  const [catatanTambahan, setCatatanTambahan] = useState(catatan);

  const [nikError, togglenikError] = useStateToggler();
  const [tempatError, toggletempatError] = useStateToggler();
  const [tanggalError, toggletanggalError] = useStateToggler();
  const [jenisError, togglejenisError] = useStateToggler();
  const [alamatError, togglealamatError] = useStateToggler();
  const [alamat1Error, togglealamat1Error] = useStateToggler();
  const [nomerError, togglenomerError] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();

  const [alamatInputModal, toggleAlamatInputModal] = useStateToggler();

  const [dateModal, toggleDateModal] = useStateToggler();

  const jenis_kelamin = [{ value: "Laki-laki" }, { value: "Perempuan" }];

  const press = () => {
    if (
      nik != "" &&
      jenis != "" &&
      tempat != "" &&
      tanggal != "" &&
      alamat != "" &&
      alamatModal != "" &&
      nomer != "" &&
      nik.length == 16
    ) {
      setPerlalin({
        nik_pemohon: nik,
        jenis_kelamin_pemohon: jenis,
        tempat_lahir_pemohon: tempat,
        tanggal_lahir_pemohon: tanggal,
        wilayah_administratif_pemohon: alamatModal,
        provinsi_pemohon: provinsi,
        kabupaten_pemohon: kabupaten,
        kecamatan_pemohon: kecamatan,
        kelurahan_pemohon: kelurahan,
        alamat_pemohon: alamat,
        nomer_pemohon: nomer,
        catatan: catatanTambahan,
      });
      onPress();
    } else {
      nik == "" ? (nikError ? "" : togglenikError()) : "";
      jenis == "" ? (jenisError ? "" : togglejenisError()) : "";
      tempat == "" ? (tempatError ? "" : toggletempatError()) : "";
      tanggal == "" ? (tempatError ? "" : toggletanggalError()) : "";
      alamat == "" ? (alamatError ? "" : togglealamatError()) : "";
      alamatModal == "" ? (alamat1Error ? "" : togglealamat1Error()) : "";
      nomer == "" ? (nomerError ? "" : togglenomerError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  useEffect(() => {
    clear_error();
  }, [jenis, alamatModal, tanggal, alamatModal]);

  const clear_error = () => {
    setPerlalin({
      nik_pemohon: nik,
      jenis_kelamin_pemohon: jenis,
      tempat_lahir_pemohon: tempat,
      tanggal_lahir_pemohon: tanggal,
      wilayah_administratif_pemohon: alamatModal,
      provinsi_pemohon: provinsi,
      kabupaten_pemohon: kabupaten,
      kecamatan_pemohon: kecamatan,
      kelurahan_pemohon: kelurahan,
      alamat_pemohon: alamat,
      nomer_pemohon: nomer,
      catatan: catatanTambahan,
    });
    
    jenis != "" ? (jenisError ? togglejenisError() : "") : "";
    tempat != "" ? (tempatError ? toggletempatError() : "") : "";
    tanggal != "" ? (tanggalError ? toggletanggalError() : "") : "";
    alamat != "" ? (alamatError ? togglealamatError() : "") : "";
    alamatModal != "" ? (alamat1Error ? togglealamat1Error() : "") : "";
    nomer != "" ? (nomerError ? togglenomerError() : "") : "";

    nik != "" &&
    jenis != "" &&
    tempat != "" &&
    tanggal != "" &&
    alamat != "" &&
    alamatModal != "" &&
    nomer != ""
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
      <ATextInput
        bdColor={nikError ? color.error.error500 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nik anda"}
        title={"NIK"}
        rtype={"done"}
        maksimal={16}
        wajib={"*"}
        multi={false}
        value={nik}
        ref={nikInput}
        onChangeText={(value) => {
          if (value.length > 0 && value.length < 16) {
            nikError ? "" : togglenikError();
          } else {
            nikError ? togglenikError() : "";
          }
          clear_error();
          setNik(value);
        }}
        submit={() => {
          if (nik.length > 0 && nik.length < 16) {
            nikError ? "" : togglenikError();
          } else {
            nikError ? togglenikError() : "";
          }
          clear_error();
        }}
      />

      {nikError ? (
        <AText
          style={{ paddingTop: 8 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          {"NIK kurang dari 16 karakter"}
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jenis kelamin"}
        hint={"Pilih jenis kelamin"}
        data={jenis_kelamin}
        padding={20}
        wajib={"*"}
        selected={setJenis}
        saved={jenis}
      />

      <ATextInput
        bdColor={tempatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan tempat lahir"}
        title={"Tempat lahir"}
        rtype={"done"}
        wajib={"*"}
        multi={false}
        padding={20}
        value={tempat}
        ref={tempatLahirInput}
        onChangeText={(value) => {
          clear_error();
          setTempat(value);
        }}
        submit={() => {
          clear_error();
        }}
      />

      <ATextInputIcon
        bdColor={tanggalError ? color.error.error500 : color.neutral.neutral300}
        hint={"Masukkan tanggal lahir"}
        title={"Tanggal lahir"}
        padding={20}
        wajib={"*"}
        icon={"calendar"}
        value={tanggal}
        ref={tanggalLahirInput}
        onPress={() => {
          toggleDateModal();
        }}
      />

      <ATextInputIcon
        bdColor={alamat1Error ? color.error.error500 : color.neutral.neutral300}
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif"}
        padding={20}
        wajib={"*"}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={alamatModal}
        onPress={toggleAlamatInputModal}
      />

      <ATextInput
        bdColor={alamatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat"}
        wajib={"*"}
        multi={true}
        padding={20}
        value={alamat}
        ref={alamatInput}
        onChangeText={(value) => {
          clear_error();
          setAlamat(value);
        }}
      />

      <ATextInput
        bdColor={nomerError ? color.error.error500 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nomor"}
        title={"Nomor telepon/WA"}
        rtype={"done"}
        wajib={"*"}
        multi={false}
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

      <AText
        style={{ paddingTop: 8 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Contoh: 08••••••••••••
      </AText>

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

      {formError ? (
        <AText
          style={{ paddingTop: 8 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Lengkapi formulir atau kolom yang tersedia dengan benar
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
      <AInputAlamat
        visibleModal={alamatInputModal}
        master={dataMaster}
        setWilayah={setAlamatModal}
        setProvinsi={setProvinsi}
        setKabupaten={setKabupaten}
        setKecamatan={setKecamatan}
        setKelurahan={setKelurahan}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleAlamatInputModal();
        }}
        onPressOKButton={() => {
          toggleAlamatInputModal();
        }}
      />
      <ADatePicker
        visibleModal={dateModal}
        onPressOKButton={() => {
          toggleDateModal();
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

export default PemohonPerlalin;

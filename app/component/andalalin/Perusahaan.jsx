import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import ADropDownCostume from "../utility/ADropdownCostume";
import ATextInputIcon from "../utility/ATextInputIcon";
import AInputAlamat from "../utility/AInputAlamat";
import PermohonanAtom from "../../atom/PermohonanAtom";
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilState } from "recoil";

function Perusahaan({ onPress }) {
  const { dataMaster } = useContext(UserContext);

  const { andalalinState } = PermohonanAtom;

  const [andalalin, setAndalalin] = useRecoilState(andalalinState);

  const namaInput = React.createRef();
  const alamatInput = React.createRef();
  const nomerInput = React.createRef();
  const emailInput = React.createRef();
  const pimpinanInput = React.createRef();
  const jabatanInput = React.createRef();

  const [nama, setNama] = useState(andalalin.nama_perusahaan);
  const [alamat, setAlamat] = useState(andalalin.alamat_perusahaan);
  const [wilayah, setWilayah] = useState(
    andalalin.wilayah_administratif_perusahaan
  );
  const [provinsi, setProvinsi] = useState(andalalin.provinsi_perusahaan);
  const [kabupaten, setKabupaten] = useState(andalalin.kabupaten_perusahaan);
  const [kecamatan, setKecamatan] = useState(andalalin.kecamatan_perusahaan);
  const [kelurahan, setKelurahan] = useState(andalalin.kelurahan_perusahaan);
  const [nomer, setNomer] = useState(andalalin.nomer_perusahaan);
  const [email, setEmail] = useState(andalalin.email_perusahaan);
  const [pimpinan, setPimpinan] = useState(andalalin.nama_pimpinan);
  const [jabatan, setJabatan] = useState(andalalin.jabatan_pimpinan);
  const [jenis, setJenis] = useState(andalalin.jenis_kelamin_pimpinan);
  const [wilayahPimpinan, setWilayahPimpinan] = useState(
    andalalin.wilayah_administratif_pimpinan
  );
  const [provinsiPimpinan, setProvinsiPimpinan] = useState(
    andalalin.provinsi_pimpinan_perusahaan
  );
  const [kabupatenPimpinan, setKabupatenPimpinan] = useState(
    andalalin.kabupaten_pimpinan_perusahaan
  );
  const [kecamatanPimpinan, setKecamatanPimpinan] = useState(
    andalalin.kecamatan_pimpinan_perusahaan
  );
  const [kelurahanPimpinan, setKelurahanPimpinan] = useState(
    andalalin.kelurahan_pimpinan_perusahaan
  );
  const [alamatPimpinan, setAlamatPimpinan] = useState(
    andalalin.alamat_pimpinan
  );

  const [namaError, toggleNamaError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [wilayahError, toggleWilayahError] = useStateToggler();
  const [nomerError, toggleNomerError] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [pimpinanError, togglePimpinanError] = useStateToggler();
  const [jabatanError, toggleJabatanError] = useStateToggler();
  const [jenisError, toggleJenisError] = useStateToggler();
  const [wilayahPimpinanError, toggleWilayahPimpinanError] = useStateToggler();
  const [alamatPimpinanError, toggleAlamatPimpinanError] = useStateToggler();

  const [wilayahModal, toggleWilayahModal] = useStateToggler();
  const [wilayahPimpinanModal, toggleWilayahPimpinanModal] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();

  const jenis_kelamin = [{ value: "Laki-laki" }, { value: "Perempuan" }];

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
      nama_perusahaan: nama,
      alamat_perusahaan: alamat,
      wilayah_administratif_perusahaan: wilayah,
      provinsi_perusahaan: provinsi,
      kabupaten_perusahaan: kabupaten,
      kecamatan_perusahaan: kecamatan,
      kelurahan_perusahaan: kelurahan,
      nomer_perusahaan: nomer,
      email_perusahaan: email,
      nama_pimpinan: pimpinan,
      jabatan_pimpinan: jabatan,
      jenis_kelamin_pimpinan: jenis,
      wilayah_administratif_pimpinan: wilayahPimpinan,
      provinsi_pimpinan_perusahaan: provinsiPimpinan,
      kabupaten_pimpinan_perusahaan: kabupatenPimpinan,
      kecamatan_pimpinan_perusahaan: kecamatanPimpinan,
      kelurahan_pimpinan_perusahaan: kelurahanPimpinan,
      alamat_pimpinan: alamatPimpinan,
    };
  }, [
    nama,
    alamat,
    wilayah,
    nomer,
    email,
    pimpinan,
    jabatan,
    jenis,
    wilayahPimpinan,
    alamatPimpinan,
  ]);

  const press = () => {
    if (
      nama != "" &&
      alamat != "" &&
      nomer != "" &&
      email != "" &&
      pimpinan != "" &&
      jabatan != "" &&
      jenis != "" &&
      wilayahPimpinan != "" &&
      alamatPimpinan != ""
    ) {
      clear_error();
      onPress();
    } else {
      nama == "" ? (namaError ? "" : toggleNamaError()) : "";
      alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
      wilayah == "" ? (wilayahError ? "" : toggleWilayahError()) : "";
      nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
      email == "" ? (emailError ? "" : toggleEmailError()) : "";
      pimpinan == "" ? (pimpinanError ? "" : togglePimpinanError()) : "";
      jabatan == "" ? (jabatanError ? "" : toggleJabatanError()) : "";
      jenis == "" ? (jenisError ? "" : toggleJenisError()) : "";
      wilayahPimpinan == ""
        ? wilayahPimpinanError
          ? ""
          : toggleWilayahPimpinanError()
        : "";
      alamatPimpinan == ""
        ? alamatPimpinanError
          ? ""
          : toggleAlamatPimpinanError()
        : "";

      formError ? "" : toggleFormError();
    }
  };

  useEffect(() => {
    if (jenis != "") {
      clear_error();
    }
  }, [jenis]);

  useEffect(() => {
    if (wilayah != "") {
      clear_error();
    }
  }, [wilayah]);

  useEffect(() => {
    if (wilayahPimpinan != "") {
      clear_error();
    }
  }, [wilayahPimpinan]);

  const clear_error = () => {
    nama != "" ? (namaError ? toggleNamaError() : "") : "";
    alamat != "" ? (alamatError ? toggleAlamatError() : "") : "";
    wilayah != "" ? (wilayahError ? toggleWilayahError() : "") : "";
    nomer != "" ? (nomerError ? toggleNomerError() : "") : "";
    email != "" ? (emailError ? toggleEmailError() : "") : "";
    pimpinan != "" ? (pimpinanError ? togglePimpinanError() : "") : "";
    jabatan != "" ? (jabatanError ? toggleJabatanError() : "") : "";
    jenis != "" ? (jenisError ? toggleJenisError() : "") : "";
    wilayahPimpinan != ""
      ? wilayahPimpinanError
        ? toggleWilayahPimpinanError()
        : ""
      : "";
    alamatPimpinan != ""
      ? alamatPimpinanError
        ? toggleAlamatPimpinanError()
        : ""
      : "";

    nama != "" &&
    alamat != "" &&
    nomer != "" &&
    email != "" &&
    pimpinan != "" &&
    jabatan != "" &&
    jenis != "" &&
    wilayahPimpinan != "" &&
    alamatPimpinan != ""
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
        bdColor={namaError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan nama"}
        title={"Nama perusahaan"}
        rtype={"done"}
        blur={true}
        wajib={"*"}
        multi={false}
        value={nama}
        ref={namaInput}
        onChangeText={(value) => {
          clear_error();
          setNama(value);
        }}
        submit={() => {
          clear_error();
        }}
      />

      <ATextInputIcon
        bdColor={wilayahError ? color.error.error500 : color.neutral.neutral300}
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif perusahaan"}
        padding={20}
        mult={true}
        wajib={"*"}
        width={true}
        icon={"map-pin"}
        value={wilayah}
        onPress={toggleWilayahModal}
      />

      <ATextInput
        bdColor={alamatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat perusahaan"}
        multi={true}
        padding={20}
        wajib={"*"}
        value={alamat}
        ref={alamatInput}
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

      <ATextInput
        bdColor={nomerError ? color.error.error500 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nomor"}
        title={"Nomor telepon/WA perusahaan"}
        rtype={"next"}
        blur={false}
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
          emailInput.current.focus();
        }}
      />

      <AText
        style={{ paddingTop: 6 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Contoh: 08••••••••••••
      </AText>

      <ATextInput
        bdColor={emailError ? color.error.error500 : color.neutral.neutral300}
        hint={"Masukkan email"}
        title={"Email perusahaan"}
        rtype={"next"}
        blur={false}
        padding={20}
        ktype={"email-address"}
        wajib={"*"}
        inputMode={"email"}
        multi={false}
        value={email}
        ref={emailInput}
        onChangeText={(value) => {
          clear_error();
          setEmail(value);
        }}
        submit={() => {
          clear_error();
          pimpinanInput.current.focus();
        }}
      />

      <ATextInput
        bdColor={
          pimpinanError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan nama pimpinan"}
        title={"Nama pimpinan"}
        rtype={"next"}
        blur={false}
        wajib={"*"}
        multi={false}
        value={pimpinan}
        padding={20}
        ref={pimpinanInput}
        onChangeText={(value) => {
          clear_error();
          setPimpinan(value);
        }}
        submit={() => {
          clear_error();
          jabatanInput.current.focus();
        }}
      />

      <ATextInput
        bdColor={jabatanError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan jabatan pimpinan"}
        title={"Jabatan pimpinan"}
        rtype={"done"}
        multi={false}
        padding={20}
        wajib={"*"}
        value={jabatan}
        ref={jabatanInput}
        onChangeText={(value) => {
          clear_error();
          setJabatan(value);
        }}
        submit={() => {
          clear_error();
        }}
      />

      <ADropDownCostume
        bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jenis kelamin pimpinan"}
        hint={"Pilih jenis kelamin"}
        data={jenis_kelamin}
        padding={20}
        wajib={"*"}
        selected={setJenis}
        saved={jenis}
      />

      <ATextInputIcon
        bdColor={
          wilayahPimpinanError ? color.error.error500 : color.neutral.neutral300
        }
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif pimpinan"}
        padding={20}
        mult={true}
        width={true}
        wajib={"*"}
        icon={"map-pin"}
        value={wilayahPimpinan}
        onPress={toggleWilayahPimpinanModal}
      />

      <ATextInput
        bdColor={
          alamatPimpinanError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat pimpinan"}
        multi={true}
        padding={20}
        value={alamatPimpinan}
        wajib={"*"}
        onChangeText={(value) => {
          clear_error();
          setAlamatPimpinan(value);
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

      <AInputAlamat
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

      <AInputAlamat
        visibleModal={wilayahPimpinanModal}
        master={dataMaster}
        setWilayah={setWilayahPimpinan}
        setProvinsi={setProvinsiPimpinan}
        setKabupaten={setKabupatenPimpinan}
        setKecamatan={setKecamatanPimpinan}
        setKelurahan={setKelurahanPimpinan}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleWilayahPimpinanModal();
        }}
        onPressOKButton={() => {
          toggleWilayahPimpinanModal();
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
    flexGrow: 1,
  },
});

export default Perusahaan;

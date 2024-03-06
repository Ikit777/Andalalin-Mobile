import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import ADropDownCostume from "../utility/ADropdownCostume";
import ATextInputIcon from "../utility/ATextInputIcon";
import AInputAlamat from "../utility/AInputAlamat";

function Pengembang({ onPress }) {
  const {
    permohonan: {
      nama_pengembang,
      wilayah_administratif_pengembang,
      provinsi_pengembang,
      kabupaten_pengembang,
      kecamatan_pengembang,
      kelurahan_pengembang,
      alamat_pengembang,
      nomer_pengembang,
      email_pengembang,
      nama_pimpinan_pengembang,
      wilayah_administratif_pimpinan_pengembang,
      provinsi_pimpinan_pengembang,
      kabupaten_pimpinan_pengembang,
      kecamatan_pimpinan_pengembang,
      kelurahan_pimpinan_pengembang,
      alamat_pimpinan_pengembang,
      jabatan_pimpinan_pengembang,
      jenis_kelamin_pimpinan_pengembang,
      bangkitan,
    },
    dispatch,
    dataMaster,
  } = useContext(UserContext);

  const namaInput = React.createRef();
  const alamatInput = React.createRef();
  const nomerInput = React.createRef();
  const emailInput = React.createRef();
  const pimpinanInput = React.createRef();
  const jabatanInput = React.createRef();

  const [nama, setNama] = useState(nama_pengembang);
  const [alamat, setAlamat] = useState(alamat_pengembang);
  const [wilayah, setWilayah] = useState(wilayah_administratif_pengembang);
  const [provinsi, setProvinsi] = useState(provinsi_pengembang);
  const [kabupaten, setKabupaten] = useState(kabupaten_pengembang);
  const [kecamatan, setKecamatan] = useState(kecamatan_pengembang);
  const [kelurahan, setKelurahan] = useState(kelurahan_pengembang);
  const [nomer, setNomer] = useState(nomer_pengembang);
  const [email, setEmail] = useState(email_pengembang);
  const [pimpinan, setPimpinan] = useState(nama_pimpinan_pengembang);
  const [jabatan, setJabatan] = useState(jabatan_pimpinan_pengembang);
  const [jenis, setJenis] = useState(jenis_kelamin_pimpinan_pengembang);
  const [wilayahPimpinan, setWilayahPimpinan] = useState(
    wilayah_administratif_pimpinan_pengembang
  );
  const [provinsiPimpinan, setProvinsiPimpinan] = useState(
    provinsi_pimpinan_pengembang
  );
  const [kabupatenPimpinan, setKabupatenPimpinan] = useState(
    kabupaten_pimpinan_pengembang
  );
  const [kecamatanPimpinan, setKecamatanPimpinan] = useState(
    kecamatan_pimpinan_pengembang
  );
  const [kelurahanPimpinan, setKelurahanPimpinan] = useState(
    kelurahan_pimpinan_pengembang
  );
  const [alamatPimpinan, setAlamatPimpinan] = useState(
    alamat_pimpinan_pengembang
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
      namaError ? toggleNamaError() : "";
      alamatError ? toggleAlamatError() : "";
      wilayahError ? toggleWilayahError() : "";
      nomerError ? toggleNomerError() : "";
      emailError ? toggleEmailError() : "";
      pimpinanError ? togglePimpinanError() : "";
      jabatanError ? toggleJabatanError() : "";
      alamatPimpinanError ? toggleAlamatPimpinanError() : "";

      formError ? toggleFormError() : "";

      dispatch({
        nama_pengembang: nama,
        alamat_pengembang: alamat,
        wilayah_administratif_pengembang: wilayah,
        provinsi_pengembang: provinsi,
        kabupaten_pengembang: kabupaten,
        kecamatan_pengembang: kecamatan,
        kelurahan_pengembang: kelurahan,
        nomer_pengembang: nomer,
        email_pengembang: email,
        nama_pimpinan_pengembang: pimpinan,
        jabatan_pimpinan_pengembang: jabatan,
        jenis_kelamin_pimpinan_pengembang: jenis,
        wilayah_administratif_pimpinan_pengembang: wilayahPimpinan,
        provinsi_pimpinan_pengembang: provinsiPimpinan,
        kabupaten_pimpinan_pengembang: kabupatenPimpinan,
        kecamatan_pimpinan_pengembang: kecamatanPimpinan,
        kelurahan_pimpinan_pengembang: kelurahanPimpinan,
        alamat_pimpinan_pengembang: alamatPimpinan,
      });
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
    clear_error();
  }, [jenis]);

  useEffect(() => {
    clear_error();
  }, [wilayah]);

  useEffect(() => {
    clear_error();
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
        title={"Nama pengembang atau pembangun"}
        rtype={"done"}
        wajib={"*"}
        blur={true}
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
        title={"Wilayah administratif pengembang"}
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
        title={"Alamat pengembang"}
        multi={true}
        wajib={"*"}
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
        title={"Nomor telepon/WA pengembang"}
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
        title={"Email pengembang"}
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
        multi={false}
        value={pimpinan}
        wajib={"*"}
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
        wajib={"*"}
        padding={20}
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
        wajib={"*"}
        width={true}
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
        wajib={"*"}
        multi={true}
        padding={20}
        value={alamatPimpinan}
        onChangeText={(value) => {
          clear_error();
          setAlamatPimpinan(value);
        }}
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

      {!formError && bangkitan == "Bangkitan rendah" ? (
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

export default Pengembang;

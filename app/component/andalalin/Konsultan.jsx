import React, { useState, useContext, useEffect } from "react";
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

function Konsultan({ onPress }) {
  const {
    permohonan: {
      nama_konsultan,
      wilayah_administratif_konsultan,
      provinsi_konsultan,
      kabupaten_konsultan,
      kecamatan_konsultan,
      kelurahan_konsultan,
      alamat_konsultan,
      nomer_konsultan,
      email_konsultan,
      nama_penyusun,
      jenis_kelamin_penyusun,
      wilayah_administratif_penyusun,
      provinsi_penyusun,
      kabupaten_penyusun,
      kecamatan_penyusun,
      kelurahan_penyusun,
      alamat_penyusun,
      nomer_serifikat_penyusun,
      klasifikasi_penyusun,
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
  const sertifikatInput = React.createRef();
  const klasifikasiInput = React.createRef();

  const [nama, setNama] = useState(nama_konsultan);
  const [alamat, setAlamat] = useState(alamat_konsultan);
  const [wilayah, setWilayah] = useState(wilayah_administratif_konsultan);
  const [provinsi, setProvinsi] = useState(provinsi_konsultan);
  const [kabupaten, setKabupaten] = useState(kabupaten_konsultan);
  const [kecamatan, setKecamatan] = useState(kecamatan_konsultan);
  const [kelurahan, setKelurahan] = useState(kelurahan_konsultan);
  const [nomer, setNomer] = useState(nomer_konsultan);
  const [email, setEmail] = useState(email_konsultan);
  const [penyusun, setPenyusun] = useState(nama_penyusun);
  const [jenis, setJenis] = useState(jenis_kelamin_penyusun);
  const [wilayahPenyusun, setWilayahPenyusun] = useState(
    wilayah_administratif_penyusun
  );
  const [provinsiPenyusun, setProvinsiPenyusun] = useState(provinsi_penyusun);
  const [kabupatenPenyusun, setKabupatenPenyusun] =
    useState(kabupaten_penyusun);
  const [kecamatanPenyusun, setKecamatanPenyusun] =
    useState(kecamatan_penyusun);
  const [kelurahanPenyusun, setKelurahanPenyusun] =
    useState(kelurahan_penyusun);
  const [alamatPenyusun, setAlamatPenyusun] = useState(alamat_penyusun);

  const [nomerSertifikat, setNomerSertifikat] = useState(
    nomer_serifikat_penyusun
  );
  const [klasifikasi, setKlasifikasi] = useState(klasifikasi_penyusun);

  const [namaError, toggleNamaError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [wilayahError, toggleWilayahError] = useStateToggler();
  const [nomerError, toggleNomerError] = useStateToggler();
  const [emailError, toggleEmailError] = useStateToggler();
  const [pimpinanError, togglePimpinanError] = useStateToggler();
  const [jenisError, toggleJenisError] = useStateToggler();
  const [wilayahPimpinanError, toggleWilayahPimpinanError] = useStateToggler();
  const [alamatPimpinanError, toggleAlamatPimpinanError] = useStateToggler();

  const [sertifikatError, toggleSertifikatError] = useStateToggler();
  const [klasifikasiError, toggleKlasifikasiError] = useStateToggler();

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
      penyusun != "" &&
      jenis != "" &&
      wilayahPenyusun != "" &&
      alamatPenyusun != "" &&
      nomerSertifikat &&
      klasifikasi
    ) {
      namaError ? toggleNamaError() : "";
      alamatError ? toggleAlamatError() : "";
      wilayahError ? toggleWilayahError() : "";
      nomerError ? toggleNomerError() : "";
      emailError ? toggleEmailError() : "";
      pimpinanError ? togglePimpinanError() : "";
      alamatPimpinanError ? toggleAlamatPimpinanError() : "";
      sertifikatError ? toggleSertifikatError() : "";
      klasifikasiError ? toggleKlasifikasiError() : "";
      formError ? toggleFormError() : "";

      dispatch({
        nama_konsultan: nama,
        wilayah_administratif_konsultan: wilayah,
        provinsi_konsultan: provinsi,
        kabupaten_konsultan: kabupaten,
        kecamatan_konsultan: kecamatan,
        kelurahan_konsultan: kelurahan,
        alamat_konsultan: alamat,
        nomer_konsultan: nomer,
        email_konsultan: email,
        nama_penyusun: penyusun,
        jenis_kelamin_penyusun: jenis,
        wilayah_administratif_penyusun: wilayahPenyusun,
        provinsi_penyusun: provinsiPenyusun,
        kabupaten_penyusun: kabupatenPenyusun,
        kecamatan_penyusun: kecamatanPenyusun,
        kelurahan_penyusun: kelurahanPenyusun,
        alamat_penyusun: alamatPenyusun,
        nomer_serifikat_penyusun: nomerSertifikat,
        klasifikasi_penyusun: klasifikasi,
      });
      onPress();
    } else {
      nama == "" ? (namaError ? "" : toggleNamaError()) : "";
      alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
      wilayah == "" ? (wilayahError ? "" : toggleWilayahError()) : "";
      nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
      email == "" ? (emailError ? "" : toggleEmailError()) : "";
      penyusun == "" ? (pimpinanError ? "" : togglePimpinanError()) : "";
      jenis == "" ? (jenisError ? "" : toggleJenisError()) : "";
      wilayahPenyusun == ""
        ? wilayahPimpinanError
          ? ""
          : toggleWilayahPimpinanError()
        : "";
      alamatPenyusun == ""
        ? alamatPimpinanError
          ? ""
          : toggleAlamatPimpinanError()
        : "";
      nomerSertifikat == ""
        ? sertifikatError
          ? ""
          : toggleSertifikatError()
        : "";
      klasifikasi == ""
        ? klasifikasiError
          ? ""
          : toggleKlasifikasiError()
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
  }, [wilayahPenyusun]);

  const clear_error = () => {
    nama != "" ? (namaError ? toggleNamaError() : "") : "";
    alamat != "" ? (alamatError ? toggleAlamatError() : "") : "";
    wilayah != "" ? (wilayahError ? toggleWilayahError() : "") : "";
    nomer != "" ? (nomerError ? toggleNomerError() : "") : "";
    email != "" ? (emailError ? toggleEmailError() : "") : "";
    penyusun != "" ? (pimpinanError ? togglePimpinanError() : "") : "";
    jenis != "" ? (jenisError ? toggleJenisError() : "") : "";
    wilayahPenyusun != ""
      ? wilayahPimpinanError
        ? toggleWilayahPimpinanError()
        : ""
      : "";
    alamatPenyusun != ""
      ? alamatPimpinanError
        ? toggleAlamatPimpinanError()
        : ""
      : "";
    nomerSertifikat != ""
      ? sertifikatError
        ? toggleSertifikatError()
        : ""
      : "";
    klasifikasi != "" ? (klasifikasiError ? toggleKlasifikasiError() : "") : "";

    nama != "" &&
    wilayah != "" &&
    alamat != "" &&
    nomer != "" &&
    email != "" &&
    penyusun != "" &&
    jenis != "" &&
    wilayahPenyusun != "" &&
    alamatPenyusun != "" &&
    nomerSertifikat != "" &&
    klasifikasi != ""
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
        title={"Nama konsultan"}
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
        title={"Wilayah administratif konsultan"}
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
        title={"Alamat konsultan"}
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

      <ATextInput
        bdColor={nomerError ? color.error.error500 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nomor"}
        title={"Nomor telepon/WA konsultan"}
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
        title={"Email konsultan"}
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
        hint={"Masukkan nama penyusun"}
        title={"Nama penyusun dokumen"}
        rtype={"done"}
        blur={true}
        wajib={"*"}
        multi={false}
        value={penyusun}
        padding={20}
        ref={pimpinanInput}
        onChangeText={(value) => {
          clear_error();
          setPenyusun(value);
        }}
        submit={() => {
          clear_error();
        }}
      />

      <ADropDownCostume
        bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jenis kelamin penyusun dokumen"}
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
        title={"Wilayah administratif penyusun dokumen"}
        padding={20}
        mult={true}
        width={true}
        wajib={"*"}
        icon={"map-pin"}
        value={wilayahPenyusun}
        onPress={toggleWilayahPimpinanModal}
      />

      <ATextInput
        bdColor={
          alamatPimpinanError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat penyusun dokumen"}
        multi={true}
        padding={20}
        value={alamatPenyusun}
        wajib={"*"}
        onChangeText={(value) => {
          clear_error();
          setAlamatPenyusun(value);
        }}
      />

      <ATextInput
        bdColor={
          sertifikatError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan nomor sertifikat"}
        title={"Nomer sertifikat penyusun dokumen"}
        rtype={"next"}
        multi={false}
        padding={20}
        wajib={"*"}
        blur={false}
        value={nomerSertifikat}
        ref={sertifikatInput}
        onChangeText={(value) => {
          clear_error();
          setNomerSertifikat(value);
        }}
        submit={() => {
          clear_error();
          {
            nomerSertifikat != "" ? klasifikasiInput.current.focus() : "";
          }
        }}
      />

      <AText
        style={{ paddingTop: 6 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Keterangan: Nomor sertifikat penyusun dokumen andalalin
      </AText>

      <ATextInput
        bdColor={
          klasifikasiError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan klasifikasi"}
        title={"Klasifikasi penyusun dokumen"}
        rtype={"done"}
        multi={false}
        wajib={"*"}
        padding={20}
        value={klasifikasi}
        ref={klasifikasiInput}
        onChangeText={(value) => {
          clear_error();
          setKlasifikasi(value);
        }}
        submit={() => {
          clear_error();
        }}
      />

      <AText
        style={{ paddingTop: 6 }}
        color={color.neutral.neutral300}
        size={14}
        weight="normal"
      >
        Keterangan: Klasifikasi penyusun dokumen andalalin
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

      {!formError ? (
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
        setWilayah={setWilayahPenyusun}
        setProvinsi={setProvinsiPenyusun}
        setKabupaten={setKabupatenPenyusun}
        setKecamatan={setKecamatanPenyusun}
        setKelurahan={setKelurahanPenyusun}
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

export default Konsultan;

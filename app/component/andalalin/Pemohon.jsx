import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import { UserContext } from "../../context/UserContext";
import ATextInput from "../utility/ATextInput";
import { useStateToggler } from "../../hooks/useUtility";
import ATextInputIcon from "../utility/ATextInputIcon";
import AButton from "../utility/AButton";
import ADropDownCostume from "../utility/ADropdownCostume";
import AInputAlamat from "../utility/AInputAlamat";
import ADatePicker from "../utility/ADatePicker";

function Pemohon({ onPress }) {
  const {
    permohonan: {
      nik_pemohon,
      jabatan_pemohon,
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
      pemohon,
      nomer_serifikat,
      klasifikasi_pemohon,
    },
    getUser,
    dispatch,
    dataMaster,
  } = useContext(UserContext);

  const nikInput = React.createRef();
  const tempatLahirInput = React.createRef();
  const tanggalLahirInput = React.createRef();
  const jabatanInput = React.createRef();
  const alamatInput = React.createRef();
  const nomerSelulerInput = React.createRef();
  const sertifikatInput = React.createRef();
  const klasifikasiInput = React.createRef();

  const [nik, setNik] = useState(nik_pemohon);
  const [tempat, setTempat] = useState(tempat_lahir_pemohon);
  const [tanggal, setTanggal] = useState(tanggal_lahir_pemohon);
  const [jabatan, setJabatan] = useState(jabatan_pemohon);
  const [jenis, setJenis] = useState(jenis_kelamin_pemohon);
  const [alamat, setAlamat] = useState(alamat_pemohon);
  const [alamatModal, setAlamatModal] = useState(wilayah_administratif_pemohon);
  const [provinsi, setProvinsi] = useState(provinsi_pemohon);
  const [kabupaten, setKabupaten] = useState(kabupaten_pemohon);
  const [kecamatan, setKecamatan] = useState(kecamatan_pemohon);
  const [kelurahan, setKelurahan] = useState(kelurahan_pemohon);
  const [nomerSeluler, setNomerSeluler] = useState(nomer_pemohon);
  const [nomerSertifikat, setNomerSertifikat] = useState(nomer_serifikat);
  const [klasifikasi, setKlasifikasi] = useState(klasifikasi_pemohon);

  const [nikError, togglenikError] = useStateToggler();
  const [tempatError, toggletempatError] = useStateToggler();
  const [tanggalError, toggletanggalError] = useStateToggler();
  const [jabatanError, togglejabatanError] = useStateToggler();
  const [jenisError, togglejenisError] = useStateToggler();
  const [alamatError, togglealamatError] = useStateToggler();
  const [alamat1Error, togglealamat1Error] = useStateToggler();
  const [nomerSelulerError, togglenomerSelulerError] = useStateToggler();
  const [sertifikatError, toggleSertifikatError] = useStateToggler();
  const [klasifikasiError, toggleKlasifikasiError] = useStateToggler();

  const [alamatInputModal, toggleAlamatInputModal] = useStateToggler();

  const jenis_kelamin = [{ value: "Laki-laki" }, { value: "Perempuan" }];

  const [dateModal, toggleDateModal] = useStateToggler();

  const [formError, toggleFormError] = useStateToggler();

  const press = () => {
    if (pemohon == "Perorangan") {
      if (
        nik != "" &&
        jenis != "" &&
        tempat != "" &&
        tanggal != "" &&
        alamat != "" &&
        alamatModal != "" &&
        nomerSeluler != "" &&
        nomerSertifikat != "" &&
        klasifikasi != "" &&
        nik.length == 16
      ) {
        nikError ? togglenikError() : "";
        tempatError ? toggletempatError() : "";
        tanggalError ? toggletanggalError() : "";
        alamatError ? togglealamatError() : "";
        nomerSelulerError ? togglenomerSelulerError() : "";
        alamat1Error ? togglealamat1Error() : "";
        sertifikatError ? toggleSertifikatError() : "";
        klasifikasiError ? toggleKlasifikasiError() : "";
        formError ? toggleFormError() : "";
        dispatch({
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
          nomer_pemohon: nomerSeluler,
          nomer_serifikat: nomerSertifikat,
          klasifikasi_pemohon: klasifikasi,
        });
        dispatch({
          nama_pengembang: getUser().nama,
          alamat_pengembang: alamat,
          wilayah_administratif_pengembang: alamatModal,
          provinsi_pengembang: provinsi,
          kabupaten_pengembang: kabupaten,
          kecamatan_pengembang: kecamatan,
          kelurahan_pengembang: kelurahan,
          nomer_pengembang: nomerSeluler,
          email_pengembang: getUser().email,
          nama_pimpinan_pengembang: getUser().nama,
          jabatan_pimpinan_pengembang: getUser().nama,
          jenis_kelamin_pimpinan_pengembang: jenis,
          wilayah_administratif_pimpinan_pengembang: alamatModal,
          provinsi_pimpinan_pengembang: provinsi,
          kabupaten_pimpinan_pengembang: kabupaten,
          kecamatan_pimpinan_pengembang: kecamatan,
          kelurahan_pimpinan_pengembang: kelurahan,
          alamat_pimpinan_pengembang: alamat,
        });
        onPress();
      } else {
        nik == "" ? (nikError ? "" : togglenikError()) : "";
        jenis == "" ? (jenisError ? "" : togglejenisError()) : "";
        tempat == "" ? (tempatError ? "" : toggletempatError()) : "";
        tanggal == "" ? (tempatError ? "" : toggletanggalError()) : "";
        alamat == "" ? (alamatError ? "" : togglealamatError()) : "";
        alamatModal == "" ? (alamat1Error ? "" : togglealamat1Error()) : "";
        nomerSeluler == ""
          ? nomerSelulerError
            ? ""
            : togglenomerSelulerError()
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
    } else {
      if (
        nik != "" &&
        jabatan != "" &&
        jenis != "" &&
        tempat != "" &&
        tanggal != "" &&
        alamat != "" &&
        alamatModal != "" &&
        nomerSeluler != "" &&
        nomerSertifikat != "" &&
        klasifikasi != "" &&
        nik.length == 16
      ) {
        nikError ? togglenikError() : "";
        jabatanError ? togglejabatanError() : "";
        tempatError ? toggletempatError() : "";
        tanggalError ? toggletanggalError() : "";
        alamatError ? togglealamatError() : "";
        nomerSelulerError ? togglenomerSelulerError() : "";
        sertifikatError ? toggleSertifikatError() : "";
        klasifikasiError ? toggleKlasifikasiError() : "";
        formError ? toggleFormError() : "";
        dispatch({
          nik_pemohon: nik,
          jabatan_pemohon: jabatan,
          jenis_kelamin_pemohon: jenis,
          tempat_lahir_pemohon: tempat,
          tanggal_lahir_pemohon: tanggal,
          wilayah_administratif_pemohon: alamatModal,
          provinsi_pemohon: provinsi,
          kabupaten_pemohon: kabupaten,
          kecamatan_pemohon: kecamatan,
          kelurahan_pemohon: kelurahan,
          alamat_pemohon: alamat,
          nomer_pemohon: nomerSeluler,
          nomer_serifikat: nomerSertifikat,
          klasifikasi_pemohon: klasifikasi,
        });
        onPress();
      } else {
        nik == "" ? (nikError ? "" : togglenikError()) : "";
        jabatan == "" ? (jabatanError ? "" : togglejabatanError()) : "";
        jenis == "" ? (jenisError ? "" : togglejenisError()) : "";
        tempat == "" ? (tempatError ? "" : toggletempatError()) : "";
        tanggal == "" ? (tempatError ? "" : toggletanggalError()) : "";
        alamat == "" ? (alamatError ? "" : togglealamatError()) : "";
        alamatModal == "" ? (alamat1Error ? "" : togglealamat1Error()) : "";
        nomerSeluler == ""
          ? nomerSelulerError
            ? ""
            : togglenomerSelulerError()
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
    }
  };

  useEffect(() => {
    clear_error();
  }, [jenis]);

  useEffect(() => {
    clear_error();
  }, [tanggal]);

  useEffect(() => {
    clear_error();
  }, [alamatModal]);

  const clear_error = () => {
    if (pemohon == "Perorangan") {
      jenis != "" ? (jenisError ? togglejenisError() : "") : "";
      tempat != "" ? (tempatError ? toggletempatError() : "") : "";
      tanggal != "" ? (tanggalError ? toggletanggalError() : "") : "";
      alamat != "" ? (alamatError ? togglealamatError() : "") : "";
      nomerSeluler != ""
        ? nomerSelulerError
          ? togglenomerSelulerError()
          : ""
        : "";
      alamatModal != "" ? (alamat1Error ? togglealamat1Error() : "") : "";
      nomerSertifikat != ""
        ? sertifikatError
          ? toggleSertifikatError()
          : ""
        : "";
      klasifikasi != ""
        ? klasifikasiError
          ? toggleKlasifikasiError()
          : ""
        : "";

      nik != "" &&
      jenis != "" &&
      tempat != "" &&
      tanggal != "" &&
      alamat != "" &&
      alamatModal != "" &&
      nomerSeluler != "" &&
      nomerSertifikat != "" &&
      klasifikasi != "" &&
      nik.length == 16
        ? formError
          ? toggleFormError()
          : ""
        : "";
    } else {
      jenis != "" ? (jenisError ? togglejenisError() : "") : "";
      tempat != "" ? (tempatError ? toggletempatError() : "") : "";
      tanggal != "" ? (tanggalError ? toggletanggalError() : "") : "";
      alamat != "" ? (alamatError ? togglealamatError() : "") : "";
      nomerSeluler != ""
        ? nomerSelulerError
          ? togglenomerSelulerError()
          : ""
        : "";
      alamatModal != "" ? (alamat1Error ? togglealamat1Error() : "") : "";
      nomerSertifikat != ""
        ? sertifikatError
          ? toggleSertifikatError()
          : ""
        : "";
      klasifikasi != ""
        ? klasifikasiError
          ? toggleKlasifikasiError()
          : ""
        : "";
      jabatan != "" ? (jabatanError ? togglejabatanError() : "") : "";

      nik != "" &&
      jabatan != "" &&
      jenis != "" &&
      tempat != "" &&
      tanggal != "" &&
      alamat != "" &&
      alamatModal != "" &&
      nomerSeluler != "" &&
      nomerSertifikat != "" &&
      klasifikasi != "" &&
      nik.length == 16
        ? formError
          ? toggleFormError()
          : ""
        : "";
    }
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
        wajib={"*"}
        rtype={pemohon != "Perorangan" ? "next" : "done"}
        maksimal={16}
        blur={pemohon != "Perorangan" ? false : true}
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
          {
            pemohon != "Perorangan" ? jabatanInput.current.focus() : "";
          }
        }}
      />

      {nikError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          NIK kurang dari 16 karakter
        </AText>
      ) : (
        ""
      )}

      {pemohon != "Perorangan" ? (
        <View>
          <ATextInput
            bdColor={
              jabatanError ? color.error.error500 : color.neutral.neutral300
            }
            ktype={"default"}
            hint={"Masukkan jabatan anda"}
            title={"Jabatan"}
            rtype={"done"}
            wajib={"*"}
            multi={false}
            value={jabatan}
            padding={20}
            ref={jabatanInput}
            onChangeText={(value) => {
              clear_error();
              setJabatan(value);
            }}
            submit={() => {
              clear_error();
            }}
          />
        </View>
      ) : (
        ""
      )}

      <ADropDownCostume
        bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jenis kelamin"}
        hint={"Pilih jenis kelamin"}
        data={jenis_kelamin}
        wajib={"*"}
        padding={20}
        selected={setJenis}
        saved={jenis}
      />

      <ATextInput
        bdColor={tempatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan tempat lahir"}
        title={"Tempat lahir"}
        rtype={"done"}
        multi={false}
        wajib={"*"}
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
        mult={true}
        width={true}
        wajib={"*"}
        icon={"map-pin"}
        value={alamatModal}
        onPress={toggleAlamatInputModal}
      />

      <ATextInput
        bdColor={alamatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat"}
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
        bdColor={
          nomerSelulerError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"number-pad"}
        hint={"Masukkan nomor"}
        title={"Nomor telepon/WA"}
        rtype={"next"}
        value={nomerSeluler}
        wajib={"*"}
        multi={false}
        blur={false}
        padding={20}
        ref={nomerSelulerInput}
        onChangeText={(value) => {
          clear_error();
          setNomerSeluler(value);
        }}
        submit={() => {
          clear_error();

          {
            nomerSeluler != "" ? sertifikatInput.current.focus() : "";
          }
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
        bdColor={
          sertifikatError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan nomor sertifikat"}
        title={"Nomer sertifikat"}
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
        title={"Klasifikasi"}
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
          {
            tanggalError ? toggletanggalError() : "";
          }
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

export default Pemohon;

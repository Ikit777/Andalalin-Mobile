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

function Perusahaan({ onPress }) {
  const {
    permohonan: {
      nama_perusahaan,
      alamat_perusahaan,
      wilayah_administratif_perusahaan,
      provinsi_perusahaan,
      kabupaten_perusahaan,
      kecamatan_perusahaan,
      kelurahan_perusahaan,
      nomer_perusahaan,
      email_perusahaan,
      nama_pimpinan,
      jabatan_pimpinan,
      jenis_kelamin_pimpinan,
      wilayah_administratif_pimpinan,
      provinsi_pimpinan_perusahaan,
      kabupaten_pimpinan_perusahaan,
      kecamatan_pimpinan_perusahaan,
      kelurahan_pimpinan_perusahaan,
      alamat_pimpinan,
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

  const [nama, setNama] = useState(nama_perusahaan);
  const [alamat, setAlamat] = useState(alamat_perusahaan);
  const [wilayah, setWilayah] = useState(wilayah_administratif_perusahaan);
  const [provinsi, setProvinsi] = useState(provinsi_perusahaan);
  const [kabupaten, setKabupaten] = useState(kabupaten_perusahaan);
  const [kecamatan, setKecamatan] = useState(kecamatan_perusahaan);
  const [kelurahan, setKelurahan] = useState(kelurahan_perusahaan);
  const [nomer, setNomer] = useState(nomer_perusahaan);
  const [email, setEmail] = useState(email_perusahaan);
  const [pimpinan, setPimpinan] = useState(nama_pimpinan);
  const [jabatan, setJabatan] = useState(jabatan_pimpinan);
  const [jenis, setJenis] = useState(jenis_kelamin_pimpinan);
  const [wilayahPimpinan, setWilayahPimpinan] = useState(
    wilayah_administratif_pimpinan
  );
  const [provinsiPimpinan, setProvinsiPimpinan] = useState(
    provinsi_pimpinan_perusahaan
  );
  const [kabupatenPimpinan, setKabupatenPimpinan] = useState(
    kabupaten_pimpinan_perusahaan
  );
  const [kecamatanPimpinan, setKecamatanPimpinan] = useState(
    kecamatan_pimpinan_perusahaan
  );
  const [kelurahanPimpinan, setKelurahanPimpinan] = useState(
    kelurahan_pimpinan_perusahaan
  );
  const [alamatPimpinan, setAlamatPimpinan] = useState(alamat_pimpinan);

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
      {
        namaError ? toggleNamaError() : "";
      }
      {
        alamatError ? toggleAlamatError() : "";
      }
      {
        wilayahError ? toggleWilayahError() : "";
      }
      {
        nomerError ? toggleNomerError() : "";
      }
      {
        emailError ? toggleEmailError() : "";
      }
      {
        pimpinanError ? togglePimpinanError() : "";
      }
      {
        jabatanError ? toggleJabatanError() : "";
      }
      {
        alamatPimpinanError ? toggleAlamatPimpinanError() : "";
      }
      dispatch({
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
      });
      onPress();
    } else {
      {
        nama == "" ? (namaError ? "" : toggleNamaError()) : "";
      }
      {
        alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
      }
      {
        wilayah == "" ? (wilayahError ? "" : toggleWilayahError()) : "";
      }
      {
        nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
      }
      {
        email == "" ? (emailError ? "" : toggleEmailError()) : "";
      }
      {
        pimpinan == "" ? (pimpinanError ? "" : togglePimpinanError()) : "";
      }
      {
        jabatan == "" ? (jabatanError ? "" : toggleJabatanError()) : "";
      }
      {
        jenis == "" ? (jenisError ? "" : toggleJenisError()) : "";
      }
      {
        wilayahPimpinan == ""
          ? wilayahPimpinanError
            ? ""
            : toggleWilayahPimpinanError()
          : "";
      }
      {
        alamatPimpinan == ""
          ? alamatPimpinanError
            ? ""
            : toggleAlamatPimpinanError()
          : "";
      }
    }
  };

  useEffect(() => {
    {
      jenisError ? toggleJenisError() : "";
    }
  }, [jenis]);

  useEffect(() => {
    {
      wilayahError ? toggleWilayahError() : "";
    }
  }, [wilayah]);

  useEffect(() => {
    {
      wilayahPimpinanError ? toggleWilayahPimpinanError() : "";
    }
  }, [wilayahPimpinan]);

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
        multi={false}
        value={nama}
        ref={namaInput}
        onChangeText={(value) => {
          setNama(value);
        }}
        submit={() => {
          {
            namaError ? toggleNamaError() : "";
          }
        }}
      />

      {namaError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nama perusahaan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={wilayahError ? color.error.error500 : color.neutral.neutral300}
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif perusahaan"}
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
          Wilayah adiminstratif perusahaan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={alamatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat perusahaan"}
        multi={true}
        padding={20}
        value={alamat}
        ref={alamatInput}
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
          Alamat perusahaan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={nomerError ? color.error.error500 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nomor"}
        title={"Nomor telepon/Fax perusahaan"}
        rtype={"next"}
        blur={false}
        multi={false}
        value={nomer}
        padding={20}
        ref={nomerInput}
        onChangeText={(value) => {
          setNomer(value);
        }}
        submit={() => {
          {
            nomerError ? toggleNomerError() : "";
          }
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

      {nomerError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nomer telepon perusahaan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={emailError ? color.error.error500 : color.neutral.neutral300}
        hint={"Masukkan email"}
        title={"Email perusahaan"}
        rtype={"next"}
        blur={false}
        padding={20}
        ktype={"email-address"}
        inputMode={"email"}
        multi={false}
        value={email}
        ref={emailInput}
        onChangeText={(value) => {
          setEmail(value);
        }}
        submit={() => {
          {
            emailError ? toggleEmailError() : "";
          }
          pimpinanInput.current.focus();
        }}
      />

      {emailError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Email perusahaan wajib
        </AText>
      ) : (
        ""
      )}

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
        padding={20}
        ref={pimpinanInput}
        onChangeText={(value) => {
          setPimpinan(value);
        }}
        submit={() => {
          {
            pimpinanError ? togglePimpinanError() : "";
          }
          jabatanInput.current.focus();
        }}
      />

      {pimpinanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nama pimpinan wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={jabatanError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan jabatan pimpinan"}
        title={"Jabatan pimpinan"}
        rtype={"done"}
        multi={false}
        padding={20}
        value={jabatan}
        ref={jabatanInput}
        onChangeText={(value) => {
          setJabatan(value);
        }}
        submit={() => {
          {
            jabatanError ? toggleJabatanError() : "";
          }
        }}
      />

      {jabatanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jabatan pimpinan wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jenis kelamin pimpinan"}
        hint={"Pilih jenis kelamin"}
        data={jenis_kelamin}
        padding={20}
        selected={setJenis}
        saved={jenis}
      />
      {jenisError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Jenis kelamin wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={
          wilayahPimpinanError ? color.error.error500 : color.neutral.neutral300
        }
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif pimpinan"}
        padding={20}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={wilayahPimpinan}
        onPress={toggleWilayahPimpinanModal}
      />

      {wilayahPimpinanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Wilayah adiminstratif pimpinan wajib
        </AText>
      ) : (
        ""
      )}

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
        onChangeText={(value) => {
          setAlamatPimpinan(value);
        }}
      />

      {alamatPimpinanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Alamat pimpinan wajib
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

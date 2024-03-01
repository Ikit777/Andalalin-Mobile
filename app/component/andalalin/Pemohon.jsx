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
        {
          nikError ? togglenikError() : "";
        }
        {
          tempatError ? toggletempatError() : "";
        }
        {
          tanggalError ? toggletanggalError() : "";
        }
        {
          alamatError ? togglealamatError() : "";
        }
        {
          nomerSelulerError ? togglenomerSelulerError() : "";
        }
        {
          alamat1Error ? togglealamat1Error() : "";
        }
        {
          sertifikatError ? toggleSertifikatError() : "";
        }
        {
          klasifikasiError ? toggleKlasifikasiError() : "";
        }
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
        onPress();
      } else {
        {
          nik == "" ? (nikError ? "" : togglenikError()) : "";
        }
        {
          jenis == "" ? (jenisError ? "" : togglejenisError()) : "";
        }
        {
          tempat == "" ? (tempatError ? "" : toggletempatError()) : "";
        }
        {
          tanggal == "" ? (tempatError ? "" : toggletanggalError()) : "";
        }
        {
          alamat == "" ? (alamatError ? "" : togglealamatError()) : "";
        }
        {
          alamatModal == "" ? (alamat1Error ? "" : togglealamat1Error()) : "";
        }
        {
          nomerSeluler == ""
            ? nomerSelulerError
              ? ""
              : togglenomerSelulerError()
            : "";
        }
        {
          nomerSertifikat == ""
            ? sertifikatError
              ? ""
              : toggleSertifikatError()
            : "";
        }
        {
          klasifikasi == ""
            ? klasifikasiError
              ? ""
              : toggleKlasifikasiError()
            : "";
        }
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
        {
          nikError ? togglenikError() : "";
        }
        {
          jabatanError ? togglejabatanError() : "";
        }
        {
          tempatError ? toggletempatError() : "";
        }
        {
          tanggalError ? toggletanggalError() : "";
        }
        {
          alamatError ? togglealamatError() : "";
        }
        {
          nomerSelulerError ? togglenomerSelulerError() : "";
        }
        {
          sertifikatError ? toggleSertifikatError() : "";
        }
        {
          klasifikasiError ? toggleKlasifikasiError() : "";
        }
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
        {
          nik == "" ? (nikError ? "" : togglenikError()) : "";
        }
        {
          jabatan == "" ? (jabatanError ? "" : togglejabatanError()) : "";
        }
        {
          jenis == "" ? (jenisError ? "" : togglejenisError()) : "";
        }
        {
          tempat == "" ? (tempatError ? "" : toggletempatError()) : "";
        }
        {
          tanggal == "" ? (tempatError ? "" : toggletanggalError()) : "";
        }
        {
          alamat == "" ? (alamatError ? "" : togglealamatError()) : "";
        }
        {
          alamatModal == "" ? (alamat1Error ? "" : togglealamat1Error()) : "";
        }
        {
          nomerSeluler == ""
            ? nomerSelulerError
              ? ""
              : togglenomerSelulerError()
            : "";
        }
        {
          nomerSertifikat == ""
            ? sertifikatError
              ? ""
              : toggleSertifikatError()
            : "";
        }
        {
          klasifikasi == ""
            ? klasifikasiError
              ? ""
              : toggleKlasifikasiError()
            : "";
        }
      }
    }
  };

  useEffect(() => {
    {
      {
        jenisError ? togglejenisError() : "";
      }
    }
  }, [jenis]);

  useEffect(() => {
    {
      alamat1Error ? togglealamat1Error() : "";
    }
  }, [alamatModal]);

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
          setNik(value);
        }}
        submit={() => {
          if (nik.length > 0 && nik.length < 16) {
            nikError ? "" : togglenikError();
          } else {
            nikError ? togglenikError() : "";
          }
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
          {nik != "" ? "NIK kurang dari 16 karakter" : "NIK wajib"}
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
            multi={false}
            value={jabatan}
            padding={20}
            ref={jabatanInput}
            onChangeText={(value) => {
              setJabatan(value);
            }}
            submit={() => {
              {
                jabatanError ? togglejabatanError() : "";
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
              Jabatan wajib
            </AText>
          ) : (
            ""
          )}
        </View>
      ) : (
        ""
      )}

      <ADropDownCostume
        bdColor={jenisError ? color.error.error500 : color.neutral.neutral300}
        judul={"Jenis kelamin"}
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

      <ATextInput
        bdColor={tempatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan tempat lahir"}
        title={"Tempat lahir"}
        rtype={"done"}
        multi={false}
        padding={20}
        value={tempat}
        ref={tempatLahirInput}
        onChangeText={(value) => {
          setTempat(value);
        }}
        submit={() => {
          {
            tempatError ? toggletempatError() : "";
          }
        }}
      />

      {tempatError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Tempat lahir wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={tanggalError ? color.error.error500 : color.neutral.neutral300}
        hint={"Masukkan tanggal lahir"}
        title={"Tanggal lahir"}
        padding={20}
        icon={"calendar"}
        value={tanggal}
        ref={tanggalLahirInput}
        onPress={() => {
          toggleDateModal();
        }}
      />

      {tanggalError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Tanggal lahir wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={alamat1Error ? color.error.error500 : color.neutral.neutral300}
        hint={"Pilih wilayah administratif"}
        title={"Wilayah administratif"}
        padding={20}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={alamatModal}
        onPress={toggleAlamatInputModal}
      />

      {alamat1Error ? (
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

      <ATextInput
        bdColor={alamatError ? color.error.error500 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan alamat"}
        title={"Alamat"}
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
          Alamat wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={
          nomerSelulerError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"number-pad"}
        hint={"Masukkan nomor"}
        title={"Nomor telepon/WA"}
        rtype={"next"}
        value={nomerSeluler}
        multi={false}
        blur={false}
        padding={20}
        ref={nomerSelulerInput}
        onChangeText={(value) => {
          setNomerSeluler(value);
        }}
        submit={() => {
          {
            nomerSelulerError ? togglenomerSelulerError() : "";
          }

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

      {nomerSelulerError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nomer telepon wajib
        </AText>
      ) : (
        ""
      )}

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
        blur={false}
        value={nomerSertifikat}
        ref={sertifikatInput}
        onChangeText={(value) => {
          setNomerSertifikat(value);
        }}
        submit={() => {
          {
            sertifikatError ? toggleSertifikatError() : "";
          }
          {
            nomerSertifikat != "" ? klasifikasiInput.current.focus() : "";
          }
        }}
      />

      {sertifikatError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nomer sertifikat wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={
          klasifikasiError ? color.error.error500 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan klasifikasi"}
        title={"Klasifikasi"}
        rtype={"done"}
        multi={false}
        padding={20}
        value={klasifikasi}
        ref={klasifikasiInput}
        onChangeText={(value) => {
          setKlasifikasi(value);
        }}
        submit={() => {
          {
            klasifikasiError ? toggleKlasifikasiError() : "";
          }
        }}
      />

      {klasifikasiError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Tempat lahir wajib
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

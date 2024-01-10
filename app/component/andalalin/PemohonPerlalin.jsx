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

  const [nikError, togglenikError] = useStateToggler();
  const [tempatError, toggletempatError] = useStateToggler();
  const [tanggalError, toggletanggalError] = useStateToggler();
  const [jenisError, togglejenisError] = useStateToggler();
  const [alamatError, togglealamatError] = useStateToggler();
  const [alamat1Error, togglealamat1Error] = useStateToggler();
  const [nomerError, togglenomerError] = useStateToggler();

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
      nomer != ""
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
        nomerError ? togglenomerError() : "";
      }
      {
        alamat1Error ? togglealamat1Error() : "";
      }
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
        nomer == "" ? (nomerError ? "" : togglenomerError()) : "";
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
        bdColor={nikError ? color.error.error300 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nik anda"}
        title={"Nik"}
        rtype={"done"}
        maksimal={16}
        multi={false}
        value={nik}
        ref={nikInput}
        onChangeText={(value) => {
          setNik(value);
        }}
        submit={() => {
          {
            nikError ? togglenikError() : "";
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
          Nik wajib
        </AText>
      ) : (
        ""
      )}

      <ADropDownCostume
        bdColor={jenisError ? color.error.error300 : color.neutral.neutral300}
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
        bdColor={tempatError ? color.error.error300 : color.neutral.neutral300}
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
        bdColor={tanggalError ? color.error.error300 : color.neutral.neutral300}
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
        bdColor={alamat1Error ? color.error.error300 : color.neutral.neutral300}
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
        bdColor={alamatError ? color.error.error300 : color.neutral.neutral300}
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
        bdColor={nomerError ? color.error.error300 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nomer"}
        title={"Nomer telepon/Fax"}
        rtype={"done"}
        multi={false}
        value={nomer}
        padding={20}
        ref={nomerInput}
        onChangeText={(value) => {
          setNomer(value);
        }}
        submit={() => {
          {
            nomerError ? togglenomerError() : "";
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

      {nomerError ? (
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

export default PemohonPerlalin;

import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import { UserContext } from "../../context/UserContext";
import ATextInput from "../utility/ATextInput";
import { useStateToggler } from "../../hooks/useUtility";
import ATextInputIcon from "../utility/ATextInputIcon";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import AButton from "../utility/AButton";
import ADropDownCostume from "../utility/ADropdownCostume";

function PemohonPerlalin({ onPress }) {
  const {
    perlalin: {
      nik_pemohon,
      jenis_kelamin_pemohon,
      tempat_lahir_pemohon,
      tanggal_lahir_pemohon,
      alamat_pemohon,
      nomer_pemohon,
      nomer_seluler_pemohon,
    },
    setPerlalin,
  } = useContext(UserContext);

  const nikInput = React.createRef();
  const tempatLahirInput = React.createRef();
  const tanggalLahirInput = React.createRef();
  const alamatInput = React.createRef();
  const nomerInput = React.createRef();
  const nomerSelulerInput = React.createRef();

  const [nik, setNik] = useState(nik_pemohon);
  const [tempat, setTempat] = useState(tempat_lahir_pemohon);
  const [tanggal, setTanggal] = useState(tanggal_lahir_pemohon);
  const [jenis, setJenis] = useState(jenis_kelamin_pemohon);
  const [alamat, setAlamat] = useState(alamat_pemohon);
  const [nomer, setNomer] = useState(nomer_pemohon);
  const [nomerSeluler, setNomerSeluler] = useState(nomer_seluler_pemohon);

  const [nikError, togglenikError] = useStateToggler();
  const [tempatError, toggletempatError] = useStateToggler();
  const [tanggalError, toggletanggalError] = useStateToggler();
  const [jenisError, togglejenisError] = useStateToggler();
  const [alamatError, togglealamatError] = useStateToggler();
  const [nomerError, togglenomerError] = useStateToggler();
  const [nomerSelulerError, togglenomerSelulerError] = useStateToggler();

  const jenis_kelamin = [{ value: "Laki-laki" }, { value: "Perempuan" }];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTanggal(formatDate(currentDate));
    {
      tanggalError ? toggletanggalError() : "";
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const formatDate = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const press = () => {
    if (
      nik != "" &&
      jenis != "" &&
      tempat != "" &&
      tanggal != "" &&
      alamat != "" &&
      nomer != "" &&
      nomerSeluler != ""
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
        nomerSelulerError ? togglenomerSelulerError() : "";
      }
      setPerlalin({
        nik_pemohon: nik,
        jenis_kelamin_pemohon: jenis,
        tempat_lahir_pemohon: tempat,
        tanggal_lahir_pemohon: tanggal,
        alamat_pemohon: alamat,
        nomer_pemohon: nomer,
        nomer_seluler_pemohon: nomerSeluler,
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
        nomer == "" ? (nomerError ? "" : togglenomerError()) : "";
      }
      {
        nomerSeluler == ""
          ? nomerSelulerError
            ? ""
            : togglenomerSelulerError()
          : "";
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
          Nik kosong
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
          Jenis kelamin belum dipilih
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
          Tempat lahir kosong
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
        onPress={showDatepicker}
      />

      {tanggalError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Tanggal lahir kosong
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
          Alamat kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={nomerError ? color.error.error300 : color.neutral.neutral300}
        ktype={"number-pad"}
        hint={"Masukkan nomer"}
        title={"Nomer telepon rumah/kabel"}
        rtype={"next"}
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
          nomerSelulerInput.current.focus();
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
          Nomer telepon kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={
          nomerSelulerError ? color.error.error300 : color.neutral.neutral300
        }
        ktype={"number-pad"}
        hint={"Masukkan nomer seluler"}
        title={"Nomer telepon seluler"}
        rtype={"done"}
        value={nomerSeluler}
        multi={false}
        padding={20}
        ref={nomerSelulerInput}
        onChangeText={(value) => {
          setNomerSeluler(value);
        }}
        submit={() => {
          {
            nomerSelulerError ? togglenomerSelulerError() : "";
          }
        }}
      />

      {nomerSelulerError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nomer telepon seluler kosong
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

import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import AText from "../utility/AText";
import color from "../../constants/color";
import ATextInput from "../utility/ATextInput";
import ATextInputIcon from "../utility/ATextInputIcon";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import ALokasi from "../utility/ALokasi";

function Kegiatan({ onPress }) {
  const {
    permohonan: {
      aktivitas,
      peruntukan,
      kriteria_khusus,
      nilai_kriteria,
      lokasi_bangunan,
      nomer_skrk,
      tanggal_skrk,
      lat_bangunan,
      long_bangunan,
      jenis,
      rencana_pembangunan,
    },
    dispatch,
    dataMaster,
  } = useContext(UserContext);

  const kegiatanInput = React.createRef();
  const peruntukanInput = React.createRef();
  const luasInput = React.createRef();
  const alamatInput = React.createRef();
  const nomerInput = React.createRef();

  const [kegiatan, setKegiatan] = useState(aktivitas);
  const [untuk, setPeruntukan] = useState(peruntukan);
  const [luas, setLuas] = useState(nilai_kriteria);
  const [alamat, setAlamat] = useState(lokasi_bangunan);
  const [nomer, setNomer] = useState(nomer_skrk);
  const [tanggal, setTanggal] = useState(tanggal_skrk);
  const [lat, setLat] = useState(lat_bangunan);
  const [long, setLong] = useState(long_bangunan);

  const [kegiatanError, toggleKegiatanError] = useStateToggler();
  const [peruntukanError, togglePeruntukanError] = useStateToggler();
  const [luasError, toggleLuasError] = useStateToggler();
  const [alamatError, toggleAlamatError] = useStateToggler();
  const [nomerError, toggleNomerError] = useStateToggler();
  const [tanggalError, toggleTanggalError] = useStateToggler();

  const [lokasiModal, toggleLokasiModal] = useStateToggler();

  const [data, setData] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTanggal(formatDate(currentDate));
    {
      tanggalError ? toggleTanggalError() : "";
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
    if (data.Kriteria == "" && data.Kriteria == null) {
      if (
        kegiatan != "" &&
        untuk != "" &&
        alamat != "" &&
        nomer != "" &&
        tanggal != ""
      ) {
        {
          kegiatanError ? toggleKegiatanError() : "";
        }
        {
          peruntukanError ? togglePeruntukanError() : "";
        }
        {
          alamatError ? toggleAlamatError() : "";
        }
        {
          nomerError ? toggleNomerError() : "";
        }
        {
          tanggalError ? toggleTanggalError() : "";
        }

        dispatch({
          aktivitas: kegiatan,
          peruntukan: untuk,
          lokasi_bangunan: alamat,
          nomer_skrk: nomer,
          tanggal_skrk: tanggal,
          lat_bangunan: lat,
          long_bangunan: long,
        });
        onPress();
      } else {
        {
          kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
        }
        {
          untuk == "" ? (peruntukanError ? "" : togglePeruntukanError()) : "";
        }
        {
          alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
        }
        {
          nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
        }
        {
          tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
        }
      }
    } else {
      if (
        kegiatan != "" &&
        untuk != "" &&
        luas != "" &&
        alamat != "" &&
        nomer != "" &&
        tanggal != ""
      ) {
        {
          kegiatanError ? toggleKegiatanError() : "";
        }
        {
          peruntukanError ? togglePeruntukanError() : "";
        }
        {
          luasError ? toggleLuasError() : "";
        }
        {
          alamatError ? toggleAlamatError() : "";
        }
        {
          nomerError ? toggleNomerError() : "";
        }
        {
          tanggalError ? toggleTanggalError() : "";
        }

        dispatch({
          aktivitas: kegiatan,
          peruntukan: untuk,
          kriteria_khusus: data.Kriteria,
          nilai_kriteria: luas,
          lokasi_bangunan: alamat,
          nomer_skrk: nomer,
          tanggal_skrk: tanggal,
          lat_bangunan: lat,
          long_bangunan: long,
        });
        onPress();
      } else {
        {
          kegiatan == "" ? (kegiatanError ? "" : toggleKegiatanError()) : "";
        }
        {
          untuk == "" ? (peruntukanError ? "" : togglePeruntukanError()) : "";
        }
        {
          luas == "" ? (luasError ? "" : toggleLuasError()) : "";
        }
        {
          alamat == "" ? (alamatError ? "" : toggleAlamatError()) : "";
        }
        {
          nomer == "" ? (nomerError ? "" : toggleNomerError()) : "";
        }
        {
          tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
        }
      }
    }
  };

  const dataSet = () => {
    let findData = dataMaster.rencana_pembangunan.find((item) => {
      return item.Kategori == jenis;
    });

    if (findData != null) {
      let rencana = findData.JenisRencana.find((item) => {
        return item.Jenis == rencana_pembangunan;
      });

      setData(rencana);
    }
  };

  useEffect(() => {
    dataSet();
  }, []);

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInput
        bdColor={
          kegiatanError ? color.error.error300 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Masukkan aktivitas"}
        title={"Aktivitas"}
        multi={true}
        value={kegiatan}
        ref={kegiatanInput}
        onChangeText={(value) => {
          setKegiatan(value);
        }}
      />

      {kegiatanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Aktivitas wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInput
        bdColor={
          peruntukanError ? color.error.error300 : color.neutral.neutral300
        }
        ktype={"default"}
        hint={"Peruntukan"}
        title={"Peruntukan"}
        multi={true}
        padding={20}
        value={untuk}
        ref={peruntukanInput}
        onChangeText={(value) => {
          setPeruntukan(value);
        }}
      />

      {peruntukanError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Peruntukan wajib
        </AText>
      ) : (
        ""
      )}

      {data.Kriteria != "" && data.Kriteria != null ? (
        <View>
          <ATextInput
            bdColor={
              luasError ? color.error.error300 : color.neutral.neutral300
            }
            ktype={"number-pad"}
            hint={"Masukkan " + data.Kriteria.toLowerCase()}
            title={data.Kriteria + " " + "(" + data.Satuan.toLowerCase() + ")"}
            rtype={"done"}
            blur={true}
            multi={false}
            padding={20}
            value={luas}
            ref={luasInput}
            onChangeText={(value) => {
              setLuas(value);
            }}
            submit={() => {
              {
                luasError ? toggleLuasError() : "";
              }
            }}
          />

          {luasError ? (
            <AText
              style={{ paddingTop: 6 }}
              color={color.error.error500}
              size={14}
              weight="normal"
            >
              {data.Kriteria} wajib
            </AText>
          ) : (
            ""
          )}
        </View>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={alamatError ? color.error.error300 : color.neutral.neutral300}
        hint={"Pilih lokasi bangunan"}
        title={"Lokasi bangunan"}
        padding={20}
        mult={true}
        width={true}
        icon={"map-pin"}
        value={alamat}
        onPress={toggleLokasiModal}
      />

      {alamatError ? (
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

      <ATextInput
        bdColor={nomerError ? color.error.error300 : color.neutral.neutral300}
        ktype={"default"}
        hint={"Masukkan nomor SKRK"}
        title={"Nomor SKRK"}
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
            nomerError ? toggleNomerError() : "";
          }
        }}
      />

      {nomerError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Nomor SKRK wajib
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={tanggalError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan tanggal SKRK"}
        title={"Tanggal SKRK"}
        padding={20}
        icon={"calendar"}
        value={tanggal}
        onPress={showDatepicker}
      />

      {tanggalError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Tanggal SKRK wajib
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

      <ALokasi
        visibleModal={lokasiModal}
        setLokasi={setAlamat}
        setLat={setLat}
        setLong={setLong}
        onPressOKButton={() => {
          toggleLokasiModal();
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

export default Kegiatan;

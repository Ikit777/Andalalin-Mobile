import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ATextInput from "../component/utility/ATextInput";
import ATextInputIcon from "../component/utility/ATextInputIcon";
import AButton from "../component/utility/AButton";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { UserContext } from "../context/UserContext";
import { useStateToggler } from "../hooks/useUtility";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { andalalinLaporanBAP } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";

function LaporanBAPScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;
  const id = route.params.id;
  const dasarRef = React.createRef();
  const pelaksanaanRef = React.createRef();

  const [dasar, setDasar] = useState("");
  const [pelaksanaan, setPelaksanaan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [file, setFile] = useState("");
  const [namaFile, setNamaFile] = useState("");

  const [dasarError, toggleDasarError] = useStateToggler();
  const [pelaksanaanError, togglePelaksanaanError] = useStateToggler();
  const [tanggalError, toggleTanggalError] = useStateToggler();
  const [fileError, toggleFileError] = useStateToggler();

  const [simpanGagal, toggleSimpanGagal] = useStateToggler();
  const [confirm, toggleComfirm] = useStateToggler();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });
  }, []);

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
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const berkas = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setFile(result.assets[0].uri);
      setNamaFile(result.assets[0].name);
      {
        fileError ? toggleFileError() : "";
      }
    }
  };

  const laporan = () => {
    context.toggleLoading(true);
    const bap = {
      nomer_dasar: dasar,
      nomer_pelaksanaan: pelaksanaan,
      tanggal: tanggal,
    };
    andalalinLaporanBAP(
      context.getUser().access_token,
      id,
      file,
      bap,
      (response) => {
        switch (response.status) {
          case 201:
            (async () => {
              navigation.replace("Back Detail", { id: id });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                laporan();
              } else {
                context.toggleLoading(false);
                toggleSimpanGagal();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleSimpanGagal();
        }
      }
    );
  };

  const simpan = () => {
    if (dasar != "" && pelaksanaan != "" && tanggal != "" && file != "") {
      {
        dasarError ? toggleDasarError() : "";
      }
      {
        pelaksanaanError ? togglePelaksanaanError() : "";
      }
      {
        tanggalError ? toggleTanggalError() : "";
      }
      {
        fileError ? toggleFileError() : "";
      }
      laporan()
    } else {
      {
        dasar == "" ? (dasarError ? "" : toggleDasarError()) : "";
      }
      {
        pelaksanaan == ""
          ? pelaksanaanError
            ? ""
            : togglePelaksanaanError()
          : "";
      }
      {
        tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
      }
      {
        file == "" ? (fileError ? "" : toggleFileError()) : "";
      }
    }
  };

  const judul = () => {
    switch (kondisi) {
      case "Laporan":
        return "Laporan BAP";
      case "Perbaharui":
        return "Perbaharui laporan";
    }
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <ATextInput
          bdColor={dasarError ? color.error.error300 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nomor dasar"}
          title={"Nomor dasar"}
          rtype={"next"}
          multi={false}
          blur={false}
          value={dasar}
          ref={dasarRef}
          onChangeText={(value) => {
            setDasar(value);
          }}
          submit={() => {
            {
              dasarError ? toggleDasarError() : "";
            }
            pelaksanaanRef.current.focus();
          }}
        />

        {dasarError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nomor dasar kosong
          </AText>
        ) : (
          ""
        )}

        <ATextInput
          bdColor={
            pelaksanaanError ? color.error.error300 : color.neutral.neutral300
          }
          ktype={"default"}
          hint={"Masukkan nomor pelaksanaan"}
          title={"Nomor pelaksanaan"}
          rtype={"done"}
          multi={false}
          value={pelaksanaan}
          padding={20}
          ref={pelaksanaanRef}
          onChangeText={(value) => {
            setPelaksanaan(value);
          }}
          submit={() => {
            {
              pelaksanaanError ? togglePelaksanaanError() : "";
            }
          }}
        />

        {pelaksanaanError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Nomor pelaksanaan kosong
          </AText>
        ) : (
          ""
        )}

        <ATextInputIcon
          bdColor={
            tanggalError ? color.error.error300 : color.neutral.neutral300
          }
          hint={"Masukkan tanggal"}
          title={"Tanggal"}
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
            Tanggal kosong
          </AText>
        ) : (
          ""
        )}

        <ATextInputIcon
          bdColor={fileError ? color.error.error300 : color.neutral.neutral300}
          hint={"Masukkan file BAP"}
          title={"File BAP"}
          icon={"file-plus"}
          padding={20}
          mult={true}
          value={namaFile}
          onPress={() => {
            berkas();
          }}
        />

        {fileError ? (
          <AText
            style={{ paddingTop: 6 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            File BAP belum dipilih
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={{ marginTop: 32, marginBottom: 32 }}
          title={"Simpan"}
          mode="contained"
          onPress={() => {
            toggleComfirm();
          }}
        />
      </ScrollView>

      <ADialog
        title={"Simpan gagal"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={simpanGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleSimpanGagal();
        }}
      />

      <AConfirmationDialog
        title={"Apakah Anda yakin?"}
        desc={"Laporan berita acara pemeriksaan akan disimpan"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          simpan();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    padding: 16,
  },
});

export default LaporanBAPScreen;

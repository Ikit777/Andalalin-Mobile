import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import AButton from "../component/utility/AButton";
import { useStateToggler } from "../hooks/useUtility";
import ATextInput from "../component/utility/ATextInput";
import ATextInputIcon from "../component/utility/ATextInputIcon";
import ADatePicker from "../component/utility/ADatePicker";
import * as DocumentPicker from "expo-document-picker";
import { authRefreshToken } from "../api/auth";
import { andalalinBeritaAcaraPeninjauan } from "../api/andalalin";
import ADialog from "../component/utility/ADialog";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";

function BeritaAcaraPeninjauanScreen({ navigation, route }) {
  const context = useContext(UserContext);

  const [nomor, setNomor] = useState("");
  const [tanggal, setTanggal] = useState("");

  const [namaFile, setNamaFile] = useState();
  const [uri, setUri] = useState();

  const [formError, toggleFormError] = useStateToggler();
  const [nomorError, toggleNomorError] = useStateToggler();
  const [tanggalError, toggleTanggalError] = useStateToggler();
  const [fileError, toggleFileError] = useStateToggler();

  const [tanggalModal, toggleTanggalModal] = useStateToggler();
  const [konfirmasi, toggleKonfirmasi] = useStateToggler();
  const [gagal, toggleGagal] = useStateToggler();

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

  const press = () => {
    if (nomor != "" && tanggal != "" && uri != "") {
      formError ? toggleFormError() : "";

      toggleKonfirmasi();
    } else {
      nomor == "" ? (nomorError ? "" : toggleNomorError()) : "";
      tanggal == "" ? (tanggalError ? "" : toggleTanggalError()) : "";
      uri == "" ? (fileError ? "" : toggleFileError()) : "";
      formError ? "" : toggleFormError();
    }
  };

  const clear_error = () => {
    nomor != "" ? (nomorError ? toggleNomorError() : "") : "";
    tanggal != "" ? (tanggalError ? toggleTanggalError() : "") : "";
    uri != "" ? (fileError ? toggleFileError() : "") : "";

    nomor != "" && tanggal != "" && uri != ""
      ? formError
        ? toggleFormError()
        : ""
      : "";
  };

  const file = async (persyaratan) => {
    const resultPdf = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!resultPdf.canceled) {
      setNamaFile(resultPdf.assets[0].name);
      setUri(resultPdf.assets[0].uri);
    }
  };

  const simpan = () => {
    context.toggleLoading(true);
    andalalinBeritaAcaraPeninjauan(
      context.getUser().access_token,
      context.detailPermohonan.id_andalalin,
      nomor,
      tanggal,
      uri,
      (response) => {
        switch (response.status) {
          case 200:
            navigation.replace("Detail", {
              id: context.detailPermohonan.id_andalalin,
            });
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleGagal();
            break;
        }
      }
    );
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <ABackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Peninjauan Lapangan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        nestedScrollEnabled={true}
      >
        <ATextInput
          bdColor={nomorError ? color.error.error500 : color.neutral.neutral300}
          ktype={"default"}
          hint={"Masukkan nomor"}
          title={"Nomor berita acara peninjauan lapangan"}
          wajib={"*"}
          multi={false}
          rtype={"done"}
          value={nomor}
          onChangeText={(value) => {
            setNomor(value);
            clear_error();
          }}
        />

        <ATextInputIcon
          bdColor={
            tanggalError ? color.error.error500 : color.neutral.neutral300
          }
          hint={"Masukkan tanggal"}
          title={"Tanggal berita acara peninjauan lapangan"}
          padding={20}
          wajib={"*"}
          icon={"calendar"}
          value={tanggal}
          onPress={() => {
            toggleTanggalModal();
          }}
        />

        <ATextInputIcon
          bdColor={
            tanggalError ? color.error.error500 : color.neutral.neutral300
          }
          hint={"Masukkan berkas pdf"}
          title={"Dokumen berita acara peninjauan lapangan"}
          padding={20}
          width={true}
          mult={true}
          wajib={"*"}
          icon={"file-plus"}
          value={namaFile}
          onPress={() => {
            file();
          }}
        />

        {formError ? (
          <AText
            style={{ paddingTop: 8 }}
            color={color.error.error500}
            size={14}
            weight="normal"
          >
            Lengkapi formulir atau kolom yang tersedia dengan benar
          </AText>
        ) : (
          ""
        )}

        <AButton
          style={{ marginTop: 32, marginBottom: 50 }}
          title={"Simpan"}
          mode="contained"
          onPress={() => {
            press();
          }}
        />

        <ADatePicker
          visibleModal={tanggalModal}
          onPressOKButton={() => {
            toggleTanggalModal();
            clear_error();
          }}
          onPressBATALButton={() => {
            toggleTanggalModal();
          }}
          pilih={setTanggal}
        />

        <AConfirmationDialog
          title={"Simpan"}
          desc={"Simpan data berita acara peninjauan lapangan?"}
          visibleModal={konfirmasi}
          toggleVisibleModal={toggleKonfirmasi}
          btnOK={"Simpan"}
          btnBATAL={"Batal"}
          onPressBATALButton={() => {
            toggleKonfirmasi();
          }}
          onPressOKButton={() => {
            toggleKonfirmasi();
            simpan();
          }}
        />

        <ADialog
          title={"Simpan gagal"}
          desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
          visibleModal={gagal}
          btnOK={"OK"}
          onPressOKButton={() => {
            toggleGagal();
          }}
        />
      </ScrollView>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default BeritaAcaraPeninjauanScreen;

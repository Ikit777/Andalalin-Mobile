import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import * as DocumentPicker from "expo-document-picker";

function Persyaratan({ navigation, onPress }) {
  const {
    permohonan: {
      berkas_ktp,
      nama_ktp,
      berkas_akta,
      nama_akta,
      berkas_surat,
      nama_surat,
    },
    dispatch,
  } = useContext(UserContext);
  const [ktp, setKTP] = useState(berkas_ktp);
  const [namaKtp, setNamaKtp] = useState(nama_ktp);
  const [ktpError, setKTPError] = useStateToggler();

  const [akta, setAkta] = useState(berkas_akta);
  const [namaAkta, setNamaAkta] = useState(nama_akta);
  const [aktaError, setAktaError] = useStateToggler();

  const [surat, setSurat] = useState(berkas_surat);
  const [namaSurat, setNamaSurat] = useState(nama_surat);
  const [suratError, setSuratError] = useStateToggler();

  const press = () => {
    if (ktp != "" && akta != "" && surat != "") {
      {
        ktpError ? setKTPError() : "";
      }
      {
        aktaError ? setAktaError() : "";
      }
      {
        suratError ? setSuratError() : "";
      }
      dispatch({
        berkas_ktp: ktp,
        nama_ktp: namaKtp,
        berkas_akta: akta,
        nama_akta: namaAkta,
        berkas_surat: surat,
        nama_surat: namaSurat,
      });
      onPress();
    } else {
      {
        ktp == "" ? (ktpError ? "" : setKTPError()) : "";
      }
      {
        akta == "" ? (aktaError ? "" : setAktaError()) : "";
      }
      {
        surat == "" ? (suratError ? "" : setSuratError()) : "";
      }
    }
  };

  const file = async (berkas) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      switch (berkas) {
        case 1:
          {
            ktpError ? setKTPError() : "";
          }
          setKTP(result.assets[0].uri);
          setNamaKtp(result.assets[0].name);
          break;
        case 2:
          {
            aktaError ? setAktaError() : "";
          }
          setAkta(result.assets[0].uri);
          setNamaAkta(result.assets[0].name);
          break;
        case 3:
          {
            suratError ? setSuratError() : "";
          }
          setSurat(result.assets[0].uri);
          setNamaSurat(result.assets[0].name);
          break;
      }
    }
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      <ATextInputIcon
        bdColor={ktpError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan berkas KTP"}
        title={"Berkas KTP"}
        icon={"file-plus"}
        value={namaKtp}
        mult={true}
        onPress={() => {
          file(1);
        }}
      />

      {ktpError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Berkas KTP kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={aktaError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan berkas akta"}
        title={"Berkas akta"}
        icon={"file-plus"}
        mult={true}
        value={namaAkta}
        padding={20}
        onPress={() => {
          file(2);
        }}
      />

      {aktaError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Berkas akta kosong
        </AText>
      ) : (
        ""
      )}

      <ATextInputIcon
        bdColor={suratError ? color.error.error300 : color.neutral.neutral300}
        hint={"Masukkan berkas surat kuasa"}
        title={"Surat kuasa"}
        icon={"file-plus"}
        padding={20}
        mult={true}
        value={namaSurat}
        onPress={() => {
          file(3);
        }}
      />

      {suratError ? (
        <AText
          style={{ paddingTop: 6 }}
          color={color.error.error500}
          size={14}
          weight="normal"
        >
          Berkas surat kuasa kosong
        </AText>
      ) : (
        ""
      )}

      <AButton
        style={{ marginTop: 32, marginBottom: 32 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          press();
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginBottom: 50,
          alignSelf: "center",
        }}
      >
        <AText color={color.neutral.neutral500} size={14} weight="normal">
          Lupa ketentuan persyaratan?
        </AText>

        <Pressable
          style={{ flexDirection: "row", paddingLeft: 4 }}
          onPress={() => {navigation.push("Ketentuan", {kondisi: "Pengajuan"})}}
        >
          <AText size={14} color={color.neutral.neutral700} weight="semibold">
            Lihat disini
          </AText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
  },
});

export default Persyaratan;

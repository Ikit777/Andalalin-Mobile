import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  BackHandler,
  ScrollView,
} from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import ATextInputIcon from "../component/utility/ATextInputIcon";
import * as DocumentPicker from "expo-document-picker";
import { useStateToggler } from "../hooks/useUtility";
import AButton from "../component/utility/AButton";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import ADialog from "../component/utility/ADialog";
import { andalalinUpdatePersyaratan } from "../api/andalalin";
import { authRefreshToken } from "../api/auth";
import { UserContext } from "../context/UserContext";

function UpdatePersyaratanScreen({ navigation, route }) {
  const permohonan = route.params.permohonan;
  const context = useContext(UserContext);

  const [ktp, setKTP] = useState("");
  const [akta, setAkta] = useState("");
  const [surat, setSurat] = useState("");

  const [namaKtp, setNamaKtp] = useState();
  const [namaAkta, setNamaAkta] = useState();
  const [namaSurat, setNamaSurat] = useState();

  const [ktpError, setKTPError] = useStateToggler();
  const [aktaError, setAktaError] = useStateToggler();
  const [suratError, setSuratError] = useStateToggler();

  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();

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

  const fileKtp = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      {
        ktpError ? setKTPError() : "";
      }
      setNamaKtp(result.assets[0].name);
      setKTP(result.assets[0].uri);
    }
  };

  const fileAkta = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      {
        aktaError ? setAktaError() : "";
      }
      setNamaAkta(result.assets[0].name);
      setAkta(result.assets[0].uri);
    }
  };

  const fileSurat = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      {
        suratError ? setSuratError() : "";
      }
      setNamaSurat(result.assets[0].name);
      setSurat(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (
      permohonan.persyaratan_tidak_sesuai.find(
        (value) => value == "Kartu tanda penduduk"
      ) == undefined
    ) {
      setKTP("Kosong");
    }

    if (
      permohonan.persyaratan_tidak_sesuai.find(
        (value) => value == "Akta pendirian badan"
      ) == undefined
    ) {
      setAkta("Kosong");
    }

    if (
      permohonan.persyaratan_tidak_sesuai.find(
        (value) => value == "Surat kuasa"
      ) == undefined
    ) {
      setSurat("Kosong");
    }
  }, []);

  const doSimpan = () => {
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
      toggleComfirm();
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

  const simpan = () => {
    const file = {
      ktp: ktp,
      akta: akta,
      surat: surat,
    };
    andalalinUpdatePersyaratan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      file,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              navigation.replace("Back Detail", { id: permohonan.id_andalalin });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan();
              } else {
                context.toggleLoading(false);
                toggleKirimGagal();
              }
            });
            break;
          default:
            context.toggleLoading(false);
            toggleKirimGagal();
        }
      }
    );
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
            Update persyaratan
          </AText>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
      >
        <AText
          style={{ paddingBottom: 8, paddingTop: 8 }}
          color={color.neutral.neutral500}
          size={16}
          weight="normal"
        >
          Berikut ini persyaratan yang masih kurang lengkap atau ada kesalahan:
        </AText>

        {permohonan.persyaratan_tidak_sesuai.find(
          (value) => value == "Kartu tanda penduduk"
        ) != undefined ? (
          <View style={{ paddingTop: 32 }}>
            <ATextInputIcon
              bdColor={
                ktpError ? color.error.error300 : color.neutral.neutral300
              }
              hint={"Masukkan berkas KTP"}
              title={"Berkas KTP"}
              icon={"file-plus"}
              value={namaKtp}
              onPress={() => {
                fileKtp();
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
          </View>
        ) : (
          ""
        )}

        {permohonan.persyaratan_tidak_sesuai.find(
          (value) => value == "Akta pendirian badan"
        ) != undefined ? (
          <View style={{ paddingTop: 32 }}>
            <ATextInputIcon
              bdColor={
                aktaError ? color.error.error300 : color.neutral.neutral300
              }
              hint={"Masukkan berkas akta"}
              title={"Berkas akta pendirian badan"}
              icon={"file-plus"}
              value={namaAkta}
              onPress={() => {
                fileAkta();
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
          </View>
        ) : (
          ""
        )}

        {permohonan.persyaratan_tidak_sesuai.find(
          (value) => value == "Surat kuasa"
        ) != undefined ? (
          <View style={{ paddingTop: 32 }}>
            <ATextInputIcon
              bdColor={
                suratError ? color.error.error300 : color.neutral.neutral300
              }
              hint={"Masukkan berkas surat"}
              title={"Berkas surat kuasa"}
              icon={"file-plus"}
              value={namaSurat}
              onPress={() => {
                fileSurat();
              }}
            />

            {suratError ? (
              <AText
                style={{ paddingTop: 6 }}
                color={color.error.error500}
                size={14}
                weight="normal"
              >
                Berkas surat kosong
              </AText>
            ) : (
              ""
            )}
          </View>
        ) : (
          ""
        )}
        <AButton
          style={{ marginBottom: 32, marginTop: 32 }}
          title={"Simpan"}
          mode="contained"
          onPress={() => {
            doSimpan();
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
            onPress={() => {
              navigation.push("Ketentuan", {kondisi: "Update"});
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat disini
            </AText>
          </Pressable>
        </View>
      </ScrollView>
      <AConfirmationDialog
        title={"Apakah Anda yakin?"}
        desc={"Data yang perbaharui akan disimpan"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          toggleComfirm();
          context.toggleLoading(true);
          simpan();
        }}
      />
      <ADialog
        title={"Persyaratan gagal diperbaharuui"}
        desc={"Terjadi kesalahan pada server kami, mohon coba lagi lain waktu"}
        visibleModal={kirimGagal}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleKirimGagal();
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

export default UpdatePersyaratanScreen;

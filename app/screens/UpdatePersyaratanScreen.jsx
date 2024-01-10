import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
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

  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();

  const stateError = false;
  const namaFile = "";
  const berkasFile = "";

  const [stateVariables, setStateVariables] = useState([]);

  const [data, setData] = useState();

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

  useEffect(() => {
    let val = permohonan.persyaratan_tidak_sesuai.map((item) => {
      stateVariables.push({
        berkas: item.persyaratan,
        stateError,
        namaFile,
        berkasFile,
        tipe: item.tipe,
      });
      return item;
    });
    setData(val);
  }, []);

  const handleChangeFile = (berkas, name, uri) => {
    const updateItems = stateVariables.map((item) => {
      if (item.berkas === berkas && uri !== null) {
        return { ...item, namaFile: name, berkasFile: uri, stateError: false };
      }
      return item;
    });

    setStateVariables(updateItems);
  };

  const handleChangeAllError = (cond) => {
    const updateItems = stateVariables.map((item) => {
      if (item.berkasFile === "") {
        return { ...item, stateError: true };
      }
      return item;
    });
    setStateVariables(updateItems);
  };

  const file = async (persyaratan, type) => {
    switch (type) {
      case "Pdf":
        const resultPdf = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
        if (!resultPdf.canceled) {
          handleChangeFile(
            persyaratan,
            resultPdf.assets[0].name,
            resultPdf.assets[0].uri
          );
        }
        break;
      case "Word":
        const resultWord = await DocumentPicker.getDocumentAsync({
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        if (!resultWord.canceled) {
          handleChangeFile(
            persyaratan,
            resultWord.assets[0].name,
            resultWord.assets[0].uri
          );
        }
        break;
    }
  };

  const doSimpan = () => {
    handleChangeAllError();

    let not_empty = stateVariables.filter((item) => {
      return item.berkasFile == "";
    });

    if (not_empty.length == 0) {
      toggleComfirm();
    }
  };

  const simpan = () => {
    andalalinUpdatePersyaratan(
      context.getUser().access_token,
      permohonan.id_andalalin,
      stateVariables,
      (response) => {
        switch (response.status) {
          case 200:
            (async () => {
              navigation.replace("Detail", {
                id: permohonan.id_andalalin,
              });
            })();
            break;
          case 424:
            authRefreshToken(context, (response) => {
              if (response.status === 200) {
                simpan();
              } else {
                context.toggleLoading(false);
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

  const view_tidak_terpenuhi = () => {
    if (stateVariables.length !== 0 && data !== null) {
      return (
        <View>
          {data.map((item, index) => (
            <View key={index} style={{ paddingTop: 20 }}>
              <ATextInputIcon
                bdColor={
                  stateVariables.find((variabel) => {
                    return variabel.berkas == item.persyaratan;
                  }).stateError
                    ? color.error.error300
                    : color.neutral.neutral300
                }
                hint={"Masukkan berkas " + item.tipe.toLowerCase()}
                title={item.persyaratan}
                mult={true}
                icon={"file-plus"}
                value={
                  stateVariables.find((variabel) => {
                    return variabel.berkas == item.persyaratan;
                  }).namaFile
                }
                onPress={() => {
                  file(item.persyaratan, item.tipe);
                }}
              />

              {stateVariables.find((variabel) => {
                return variabel.berkas == item.persyaratan;
              }).stateError ? (
                <AText
                  style={{ paddingTop: 6 }}
                  color={color.error.error500}
                  size={14}
                  weight="normal"
                >
                  {item.persyaratan} wajib
                </AText>
              ) : (
                ""
              )}
            </View>
          ))}
        </View>
      );
    }
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
            style={{ paddingLeft: 4}}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Perbarui persyaratan
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
          Berikut ini persyaratan yang masih masih belum terpenuhi atau ada
          kesalahan:
        </AText>

        {view_tidak_terpenuhi()}

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

          <TouchableOpacity
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              permohonan.jenis_andalalin == "Dokumen analisis dampak lalu lintas"
                ? navigation.push("Ketentuan", { kondisi: "Update andalalin", kategori: permohonan.kategori_bangkitan })
                : navigation.push("Ketentuan", { kondisi: "Update perlalin" });
            }}
          >
            <AText size={14} color={color.neutral.neutral700} weight="semibold">
              Lihat disini
            </AText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AConfirmationDialog
        title={"Simpan"}
        desc={"Pembaruan persyaratan akan disimpan"}
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
        title={"Persyaratan gagal diperbarui"}
        desc={"Terjadi kesalahan pada server, mohon coba lagi lain waktu"}
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
  header: {},
  content: {
    paddingHorizontal: 16,
  },
});

export default UpdatePersyaratanScreen;

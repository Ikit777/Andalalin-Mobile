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

  const [confirm, toggleComfirm] = useStateToggler();
  const [kirimGagal, toggleKirimGagal] = useStateToggler();

  const stateError = false;
  const namaFile = "";
  const berkasFile = "";

  const [stateVariables, setStateVariables] = useState([]);

  const [updateNoEmpyt, setUpdateNotEmpty] = useState(false);

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
        persyaratan: item,
        stateError,
        namaFile,
        berkasFile,
      });
      return item;
    });
    setData(val);
  }, []);

  const handleChangeFile = (persyaratan, name, uri) => {
    const updateItems = stateVariables.map((item) => {
      if (item.persyaratan === persyaratan && uri !== null) {
        setUpdateNotEmpty(true);
        return { ...item, namaFile: name, berkasFile: uri, stateError: false };
      }
      return item;
    });

    setStateVariables(updateItems);
  };

  const handleChangeAllError = (cond) => {
    const updateItems = stateVariables.map((item) => {
      if (item.berkasFile === "") {
        return { ...item, stateError: cond };
      }
      return item;
    });
    setStateVariables(updateItems);
  };

  const file = async (persyaratan) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      handleChangeFile(
        persyaratan,
        result.assets[0].name,
        result.assets[0].uri
      );
    }
  };

  const doSimpan = () => {
    stateVariables.forEach((state) => {
      if (state.berkasFile === "") {
        handleChangeAllError(true);
      }
    });

    if (updateNoEmpyt) {
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
              navigation.replace("Back Detail", {
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
            <View key={index} style={{ paddingTop: 32 }}>
              <ATextInputIcon
                bdColor={
                  stateVariables.find((variabel) => {
                    return variabel.persyaratan == item;
                  }).stateError
                    ? color.error.error300
                    : color.neutral.neutral300
                }
                hint={"Masukkan " + item.toLowerCase()}
                title={item}
                icon={"file-plus"}
                value={
                  stateVariables.find((variabel) => {
                    return variabel.persyaratan == item;
                  }).namaFile
                }
                onPress={() => {
                  file(item);
                }}
              />

              {stateVariables.find((variabel) => {
                return variabel.persyaratan == item;
              }).stateError ? (
                <AText
                  style={{ paddingTop: 6 }}
                  color={color.error.error500}
                  size={14}
                  weight="normal"
                >
                  {item} kosong
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
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            perbarui persyaratan
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

          <Pressable
            style={{ flexDirection: "row", paddingLeft: 4 }}
            onPress={() => {
              permohonan.jenis_andalalin == "Dokumen analisa dampak lalu lintas"
                ? navigation.push("Ketentuan", { kondisi: "Update andalalin" })
                : navigation.push("Ketentuan", { kondisi: "Update perlalin" });
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
        desc={"Data yang perbarui akan disimpan"}
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
  header: {},
  content: {
    paddingHorizontal: 16,
  },
});

export default UpdatePersyaratanScreen;

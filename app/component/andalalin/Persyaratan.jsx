import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import * as DocumentPicker from "expo-document-picker";

function Persyaratan({ navigation, onPress }) {
  const {
    permohonan: { persyaratan, bangkitan },
    dispatch,
    dataMaster,
  } = useContext(UserContext);

  const [data, setData] = useState();

  const [stateVariables, setStateVariables] = useState([]);

  const stateError = false;

  useEffect(() => {
    const andalalin = dataMaster.persyaratan.PersyaratanAndalalin.filter(
      (item) => {
        return item.bangkitan == bangkitan;
      }
    );

    if (andalalin != null) {
      let dokumen = andalalin.map((item) => {
        stateVariables.push({
          persyaratan: item.persyaratan,
          kebutuhan: item.kebutuhan,
          tipe: item.tipe,
          stateError,
          namaFile: savedNama(item.persyaratan),
          fileBerkas: savedFile(item.persyaratan),
        });
        return item;
      });

      setData(dokumen);
    }
  }, []);

  const savedNama = (dokumen) => {
    const updatedStateVariables = [...persyaratan];
    const index = updatedStateVariables.findIndex(
      (v) => v.persyaratan === dokumen
    );
    if (index !== -1) {
      return updatedStateVariables[index].nama;
    } else {
      return "";
    }
  };

  const savedFile = (dokumen) => {
    const updatedStateVariables = [...persyaratan];
    const index = updatedStateVariables.findIndex(
      (v) => v.persyaratan === dokumen
    );
    if (index !== -1) {
      return updatedStateVariables[index].file;
    } else {
      return "";
    }
  };

  const handleChangeFile = (persyaratan, name, uri) => {
    const updateItems = stateVariables.map((item) => {
      if (item.persyaratan === persyaratan && uri !== null) {
        return { ...item, namaFile: name, fileBerkas: uri, stateError: false };
      }
      return item;
    });

    setStateVariables(updateItems);
  };

  const handleChangeAllError = () => {
    const updateItems = stateVariables.map((item) => {
      if (item.fileBerkas === "" && item.kebutuhan === "Wajib") {
        return { ...item, stateError: true };
      }

      return item;
    });
    setStateVariables(updateItems);
  };

  const press = () => {
    handleChangeAllError();

    let not_empty = stateVariables.filter((item) => {
      return item.fileBerkas == "" && item.kebutuhan == "Wajib";
    });

    if (not_empty.length == 0) {
      const tambahanItem = stateVariables.map((item) => {
        return {
          persyaratan: item.persyaratan,
          kebutuhan: item.kebutuhan,
          nama: item.namaFile,
          file: item.fileBerkas,
        };
      });

      dispatch({
        persyaratan: tambahanItem,
      });
      onPress();
    }
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

  const utama = () => {
    if (data != null) {
      return (
        <View>
          {data.map((item, index) => (
            <View key={index}>
              <ATextInputIcon
                bdColor={
                  stateVariables.find((variabel) => {
                    return variabel.persyaratan == item.persyaratan;
                  }).stateError
                    ? color.error.error300
                    : color.neutral.neutral300
                }
                hint={"Masukkan berkas " + item.tipe.toLowerCase()}
                title={item.persyaratan}
                wajib={item.kebutuhan == "Wajib" ? "*" : ""}
                icon={"file-plus"}
                padding={index == 0 ? 0 : 20}
                mult={true}
                width={true}
                value={
                  stateVariables.find((variabel) => {
                    return variabel.persyaratan == item.persyaratan;
                  }).namaFile
                }
                onPress={() => {
                  file(item.persyaratan, item.tipe);
                }}
              />

              {stateVariables.find((variabel) => {
                return variabel.persyaratan == item.persyaratan;
              }).stateError ? (
                <AText
                  style={{ paddingTop: 6 }}
                  color={color.error.error500}
                  size={14}
                  weight="normal"
                >
                  Berkas {item.persyaratan.toLowerCase()} wajib
                </AText>
              ) : (
                ""
              )}
            </View>
          ))}

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

            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                const tambahanItem = stateVariables.map((item) => {
                  return {
                    persyaratan: item.persyaratan,
                    nama: item.namaFile,
                    file: item.fileBerkas,
                  };
                });

                dispatch({
                  persyaratan: tambahanItem,
                });
                navigation.push("Ketentuan", {
                  kondisi: "Pengajuan andalalin",
                });
              }}
            >
              <AText
                size={14}
                color={color.neutral.neutral700}
                weight="semibold"
              >
                Lihat disini
              </AText>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      {utama()}
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

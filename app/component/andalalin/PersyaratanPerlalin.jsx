import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import AButton from "../utility/AButton";
import * as DocumentPicker from "expo-document-picker";
import { useStateToggler } from "../../hooks/useUtility";
import { useRecoilState } from "recoil";
import PermohonanAtom from "../../atom/PermohonanAtom";
import { useFocusEffect } from "@react-navigation/native";

function PersyaratanPerlalin({ navigation, onPress }) {
  const { dataMaster } = useContext(UserContext);

  const { perlalinState } = PermohonanAtom;

  const [perlalin, setPerlalin] = useRecoilState(perlalinState);

  const [data, setData] = useState();

  const [stateVariables, setStateVariables] = useState([]);

  const stateError = false;

  const [formError, toggleFormError] = useStateToggler();

  const save = useRef();

  useFocusEffect(
    React.useCallback(() => {
      save.current = {
        ...perlalin,
      };
      return () => {
        setPerlalin(save.current);
      };
    }, [])
  );

  useEffect(() => {
    let persyaratan = dataMaster.persyaratan.PersyaratanPerlalin.map((item) => {
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

    setData(persyaratan);
  }, []);

  const savedNama = (dokumen) => {
    const updatedStateVariables = [...perlalin.persyaratan];
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
    const updatedStateVariables = [...perlalin.persyaratan];
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

    const tambahanItem = updateItems.map((item) => {
      return {
        persyaratan: item.persyaratan,
        kebutuhan: item.kebutuhan,
        nama: item.namaFile,
        file: item.fileBerkas,
      };
    });

    save.current = {
      ...perlalin,
      persyaratan: tambahanItem,
    };

    let not_empty = updateItems.filter((item) => {
      return item.fileBerkas == "" && item.kebutuhan == "Wajib";
    });

    if (not_empty.length == 0) {
      formError ? toggleFormError() : "";
    }
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
      onPress();
    } else {
      formError ? "" : toggleFormError();
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
                    ? color.error.error500
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
            </View>
          ))}

          {formError ? (
            <AText
              style={{ paddingTop: 8 }}
              color={color.error.error500}
              size={14}
              weight="normal"
            >
              Lengkapi persyaratan atau kolom yang tersedia dengan benar
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

            <TouchableOpacity
              style={{ flexDirection: "row", paddingLeft: 4 }}
              onPress={() => {
                navigation.push("Ketentuan", {
                  kondisi: "Pengajuan perlalin",
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

export default PersyaratanPerlalin;

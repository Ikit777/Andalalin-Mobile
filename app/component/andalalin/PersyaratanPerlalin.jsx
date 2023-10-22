import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Pressable, ScrollView } from "react-native";
import AText from "../../component/utility/AText";
import color from "../../constants/color";
import ATextInputIcon from "../utility/ATextInputIcon";
import { UserContext } from "../../context/UserContext";
import { useStateToggler } from "../../hooks/useUtility";
import AButton from "../utility/AButton";
import * as DocumentPicker from "expo-document-picker";

function PersyaratanPerlalin({ navigation, onPress }) {
  const {
    perlalin: {
      berkas_ktp,
      nama_ktp,
      berkas_surat,
      nama_surat,
      persyaratan_tambahan,
    },
    setPerlalin,
  } = useContext(UserContext);
  const context = useContext(UserContext);
  const [ktp, setKTP] = useState(berkas_ktp);
  const [namaKtp, setNamaKtp] = useState(nama_ktp);
  const [ktpError, setKTPError] = useStateToggler();

  const [surat, setSurat] = useState(berkas_surat);
  const [namaSurat, setNamaSurat] = useState(nama_surat);
  const [suratError, setSuratError] = useStateToggler();

  const [data, setData] = useState();

  const [stateVariables, setStateVariables] = useState([]);

  const [tambahanNotEmpty, setTambahanNotEmpty] = useState(false);

  const stateError = false;

  useEffect(() => {
    let persyaratan =
      context.dataMaster.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
        (item) => {
          stateVariables.push({
            persyaratan: item.persyaratan,
            stateError,
            namaFile: savedNama(item.persyaratan),
            fileBerkas: savedFile(item.persyaratan),
          });
          return item.persyaratan;
        }
      );

    setData(persyaratan);
    if (
        context.dataMaster.persyaratan_tambahan.PersyaratanTambahanPerlalin
          .length == 0
      ) {
        setTambahanNotEmpty(true);
      }
  }, []);

  useEffect(() => {
    if (persyaratan_tambahan.length !== 0) {
      setTambahanNotEmpty(true);
    }
  }, []);

  const savedNama = (persyaratan) => {
    const updatedStateVariables = [...persyaratan_tambahan];
    const index = updatedStateVariables.findIndex(
      (v) => v.persyaratan === persyaratan
    );
    if (index !== -1) {
      return updatedStateVariables[index].nama;
    } else {
      return "";
    }
  };

  const savedFile = (persyaratan) => {
    const updatedStateVariables = [...persyaratan_tambahan];
    const index = updatedStateVariables.findIndex(
      (v) => v.persyaratan === persyaratan
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
        setTambahanNotEmpty(true);
        return { ...item, namaFile: name, fileBerkas: uri, stateError: false };
      }
      return item;
    });

    setStateVariables(updateItems);
  };

  const handleChangeAllError = (cond) => {
    const updateItems = stateVariables.map((item) => {
      if (item.fileBerkas === "") {
        return { ...item, stateError: cond };
      }
      return item;
    });
    setStateVariables(updateItems);
  };

  useEffect(() => {
    {
      ktpError ? setKTPError() : "";
    }
  }, [ktp]);

  useEffect(() => {
    {
      suratError ? setSuratError() : "";
    }
  }, [surat]);

  const press = () => {
    stateVariables.forEach((state) => {
      if (state.fileBerkas === "") {
        handleChangeAllError(true);
      }
    });

    if (ktp != "" && surat != "") {
      if (tambahanNotEmpty) {
        const tambahanItem = stateVariables.map((item) => {
          return {
            persyaratan: item.persyaratan,
            nama: item.namaFile,
            file: item.fileBerkas,
          };
        });

        setPerlalin({
          berkas_ktp: ktp,
          nama_ktp: namaKtp,
          berkas_surat: surat,
          nama_surat: namaSurat,
          persyaratan_tambahan: tambahanItem,
        });
        onPress();
      }
    } else {
      {
        ktp == "" ? (ktpError ? "" : setKTPError()) : "";
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
            suratError ? setSuratError() : "";
          }
          setSurat(result.assets[0].uri);
          setNamaSurat(result.assets[0].name);
          break;
      }
    }
  };

  const file_tambahan = async (persyaratan) => {
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

  const utama = () => {
    if (data != null) {
      return (
        <View>
          <ATextInputIcon
            bdColor={ktpError ? color.error.error300 : color.neutral.neutral300}
            hint={"Masukkan kartu tanda penduduk"}
            title={"Kartu tanda penduduk"}
            icon={"file-plus"}
            value={namaKtp}
            mult={true}
            width={true}
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
            bdColor={
              suratError ? color.error.error300 : color.neutral.neutral300
            }
            hint={"Masukkan surat permohonan"}
            title={"Surat permohonan"}
            icon={"file-plus"}
            padding={20}
            width={true}
            mult={true}
            value={namaSurat}
            onPress={() => {
              file(2);
            }}
          />

          {suratError ? (
            <AText
              style={{ paddingTop: 6 }}
              color={color.error.error500}
              size={14}
              weight="normal"
            >
              Berkas surat permohonan kosong
            </AText>
          ) : (
            ""
          )}

          {data.map((item, index) => (
            <View key={index}>
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
                padding={20}
                mult={true}
                width={true}
                value={
                  stateVariables.find((variabel) => {
                    return variabel.persyaratan == item;
                  }).namaFile
                }
                onPress={() => {
                  file_tambahan(item);
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
                  Berkas {item.toLowerCase()} kosong
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

            <Pressable
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
            </Pressable>
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

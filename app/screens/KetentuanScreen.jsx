import React, { useEffect, useContext } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import { SelectList } from "react-native-dropdown-select-list";
import { poppins } from "../constants/font";
import { Feather } from "@expo/vector-icons";

function KetentuanScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi

  const ktp = [{ value: "Kartu tanda penduduk Indonesia", disabled: true }];
  const akta = [
    {
      value:
        "Akta Pendirian badan yang telah mendapatkan pengesahan dari pejabat yang berwenang, apabila pemrakarsa adalah badan (operasional)",
      disabled: true,
    },
  ];
  const surat = [
    {
      value:
        "Surat kuasa bermaterai dari pemrakarsa apabila pengajuan permohonan dikuasakan kepada orang lain.\n\nPemberian surat kuasa hanya diberikan kepada orang yang memiliki hubungan keluarga/saudara atau hubungan staf/bawahan/kerja dengan pemohon izin yang dibuktikan dengan:\n\n1. Foto copy kartu keluarga atau surat pernyataan bermaterai yang menyatakan bahwa yang bersangkutan memiliki hubungan keluarga/saudara, dalam hal kuasa diberikan kepada orang yang memiliki hubungan keluarga/saudara.\n\n2. Surat keterangan bermaterai terkait status kepegawaian/surat penempatan kerja, dalam hal kuasa diberikan kepada orang ang memiliki hubungan staff/bawahan/kerja.",
      disabled: true,
    },
  ];

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (kondisi == "Pengajuan") {
        navigation.push("Back Andalalin");
      } else {
        navigation.goBack();
      }

      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      if (kondisi == "Pengajuan") {
        navigation.push("Back Andalalin");
      } else {
        navigation.goBack();
      }

      return true;
    });
  }, []);

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ABackButton
            onPress={() => {
              if (kondisi == "Pengajuan") {
                navigation.push("Back Andalalin");
              } else {
                navigation.goBack();
              }
            }}
          />
          <AText
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Ketentuan persyaratan
          </AText>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={styles.content}
      >
        <View style={{ marginTop: 0 }}>
          <SelectList
            placeholder="Kartu tanda penduduk"
            arrowicon={<Feather name="chevron-down" size={20} color="black" />}
            fontFamily={poppins.normal}
            inputStyles={{ fontSize: 22 }}
            boxStyles={{
              backgroundColor: color.primary.primary25,
              borderColor: color.neutral.neutral300,
              borderWidth: 0,
              marginBottom: -20,
            }}
            dropdownStyles={{
              backgroundColor: color.primary.primary25,
              borderColor: color.neutral.neutral300,
              borderWidth: 0,
              marginBottom: -10,
            }}
            search={false}
            data={ktp}
            disabledItemStyles={{ backgroundColor: color.primary.primary25 }}
            disabledTextStyles={{
              fontSize: 17,
              color: color.neutral.neutral500,
            }}
            maxHeight={100}
          />
        </View>

        <View style={{ marginTop: 0 }}>
          <SelectList
            placeholder="Akta Pendirian badan"
            arrowicon={<Feather name="chevron-down" size={20} color="black" />}
            fontFamily={poppins.normal}
            inputStyles={{ fontSize: 22 }}
            boxStyles={{
              backgroundColor: color.primary.primary25,
              borderColor: color.neutral.neutral300,
              borderWidth: 0,
              marginBottom: -20,
            }}
            dropdownStyles={{
              backgroundColor: color.primary.primary25,
              borderColor: color.neutral.neutral300,
              borderWidth: 0,
              marginBottom: -10,
            }}
            search={false}
            data={akta}
            disabledItemStyles={{ backgroundColor: color.primary.primary25 }}
            disabledTextStyles={{
              fontSize: 17,
              color: color.neutral.neutral500,
            }}
            maxHeight={100}
          />
        </View>

        <View style={{ marginTop: 0 }}>
          <SelectList
            placeholder="Surat kuasa"
            arrowicon={<Feather name="chevron-down" size={20} color="black" />}
            fontFamily={poppins.normal}
            inputStyles={{ fontSize: 22 }}
            dropdownTextStyles={{ fontSize: 19 }}
            boxStyles={{
              backgroundColor: color.primary.primary25,
              borderColor: color.neutral.neutral300,
              borderWidth: 0,
              marginBottom: -20,
            }}
            dropdownStyles={{
              backgroundColor: color.primary.primary25,
              borderColor: color.neutral.neutral300,
              borderWidth: 0,
              marginBottom: -10,
            }}
            search={false}
            data={surat}
            disabledItemStyles={{ backgroundColor: color.primary.primary25 }}
            disabledTextStyles={{
              fontSize: 17,
              color: color.neutral.neutral500,
            }}
            maxHeight={500}
          />
        </View>
      </ScrollView>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {},
});

export default KetentuanScreen;

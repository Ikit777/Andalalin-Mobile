import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import AKetentuanDropdown from "../component/utility/AKetentuanDropdown";

function KetentuanScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;
  const [data, setData] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      load();
    });
    return unsubscribe;
  }, [navigation]);

  const load = () => {
    const wajibAndlalin = [
      {
        persyaratan: "Kartu tanda penduduk",
        keterangan:
          "Kartu tanda penduduk asli indonesia dengan nama yang tercantum sama dengan nama pemohon",
      },
      {
        persyaratan: "Akta pendirian badan",
        keterangan:
          "Akta Pendirian badan yang telah mendapatkan pengesahan dari pejabat yang berwenang, apabila pemrakarsa adalah badan (operasional)",
      },
      {
        persyaratan: "Surat kuasa",
        keterangan:
          "Surat kuasa bermaterai dari pemrakarsa apabila pengajuan permohonan dikuasakan kepada orang lain.\n\nPemberian surat kuasa hanya diberikan kepada orang yang memiliki hubungan keluarga/saudara atau hubungan staf/bawahan/kerja dengan pemohon izin yang dibuktikan dengan:\n\n1. Foto copy kartu keluarga atau surat pernyataan bermaterai yang menyatakan bahwa yang bersangkutan memiliki hubungan keluarga/saudara, dalam hal kuasa diberikan kepada orang yang memiliki hubungan keluarga/saudara.\n\n2. Surat keterangan bermaterai terkait status kepegawaian/surat penempatan kerja, dalam hal kuasa diberikan kepada orang ang memiliki hubungan staff/bawahan/kerja.",
      },
    ];

    const wajibPerlalin = [
      {
        persyaratan: "Kartu tanda penduduk",
        keterangan:
          "Kartu tanda penduduk asli indonesia dengan nama yang tercantum sama dengan nama pemohon",
      },
      {
        persyaratan: "Surat permohonan",
        keterangan:
          "Surat permohonan berisi infromasi terkait permohonan yang akan diajukan seperti perlengkapan lalu lintas",
      },
    ];
    switch (kondisi) {
      case "Pengajuan andalalin":
        context.toggleLoading(true);

        setTimeout(() => {
          context.dataMaster.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
            (item) => {
              wajibAndlalin.push(item);
            }
          );

          setData(wajibAndlalin);
          context.toggleLoading(false);
        }, 1000);
        break;
      case "Update andalalin":
        context.toggleLoading(true);

        setTimeout(() => {
          context.dataMaster.persyaratan_tambahan.PersyaratanTambahanAndalalin.map(
            (item) => {
              wajibAndlalin.push(item);
            }
          );

          setData(wajibAndlalin);
          context.toggleLoading(false);
        }, 1000);
        break;
      case "Pengajuan perlalin":
        context.toggleLoading(true);

        setTimeout(() => {
          context.dataMaster.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
            (item) => {
              wajibPerlalin.push(item);
            }
          );

          setData(wajibPerlalin);
          context.toggleLoading(false);
        }, 1000);
        break;
      case "Update perlalin":
        context.toggleLoading(true);

        setTimeout(() => {
          context.dataMaster.persyaratan_tambahan.PersyaratanTambahanPerlalin.map(
            (item) => {
              wajibPerlalin.push(item);
            }
          );

          setData(wajibPerlalin);
          context.toggleLoading(false);
        }, 1000);
        break;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (kondisi == "Pengajuan andalalin") {
        navigation.push("Back Andalalin", { kondisi: "Andalalin" });
      } else if (kondisi == "Pengajuan perlalin") {
        navigation.push("Back Andalalin", { kondisi: "Perlalin" });
      } else {
        navigation.goBack();
      }

      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      if (kondisi == "Pengajuan andalalin") {
        navigation.push("Back Andalalin", { kondisi: "Andalalin" });
      } else if (kondisi == "Pengajuan perlalin") {
        navigation.push("Back Andalalin", { kondisi: "Perlalin" });
      } else {
        navigation.goBack();
      }

      return true;
    });
  }, []);

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
              if (kondisi == "Pengajuan andalalin") {
                navigation.push("Back Andalalin", { kondisi: "Andalalin" });
              } else if (kondisi == "Pengajuan perlalin") {
                navigation.push("Back Andalalin", { kondisi: "Perlalin" });
              } else {
                navigation.goBack();
              }
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
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
        {data != null
          ? data.map((item, index) => (
              <View
                key={index}
                style={{ paddingBottom: index + 1 != data.length ? 0 : 40 }}
              >
                <View style={{ paddingHorizontal: 16 }}>
                  <AKetentuanDropdown
                    hint={item.persyaratan}
                    data={item.keterangan}
                    max={200}
                    padding={10}
                    bdColor={color.neutral.neutral300}
                  />
                </View>
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: color.neutral.neutral50,
                    alignSelf: "center",
                    marginTop: 6,
                  }}
                />
              </View>
            ))
          : ""}
      </ScrollView>
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    paddingBottom: 100,
  },
});

export default KetentuanScreen;

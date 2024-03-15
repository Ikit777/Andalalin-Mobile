import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { UserContext } from "../context/UserContext";
import AKetentuanDropdown from "../component/utility/AKetentuanDropdown";
import { useRecoilState } from "recoil";
import PermohonanAtom from "../atom/PermohonanAtom";

function KetentuanScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;
  const kategori = route.params.kategori;
  const [data, setData] = useState();

  const { andalalinState } = PermohonanAtom;

  const [andalalin, setAndalalin] = useRecoilState(andalalinState);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      load();
    });
    return unsubscribe;
  }, [navigation]);

  const load = () => {
    switch (kondisi) {
      case "Pengajuan andalalin":
        context.toggleLoading(true);

        setTimeout(() => {
          const persyaratan = context.dataMaster.persyaratan.PersyaratanAndalalin.filter((bangkitan) => {
            return bangkitan.bangkitan == andalalin.bangkitan;
          })

          setData(persyaratan);
          context.toggleLoading(false);
        }, 1000);
        break;
      case "Update andalalin":
        context.toggleLoading(true);

        setTimeout(() => {
          const persyaratan = context.dataMaster.persyaratan.PersyaratanAndalalin.filter((bangkitan) => {
            return bangkitan.bangkitan == kategori;
          })

          setData(persyaratan);
          context.toggleLoading(false);
        }, 1000);
        break;
      case "Pengajuan perlalin":
        context.toggleLoading(true);

        setTimeout(() => {
          setData(context.dataMaster.persyaratan.PersyaratanPerlalin);
          context.toggleLoading(false);
        }, 1000);
        break;
      case "Update perlalin":
        context.toggleLoading(true);

        setTimeout(() => {
          setData(context.dataMaster.persyaratan.PersyaratanPerlalin);
          context.toggleLoading(false);
        }, 1000);
        break;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (kondisi == "Pengajuan andalalin") {
        navigation.navigate("Andalalin", { kondisi: "Andalalin" });
      } else if (kondisi == "Pengajuan perlalin") {
        navigation.navigate("Andalalin", { kondisi: "Perlalin" });
      } else {
        navigation.goBack();
      }

      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      if (kondisi == "Pengajuan andalalin") {
        navigation.navigate("Andalalin", { kondisi: "Andalalin" });
      } else if (kondisi == "Pengajuan perlalin") {
        navigation.navigate("Andalalin", { kondisi: "Perlalin" });
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
                navigation.navigate("Andalalin", { kondisi: "Andalalin" });
              } else if (kondisi == "Pengajuan perlalin") {
                navigation.navigate("Andalalin", { kondisi: "Perlalin" });
              } else {
                navigation.goBack();
              }
            }}
          />
         <AText
            style={{ paddingLeft: 4}}
            size={20}
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
                    marginBottom: 6,
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

import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AProgressBar from "../component/utility/AProgressBar";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import AndalalinNavigator from "../component/andalalin/AndalalinNavigator";
import { UserContext } from "../context/UserContext";
import PerlalinNavigator from "../component/andalalin/PerlalinNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useRecoilState, useResetRecoilState } from "recoil";
import PermohonanAtom from "../atom/PermohonanAtom";

function PengajuanScreen({ navigation, route }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;

  const { setLokasi, setFoto } = useContext(UserContext);

  const { andalalinState, perlalinState, indexPermohonan } = PermohonanAtom;
  const [index, setIndex] = useRecoilState(indexPermohonan);
  const [andalalin, setAndalalin] = useRecoilState(andalalinState);

  const resetAndalalin = useResetRecoilState(andalalinState);
  const resetPerlalin = useResetRecoilState(perlalinState);
  const resetIndexPermohonan = useResetRecoilState(indexPermohonan);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        back();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        back();
        return true;
      });
    }, [index])
  );

  const back = () => {
    if (index == 1) {
      toggleComfirm();
    } else {
      const newIndex = index - 1;
      setIndex(newIndex);

      navigation.replace("Back", {
        index: newIndex,
      });
    }
  };

  const judul = () => {
    if (kondisi == "Andalalin") {
      switch (andalalin.bangkitan) {
        case "Bangkitan rendah":
          if (andalalin.pemohon == "Perorangan") {
            switch (index) {
              case 1:
                return "Permohonan";
              case 2:
                return "Permohonan";
              case 3:
                return "Proyek";
              case 4:
                return "Pemohon";
              case 5:
                return "Kegiatan";
              case 6:
                return "Persyaratan";
              case 7:
                return "Konfirmasi";
            }
          } else {
            switch (index) {
              case 1:
                return "Permohonan";
              case 2:
                return "Permohonan";
              case 3:
                return "Proyek";
              case 4:
                return "Pemohon";
              case 5:
                return "Perusahaan";
              case 6:
                return "Kegiatan";
              case 7:
                return "Persyaratan";
              case 8:
                return "Konfirmasi";
            }
          }
          break;
        case "Bangkitan sedang":
          if (andalalin.pemohon == "Perorangan") {
            switch (index) {
              case 1:
                return "Permohonan";
              case 2:
                return "Permohonan";
              case 3:
                return "Proyek";
              case 4:
                return "Pemohon";
              case 5:
                return "Konsultan";
              case 6:
                return "Kegiatan";
              case 7:
                return "Persyaratan";
              case 8:
                return "Konfirmasi";
            }
          } else {
            switch (index) {
              case 1:
                return "Permohonan";
              case 2:
                return "Permohonan";
              case 3:
                return "Proyek";
              case 4:
                return "Pemohon";
              case 5:
                return "Perusahaan";
              case 6:
                return "Konsultan";
              case 7:
                return "Kegiatan";
              case 8:
                return "Persyaratan";
              case 9:
                return "Konfirmasi";
            }
          }
          break;
        case "Bangkitan tinggi":
          if (andalalin.pemohon == "Perorangan") {
            switch (index) {
              case 1:
                return "Permohonan";
              case 2:
                return "Permohonan";
              case 3:
                return "Proyek";
              case 4:
                return "Pemohon";
              case 5:
                return "Konsultan";
              case 6:
                return "Kegiatan";
              case 7:
                return "Persyaratan";
              case 8:
                return "Konfirmasi";
            }
          } else {
            switch (index) {
              case 1:
                return "Permohonan";
              case 2:
                return "Permohonan";
              case 3:
                return "Proyek";
              case 4:
                return "Pemohon";
              case 5:
                return "Perusahaan";
              case 6:
                return "Konsultan";
              case 7:
                return "Kegiatan";
              case 8:
                return "Persyaratan";
              case 9:
                return "Konfirmasi";
            }
          }
          break;
      }
    } else {
      switch (index) {
        case 1:
          return "Permohonan";
        case 2:
          return "Perlengkapan";
        case 3:
          return "Pemohon";
        case 4:
          return "Persyaratan";
        case 5:
          return "Konfirmasi";
      }
    }
  };

  const content = () => {
    if (kondisi == "Andalalin") {
      return <AndalalinNavigator index={index} kondisi={kondisi} />;
    } else {
      return <PerlalinNavigator index={index} kondisi={kondisi} />;
    }
  };

  const item = () => {
    if (kondisi == "Andalalin") {
      switch (andalalin.bangkitan) {
        case "Bangkitan rendah":
          if (andalalin.pemohon == "Perorangan") {
            return 6;
          } else {
            return 7;
          }
        case "bangkitan sedang":
          if (andalalin.pemohon == "Perorangan") {
            return 7;
          } else {
            return 8;
          }
        case "Bangkitan tinggi":
          if (andalalin.pemohon == "Perorangan") {
            return 7;
          } else {
            return 8;
          }
      }
    } else {
      return 4;
    }
  };

  const tambah = () => {
    return (
      <Pressable
        android_ripple={{
          color: "rgba(0, 0, 0, 0.1)",
          borderless: false,
          radius: 32,
        }}
        style={{
          shadowColor: "rgba(0, 0, 0, 0.30)",
          elevation: 8,
          borderRadius: 16,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color.primary.primary100,
          position: "absolute",
          bottom: 54,
          right: 38,
          padding: 16,
        }}
        onPress={() => {
          setLokasi();
          setFoto([]);
          navigation.push("Tambah perlengkapan", { kondisi: "Tambah" });
        }}
      >
        <Feather name="plus" size={24} color={color.neutral.neutral900} />
      </Pressable>
    );
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
              if (index == 1) {
                toggleComfirm();
              } else {
                const newIndex = index - 1;
                setIndex(newIndex);

                navigation.replace("Back", {
                  index: newIndex,
                });
              }
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
          </AText>
        </View>
        {index == 1 ? (
          <View style={{ height: 6 }} />
        ) : (
          <AProgressBar progress={Math.floor(((index - 1) * 100) / item())} />
        )}
      </View>

      <View style={styles.content}>{content()}</View>

      {kondisi == "Perlalin" && index == 2 ? tambah() : ""}

      <AConfirmationDialog
        title={"Peringatan"}
        desc={"Data yang Anda masukkan akan hilang"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          navigation.goBack();
          resetAndalalin();
          resetPerlalin();
          resetIndexPermohonan();
          toggleComfirm();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {},
  content: {
    flex: 1,
  },
});

export default PengajuanScreen;

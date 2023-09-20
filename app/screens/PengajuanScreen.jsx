import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
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

function PengajuanScreen({ navigation, route }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);
  const kondisi = route.params.kondisi;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.setOptions({ animation: "slide_from_right" });
      back();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      navigation.setOptions({ animation: "slide_from_right" });
      back();
      return true;
    });
  }, [context.index]);

  const back = () => {
    if (context.index == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.index - 1;
      context.setIndex(newIndex);

      navigation.replace("Back", {
        index: newIndex,
      });
    }
  };

  const judul = () => {
    if (kondisi == "Andalalin") {
      switch (context.index) {
        case 1:
          return "Permohonan";
        case 2:
          return "Permohonan";
        case 3:
          return "Pemohon";
        case 4:
          return "Perusahaan";
        case 5:
          return "Perusahaan";
        case 6:
          return "Kegiatan";
        case 7:
          return "Persyaratan";
        case 8:
          return "Konfirmasi";
      }
    } else {
      switch (context.index) {
        case 1:
          return "Permohonan";
        case 2:
          return "Permohonan";
        case 3:
          return "Pemohon";
        case 4:
          return "Kegiatan";
        case 5:
          return "Persyaratan";
        case 6:
          return "Konfirmasi";
      }
    }
  };

  const content = () => {
    if (kondisi == "Andalalin") {
      return <AndalalinNavigator index={context.index} kondisi={kondisi} />;
    } else {
      return <PerlalinNavigator index={context.index} kondisi={kondisi} />;
    }
  };

  const item = () => {
    if (kondisi == "Andalalin") {
      return 7;
    } else {
      return 5;
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
              if (context.index == 1) {
                navigation.setOptions({ animation: "slide_from_right" });
                toggleComfirm();
              } else {
                const newIndex = context.index - 1;
                context.setIndex(newIndex);

                navigation.replace("Back", {
                  index: newIndex,
                });
              }
            }}
          />
          <AText
            style={{ paddingLeft: 4 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
          </AText>
        </View>
        {context.index == 1 ? (
          <View style={{ height: 6 }} />
        ) : (
          <AProgressBar
            progress={Math.floor(((context.index - 1) * 100) / item())}
          />
        )}
      </View>

      <View style={styles.content}>{content()}</View>

      <AConfirmationDialog
        title={"Kembali?"}
        desc={"Data yang Anda masukkan akan hilang"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          navigation.replace("Back Home");
          context.setIndex(1);
          context.clear();
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

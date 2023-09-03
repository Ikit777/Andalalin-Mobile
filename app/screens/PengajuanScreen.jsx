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

function PengajuanScreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);

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
  };

  return (
    <AScreen>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            style={{ paddingLeft: 8 }}
            size={24}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
          </AText>
        </View>
        {context.index == 1 ? (
          ""
        ) : (
          <AProgressBar
            progress={Math.floor(((context.index - 1) * 100) / 7)}
          />
        )}
      </View>

      <View style={styles.content}>
        <AndalalinNavigator index={context.index} />
      </View>

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
          navigation.navigate("Home");
          context.setIndex(1);
          context.clear();
          toggleComfirm();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    height: 64,
  },
  content: {
    marginTop: 16,
    flex: 1,
  },
});

export default PengajuanScreen;

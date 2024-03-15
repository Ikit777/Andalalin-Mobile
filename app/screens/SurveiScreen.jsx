import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import AProgressBar from "../component/utility/AProgressBar";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import SurveiNavigator from "../component/survei/SurveiNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

function SurveiScreen({ navigation, route }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);

  const id = route.params.id;
  const kondisi = route.params.kondisi;

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
    }, [context.indexSurvei])
  );

  useEffect(() => {
    context.setSurvei({
      foto: [],
    });
  }, []);

  const back = () => {
    if (context.indexSurvei == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexSurvei - 1;
      context.setIndexSurvei(newIndex);

      navigation.replace("Back", {
        index: newIndex,
      });
    }
  };

  const judul = () => {
    switch (context.indexSurvei) {
      case 1:
        return "Perlengkapan";
      case 2:
        return "Tambah foto";
      case 3:
        return "Lokasi";
      case 4:
        return "Keterangan";
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
          setTimeout(() => {
            navigation.push("Kamera", { kondisi: "Foto" });
          }, 500);
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
              if (context.indexSurvei == 1) {
                toggleComfirm();
              } else {
                const newIndex = context.indexSurvei - 1;
                context.setIndexSurvei(newIndex);

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
        <AProgressBar progress={Math.floor((context.indexSurvei * 100) / 4)} />
      </View>
      <View style={styles.content}>
        <SurveiNavigator
          index={context.indexSurvei}
          id={id}
          kondisi={kondisi}
        />
      </View>

      {context.indexSurvei == 2 ? tambah() : ""}

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
          context.setIndexSurvei(1);
          context.clearSurvei();
          toggleComfirm();

          navigation.navigate("Detail", { id: id });
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

export default SurveiScreen;

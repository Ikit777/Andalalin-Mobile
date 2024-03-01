import React, { useEffect, useContext } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import AProgressBar from "../component/utility/AProgressBar";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useFocusEffect } from "@react-navigation/native";
import MandiriNavigator from "../component/mandiri/MandiriNavigator";
import { Feather } from "@expo/vector-icons";

function SurveiMandiriScreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);

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
    }, [context.surveiMandiriIndex])
  );

  useEffect(() => {
    context.setSurveiMandiri({
      foto: [],
    });
  }, []);

  const back = () => {
    if (context.surveiMandiriIndex == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.surveiMandiriIndex - 1;
      context.setSurveiMandiriIndex(newIndex);

      navigation.replace("Back", {
        index: newIndex,
      });
    }
  };

  const judul = () => {
    switch (context.surveiMandiriIndex) {
      case 1:
        return "Tambah foto";
      case 2:
        return "Lokasi";
      case 3:
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
            navigation.push("Kamera", { kondisi: "Mandiri" });
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
              if (context.surveiMandiriIndex == 1) {
                toggleComfirm();
              } else {
                const newIndex = context.surveiMandiriIndex - 1;
                context.setSurveiMandiriIndex(newIndex);

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
        <AProgressBar
          progress={Math.floor((context.surveiMandiriIndex * 100) / 3)}
        />
      </View>
      <View style={styles.content}>
        <MandiriNavigator index={context.surveiMandiriIndex} />
      </View>

      {context.surveiMandiriIndex == 1 ? tambah() : ""}

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
          context.setSurveiMandiriIndex(1);
          context.clearSurveiMandiri();
          toggleComfirm();

          navigation.goBack();
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

export default SurveiMandiriScreen;

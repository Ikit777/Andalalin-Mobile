import React, { useEffect } from "react";
import { StyleSheet, Image, View, BackHandler } from "react-native";
import AScreen from "../component/utility/AScreen";
import AText from "../component/utility/AText";
import AButton from "../component/utility/AButton";
import color from "../constants/color";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import ExitApp from "react-native-exit-app";
useEffect

function OnBoardingscreen({ navigation }) {
  const [confirm, toggleComfirm] = useStateToggler();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });

      return BackHandler.removeEventListener("hardwareBackPress", () => {
        toggleComfirm();
        return true;
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <AScreen>
      <View style={styles.content}>
        <View style={{ marginBottom: 128 }}>
          <Image
            source={require("../assets/image/icon_app.png")}
            style={styles.stretch}
          />
        </View>
        <AText color={color.neutral.neutral900} size={24} weight="semibold">
          Selamat datang di{"\n"}andalalin
        </AText>
        <View style={{ paddingTop: 8 }}>
          <AText color={color.neutral.neutral500} size={16} weight="normal">
            Managemen lalu lintas dengan mudah dan tepat bersama andalalin
          </AText>
        </View>
        <View style={{ paddingTop: 128, paddingBottom: 16 }}>
          <AButton mode="contained" title="Mulai" onPress={() => {navigation.navigate("Login")}} />
        </View>
      </View>

      <AConfirmationDialog
        title={"Keluar"}
        desc={"Apakah Anda yakin ingin keluar aplikasi?"}
        visibleModal={confirm}
        toggleVisibleModal={toggleComfirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          ExitApp.exitApp();
          toggleComfirm();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    flex: 1,
    justifyContent: "flex-end"
  },
  stretch: {
    width: 205,
    height: 175,
    alignSelf: "center",
    resizeMode: "contain",
  },
});

export default OnBoardingscreen;

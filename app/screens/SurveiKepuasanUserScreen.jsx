import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, BackHandler, Pressable } from "react-native";
import AText from "../component/utility/AText";
import color from "../constants/color";
import AScreen from "../component/utility/AScreen";
import ABackButton from "../component/utility/ABackButton";
import AProgressBar from "../component/utility/AProgressBar";
import AConfirmationDialog from "../component/utility/AConfirmationDialog";
import { useStateToggler } from "../hooks/useUtility";
import { UserContext } from "../context/UserContext";
import KepuasanNavigator from "../component/kepuasan/KepuasnNavigator";
import { Feather } from "@expo/vector-icons";

function SurveiKepuasanUserScreen({ navigation, route }) {
  const id = route.params.id;
  const [confirm, toggleComfirm] = useStateToggler();
  const context = useContext(UserContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      back();
      return true;
    });

    return BackHandler.removeEventListener("hardwareBackPress", () => {
      back();
      return true;
    });
  }, [context.indexSurvei]);

  const back = () => {
    if (context.indexSurvei == 1) {
      toggleComfirm();
    } else {
      const newIndex = context.indexSurvei - 1;
      context.setIndexSurvei(newIndex);

      navigation.replace("Back Kepuasan", {
        index: newIndex,
        id: id,
      });
    }
  };

  const onGoToNext = () => {
    if (context.indexSurvei < 10) {
      const newIndex = context.indexSurvei + 1;
      context.setIndexSurvei(newIndex);

      navigation.push("KepuasanItem", {
        index: newIndex,
        id: id,
      });
    }
  };

  return (
    <AScreen>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <ABackButton
            onPress={() => {
              back();
            }}
          />
         <AText
            style={{ paddingLeft: 4}}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            Survei kepuasan
          </AText>
        </View>
        <AProgressBar progress={Math.floor((context.indexSurvei * 100) / 10)} />
      </View>
      <View style={styles.content}>
        <KepuasanNavigator index={context.indexSurvei} id={id} />
      </View>

      {context.indexSurvei != 10 ? (
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
            bottom: 64,
            right: 32,
            padding: 16,
          }}
          onPress={() => {
            if (context.kepuasan[context.indexSurvei - 1].Nilai != "") {
              onGoToNext();
            }
          }}
        >
          <Feather
            name="arrow-right"
            size={24}
            color={color.neutral.neutral900}
          />
        </Pressable>
      ) : (
        ""
      )}

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
          toggleComfirm();
          context.setIndexSurvei(1);
          context.clearSurveiKepuasan();
          navigation.goBack();
        }}
      />
    </AScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default SurveiKepuasanUserScreen;

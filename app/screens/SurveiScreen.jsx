import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
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
        return "Tambah foto";
      case 2:
        return "Lokasi";
      case 3:
        return "Keterangan";
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
            style={{ paddingLeft: 4}}
            size={20}
            color={color.neutral.neutral900}
            weight="normal"
          >
            {judul()}
          </AText>
        </View>
        <AProgressBar progress={Math.floor((context.indexSurvei * 100) / 3)} />
      </View>
      <View style={styles.content}>
        <SurveiNavigator
          index={context.indexSurvei}
          id={id}
          kondisi={kondisi}
        />
      </View>

      <AConfirmationDialog
        title={"Peringatan!"}
        desc={"Data yang Anda masukkan akan hilang"}
        visibleModal={confirm}
        btnOK={"OK"}
        btnBATAL={"Batal"}
        onPressBATALButton={() => {
          toggleComfirm();
        }}
        onPressOKButton={() => {
          context.setIndexSurvei(1);
          context.clearSurvei();
          toggleComfirm();
          
          if (kondisi == "Mandiri") {
            navigation.goBack();
          }else{
            navigation.navigate("Detail", {id: id});
          }
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

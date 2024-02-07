import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AButton from "../utility/AButton";
import AText from "../utility/AText";
import ADialog from "../utility/ADialog";
import { MaterialIcons } from "@expo/vector-icons";

function Foto({ onPress, navigation }) {
  const {
    survei: { foto },
    setSurvei,
  } = useContext(UserContext);

  const [error, toggleError] = useStateToggler();

  const selanjutnya = () => {
    if (foto.length != 0) {
      onPress();
    } else {
      toggleError();
    }
  };

  const remove_Foto = (file) => {
    const updated = foto;

    const index = updated.findIndex((value) => {
      return value.name == file;
    });
    if (index > -1) {
      updated.splice(index, 1);
    }

    setSurvei({
      foto: updated,
    });
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      {foto.length != 0
        ? foto.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 14,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: 50, height: 50, borderRadius: 8 }}
                  />
                  <AText
                    style={{ paddingLeft: 16 }}
                    size={16}
                    color={color.neutral.neutral700}
                  >
                    {item.name}
                  </AText>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    remove_Foto(item.name);
                  }}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color={color.neutral.neutral900}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        : ""}
      {foto.length != 0 ? <View style={{ paddingTop: 24 }} /> : ""}
      <TouchableOpacity
        onPress={() => {
          setTimeout(() => {
            navigation.push("Kamera");
          }, 500);
        }}
      >
        <AText size={16} color={color.primary.main} weight="semibold">
          + Tambah foto
        </AText>
      </TouchableOpacity>

      <AButton
        style={{ marginTop: 24, marginBottom: 50 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          selanjutnya();
        }}
      />

      <ADialog
        title={"Peringatan"}
        desc={"Silahkan tambahkan foto terlebih dahulu"}
        visibleModal={error}
        btnOK={"OK"}
        onPressOKButton={() => {
          toggleError();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
});

export default Foto;

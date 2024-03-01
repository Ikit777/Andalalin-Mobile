import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useStateToggler } from "../../hooks/useUtility";
import { UserContext } from "../../context/UserContext";
import color from "../../constants/color";
import AButton from "../utility/AButton";
import AText from "../utility/AText";
import ADialog from "../utility/ADialog";
import { RadioButton } from "react-native-paper";

function Perlengkapan({ onPress, navigation, kondisi }) {
  const {
    survei: { id_perlengkapan },
    setSurvei,
    detailPermohonan,
  } = useContext(UserContext);

  const [error, toggleError] = useStateToggler();

  const update_perlengkapan = (item) => {
    setSurvei({ id_perlengkapan: item });
  };

  const lanjut = () => {
    if (id_perlengkapan != "") {
      onPress();
    } else {
      toggleError();
    }
  };

  const tinjau = () => {
    if (id_perlengkapan != "") {
      navigation.push("Detail perlengkapan", {
        id: id_perlengkapan,
      });
    } else {
      toggleError();
    }
  };

  const pilih = () => {
    if (kondisi == "Permohonan") {
      return (
        <RadioButton.Group
          onValueChange={(value) => update_perlengkapan(value)}
        >
          {detailPermohonan.perlengkapan.map((item, index) =>
            item.status == "Survei" ? (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <RadioButton
                    label={item.id_perlengkapan}
                    value={item.id_perlengkapan}
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={
                      id_perlengkapan === item.id_perlengkapan
                        ? "checked"
                        : "unchecked"
                    }
                  />
                  <Pressable
                    style={{ width: "85%", paddingLeft: 8 }}
                    onPress={() => {
                      update_perlengkapan(item.id_perlengkapan);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 8,
                        overflow: "hidden",
                        backgroundColor: color.text.white,
                        paddingHorizontal: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                      }}
                    >
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          resizeMode: "contain",
                        }}
                        source={{
                          uri: `data:image/png;base64,${item.gambar}`,
                        }}
                      />
                      <View style={{ paddingLeft: 16 }}>
                        <AText
                          style={{ width: "30%" }}
                          size={14}
                          color={color.neutral.neutral800}
                          weight="semibold"
                        >
                          {item.perlengkapan}
                        </AText>
                        <AText
                          style={{ width: "30%" }}
                          size={12}
                          color={color.neutral.neutral400}
                          weight="normal"
                        >
                          {item.pemasangan}
                        </AText>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            ) : (
              ""
            )
          )}
        </RadioButton.Group>
      );
    } else {
      return (
        <RadioButton.Group
          onValueChange={(value) => update_perlengkapan(value)}
        >
          {detailPermohonan.perlengkapan.map((item, index) =>
            item.status == "Pemasangan" ? (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <RadioButton
                    label={item.id_perlengkapan}
                    value={item.id_perlengkapan}
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={
                      id_perlengkapan === item.id_perlengkapan
                        ? "checked"
                        : "unchecked"
                    }
                  />
                  <Pressable
                    style={{ width: "85%", paddingLeft: 8 }}
                    onPress={() => {
                      update_perlengkapan(item.id_perlengkapan);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 8,
                        overflow: "hidden",
                        backgroundColor: color.text.white,
                        paddingHorizontal: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                      }}
                    >
                      <Image
                        style={{
                          width: 40,
                          height: 40,
                          resizeMode: "contain",
                        }}
                        source={{
                          uri: `data:image/png;base64,${item.gambar}`,
                        }}
                      />
                      <View style={{ paddingLeft: 16 }}>
                        <AText
                          style={{ width: "30%" }}
                          size={14}
                          color={color.neutral.neutral800}
                          weight="semibold"
                        >
                          {item.perlengkapan}
                        </AText>
                        <AText
                          style={{ width: "30%" }}
                          size={12}
                          color={color.neutral.neutral400}
                          weight="normal"
                        >
                          {item.pemasangan}
                        </AText>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </View>
            ) : (
              ""
            )
          )}
        </RadioButton.Group>
      );
    }
  };

  return (
    <ScrollView
      style={styles.content}
      showsVerticalScrollIndicator={false}
      persistentScrollbar={true}
    >
      {pilih()}
      <AButton
        style={{ marginTop: 24 }}
        title={"Lanjut"}
        mode="contained"
        onPress={() => {
          lanjut();
        }}
      />

      <View
        style={{
          flexDirection: "row",
          paddingTop: 32,
          paddingBottom: 50,
          alignSelf: "center",
        }}
      >
        <AText color={color.neutral.neutral500} size={14} weight="normal">
          Tinjau perlengkapan!
        </AText>

        <TouchableOpacity
          style={{ flexDirection: "row", paddingLeft: 4 }}
          onPress={() => {
            tinjau();
          }}
        >
          <AText size={14} color={color.neutral.neutral700} weight="semibold">
            Tinjau
          </AText>
        </TouchableOpacity>
      </View>

      <ADialog
        title={"Peringatan"}
        desc={"Silahkan pilih perlengkapan terlebih dahulu"}
        visibleModal={error}
        toggleModal={toggleError}
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

export default Perlengkapan;

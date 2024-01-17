import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { poppins } from "../../constants/font";
import { Feather } from "@expo/vector-icons";

function APriodePicker({
  visibleModal = false,
  onPressOKButton,
  onPressBATALButton,
  pilih,
}) {
  const [visible, setVisible] = React.useState(visibleModal);

  const [tahun, setTahun] = useState();
  const [bulan, setBulan] = useState();

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      setBulan(null);
      setTahun(new Date().getFullYear().toString());
    } else {
      setTimeout(() => setVisible(false), 200);
    }
  };

  const pick = () => {
    if (bulan != null && tahun != null) {
      pilih(bulan + " " + tahun);
      onPressOKButton();
    }
  };

  const tambah = () => {
    const nilai = parseInt(tahun, 10);
    const next = nilai + 1;
    setTahun(next.toString());
  };

  const kurang = () => {
    const nilai = parseInt(tahun, 10);
    const before = nilai - 1;
    setTahun(before.toString());
  };

  const monthly = [
    { month: "Januari", value: "01" },
    { month: "Februari", value: "02" },
    { month: "Maret", value: "03" },
    { month: "April", value: "04" },
    { month: "Mei", value: "05" },
    { month: "Juni", value: "06" },
    { month: "Juli", value: "07" },
    { month: "Agustus", value: "08" },
    { month: "September", value: "09" },
    { month: "Oktober", value: "10" },
    { month: "November", value: "11" },
    { month: "Desember", value: "12" },
  ];

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
      onRequestClose={() => {
        onPressBATALButton();
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => {
          onPressBATALButton();
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.horizontal}>
            <View style={{ paddingVertical: 6 }} />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{ alignItems: "center", padding: 8 }}
                onPress={() => {
                  kurang();
                }}
              >
                <Feather
                  name="chevron-left"
                  size={28}
                  color={color.primary.primary400}
                />
              </TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 14,
                  width: 80,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 3,
                }}
              >
                <TextInput
                  style={{
                    fontFamily: poppins.semibold,
                    fontSize: 16,
                  }}
                  underlineColorAndroid="transparent"
                  autoComplete="off"
                  autoCapitalize="none"
                  allowFontScaling={false}
                  value={tahun}
                  keyboardType="numeric"
                  selectionColor={color.neutral.neutral400}
                  textAlignVertical="center"
                  maxLength={4}
                  onChangeText={(value) => {
                    setTahun(value);
                  }}
                />
              </View>

              <TouchableOpacity
                style={{ alignItems: "center", padding: 8 }}
                onPress={() => {
                  tambah();
                }}
              >
                <Feather
                  name="chevron-right"
                  size={28}
                  color={color.primary.primary400}
                />
              </TouchableOpacity>
            </View>

            <View style={{ paddingVertical: 1 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              {monthly.slice(0, 3).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    alignItems: "center",
                    width: 95,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor:
                      bulan == item.value
                        ? color.primary.primary400
                        : color.primary.primary50,
                  }}
                  onPress={() => {
                    setBulan(item.value);
                  }}
                >
                  <AText
                    weight="semibold"
                    color={
                      bulan == item.value
                        ? color.text.white
                        : color.neutral.neutral700
                    }
                    size={14}
                  >
                    {item.month}
                  </AText>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              {monthly.slice(3, 6).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    alignItems: "center",
                    width: 95,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor:
                      bulan == item.value
                        ? color.primary.primary400
                        : color.primary.primary50,
                  }}
                  onPress={() => {
                    setBulan(item.value);
                  }}
                >
                  <AText
                    weight="semibold"
                    color={
                      bulan == item.value
                        ? color.text.white
                        : color.neutral.neutral700
                    }
                    size={14}
                  >
                    {item.month}
                  </AText>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              {monthly.slice(6, 9).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    alignItems: "center",
                    width: 95,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor:
                      bulan == item.value
                        ? color.primary.primary400
                        : color.primary.primary50,
                  }}
                  onPress={() => {
                    setBulan(item.value);
                  }}
                >
                  <AText
                    weight="semibold"
                    color={
                      bulan == item.value
                        ? color.text.white
                        : color.neutral.neutral700
                    }
                    size={14}
                  >
                    {item.month}
                  </AText>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              {monthly.slice(9, 12).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    alignItems: "center",
                    width: 95,
                    paddingVertical: 8,
                    borderRadius: 8,
                    backgroundColor:
                      bulan == item.value
                        ? color.primary.primary400
                        : color.primary.primary50,
                  }}
                  onPress={() => {
                    setBulan(item.value);
                  }}
                >
                  <AText
                    weight="semibold"
                    color={
                      bulan == item.value
                        ? color.text.white
                        : color.neutral.neutral700
                    }
                    size={14}
                  >
                    {item.month}
                  </AText>
                </TouchableOpacity>
              ))}
            </View>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                paddingRight: 16,
              }}
            >
              <TouchableOpacity
                style={{ marginVertical: 24 }}
                onPress={onPressBATALButton}
              >
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  Batal
                </AText>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginVertical: 24 }} onPress={pick}>
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  Pilih
                </AText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 31,
  },
  horizontal: {
    borderRadius: 12,
    paddingTop: 10,
    backgroundColor: color.primary.primary50,
  },
});

export default APriodePicker;

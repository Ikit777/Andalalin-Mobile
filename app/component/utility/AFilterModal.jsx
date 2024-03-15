import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { RadioButton } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

function AFilterModal({
  visibleModal = false,
  onPressOKButton,
  onPressBATALButton,
  btnOK,
  btnBATAL,
  filter,
  filter1,
  filter2,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const [checked, setChecked] = React.useState(null);
  const [checked2, setChecked2] = React.useState(null);

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      setChecked(filter1);
      setChecked2(filter2);
    } else {
      setTimeout(() => setVisible(false), 200);
    }
  };

  const batalPress = () => {
    onPressBATALButton();
  };

  const okPress = () => {
    filter(checked, checked2);
    onPressOKButton();
  };

  const jenis = [
    { sort: "Andalalin", value: "Dokumen analisis dampak lalu lintas" },
    { sort: "Perlalin", value: "Perlengkapan lalu lintas" },
  ];

  const sort = [
    { sort: "Cek persyaratan", value: "Cek persyaratan" },
    { sort: "Persetujuan administrasi", value: "Persetujuan administrasi" },
    { sort: "Persyaratan terpenuhi", value: "Persyaratan terpenuhi" },
    {
      sort: "Persyaratan tidak terpenuhi",
      value: "Persyaratan tidak terpenuhi",
    },
    { sort: "Pembuatan surat pernyataan", value: "Pembuatan surat pernyataan" },
    { sort: "Menunggu surat pernyataan", value: "Menunggu surat pernyataan" },
    { sort: "Menunggu pembayaran", value: "Menunggu pembayaran" },
    { sort: "Pembuatan penyusun dokumen", value: "Pembuatan penyusun dokumen" },
    {
      sort: "Persetujuan penyusun dokumen",
      value: "Persetujuan penyusun dokumen",
    },
    { sort: "Pembuatan surat keputusan", value: "Pembuatan surat keputusan" },
    {
      sort: "Pemeriksaan surat keputusan",
      value: "Pemeriksaan surat keputusan",
    },
    {
      sort: "Persetujuan surat keputusan",
      value: "Persetujuan surat keputusan",
    },
    { sort: "Cek kelengkapan akhir", value: "Cek kelengkapan akhir" },
    {
      sort: "Persetujuan kelengkapan akhir",
      value: "Persetujuan kelengkapan akhir",
    },
    {
      sort: "Kelengkapan tidak terpenuhi",
      value: "Kelengkapan tidak terpenuhi",
    },
    { sort: "Survei lapangan", value: "Survei lapangan" },
    { sort: "Laporan survei", value: "Laporan survei" },
    { sort: "Survei ditunda", value: "Survei ditunda" },
    { sort: "Survei dibatalkan", value: "Survei dibatalkan" },
    { sort: "Menunggu hasil keputusan", value: "Menunggu hasil keputusan" },
    { sort: "Pemasangan ditunda", value: "Pemasangan ditunda" },
    {
      sort: "Pemasangan sedang dilakukan",
      value: "Pemasangan sedang dilakukan",
    },
    { sort: "Permohonan ditunda", value: "Permohonan ditunda" },
    { sort: "Permohonan ditolak", value: "Permohonan ditolak" },
    { sort: "Permohonan dibatalkan", value: "Permohonan dibatalkan" },
    { sort: "Permohonan selesai", value: "Permohonan selesai" },
    { sort: "Pemasangan selesai", value: "Pemasangan selesai" },
  ];

  const sort_andalalin = [
    { sort: "Cek persyaratan", value: "Cek persyaratan" },
    { sort: "Persetujuan administrasi", value: "Persetujuan administrasi" },
    { sort: "Persyaratan terpenuhi", value: "Persyaratan terpenuhi" },
    {
      sort: "Persyaratan tidak terpenuhi",
      value: "Persyaratan tidak terpenuhi",
    },
    { sort: "Pembuatan surat pernyataan", value: "Pembuatan surat pernyataan" },
    { sort: "Menunggu surat pernyataan", value: "Menunggu surat pernyataan" },
    { sort: "Menunggu pembayaran", value: "Menunggu pembayaran" },
    { sort: "Pembuatan penyusun dokumen", value: "Pembuatan penyusun dokumen" },
    {
      sort: "Persetujuan penyusun dokumen",
      value: "Persetujuan penyusun dokumen",
    },
    { sort: "Pembuatan surat keputusan", value: "Pembuatan surat keputusan" },
    {
      sort: "Pemeriksaan surat keputusan",
      value: "Pemeriksaan surat keputusan",
    },
    {
      sort: "Persetujuan surat keputusan",
      value: "Persetujuan surat keputusan",
    },
    { sort: "Cek kelengkapan akhir", value: "Cek kelengkapan akhir" },
    {
      sort: "Persetujuan kelengkapan akhir",
      value: "Persetujuan kelengkapan akhir",
    },
    {
      sort: "Kelengkapan tidak terpenuhi",
      value: "Kelengkapan tidak terpenuhi",
    },
    { sort: "Permohonan ditolak", value: "Permohonan ditolak" },
    { sort: "Permohonan ditunda", value: "Permohonan ditunda" },
    { sort: "Permohonan selesai", value: "Permohonan selesai" },
  ];

  const sort_perlalin = [
    { sort: "Cek persyaratan", value: "Cek persyaratan" },
    { sort: "Persyaratan terpenuhi", value: "Persyaratan terpenuhi" },
    {
      sort: "Persyaratan tidak terpenuhi",
      value: "Persyaratan tidak terpenuhi",
    },
    { sort: "Survei lapangan", value: "Survei lapangan" },
    { sort: "Pengecekan perlengkapan", value: "Pengecekan perlengkapan" },
    { sort: "Pemasangan perlengkapan", value: "Pemasangan perlengkapan" },
    {
      sort: "Pemasangan ditunda",
      value: "Pemasangan ditunda",
    },
    { sort: "Permohonan ditunda", value: "Permohonan ditunda" },
    { sort: "Permohonan ditolak", value: "Permohonan ditolak" },
    { sort: "Permohonan dibatalkan", value: "Permohonan dibatalkan" },
    { sort: "Pemasangan selesai", value: "Pemasangan selesai" },
  ];

  const condition_sort = () => {
    switch (checked) {
      case "Dokumen analisis dampak lalu lintas":
        return (
          <View>
            <RadioButton.Group onValueChange={(value) => setChecked2(value)}>
              {sort_andalalin.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: index == 0 ? 0 : 8,
                  }}
                  onPress={() => {
                    setChecked2(item.value);
                  }}
                >
                  <RadioButton
                    label={item.value}
                    value={item.value}
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={checked2 === item.value ? "checked" : "unchecked"}
                  />
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral900}
                  >
                    {item.sort}
                  </AText>
                </Pressable>
              ))}
            </RadioButton.Group>
          </View>
        );
      case "Perlengkapan lalu lintas":
        return (
          <View>
            <RadioButton.Group onValueChange={(value) => setChecked2(value)}>
              {sort_perlalin.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: index == 0 ? 0 : 8,
                  }}
                  onPress={() => {
                    setChecked2(item.value);
                  }}
                >
                  <RadioButton
                    label={item.value}
                    value={item.value}
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={checked2 === item.value ? "checked" : "unchecked"}
                  />
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral900}
                  >
                    {item.sort}
                  </AText>
                </Pressable>
              ))}
            </RadioButton.Group>
          </View>
        );
      default:
        return (
          <View>
            <RadioButton.Group onValueChange={(value) => setChecked2(value)}>
              {sort.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: index == 0 ? 0 : 8,
                  }}
                  onPress={() => {
                    setChecked2(item.value);
                  }}
                >
                  <RadioButton
                    label={item.value}
                    value={item.value}
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={checked2 === item.value ? "checked" : "unchecked"}
                  />
                  <AText
                    style={{ paddingLeft: 4 }}
                    size={14}
                    color={color.neutral.neutral900}
                  >
                    {item.sort}
                  </AText>
                </Pressable>
              ))}
            </RadioButton.Group>
          </View>
        );
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
      onRequestClose={() => {
        batalPress();
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={() => {
          batalPress();
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.horizontal}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AText
                style={{ paddingVertical: 8 }}
                color={color.neutral.neutral900}
                size={18}
                weight="semibold"
              >
                Filter permohonan
              </AText>
              <TouchableOpacity
                onPress={() => {
                  setChecked(null);
                  setChecked2(null);
                }}
              >
                <Feather name="x" size={28} color={color.neutral.neutral900} />
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            <View style={{ paddingBottom: 8 }} />

            <ScrollView
              overScrollMode="never"
              bounces={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              vertical
              style={{ maxHeight: 260, zIndex: 1 }}
            >
              <AText color={color.neutral.neutral500} size={14} weight="normal">
                Jenis permohonan
              </AText>
              <RadioButton.Group onValueChange={(value) => setChecked(value)}>
                {jenis.map((item, index) => (
                  <Pressable
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: index == 0 ? 0 : 8,
                    }}
                    onPress={() => {
                      setChecked(item.value);
                    }}
                  >
                    <RadioButton
                      label={item.value}
                      value={item.value}
                      uncheckedColor={color.neutral.neutral300}
                      color={color.primary.primary600}
                      status={checked === item.value ? "checked" : "unchecked"}
                    />
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral900}
                    >
                      {item.sort}
                    </AText>
                  </Pressable>
                ))}
              </RadioButton.Group>

              <AText
                style={{ paddingTop: 8 }}
                color={color.neutral.neutral500}
                size={14}
                weight="normal"
              >
                Status permohonan
              </AText>

              {condition_sort()}
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{ paddingVertical: 24 }}
                onPress={() => {
                  batalPress();
                }}
              >
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  {btnBATAL}
                </AText>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ paddingVertical: 24 }}
                onPress={() => {
                  okPress();
                }}
              >
                <AText
                  style={{ paddingHorizontal: 20, paddingVertical: 5 }}
                  size={14}
                  color={color.primary.primary700}
                  weight="semibold"
                >
                  {btnOK}
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
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: color.primary.primary50,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: color.neutral.neutral100,
    alignSelf: "center",
    marginVertical: 3,
  },
});

export default AFilterModal;

import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { Checkbox } from "react-native-paper";
import { UserContext } from "../../context/UserContext";

function ATidakPilihan({
  visibleModal = false,
  onPressOKButton,
  data,
  uraian,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const context = useContext(UserContext);

  

  const [data_dokumen, setDataDokumen] = useState();
  const [terpilih, setTerpilih] = useState([]);

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      terpilih.splice(0, terpilih.length);
      if (data != null) {
        setDataDokumen(data);
        data.map((item) => {
          if (item.state == true) {
            terpilih.push(item.dokumen);
          }
        });
      }
      if (context.loading == true) {
        context.toggleLoading(false);
      }
      
    } else {
      setTimeout(() => setVisible(false), 200);
      
    }
  };

  const addItem = (item) => {
    itemIndeks = context.kelengkapan.kelengkapan.findIndex(
      (item) => item.uraian == uraian
    );
    context.kelengkapan.kelengkapan[itemIndeks].dokumen.push(item);
    terpilih.push(item.dokumen);
    setTerpilih(terpilih);
  };

  const removeItem = (item) => {
    itemIndeks = context.kelengkapan.kelengkapan.findIndex(
      (item) => item.uraian == uraian
    );
    const index = context.kelengkapan.kelengkapan[itemIndeks].dokumen.findIndex(
      (dokumen) => dokumen.dokumen == item
    );
    if (index > -1) {
      context.kelengkapan.kelengkapan[itemIndeks].dokumen.splice(index, 1);
    }

    const terpilihIndex = terpilih.indexOf(item);
    if (terpilihIndex > -1) {
      terpilih.splice(terpilihIndex, 1);
    }
  };

  const handleChangeCheck = (dokumen, cek) => {
    const updateItems = data_dokumen.map((item) => {
      if (item.dokumen === dokumen) {
        return { ...item, state: cek };
      }
      return item;
    });

    setDataDokumen(updateItems);
  };

  const okPress = () => {
    if (terpilih.length != 0 && terpilih != null) {
      onPressOKButton();
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get("screen").height}
    >
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <AText color={color.neutral.neutral900} size={18} weight="semibold">
            Pilih dokumen
          </AText>

          <View style={{ paddingBottom: 8 }} />
          <ScrollView
            overScrollMode="never"
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            vertical
            style={{ maxHeight: 250, zIndex: 1 }}
          >
            {data_dokumen &&
              data_dokumen.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: index == 0 ? 0 : 8,
                  }}
                  onPress={() => {
                    handleChangeCheck(item.dokumen, !item.state);
                    if (!item.state) {
                      addItem({ dokumen: item.dokumen, tipe: item.tipe });
                    } else {
                      removeItem(item.dokumen);
                    }
                  }}
                >
                  <Checkbox
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={item.state ? "checked" : "unchecked"}
                    onPress={() => {
                      handleChangeCheck(item.dokumen, !item.state);
                      if (!item.state) {
                        addItem({ dokumen: item.dokumen, tipe: item.tipe });
                      } else {
                        removeItem(item.dokumen);
                      }
                    }}
                  />
                  <AText
                    style={{ paddingLeft: 4, width: "90%" }}
                    size={14}
                    color={color.neutral.neutral900}
                  >
                    {item.dokumen}
                  </AText>
                </Pressable>
              ))}
          </ScrollView>
          <TouchableOpacity
            style={{ alignItems: "flex-end", marginVertical: 24 }}
            onPress={okPress}
          >
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

export default ATidakPilihan;

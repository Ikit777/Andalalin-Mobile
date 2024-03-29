import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import { RadioButton } from "react-native-paper";
import PermohonanAtom from "../../atom/PermohonanAtom";
import { useRecoilState } from "recoil";

function AKategoriBangkitan({
  visibleModal = false,
  onPressOKButton,
  onPressBATALButton,
  btnOK,
  btnBATAL,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const [checked, setChecked] = React.useState("");

  const { andalalinState } = PermohonanAtom;

  const [andalalin, setAndalalin] = useRecoilState(andalalinState);

  
  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);
  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      setChecked("");
      
    } else {
      setTimeout(() => setVisible(false), 200);
      
    }
  };

  const batalPress = () => {
    setChecked(null);
    setTimeout(() => {
      onPressBATALButton();
    }, 50);
  };

  const okPress = () => {
    if (checked != "") {
      setAndalalin({
        ...andalalin,
        bangkitan: checked,
      });
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
            <AText color={color.neutral.neutral900} size={18} weight="semibold">
              Pilih kategori bangkitan
            </AText>

            <View style={{ paddingTop: 8 }}>
              <RadioButton.Group onValueChange={(value) => setChecked(value)}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    label="Bangkitan rendah"
                    value="Bangkitan rendah"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={
                      checked === "Bangkitan rendah" ? "checked" : "unchecked"
                    }
                  />
                  <Pressable
                    onPress={() => {
                      setChecked("Bangkitan rendah");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Bangkitan rendah
                    </AText>
                  </Pressable>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <RadioButton
                    label="Bangkitan sedang"
                    value="Bangkitan sedang"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={
                      checked === "Bangkitan sedang" ? "checked" : "unchecked"
                    }
                  />
                  <Pressable
                    onPress={() => {
                      setChecked("Bangkitan sedang");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Bangkitan sedang
                    </AText>
                  </Pressable>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 8,
                  }}
                >
                  <RadioButton
                    label="Bangkitan tinggi"
                    value="Bangkitan tinggi"
                    uncheckedColor={color.neutral.neutral300}
                    color={color.primary.primary600}
                    status={
                      checked === "Bangkitan tinggi" ? "checked" : "unchecked"
                    }
                  />
                  <Pressable
                    onPress={() => {
                      setChecked("Bangkitan tinggi");
                    }}
                  >
                    <AText
                      style={{ paddingLeft: 4 }}
                      size={14}
                      color={color.neutral.neutral700}
                    >
                      Bangkitan tinggi
                    </AText>
                  </Pressable>
                </View>
              </RadioButton.Group>
            </View>

            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
              <TouchableOpacity
                style={{ marginVertical: 24 }}
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
                style={{ marginVertical: 24 }}
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
  btn: {
    width: 80,
    alignItems: "flex-end",
  },
});

export default AKategoriBangkitan;

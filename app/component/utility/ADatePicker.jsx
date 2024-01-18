import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import DatePicker from "react-native-modern-datepicker";
import { poppins } from "../../constants/font";

function ADatePicker({
  visibleModal = false,
  onPressOKButton,
  onPressBATALButton,
  pilih,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const [date, setDate] = useState();

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);

  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 200);
    }
  };

  const pick = () => {
    if (date != null) {
      pilih(date);
      onPressOKButton();
    }
  };

  const formated = (date) => {
    const date_formated =
      date.slice(8, 10) + "-" + date.slice(5, 7) + "-" + date.slice(0, 4);

    return date_formated;
  };

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
            <DatePicker
              options={{
                backgroundColor: color.primary.primary50,
                defaultFont: poppins["semibold"],
                headerFont: poppins["semibold"],
                textHeaderFontSize: 20,
                textFontSize: 16,
                textHeaderColor: color.primary.primary700,
                textDefaultColor: color.primary.primary700,
                selectedTextColor: color.text.white,
                mainColor: color.primary.primary400,
              }}
              mode="calendar"
              onSelectedChange={(date) => setDate(formated(date))}
            />

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                paddingRight: 16,
              }}
            >
              <TouchableOpacity
                style={{ paddingBottom: 14 }}
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

              <TouchableOpacity style={{ paddingBottom: 14 }} onPress={pick}>
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

export default ADatePicker;

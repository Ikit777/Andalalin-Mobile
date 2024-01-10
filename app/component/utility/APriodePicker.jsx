import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import DatePicker from "react-native-modern-datepicker";
import { poppins } from "../../constants/font";
import Modal from "react-native-modal";

function APriodePicker({
  visibleModal = false,
  onPressOKButton,
  onPressBATALButton,
  pilih,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const [priode, setPriode] = useState();

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
    if (priode != null) {
      pilih(priode);
      onPressOKButton();
    }
  };

  return (
    <Modal
      animationIn={"fadeIn"}
      animationInTiming={300}
      animationOut={"fadeOut"}
      animationOutTiming={300}
      isVisible={visible}
      backdropOpacity={0.5}
      statusBarTranslucent
      coverScreen={true}
      deviceHeight={Dimensions.get("screen").height}
      backdropTransitionOutTiming={0}
      onRequestClose={() => {
        onPressBATALButton();
      }}
      onBackdropPress={() => {
        onPressBATALButton();
      }}
      style={{paddingHorizontal: 12}}
    >
      <KeyboardAvoidingView behavior={"padding"}>
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
            mode="monthYear"
            onMonthYearChange={(selectedDate) => setPriode(selectedDate)}
          />

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

            <TouchableOpacity
              style={{ marginVertical: 24 }}
              onPress={pick}
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
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    borderRadius: 12,
    paddingTop: 10,
    backgroundColor: color.primary.primary50,
  },
});

export default APriodePicker;
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import color from "../../constants/color";
import AText from "../utility/AText";
import ATextInput from "./ATextInput";

function ADialogInputText({
  visibleModal = false,
  title,
  hint,
  setText,
  onPressOKButton,
  onPressBATALButton,
  btnOK,
  btnBATAL,
}) {
  const [visible, setVisible] = React.useState(visibleModal);
  const [input, setInput] = useState("");

  React.useEffect(() => {
    toggleModal();
  }, [visibleModal]);
  const toggleModal = () => {
    if (visibleModal) {
      setVisible(true);
      setInput("");
    } else {
      setTimeout(() => setVisible(false), 200);
    }
  };

  const okePress = () => {
    if (input != "") {
      onPressOKButton();
      setText(input);
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
            <AText color={color.neutral.neutral900} size={18} weight="semibold">
              {title}
            </AText>
            <View style={{paddingBottom: 16}} />
            <ATextInput
              bdColor={color.neutral.neutral300}
              ktype={"default"}
              hint={hint}
              multi={true}
              value={input}
              onChangeText={(value) => {
                setInput(value);
              }}
            />
            <View style={{paddingBottom: 8}} />
            <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
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
                  {btnBATAL}
                </AText>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginVertical: 24 }}
                onPress={okePress}
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
    paddingHorizontal: 16,
  },
  horizontal: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: color.primary.primary50,
  },
  btn: {
    width: 80,
    alignItems: "flex-end",
  },
});

export default ADialogInputText;
